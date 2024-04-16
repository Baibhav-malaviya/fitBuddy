"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { Button } from "@/components/ui/button";
import PopupModal from "@/components/PopupModal";
import OtpForm from "@/components/OtpForm";

const SignupPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post("/api/users/signup", {
				name,
				email,
				password,
			});
			if (response.data.success === false) {
				throw new Error(response.data.message);
			}
			setIsLoading(false);
			setIsOpen(true);
			console.log("response: ", response);
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

	return (
		<div className="flex justify-center items-center min-h-screen  bg-background text-foreground">
			<div className="bg-background dark:border-[1.5px] border-dark-text  rounded-lg shadow-md p-8 max-w-md w-full">
				<h2 className="text-2xl font-bold mb-6 bg-background text-foreground">
					Sign up for FitTracker
				</h2>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="name" className="block  font-bold mb-2">
							Name
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaUser className="text-gray-500 dark:text-gray-400" />
							</div>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-background dark:bg-gray-800 dark:text-white dark:border-gray-600 pl-10"
								placeholder="Enter your name"
								required
							/>
						</div>
					</div>

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
								onChange={(e) => setEmail(e.target.value)}
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
								onChange={(e) => setPassword(e.target.value)}
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

					<Button type="submit">{isLoading ? " ... " : "Sign up"}</Button>
				</form>

				<p className="mt-4 text-center">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-light-primary dark:text-dark-primary hover:underline"
					>
						Login
					</Link>
				</p>
			</div>
			{/* //todo here we have to do "PopupModal" */}
			<PopupModal
				isOpen={isOpen}
				setIsOpen={setIsLoading}
				content={<OtpForm email={email} />}
			/>
		</div>
	);
};

export default SignupPage;
