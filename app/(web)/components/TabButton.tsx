"use client"
import { motion } from 'motion/react';
import React from 'react'

type TabProps = {
	active: boolean;
	count: number;
	onClick: () => void;
	icon: React.ReactNode;
	children: React.ReactNode;
}

const TabButton = ({ active, count, onClick, icon, children }: TabProps) => {
	return (
		<motion.button
			onClick={onClick}
			whileTap={{ scale: 0.96 }}
			whileHover={{ scale: 1.02 }}
			className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 select-none cursor-pointer
				${active
					? "bg-linear-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-300 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/10"
					: "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
				}`}
		>
			{/* Active indicator bar */}
			{active && (
				<motion.span
					layoutId="tab-indicator"
					className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-400 rounded-full"
				/>
			)}

			{/* Icon */}
			<span className={`flex items-center transition-colors duration-300 ${active ? "text-emerald-400" : "text-neutral-500 group-hover:text-neutral-300"}`}>
				{icon}
			</span>

			{/* Label */}
			<span className={`hidden sm:inline transition-colors duration-300 ${active ? "text-emerald-200" : "text-neutral-400"}`}>
				{children}
			</span>

			{/* Count badge */}
			<span className={`min-w-5 h-5 px-1.5 text-xs font-bold rounded-full flex items-center justify-center transition-all duration-300
				${active
					? "bg-emerald-500/30 text-emerald-200 ring-1 ring-emerald-400/30"
					: count > 0
						? "bg-red-500/20 text-red-400 ring-1 ring-red-500/30"
						: "bg-neutral-800 text-neutral-500"
				}`}>
				{count}
			</span>
		</motion.button>
	)
}
export default TabButton

