import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/app/redux/appStore";

const initialState={
		toggleMenu:false
}

export const menuSlice=createSlice({
		name:"menu",
		initialState,
		reducers:{
		setToggleMenu:(state)=>{
				state.toggleMenu=!state.toggleMenu;
		}
		}
})

export const {setToggleMenu}=menuSlice.actions;
export const selectToggleMenu =(state:RootState)=>state?.menu?.toggleMenu
export default menuSlice.reducer