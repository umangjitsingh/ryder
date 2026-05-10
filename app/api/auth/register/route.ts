import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/lib/db";
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import {sendMail} from "@/app/lib/sendMail"

export const POST = async (req: NextRequest) => {
		try {
			const {name, email, password} = await req.json();
			console.log("Registration API called for:", email);
			await connectDb();

			let user = await User.findOne({email})
			if (user && user.isEmailVerified) {
				console.log("Email already exists and verified:", email);
				return NextResponse.json({message:"email already exist"},{status:400})
			}

			const otp=Math.floor(100000+Math.random()*900000).toString();
			const otpExpiresAt=new Date(Date.now()+10*60*1000)
			console.log("Generated OTP:", otp, "expires at:", otpExpiresAt);

			if(password.length < 4){
				return NextResponse.json({message:"password must be greater than 4 digits"},{status:400})
			}

			const hashedPassword=await bcryptjs.hash(password,8);

			if(user && !user.isEmailVerified){
					user.name=name;
					user.email=email;
					user.password=hashedPassword;
					user.otp=otp;
					user.otpExpiresAt=otpExpiresAt;
					await user.save()
					console.log("Updated existing unverified user:", email);
			}else{
					user =await User.create({
							name,email,password:hashedPassword,otp,otpExpiresAt
					});
					console.log("Created new user:", email);
			}

			await sendMail(email,
				"Your OTP Email Verification",
				`<h2>Your Email Verification OTP is <strong>${otp}</strong></h2>`,
				)
			console.log("OTP email sent to:", email);

			return NextResponse.json({message:"Registration successful! Please check your email for OTP."},{status:201});

		} catch (e : unknown) {
			console.error("Registration API error:", e);
			const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred";
			return NextResponse.json({message: errorMessage},{status:500})
		}
}