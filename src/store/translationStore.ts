import { type TranslationEntry } from './types';

class TranslationStore {
  private static instance: TranslationStore;
  
  private constructor() {}

  static getInstance(): TranslationStore {
    if (!TranslationStore.instance) {
      TranslationStore.instance = new TranslationStore();
    }
    return TranslationStore.instance;
  }

  private getKey(date: string): string {
    return `translation_${date}`;
  }

  saveEntry(entry: TranslationEntry): void {
    const key = this.getKey(entry.date);
    localStorage.setItem(key, JSON.stringify(entry));
  }

  getEntry(date: string): TranslationEntry | null {
    const key = this.getKey(date);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }

  deleteEntry(date: string): void {
    const key = this.getKey(date);
    localStorage.removeItem(key);
  }

  getAllEntries(): TranslationEntry[] {
    const entries: TranslationEntry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('translation_')) {
        const entry = localStorage.getItem(key);
        if (entry) {
          entries.push(JSON.parse(entry));
        }
      }
    }
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export const translationStore = TranslationStore.getInstance();