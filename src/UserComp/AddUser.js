import '../UserTasks/UserTasks.css';
import React, { useState } from 'react';


function AddUser(props) {

    const [newUser, setNewUser] = useState({ id: 0, name: "", email: "", completeAll: false, backColor: false, otherDetails: false, address: { street: "add street", suite: "", city: "add City", zipcode: "0000", geo: {lat: "", lng: ""}}, tasks: [], posts: []  });

    const handleChangeName = e => {
        setNewUser({ ...newUser, name: e.target.value });
    };

    const handleChangeEmail = e => {
        setNewUser({ ...newUser, email: e.target.value });
    };

    return (<div className="boxDiv3">

        <span style={{ fontWeight: "bold" }}>Add New User:</span> <br />

        <span style={{ fontWeight: "bold" }}>Name: </span> <input type="text" onChange={handleChangeName} value={newUser.name} /> <br /> <br />
        <span>New: &nbsp; {newUser.name}</span> <br /> <br />

        <span style={{ fontWeight: "bold" }}>Email: </span> <input type="email" onChange={handleChangeEmail} value={newUser.email} /> <br /> <br />
        <span>New: &nbsp; {newUser.email}</span> <br /> <br />

        <input className="blueButton" type="button" value="ADD USER" onClick={ () => props.mainCallback(newUser, "addNewUser") } /> <span>&nbsp; &nbsp; &nbsp; </span>
        <input className="blueButton" type="button" value="CANCEL" onClick={ () => props.mainCallback(newUser, "cancelNewUser") } />

    </div>
    );
}

export default AddUser;