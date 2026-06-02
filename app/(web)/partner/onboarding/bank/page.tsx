"use client";
import React, {useEffect, useState} from "react";
import { motion } from "motion/react";
import { z } from "zod";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUserData} from "@/app/redux/userSlice";

import BankIcon from "@iconify-react/mdi-light/bank";
import { useRouter } from "next/navigation";
import UserBadgeCheckIcon from "@iconify-react/iconoir/user-badge-check";
import CreditcardIcon from "@iconify-react/quill/creditcard";
import NetworkPinIcon from "@iconify-react/streamline-ultimate/network-pin";
import MobileOutlineSharpIcon from "@iconify-react/material-symbols-light/mobile-outline-sharp";
import UpiPayOutlineIcon from "@iconify-react/material-symbols/upi-pay-outline";
import CheckCircleIcon from "@iconify-react/mage/check-circle";
import toast from "react-hot-toast";

// -----------------------------
// ZOD SCHEMA
// -----------------------------
const BankDetailsSchema = z.object({
		accountHolderName: z
			.string()
			.trim()
			.min(4, "Account holder name must be at least 4 characters"),

		accountNumber: z
			.string()
			.trim()
			.regex(/^\d{7,12}$/, "Account number must be 7–12 digits"),

		ifsc: z
			.string()
			.trim()
			.regex(/^(RBC|CIBC|TD|SCO)\s?\d{6}$/, "Invalid IFSC / Branch Code")
			.transform((v) => v.toUpperCase()),

		mobile: z
			.string()
			.trim()
			.regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),

		upi: z.string().optional(),
});

// Helper
function validateBankDetails(data: unknown) {
		const result = BankDetailsSchema.safeParse(data);
		if (!result.success) {
				return {
						success: false,
						message: result.error.issues[0].message,
				};
		}
		return { success: true, data: result.data };
}

