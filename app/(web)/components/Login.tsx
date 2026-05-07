import React, {useState} from 'react'
import {IoLogoGoogle} from "react-icons/io";
import {LuEye, LuEyeClosed} from "react-icons/lu";
import {MdClose} from "react-icons/md";
import {useDispatch} from "react-redux";
import {setFormType} from "@/app/redux/modalSlice";


const Login = ({onClose}: {onClose: () => void}) => {
	const [showPassword,setShowPassword]=useState(false)
	const dispatch = useDispatch()

	const doLogin = async (formData: FormData) => {

			const email = formData.get("email");
			const password = formData.get("password")

			console.log(email, password)
	}

	const handleSwitchToRegister = () => {
		dispatch(setFormType('register'));
	};

	

	return (
		<div className="text-gray-300 py-2">
			<div className=" text-2xl flex justify-end w-full pr-2">
				<MdClose className="hover:text-green-400 cursor-pointer" onClick={onClose}/>
			</div>

			<div className="px-12">
				<h1 className="text-2xl font-semibold">Welcome back</h1>
				<h6 className="text-sm text-gray-400 leading-8">Sign in to your account</h6>

				<button className="flex items-center justify-center gap-2 bg-[#212121] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] outline outline-white/20 outline-offset-4 hover:outline-white/30 rounded-lg py-3 w-full mt-4 font-semibold text-base">
					<IoLogoGoogle className="h-5 w-5 text-white/40"/>
					Continue with Google
				</button>

				<div className="flex items-center gap-4 mt-6">
					<div className="h-px bg-white/20 flex-1"></div>
					<p className="text-white text-sm">or</p>
					<div className="h-px bg-white/20 flex-1"></div>
				</div>

				<form action={doLogin}
				      className="mt-4 relative">
					<div className="flex flex-col">
						<label className="text-sm text-white mb-2">Email</label>
						<input
							type="email"
							placeholder="you@example.com"
							className="bg-[#212121]/70 border border-white/20 rounded-lg px-4 py-1.5 placeholder-white/50 placeholder:text-[15px] placeholder:tracking-wide"
							name="email"
						/>
					</div>

					<div className="flex flex-col mt-4 relative">
						<label className="text-sm text-white mb-2">Password</label>
						<input
							type={showPassword ? "password" : "text"}
							placeholder="......"
							className="bg-[#212121]/70 border border-white/20 rounded-lg px-4 pb-2.5  placeholder-white/50 placeholder:text-2xl -placeholder:tracking-tighter placeholder:font-serif "
							
							name="password"
						/>

						<div className="bg-[#202020] h-8 w-8 absolute right-0.75 top-7.75 rounded-md flex items-center justify-center border border-white/10 hover:border-white/20"
							onClick={()=>setShowPassword(!showPassword)}>
							{showPassword ? <LuEye className="text-white/40"/> : <LuEyeClosed className="text-white/40"/>}
						</div>
					</div>

					<button className="w-full px-6 py-2 mt-6 bg-[#006239] text-white rounded-lg hover:bg-[#006239]/90 border border-teal-700 hover:border-teal-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg" type="submit">
						Sign in
					</button>

					<div className="w-full flex items-center justify-center mt-8">
						<span className="text-sm text-white/70">Don&#39;t have an account? <span className="underline text-white font-medium cursor-pointer" onClick={handleSwitchToRegister}>Sign up</span></span>
					</div>
				</form>
			</div>
		</div>

	)
}
export default Login;