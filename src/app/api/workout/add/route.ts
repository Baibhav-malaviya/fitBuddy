import connectDB from "@/connectDB/connectDB";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Workout from "@/models/workout.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		const { exercises } = reqBody;

		if (!exercises)
			return NextResponse.json({
				success: false,
				message: "Exercises is required but not found",
				status: 400,
			});

		const userId = getDataFromToken(req);
		if (!userId)
			return NextResponse.json({
				success: false,
				message: "userId is required but not found",
				status: 400,
			});
		console.log("userId: ", userId);
		console.log("Exercises: ", exercises);

		const newWorkout = new Workout({ userId, exercises }); //! date is set default of current date
		const createdWorkout = await newWorkout.save();
		return NextResponse.json({
			success: true,
			message: "Work out added successfully",
			status: 200,
			data: createdWorkout,
		});
	} catch (error) {
		console.log("Error in workout POST: ", error);
		return NextResponse.json({
			success: false,
			message: "Error in workout POST",
			status: 500,
		});
	}
}
