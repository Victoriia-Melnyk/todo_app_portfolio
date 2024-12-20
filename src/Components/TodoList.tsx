import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TempTodo } from './TempTodo';
import { useTodoContext } from './GlobalProvider';
import { chooseActіveArray } from '../utils/functions';

export const TodoList: React.FC = () => {
  const { tempTodo, todos, filteredButton } = useTodoContext();
  const displayedTodos = chooseActіveArray(filteredButton, todos);

  return (
    <section className="todoapp__main">
      {displayedTodos.map((todo: Todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
      {tempTodo && <TempTodo todo={tempTodo} />}
    </section>
  );
};
