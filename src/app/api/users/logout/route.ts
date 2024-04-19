import connectDB from "../../../../connectDB/connectDB";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	await connectDB();
	const userId = getDataFromToken(req);
	console.log("userId: ", userId);
	try {
		if (!userId)
			return NextResponse.json({
				success: false,
				message: "User in not logged in",
				status: 400,
			});
		const response = NextResponse.json({
			success: true,
			message: "User logged out successfully",
			status: 200,
		});

		interface CookieOptions {
			httpOnly: boolean;
			secure: boolean;
			sameSite: "lax" | "strict" | "none";
			name: string; // Add the name property
		}

		const options: CookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			name: "token", // Provide the cookie name
		};

		response.cookies.delete("token");

		return response;
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: "Error in logout",
			status: 500,
		});
	}
}
