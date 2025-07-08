import { TodoInput, TodoList } from './components';

function App() {
  return (
    <div className='app-container'>
      <header className='app-header'>
        <h1>My Tasks</h1>
        <p className='app-subtitle'>Stay organized and productive</p>
      </header>

      <main className='app-main'>
        <TodoInput />
        <TodoList />
      </main>

      <footer className='app-footer'>
        <p>Built with ❤️ using React & Zustand</p>
      </footer>
    </div>
  );
}

export default App;
