import {motion} from "motion/react";
import React, {useState} from "react";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {selectEmail} from "@/app/redux/modalSlice";

const shake = {
		initial: {x: 0},
		animate: {
				x: [-10, 10, -10, 10, 0],
				transition: {duration: 0.4}
		}
};

const Otp = ({onClose}: { onClose: () => void }) => {
		const [otp, setOtp] = useState(new Array(6).fill(""));
		const [error, setError] = useState(false);
		const [loading, setLoading] = useState(false);
		const email = useSelector(selectEmail);

		function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
				const value = e.target.value;

				if (!/^[0-9]?$/.test(value)) return;

				const copy = [...otp];
				copy[index] = value;
				setOtp(copy);

				// Auto move to next input
				if (value && e.target.nextSibling) {
						(e.target.nextSibling as HTMLInputElement).focus();
				}
		}

		function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
				if (e.key === "Backspace") {
						const copy = [...otp];

						if (otp[index] === "") {
								const target = e.target;
								if (target instanceof HTMLInputElement) {
										const prev = target.previousElementSibling as HTMLInputElement | null;
										if (prev) prev.focus();
								}
						}

						copy[index] = "";
						setOtp(copy);
				}
		}

		async function handleVerify(close: () => void) {
				const OTP = otp.join("");

				if (OTP.length !== 6) {
						toast.error("Please enter a complete 6-digit OTP");
						return;
				}

				if (!email) {
						toast.error("Email is missing. Please try registering again.");
						return;
				}

				setLoading(true);
				setError(false);

				try {
						console.log("Verifying OTP for email:", email);

						const url = new URL('/api/auth/verify-email', window.location.origin);
						const res = await fetch(url, {
								method: "POST",
								headers: {
										"Content-Type": "application/json"
								},
								body: JSON.stringify({
										otp: OTP,
										email: email
								})
						});

						const data = await res.json();
						console.log("OTP verification response:", data);

						if (!res.ok) {
								setError(true);
								toast.error(data.message || "OTP verification failed");
								return;
						}

						toast("Thanks for joining us. Just choose your destination, confirm your ride, and you’re on the move.", {
								icon: '👏',
								duration: 4000,
								position: "top-center",
								style: {
										borderRadius: '12px',
										background: '#0a0a0a',
										color: '#46e587',
										padding: '16px 20px',
										fontSize: '15px',
										fontWeight: '500',
										border: '1px solid #1f1f1f',
										boxShadow: '0 8px 25px rgba(0,0,0,0.45)',
										width: '100%',
										maxWidth: '420px',   // wider on medium screens
								},
						});

						close();
				} catch (e) {
						console.error("OTP verification error:", e);
						setError(true);
						toast.error("Network error: Please try again");
				} finally {
						setLoading(false);
				}
		}

		return (
			<motion.div
				initial={{scale: 0, opacity: 0}}
				animate={{scale: 1, opacity: 1}}
				transition={{duration: 0.29}}
				className="text-gray-300 py-2"
			>
					<h1 className="text-2xl font-semibold">Email verification</h1>
					<p className="text-sm text-gray-400 mt-1">
							Please enter the 6‑digit code sent to your email
					</p>

					<motion.div
						variants={shake}
						animate={error ? "animate" : "initial"}
						className="flex items-center justify-center gap-3 mt-6">
							{otp.map((val, index) => (
								<input
									key={index}
									type="text"
									maxLength={1}
									value={val}
									className="w-14 h-14 text-center text-2xl bg-[#212121] border border-white/20 rounded-lg focus:border-green-500 outline-none"
									onChange={(e) => handleChange(e, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
								/>
							))}
					</motion.div>

					<button
						onClick={() => handleVerify(onClose)}
						disabled={loading}
						className="w-full px-6 py-2 mt-8 bg-[#006239] text-white rounded-lg hover:bg-[#006239]/90 border border-teal-700 hover:border-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
							{loading ? "Verifying..." : "Verify"}
					</button>
			</motion.div>
		);
};

export default Otp;
