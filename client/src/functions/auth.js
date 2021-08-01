import axios from 'axios';

//below function pass token to backend in headers so body tokne in empty passed


export const CreateOrUpdateUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {     //data passed to auth.js in server middleware
        headers: {
            authtoken,
        }
    });
}

export const currentUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {     //data passed to auth.js in server middleware
        headers: {
            authtoken,
        }
    });
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {     //data passed to auth.js in server middleware
        headers: {
            authtoken,
        }
    });
}