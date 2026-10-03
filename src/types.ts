export interface Phrase {
  id: string;
  burmese: string;
  pronunciation: string;
  english: string;
  category: 'greetings' | 'polite' | 'daily' | 'blessings' | 'questions';
  formal?: boolean;
  notes?: string;
}

export interface GreetingTemplate {
  id: string;
  titleMm: string;
  titleEn: string;
  messageMm: string;
  messageEn: string;
  occasion: 'general' | 'morning' | 'evening' | 'health' | 'festival' | 'gratitude' | 'blessings';
  bgGradient: string;
  accentColor: string;
}

export type Language = 'my' | 'en';
