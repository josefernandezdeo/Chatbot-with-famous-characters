import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { CharacterSelection } from './CharacterSelection';
import { generateUniqueId } from '@/lib/utils';
import type { Message as MessageType, ChatState, Character } from '@/types/chat';

export function Chat() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    input: '',
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    };

    // Delay to ensure the DOM has updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [chatState.messages, chatState.isLoading]);

  // Initialize chat when character is selected
  useEffect(() => {
    if (selectedCharacter) {
      const welcomeMessage: MessageType = {
        id: generateUniqueId(),
        content: getWelcomeMessage(selectedCharacter),
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState({
        messages: [welcomeMessage],
        isLoading: false,
        input: '',
      });
    }
  }, [selectedCharacter]);

  const getWelcomeMessage = (character: Character): string => {
    switch (character.id) {
      case 'trump':
        return "Hello! It's me, Donald Trump. Tremendous to meet you! I've got to tell you, this is going to be an incredible conversation. Nobody has better conversations than me, believe me. What would you like to talk about? Business? Politics? Winning? I know about all of it!";
      case 'jack':
        return "Ahoy there, mate! Captain Jack Sparrow at your service, savvy? *tips hat with a flourish* Welcome aboard this fine vessel of conversation. Whether ye be seekin' tales of adventure on the high seas, wisdom from a life of freedom, or perhaps just a bit of witty banter, you've come to the right pirate. What brings ye to parley with ol' Jack today?";
      case 'seth':
        return "Hello there! I'm Seth Milchick, your wellness counselor here at Lumon Industries! Isn't this just fantastic? I'm absolutely thrilled to help you achieve optimal work-life balance and employee satisfaction. How can I assist you in maximizing your wellness potential today?";
      case 'yoda':
        return "Greetings, young one. Yoda, I am. Seek wisdom, do you? Good, good. Much to learn, there always is. Patient, you must be. In conversation, as in the Force, flow naturally, understanding does. Ask what you will, and guide you, I shall.";
      default:
        return "Hello! How can I help you today?";
    }
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleBackToSelection = () => {
    setSelectedCharacter(null);
    setChatState({
      messages: [],
      isLoading: false,
      input: '',
    });
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || chatState.isLoading || !selectedCharacter) return;

    const userMessage: MessageType = {
      id: generateUniqueId(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message and set loading state
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: selectedCharacter.systemPrompt,
            },
            ...chatState.messages.map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: 'user',
              content: content.trim(),
            },
          ],
          max_tokens: 1000,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: MessageType = {
        id: generateUniqueId(),
        content: data.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: MessageType = {
        id: generateUniqueId(),
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key configuration and try again.`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  };

  // Show character selection if no character is selected
  if (!selectedCharacter) {
    return <CharacterSelection onSelectCharacter={handleSelectCharacter} />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToSelection}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 focus-enhanced"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline font-medium">Back</span>
        </Button>
        <ChatHeader character={selectedCharacter} />
      </div>
      
      {/* Chat Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 relative">
        <div className="mx-auto max-w-4xl">
          {chatState.messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              character={selectedCharacter}
              isLatest={index === chatState.messages.length - 1}
            />
          ))}
          
          {chatState.isLoading && <TypingIndicator character={selectedCharacter} />}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput
        onSendMessage={sendMessage}
        isLoading={chatState.isLoading}
        placeholder={`Chat with ${selectedCharacter.name}...`}
      />
    </div>
  );
}