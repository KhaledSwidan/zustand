import { useState } from 'react';
import { useTodoStore } from '../store/todo.store';

const TodoInput = () => {
  const [task, setTask] = useState('');
  const { addTodo } = useTodoStore();

  const handleAdd = () => {
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  };

  return (
    <div className='todo-input'>
      <input
        type='text'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder='Enter a task'
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoInput;
