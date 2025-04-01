import { useTodoStore } from '../store/todo.store';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
