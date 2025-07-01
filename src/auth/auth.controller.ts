import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }
    const token = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await this.userService.setResetToken(user.id, token, expires);
    await this.mailService.sendMail(
      email,
      'Password Reset',
      `Your password reset token: ${token}`,
    );
    return { message: 'Password reset link sent to email' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.userService.getUserByResetToken(token);
    if (!user) {
      return { message: 'Invalid or expired token' };
    }
    await this.userService.updatePassword(user.id, newPassword);
    await this.userService.clearResetToken(user.id);
    return { message: 'Password updated successfully' };
  }
}
