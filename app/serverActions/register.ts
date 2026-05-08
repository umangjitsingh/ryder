"use server"
export interface RegisterState {
		success: boolean;
		message?: string;
		errors?: Record<string, string[]>
}

export async function doRegister(previousState: RegisterState, formData: FormData): Promise<RegisterState> {


		try {


			// Get form data and validate
			const name = formData.get("name");
			const email = formData.get("email");
			const password = formData.get("password");

			// Validate required fields
			if (!name || !email || !password) {
				return {
					success: false,
					message: "Please fill in all required fields"
				};
			}


			const url = new URL('/api/auth/register', 'http://localhost:3000');
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name,
					email,
					password
				})
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					success: false,
					message: errorData.message || "Registration failed"
				};
			}

			const data = await res.json();
			return {
				success: true,
				message: data.message || "Registration successful!"
			};
		} catch (e: unknown) {
			console.error("Registration error:", e);
			return {
					success: false,
					message: "Network error: Registration failed - please try again"
				};
		}

}