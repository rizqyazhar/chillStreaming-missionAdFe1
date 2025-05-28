import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const getUsers = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('GET: ', error)
        throw error;
    }
}

const postUsers = async (postData) => {
    try {
        const response = await axios.post(url, postData);
        return response.data;
    } catch (error) {
        console.log('POST: ', error)
        throw error;
    }
}

const updateUsers = async (url, updatedData) => {
    try {
        const response = await axios.patch(url, updatedData);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



export { getUsers, postUsers, updateUsers };