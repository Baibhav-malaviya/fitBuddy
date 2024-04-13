"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const response = await axios.post("/api/users/login", {
				email,
				password,
			});

			if (response.data.success === false) {
				throw new Error(response.data.message);
			}
			setIsLoading(false);
			toast({
				title: "Logged in successfully",
				description: "Navigating to '/' route ...",
			});
			router.push("/");
		} catch (error: any) {
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

	return (
		<div className="flex justify-center items-center min-h-screen bg-background text-foreground">
			<div className="bg-background dark:border-[1.5px] border-dark-text  rounded-lg shadow-md p-8 max-w-md w-full">
				<h2 className="text-2xl font-bold mb-6 t">Login to FitTracker</h2>

				<form onSubmit={handleSubmit}>
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
						<div className=" bg-destructive py-1 text-destructive-foreground mb-6 px-2 text-xs">
							{<p> **{error}</p>}
						</div>
					)}

					<Button type="submit" disabled={isLoading}>
						{isLoading ? " ... " : "Login"}
					</Button>
				</form>

				<p className="mt-4 text-center">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-light-primary dark:text-dark-primary hover:underline"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
