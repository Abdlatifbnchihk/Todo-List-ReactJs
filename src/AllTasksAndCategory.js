import { Description, FlashOnRounded, Update } from "@mui/icons-material";
import TaskItemComponenet from "./TaskItemComponenet";
import {
  useState,
  useContext,
  useEffect,
  useMemo,
  useActionState,
  useReducer,
} from "react";
import { useTodos } from "./Context/MyContext";
import { useAlert } from "./Context/AlertContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
export default function TasksComponent() {
  // const [todos, dispatch] = useReducer(reducerTodos, []);

  const {todos, dispatch} = useTodos();
  

  const { showHideAlert } = useAlert();

  // const [titleInputValue, setTitleInputValue] = useState("")
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [titelInput, setTitelInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState({
    title: "",
    description: "",
  });

  // fiterastion Array
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType == "not-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  const todosList = todosToBeRendered.map((t) => {
    return (
      <TaskItemComponenet
        key={t.id}
        todo={t}
        onDelete={handleDeleteConfirm}
        setOpenState={setOpen}
        setSelectedTodoId={setSelectedTodoId}
        onEdit={handleEditeConfirm}
        setEditState={setEdit}
        setEditedTodo={setEditedTodo}
      />
    );
  });

  useEffect(() => {
    dispatch({type: "get"})
  }, []);

  function handelChange() {
    dispatch({ type: "added", payload: { titelInput: titelInput } });
    setTitelInput("");
    showHideAlert("الإضافة تمت بنجاح");
  }

  // DELETE FUNCTIONS

  function handelClose() {
    setOpen(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: selectedTodoId });
    setOpen(false);
    showHideAlert("تم الحذف بنجاح");
  }

  // UPDATE FUNCTIONS

  function handelEditClose() {
    setEdit(false);
  }

  function handleEditeConfirm() {
    dispatch({type: "edited", payload: {id: selectedTodoId.id, title: editedTodo.title, description: editedTodo.description}})
    setEdit(false);
    showHideAlert("تم التعديل بنجاح");
  }

  return (
    <>
      {/* START DELETE MODAL  */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={handelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت مأكد من رغبتك في حذف المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لايمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose}>إغلاق</Button>
          <Button
            autoFocus
            onClick={() => {
              handleDeleteConfirm(todos.id);
            }}
          >
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* END DELETE MODAL */}

      {/* START EDiT MODAL */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={edit}
        onClose={handelEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogTitle id="alert-dialog-title">
          <TextField
            style={{ width: "300px" }}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            variant="standard"
            value={editedTodo.title}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, title: e.target.value });
            }}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            style={{ width: "300px" }}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            type="text"
            variant="standard"
            value={editedTodo.description}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelEditClose}>إلغاء</Button>
          <Button
            onClick={() => {
              handleEditeConfirm(selectedTodoId);
            }}
            autoFocus
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* END EDIT MODAL */}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ToggleButtonGroup
          value={displayTodosType}
          exclusive
          onChange={changeDisplayedType}
          aria-label="text alignment"
        >
          <ToggleButton
            className="btt__cate"
            value="not-completed"
            aria-label="left aligned"
          >
            غير منجز
          </ToggleButton>
          <ToggleButton
            className="btt__cate"
            value="completed"
            aria-label="centered"
          >
            منجز
          </ToggleButton>
          <ToggleButton
            className="btt__cate"
            value="all"
            aria-label="right aligned"
          >
            الكل
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="items">{todosList}</div>
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
