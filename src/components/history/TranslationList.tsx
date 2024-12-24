import { useState, useEffect } from 'react';
import { translationStore } from '../../store/translationStore';
import TranslationEntry from './TranslationEntry';
import DatePicker from './DatePicker';

export default function TranslationList() {
  const [translations, setTranslations] = useState(translationStore.getAllEntries());
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    setTranslations(translationStore.getAllEntries());
  }, [selectedDate]);

  const handleDelete = (date: string) => {
    translationStore.deleteEntry(date);
    setTranslations(translationStore.getAllEntries());
  };

  return (
    <div className="translation-history">
      <DatePicker onDateSelect={setSelectedDate} />
      
      <div className="translations">
        {translations.length === 0 ? (
          <p className="no-translations">No translations found</p>
        ) : (
          translations.map(entry => (
            <TranslationEntry 
              key={entry.date}
              entry={entry}
              onDelete={() => handleDelete(entry.date)}
            />
          ))
        )}
      </div>

      <style>{`
        .translation-history {
          margin-top: 2rem;
        }
        .no-translations {
          text-align: center;
          color: #666;
          font-style: italic;
          margin: 2rem 0;
        }
        .translations {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
}