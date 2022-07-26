import '../UserTasks/UserTasks.css';
import React, { useEffect, useState } from 'react';


function UserTasks(props) {

    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        setUserDetails(props.userData)
    }, [props])

    const addTask = () => {
        props.mainCallback(userDetails.id, "addTask");
    }

    return (<div className="boxDiv3">

        <span style={{ fontWeight: "bold" }}>The Tasks of User id - {userDetails.id}: &nbsp;</span>
        
        <input className="yellowButton" type="button" value="Add" onClick={addTask} /> <br /> <br />

        <div className="boxDiv4">
            {userDetails.id &&
                userDetails.tasks.map((item) => {
                    return <div className="greyBox" key={item.id}>
                        <span>{item.title}  - </span> <span style={{ fontWeight: "bold" }}>{item.completed ? "COMPLETED" : "NO"} &nbsp;</span>
                        {!item.completed &&
                            <input className="blueButton" type="button" value="complete" onClick={ () => props.mainCallback(item.id, "complete") } />
                        }
                    </div>
                })
            }
        </div>
        <br />

    </div>
    );
}

export default UserTasks;