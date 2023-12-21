import {useEffect, useState} from 'react'
import './App.css'
import CreateTask from "./components/CreateTask.jsx";
import ListTaks from "./components/ListTaks.jsx";
import {Stack} from "@mui/material";
import {Toaster} from "react-hot-toast";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
const [tasks, setTasks] = useState([]);
console.log("tasks",tasks)

    useEffect(()=>{
        setTasks(JSON.parse(localStorage.getItem("tasks")))
    },[])
  return (
    <>
        <DndProvider backend={HTML5Backend}>
            <Toaster  position="top-right"/>
            <Stack sx={{ height: { md: '100vh', sm: '100%'},display: 'flex' ,backgroundColor: '#f5f5f5' }}>
                <CreateTask tasks={tasks} setTasks={setTasks} />
                <ListTaks tasks={tasks} setTasks={setTasks} />
            </Stack>
        </DndProvider>

        </>
  );
}

export default App
