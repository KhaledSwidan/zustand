import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todos: [],

        addTodo: (text) =>
          set((state) => ({
            todos: [
              {
                id: Date.now(),
                text: text.trim(),
                completed: false,
                createdAt: Date.now(),
              },
              ...state.todos,
            ],
          })),

        removeTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),

        toggleComplete: (id) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),

        updateTodo: (id, text) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, text: text.trim() } : todo
            ),
          })),

        clearCompleted: () =>
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
          })),
      }),
      {
        name: 'todo-storage',
        version: 1,
      }
    ),
    {
      name: 'todo-store',
    }
  )
);
