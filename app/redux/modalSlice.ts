import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/appStore";


interface ModalState {
	isOpen: boolean;
	formType: 'login' | 'register' | 'otp';
	email: string;
}

const initialState: ModalState = {
	isOpen: false,
	formType: 'login',
	email: '',
};

const modalSlice = createSlice({
	name: "authFormModal",
	initialState,
	reducers: {
		openModal: (state) => {

			state.isOpen = true;
		},
		closeModal: (state) => {

			state.isOpen = false;
		},
		toggleModal: (state) => {

			state.isOpen = !state.isOpen;
		},
		setFormType: (state, action) => {

			state.formType = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		}
	}
});

export const { openModal, closeModal, toggleModal, setFormType, setEmail } = modalSlice.actions;

// Selector functions for better performance and type safety
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectFormType = (state: RootState) => state.modal.formType;
export const selectEmail = (state: RootState) => state.modal.email;

export default modalSlice.reducer;