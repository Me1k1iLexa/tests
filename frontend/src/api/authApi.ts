import axios from "axios";

type LoginPayload = {
    email: string;
    password: string;
}

export const apiLogin = async (data: LoginPayload) => {
    const res = await axios.post("/login", data)
    return res.data as {
        token: string;
        user:{
            id:number
            email:string
            username:string
        }
    };
}