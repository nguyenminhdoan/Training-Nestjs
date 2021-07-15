import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);
    // const user = req.user;

    return res.json({
      status: 'login successfully',
      data: user,
    });
  }
  @Get()
  find() {
    return 'Hello World!';
  }
}
