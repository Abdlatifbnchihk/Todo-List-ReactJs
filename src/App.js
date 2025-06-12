import './App.css';
import CardComponent from './CardComponent';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { TodosContent } from './Context/MyContext';
const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    description: "في خمسة ايام",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    description: "في خمسة ايام",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    description: "في خمسة ايام",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    description: "في خمسة ايام",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="App" style={{display: 'flex', margin: '40px auto', background: "#bbdefb" , width: "550px", borderRadius: "14px"}}>
      <TodosContent.Provider value={{todos, setTodos}}>
        <CardComponent/>
      </TodosContent.Provider>  
    </div>
  );
}

export default App;
