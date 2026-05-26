import connectDb from "@/app/lib/db";
import {auth} from "@/app/auth";
import User from "@/app/models/user.model";
import Vehicle from "@/app/models/vehicle.model";

const REGEX_NUMBER_PLATE = /^[A-Z0-9][A-Z0-9\s-]{2,15}[A-Z0-9]$/i;
const REGEX_MODEL = /^[A-Za-z]+(?:[-\s][A-Za-z0-9]+)*\s(19[0-9]{2}|20[0-4][0-9]|2050)$/;

export async function POST(req: Request) {
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

				const {type, vehicleModel, vehicleNumber} = await req.json();

				if (!type || !vehicleModel || !vehicleNumber) {
						return Response.json({
								message: "missing required details"
						}, {
								status: 400
						})
				}
				if (!REGEX_MODEL.test(vehicleModel)) {
						return Response.json({message: "vehicle model is not correct"}, {status: 400})
				}
				
				if (!REGEX_NUMBER_PLATE.test(vehicleNumber)) {
						return Response.json({message: "vehicle number is not correct"}, {status: 400})
				}

				const duplicateNumber = await Vehicle.findOne({vehicleNumber: vehicleNumber});
				if (duplicateNumber) {
						return Response.json({message: "vehicle already registered !"}, {status: 400})
				}

				let vehicle = await Vehicle.findOne({owner: session.user?.id});
				if (vehicle) {
						vehicle.type = type;
						vehicle.vehicleNumber = vehicleNumber;
						vehicle.vehicleModel = vehicleModel;
						vehicle.status = "pending";

						await vehicle.save();
						return Response.json(vehicle, {
								status: 200
						})
				}
				vehicle = await Vehicle.create({
						type,
						vehicleModel,
						vehicleNumber,
						owner: user._id
				})

				if (user?.partnerOnboardingSteps < 1) {
						user.partnerOnboardingSteps = 1;
				}
				user.role = "partner";
				await user.save();

				return Response.json(vehicle, {
						status: 201
				})

		} catch (e) {
				console.error("Vehicle Registration API error:", e);
				const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred";
				return Response.json({message: errorMessage}, {status: 500})
		}
}

//API TO PRE FETCH DETAILS
export async function GET(req: Request) {
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

				const vehicle=await Vehicle.findOne({owner:user._id});
				if(vehicle){
						return Response.json(vehicle,{status:200})
				}else{
						return null
				}

		} catch (e) {
				const errorMessage = e instanceof Error ? e.message : "Failed to pre-fetch or GET vehicle";
				return Response.json({message: errorMessage}, {status: 500})
		}
}