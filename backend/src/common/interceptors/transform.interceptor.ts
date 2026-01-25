import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TransformedResponse<T> {
    data: T;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, TransformedResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<TransformedResponse<T>> {
        return next.handle().pipe(
            map((response) => {
                // If response already has data property, return as is
                if (response && typeof response === 'object' && 'data' in response) {
                    return response;
                }
                // Wrap response in data property
                return { data: response };
            }),
        );
    }
}
