"use client"

import React from 'react'
import VehicleSlider from "@/app/(web)/components/VehicleSlider";
import AuthForm from "@/app/(web)/components/AuthForm";
import Hero from "@/app/(web)/components/Hero";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/appStore";
import {selectIsModalOpen} from "@/app/redux/modalSlice";



const PublicHome = () => {

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