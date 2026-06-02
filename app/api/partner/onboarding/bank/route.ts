import connectDb from "@/app/lib/db";
import {auth} from "@/app/auth";
import User from "@/app/models/user.model";
import {NextRequest, NextResponse} from "next/server";
import partnerBankDocs from "@/app/models/partnerBankDocs.model";

export async function POST(req: NextRequest) {
		try {
				await connectDb();

				const session = await auth();

				if (!session || !session.user?.email) {
						return Response.json({
								message: "unauthorized"
						}, {status: 400})
				}

				const user = await User.findOne({email: session.user?.email});
				if (!user) {
						return Response.json({
								message: "user not found"
						}, {status: 400})
				}

				const {accountHolder, accountNumber, ifsc, upi, mobileNumber} = await req.json();

				if (!accountHolder || !accountNumber || !ifsc || !mobileNumber) {
						return NextResponse.json({
								message: "fill all the bank details"
						}, {
								status: 400
						})
				}

				const partnerBankDocuments = await partnerBankDocs.findOneAndUpdate({owner: user._id},
					{
							accountHolder,
							accountNumber,
							ifsc,
							upi,
							status: "added"
					}, {
							upsert: true, new: true
					})

				user.mobileNumber = mobileNumber;

				if (user.partnerOnboardingSteps < 3) {
						user.partnerOnboardingSteps = 3
				}
				await user.save();

				return NextResponse.json({
						partnerBankDocuments
				}, {
						status: 201
				})
		} catch (e) {
				const errorMessage = e instanceof Error ? e.message : "step 2 error";
				return NextResponse.json({message: errorMessage}, {status: 500})
		}
}

export async function GET(req: NextRequest) {
		try {
				await connectDb();
				const session = await auth();

				if (!session || !session.user?.email) {
						return Response.json({
								message: "unauthorized"
						}, {status: 400})
				}

				const user = await User.findOne({email: session.user?.email});
				if (!user) {
						return Response.json({
								message: "user not found"
						}, {status: 400})
				}

				const partnerBankDocuments = await partnerBankDocs.findOne({owner:user._id});
				if(partnerBankDocuments){
						return NextResponse.json({
								partnerBankDocuments
						}, {
								status: 200
						})
				}else{
						return null
				}
		} catch (e) {
				const errorMessage = e instanceof Error ? e.message : "step 3 error";
				return NextResponse.json({message: errorMessage}, {status: 500})
		}
}


