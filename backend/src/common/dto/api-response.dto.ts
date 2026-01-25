import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationMeta } from './pagination.dto';

export class ApiResponse<T> {
    @ApiProperty()
    data: T;

    @ApiPropertyOptional()
    meta?: PaginationMeta;
}

export class ErrorDetail {
    @ApiProperty({ example: 'VALIDATION_ERROR' })
    code: string;

    @ApiProperty({ example: 'Validation failed' })
    message: string;

    @ApiPropertyOptional()
    details?: Record<string, unknown>;
}

export class ErrorResponse {
    @ApiProperty({ type: ErrorDetail })
    error: ErrorDetail;
}
