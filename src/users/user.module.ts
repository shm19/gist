import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategy';

@Module({
  controllers: [UserController],
  exports: [JWTStrategy, PassportModule],
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UserService, JWTStrategy],
})
export class UserModule {}
