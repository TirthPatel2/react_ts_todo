import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// createContext
// provider
// consumer=>useContext
export type TodosProviderProp = {
    children: ReactNode
};

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddToDo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleTodoDelete: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProp) => {

    const navigate = useNavigate();
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        }
        catch {
            return [];
        }
    });

    const handleAddToDo = (task: string) => {
        if (task.trim())
            setTodos((prev: Todo[]): Todo[] => {
                prev = [
                    {
                        id: Math.random().toString(),
                        task: task,
                        completed: false,
                        createdAt: new Date()
                    },
                    ...prev
                ]
                localStorage.setItem("todos", JSON.stringify(prev));
                return prev;
            })

        navigate('/');
        // window.location.href = 'http://localhost:5173/';
    }

    //completed task
    const toggleTodoAsCompleted = (id: string): void => {

        setTodos((prev: Todo[]): Todo[] => {
            prev = prev.map((todo: Todo) => {

                // console.log('before', todo.completed);
                if (todo.id === id) {
                    // todo.completed = !todo.completed;
                    // dont try this cause can not change todo directly 
                    // dont know why but fetching a bug
                    return { ...todo, completed: !todo.completed };
                }
                // console.log('after', todo.completed);
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(prev));
            return prev;
        })
    }

    //delete todo
    const handleTodoDelete = (id: string): void => {
        setTodos((prev: Todo[]): Todo[] => {
            prev = prev.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(prev));
            return prev;
        });
    }


    return <todosContext.Provider value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleTodoDelete }}>{children}</todosContext.Provider>
}

//consumer

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if (!todosConsumer)
        throw new Error("useTodos used outside of Provider");
    return todosConsumer;
}