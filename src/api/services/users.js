import { AuthHeader, HTTP } from "../http";
import { setCurrentUser } from "../../app/store";

export async function AllUsers(for_dropdown = false) {
    try {
        const response = await HTTP.get('/users', {params: {for_dropdown: for_dropdown}, headers: AuthHeader() });
        return response.data;
    } catch(error) {
        if (error.response.status === 401) {
            setCurrentUser(null);
        }
    }

    return null;
}

export async function UserById(id){
    try {
        const response = await HTTP.get(`/users/${id}`, { headers: AuthHeader() });
        return response.data;
    } catch(error) {
        if (error.response.status === 401) {
            setCurrentUser(null);
        }
    }

    return null;
}

export async function Create(user){
    try {
        return (await HTTP.post('/users/', user)).data;
    } catch(error) {
        if (error.response.status === 401) {
            setCurrentUser(null);
        }
    }

    return null;
}

export async function UpdateUser(user) {
    try {
        const response = await HTTP.patch(`users/${user.id}`, user, {headers: AuthHeader() });
        return response.data;
    } catch(error) {
        if (error.response.status === 401) {
            setCurrentUser(null);
        }
    }

    return null;
}

export async function DestroyUserById(id){
    try {
        const response = await HTTP.delete(`users/${id}`, {headers: AuthHeader() });
        return response.data;
    } catch(error) {
        if (error.response.status === 401) {
            setCurrentUser(null);
        }
    }

    return null;
}
