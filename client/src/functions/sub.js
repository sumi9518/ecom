import axios from 'axios';

//below function pass token to backend in headers so body tokne in empty passed


export const getSubs = async () =>
    await axios.get(`${process.env.REACT_APP_API}/subs`);    //data passed to auth.js in server middleware



export const getSub = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);



export const removeSub = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken,
        }
    });

export const updateSub = async (slug, sub, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken,
        }
    });

export const createSub = async (sub, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken,
        }
    });