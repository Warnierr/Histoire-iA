'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  religionContext?: {
    name: string;
    category: string;
  };
}

export function ChatInterface({ religionContext }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour ! Je suis votre guide pour explorer les religions du monde. Posez-moi des questions sur les croyances, l\'histoire, ou les relations entre traditions religieuses.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = religionContext
    ? [
        `Quelle est l'histoire du ${religionContext.name} ?`,
        `Quelles sont les croyances principales ?`,
        `Quels sont les liens avec d'autres religions ?`,
      ]
    : [
        'Quelles sont les différences entre sunnisme et chiisme ?',
        'Comment le bouddhisme s\'est-il développé depuis l\'hindouisme ?',
        'Qu\'est-ce que les religions abrahamiques ont en commun ?',
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Appeler l'API OpenRouter une fois configurée
    // Pour l'instant, message de démo
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `🔧 **IA en configuration**\n\nPour activer les réponses de l'IA :\n\n1. Obtenez une clé API OpenRouter sur https://openrouter.ai\n2. Ajoutez-la dans le fichier \`.env\` :\n   \`\`\`\n   OPENROUTER_API_KEY="votre-clé"\n   \`\`\`\n3. Relancez le serveur\n\nEn attendant, explorez le graphe interactif pour découvrir les religions !`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-lg">Assistant IA</h2>
          {religionContext && (
            <Badge variant="secondary" className="ml-auto">
              {religionContext.name}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Explorez les religions avec l'aide de l'IA
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Questions suggérées :</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}

