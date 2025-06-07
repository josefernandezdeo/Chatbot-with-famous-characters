import { useState } from 'react';
import { format } from 'date-fns';
import { Copy, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Message, Character } from '@/types/chat';

interface MessageProps {
  message: Message;
  character?: Character;
  isLatest?: boolean;
}

export function Message({ message, character, isLatest = false }: MessageProps) {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  return (
    <div
      className={cn(
        'group flex w-full gap-3 sm:gap-4 p-4 sm:p-6 transition-all duration-300 relative',
        isUser ? 'bg-slate-800/30' : 'bg-slate-900/20',
        isLatest && !isUser && 'animate-in fade-in-50 slide-in-from-bottom-2'
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl ring-2 ring-blue-400/20">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        ) : (
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-2xl overflow-hidden shadow-xl ring-2 ring-slate-600/50">
            <img 
              src={character?.avatar} 
              alt={character?.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white truncate tracking-tight">
            {isUser ? 'You' : character?.name || 'AI Assistant'}
          </span>
          <span className="text-xs text-slate-400 flex-shrink-0 font-medium">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap leading-6 sm:leading-7 text-slate-200 text-sm sm:text-base text-left font-medium">
            {message.content}
          </p>
        </div>

        {/* Copy button for AI messages */}
        {!isUser && (
          <div className="flex justify-start pt-1 sm:pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 sm:h-8 gap-1 sm:gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100 text-xs sm:text-sm px-2 sm:px-3 text-slate-400 hover:text-white hover:bg-slate-700/50 focus-enhanced"
            >
              {isCopied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span className="hidden sm:inline font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span className="hidden sm:inline font-medium">Copy</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}