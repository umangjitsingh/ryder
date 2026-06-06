import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/lib/db";
import {auth} from "@/app/auth";
import User from "@/app/models/user.model";
import Vehicle from "@/app/models/vehicle.model";
import PartnerDocs from "@/app/models/partnerDocs.model";
import PartnerBankDocs from "@/app/models/partnerBankDocs.model";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
		try {
				await connectDb();
				const session = await auth();
				if (!session || !session.user?.email || session.user.role !== "admin") {
						return NextResponse.json({message: "unauthorized"}, {status: 400})
				}
				const partnerId = (await context.params).id;
				const partner = await User.findById(partnerId);

				if (!partner || partner.role !== "partner") {
						return NextResponse.json({message: "partner not found"}, {status: 400})
				}

				const vehicle = await Vehicle.findOne({owner: partnerId});
				const docs = await PartnerDocs.findOne({owner: partnerId});
				const bank = await PartnerBankDocs.findOne({owner: partnerId});

				return NextResponse.json({
						partner,
						vehicle: vehicle || null,
						documents:docs || null,
						bank: bank || null
				}, {status: 200})

		} catch (e) {
return NextResponse.json({
		message:`partner GET error ${e}`
},{status:500})
		}
}