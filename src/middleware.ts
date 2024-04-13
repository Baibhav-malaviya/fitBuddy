import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const publicPath = path === "/login" || path === "/signup"; //! we have to add more for forget password etc...

	const token = req.cookies.get("token")?.value;

	if (token && publicPath) return NextResponse.redirect(new URL("/", req.url));

	if (!token && !publicPath)
		return NextResponse.redirect(new URL("/login", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/",
		"/login",
		"/signup",
		"/dashboard",
		"/progress",
		"/workouts",
		"/nutrition",
		"/community",
	],
};
