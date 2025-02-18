import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';



const ChoresCalendar = ({ chores, toggleChoreCompletion }) => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('Selected date:', date);
    console.log('All chores:', chores);

    // Ensure chores are filtered based on a valid date
    const tasksForDate = chores.filter(chore => {
      const choreDate = new Date(chore.date);
      
      // Log chore date to check if it's valid
      console.log('Chore date:', choreDate);

      // Check if chore date is valid
      if (isNaN(choreDate)) {
        console.warn(`Invalid date for chore:`, chore);
        return false; // Skip this chore if the date is invalid
      }

      // Compare ISO strings for consistent date matching (strip time component)
      return choreDate.toISOString().split('T')[0] === date.toISOString().split('T')[0];
    });

    console.log('Tasks for selected date:', tasksForDate);
    setTasks(tasksForDate);
  }, [date, chores]);
  return (
    <div className="calendar-tasks-container">
      <div className="calendar-section">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="divider"></div>
      <div className="tasks-section">
        <h3>Tasks for {date.toDateString()}</h3>
        {tasks.length === 0 ? (
          <p>No chores for this date.</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text} - {task.completed ? 'Completed' : 'Pending'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChoresCalendar;