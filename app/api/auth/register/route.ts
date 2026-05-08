import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/lib/db";
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs"

export const POST = async (req: NextRequest) => {
		try {
			const {name, email, password} = await req.json();
			await connectDb();

			let user = await User.findOne({email})
			if (user) {
				return NextResponse.json({message:"email already exist"},{status:400})
			}

			if(password.length < 4){
				return NextResponse.json({message:"password must be greater than 4 digits"},{status:400})
			}

			const hashedPassword=await bcryptjs.hash(password,8);

			user =await User.create({
				name,email,password:hashedPassword
			});
			return NextResponse.json({message:"Registration successful!"},{status:201});

		} catch (e : unknown) {
			console.error("Register API error:", e);
			const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred";
			return NextResponse.json({message: errorMessage},{status:500})
		}
}