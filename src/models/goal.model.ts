import mongoose, { Document, Schema } from "mongoose";

export interface IGoal extends Document {
	userId: mongoose.Types.ObjectId;
	goalType: string;
	targetValue: number;
	additionalDetails: string;
	targetDate: Date | null;
	status: "active" | "completed" | "expired" | "deleted";
}

const GoalSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		goalType: { type: String, required: true },
		targetValue: { type: Number, required: true },
		additionalDetails: { type: String },
		targetDate: { type: Date },
		status: {
			type: String,
			default: "active",
			enum: ["active", "completed", "expired", "deleted"],
		},
	},
	{ timestamps: true }
);

const Goal =
	mongoose.models.goals || mongoose.model<IGoal>("goals", GoalSchema);

export default Goal;
