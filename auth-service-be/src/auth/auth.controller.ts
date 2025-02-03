import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { AuthGuard } from './jwtauth.guard';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(signUpDto, res);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    return this.authService.signIn(signInDto, res);
  }

  @UseGuards(AuthGuard)
  @Get('get-user')
  getUser(@Request() request) {
    return this.authService.getUser(request);
  }

  @Post('logout')
  logut(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
