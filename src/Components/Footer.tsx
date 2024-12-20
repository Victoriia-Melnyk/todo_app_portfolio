import classNames from 'classnames';
import { deleteTodo } from '../api/todos';
import { useTodoContext } from './GlobalProvider';

export const Footer: React.FC = () => {
  const {
    todos,
    setClearCompleted,
    setTodos,
    setErrorMessage,
    inputRef,
    filteredButton,
    setFilteredButton,
  } = useTodoContext();

  const completedTodos = todos.filter(todo => todo.completed);
  const todosLeft = todos.length - completedTodos.length;

  const onDelete = (id: number) => {
    setClearCompleted(true);
    deleteTodo(id)
      .then(() => {
        setTodos(todoState => todoState.filter(todo => todo.id !== id));
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => {
        setClearCompleted(false);
      });
  };

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => onDelete(todo.id));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{todosLeft} items left</span>

      <nav className="todoapp__filter">
        <a
          href="#/"
          className={classNames('todoapp__filter-link', {
            selected: filteredButton === 'all',
          })}
          onClick={() => setFilteredButton('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('todoapp__filter-link', {
            selected: filteredButton === 'active',
          })}
          onClick={() => setFilteredButton('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('todoapp__filter-link', {
            selected: filteredButton === 'completed',
          })}
          onClick={() => setFilteredButton('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
