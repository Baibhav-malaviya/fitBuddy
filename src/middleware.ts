import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSession } from "next-auth/react";
export { default } from "next-auth/middleware";

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
// 	const path = req.nextUrl.pathname;
// 	const publicPath = path === "/login" || path === "/signup"; //! we have to add more for forget password etc...

// 	const { data: session } = useSession();
// 	// const token = req.cookies.get("token")?.value;
// 	console.log("SESSTION IN THE MIDDLEWARE: ", session);

// 	if (session && publicPath)
// 		return NextResponse.redirect(new URL("/", req.url));

// 	if (!session && !publicPath)
// 		return NextResponse.redirect(new URL("/login", req.url));
// }

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/",
		// "/login",
		// "/signup",
		"/setgoal",
		"/dashboard",
		"/progress",
		"/workouts",
		"/nutrition",
		"/community",
	],
};
