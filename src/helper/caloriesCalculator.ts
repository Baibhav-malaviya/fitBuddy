// Constants
const STRENGTH_TRAINING_CONSTANT = 0.6; // Average for strength training exercises

interface MetValues {
	[key: string]: number;
}

const MET_VALUES: MetValues = {
	Running: 11,
	Jogging: 7,
	Walking: 2.3,
	Sport: 8,
	Cycling: 11,
	Swimming: 11,
	// Add more MET values for other cardio exercises
};

/**
 * Calculates calories burned for strength training exercises.
 * @param {number} weight - Weight lifted in pounds
 * @param {number} reps - Number of repetitions
 * @param {number} sets - Number of sets
 * @returns {number} Calories burned
 */
export function calculateCaloriesBurnedStrengthTraining(
	weight: number,
	reps: number,
	sets: number
): number {
	// const weightInKg = weight / 2.20462; // Convert from pounds to kg
	const caloriesBurned = weight * reps * sets * STRENGTH_TRAINING_CONSTANT;
	return Math.round(caloriesBurned);
}

/**
 * Calculates calories burned for cardio exercises.
 * @param {string} exerciseType - Type of cardio exercise
 * @param {number} userWeightKg - User's weight in kilograms
 * @param {number} durationMinutes - Duration of the exercise in minutes
 * @returns {number} Calories burned
 */
export function calculateCaloriesBurnedCardio(
	exerciseType: string,
	userWeightKg: number,
	durationMinutes: number
): number {
	const MET = MET_VALUES[exerciseType] || 0;
	const durationHours = durationMinutes / 60;
	const caloriesBurned = ((MET * userWeightKg * 3.5) / 200) * durationMinutes;
	return Math.round(caloriesBurned);
}
