import { useState, useCallback, memo } from 'react';
import { Todo, useTodoStore } from '../store/todo.store';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = memo(({ todo }: TodoItemProps) => {
  const { removeTodo, toggleComplete, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(todo.text);

  const handleUpdate = useCallback(() => {
    const trimmedText = newText.trim();
    if (trimmedText) {
      updateTodo(todo.id, trimmedText);
    }
    setIsEditing(false);
  }, [newText, todo.id, updateTodo]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setNewText(todo.text);
  }, [todo.text]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleUpdate();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    },
    [handleUpdate, handleCancel]
  );

  const handleToggle = useCallback(() => {
    toggleComplete(todo.id);
  }, [todo.id, toggleComplete]);

  const handleRemove = useCallback(() => {
    removeTodo(todo.id);
  }, [todo.id, removeTodo]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className='todo-content'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark "${todo.text}" as ${
            todo.completed ? 'incomplete' : 'complete'
          }`}
          className='todo-checkbox'
          disabled={isEditing}
        />

        {isEditing ? (
          <input
            type='text'
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyPress}
            className='edit-input'
            maxLength={100}
            autoFocus
            aria-label='Edit task'
          />
        ) : (
          <span className='todo-text'>{todo.text}</span>
        )}
      </div>

      <div className='todo-actions'>
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              onMouseDown={(e) => e.preventDefault()}
              className='save-button'
              style={{ marginLeft: '5px' }}
              aria-label='Save changes'
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              onMouseDown={(e) => e.preventDefault()}
              className='cancel-button'
              aria-label='Cancel editing'
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className='edit-button'
              aria-label={`Edit "${todo.text}"`}
            >
              ✏️
            </button>
            <button
              onClick={handleRemove}
              className='remove-button'
              aria-label={`Delete "${todo.text}"`}
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;
