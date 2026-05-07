"use client"


import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import Logo from "@/app/(web)/components/Logo";
import {useDispatch} from "react-redux";
import {openModal, setFormType} from "@/app/redux/modalSlice";

const Header = () => {
		const pathname = usePathname();
		const dispatch = useDispatch();

		const hrefs = ["Home", "Bookings", "About Us", "Contact"] as const;

		return (
			<header
				className="fixed top-0 left-0 right-0 z-100  border-b border-gray-700/50 shadow-xs"
			>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-between h-20">

									<Logo/>

									{/* Navigation */}
									<nav className="hidden md:flex items-center space-x-8">
											{
													hrefs.map((h, i) => {
																const href = (h == "Home") ? "/" : `/${h.toLowerCase()}`;
																const active = href == pathname;

																return <Link key={i} href={href} className={`${active ? "text-green-400" : "text-gray-300"} cursor-pointer text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 `}>{h}</Link>
														}
													)
											}</nav>

									{/* CTA Button */}
									<div className="flex items-center space-x-4">
											<button className="cursor-pointer px-4 py-1 hover:border-stone-600 bg-[#212121] text-gray-300 border border-stone-700 font-medium transition-colors duration-200 rounded-lg" onClick={() => {
													dispatch(setFormType('login'));
													dispatch(openModal());

											}}>
													Sign In
											</button>
											<button className="cursor-pointer px-6 py-1 bg-[#006239] text-white font-medium rounded-lg hover:bg-[#006239]/90 border border-teal-700 hover:border-teal-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg" onClick={() => {

													dispatch(setFormType('register'));
													dispatch(openModal());

											}}>
													Start your journey
											</button>
									</div>
							</div>
					</div>
					{/* Modal Overlay */}

			</header>
		);
};

export default Header;