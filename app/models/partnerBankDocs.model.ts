import mongoose from "mongoose";

interface IPartnerBankDocs {
		owner: mongoose.Types.ObjectId,
		accountHolder: string,
		accountNumber: string,
		ifsc: string,
		upi?: string,
		status: "not_added" | "added" | "verified",
		createdAt: Date,
		updatedAt: Date
}

const partnerBankDocsSchema = new mongoose.Schema<IPartnerBankDocs>({
		owner: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true
		},
		accountHolder:{
				type:String,
				required:true
		},
		accountNumber: {
				type:String,
				unique:true,
				required:true
		},
		ifsc: {
				type:String,
				required:true,
				uppercase:true
		},
		upi: String,

		status: {
				type: String,
				enum: ["not_added", "added", "verified"],
				default: "not_added"
		},

}, {timestamps: true})

const PartnerBankDocs = mongoose.models.PartnerBankDocs || mongoose.model("PartnerBankDocs", partnerBankDocsSchema);
export default PartnerBankDocs;