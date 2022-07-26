import React, { useEffect, useState } from 'react';
import AddUser from '../UserComp/AddUser';
import AddPost from '../UserPosts/AddPost';
import UserPosts from '../UserPosts/UserPosts';
import UsersComp from '../UsersComp/UsersComp';
import AddTask from '../UserTasks/AddTask';
import UserTasks from '../UserTasks/UserTasks';
import './UserTaskAppComp.css';

function UserTaskAppComp() {

    const [dataFromUsers, setDataFromUsers] = useState({});
    const [open, setOpen] = useState(false);
    const [showNewUser, setShowNewUser] = useState(false);
    const [showNewTask, setShowNewTask] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newUser, setNewUser] = useState({});


    const handleCallbackUp = (data, val) => {
        if (val === "userTasksAndPosts") {
            console.log(val + " Of user id - " + data.id + " current id:" + dataFromUsers.id);
            if (open && data.id !== dataFromUsers.id) {
                let obj = { ...dataFromUsers };
                obj.backColor = false;
                // console.log(obj);
                setDataFromUsers(obj);
                setOpen(false);
                setShowNewUser(false);
                setShowNewTask(false);
                setShowNewPost(false);
                return;
            }
            else if (!open) {
                data.backColor = true
            }
            else {
                data.backColor = false
            }
            setOpen(!open);
            setShowNewUser(false);
            setShowNewTask(false);
            setShowNewPost(false);
            setDataFromUsers(data);
            
        } else if (val === "addUser") {
            console.log("Add User");
            let obj = { ...dataFromUsers };
            obj.backColor = false;
            // console.log(obj);
            setDataFromUsers(obj);
            setOpen(false);
            setShowNewTask(false);
            setShowNewPost(false);
            setShowNewUser(true);
        }
        else if (val === "addNewUser") {
            console.log("Add New User");
            // console.log(data);
            setNewUser(data);
            setShowNewUser(false);
        }
        else if (val === "cancelNewUser") {
            console.log("Cancel New User");

            setShowNewUser(false);
        }
    }

    useEffect(() => {
        if (dataFromUsers.id && dataFromUsers.completeAll !== true) {
            let arr = [...dataFromUsers.tasks];
            let arr2 = [];
            if (arr.length > 0) {
                arr2 = arr.filter(x => x.completed === false);
                if (arr2.length === 0) {
                    let obj = { ...dataFromUsers };
                    obj.completeAll = true;
                    // console.log(obj);
                    setDataFromUsers(obj);
                };
            };
        }
    }, [dataFromUsers])

    const handleTaskCallback = (data, val) => {
        if (val === "complete") {
            console.log("complete task id: " + data);
            let arr = [...dataFromUsers.tasks];
            let index = arr.findIndex(x => x.id === data);
            if (index >= 0) {
                arr[index].completed = true
            }
            setDataFromUsers({ ...dataFromUsers, tasks: arr });
        }
        else if (val === "addTask") {
            console.log("addTask for user id: " + data);
            setShowNewTask(true);
            setShowNewPost(false);
        }
        else if (val === "addNewTask") {
            console.log("Add New Task");
            let obj = {...dataFromUsers};
            let tasksArr = obj.tasks;
            data.id = tasksArr.length + 1;
            tasksArr.push(data);
            obj.tasks = tasksArr;
            obj.completeAll = false;
            // console.log(obj);
            setDataFromUsers(obj);
            setShowNewTask(false);
        }
        else if (val === "cancelNewTask") {
            console.log("Cancel New Task");
            setShowNewTask(false);
        }
    }

    const handlePostsCallback = (data, val) => {
        if (val === "addPost") {
            console.log("addPost for user id: " + data);
            setShowNewPost(true);
            setShowNewTask(false);
        }
        else if (val === "addNewPost") {
            console.log("Add New Post");
            let obj = {...dataFromUsers};
            let postsArr = obj.posts;
            data.id = postsArr.length + 1;
            postsArr.push(data);
            obj.posts = postsArr;
            console.log(obj);
            setDataFromUsers(obj);

            setShowNewPost(false);
        }
        else if (val === "cancelNewPost") {
            console.log("Cancel New Post");
            setShowNewPost(false);
        }
    }

    return (
        <div className="row">
            <div className="column1" >

                <UsersComp newUser={newUser} mainData={dataFromUsers} callbackUp={(data, val) => handleCallbackUp(data, val)} />

            </div>

            <div className="column2">

                {showNewUser && !open && <div>
                    <AddUser mainCallback={(data, val) => handleCallbackUp(data, val)} />
                </div>
                }

                {dataFromUsers.id > 0 && open &&
                    <div>
                        {showNewTask ? <div>
                            <AddTask userData={dataFromUsers.id} mainCallback={(data, val) => handleTaskCallback(data, val)} />
                        </div> :
                            <div>
                                <UserTasks userData={dataFromUsers} mainCallback={(data, val) => handleTaskCallback(data, val)} />
                            </div>}
                        {showNewPost ? <div>
                            <AddPost userData={dataFromUsers.id} mainCallback={(data, val) => handlePostsCallback(data, val)} />
                        </div> :
                            <div><UserPosts userData={dataFromUsers} mainCallback={(data, val) => handlePostsCallback(data, val)} />
                            </div>}
                    </div>
                }
            </div>
        </div>
    );
}

export default UserTaskAppComp;