import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface User {
    id: number;
    email: string;
    username: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

        loginRequest() {},


        setAuth(state, action: PayloadAction<{user:User; token: string}>){
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },

        loginFailed(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        clearAuth(state){
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            },
    },
})

export const {loginRequest,setAuth, loginFailed, clearAuth} = authSlice.actions;
export default authSlice.reducer;
