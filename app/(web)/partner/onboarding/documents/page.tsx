"use client"
import React, {useState} from 'react'
import CarIcon from "@iconify-react/duo-icons/app";
import {motion} from 'motion/react';
import {useRouter} from "next/navigation";
import CloudUploadIcon from '@iconify-react/subway/cloud-upload';
import FileCheckIcon from '@iconify-react/tabler/file-check';
import ShieldCheckIcon from '@iconify-react/mage/shield-check';
import toast from "react-hot-toast";

type docType = "aadhaar" | "license" | "rc"

const Page = () => {
		const router = useRouter()
		const [documents, setDocuments] = useState<Record<docType, File | null>>({
				aadhaar: null,
				license: null,
				rc: null
		})
		const [isLoading, setIsLoading] = useState(false);
		const isCompleted=documents.aadhaar && documents.license && documents.rc

		function handleImage(docT: docType, file: File | null) {
				if (!file) {
						return
				}
				setDocuments((p) => ({...p, [docT]: file}))
		}

		async function handleDocuments() {
				// Validation
				if (!documents.aadhaar || !documents.license || !documents.rc) {
						const missingDocs = [];
						if (!documents.aadhaar) missingDocs.push("Aadhaar");
						if (!documents.license) missingDocs.push("License");
						if (!documents.rc) missingDocs.push("RC");
						
						toast.error(`Please upload: ${missingDocs.join(", ")}`);
						return;
				}

				setIsLoading(true);

				const url = new URL('/api/partner/onboarding/documents', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
				try {
						const formData = new FormData();
						formData.append("aadhaarUrl", documents.aadhaar);
						formData.append("licenseUrl", documents.license);
						formData.append("rcUrl", documents.rc);
						
						const res = await fetch(url, {
								method: "POST",
								body: formData
						})
						
						const data = await res.json();

						if (!res.ok) {
								console.error("Documents upload error:", data);
								toast.error(data.message?.toUpperCase() || "Document upload failed");
								setIsLoading(false);
								return;
						}
						
						console.log("Documents uploaded successfully:", data);
						toast.success("Documents uploaded successfully!");
						router.push('/partner/onboarding/bank');
						
				} catch (e) {
						console.error("Documents upload error:", e);
						toast.error("An unexpected error occurred. Please try again.");
				} finally {
						setIsLoading(false);
				}
		}

		return (
			<div className="text-white min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-8">

					<motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, ease: [0.16, 1, 0.9, 1]}}
					            className="w-full max-w-xl rounded-3xl border border-gray-800/80 bg-[#121212]/95 backdrop-blur-sm shadow-2xl shadow-black/50 p-6 sm:p-10">
							<div className="relative text-center">
									<button onClick={() => router.back()} className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center hover:scale-110 transition-all duration-300 group">
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
											<CarIcon height="1.8em" className="text-emerald-400"/>
											Vehicle Documents
									</h1>
									<p className="text-sm text-gray-400 mt-2 font-medium">Required for verification.</p>
							</div>

							<div className="mt-8 space-y-6">
									{Object.entries(documents).map(([docType, file]) => {
											const isUploaded = file !== null;
											const docLabels: Record<docType, { title: string; subtitle: string }> = {
													aadhaar: { title: 'Aadhaar /', subtitle: 'Government issued ID' },
													license: { title: 'Driving License', subtitle: 'Valid driving license' },
													rc: { title: 'Vehicle RC', subtitle: 'Vehicle Registration Certificate' }
											};
											const label = docLabels[docType as docType];
									
											return (
												<motion.label
													key={docType}
													whileHover={{ scale: isUploaded ? 1 : 1.01 }}
													className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
														isUploaded
															? 'border-emerald-500/50 bg-emerald-500/5'
															: 'border-gray-700 hover:border-white/30'
													}`}
												>
													<div className="flex-1">
														<div className="flex items-center gap-2">
															{isUploaded ? (
																<FileCheckIcon height="1.3em" className="text-emerald-400" />
															) : (
																<div className="w-5 h-5 rounded-full border-2 border-gray-600" />
															)}
															<div>
																<p className={`text-sm font-semibold ${
																	isUploaded ? 'text-emerald-400' : 'text-gray-400'
																}`}>
																	{docType === 'aadhaar' ? (
																		<>
																			Aadhaar /<strong className="text-[#cfa200] text-xs"> ID Proof</strong>
																		</>
																	) : (
																		label.title
																	)}
																</p>
																<p className="text-xs text-gray-400/80">{label.subtitle}</p>
																{isUploaded && (
																	<p className="text-xs text-emerald-400/70 mt-1 font-medium">
																		 {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
																	</p>
																)}
															</div>
														</div>
													</div>
													{isUploaded ? (
														<motion.div
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															className="flex gap-1 items-center justify-center bg-emerald-500/20 px-4 py-1.5 rounded-full border border-emerald-500/40"
														>
															<span className="text-xs text-emerald-300 font-semibold">Uploaded</span>
																<ShieldCheckIcon height="1.1em" style={{ color: '#9fe5c4' }} />
														</motion.div>
													) : (
														<motion.div
															whileHover={{ filter: "sepia(0.7)" }}
															transition={{ duration: 0.2, ease: [0.16, 1, 0.9, 1] }}
															className="flex gap-1 items-center justify-center bg-[#242424] px-4 py-1.5 rounded-full border border-white/20"
														>
															<span className="text-xs text-gray-200">Upload</span>
															<CloudUploadIcon height="1.2em" style={{ color: 'rgb(207 162 0 / 0.69)' }} />
														</motion.div>
													)}
													<input
														type="file"
														accept="/image*,.pdf"
														hidden
														onChange={(e) => handleImage(docType as docType, e.target?.files?.[0] || null)}
													/>
												</motion.label>
											);
									})}


							</div>

							<div className="mt-6 flex items-center gap-1 text-xs text-gray-400">
									<span className="text-white text-sm">*</span>
									<p>Documents are stored securely and are manually verified by our team.</p>
							</div>

							<div className="w-full flex items-center justify-center mt-10">
									<motion.button
										whileHover={{scale: isLoading ? 1 : 1.02}}
										whileTap={{scale: isLoading ? 1 : 0.98}}
										disabled={!isCompleted || isLoading}
										className={`w-full sm:w-2/3 h-14 text-white rounded-2xl font-semibold flex items-center justify-center shadow-lg transition-all duration-400 transform border-2 ${
											isLoading || !isCompleted
												? 'bg-gray-600 border-gray-500 cursor-not-allowed'
												: 'bg-linear-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600 hover:shadow-xs hover:shadow-emerald-600/40 border-white/60'
										}`}
										onClick={() => handleDocuments()}>
										{isLoading ? (
											<>
												<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg>
												Processing...
											</>
										) : (
											'Continue'
										)}
									</motion.button>
							</div>
					</motion.div>

			</div>

		)
}
export default Page
