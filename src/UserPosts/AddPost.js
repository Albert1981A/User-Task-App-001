import '../UserTasks/UserTasks.css';
import React, { useEffect, useState } from 'react';


function AddPost(props) {

    const [newPost, setNewPost] = useState({ userId: 0, id: 0, title: "", body: "" });

    useEffect(() => {
        setNewPost({ ...newPost, userId: props.userData })
    }, [props]);

    const handleChangeTitle = e => {
        setNewPost({ ...newPost, title: e.target.value });
    };

    const handleChangeBody = e => {
        setNewPost({ ...newPost, body: e.target.value });
    };

    return (<div className="boxDiv3">

        <span style={{ fontWeight: "bold" }}>Add new post for User id - {newPost.userId}: &nbsp;</span> <br />

        <span style={{ fontWeight: "bold" }}>Title: </span> <input type="text" onChange={handleChangeTitle} value={newPost.title} /> <br /> <br />
        <span>New: &nbsp; {newPost.title}</span> <br /> <br />

        <span style={{ fontWeight: "bold" }}>Body: </span> <input type="text" onChange={handleChangeBody} value={newPost.body} /> <br /> <br />
        <span>New: &nbsp; {newPost.body}</span> <br /> <br />

        <input className="blueButton" type="button" value="ADD POST" onClick={ () => props.mainCallback(newPost, "addNewPost") } /> <span>&nbsp; &nbsp; &nbsp; </span>
        <input className="blueButton" type="button" value="CANCEL" onClick={ () => props.mainCallback(newPost.userId, "cancelNewPost") } />

    </div>
    );
}

export default AddPost;