"use client"

import React, { useEffect } from 'react'
import Login from "@/app/(web)/components/Login";
import Register from "@/app/(web)/components/registerForm";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, setFormType, selectIsModalOpen, selectFormType } from "@/app/redux/modalSlice";
import { AnimatePresence, motion } from 'motion/react';

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
		<AnimatePresence>
			{isModalOpen && <motion.div 
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.4 }}
				exit={{ scale: 0, opacity: 0 }}
				className="bg-[#171717]/90 fixed inset-0 backdrop-blur-xl z-20"
			>
				<div 
					className="fixed inset-0 z-30 flex items-center justify-center px-4"
					onClick={(e) => e.stopPropagation()}
				>
					<div 
						className="w-full max-w-md relative h-2/5"
						onClick={(e) => e.stopPropagation()}
					>
						{formType === 'login' ? <Login onClose={handleClose} /> : <Register onClose={handleClose} />}
					</div>
				</div>
				<div 
					className="absolute inset-0 z-20 cursor-pointer"
					onClick={handleClose}
				/>
			</motion.div>}
		</AnimatePresence>
	);
};

export default AuthForm