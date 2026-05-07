import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/appStore";


interface ModalState {
	isOpen: boolean;
	formType: 'login' | 'register';
}

const initialState: ModalState = {
	isOpen: false,
	formType: 'login',
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
		}
	}
});

export const { openModal, closeModal, toggleModal, setFormType } = modalSlice.actions;

// Selector functions for better performance and type safety
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectFormType = (state: RootState) => state.modal.formType;

export default modalSlice.reducer;