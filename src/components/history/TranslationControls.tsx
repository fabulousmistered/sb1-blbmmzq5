import { type TranslationEntry } from '../../store/types';

interface Props {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave?: () => void;
}

export default function TranslationControls({ isEditing, onEdit, onDelete, onSave }: Props) {
  return (
    <div className="actions">
      <button onClick={onEdit}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && onSave && (
        <button className="save" onClick={onSave}>Save</button>
      )}
      <button className="delete" onClick={onDelete}>Delete</button>

      <style>{`
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        .delete {
          background: #ff4444;
          color: white;
        }
        .save {
          background: #4CAF50;
          color: white;
        }
      `}</style>
    </div>
  );
}