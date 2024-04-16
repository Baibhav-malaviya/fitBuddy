"use client";
import React, { useState } from "react";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
interface IEmail {
	email: string;
}

export default function OtpForm({ email }: IEmail) {
	const [value, setValue] = useState<string>("");

	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const [error, setError] = useState("");
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post("/api/users/signup", {
				email,
				emailVerificationCode: value,
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
		} catch (error) {
			console.log("Error in otp sending");
			setIsLoading(false);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<InputOTP
					maxLength={6}
					value={value}
					onChange={(value) => setValue(value)}
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
					<div className=" bg-destructive py-1 text-destructive-foreground mb-6 px-2 text-xs">
						{<p> **{error}</p>}
					</div>
				)}
				<Button
					type="submit"
					disabled={isLoading}
					className={`${isLoading ? "cursor-not-allowed" : ""}`}
				>
					{isLoading ? " ... " : "Login"}
				</Button>
			</form>
		</div>
	);
}
