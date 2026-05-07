"use client"

import React, {useState} from 'react'
import VehicleSlider from "@/app/(web)/components/VehicleSlider";
import AuthForm from "@/app/(web)/components/AuthForm";
import Hero from "@/app/(web)/components/Hero";

const PublicHome = () => {
		const[authFormOpen,setAuthFormOpen]=useState(true)

		return (
			<div>
					<Hero/>
					<VehicleSlider/>
					<AuthForm open={authFormOpen} onClose={()=>setAuthFormOpen(false)}/>
			</div>
		)
}
export default PublicHome
