import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function getCurrentUserId(req: NextRequest) {
	const session = await getServerSession(options);

	console.log("SESSION IN THE getCurrentUserId: ", session);

	if (!session || !session.user) {
		return null;
	}
	return session.user._id;
}
