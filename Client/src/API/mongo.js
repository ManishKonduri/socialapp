import axios from 'axios';

export const userRegistration = async (userData) => {
    const resp = async () => {
        const data = await axios.post('http://localhost:4000/', userData);
        return data;
    }
    return await resp();

}

export const userLogin = async (userData) => {
    const resp = async () => {
        const data = await axios.post("http://localhost:4000/login", userData);
        return data;
    }
    return await resp();
}

export const userUploadImg = async (userData) => {
    const resp = async () => {
        const data = await axios.post("http://localhost:4000/home", userData);
        return data;
    }
    return await resp();
}

export const allUserImages = async () => {
    const resp = async () => {
        const data = await axios.get("http://localhost:4000/imgs");
        return data;
    }
    return await resp();
}

export const userDetails = async (userData) => {
    const resp = async () => {
        const data = await axios.post("http://localhost:4000/details", userData);
        return data;
    }
    return await resp();
}

export const likesUpload = async (userData) => {
    const resp = async() => {
        const data = await axios.post("http://localhost:4000/likes", userData);
        return data;
    }
    return await resp();
}

export const editProfile = async (userData) => {
    const resp = async() => {
        const data = await axios.put("http://localhost:4000/edit", userData);
        return data;
    }
    return resp();
}

export const updatePage = async (userData) => {
    const resp = async() => {
        const data = await axios.post("http://localhost:4000/update", userData);
       
        return data;
    }
    return resp();
}