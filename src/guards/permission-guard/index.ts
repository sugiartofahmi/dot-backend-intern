import { Type, CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ERole } from '@api/entities';

export const PermissionGuard = (roles: Array<ERole>): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const roleUser = request.user.role;
      return roles.includes(roleUser);
    }
  }
  return mixin(PermissionGuardMixin);
};
