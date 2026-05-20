import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "@/app/redux/modalSlice";
import userSlice from "@/app/redux/userSlice";
import menuSlice from "@/app/redux/menuSlice";

export const store = configureStore({
	reducer: {
		modal:modalSlice,
			user:userSlice,
			menu:menuSlice
	}
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch