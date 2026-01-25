import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AIChatService } from './ai-chat.service';
import { ChatMessageDto, ChatResponseDto } from './dto/chat-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai-chat')
@UseGuards(JwtAuthGuard)
export class AIChatController {
    constructor(private readonly aiChatService: AIChatService) { }

    @Post('message')
    async sendMessage(
        @Request() req: any,
        @Body() chatMessageDto: ChatMessageDto,
    ): Promise<ChatResponseDto> {
        return this.aiChatService.processMessage(req.user.id, chatMessageDto);
    }

    @Post('suggestions')
    async getSuggestions(@Request() req: any): Promise<{ suggestions: string[] }> {
        return this.aiChatService.getQuickSuggestions(req.user.id);
    }
}
