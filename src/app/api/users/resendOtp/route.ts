import connectDB from "@/connectDB/connectDB";
import sendEmail from "@/helper/mailer";
import { NextRequest, NextResponse } from "next/server";
import { generateVerificationCode } from "../signup/route";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
	await connectDB();
	try {
		const reqBody = await req.json();
		const { email } = reqBody;
		if (!email)
			return NextResponse.json(
				{
					success: false,
					message: "email is not required",
				},
				{ status: 400 }
			);

		const verificationCode = generateVerificationCode();
		// saving verification code to database
		const user = await User.findOne({ email });
		user.emailVerificationCode = verificationCode;
		user.emailVerificationCodeExpires = Date.now() + 15 * 60 * 1000;
		await user.save();
		// html for verification email
		const html = `<!DOCTYPE html>
			<html>
			<head>
			  <meta charset="UTF-8" />
			  <title>Verify Your Email</title>
			  <style>
				body {
				  font-family: Arial, sans-serif;
				  background-color: #f5f5f5;
				  padding: 20px;
				}
				.container {
				  max-width: 600px;
				  margin: 0 auto;
				  background-color: #ffffff;
				  padding: 20px;
				  border-radius: 5px;
				  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
				h1 {
				  color: #333333;
				  text-align: center;
				}
				p {
				  color: #666666;
				  line-height: 1.5;
				}
				.otp-code {
				  font-size: 24px;
				  font-weight: bold;
				  color: #007bff;
				  text-align: center;
				  margin: 20px 0;
				}
				a {
				  color: #007bff;
				  text-decoration: none;
				}
			  </style>
			</head>
			<body>
			  <div class="container">
				<h1>Verify Your Email</h1>
				<p>Thank you for registering with fitBuddy! To complete your registration, please verify your email address by entering the following OTP (One-Time Password):</p>
                <p>This is resend OTP: </P>
				<div class="otp-code">${verificationCode}</div>
				<p>This otp is valid for only 15 minutes</p>
				<p>If you did not initiate this registration, please ignore this email.</p>
				<p>Need help? Contact our support team.</p>
				<p>Best regards,<br />fitBuddy Team</p>
			  </div>
			</body>
			</html>`;
		// verification email
		await sendEmail(
			email,
			"VERIFICATION OTP",
			"resend otp for verification to the fitBuddy",
			html
		);

		return NextResponse.json(
			{
				success: true,
				message: "Otp sent successfully",
			},
			{ status: 500 }
		);
	} catch (error) {
		console.log("Error in resend otp route");
		return NextResponse.json(
			{
				success: false,
				message: "Error in resend otp route",
			},
			{ status: 500 }
		);
	}
}
