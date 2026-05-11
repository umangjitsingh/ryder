"use client"

import React from 'react'
import VehicleSlider from "@/app/(web)/components/VehicleSlider";
import AuthForm from "@/app/(web)/components/AuthForm";
import Hero from "@/app/(web)/components/Hero";
import {useSelector} from "react-redux";
import {selectIsModalOpen} from "@/app/redux/modalSlice";
import {selectUser} from "@/app/redux/userSlice";



const PublicHome = () => {
		const user=useSelector(selectUser);

		console.log("user===>",user)

	const isModalOpen = useSelector(selectIsModalOpen);

	return (
		<div>
			<Hero/>
			<VehicleSlider/>
			{isModalOpen && <AuthForm />}
		</div>
	)
}
export default PublicHome