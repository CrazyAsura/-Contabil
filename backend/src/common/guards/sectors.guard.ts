import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SECTORS_KEY } from '../decorators/sectors.decorator';

@Injectable()
export class SectorsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredSectors = this.reflector.getAllAndOverride<string[]>(SECTORS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredSectors) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Administrativo has full access
    if (user.sector === 'Administrativo') {
      return true;
    }

    const hasSector = requiredSectors.some((sector) => user.sector === sector);
    
    if (!hasSector) {
      throw new ForbiddenException('Seu setor não possui permissão para acessar este recurso');
    }

    return true;
  }
}
