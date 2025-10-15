import OpenAI from 'openai';

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL!,
    'X-Title': 'Religious Map Explorer',
  },
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

/**
 * Chat completion via OpenRouter
 */
export async function chatCompletion(
  messages: ChatMessage[],
  options: ChatOptions = {}
) {
  const {
    model = 'anthropic/claude-3.5-sonnet',
    temperature = 0.7,
    maxTokens = 2000,
    stream = true,
  } = options;

  try {
    const response = await openrouter.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream,
    });

    return response;
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw new Error('Failed to get LLM response');
  }
}

/**
 * Generate text embedding via OpenRouter
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openrouter.embeddings.create({
      model: 'openai/text-embedding-ada-002',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Embedding API error:', error);
    throw new Error('Failed to generate embedding');
  }
}

