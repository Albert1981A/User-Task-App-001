import axios from "axios";

const getAllUsers = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users");
}

const getAllUserTask = (userId) => {
    return axios.get("https://jsonplaceholder.typicode.com/todos/?userId=" + userId);
}

const getAllUserPosts = (userId) => {
    return axios.get("https://jsonplaceholder.typicode.com/posts/?userId=" + userId);
}

export default { getAllUsers, getAllUserTask, getAllUserPosts };
