import React, { useState } from 'react';
import { Box, Button, Stack, TextField } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3) {
            return toast.error("Task must be at least 3 characters long");
        }

        if (task.name.length > 100) {
            return toast.error("Task must be at most 100 characters long");
        }

        // Ensure tasks is an array before spreading it
        const updatedTasks = Array.isArray(tasks) ? [...tasks, task] : [task];

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        toast.success("Task added successfully");

        setTask({
            id: "",
            name: "",
            status: "todo"
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack sx={{ height: { md: '100%', sm: '100%' }, display: 'flex', alignItems: 'center', marginTop: '8vh' ,marginBottom:'5vh'}}>
                    <Stack sx={{ width: { md: '100%', sm: '100%' }, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: '10px' }}>
                        <TextField
                            id="outlined-basic"
                            label="Task"
                            variant="outlined"
                            value={task.name}
                            onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                        />
                        <Button type="submit" variant="contained" sx={{ height: { md: '100%' } }}>
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </>
    );
};

export default CreateTask;
