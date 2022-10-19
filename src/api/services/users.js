import { AuthHeader, BASE_URL, HTTP } from "../http";

const PATH = "/users";

export async function AllClients(page, rowsPerPage){
    const response = await HTTP.get(BASE_URL+PATH+`/?page=${page}&size=${rowsPerPage}`,
    {headers: AuthHeader() });
    return response.data;
}

export async function ClientById(id){
    const response = await HTTP.get(BASE_URL + PATH+ `/${id}`, { headers: AuthHeader() });
    return response.data;
}

export async function Create(user){
    const response = await HTTP.post(BASE_URL + PATH, user);
    return response.data;
}

export async function Edit(client){
    try{
    const response = await HTTP.put(BASE_URL+PATH+`/${client.id}`,
    client, {headers: AuthHeader() });
    return response.data;
    } catch (error){
        if(error.response.status === 500)
            return 500;
    }
    return null;
}

export async function Deletee(client){
    const response = await HTTP.delete(BASE_URL+PATH+`/${client.id}`,
    {headers: AuthHeader() });
    return response.data
}
