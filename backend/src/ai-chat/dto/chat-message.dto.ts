import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class ChatMessageDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsArray()
    @IsOptional()
    context?: Array<{ role: string; content: string }>;
}

export class ChatResponseDto {
    message: string;
    suggestions?: string[];
    actions?: Array<{
        type: 'create_task' | 'update_task' | 'schedule' | 'reminder';
        data: any;
    }>;
}
