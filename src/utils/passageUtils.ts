import { passages } from '../data/passages';

export function getPassageForDate(dateString: string): typeof passages[0] | null {
  const date = new Date(dateString);
  const passageIndex = date.getDate() % passages.length;
  return passages[passageIndex];
}