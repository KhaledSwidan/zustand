import { useState, useCallback } from 'react';
import { useTodoStore } from '../store/todo.store';

const TodoInput = () => {
  const [task, setTask] = useState<string>('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAdd = useCallback(() => {
    const trimmedTask = task.trim();
    if (trimmedTask) {
      addTodo(trimmedTask);
      setTask('');
    }
  }, [task, addTodo]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    },
    [handleAdd]
  );

  return (
    <div className='todo-input'>
      <input
        type='text'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder='What needs to be done?'
        aria-label='Add new task'
        maxLength={100}
      />
      <button
        onClick={handleAdd}
        disabled={!task.trim()}
        aria-label='Add task'
        className='add-button'
      >
        Add Task
      </button>
    </div>
  );
};

export default TodoInput;
