import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { ToggleButton } from "react-bootstrap";

const expenseSlice = createSlice({
  name: "expenses",
  initialState:{data:[]},
  reducers: {
    addData(state,action){
    state.data=action.payload
    }


  },
});
const premiumAccountSlice=createSlice({
    name:'premium',
    initialState:{showPremium:false,toggle:false},
    reducers:{
        showPremiumButton(state,action){
            state.showPremium=action.payload

        },
        toggleButton(state){
            state.toggle=!state.toggle

        }
    }
})

const authSlice = createSlice({
  name: "authentication",
  initialState: { token: localStorage.getItem("Token") },
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state, action) {
      localStorage.clear();
      state.token = action.payload;
    },
  },
});

export const premiumAccountActions = premiumAccountSlice.actions;
export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
const store = configureStore({
  reducer: { auth: authSlice.reducer, expense: expenseSlice.reducer ,premiumAccount:premiumAccountSlice.reducer},
});
export default store;
