import '../UserTasks/UserTasks.css';
import React, { useState, useEffect } from 'react';


function UserPosts( props ) {

    const [ userDetails, setUserDetails ] = useState( {} );

    useEffect(() => {
        setUserDetails( props.userData )
    }, [props])

    const addPost = () => {
        props.mainCallback(userDetails.id, "addPost");
    }

    return (<div className="boxDiv3">

        <span style={{ fontWeight: "bold" }}>The Posts of User id - {userDetails.id}: &nbsp;</span>

        <input className="yellowButton" type="button" value="Add" onClick={addPost} /> <br /> <br />

        <div className="boxDiv4">
            {userDetails.id &&
                userDetails.posts.map((item) => {
                    return <div className="greyBox" key={item.id}>
                        <span style={{ fontWeight: "bold" }}>Title: </span><br />
                        <span>{item.title}</span><br />
                        <span style={{ fontWeight: "bold" }}>Body: </span><br />
                        <span>{item.body}</span><br />
                    </div>
                })
            }
        </div>
        <br />

    </div>
    );
}

export default UserPosts;