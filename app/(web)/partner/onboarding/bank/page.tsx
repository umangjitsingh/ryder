"use client"
import React from 'react'
import {motion} from "motion/react";
import BankIcon from '@iconify-react/mdi-light/bank';
import {useRouter} from "next/navigation";
import UserBadgeCheckIcon from '@iconify-react/iconoir/user-badge-check';
import CreditcardIcon from '@iconify-react/quill/creditcard';
import NetworkPinIcon from '@iconify-react/streamline-ultimate/network-pin';
import MobileOutlineSharpIcon from '@iconify-react/material-symbols-light/mobile-outline-sharp';
import UpiPayOutlineIcon from '@iconify-react/material-symbols/upi-pay-outline';
import CheckCircleIcon from '@iconify-react/mage/check-circle';

const Page = () => {
		const router=useRouter()
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
											Step 3 of 3
									</p>
									<h1 className="text-2xl font-bold mt-2 flex items-center justify-center gap-3 text-white">
											<BankIcon height="1.8em" className="text-emerald-400" />
											Bank Details
									</h1>
									<p className="text-sm text-gray-400 mt-2 font-medium">Used for payouts / payments.</p>
							</div>

							<div className="mt-8 space-y-6">
									<div>
											<label htmlFor="accountHolderName" className="text-sm font-semibold text-gray-400">Account Holder Name</label>
											<div className="flex items-center gap-2 mt-2">
													<UserBadgeCheckIcon height="1.7em" style={{ color: '#dadada' }} />
													<input type="text" id="accountHolderName" placeholder="As per bank records" className="flex-1 pl-4 cursor-text w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent"/>
											</div>
									</div>

									<div>
											<label htmlFor="accountNumber" className="text-sm font-semibold text-gray-400">Account Number</label>
											<div className="flex items-center gap-2 mt-2">
													<CreditcardIcon height="1.7em" style={{ color: '#dadada' }} />
													<input type="text" id="accountHolderName" placeholder="Enter account number" className="flex-1 pl-4 cursor-text w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent"/>
											</div>
									</div>

									<div>
											<label htmlFor="ifsc" className="text-sm font-semibold text-gray-400">IFSC / Branch Code</label>
											<div className="flex items-center gap-2 mt-2">
													<NetworkPinIcon height="1.7em" style={{ color: '#dadada' }} />
													<input type="text" id="ifsc" placeholder="RBC 001962" className="flex-1 pl-4 cursor-text w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent"/>
											</div>
									</div>

									<div>
											<label htmlFor="mobileNumber" className="text-sm font-semibold text-gray-400">Mobile Number</label>
											<div className="flex items-center gap-2 mt-2">
													<MobileOutlineSharpIcon height="1.7em" style={{ color: '#dadada' }} />
													<input type="text" id="mobileNumber" placeholder="6479919922" className="flex-1 pl-4 cursor-text w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent"/>
											</div>
									</div>

									<div>
											<label htmlFor="upiNumber" className="text-sm font-semibold text-gray-400">UPI Number(optional)</label>
											<div className="flex items-center gap-2 mt-2">
													<UpiPayOutlineIcon height="1.7em" style={{ color: '#dadada' }} />
													<input type="text" id="upiNumber" placeholder="placeholder@id.rbc" className="flex-1 pl-4 cursor-text w-full border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 bg-transparent"/>
											</div>
									</div>

							</div>

							<div className="w-full flex items-center justify-center mt-10">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="w-full sm:w-2/3 h-14 text-white rounded-2xl bg-linear-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600  font-semibold flex items-center justify-center shadow-lg hover:shadow-xs hover:shadow-emerald-600/40 transition-all duration-400 transform border-2 border-white/60">
											Continue
									</motion.button>
							</div>

							<div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-gray-400/90">
									<CheckCircleIcon height="1.2em" style={{ color: '#cfa200' }} />
									<p>Bank details are verified before payout. This usually takes 24-48 hours. </p>
							</div>
					</motion.div>

			</div>
		)
}
export default Page
