import { Description, FlashOnRounded, Update } from "@mui/icons-material";
import EmptyTask from "./EmptyTaskComponenet";
import TaskItemComponenet from "./TaskItemComponenet";
import { useState, useContext, useEffect } from "react";
import { TodosContent } from "./Context/MyContext";
import { v4 as uuidv4 } from "uuid";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
export default function TasksComponent() {

  const {todos, setTodos} = useContext(TodosContent)
  const [titelInput, setTitelInput] = useState("")

  const [displayTodosType, setDisplayTodosType] = useState("all");

  // fiterastion Array
  const completedTodos = todos.filter((t) => {
    return t.isCompleted
  })

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted
  })

  let todosToBeRendered = todos

  if(displayTodosType == "completed") {
    todosToBeRendered = completedTodos
  } else if(displayTodosType == "not-completed") {
    todosToBeRendered = notCompletedTodos
  } else {
    todosToBeRendered = todos
  }
  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value)
  }

  const todosList = todosToBeRendered.map((t) => {
    return (
      <TaskItemComponenet
        key={t.id}
        todo={t}
      />
    );
  });

 useEffect(() => {
  const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
  setTodos(storageTodos)
 }, [])

  function handelChange() {
    const newTodo = {
      id: uuidv4(),
      title: titelInput,
      description: "", 
      isCompleted: false
    }

    const UpdateTodos = [...todos, newTodo] 
    localStorage.setItem('todos', JSON.stringify(UpdateTodos))
    setTodos(UpdateTodos)

    setTitelInput("")
  }


  return (
    <>
      <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <ToggleButtonGroup
        value={displayTodosType}
        exclusive
        onChange={changeDisplayedType}
        aria-label="text alignment"
      >
        <ToggleButton className="btt__cate" value="not-completed" aria-label="left aligned">
          غير منجز
        </ToggleButton>
        <ToggleButton className="btt__cate"  value="completed" aria-label="centered">
          منجز
        </ToggleButton>
        <ToggleButton className="btt__cate"  value="all" aria-label="right aligned">
          الكل
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
      <div className="items">
        {todosList}
      </div>
      <div className="add__new__task">
          <form
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <button
              className="add__bttn"
              onClick={() => {
                handelChange();
              }}
              disabled={titelInput.length == 0}
            >
              إضافة
            </button>
            <input
              type="text"
              value={titelInput}
              onChange={(e) => {
                setTitelInput(e.target.value);
              }}
              placeholder="عنوان المهمة "
            />
          </form>
      </div>
    </>  
  );
}
