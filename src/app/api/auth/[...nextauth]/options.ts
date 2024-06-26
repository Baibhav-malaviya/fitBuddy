import connectDB from "../../../../../connectDb/connectDB";
import User from "@/models/user.model";
import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			console.log("User in the callbacks: ", user);
			if (user) {
				token._id = user._id?.toString() || user.id;
				token.email = user.email;
				token.isVerified = user.isVerified || true;
				token.name = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id as string | undefined;
				session.user.isVerified = token.isVerified as boolean | undefined;
				session.user.name = token.name as string | undefined;
				session.user.email = token.email as string | undefined;
			}
			return session;
		},
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
	secret: process.env.NEXTAUTH_SECRET,
};

export default options;
