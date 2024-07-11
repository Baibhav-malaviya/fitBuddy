import { getSession } from "next-auth/react";

export const getCurrentUserId = async () => {
	try {
		const session = await getSession();
		console.log("session in getCurrentUserId: ", session);
		if (session && session.user && session.user._id) {
			return session.user._id;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error getting current user ID:", error);
		return null;
	}
};
