import {
  CanActivate,
  ExecutionContext,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    return request.user && request.user.role === 'admin';
    // if (!request.user || request.user.role !== 'admin') {
    //   throw new HttpException(
    //     {
    //       message: 'You are not an admin',
    //     },
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }
    // return true;
  }
}
