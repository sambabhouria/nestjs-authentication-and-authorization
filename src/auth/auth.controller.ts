import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto, TokenPayloadDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: { user: TokenPayloadDto }): TokenPayloadDto {
    // we get this value after login is done req.user is setted
    return req.user;
  }
}
