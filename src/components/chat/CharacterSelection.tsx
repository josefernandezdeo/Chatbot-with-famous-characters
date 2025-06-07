import { Character } from '@/types/chat';
import { characters } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Sparkles, Zap } from 'lucide-react';

interface CharacterSelectionProps {
  onSelectCharacter: (character: Character) => void;
}

export function CharacterSelection({ onSelectCharacter }: CharacterSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white shadow-2xl animate-gradient">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex-1 text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Character Chat</h1>
            <p className="text-sm sm:text-base text-slate-300 flex items-center gap-2 font-medium">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
              Choose your conversation partner
            </p>
          </div>
        </div>
      </div>

      {/* Character Selection */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="mx-auto max-w-6xl w-full">
          <div className="text-left mb-8 sm:mb-12 px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Who would you like to 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"> chat with?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-medium">
              Select a character below to start a conversation. Each has their own unique personality and speaking style powered by advanced AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            {characters.map((character, index) => (
              <Card 
                key={character.id} 
                className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 border border-slate-700/50 hover:border-blue-500/30 bg-slate-800/50 backdrop-blur-xl glass relative overflow-hidden"
                onClick={() => onSelectCharacter(character)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                
                <CardHeader className="text-left pb-3 sm:pb-4 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 mb-3 sm:mb-4 ring-2 ring-slate-600/50 group-hover:ring-blue-400/50 relative">
                    <img 
                      src={character.avatar} 
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-left text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                    {character.name}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base lg:text-lg font-semibold text-slate-300 text-left group-hover:text-slate-200 transition-colors duration-300">
                    {character.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-left px-4 sm:px-6 relative z-10">
                  <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6 leading-relaxed text-left group-hover:text-slate-300 transition-colors duration-300">
                    {character.description}
                  </p>
                  <Button 
                    className={`w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-105 text-sm sm:text-base py-2 sm:py-3 font-semibold border border-slate-600 hover:border-blue-500/50 focus-enhanced`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Chatting
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-left mt-8 sm:mt-12 px-4">
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              ✨ Each character uses advanced AI to maintain their unique personality throughout the conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}