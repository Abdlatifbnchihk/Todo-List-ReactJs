import { useTodos } from "./Context/MyContext";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { useAlert } from "./Context/AlertContext";
export default function TaskItemComponenet({ todo, setOpenState, setSelectedTodoId, handleEditeConfirm, setEditState, setEditedTodo }) {

  const {todos, dispatch} = useTodos()
  // const { todos, setTodos } = useContext(TodosContent);
  const { showHideAlert } = useAlert();
  function handelCkick() {
    dispatch({type:"toggledCompleted", payload: todo})
    showHideAlert("تم العديل بنجاح")
  }

  function handelClickDelete() {
    setOpenState(true);
  }

  function handelEditClick() {
    setEditState(true);
  }

  function handleDeleteConfirm() {
    setOpenState(true)
    setSelectedTodoId(todo)
  }

  function handleEditeConfirm() {
    setEditState(true)
    setSelectedTodoId(todo)
    setEditedTodo({
      title: todo.title,
      description: todo.description,
    })
  }

  return (
    <>

      <div className="item">
        <div className="item__icons" style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => {
              handleDeleteConfirm()
            }}
            style={{
              cursor: "pointer",
              border: "1px solid red",
              borderRadius: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "35px",
              width: "35px",
            }}
          >
            <DeleteIcon sx={{ color: "#d50000" }} />
          </button>
          <button
            onClick={handleEditeConfirm}
            style={{
              cursor: "pointer",
              border: "1px solid #a99f9f",
              borderRadius: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "35px",
              width: "35px",
            }}
          >
            <Edit color="action" />
          </button>
          <button
            onClick={() => {
              handelCkick();
            }}
            style={{
              cursor: "pointer",
              border: "1px solid green",
              borderRadius: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "35px",
              width: "35px",
              background: todo.isCompleted ? "#4caf50" : "white",
            }}
          >
            <CheckCircleOutlineOutlinedIcon
              sx={{ color: todo.isCompleted ? "white" : "#4caf50" }}
              variant="outlined"
            />
          </button>
        </div>
        <div className="item__content">
          <p
            style={{
              color: "white",
              width: "340px",
              overflow: "hidden",
              // padding: "15px 0",
              textAlign: "right",
              margin: 0,
              textDecoration: todo.isCompleted ? "line-through" : "",
            }}
          >
            {todo.title}
          </p>
          <br />{" "}
          <span
            style={{
              color: "#212121",
              textAlign: "right",
              display: "block",
              marginTop: "-15px",
            }}
          >
            {" "}
            {todo.description}
          </span>
        </div>
      </div>
    </>
  );
}
