import connectDB from "../../connectDb/connectDB";
import { NextRequest } from "next/server";
import { getSession } from "next-auth/react";

connectDB();

export const getDataFromToken = async (req: NextRequest) => {
	try {
		const session = await getSession();
		const userId = session?.user._id;
		return userId;
	} catch (error) {
		console.log("Error in getting token data");
		return;
	}
};
