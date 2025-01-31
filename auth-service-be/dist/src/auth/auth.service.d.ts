import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
    }>;
    private generateToken;
}
