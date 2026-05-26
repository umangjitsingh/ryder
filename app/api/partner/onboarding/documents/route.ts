import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/lib/db";
import {auth} from "@/app/auth";
import User from "@/app/models/user.model";
import mongoose from "mongoose";
import handleUpload from "@/app/api/helper/BlobToUrl";
import PartnerDocs from "@/app/models/partnerDocs.model";

interface IUploadPayload {
		owner?: mongoose.Types.ObjectId,
		aadhaarUrl?: string,
		rcUrl?: string,
		licenseUrl?: string,
		status?: "approved" | "pending" | "rejected",
}

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

				const formData = await req.formData();
				const aadhaar = formData.get("aadhaarUrl") as Blob | null
				const license = formData.get("licenseUrl") as Blob | null;
				const rc = formData.get("rcUrl") as Blob | null;

				if (!aadhaar || !license || !rc) {
						return NextResponse.json({
								message: "failed to upload document images"
						}, {
								status: 400
						})
				}

				const uploadPayload: IUploadPayload = {
						status: "pending",
				}

				const aadhaarUrl = await handleUpload("aadhaar", aadhaar);
				const licenseUrl = await handleUpload("license", license);
				const rcUrl = await handleUpload("rc", rc);

				uploadPayload.aadhaarUrl = aadhaarUrl;
				uploadPayload.licenseUrl = licenseUrl;
				uploadPayload.rcUrl = rcUrl;

				const partnerDocs=await PartnerDocs.findOneAndUpdate(
					{owner: user._id},
					{$set: uploadPayload},
					{upsert:true,new:true}
				)

				if(user.partnerOnBoardingSteps <2){
						user.partnerOnboardingSteps=2
				}
				await user.save()
				return NextResponse.json(partnerDocs,{status:201})

		} catch (e) {
				const errorMessage = e instanceof Error ? e.message : "step 2 error";
				return NextResponse.json({message: errorMessage}, {status: 500})
		}
}

