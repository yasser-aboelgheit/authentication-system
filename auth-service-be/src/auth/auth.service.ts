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
import { LoggingService } from 'src/logging/logging.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly loggingService: LoggingService,
  ) {}

  async signUp(signUpDto: SignUpDto, @Res() res: Response): Promise<void> {
    const { email, password, name } = signUpDto;
    this.loggingService.debug(
      `signing up user with the following email: ${email}`,
    );
    // Check if user exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.loggingService.warn(
        `Sign up failed: email: ${email} already exists`,
      );
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
    this.loggingService.log(
      `User registered successfully`,
    );
    const token = this.generateToken(user._id.toString());
    this.setCookie(res, token);

    res.json({ message: 'signup successful' });
  }

  async signIn(signInDto: SignInDto, @Res() res: Response): Promise<void> {
    const { email, password } = signInDto;
    this.loggingService.debug(
      `sign in user with email: ${email}`,
    );
    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.loggingService.warn(
        `Sign in failed: No user found with matching email  ${email}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.loggingService.warn(
        `Sign in failed: password Invalid  for user ${email}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const token = this.generateToken(user._id.toString());
    this.setCookie(res, token);
    this.loggingService.log(
      `User with email ${email} signed in successfully`,
    );
    res.json({ message: 'Login successful' });
  }

  async getUser(request: Request): Promise<String> {
    const userId = request['user']?.userId;  // Access the user ID from the JWT payload
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user.name;
  }
  

  async logout(@Res() res: Response): Promise<void> {
    this.unSetCookie(res);
    res.status(200).send('Logged out successfully');
  }

  private generateToken(userId: string): string {
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
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: parseInt(process.env.JWT_EXPIRESIN, 10),
    });
  }

  private unSetCookie(res: Response): void {
    res.cookie('access_token', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', 
      expires: new Date(0),
    });
  }


}
