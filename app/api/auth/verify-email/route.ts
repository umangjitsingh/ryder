import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/lib/db";
import User from "@/app/models/user.model";

export async function  POST(req:NextRequest){
		try{
				await connectDb();

				const{email,otp}=await req.json();
				console.log("OTP verification request:", { email, otp });

				if (!email || !otp) {
						return NextResponse.json({message:"email and otp is required"},{status:400})
				}
				const user=await User.findOne({email});

				if(!user){
						console.log("User not found:", email);
						return NextResponse.json({message:"user not found"},{status:400})
				}
				if(!user.otpExpiresAt || user.otpExpiresAt < new Date()){
						console.log("OTP expired for user:", email);
						return NextResponse.json({message:"otp is expired"},{status:400})
				}

				if(!user.otp || user.otp !== otp){
						console.log("Invalid OTP for user:", email);
						return NextResponse.json({message:"otp is not valid"},{status:400})
				}
				user.isEmailVerified=true;
				user.otp=undefined;
				user.otpExpiresAt=undefined;

				await user.save();
				console.log("Email verified successfully:", email);
				return NextResponse.json({message:`${email} is verified successfully`},{status:200})
		}catch (e :unknown) {
				const errorMessage = e instanceof Error ? e.message : `Something went wrong on Server.`;
				console.error("OTP verification error:", e);
						return NextResponse.json({message:errorMessage},{status:500})

		}
}
