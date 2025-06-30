import { v4 as uuidv4 } from "uuid";
export default function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.titelInput,
        description: "",
        isCompleted: false,
      };

      const UpdateTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(UpdateTodos));

      return UpdateTodos;
    }

    case "deleted": {
      const upTodos = currentTodos.filter(
        (todu) => todu.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(upTodos));
      return upTodos;
    }

    case "edited": {
      const editTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            description: action.payload.description,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(editTodos));
      return editTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    case "toggledCompleted": {
      const updateTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = {
            ...t, isCompleted: !t.isCompleted
          }
          return updatedTodo
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    default: {
      throw Error("Uknown Action " + action.type);
    }
  }
  return [];
}
