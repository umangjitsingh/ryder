import mongoose from "mongoose";

interface IPartnerDocs {
		owner: mongoose.Types.ObjectId,
		aadhaarUrl: string,
		rcUrl: string,
		licenseUrl: string,
		status: "approved" | "pending" | "rejected",
		rejectionReason?: string,
		createdAt: Date,
		updatedAt: Date
}

const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>({
		owner: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true
		},
		aadhaarUrl: {
				type: String,
				required: true,
				unique: true
		},
		rcUrl:{
				type: String,
				required: true,
				unique: true
		},
		licenseUrl:{
				type: String,
				required: true,
				unique: true
		}
		,
		status: {
				type: String,
				enum: ["approved", "pending", "rejected"],
				default: "pending"
		},
		rejectionReason: {
				type: String
		}
}, {timestamps: true})

const PartnerDocs = mongoose.models.PartnerDocs || mongoose.model("PartnerDocs", partnerDocsSchema);
export default PartnerDocs;