import { useState } from 'react';
import { getPassageForDate } from '../../utils/passageUtils';

interface Props {
  onDateSelect: (date: string) => void;
}

export default function DatePicker({ onDateSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="date-picker">
      <h3>Add Translation for Past Date</h3>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        max={new Date().toISOString().split('T')[0]}
      />

      {selectedDate && getPassageForDate(selectedDate) && (
        <div className="selected-passage">
          <p>A passage is available for this date</p>
        </div>
      )}

      <style>{`
        .date-picker {
          margin-bottom: 2rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input {
          margin-top: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .selected-passage {
          margin-top: 1rem;
          color: #4CAF50;
        }
      `}</style>
    </div>
  );
}