const Page = () => {
		const router = useRouter();
		const dispatch = useDispatch();
		const usedData=useSelector(selectUser);


		const [accountHolderName, setAccountHolderName] = useState("");
		const [accountNumber, setAccountNumber] = useState("");
		const [ifsc, setIfsc] = useState("");
		const [mobile, setMobile] = useState("");
		const [upi, setUpi] = useState("");
		const [isLoading, setIsLoading] = useState(false);

		// -----------------------------
		// SUBMIT HANDLER
		// -----------------------------
		async function handleBank() {
				const validation = validateBankDetails({
						accountHolderName,
						accountNumber,
						ifsc,
						mobile,
						upi,
				});

				if (!validation.success) {
						toast.error(validation.message || "Validation failed");
						return;
				}



				setIsLoading(true);

				try {
						const url = new URL(
							"/api/partner/onboarding/bank",
							process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
						);

						const res = await fetch(url, {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify(
									{
										accountHolder:	accountHolderName,
											accountNumber,
											ifsc,
										mobileNumber:	mobile,
											upi,
									}
								),
						});

						const data = await res.json();

						if (!res.ok) {
								toast.error(data.message?.toUpperCase() || "Failed to save bank details");
								return;
						}

						toast.success("Bank details saved successfully!");
											
						// Refresh user data in Redux store
						try {
							const meUrl = new URL(
								"/api/auth/me",
								process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
							);
							const meRes = await fetch(meUrl, {
								method: "GET",
								headers: { "Content-Type": "application/json" },
							});
							const userData = await meRes.json();
							dispatch(setUserData(userData));
						} catch (err) {
							console.error("Failed to refresh user data:", err);
						}
											
						router.push("/");
				} catch (e:unknown) {
						const errorMessage=e instanceof Error ? e.message : "An unexpected error occurred. Please try again.";
						toast.error(errorMessage);
				} finally {
						setIsLoading(false);
				}
		}
		useEffect(()=>{
				const getBankInitialData=async()=>{
						const url= new URL('/api/partner/onboarding/bank',process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
						try{
								const res= await fetch(url,{
										method:"GET"
								});
								const data=await res.json()




								setUpi(data?.partnerBankDocuments?.upi || "");
								setMobile(data?.partnerBankDocuments?.mobile || usedData?.mobileNumber || "");
								setAccountNumber(data?.partnerBankDocuments?.accountNumber);
								setAccountHolderName(data?.partnerBankDocuments?.accountHolder);
								setIfsc(data?.partnerBankDocuments?.ifsc)
						}catch (e) {
								console.log(e)
						}
				};
				getBankInitialData()
		},[])

		// -----------------------------
		// UI
		// -----------------------------
		return (
			<div className="text-white min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-8">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.9, 1] }}
						className="w-full max-w-xl rounded-3xl border border-gray-800/80 bg-[#121212]/95 backdrop-blur-sm shadow-2xl shadow-black/50 p-6 sm:p-10"
					>
							<div className="relative text-center">
									<button
										onClick={() => router.back()}
										className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
									>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="1.5em"
												height="1.5em"
												viewBox="0 0 48 48"
												className="text-gray-400 group-hover:text-white transition-colors duration-300"
											>
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
									<p className="text-sm text-gray-400 mt-2 font-medium">
											Used for payouts / payments.
									</p>
							</div>

							{/* FORM FIELDS */}
							<div className="mt-8 space-y-6">
									{/* Account Holder */}
									<div>
											<label className="text-sm font-semibold text-gray-400">Account Holder Name</label>
											<div className="flex items-center gap-2 mt-2">
													<UserBadgeCheckIcon height="1.7em" style={{ color: "#dadada" }} />
													<input
														type="text"
														placeholder="As per bank records"
														className="flex-1 pl-4 border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 bg-transparent"
														value={accountHolderName}
														onChange={(e) => setAccountHolderName(e.target.value)}
													/>
											</div>
									</div>

									{/* Account Number */}
									<div>
											<label className="text-sm font-semibold text-gray-400">Account Number</label>
											<div className="flex items-center gap-2 mt-2">
													<CreditcardIcon height="1.7em" style={{ color: "#dadada" }} />
													<input
														type="text"
														placeholder="Enter account number"
														className="flex-1 pl-4 border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 bg-transparent"
														value={accountNumber}
														onChange={(e) => setAccountNumber(e.target.value)}
													/>
											</div>
									</div>

									{/* IFSC */}
									<div>
											<label className="text-sm font-semibold text-gray-400">IFSC / Branch Code</label>
											<div className="flex items-center gap-2 mt-2">
													<NetworkPinIcon height="1.7em" style={{ color: "#dadada" }} />
													<input
														type="text"
														placeholder="RBC 001962"
														className="flex-1 pl-4 border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 bg-transparent"
														value={ifsc}
														onChange={(e) => setIfsc(e.target.value)}
													/>
											</div>
									</div>

									{/* Mobile */}
									<div>
											<label className="text-sm font-semibold text-gray-400">Mobile Number</label>
											<div className="flex items-center gap-2 mt-2">
													<MobileOutlineSharpIcon height="1.7em" style={{ color: "#dadada" }} />
													<input
														type="text"
														placeholder="6479919922"
														className="flex-1 pl-4 border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 bg-transparent"
														value={mobile}
														onChange={(e) => setMobile(e.target.value)}
													/>
											</div>
									</div>

									{/* UPI */}
									<div>
											<label className="text-sm font-semibold text-gray-400">UPI Number (optional)</label>
											<div className="flex items-center gap-2 mt-2">
													<UpiPayOutlineIcon height="1.7em" style={{ color: "#dadada" }} />
													<input
														type="text"
														placeholder="placeholder@id.rbc"
														className="flex-1 pl-4 border-b-2 border-gray-700 pb-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 bg-transparent"
														value={upi}
														onChange={(e) => setUpi(e.target.value)}
													/>
											</div>
									</div>
							</div>

							{/* SUBMIT BUTTON */}
							<div className="w-full flex items-center justify-center mt-10">
									<motion.button
										whileHover={{ scale: isLoading ? 1 : 1.02 }}
										whileTap={{ scale: isLoading ? 1 : 0.98 }}
										disabled={isLoading}
										onClick={handleBank}
										className={`w-full sm:w-2/3 h-14 text-white rounded-2xl font-semibold flex items-center justify-center shadow-lg transition-all duration-400 border-2 ${
											isLoading
												? "bg-gray-600 border-gray-500 cursor-not-allowed"
												: "bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600 border-white/60"
										}`}
									>
											{isLoading ? (
												<>
														<svg
															className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
														>
																<circle
																	className="opacity-25"
																	cx="12"
																	cy="12"
																	r="10"
																	stroke="currentColor"
																	strokeWidth="4"
																></circle>
																<path
																	className="opacity-75"
																	fill="currentColor"
																	d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
																></path>
														</svg>
														Processing...
												</>
											) : (
												"Complete Registration"
											)}
									</motion.button>
							</div>

							<div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-gray-400/90">
									<CheckCircleIcon height="1.2em" style={{ color: "#cfa200" }} />
									<p>Bank details are verified before payout. This usually takes 24–48 hours.</p>
							</div>
					</motion.div>
			</div>
		);
};

export default Page;
