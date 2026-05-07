
declare module "next-auth" {
		interface User {
				id: string;
				role: string;
				email: string;
		}

		interface Session {
				user: {
						id: string;
						role: string;
						email: string;
						name?: string | null;
				};
		}
}

declare module "next-auth/jwt" {
		interface JWT {
				id: string;
				role: string;
				email: string;
				name?: string | null;
		}
}

export {}