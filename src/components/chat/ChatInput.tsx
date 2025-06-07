import { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  isLoading, 
  placeholder = "Type your message here..." 
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative sticky bottom-0 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 p-3 sm:p-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-2 sm:gap-3 items-end">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "min-h-[48px] sm:min-h-[60px] max-h-[120px] resize-none transition-all duration-200 text-sm sm:text-base",
                "focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50",
                "border-slate-600/50 bg-slate-800/50 text-white placeholder:text-slate-400",
                "backdrop-blur-sm font-medium focus-enhanced"
              )}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={cn(
              "h-[48px] w-[48px] sm:h-[60px] sm:w-[60px] rounded-2xl transition-all duration-300 flex-shrink-0",
              "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
              "shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105",
              "disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-lg",
              "border border-blue-400/20 focus-enhanced"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
            ) : (
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
        
        <p className="text-xs text-slate-400 mt-2 text-center font-medium">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}