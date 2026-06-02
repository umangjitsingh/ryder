import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
		name: string;
		email: string;
		password?: string;
		role?:"user" | "partner" | "admin";
		isEmailVerified?:boolean;
		mobileNumber?:string;
		otp?:string;
		otpExpiresAt?:Date;
		partnerOnboardingSteps:number;
		partnerStatus?:"pending" | "approved" | "rejected"
}

const userSchema = new mongoose.Schema<IUser>({
		name: {
				type: String,
				minLength: 4,
				maxLength: 40,
				required:true
		},
		email: {
				type: String,
				required: true,
				unique:true
		},
		password:{
				type:String,
		},
		role:{
				type:String,
				enum:["user","partner","admin"],
				default:"user"
		},
		isEmailVerified:{
				type:Boolean,
				default:false
		},
		otp:{
				type:String
		},
		mobileNumber:String,
		otpExpiresAt:{
				type:Date
		},
		partnerOnboardingSteps:{
				type:Number,
				min:0,
				max:8,
				default:0
		},
		partnerStatus:{
				type:String,
				enum:["pending","approved","rejected"],
				default:"pending"
		},

}, {timestamps: true});

const User =mongoose.models.User || mongoose.model("User",userSchema);
export default User;