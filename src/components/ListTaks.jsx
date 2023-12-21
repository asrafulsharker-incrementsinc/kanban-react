import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";
import {useDrag, useDrop} from "react-dnd";

const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inprogress, setInprogress] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        if (tasks) {
            const fTodos = tasks.filter((task) => task.status === "todo");
            const fInprogress = tasks.filter((task) => task.status === "inprogress");
            const fCompleted = tasks.filter((task) => task.status === "completed");

            setTodos(fTodos);
            setInprogress(fInprogress);
            setCompleted(fCompleted);
        }
    }, [tasks]);

    const statuses = ["todo", "inprogress", "completed"];

    return (
        <Container maxWidth="lg">
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                justifyItems="center"
            >
                {statuses.map((status, index) => (
                    <Section
                        key={index}
                        status={status}
                        tasks={tasks}
                        setTasks={setTasks}
                        todos={todos}
                        inprogress={inprogress}
                        completed={completed}
                    />
                ))}
            </Box>
        </Container>
    );
};

const Section = ({ status, tasks, setTasks, todos, inprogress, completed }) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));


    let text = "Todo";
    let bg = "#1fa6ce";
    let tasksToMap = todos;

    if (status === "inprogress") {
        text = "In Progress";
        bg = "#6500fd";
        tasksToMap = inprogress;
    }

    if (status === "completed") {
        text = "Completed";
        bg = "#249129";
        tasksToMap = completed;
    }

    const addItemToSection =(id) => {
        console.log("dropped", id, status)
        setTasks(prev =>{
            console.log("Prev",prev)
            const mTask =prev.map(t=>{
                if(t.id === id){
                    return {...t, status: status}
                }
                return t
            });
            localStorage.setItem("tasks", JSON.stringify(mTask));
            toast("Task Status Updated !")

            return mTask;
        })
    }
        // const updatedTasks = tasks.map((task) => {
        //     if (task.id === id) {
        //         task.status = status;
        //     }

    return (
        <Box
            ref={drop}
            width="30%"
            height="100%"
            sx={{
                color: `${bg}`,
                border: isOver ? "0.5px solid gray" : "none",
                borderRadius: isOver ? "10px" : "none",
                backgroundColor: isOver ? "#E0E0E0" : "transparent",
                transition: "border 0.3s ease-in-out, background-color 0.3s ease-in-out",
            }}
        >
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {tasksToMap.length > 0 && tasksToMap.map((task) => (
                <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
            ))}
        </Box>
    );
};

const Header = ({ text, bg, count }) => {
    return (
        <Box
            sx={{
                backgroundColor: bg,
                padding: "10px",
                borderRadius: '10px',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // marginTop: "5vh",
            }}
        >
            <Typography variant="h6" sx={{ color: "#FFF", fontWeight: "bold" }}>
                {text}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    color: "#000",
                    fontWeight: "bold",
                    padding: "6px",
                    backgroundColor: "#FFF",
                    borderRadius: '50%',
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {count}
            </Typography>
        </Box>
    );
};

const Task = ({ tasks, setTasks, task }) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    console.log(isDragging)
    const handleRemove = (id) => {
        if (!Array.isArray(tasks)) {
            console.error("Tasks is not an array.");
            return;
        }

        const fTasks = tasks.filter((t) => t.id !== id);
        setTasks(fTasks);
        localStorage.setItem("tasks", JSON.stringify(fTasks));
        toast("Task Removed !");
    };

    return (
        <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} sx={{ padding: '10px', margin: '10px', backgroundColor: '#FFF', borderRadius: '10px' }}>
            {/* Add your task content here */}
            <Typography>{task.name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton aria-label="delete" color="error" onClick={() => handleRemove(task.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default ListTasks;
