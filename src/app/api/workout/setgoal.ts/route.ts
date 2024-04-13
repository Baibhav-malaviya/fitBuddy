import connectDB from "@/connectDB/connectDB";
// import Goal, { IGoal } from "../models/Goal.model";
import Goal, { IGoal } from "@/models/goal.model";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const reqBody = await req.json();
	const { goalType, targetValue, additionalDetails, targetDate } = reqBody;
	const userId = getDataFromToken(req);

	try {
		await connectDB();

		const existingGoal = await Goal.findOne({ userId, status: "active" });

		if (existingGoal) {
			return NextResponse.json({
				success: false,
				message:
					"You already have an active goal. Please complete or delete it before setting a new one.",
			});
		}

		const newGoal: IGoal = new Goal({
			userId,
			goalType,
			targetValue,
			additionalDetails,
			targetDate,
		});

		const savedGoal = await newGoal.save();

		return NextResponse.json({
			success: true,
			message: "Your have set your new goal successfully!",
			data: savedGoal,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Something went wrong" });
	}
}

export async function GET(req: NextRequest) {
	const userId = getDataFromToken(req);

	try {
		await connectDB();

		const goals = await Goal.find({ userId }).sort({ createdAt: -1 });

		NextResponse.json({
			success: true,
			data: goals,
			message: "All the goal fetched successfully",
		});
	} catch (error) {
		console.error(error);
		NextResponse.json({ message: "Something went wrong" });
	}
}
