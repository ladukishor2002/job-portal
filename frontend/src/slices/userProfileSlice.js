import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    certificates: [],
    loading: false
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state, value){
            state.user = value.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setCertificate(state,value){
            state.certificates = action.payload.certificates || state.certificates;
        }
    },
});

// added setToken because there is an import of setToken in profileDetailAPI 
export const { setUser, setLoading, setToken,setCertificate} = profileSlice.actions;
export default profileSlice.reducer;