import axios from 'axios';

const API_URL = 'http://localhost:3000/ai-chat';

export interface ChatMessage {
    message: string;
    context?: Array<{ role: string; content: string }>;
}

export interface ChatResponse {
    message: string;
    suggestions?: string[];
    actions?: Array<{
        type: 'create_task' | 'update_task' | 'schedule' | 'reminder';
        data: any;
    }>;
}

class AIChatService {
    private getAuthHeader() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }

    async sendMessage(data: ChatMessage): Promise<ChatResponse> {
        const response = await axios.post(`${API_URL}/message`, data, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }

    async getSuggestions(): Promise<{ suggestions: string[] }> {
        const response = await axios.post(`${API_URL}/suggestions`, {}, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }
}

export const aiChatService = new AIChatService();
