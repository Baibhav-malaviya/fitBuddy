import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import connectDB from "@/connectDB/connectDB";

export const authOption: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				await connectDB();
				// Add logic here to look up the user from the credentials supplied
				try {
					const user = await User.findOne({
						email: credentials?.email,
					});
					if (!user) {
						throw new Error("user not found with this email");
					}

					const isCorrectPassword = await user.isCorrectPassword(
						credentials?.password
					);

					if (isCorrectPassword) {
						return user;
					} else {
						throw new Error("Invalid password");
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
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
