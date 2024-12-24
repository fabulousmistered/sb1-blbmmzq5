import { useEffect, useState } from 'react';
import { translationStore } from '../store/translationStore';

interface TranslationFormProps {
  passageId: string;
  date: string;
}

export default function TranslationForm({ passageId, date }: TranslationFormProps) {
  const [translation, setTranslation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const stored = translationStore.getEntry(date);
    if (stored) {
      setTranslation(stored.translation);
      setNotes(stored.notes);
    }
  }, [date]);

  const handleTranslationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranslation(e.target.value);
    translationStore.saveEntry({
      date,
      translation: e.target.value,
      notes,
      passageId
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    translationStore.saveEntry({
      date,
      translation,
      notes: e.target.value,
      passageId
    });
  };

  return (
    <div>
      <div className="translation-section">
        <h3>Your Translation</h3>
        <textarea
          value={translation}
          onChange={handleTranslationChange}
          placeholder="Enter your translation here..."
          className="translation-input"
        />
      </div>
      <div className="notes-section">
        <h3>Notes and Commentary</h3>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add your notes and commentary here..."
          className="notes-input"
        />
      </div>

      <style>{`
        textarea {
          width: 100%;
          min-height: 120px;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin: 1rem 0;
          font-family: inherit;
        }

        h3 {
          color: #333;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}