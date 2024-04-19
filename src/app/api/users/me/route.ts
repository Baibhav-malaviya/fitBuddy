import connectDB from "../../../../connectDB/connectDB";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	await connectDB();
	const userId = getDataFromToken(req);
	const user = await User.findById(userId).select("-password");

	return NextResponse.json({
		success: true,
		message: "User info fetched successfully",
		data: user,
		status: 200,
	});
}
