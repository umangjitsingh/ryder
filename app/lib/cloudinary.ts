import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
});

// 		blob is like regular file like .jpeg  image/jpg or image/png
// 		[91,89,09,07,99,13,06 ............] this is ArrayBuffer ----> now we need to Convert to BUFFER(chunks byte by byte) like -----> 91 then 89  then 07 so on.

const uploadImageOnCloudinary = async (blobFile: Blob): Promise<string | null> => {
		if (!blobFile) {
				return null
		}
		try {
				const arrayBuffer = await blobFile.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);

				return new Promise((resolve, reject) => {
						cloudinary.uploader.upload_stream({
								resource_type: "auto"
						}, (error, uploadResult) => {
								if (error) {
										reject(error)
								} else {
										resolve(uploadResult?.secure_url || null)
								}
						}).end(buffer)
				})

		} catch (e) {
				console.log(e);
				return null
		}
}

export default uploadImageOnCloudinary;