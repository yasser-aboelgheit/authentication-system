import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Correct import
import { User, UserDocument } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService, // Inject JwtService instead of JwtModule
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, password, name } = signUpDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = this.generateToken(user._id.toString());

    return { token };
  }

  async signIn(signInDto: SignInDto, @Res() res: Response): Promise<void> {
    const { email, password } = signInDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!!');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials@@@');
    }

    // Generate JWT
    const token = this.generateToken(user._id.toString());
    this.setCookie(res, token);

    res.json({ message: 'Login successful' });
  }

  async getHello(): Promise<string> {
    return 'hello to you';
  }

  private generateToken(userId: string): string {
    // Use JwtService to generate the token instead of jsonwebtoken
    return this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10),
      },
    );
  }

  private setCookie(res: Response, token: string): void {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: parseInt(process.env.JWT_EXPIRESIN, 10),
    });
  }
}
