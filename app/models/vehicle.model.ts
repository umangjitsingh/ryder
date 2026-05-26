import mongoose from "mongoose";

type vehicleType="bike" |"car" | "truck"| "drone" | "auto"



interface IVehicle{
		owner:mongoose.Types.ObjectId,
		type:vehicleType,
		vehicleModel:string,
		vehicleNumber:string,
		imageUrl?:string,
		baseFare?:number,
		pricePerKM?:number,
		waitingCharge?:number,
		status:"approved" | "pending" | "rejected",
		rejectionReason:string,
		isActive:boolean,
		createdAt:Date,
		updatedAt:Date
}

const vehicleSchema=new mongoose.Schema<IVehicle>({
		owner:{
				type:mongoose.Schema.Types.ObjectId,
				required:true,
				ref:"User"
		},
		type:{
				type:String,
				required:true,
				enum:["bike","car","truck","drone","auto"]
		},
		vehicleModel:{
				type:String,
				required:true,
				uppercase:true
		},
		vehicleNumber:{
				type:String,
				required:true,
				unique:true,
				uppercase:true
		},
		imageUrl:{type:String},
		baseFare:{type:Number},
		pricePerKM:{type:Number},
		waitingCharge:{type:Number},
		status:{
				type:String,
				enum:["approved","pending","rejected"],
				default:"pending"
		},
		rejectionReason:{
				type:String
		},
		isActive:{
				type:Boolean,
				default:false
		}
},{timestamps:true});

const Vehicle=mongoose.models.Vehicle || mongoose.model("Vehicle",vehicleSchema);
export default Vehicle;