"use client";
import React, { useEffect, useState } from "react";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { delay } from "@/utils/helpers";
interface IEmail {
	email: string;
}

export default function OtpForm({ email }: IEmail) {
	const [value, setValue] = useState<string>("");
	const [isCallComplete, setIsCallComplete] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState(false);
	const [resendingEmail, setResendingEmail] = useState<boolean>(false);
	const { toast } = useToast();
	const router = useRouter();
	const [error, setError] = useState("");

	// if (isCallComplete) {
	// 	delay(5000, () => {
	// 		setIsCallComplete(true);
	// 	});
	// }

	const handleResendButton = () => {
		delay(10000, () => {
			setIsCallComplete(true);
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (value.length < 6) throw new Error("Please Enter 6 digit otp");
			const response = await axios.post("/api/users/signup", {
				email,
				emailVerificationCode: value,
			});
			if (response.data.success === false) {
				throw new Error(response.data.message);
			}
			setIsLoading(false);
			toast({
				title: "Registered successfully",
				description: "Navigating to '/login' route ...",
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
			setIsLoading(false);
			setError(errorMessage);
		}
	};

	const resendOTP = async () => {
		try {
			setResendingEmail(true);
			setError("");
			const response = await axios.post("/api/users/resendOtp", {
				email,
			});
			setValue("");

			console.log("Response: ", response);
			if (response.data.success === false) {
				throw new Error(response.data.message);
			}
			setResendingEmail(false);
			setIsCallComplete(false);
			handleResendButton();
			toast({
				title: "OTP sent successfully!",
				description: "You can resend in 10 seconds again.",
			});
		} catch (error: any) {
			let errorMessage;
			console.log("Error in wrong otp: ", error);
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
			setIsLoading(false);
			setError(errorMessage);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Enter the OTP</h2>
				<p className="text-sm text-muted-foreground">
					We&apos;ve sent a 6-digit OTP to your email:{" "}
					<span className="font-bold ">{email}</span>
				</p>
				<InputOTP
					maxLength={6}
					value={value}
					onChange={(value) => setValue(value)}
					className="mx-auto"
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				{error !== "" && (
					<div className="bg-destructive py-1 text-destructive-foreground mb-6 px-2 text-xs">
						<p>**{error}</p>
					</div>
				)}

				<div>
					<Button
						type="submit"
						disabled={isLoading}
						className={`${isLoading ? "cursor-not-allowed" : ""}`}
					>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<span className="mr-2 animate-spin">&#8635;</span>
								Verifying...
							</div>
						) : (
							"Verify"
						)}
					</Button>
				</div>

				{isCallComplete ? (
					<p className="text-sm text-muted-foreground">
						Didn&apos;t receive the OTP?{" "}
						<Button
							variant="link"
							type="button"
							onClick={resendOTP}
							disabled={resendingEmail}
							className={`${
								resendingEmail && "scale-90 opacity-90 cursor-wait"
							}`}
						>
							{resendingEmail ? `Resending` : "Resend OTP"}
						</Button>
					</p>
				) : (
					<div className="flex  justify-start items-baseline space-x-1">
						<FiCheckCircle className="text-green-400 mr-1" />
						<span>Otp sent</span>
					</div>
				)}
			</form>
		</div>
	);
}
