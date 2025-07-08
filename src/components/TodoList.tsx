import { useMemo } from 'react';
import { useTodoStore } from '../store/todo.store';
import { TodoStats, TodoItem } from './index';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);

  const todoStats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [todos]);

  if (todos.length === 0) {
    return (
      <div className='empty-state'>
        <p>
          <b>No tasks yet</b>
          <br />
          Add one above to get started! 🚀
        </p>
      </div>
    );
  }

  return (
    <div className='todo-list-container'>
      <TodoStats stats={todoStats} />
      <ul className='todo-list' role='list'>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
