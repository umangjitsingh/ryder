"use client"
import React, {useRef} from 'react';
import { motion } from 'motion/react';
import {useSelector} from "react-redux";
import {selectUser} from "@/app/redux/userSlice";

const Page = () => {
		const videoCallRef = useRef<HTMLDivElement>(null);
		const userData=useSelector(selectUser);


		async function handleVideoCall() {
				if(!videoCallRef.current){
						return;
				}
				
				// Dynamic import to avoid SSR issues
				const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');
				
				try{
						const appId=Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
						const serverSecret=process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
						
						if (!serverSecret) {
								console.error("Missing NEXT_PUBLIC_ZEGO_SERVER_SECRET");
								return;
						}
						
						const roomId='2';
						const userId=userData?._id.toString();
						if (!userId) {
								console.error("User ID missing");
								return;
						}
						
						const userName=userData?.name;
						if(!userName){
								console.error("Username is missing");
								return;
						}

						const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest( appId, serverSecret,roomId,userId,userName);

						const zp=ZegoUIKitPrebuilt.create(kitToken);

						zp.joinRoom({
								container: videoCallRef.current,
								scenario: {
										mode: ZegoUIKitPrebuilt.OneONoneCall,
								},
								showPreJoinView:false
						});

				}
				catch (e) {
						console.log(e)
				}
		}

		return (
			<div  className="flex flex-col items-center gap-4  w-full ">
					<div ref={videoCallRef} className="h-110 w-100 md:h-200 md:w-200 border-teal-100 bg-white/10 mt-40 rounded-xl"></div>
					<motion.button whileHover={{scale:1.06}} whileTap={{scale:1.1}}
					               className="text-white h-10 w-28  rounded-full bg-teal-700 text-sm tracking-tight shadow-sm cursor-pointer"
					onClick={()=>handleVideoCall()}>VIDEO CALL</motion.button>
			</div>

		)
}
export default Page
