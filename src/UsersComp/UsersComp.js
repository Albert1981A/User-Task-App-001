import './UsersComp.css';
import React, { useState, useEffect } from 'react';
import UserComp from '../UserComp/UserComp';
import utils from '../ConnectionService/ConnectionService'

function UsersComp(props) {

    const [searchText, setSearchText] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);


    useEffect(() => {
        async function getUsers() {
            const respUsers = await utils.getAllUsers();
            const allUserData = respUsers.data;
            for (let i = 0; i < allUserData.length; i++) {
                const respTasks = await utils.getAllUserTask(allUserData[i].id);
                let completeAll = false;
                for (let i = 0; i < respTasks.data.length; i++) {
                    const element = respTasks.data[i];
                    if (!element.completed) {
                        completeAll = false;
                        break;
                    }
                }
                const respPosts = await utils.getAllUserPosts(allUserData[i].id);
                allUserData[i] = { id: allUserData[i].id, name: allUserData[i].name, email: allUserData[i].email, completeAll: completeAll, backColor: false, otherDetails: false, address: allUserData[i].address, tasks: respTasks.data, posts: respPosts.data }
            }
            setAllUsers(allUserData);
        }
        getUsers();
    }, [])

    useEffect(() => {
        if (props.mainData.id) {
            let arrNewAllUsers = [...allUsers];
            const index = arrNewAllUsers.findIndex(x => x.id === props.mainData.id);
            arrNewAllUsers[index] = props.mainData;
            setAllUsers(arrNewAllUsers);
            if (filteredUsers.length > 0) {
                let arrNewFilterUsers = [...filteredUsers];
                const index = arrNewFilterUsers.findIndex(x => x.id === props.mainData.id);
                arrNewFilterUsers[index] = props.mainData;
                setFilteredUsers(arrNewFilterUsers);
            }
        }
    }, [props.mainData]);

    useEffect(() => {
        if (props.newUser.name !== undefined && props.newUser.email !== undefined) {
            if (props.newUser.name !== "" && props.newUser.email !== "") {
                let arr = [...allUsers]
                let obj = props.newUser;
                obj.id = arr[arr.length - 1].id + 1;
                arr.push(obj);
                console.log(arr);
                setAllUsers(arr);
                if (filteredUsers.length > 0) {
                    let arr2 = [...filteredUsers]
                    let obj2 = props.newUser;
                    obj2.id = allUsers[allUsers.length - 1].id + 1;
                    arr2.push(obj2);
                    setFilteredUsers(arr2);
                }
            } else {
                alert("Enter name and email to add new User !")
            }
        }

    }, [props.newUser]);

    useEffect(() => {
        const filteredObj = allUsers.filter(element => element.name.toLowerCase().includes(searchText.toLowerCase() || element.email.toLowerCase().includes(searchText.toLowerCase())))
        setFilteredUsers(filteredObj);
    }, [searchText])

    useEffect(() => {
        console.log(allUsers);
    }, [allUsers])

    const handleCallback = (user, val) => {
        // console.log("VAL: " + val);
        if (val === "userTasksAndPosts") {
            props.callbackUp(user, val);
        }
        else if (val === "delete") {
            let obj = allUsers.filter(x => x.id !== user.id);
            setAllUsers(obj);
            if (filteredUsers.length > 0) {
                let obj2 = filteredUsers.filter(x => x.id !== user.id);
                setFilteredUsers(obj2);
            }
            alert("Deleted User id: " + user.id)
        }
        else if (val === "update" || val === "otherData" || val === "otherDataClose") {
            let status = allUsers.find(x => x.id === user.id).otherDetails;
            if (val === "otherData" && status === false) {
                let index1 = allUsers.findIndex(x => x.id === user.id);
                let arr1 = [...allUsers];
                arr1[index1].otherDetails = true
                setAllUsers(arr1);
                if (filteredUsers.length > 0) {
                    let index2 = filteredUsers.findIndex(x => x.id === user.id);
                    let arr2 = [...filteredUsers];
                    arr2[index2].otherDetails = true;
                    setFilteredUsers(arr2);
                }
            }
            else if (val === "otherDataClose" && status === true) {
                let index3 = allUsers.findIndex(x => x.id === user.id);
                let arr3 = [...allUsers];
                arr3[index3].otherDetails = false
                setAllUsers(arr3);
                if (filteredUsers.length > 0) {
                    let index4 = filteredUsers.findIndex(x => x.id === user.id);
                    let arr4 = [...filteredUsers];
                    arr4[index4].otherDetails = false
                    setFilteredUsers(arr4);
                }
            }
            if (val === "update") {
                let arr = allUsers
                let index = arr.findIndex(x => x.id === user.id);
                if (index >= 0) {
                    arr[index] = user;
                }
                setAllUsers(arr);
                if (filteredUsers.length > 0) {
                    let arr = filteredUsers
                    let index = arr.findIndex(x => x.id === user.id);
                    if (index >= 0) {
                        arr[index] = user;
                    }
                    setFilteredUsers(arr);
                }
                alert("Updated User id: " + user.id)
            }
        }
    }

    const addUser = () => {
        props.callbackUp(undefined, "addUser");
    }

    return (
        <div className="boxDiv">
            <h2>User Task Application</h2>

            <span>Search: &nbsp;</span> <input type="text" onChange={e => setSearchText(e.target.value)} />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <input className="yellowButton" type="button" value="Add" onClick={addUser} /> <br />
            {searchText !== "" &&
                <span>Search for: &nbsp; {searchText}</span>
            }
            <br />

            {(filteredUsers.length > 0) ?
                <div className="boxDiv2">
                    {
                        filteredUsers.map((item) => {
                            return <UserComp key={item.id} userData={item} callback={(user, val) => handleCallback(user, val)} />
                        })
                    }
                </div>
                : <div className="boxDiv2">
                    {allUsers.length > 0 &&
                        allUsers.map((item) => {
                            // return <UserComp key={item.id} userData={ item } callback={data => setDataFromUser(...dataFromUser, data)} /> 
                            return <UserComp key={item.id} userData={item} callback={(user, val) => handleCallback(user, val)} />
                        })
                    }
                </div>
            }

            <p>Albert Abuav &copy;</p>
        </div>
    );
}

export default UsersComp;