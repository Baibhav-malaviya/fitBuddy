export function formatDate(date: Date) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

export const calculateBMI = (
	weight: number | null,
	height: number | null
): number | null => {
	if (weight === null || height === null) {
		return null;
	}

	// Convert height from cm to meters
	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);
	console.log(typeof bmi);
	return parseFloat(bmi.toFixed(2));
};

export const calculateBMR = (
	weight: number | null,
	height: number | null,
	age: number | null,
	gender: "male" | "female" | "other" | null
): number | null => {
	if (weight === null || height === null || age === null || gender === null) {
		return null;
	}

	// Convert height from cm to meters
	const heightInMeters = height / 100;

	let bmr;

	if (gender === "male") {
		bmr = 88.362 + 13.397 * weight + 4.799 * heightInMeters * 100 - 5.677 * age;
	} else if (gender === "female") {
		bmr = 447.593 + 9.247 * weight + 3.098 * heightInMeters * 100 - 4.33 * age;
	} else {
		// For 'other' gender, use the average of male and female BMR calculations
		const maleBMR =
			88.362 + 13.397 * weight + 4.799 * heightInMeters * 100 - 5.677 * age;
		const femaleBMR =
			447.593 + 9.247 * weight + 3.098 * heightInMeters * 100 - 4.33 * age;
		bmr = (maleBMR + femaleBMR) / 2;
	}

	return parseFloat(bmr.toFixed(2));
};
