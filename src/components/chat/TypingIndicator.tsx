import type { Character } from '@/types/chat';

interface TypingIndicatorProps {
  character?: Character;
}

export function TypingIndicator({ character }: TypingIndicatorProps) {
  return (
    <div className="flex w-full gap-3 sm:gap-4 p-4 sm:p-6 animate-in fade-in-50 slide-in-from-bottom-2">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-2xl overflow-hidden shadow-xl ring-2 ring-slate-600/50">
          <img 
            src={character?.avatar} 
            alt={character?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Typing animation */}
      <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white truncate tracking-tight">
            {character?.name || 'AI Assistant'}
          </span>
          <span className="text-xs text-slate-400 font-medium">typing...</span>
        </div>

        <div className="flex items-center gap-1 py-2">
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s] shadow-lg"></div>
            <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s] shadow-lg"></div>
            <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}