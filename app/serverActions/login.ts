"use server"
import {signIn} from "@/app/auth";

export interface LoginState {
		success: boolean;
		message?: string;
		errors?: Record<string, string[]>
}

export async function doLogin(prevState:LoginState,formData:FormData):Promise<LoginState>{
		try{
				const email = formData.get("email");
				const password = formData.get("password");

				// Validate required fields
				if ( !email || !password) {
						return {
								success: false,
								message: "Please fill in all required fields"
						};
				}

				await signIn('credentials',{
						email,
						password,
						redirectTo: "/",
						redirect: false
				});

				return {
						success: true,
						message: "Login successful"
				};

		}catch (e: unknown) {
				console.log(e)
				// NextAuth throws AuthError on failure
				const error = e as { type?: string };
				return {
						success: false,
						message: error.type === "CredentialsSignin" ? "Invalid email or password" : "An error occurred during login"
				};
		}
}