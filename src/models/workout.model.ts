import mongoose, { Schema, Document } from "mongoose";

interface IWorkoutExerciseSet {
	reps: number;
	weight?: number;
	duration?: number; // in seconds
}

interface IWorkoutExercise {
	name: string;
	sets: IWorkoutExerciseSet[];
	calories?: number;
}

interface IWorkoutDocument extends Document {
	userId: mongoose.Types.ObjectId;
	date: Date;
	exercises: IWorkoutExercise[];
}

const workoutExerciseSetSchema = new Schema<IWorkoutExerciseSet>({
	reps: { type: Number, required: true },
	weight: { type: Number },
	duration: { type: Number }, // in seconds
});

const workoutExerciseSchema = new Schema<IWorkoutExercise>({
	name: { type: String, required: true },
	sets: [workoutExerciseSetSchema],
	calories: { type: Number },
});

const workoutSchema = new Schema<IWorkoutDocument>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		date: { type: Date, default: Date.now },
		exercises: [workoutExerciseSchema],
	},
	{ timestamps: true }
);

const Workout = mongoose.model<IWorkoutDocument>("Workout", workoutSchema);

export default Workout;
