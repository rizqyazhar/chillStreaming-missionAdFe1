import axios from "axios";

const postUsers = async (url, postData) => {
    try {
        const response = await axios.post(url, postData)
        return response.data;
    } catch (error) {
        console.log('POST: ', error)
        throw error;
    }
}

const updateUsers = (url) => {
    axios.patch(url, {
        username: '',
        password: ''
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}


export { postUsers, updateUsers };