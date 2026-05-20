import connectDb from "@/app/lib/db";
import {auth} from "@/app/auth";
import User from "@/app/models/user.model";
import {NextRequest} from "next/server";

export async function GET(req:NextRequest){
		try{
				await connectDb();

				const session =await auth();
				if(!session || !session.user){
						return Response.json({message:"user not authenticated"},{status:400})
				}
				const user =await User.findOne({email:session.user.email});
				if(!user){
						return Response.json({message:"user not found"},{status:400})
				}
				return Response.json(user,{status:200})
		}catch (e: unknown) {
				const errorMessage= e instanceof Error ? e.message : "something went wrong -get/me"
				return Response.json({message:errorMessage},{status:400})
		}
}