import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";



const authSlice=createSlice({
    name:'authentication',
    initialState:{token:localStorage.getItem('Token')},
    reducers:{
        login(state,action){
            state.token=action.payload
        
        },
        logout(state,action){
            localStorage.clear()
            state.token=action.payload

        }
    }
})

export const authActions=authSlice.actions
const store=configureStore({
    reducer:{auth:authSlice.reducer}
})
export default store