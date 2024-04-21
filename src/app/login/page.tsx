"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	//! login with credential handler / form submit handler
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			setIsLoading(true);

			const response = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (response?.status !== 200) {
				throw new Error(response?.error!);
			}

			setIsLoading(false);
			toast({
				title: "Logged in with credentials, successfully",
				description: "Navigating to '/' route ...",
			});
			router.push("/");
		} catch (error: any) {
			setIsLoading(false);
			let errorMessage;
			if (error.response) {
				// Server responded with an error status code (e.g., 404, 500)
				errorMessage = `Server Error: ${error.response.status}`;
			} else if (error.request) {
				// Request was made but no response received
				errorMessage = "No response from server";
			} else {
				// Something else happened while setting up the request
				errorMessage = `${error.message}`;
			}
			setError(errorMessage);
		}
	};

	//! login with google handler
	const handleGoogleSignIn = async () => {
		try {
			const response = await signIn("google", {
				redirect: false,
				callbackUrl: "/",
			});

			if (response?.error) {
				throw new Error(response.error);
			}

			setIsLoading(false);
			toast({
				title: "Logged in with Google, successfully",
				description: "Navigating to '/' route ...",
			});
		} catch (error) {
			let errorMessage;
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = "An error occurred during sign-in";
			}
			setError(errorMessage);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-background text-foreground">
			<div className="bg-background dark:border-[1.5px] border-dark-text  rounded-lg shadow-md p-8 max-w-md w-full">
				<h2 className="text-2xl font-bold mb-6 t">Login to FitTracker</h2>

				<form onSubmit={handleSubmit}>
					{/** //!Email input field */}
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
						>
							Email
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaEnvelope className="text-gray-500 dark:text-gray-400" />
							</div>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => {
									setError("");
									setEmail(e.target.value);
								}}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white dark:border-gray-600 pl-10"
								placeholder="Enter your email"
								required
							/>
						</div>
					</div>

					{/* //!Password input field */}
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
						>
							Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaLock className="text-gray-500 dark:text-gray-400" />
							</div>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => {
									setError("");
									setPassword(e.target.value);
								}}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white dark:border-gray-600 pl-10"
								placeholder="Enter your password"
								required
							/>
						</div>
					</div>

					{error !== "" && (
						<div className="py-1 text-destructive mb-6 px-2 text-xs">
							{<p> **{error}</p>}
						</div>
					)}

					{/* //! Credential login Submit button */}
					<div className="">
						<Button
							type="submit"
							disabled={isLoading}
							className={`${isLoading ? "cursor-not-allowed" : ""} w-full`}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<span className="mr-2 animate-spin">&#8635;</span>
									Logging
								</div>
							) : (
								"Login"
							)}
						</Button>
					</div>
				</form>

				{/* //!Google login */}
				<div className="w-ful mt-6">
					<Button
						variant={"outline"}
						onClick={handleGoogleSignIn}
						className="w-full py-4"
					>
						<div className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.28H12v4.51h6.36c-.27 1.45-1.09 2.68-2.32 3.5v2.9h3.76c2.2-2.03 3.47-5.02 3.47-8.63z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c3.26 0 5.97-1.07 7.97-2.9l-3.76-2.9c-1.04.7-2.38 1.11-3.97 1.11-3.07 0-5.68-2.06-6.6-4.83H1.98v3.03C3.64 20.48 7.51 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.4 13.58c-.16-.47-.25-.97-.25-1.48 0-.51.09-1.01.25-1.48V7.59H1.98C1.38 8.9 1.03 10.39 1.03 12s.35 3.1.95 4.42l3.42-2.84z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.64 0 3.08.57 4.23 1.68l3.18-3.15C17.46 2.08 14.96 1 12 1 7.51 1 3.64 3.52 1.98 7.59l3.42 2.84c.92-2.77 3.53-4.83 6.6-4.83z"
									fill="#EA4335"
								/>
							</svg>
							Sign in with Google
						</div>
					</Button>
				</div>

				<p className="mt-4 text-center">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-foreground font-semibold hover:underline"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
