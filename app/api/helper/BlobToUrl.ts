
import uploadImageOnCloudinary from "@/app/lib/cloudinary";

async function handleUpload(field: string, file: Blob, ) {
		if (!file) return;

		const url = await uploadImageOnCloudinary(file);
		if (!url) {
				throw new Error(`failed to upload ${field} images`);
		}

	return url;
}
export default handleUpload