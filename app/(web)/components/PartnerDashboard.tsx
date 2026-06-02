"use client"
import React, {useEffect, useState} from 'react'
import {selectUser, setUserData} from "@/app/redux/userSlice";
import {useDispatch, useSelector} from "react-redux";
import LockLinearIcon from '@iconify-react/solar/lock-linear';
import SharpCheckIcon from '@iconify-react/ic/sharp-check';
import {useRouter} from "next/navigation";
import { motion } from 'motion/react';
import {Route} from "next";
import ClockIcon from '@iconify-react/meteor-icons/clock';

type STEP = {
		id: number;
		title: string;
		route?: Route
}

const STEPS: STEP[] = [
		{id: 1, title: "Vehicle", route: "/partner/onboarding/vehicle"},
		{id: 2, title: "Documents", route: "/partner/onboarding/documents"},
		{id: 3, title: "Bank", route: "/partner/onboarding/bank"},
		{id: 4, title: "Review"},
		{id: 5, title: "Video KYC"},
		{id: 6, title: "Pricing"},
		{id: 7, title: "Final Review"},
		{id: 8, title: "Live"},
];

const TOTAL_STEPS = STEPS.length;
const PartnerDashboard = () => {


		const userData = useSelector(selectUser);
		const stepNumber = userData?.partnerOnboardingSteps;
		const router=useRouter();
		const dispatch=useDispatch();
		const activeStep = userData?.partnerOnboardingSteps ?? 0


		useEffect(() => {
				if (stepNumber !== undefined && stepNumber !== activeStep) {
						dispatch(setUserData(activeStep))
				}
		}, [stepNumber, activeStep])


		const goToRoute=(v:STEP)=>{
if(v.route && v.id <=activeStep){
router.push(v.route)
}
		}
		return (
			<div className="flex items-center justify-center w-full h-screen ">
					<div className="w-[92%] h-[92%] flex items-center justify-center bg-linear-to-br from-mist-700/5 to-mist-600/5 rounded-4xl ">
							<div className=" sm:w-240 md:max-w-360  mx-auto space-y-16 ">
									<div>
											<h1 className="text-white/90 font-bold text-4xl">Partner Onboarding</h1>
											<p className="text-white/40 mt-2.5">Complete all steps to activate your account </p>
									</div>

									<div className="border border-mist-400/40 min-w-200 h-60 shadow-mist-400/40 shadow-md rounded-4xl flex items-center justify-center px-16">
											<div className="flex  items-center justify-center gap-20 scale-70">
													{STEPS.map((v) => {
															return (<motion.div whileHover={v.id<=activeStep ? {scale:1.07}:{}} key={v.id} className="flex relative items-center flex-col  min-w-22 " onClick={()=>goToRoute(v)}>
																	{(() => {
																				if (activeStep === v.id) return <span className={"z-40 relative rounded-full bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center h-18 w-18 text-xl font-bold border-4 text-white border-white/60 scale-110"}>{v.id}</span>;
																				if (activeStep > v.id) return <span className="z-40 relative rounded-full bg-gray-200  flex items-center justify-center h-18 w-18 border-2 border-gray-400 "><SharpCheckIcon height="1.4em" style={{color: '#2a2a29'}}/></span>;
																				return <span className="z-40 relative border-zinc-400 rounded-full bg-olive-700/40 text-white flex items-center justify-center h-18 w-18 border-2  "><LockLinearIcon height="1em" style={{color: '#e1cd66'}}/></span>;
																		}
																	)()}
																	{(() => {
																			if (activeStep <= v.id && v.id < TOTAL_STEPS) return <span className="absolute h-1 w-24 bg-gray-700  top-1/3 left-20"></span>;
																			if (v.id < TOTAL_STEPS) return <span className="absolute h-1 w-24 bg-gray-400 top-1/3 left-20 "></span>;
																	})()}

																	<span className="text-white mt-4 font-medium text-sm ">{v.title}</span>
															</motion.div>)
													})}
											</div>

									</div>

									<div  className="border border-mist-400/40 min-w-200 h-40 shadow-mist-400/40 shadow-md rounded-4xl flex items-center justify-start gap-2 px-11">
											<div className="bg-white/80 w-16 h-16 flex items-center justify-center rounded-2xl"><ClockIcon  height="2em" style={{ color: '#151514' }} /></div>
											<div></div>
											<div className="flex flex-col ">
													<h1 className="text-white/90 font-bold text-2xl leading-2.5">Documents Under Review</h1>
													<p className="text-white/40 mt-2.5 text-sm">Admin is verifying your documents.</p>
											</div>

									</div>

							</div>
					</div>
			</div>
		)
}
export default PartnerDashboard
