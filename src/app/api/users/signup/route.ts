import connectDB from "@/connectDB/connectDB";
import sendEmail from "@/helper/mailer";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export function generateVerificationCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
	await connectDB();

	try {
		const reqBody = await req.json();
		const { email } = reqBody;

		if (!email)
			return NextResponse.json(
				{
					success: false,
					message: "Email not found, it is a required credential",
				},
				{ status: 400 }
			);

		const user = await User.findOne({ email });
		if (user) {
			if (!user.isEmailVerified) {
				const { emailVerificationCode } = reqBody;

				if (!emailVerificationCode) {
					//todo here again send the email verification code

					const verificationCode = generateVerificationCode();

					user.emailVerificationCode = verificationCode;
					user.emailVerificationCodeExpires = Date.now() + 15 * 60 * 1000;
					user.password = reqBody.password;
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
				<div class="otp-code">${verificationCode}</div>
				<p>This otp is valid for only 15 minutes</p>
				<p>If you did not initiate this registration, please ignore this email.</p>
				<p>Need help? Contact our support team.</p>
				<p>Best regards,<br />fitBuddy Team</p>
			  </div>
			</body>
			</html>`;

					// send mail for the verification
					await sendEmail(
						email,
						"Verify your email",
						"Please verify your email by entering this verificationCode ",
						html
					);

					return NextResponse.json(
						{
							success: true,
							message: "Email sent to the success fully",
						},
						{ status: 200 }
					);
				}

				if (
					emailVerificationCode === user.emailVerificationCode &&
					user.emailVerificationCodeExpires >= Date.now()
				) {
					//! for the successful verification of  emailVerificationCode
					user.isEmailVerified = true;
					user.emailVerificationCode = undefined;
					user.emailVerificationCodeExpires = undefined;
					const emailVerifiedUser = await user.save();
					// html for verification email
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
					// verification email
					await sendEmail(
						email,
						"Email verification successful",
						"Please fill-up your detail for better experience",
						html
					);

					return NextResponse.json(
						{
							success: true,
							message: "User email verification successfully ",
							data: emailVerifiedUser,
						},
						{ status: 200 }
					);
				} else if (emailVerificationCode !== user.emailVerificationCode) {
					//! wrong emailVerificationCode so just return
					return NextResponse.json(
						{
							success: false,
							message: "You have entered wrong verification code",
						},
						{ status: 400 }
					);
				}
			} else if (user.isEmailVerified) {
				//! email exist in database and email is verified too
				return NextResponse.json(
					{
						success: false,
						message: "This email is registered and verified",
					},
					{ status: 400 }
				);
			}
		} else {
			//! FOR THE NEW USER IF USER DOESN'T EXIST

			const verificationCode = generateVerificationCode();

			const { name, password } = reqBody;
			if (!name || !password)
				return NextResponse.json(
					{
						success: false,
						message: "name and password is required",
					},
					{ status: 400 }
				);

			const newUser = new User({
				name,
				email,
				password,
				emailVerificationCode: verificationCode,
				emailVerificationCodeExpires: Date.now() + 15 * 60 * 1000,
			});

			const savedUser = await newUser.save();
			console.log(savedUser);

			//! html to send the email

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
				<div class="otp-code">${verificationCode}</div>
				<p>This otp is valid for only 15 minutes</p>
				<p>If you did not initiate this registration, please ignore this email.</p>
				<p>Need help? Contact our support team.</p>
				<p>Best regards,<br />fitBuddy Team</p>
			  </div>
			</body>
			</html>`;

			// send mail for the verification
			await sendEmail(
				email,
				"Verify your email",
				"Please verify your email by entering this verificationCode ",
				html
			);

			return NextResponse.json({
				success: true,
				message: "sent verification code successfully",
				status: 200,
				data: newUser,
			});
		}
	} catch (error) {
		console.error("Error:", error);
		return new Response("An error occurred", { status: 500 });
	}
}

// export async function POST(req: NextRequest, res: NextResponse) {
// 	try {
// 		const reqBody = await req.json();
// 		const { name, email, password } = reqBody;
// 		console.log("requested body: ", reqBody);

// 		const user = await User.findOne({ email });

// 		if (user) {
// 			return NextResponse.json({
// 				success: false,
// 				message: "User already exist",
// 				status: 400,
// 			});
// 		}

// 		const newUser = new User({ name, email, password }).select("-password");

// 		const savedUser = await newUser.save();
// 		console.log(savedUser);

// 		//! html to send the email
// 		const html = ` <!DOCTYPE html>
// 		<html>
// 		  <head>
// 			<meta charset="UTF-8" />
// 			<title>Complete Your Profile</title>
// 			<style>
// 			  body {
// 				font-family: Arial, sans-serif;
// 				background-color: #f5f5f5;
// 				padding: 20px;
// 			  }
// 			  .container {
// 				max-width: 600px;
// 				margin: 0 auto;
// 				background-color: #ffffff;
// 				padding: 20px;
// 				border-radius: 5px;
// 				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// 			  }
// 			  h1 {
// 				color: #333333;
// 				text-align: center;
// 			  }
// 			  p {
// 				color: #666666;
// 				line-height: 1.5;
// 			  }
// 			  a {
// 				color: #007bff;
// 				text-decoration: none;
// 			  }
// 			</style>
// 		  </head>
// 		  <body>
// 			<div class="container">
// 			  <h1>Welcome to fitBuddy!</h1>
// 			  <p>
// 				Thank you for registering. To complete your registration, please fill
// 				out your profile details in the "profile" section.
// 			  </p>
// 			  <p>
// 				Once your profile is complete, we'll send a verification email to the
// 				email address associated with your account. Please verify your email to
// 				unlock all features.
// 			  </p>
// 			  <p>Need help? Contact our support team.</p>
// 			  <p>Best regards,<br />fitBuddy Team</p>
// 			</div>
// 		  </body>
// 		</html>`;

// 		// send mail for the verification
// 		await sendEmail(
// 			email,
// 			"Complete Your Profile",
// 			"Please complete your profile details",
// 			html
// 		);

// 		return NextResponse.json({
// 			success: true,
// 			message: "User registered successfully",
// 			status: 200,
// 			data: newUser,
// 		});
// 	} catch (error) {
// 		console.log("Error in user registration.", error);
// 		return NextResponse.json({
// 			success: false,
// 			message: "Error in registering the user",
// 			status: 500,
// 		});
// 	}
// }
