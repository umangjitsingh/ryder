"use client"

import {motion} from 'motion/react';
import React from 'react'
import Login from "@/app/(web)/components/Login";
import Logo from "@/app/(web)/components/Logo";
import Register from "@/app/(web)/components/registerForm";

interface propType {
		open: boolean;
		onClose: () => void
}

const AuthForm = ({open, onClose}: propType) => {
		return (
			<>
					{open && <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             className=" bg-[#171717]/90  fixed inset-0 backdrop-blur-xl z-20"
             // onClick={onClose}
          >
             <div className=" p-8">
                <Logo/>
             </div>
             <motion.div
                initial={{opacity: 0, scale: 0.96, y: 40}}
                animate={{opacity: 1, scale: 1, y: 0}}
                transition={{duration: 0.4, ease: 'easeIn'}}
                className=" fixed inset-0 z-30  flex items-center justify-center px-4">


                <div className="w-full max-w-md relative  h-2/5">
                   <Login onClose={onClose}/>
	                 {/*<Register/>*/}
                </div>


             </motion.div>
          </motion.div>}

			</>

		)
}
export default AuthForm
