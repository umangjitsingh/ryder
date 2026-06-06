"use client"
import {motion} from 'motion/react';
import React from 'react'
import CheckCircleSolidIcon from '@iconify-react/flowbite/check-circle-solid';
import RateReviewOutlineIcon from '@iconify-react/material-symbols-light/rate-review-outline';
import {useRouter} from "next/navigation";

type ReviewProps = {
		data: any[] | null;
		type: string
}

const ReviewCards = ({data, type}: ReviewProps) => {
		const router=useRouter()



		if (data?.length === 0) {
				return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}}
				                    className="bg-white/5 rounded-xl py-16 text-center norder border-dashed border-white/10 shadow-sm">
						<div className="w-12 h-12 rounded-xl bg-linear-to-r from-emerald-500/20 to-emerald-400/10 flex items-center justify-center mx-auto mb-4">
								<CheckCircleSolidIcon height="1.2em" color="#46b760"/>
						</div>
						<p className="font-bold text-neutral-100 text-base">All caught up!</p>
						<p className=" text-sm text-neutral-400 mt-1">No pending items right now.</p>

				</motion.div>)
		}

		return (
			<div className="space-y-4">
					<div className="flex items-center justify-between px-1 mb-1">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{type === "partner" ? "Partner Review Queue" : type === "kyc" ? "Video KYC Review" : "Vehicle Review"}</p>
							<p className="text-xs text-gray-400">{data?.length} items</p>
					</div>

					{data?.map((item, index) => {
							return (
								<motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}
								            transition={{delay: index * 0.17}} whileHover={{ boxShadow: "0 0 4px rgba(220,190,199,0.7"}}
								            className=" bg-linear-to-bl from-white/10 to-amber-100/10 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 shadow-sm trasition-shadow"
								            key={item?._id}>
										<div className="flex items-center gap-4 min-w-0 ">
												<div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 text-purple-400 bg-linear-to-b from-purple-200/5 to-pink-200/5">{item?.name.charAt(0).toUpperCase()}</div>
												<div className="min-w-0">
														<p className="font-bold text-sm text-white/70 truncate">{item.name}</p>
														<p className="font-medium text-xs text-white/60 truncate">{item.email}</p>
												</div>
										</div>
										<div className="shrink-0">
												<motion.button onClick={()=>router.push(`/admin/review/partner/${item?._id}`)}
													whileTap={{ scale: 0.98 }}
													className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-br from-gray-600/60 to-slate-600/60 border border-white/40 hover:bg-black/20 hover:border hover:border-white/20  hover:bg-none text-[#ade2f9] text-sm font-semibold "
												>
														Review
														<RateReviewOutlineIcon height="1.4em" className="text-[#ade2f9]" />
												</motion.button>

										</div>

								</motion.div>
							)
					})}
			</div>
		)
}
export default ReviewCards
