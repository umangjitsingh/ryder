import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "@/app/lib/db";
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import Google from "next-auth/providers/google"

export const {handlers, signIn, signOut, auth} = NextAuth({
		providers: [
				Credentials({
						credentials: {
								email: {
										type: "email",
										label: "Email",
										placeholder: "ryder@gmail.com",
								},
								password: {
										type: "password",
										label: "Password",
										placeholder: "*****",
								},
						},
						authorize: async (credentials) => {

								if (!credentials.email || !credentials.password) {
										throw new Error("missing credentials.")
								}

								await connectDb();

								const user = await User.findOne({email: credentials?.email})
								if (!user) {
										throw new Error("user not found")
								}

								const verifyPassword = await bcryptjs.compare(credentials?.password as string, user.password);
								if (!verifyPassword) {
										throw new Error("incorrect credentials")
								}

								return {
										id: user._id,
										name: user.name,
										email: user.email,
										role: user.role
								}
						},
				}),
				Google({
						clientId: process.env.GOOGLE_CLIENT_ID,
						clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				})
		],

		callbacks: {

				async signIn({ user, account }) {
						if (account?.provider === "google") {
								await connectDb();

								const alreadyPresentUser= await User.findOne({email:user.email});
								if(!alreadyPresentUser){
										await User.create({
												name:user?.name,
												email:user?.email
										})
								}
								user.id=alreadyPresentUser?._id;
								user.role=alreadyPresentUser.role;
						}
						return true
				},


				async jwt({token, user}) {
						if (user) {
								token.id = user.id as string;
								token.role = user.role as string;
								token.email = user.email as string;
								token.name = user.name;
						}
						return token;
				},

				async session({session, token}) {
						if (session.user) {
								session.user.id = token.id as string;
								session.user.role = token.role as string;
								session.user.email = token.email as string;
						}
						return session;
				}
		},

		pages: {
				signIn: '/auth/signin',
				signOut: '/auth/signout',
				error: '/auth/error',
		},

		session: {
				strategy: "jwt",
				maxAge: 10 * 24 * 60 * 60
		},

		secret: process.env.AUTH_SECRET
})