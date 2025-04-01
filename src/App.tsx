import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

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
