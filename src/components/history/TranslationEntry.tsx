import { useState } from 'react';
import { translationStore } from '../../store/translationStore';
import { type TranslationEntry as TranslationEntryType } from '../../store/types';
import { getPassageForDate } from '../../utils/passageUtils';
import { formatDate } from '../../utils/dateUtils';
import TranslationControls from './TranslationControls';

interface Props {
  entry: TranslationEntryType;
  onDelete: () => void;
}

export default function TranslationEntry({ entry, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [translation, setTranslation] = useState(entry.translation);
  const [notes, setNotes] = useState(entry.notes);
  
  const passage = getPassageForDate(entry.date);

  const handleSave = () => {
    translationStore.saveEntry({
      ...entry,
      translation,
      notes
    });
    setIsEditing(false);
  };

  return (
    <div className="entry">
      <div className="entry-header">
        <h3>{formatDate(entry.date)}</h3>
        <TranslationControls 
          isEditing={isEditing}
          onEdit={() => setIsEditing(!isEditing)}
          onDelete={onDelete}
          onSave={isEditing ? handleSave : undefined}
        />
      </div>

      {passage && (
        <div className="passage">
          <p className="context">{passage.context}</p>
          <p className="latin">{passage.latin}</p>
        </div>
      )}

      {isEditing ? (
        <div className="edit-form">
          <textarea
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Your translation"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Your notes"
          />
        </div>
      ) : (
        <div className="content">
          <p className="translation">{translation}</p>
          <p className="notes">{notes}</p>
        </div>
      )}

      <style>{`
        .entry {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        textarea {
          width: 100%;
          min-height: 100px;
          margin: 0.5rem 0;
          padding: 0.5rem;
        }
        .passage {
          margin: 1rem 0;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 4px;
        }
        .context {
          font-style: italic;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .latin {
          font-family: "Times New Roman", serif;
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
}