"use client"
import {motion} from 'motion/react'
import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import CarIcon from '@iconify-react/duo-icons/car';
import ElectricBikeRoundedIcon from '@iconify-react/material-symbols-light/electric-bike-rounded';
import VanUtilityIcon from '@iconify-react/mdi/van-utility';
import CarSportSharpIcon from '@iconify-react/ion/car-sport-sharp';
import TruckIcon from '@iconify-react/fontisto/truck';
import DroneIcon from '@iconify-react/simple-icons/drone';
import toast from "react-hot-toast";

const VEHICLES=[
		{id:'bike',label:"Bike",icon:<ElectricBikeRoundedIcon height="2.9em" />,desc:"2-wheeler ride"},
		{id:'auto',label:"Auto",icon:<VanUtilityIcon height="2.9em" />,desc:"3-wheeler ride"},
		{id:'car',label:"Car",icon:<CarSportSharpIcon height="2.9em" />,desc:"compact-cars & suvs  rides"},
		{id:'truck',label:"Truck",icon:<TruckIcon height="2.9em" />,desc:"heavy goods"},
		{id:'drone',label:"Drone",icon:<DroneIcon height="2.9em" />,desc:"food delivery"}
]

const Page = () => {
		const[activeVehicle,setActiveVehicle]=useState("");
		const[vehicleNumber,setVehicleNumber]=useState("");
		const [vehicleModel,setVehicleModel]=useState("");
		const [error,setError]=useState("")
		const router=useRouter();


		useEffect(()=>{
				toast.error(error)
		},[error])

		async function handleVehicle() {
				try{
						const number=vehicleNumber.toUpperCase();
						const model=vehicleModel.toUpperCase();
						const url = new URL('/api/partner/onboarding/vehicle', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
						const res = await fetch(url, {
								method: "POST",
								headers: {
										"Content-Type": "application/json"
								},
								body: JSON.stringify({
										type:activeVehicle, vehicleModel:model, vehicleNumber:number
								})
						});


						if (!res.ok) {
								const errorData = await res.json();
								console.error("Vehicle Registration API error:", errorData);
								setError(errorData.message)
								return {
										success: false,
										message: errorData.message || "Vehicle Registration failed"
								};
						}
						const data=await res.json();
						router.push('/partner/onboarding/documents')
						console.log(data)
						return {
								success:true,
								data
						}

				}
				catch (e) {
						console.log(e)
				}
		}

		return (
			<div className="text-white min-h-screen bg-linear-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-8">
					<motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, ease: [0.16, 1, 0.9, 1]}}
					            className="w-full max-w-xl rounded-3xl border border-gray-800/80 bg-[#121212]/95 backdrop-blur-sm shadow-2xl shadow-black/50 p-6 sm:p-10">
							<div className="relative text-center">
									<button onClick={()=>router.back()} className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center hover:scale-110 transition-all duration-300 group">
											<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" className="text-gray-400 group-hover:text-white transition-colors duration-300">
													<g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}>
															<path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"></path>
															<path strokeLinecap="round" d="m27 33l-9-9l9-9"></path>
													</g>
											</svg>
									</button>
									<p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
											Step 1 of 3
									</p>
									<h1 className="text-2xl font-bold mt-2 flex items-center justify-center gap-3 text-white">
											<CarIcon height="1.8em" className="text-emerald-400" />
											Vehicle Details
									</h1>
									<p className="text-sm text-gray-400 mt-2 font-medium">Add your vehicle information to get started</p>
							</div>
							<div className="mt-10 space-y-6">
									<div>
											<p className="pb-3 text-sm font-semibold text-gray-300 uppercase tracking-wide">Vehicle Type</p>
											<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{
													VEHICLES.map((v)=>{
															const active=activeVehicle==v.id;
															return <motion.div key={v.id} whileHover={{scale:1.03}} whileTap={{scale:0.98}}
															                   onClick={()=>setActiveVehicle((v.id))}
															className={`rounded-2xl border-2 p-5 flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer ${
																active 
																	? "bg-linear-to-br from-emerald-500/20 to-green-600/20 border-emerald-400/60 shadow-xs shadow-emerald-500/20" 
																	: "bg-[#171717] border-gray-700/50 hover:border-gray-600 hover:bg-[#1a1a1a]"
															}`}>
																	<div className={`rounded-full p-3 flex items-center justify-center transition-all duration-300 ${
																		active ? 'text-emerald-400 scale-110' : 'text-gray-300'
																	}`}>{v.icon}</div>
																	<div className={`text-sm font-semibold rubik ${active ? 'text-emerald-300' : 'text-white'}`}>{v.label}</div>
																	<p className={`text-xs text-center transition-colors duration-300 ${active ? 'text-emerald-200/80' : 'text-gray-400'}`}>{v.desc}</p>
															</motion.div>
														}
													)
											}</div>
									</div>
							</div>

							<div className="mt-10">
									<label htmlFor="vn" className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Vehicle Number</label>
									<input type="text" id="vn" placeholder="Enter License Plate: e.g. CFBS 104"
									       value={vehicleNumber}
									       onChange={(e)=>setVehicleNumber(e.target.value)}
									       className="mt-3 cursor-text w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent autofill:bg-transparent [-webkit-autofill:bg:transparent] [-webkit-autofill:text:white] [-webkit-box-shadow:0_0_0_1000px_transparent_inset]"/>
							</div>
							<div className="mt-8">
									<label htmlFor="vm" className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Vehicle Model</label>
									<input type="text" id="vm" placeholder="Enter Full Model and Year: e.g. Audi Q5 2022"
									       value={vehicleModel}
									       onChange={(e)=>setVehicleModel(e.target.value)}
									       className="cursor-text mt-3 w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent autofill:bg-transparent [-webkit-autofill:bg:transparent] [-webkit-autofill:text:white] [-webkit-box-shadow:0_0_0_1000px_transparent_inset]"/>
							</div>

							<div className="w-full flex items-center justify-center mt-10" onClick={handleVehicle}>
									<motion.button 
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="w-full sm:w-2/3 h-14 text-white rounded-2xl bg-linear-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600  font-semibold flex items-center justify-center shadow-lg hover:shadow-xs hover:shadow-emerald-600/40 transition-all duration-400 transform border-2 border-white/60">
											Continue
									</motion.button>
							</div>


					</motion.div>
			</div>
		)
}
export default Page
