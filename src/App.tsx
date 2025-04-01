import { TodoInput, TodoList } from './components';

function App() {
  return (
    <div className='app-container'>
      <h2>Todo List</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
