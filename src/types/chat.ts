export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  input: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  systemPrompt: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}