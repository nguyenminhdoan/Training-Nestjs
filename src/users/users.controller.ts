import { Req, Res } from '@nestjs/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    return res.json({
      status: 'login successfully',
      data: user,
    });
  }
}
