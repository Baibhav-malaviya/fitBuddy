import connectDB from "@/connectDb/connectDB";
import Workout from "@/models/workout.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		const { date, exercises } = reqBody;
		if (!exercises)
			return NextResponse.json({
				success: false,
				message: "Exercises is required but not found",
				status: 400,
			});
		// const userId = it will come from a function in the helper directory which takes req as input and extract the token from cookies and verify the token data from jwt
		const createdWorkout = await Workout.create({ exercises }); //we have to pass userId, date is set default of current date
		return NextResponse.json({
			success: true,
			message: "Work out added successfully",
			status: 200,
			data: createdWorkout,
		});
	} catch (error) {
		console.log("Error in workout POST");
		return NextResponse.json({
			success: false,
			message: "Error in workout POST",
			status: 500,
		});
	}
}
