import { Todo, useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom';

const Todos = () => {
    const { todos, toggleTodoAsCompleted, handleTodoDelete } = useTodos();
    let filteredData = todos;
    const [searchParams] = useSearchParams();
    let todosData = searchParams.get('todos');
    if (todosData === 'active') {
        filteredData = filteredData.filter((todo: Todo) => !todo.completed);
    }
    if (todosData === 'completed') {
        filteredData = filteredData.filter((todo: Todo) => todo.completed);
    }
    return (
        <>
            <ul className='main-task'>
                {filteredData.map((todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onChange={() => toggleTodoAsCompleted(todo.id)}
                        />
                        <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                        {
                            todo.completed && <button type='button' onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                        }
                    </li>
                })}
            </ul>
        </>
    )
}

export default Todos