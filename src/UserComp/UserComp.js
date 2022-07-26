import React, { useState, useEffect } from 'react';
import OtherDetails from '../OtherDetails/OtherDetails';
import './UserComp.css';


function UserComp(props) {

    const [userDetails, setUserDetails] = useState({});
    const [greenBox, setGreenBox] = useState(false);
    const [backColor, setBackColor] = useState("");

    useEffect(() => {
        setUserDetails(props.userData);

        if (props.userData.backColor && props.userData.completeAll) {
            setBackColor("LightGreen");
        } else if (props.userData.backColor && !props.userData.completeAll) {
            setBackColor("LightCoral");
        } else if (!props.userData.backColor) {
            setBackColor("honeydew");
        } 

        if (props.userData.id) {
            for (let i = 0; i < props.userData.tasks.length; i++) {
                const element = props.userData.tasks[i];
                if (element.completed === false) {
                    setGreenBox(false);
                    break;
                } else {
                    setGreenBox(true);
                }
            }
        }
    }, [props])

    const handleOtherDetailsCallback = (data) => {
        // console.log(data);
        setUserDetails({ ...userDetails, address: { ...userDetails.address, street: data.street, city: data.city, zipcode: data.zipcode } });
    };

    const handleChangeName = e => {
        setUserDetails({ ...userDetails, name: e.target.value });
    };

    const handleChangeEmail = e => {
        setUserDetails({ ...userDetails, email: e.target.value });
    };

    return (
        <div className={greenBox ? "greenBox" : "redBox"} style={{ backgroundColor: backColor }}>

            <h3>User Details</h3>

            {userDetails.id &&
                <div>
                    <div className="userTextDiv">
                        <span style={{ fontWeight: "bold" }}>Id: </span> <input className='clearButton' type="button" onClick={() => props.callback(userDetails, "userTasksAndPosts")} value={userDetails.id} /> <br /> <br />
                        <span style={{ fontWeight: "bold" }}>Name: </span> <input type="text" onChange={handleChangeName} value={userDetails.name} /> <br />
                        {/* <span>New: &nbsp; {userDetails.name}</span> <br /> <br /> */}
                        <span style={{ fontWeight: "bold" }}>Email: </span> <input type="text" onChange={handleChangeEmail} value={userDetails.email} /> <br /> <br />
                        {/* <span>New: &nbsp; {userDetails.email}</span> <br /> <br /> */}
                    </div>
                    <input className='greyButton' type="button" value="Other Data" onClick={() => props.callback(userDetails, "otherDataClose")} onMouseOver={() => props.callback(userDetails, "otherData")} /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    {userDetails.otherDetails &&
                        <div>
                            <OtherDetails otherDetails={userDetails.address} callbackOtherDetails={(data) => handleOtherDetailsCallback(data)} />
                        </div>
                    }

                    <input className='yellowButton' type="button" value="Update" onClick={() => props.callback(userDetails, "update")} /> <span>&nbsp;</span>
                    <input className='yellowButton' type="button" value="Delete" onClick={() => props.callback(userDetails, "delete")} /> <br />

                </div>

            }

        </div>
    );
}

export default UserComp;