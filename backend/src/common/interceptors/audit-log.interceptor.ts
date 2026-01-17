import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditLogService } from '../../modules/audit-logs/audit-logs.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private auditLogService: AuditLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, method, url, body, ip } = request;
    const userAgent = request.get('user-agent');

    return next.handle().pipe(
      tap((data) => {
        if (method !== 'GET') {
          this.auditLogService.create({
            userId: user?._id || 'SYSTEM',
            action: method,
            module: url.split('/')[1]?.toUpperCase() || 'UNKNOWN',
            newValue: body,
            ip,
            userAgent,
            companyId: user?.companyId,
          });
        }
      }),
    );
  }
}
