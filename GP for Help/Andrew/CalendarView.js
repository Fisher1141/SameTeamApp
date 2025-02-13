import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ onDateChange, chores }) {
  const handleDateChange = (date) => {
    onDateChange(date);
  };

  const highlightChores = ({ date }) => {
    const hasChore = chores.some(chore => new Date(chore.date).toDateString() === date.toDateString());
    return hasChore ? 'highlight' : null;
  };

  return (
    <div className="calendar-view">
      <Calendar
        onChange={handleDateChange}
        tileClassName={highlightChores}
      />
    </div>
  );
}

export default CalendarView;
