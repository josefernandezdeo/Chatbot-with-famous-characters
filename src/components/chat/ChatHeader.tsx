import { Sparkles } from 'lucide-react';
import type { Character } from '@/types/chat';

interface ChatHeaderProps {
  character?: Character;
}

export function ChatHeader({ character }: ChatHeaderProps) {
  if (!character) {
    return (
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-white truncate tracking-tight">AI Assistant</h1>
          <p className="text-xs sm:text-sm text-slate-300 truncate font-medium">Choose a character to chat with</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-2xl overflow-hidden shadow-xl ring-2 ring-slate-600/50 flex-shrink-0">
        <img 
          src={character.avatar} 
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg sm:text-xl font-semibold text-white truncate tracking-tight">{character.name}</h1>
        <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1 truncate font-medium">
          <Sparkles className="h-3 w-3 flex-shrink-0 text-yellow-400" />
          <span className="truncate">{character.title}</span>
        </p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
        <span className="text-xs text-slate-300 hidden sm:inline font-medium">In Character</span>
      </div>
    </div>
  );
}