import nodemailer from "nodemailer";

const transporter=nodemailer.createTransport({
		service:"gmail",
		auth:{
				user:process.env.RYDER_EMAIL_FROM_WHERE_YOU_SEND,
				pass:process.env.APP_PASSWORD_GOOGLE
		}
})

transporter.verify((err) => {
		if (err) {
				console.error("SMTP Error:", err);
		} else {
				console.log("SMTP Ready");
		}
});

export const sendMail =async(to:string,subject:string,html:string)=>{
		await transporter.sendMail({
				from:`"RYDER" <${process.env.RYDER_EMAIL_FROM_WHERE_YOU_SEND}>`,
				to,
				subject,
				html
		})
}


