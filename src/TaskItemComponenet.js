import React, { useContext, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { TodosContent } from "./Context/MyContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { upload } from "@testing-library/user-event/dist/upload";
export default function TaskItemComponenet({ todo, handeCheckClick }) {
  const { todos, setTodos } = useContext(TodosContent);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState({title: todo.title, description: todo.description})


  function handelCkick() {
    const updateTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    localStorage.setItem('todos', JSON.stringify(updateTodos))
    setTodos(updateTodos);
  }

  function handelClickDelete() {
    setOpen(true);
  }

  function handelClose() {
    setOpen(false);
  }

  function handelEditClick() {
    setEdit(true);
  }

  function handelEditClose() {
    setEdit(false);
  }

  function handleDeleteConfirm(idToDelete) {
    const upTodos = todos.filter((todu) => todu.id !== idToDelete);
    localStorage.setItem('todos', JSON.stringify(upTodos))
    setTodos(upTodos);
    // setTodos(edit) 
  }

  function handleEditeConfirm() {
    const editTodos = todos.map((t) => {
        if(t.id == todo.id) {
            return {...t, title: editedTodo.title, description: editedTodo.description}
        } else {
            return t;
        }
    })
    localStorage.setItem('todos', JSON.stringify(editTodos))
    setTodos(editTodos)
    setEdit(false)
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
              handleDeleteConfirm(todo.id);
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
        <DialogTitle id="alert-dialog-title">
          تعديل المهمة
        </DialogTitle>
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
                setEditedTodo({...editedTodo, title: e.target.value})
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
              setEditedTodo({...editedTodo, description: e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelEditClose}>إلغاء</Button>
          <Button
            onClick={() => {
              handleEditeConfirm(todo.id);
            }}
            autoFocus
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* END EDIT MODAL */}
      <div className="item">
        <div className="item__icons" style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={handelClickDelete}
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
            onClick={handelEditClick}
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
              textDecoration: todo.isCompleted ? "line-through" : ""
            }}
          >
            {todo.title}
          </p>
          <br /> <span style={{ color: "#212121", textAlign: "right", display: "block", marginTop: "-15px" }}> {todo.description}</span>
        </div>
      </div>
    </>
  );
}
