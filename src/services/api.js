import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getUsers = () => {
    axios.get(apiUrl)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const postUsers = () => {
    axios.post(apiUrl, {
        email: '',
        username: '',
        password: ''
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const updateUsers = () => {
    axios.patch(apiUrl, {
        username: '',
        password: ''
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}


console.log("API URL dari Vite:", apiUrl);

export { getUsers, postUsers, updateUsers };