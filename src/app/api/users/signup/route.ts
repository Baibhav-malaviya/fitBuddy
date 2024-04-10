import connectDB from "@/connectDB/connectDB";
import sendEmail from "@/helper/mailer";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const reqBody = await req.json();
		const { name, email, password } = reqBody;
		console.log("requested body: ", reqBody);

		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json({
				success: false,
				message: "User already exist",
				status: 400,
			});
		}

		const newUser = new User({ name, email, password }).select("-password");

		const savedUser = await newUser.save();
		console.log(savedUser);

		//! html to send the email
		const html = ` <!DOCTYPE html>
		<html>
		  <head>
			<meta charset="UTF-8" />
			<title>Complete Your Profile</title>
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
			  a {
				color: #007bff;
				text-decoration: none;
			  }
			</style>
		  </head>
		  <body>
			<div class="container">
			  <h1>Welcome to fitBuddy!</h1>
			  <p>
				Thank you for registering. To complete your registration, please fill
				out your profile details in the "profile" section.
			  </p>
			  <p>
				Once your profile is complete, we'll send a verification email to the
				email address associated with your account. Please verify your email to
				unlock all features.
			  </p>
			  <p>Need help? Contact our support team.</p>
			  <p>Best regards,<br />fitBuddy Team</p>
			</div>
		  </body>
		</html>`;

		// send mail for the verification
		await sendEmail(
			email,
			"Complete Your Profile",
			"Please complete your profile details",
			html
		);

		return NextResponse.json({
			success: true,
			message: "User registered successfully",
			status: 200,
			data: newUser,
		});
	} catch (error) {
		console.log("Error in user registration.", error);
		return NextResponse.json({
			success: false,
			message: "Error in registering the user",
			status: 500,
		});
	}
}
