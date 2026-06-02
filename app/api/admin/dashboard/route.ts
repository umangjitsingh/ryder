import connectDb from "@/app/lib/db";
import {auth} from "@/app/auth";
import User from "@/app/models/user.model";
import Vehicle from "@/app/models/vehicle.model";

export async function GET(req: Request) {
		try {
				await connectDb();
				const session = await auth();
				if (!session || !session.user?.email || session.user?.role !== "admin") {
						return Response.json({message: "unauthorized"}, {status: 400})
				}

				const result = await User.aggregate([
						{$match: {role: "partner"}},
						{
								$group: {
										_id: "$partnerStatus",
										count: {$sum: 1}
								}
						}
				]);

				console.log("Aggregation result-->", result)

				const stats = {
						totalPartners: 0,
						approved: 0,
						pending: 0,
						rejected: 0
				};

				result.forEach(item => {
						stats.totalPartners += item.count;

						if (item._id === "approved") stats.approved = item.count;
						if (item._id === "pending") stats.pending = item.count;
						if (item._id === "rejected") stats.rejected = item.count;
				});

				const pendingPartners = await User.find({
						role: "partner",
						partnerStatus: "pending",
						partnerOnboardingSteps: 3
				})

				console.log("Pending partners count:", pendingPartners.length)
				console.log("Pending partners:", pendingPartners.map(p => ({id: p._id, name: p.name})))

				const pendingPartnerIds = pendingPartners.map((p) => p._id);
				const pendingPartnerVehicles = await Vehicle.find({
						owner: {$in: pendingPartnerIds}
				})

				console.log("Pending partner vehicles count:", pendingPartnerVehicles.length)
				console.log("Pending partner vehicles:", pendingPartnerVehicles.map(v => ({owner: v.owner, type: v.type})))

				
				const OWNER_VEHICLE_MAP = new Map(
					pendingPartnerVehicles.map((v)=>[String(v.owner),v.type])
				)

				console.log("OWNER_VEHICLE_MAP keys:", Array.from(OWNER_VEHICLE_MAP.keys()))

				const PendingPartners=pendingPartners.map((p)=>{
					const partnerIdStr = String(p._id);
					const vehicleType = OWNER_VEHICLE_MAP.get(partnerIdStr);
					console.log(`Partner ${p.name} (ID: ${partnerIdStr}) -> Vehicle type: ${vehicleType || 'NOT FOUND'}`);
					
					return {
						_id:p._id,
						name:p.name,
						email:p.email,
						vehicleType: vehicleType || "No vehicle found"
					}
				})

				return Response.json({
						stats,
						"pending_partner":PendingPartners
				},{status:200})

		} catch (e:unknown) {
				const errorMessage=  e instanceof Error ? e.message :"Server Error";
				return Response.json({
						errorMessage
				},{status:500})

		}
}
