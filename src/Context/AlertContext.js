import { createContext, useState, useContext } from "react";
import MySnackbar from "../MySnackbar";

const AlertContext = createContext({});

export const ShowAlertContext = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideAlert(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <AlertContext.Provider value={{ showHideAlert }}>
      <MySnackbar open={open} message={message} />
      {children}
    </AlertContext.Provider>
  );
};


export const useAlert = () => {
  return useContext(AlertContext)
} 
