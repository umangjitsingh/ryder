"use client"


import React, {useEffect} from 'react'
import Login from "@/app/(web)/components/Login";
import Logo from "@/app/(web)/components/Logo";
import Register from "@/app/(web)/components/registerForm";
import {useSelector, useDispatch} from "react-redux";

import {closeModal, setFormType, selectIsModalOpen, selectFormType} from "@/app/redux/modalSlice";

const AuthForm = () => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(selectIsModalOpen);
	const formType = useSelector(selectFormType);

	// Close modal when it's no longer open
	useEffect(() => {
		if (!isModalOpen) {
			// Reset form type when modal closes
			dispatch(setFormType('login'));
		}
	}, [isModalOpen, dispatch]);

	const handleClose = () => {
		dispatch(closeModal());
	};


	return (
		<>
			{isModalOpen && <div
				className=" bg-[#171717]/90  fixed inset-0 backdrop-blur-xl z-20"
				onClick={handleClose}
			>

				<div
					className=" fixed inset-0 z-30  flex items-center justify-center px-4">

					<div className="w-full max-w-md relative  h-2/5">
						{formType === 'login' ? <Login onClose={handleClose} /> : <Register onClose={handleClose} />}
					</div>

				</div>
			</div>}
		</>

	)
}
export default AuthForm