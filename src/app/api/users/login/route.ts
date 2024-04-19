import connectDB from "../../../../../connectDb/connectDB";
import { sendLoginEmail } from "@/helper/mailer";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	await connectDB();
	try {
		const reqBody = await req.json();
		console.log("Req body: ", reqBody);
		const { email, password } = reqBody;
		if (!email || !password) {
			return NextResponse.json({
				success: false,
				message: "Email and password is  required field",
				status: 400,
			});
		}
		const user = await User.findOne({ email });
		if (!user)
			return NextResponse.json({
				success: false,
				message: "User with this email is not registered!",
				status: 400,
			});

		const isValidPassword = await user.isCorrectPassword(password);

		if (!isValidPassword)
			return NextResponse.json({
				success: false,
				message: "Incorrect Password",
				status: 400,
			});

		interface JWTPayload {
			id: string;
			email: string;
			username: string;
		}

		const tokenData: JWTPayload = {
			id: user._id,
			email: user.email,
			username: user.username,
		};
		const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
			expiresIn: "1d",
		});

		const currUser = await User.findById(user._id).select("-password");

		const response = NextResponse.json({
			success: true,
			message: "user logged in successfully",
			data: currUser,
			status: 200,
		});

		interface CookieOptions {
			httpOnly: boolean;
			secure: boolean;
			sameSite: "lax" | "strict" | "none";
		}

		const options: CookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
		};

		response.cookies.set("token", token, options);
		// await sendLoginEmail(user.email); //todo we will enable it later
		return response;
	} catch (error) {
		console.log("Error in login: ", error);
		return NextResponse.json({
			success: false,
			message: "Error in log in",
			status: 500,
		});
	}
}
