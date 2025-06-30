import { createContext, useContext, useReducer } from "react";
import TodosReducer from "../Reducer/todosReducer";

export const TodosContent = createContext([]) 
export const TodosContext = createContext([]) 
const TodosProvider = ({children}) => {
    const [todos, dispatch] = useReducer(TodosReducer, [])
    return(
        <TodosContext.Provider value={{todos, dispatch}}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(TodosContext)
}

export default TodosProvider