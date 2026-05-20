"use client"

import React, {useState, useEffect, useRef} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import Logo from "@/app/(web)/components/Logo";
import {useDispatch, useSelector} from "react-redux";
import {openModal, setFormType} from "@/app/redux/modalSlice";
import {selectUser, setUserData} from "@/app/redux/userSlice";
import {signOut, useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {selectToggleMenu, setToggleMenu} from "@/app/redux/menuSlice";
import {motion, AnimatePresence} from 'motion/react';
import {Route} from "next";
import {useRouter} from "next/navigation";

const Header = () => {
		const [showLogoutModal, setShowLogoutModal] = useState(false);
		const [isScrolled, setIsScrolled] = useState(false);
		const dispatch = useDispatch();
		const userData = useSelector(selectUser);
		const {data: session, status} = useSession();
		const pathname = usePathname();
		const showMenu = useSelector(selectToggleMenu);
		const menuRef = useRef<HTMLElement>(null);
		const logoutRef = useRef<HTMLElement>(null)
		const router = useRouter()
		const [mounted, setMounted] = useState(false);

		// Handle scroll effect and mount state
		useEffect(() => {
				setMounted(true);

				const handleScroll = () => {
						setIsScrolled(window.scrollY > 20);
				};
				window.addEventListener('scroll', handleScroll);
				return () => window.removeEventListener('scroll', handleScroll);
		}, []);

		// Sync session changes to Redux
		useEffect(() => {
				if (status === "unauthenticated") {
						dispatch(setUserData(null));
				} else if (status === "authenticated" && session?.user) {

				}
		}, [status, session, dispatch]);

		useEffect(() => {
				function handleClickOutside(e: MouseEvent) {
						if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
								dispatch(setToggleMenu())
						}

				}

				if (showMenu) {
						document.addEventListener("mousedown", handleClickOutside)
				}
				return () => document.removeEventListener("mousedown", handleClickOutside)
		}, [dispatch, showMenu])

		useEffect(() => {
				function handleClickOutside(e: MouseEvent) {

						if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
								setShowLogoutModal(false)
						}
				}

				if (showLogoutModal) {
						document.addEventListener("mousedown", handleClickOutside)
				}
				return () => document.removeEventListener("mousedown", handleClickOutside)
		}, [dispatch, showLogoutModal])

		const hrefs = ["Home", "Bookings", "About Us", "Contact"] as const;

		async function handleLogout() {
				setShowLogoutModal(false);
				await signOut({redirect: false});
				// Redux will be cleared by the useEffect when status changes to "unauthenticated"
				setTimeout(() => {
						toast.success("Logout successful");
				}, 200);
		}

		function handleMenu() {
				dispatch(setToggleMenu())
		}

		return (
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? 'bg-[#121212]/95 backdrop-blur-md shadow-lg border-b border-gray-800/80'
						: 'bg-[#121212]/60 backdrop-blur-sm shadow-sm border-b border-gray-700/50'
				}`}
			>
					<div className="max-w-600 mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-between h-20">

									<Logo/>

									{/* Navigation */}
									{showMenu ? (
										<motion.nav ref={menuRef}
										            initial={{opacity: 0, x: -10}}
										            animate={{opacity: 1, x: 0}}
										            exit={{opacity: 0, x: -10}}
										            transition={{
												            duration: 0.6,
												            ease: [0.16, 1, 0.9, 1]
										            }}
										            className={`absolute right-4 top-20 flex flex-col py-4 px-6 border backdrop-blur-md rounded-xl shadow-2xl transition-all duration-300 sm:hidden ${
											            isScrolled
												            ? 'bg-[#121212]/95 border-gray-700/80'
												            : 'bg-black/80 border-[#404040]'
										            }`}
										>
												{hrefs.map((h, i) => {
														const href = h === "Home" ? "/" : `/${h.toLowerCase()}`
														const active = mounted && href === pathname

														return (
															<Link
																key={i}
																href={href as Route}
																className={`py-2 ${active ? "text-emerald-400 font-semibold" : "text-gray-300 hover:text-emerald-400 font-medium"} cursor-pointer transition-all duration-200`}
															>
																	{h}
															</Link>
														)
												})}

												<span onClick={() => router.push('/partner/onboarding/vehicle')} className="bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg mt-3 font-semibold px-4 py-2.5 text-white text-base shadow-lg ring-1 ring-white/20 hover:ring-white/40 transition-all duration-300 cursor-pointer transform hover:scale-105 text-center">
										      Drive with us
										    </span>
										</motion.nav>
									) : (
										<nav className="hidden md:flex items-center space-x-8">
												{hrefs.map((h, i) => {
														const href = h === "Home" ? "/" : `/${h.toLowerCase()}`
														const active = mounted && href === pathname

														return (
															<Link
																key={i}
																href={href as Route}
																className={`${active ? "text-emerald-400 font-semibold" : "text-gray-300 hover:text-emerald-400 font-medium"} cursor-pointer transition-all duration-200`}
															>
																	{h}
															</Link>
														)
												})}
										</nav>
									)}


									<div className="flex items-center gap-3 relative">
											<div className=" relative">
													{userData ? <div className="relative flex gap-4 ">
																{userData.role !== "partner" &&
                                   <button onClick={() => router.push('/partner/onboarding/vehicle')} className="hidden sm:flex items-center gap-0.5 group relative px-2 py-2 bg-[#C8A200] text-amber-950 text-sm font-semibold rounded-full hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 rubik uppercase ">

                                      <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 16 16" className="inline-block mr-2 transition-transform duration-300 group-hover:scale-110">
                                         <path fill="currentColor" fillRule="evenodd" d="M8.716.315a1 1 0 0 0-1.432 0L6.646.97a1 1 0 0 1-.988.265l-.88-.248a1 1 0 0 0-1.24.716l-.226.886a1 1 0 0 1-.723.723l-.886.225a1 1 0 0 0-.716 1.24l.248.881a1 1 0 0 1-.265.988l-.655.638a1 1 0 0 0 0 1.432l.655.639a1 1 0 0 1 .265.987l-.248.88a1 1 0 0 0 .716 1.24l.886.226a1 1 0 0 1 .723.723l.225.886a1 1 0 0 0 1.24.717l.881-.248a1 1 0 0 1 .988.264l.638.655a1 1 0 0 0 1.432 0l.639-.655a1 1 0 0 1 .987-.264l.88.248a1 1 0 0 0 1.24-.717l.226-.886a1 1 0 0 1 .723-.723l.886-.225a1 1 0 0 0 .717-1.24l-.248-.88a1 1 0 0 1 .264-.988l.655-.639a1 1 0 0 0 0-1.432l-.655-.638a1 1 0 0 1-.264-.988l.248-.88a1 1 0 0 0-.717-1.24l-.886-.226a1 1 0 0 1-.723-.723l-.225-.886a1 1 0 0 0-1.24-.716l-.88.248A1 1 0 0 1 9.354.97zm3.057 5.975a.75.75 0 0 0-1.042-1.08L6.597 9.202L5.28 7.887A.75.75 0 0 0 4.22 8.95l1.839 1.834a.75.75 0 0 0 1.05.01z" clipRule="evenodd"></path>
                                      </svg>
                                      Drive with us
                                   </button>}


																<div
																	className="flex items-center justify-center cursor-pointer sm:hidden"
																	onClick={handleMenu}
																>
																		{!showMenu ? (
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				viewBox="0 0 25 24"
																				className="h-10 w-10 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
																			>
																					<path
																						fill="#fff"
																						fillRule="evenodd"
																						d="M6.319 14.249a2.248 2.248 0 1 1 0-4.497a2.248 2.248 0 0 1 0 4.496M5.57 12a.748.748 0 1 0 1.497 0a.748.748 0 0 0-1.497 0m6.745 2.249a2.248 2.248 0 1 1 0-4.497a2.248 2.248 0 0 1 0 4.496M11.567 12a.748.748 0 1 0 1.496 0a.748.748 0 0 0-1.496 0m4.497 0a2.248 2.248 0 1 0 4.496 0a2.248 2.248 0 0 0-4.496 0m2.248.749a.748.748 0 1 1 0-1.497a.748.748 0 0 1 0 1.496"
																						clipRule="evenodd"
																					/>
																			</svg>
																		) : (
																			<motion.svg
																				initial={{scale: 0}}
																				animate={{scale: 1, rotate: 45}}
																				exit={{scale: 0}}
																				transition={{duration: 0.4}}
																				className="h-8 w-8 p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
																				xmlns="http://www.w3.org/2000/svg"
																				viewBox="0 0 24 24"
																			>
																					<path
																						fill="none"
																						stroke="#fff"
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						strokeWidth={2}
																						d="M12 16v5m0-18v5m4 4h5M3 12h5m4 0h.01"
																					/>
																			</motion.svg>
																		)}
																</div>


																<div className=" group">
																		<button onClick={() => setShowLogoutModal(!showLogoutModal)} className="relative h-10 w-10 rounded-full bg-linear-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 cursor-pointer transform group-hover:scale-105">
																				{userData.name?.charAt(0).toUpperCase()}
																		</button>
																		<div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#121212] rounded-full"></div>
																</div>
																<AnimatePresence>
																		{showLogoutModal && (
																			<motion.div
																				initial={{opacity: 0, scale: 0.95, y: -10}}
																				animate={{opacity: 1, scale: 1, y: 0}}
																				exit={{opacity: 0, scale: 0.95, y: -10}}
																				transition={{duration: 0.2}}
																				className="absolute top-14 right-0 bg-[#121212]/95 backdrop-blur-md border border-gray-700/80 rounded-xl shadow-2xl overflow-hidden min-w-45"

																			>
                                   <span className="flex text-gray-300 hover:text-white items-center gap-3 px-5 py-3 cursor-pointer hover:bg-white/5 transition-all duration-200" onClick={handleLogout} ref={logoutRef}>
	                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}><path d="M20 12a8 8 0 0 0-8-8m0 16a7.99 7.99 0 0 0 6.245-3"></path><path strokeLinejoin="round" d="M4 12h10m0 0l-3-3m3 3l-3 3"></path></g></svg>
	                                    <span className="font-medium">Logout</span>
																	 </span>
																			</motion.div>
																		)}
																</AnimatePresence>
														</div> :

														<div className="flex items-center space-x-3 sm:space-x-4">
																<button className="text-sm sm:text-base px-4 py-2 cursor-pointer bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 font-medium transition-all duration-200 rounded-lg" onClick={() => {
																		dispatch(setFormType('login'));
																		dispatch(openModal());

																}}>
																		Sign In
																</button>
																<button className="hidden sm:block text-sm sm:text-base px-5 py-2 cursor-pointer bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-emerald-500/25" onClick={() => {

																		dispatch(setFormType('register'));
																		dispatch(openModal());

																}}>
																		Start your journey
																</button>
														</div>}
											</div>
									</div>


							</div>
					</div>
					{/* Modal Overlay */}

			</header>
		);
};

export default Header;
