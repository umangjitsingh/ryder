"use client"
import React from 'react'
import CarIcon from "@iconify-react/duo-icons/app";
import { motion } from 'motion/react';
import {useRouter} from "next/navigation";
import CloudUploadIcon from '@iconify-react/subway/cloud-upload';
import FileCheckIcon from '@iconify-react/tabler/file-check';

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
											Step 2 of 3
									</p>
									<h1 className="text-2xl font-bold mt-2 flex items-center justify-center gap-3 text-white">
											<CarIcon height="1.8em" className="text-emerald-400" />
											Vehicle Documents
									</h1>
									<p className="text-sm text-gray-400 mt-2 font-medium">Required for verification.</p>
							</div>

							<div className="mt-8 space-y-6">
									<motion.label whileHover={{scale:1.01}} className="flex items-center justify-between p-4 rounded-xl border border-gray-700 cursor-pointer hover:border-white/30 transition">
											<div>
													<p className="text-sm font-semibold text-gray-400">Aadhaar /<strong className="text-[#cfa200] text-xs"> ID Proof</strong>  </p>
													<p className="text-xs text-gray-400/80">Government issued ID</p>
											</div>
											<motion.div whileHover={{scale:1.07}} transition={{duration: 0.2, ease: [0.16, 1, 0.9, 1]}} className="flex gap-1 items-center justify-center bg-[#242424] px-4 py-1.5 rounded-full border border-white/20">
													<span className="text-xs text-gray-200">Upload</span>
													<CloudUploadIcon height="1.2em" style={{ color: 'rgb(207 162 0 / 0.69)' }} />
											</motion.div>
									</motion.label>

									<motion.label whileHover={{scale:1.01}} className="flex items-center justify-between p-4 rounded-xl border border-gray-700 cursor-pointer hover:border-white/30 transition">
											<div>
													<p className="text-sm font-semibold text-gray-400">Driving License </p>
													<p className="text-xs text-gray-400/80">Valid driving license</p>
											</div>
											<motion.div whileHover={{scale:1.07}} transition={{duration: 0.2, ease: [0.16, 1, 0.9, 1]}} className="flex gap-1 items-center justify-center bg-[#242424] px-4 py-1.5 rounded-full border border-white/20">
													<span className="text-xs text-gray-200">Upload</span>
													<CloudUploadIcon height="1.2em" style={{ color: 'rgb(207 162 0 / 0.69)' }} />
											</motion.div>
									</motion.label>

									<motion.label whileHover={{scale:1.01}} className="flex items-center justify-between p-4 rounded-xl border border-gray-700 cursor-pointer hover:border-white/30 transition">
											<div>
													<p className="text-sm font-semibold text-gray-400"> Vehicle RC </p>
													<p className="text-xs text-gray-400/80">Vehicle Registration Certificate</p>
											</div>
											<motion.div whileHover={{scale:1.07}} transition={{duration: 0.2, ease: [0.16, 1, 0.9, 1]}} className="flex gap-1 items-center justify-center bg-[#242424] px-4 py-1.5 rounded-full border border-white/20">
													<span className="text-xs text-gray-200">Upload</span>
													<CloudUploadIcon height="1.2em" style={{ color: 'rgb(207 162 0 / 0.69)' }} />
											</motion.div>
									</motion.label>
							</div>

							<div className="mt-6 flex items-center gap-1 text-xs text-gray-400">
									<FileCheckIcon height="1.7em" style={{ color: '#999' }} />
									<p>Documents are stored securely and are manually verified by our team.</p>
							</div>

							<div className="w-full flex items-center justify-center mt-10">
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
