import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { serialize } from 'src/interceptors/serialze.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtPayload } from './jwt-payload.interface';
import { AdminGuard } from 'src/guards/admin-guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signin(@Body() user: SignInUserDto): Promise<JwtPayload> {
    return this.userService.signin(user);
  }

  @UseInterceptors(serialize(ResponseUserDto))
  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get('/signout')
  signout(): Promise<JwtPayload> {
    return this.userService.signout();
  }

  @UseInterceptors(serialize(ResponseUserDto))
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.userService.findOne(Number.parseInt(id));
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(Number.parseInt(id), user);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number.parseInt(id));
  }
}
