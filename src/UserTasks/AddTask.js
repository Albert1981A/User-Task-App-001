import '../UserTasks/UserTasks.css';
import React, { useEffect, useState } from 'react';


function AddTask(props) {

    const [newTask, setNewTask] = useState({ userId: 0, id: 0, title: "", completed: false });

    useEffect(() => {
        setNewTask({ ...newTask, userId: props.userData })
    }, [props]);

    const handleChangeTitle = e => {
        setNewTask({ ...newTask, title: e.target.value });
    };

    return (<div className="boxDiv3">

        <span style={{ fontWeight: "bold" }}>Add new task for User id - {newTask.userId}: &nbsp;</span> <br />

        <span style={{ fontWeight: "bold" }}>Title: </span> <input type="text" onChange={handleChangeTitle} value={newTask.title} /> <br /> <br />
        <span>New: &nbsp; {newTask.title}</span> <br /> <br />

        <input className="blueButton" type="button" value="ADD TASK" onClick={ () => props.mainCallback(newTask, "addNewTask") } /> <span>&nbsp; &nbsp; &nbsp; </span>
        <input className="blueButton" type="button" value="CANCEL" onClick={ () => props.mainCallback(newTask.userId, "cancelNewTask") } />

    </div>
    );
}

export default AddTask;