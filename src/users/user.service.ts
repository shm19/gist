import { wrap } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInUserDto } from './dtos/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async create(user: CreateUserDto) {
    const { name, username, email, password } = user;
    const exists = await this.userRepository.count({
      $or: [{ username }, { email }],
    });

    if (exists > 0) {
      throw new HttpException(
        {
          message:
            'Input data validation failed (username or email already exists)',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // hash password with bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User(name, username, email, hashedPassword);
    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.persistAndFlush(newUser);
    return newUser;
  }

  async signin(user: SignInUserDto): Promise<JwtPayload> {
    const { username, password } = user;
    // first get user by username
    const foundUser = await this.userRepository.findOne({
      username,
    });

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      throw new HttpException(
        {
          message: 'Invalid username or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create jwt token
    const token = await this.jwtService.signAsync({
      username: foundUser.username,
    });

    return { token };
  }

  async signout(): Promise<JwtPayload> {
    return {
      token: '',
    };
  }

  async update(id: number, user: UpdateUserDto) {
    const foundUser = await this.findOne(id);
    if (!foundUser) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // update user
    wrap(foundUser).assign(user);

    await this.userRepository.flush();

    return foundUser;
  }

  async delete(id: number): Promise<void> {
    const userRef = this.userRepository.getReference(id);
    await this.userRepository.removeAndFlush(userRef);
    return;
  }
}
