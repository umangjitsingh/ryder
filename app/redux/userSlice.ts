import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/app/redux/appStore";
import {IUser} from "@/app/models/user.model";


interface UserState {
		userData: IUser | null;
		loading: boolean;
		error: boolean | null
}

const initialState: UserState = {
		userData: null,
		loading: false,
		error: null
}

export const userSlice = createSlice({
		name: 'user',
		initialState,
		reducers: {
				setUserData: (state, action) => {
state.userData=action.payload
				}
		}
})

export const {setUserData} = userSlice.actions;


export const selectUser = (state: RootState) => state.user?.userData;

export default userSlice.reducer;