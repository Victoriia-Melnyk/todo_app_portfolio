import { TodoList } from './Components/TodoList';
import { Header } from './Components/Header';
import { useTodoContext } from './Components/GlobalProvider';
import { Loader } from './Components/Loader';
import { Footer } from './Components/Footer';
import classNames from 'classnames';

export const App: React.FC = () => {
  const { isLoading, todos, errorMessage, setErrorMessage } = useTodoContext();
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoading ? <Loader /> : <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>

      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
