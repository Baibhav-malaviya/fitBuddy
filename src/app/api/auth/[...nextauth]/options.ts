import connectDB from "@/connectDB/connectDB";
import User from "@/models/user.model";
import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialProvider({
			type: "credentials",

			credentials: {
				user: {
					label: "username",
					type: "text",
					placeholder: "your-cool-usrname",
				},
				password: { label: "password", type: "text", placeholder: "password" },
			},
			async authorize(credentials: any) {
				await connectDB();
				try {
					const { email, password } = credentials;
					console.log("EMAIL AND PASSWORD: ", email, " - ", password);
					const user = await User.findOne({ email });
					if (!user || !user.isEmailVerified) {
						throw new Error("No user found with this email");
					}
					const isCorrectPassword = await user.isCorrectPassword(password);

					if (isCorrectPassword) {
						return user;
					} else {
						throw new Error("Incorrect password");
					}
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
};

export default options;
