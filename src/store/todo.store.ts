import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (task: string) => void;
  removeTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist<TodoStore>(
      (set) => ({
        todos: [],
        addTodo: (task) =>
          set((state) => {
            const newTodos = [
              ...state.todos,
              { id: Date.now(), text: task, completed: false },
            ];
            return { todos: newTodos };
          }),
        removeTodo: (id) =>
          set((state) => {
            const newTodos = state.todos.filter((todo) => todo.id !== id);
            return { todos: newTodos };
          }),
        toggleComplete: (id) =>
          set((state) => {
            const newTodos = state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            return { todos: newTodos };
          }),
        updateTodo: (id, text) =>
          set((state) => {
            const newTodos = state.todos.map((todo) =>
              todo.id === id ? { ...todo, text } : todo
            );
            return { todos: newTodos };
          }),
      }),
      {
        name: 'todo-storage', // unique name for the storage (must be unique)
      }
    )
  )
);
