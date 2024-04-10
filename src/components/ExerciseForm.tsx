import React, { useState } from "react";
import mongoose, { Document } from "mongoose";
import { Span } from "next/dist/trace";

export interface IWorkoutExerciseSet {
	reps: number;
	weight?: number;
	duration?: number; // in seconds
}

export interface IWorkoutExercise {
	name: string;
	sets: IWorkoutExerciseSet[];
	calories?: number;
}

export interface IWorkoutDocument extends Document {
	userId: mongoose.Types.ObjectId;
	date: Date;
	exercises: IWorkoutExercise[];
}

interface ExerciseFormProps {
	onSubmit: (exercises: IWorkoutExercise[]) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit }) => {
	const [exercises, setExercises] = useState<IWorkoutExercise[]>([]);
	const [openExerciseIndex, setOpenExerciseIndex] = useState<number | null>(
		null
	);

	const addExercise = () => {
		setExercises([...exercises, { name: "", sets: [], calories: 0 }]);
		setOpenExerciseIndex(exercises.length);
	};

	const updateExerciseName = (index: number, name: string) => {
		const updatedExercises = [...exercises];
		updatedExercises[index].name = name;
		setExercises(updatedExercises);
	};

	const removeExercise = (exerciseIndex: number) => {
		const updatedExercises = [...exercises];
		updatedExercises.splice(exerciseIndex, 1);
		setExercises(updatedExercises);
		setOpenExerciseIndex(null);
	};

	const removeSet = (exerciseIndex: number, setIndex: number) => {
		const updatedExercises = [...exercises];
		updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
		setExercises(updatedExercises);
	};

	const addSet = (exerciseIndex: number) => {
		const updatedExercises = [...exercises];
		updatedExercises[exerciseIndex].sets.push({
			reps: 0,
			weight: 0,
			duration: 0,
		});
		setExercises(updatedExercises);
	};

	const updateSet = (
		exerciseIndex: number,
		setIndex: number,
		set: IWorkoutExerciseSet
	) => {
		const updatedExercises = [...exercises];
		updatedExercises[exerciseIndex].sets[setIndex] = set;
		setExercises(updatedExercises);
	};

	const updateCalories = (exerciseIndex: number, calories: number) => {
		const updatedExercises = [...exercises];
		updatedExercises[exerciseIndex].calories = calories;
		setExercises(updatedExercises);
	};

	const handleSubmit = () => {
		onSubmit(exercises);
	};

	const toggleExerciseForm = (exerciseIndex: number) => {
		if (openExerciseIndex === exerciseIndex) {
			setOpenExerciseIndex(null);
		} else {
			setOpenExerciseIndex(exerciseIndex);
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
				Add Workout
			</h2>
			{exercises.map((exercise, exerciseIndex) => (
				<div key={exerciseIndex} className="mb-6">
					<div
						className="flex items-center justify-between cursor-pointer"
						onClick={() => toggleExerciseForm(exerciseIndex)}
					>
						<h3 className="text-lg font-bold text-gray-800 dark:text-white">
							{exercise.name || `Exercise ${exerciseIndex + 1}`}
						</h3>
						<div className="flex items-center space-x-2">
							<span className="text-light-text dark:text-dark-text text-2xl">
								{openExerciseIndex === exerciseIndex ? (
									<span className="px-[8px]  bg-light-highlight rounded">
										-
									</span>
								) : (
									<span className="px-[8px]  bg-light-highlight rounded">
										+
									</span>
								)}
							</span>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									removeExercise(exerciseIndex);
								}}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
							>
								Remove
							</button>
						</div>
					</div>

					{openExerciseIndex === exerciseIndex && (
						<div className="mt-4">
							<div className="mb-2">
								<label
									htmlFor={`exercise-${exerciseIndex}`}
									className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
								>
									Exercise Name
								</label>
								<input
									type="text"
									id={`exercise-${exerciseIndex}`}
									value={exercise.name}
									onChange={(e) =>
										updateExerciseName(exerciseIndex, e.target.value)
									}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
								/>
							</div>
							{exercise.sets.map((set, setIndex) => (
								<div key={setIndex} className="grid grid-cols-3 gap-4">
									<div>
										<label
											htmlFor={`set-${exerciseIndex}-${setIndex}-reps`}
											className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
										>
											Reps
										</label>
										<input
											type="number"
											id={`set-${exerciseIndex}-${setIndex}-reps`}
											value={set.reps}
											onChange={(e) =>
												updateSet(exerciseIndex, setIndex, {
													...set,
													reps: parseInt(e.target.value),
												})
											}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
										/>
									</div>
									<div>
										<label
											htmlFor={`set-${exerciseIndex}-${setIndex}-weight`}
											className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
										>
											Weight
										</label>
										<input
											type="number"
											id={`set-${exerciseIndex}-${setIndex}-weight`}
											value={set.weight}
											onChange={(e) =>
												updateSet(exerciseIndex, setIndex, {
													...set,
													weight: parseInt(e.target.value),
												})
											}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
										/>
									</div>
									<div>
										<label
											htmlFor={`set-${exerciseIndex}-${setIndex}-duration`}
											className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
										>
											Duration (seconds)
										</label>
										<input
											type="number"
											id={`set-${exerciseIndex}-${setIndex}-duration`}
											value={set.duration}
											onChange={(e) =>
												updateSet(exerciseIndex, setIndex, {
													...set,
													duration: parseInt(e.target.value),
												})
											}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
										/>
									</div>
									<div>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												removeSet(exerciseIndex, setIndex);
											}}
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
										>
											Remove Set
										</button>
									</div>
								</div>
							))}
							<div className="mt-4">
								<button
									type="button"
									onClick={() => addSet(exerciseIndex)}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>
									Add Set
								</button>
							</div>
							<div className="mt-4">
								<label
									htmlFor={`calories-${exerciseIndex}`}
									className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
								>
									Calories
								</label>
								<input
									type="number"
									id={`calories-${exerciseIndex}`}
									value={exercise.calories}
									onChange={(e) =>
										updateCalories(exerciseIndex, parseInt(e.target.value))
									}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
								/>
							</div>
						</div>
					)}
				</div>
			))}

			<div className="mt-4">
				<button
					type="button"
					onClick={addExercise}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Add Exercise
				</button>
			</div>
			<div className="mt-8">
				<button
					type="button"
					onClick={handleSubmit}
					className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Submit Workout
				</button>
			</div>
		</div>
	);
};

export default ExerciseForm;
