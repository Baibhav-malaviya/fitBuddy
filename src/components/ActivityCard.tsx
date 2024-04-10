import React from "react";
import { FaClock, FaRunning } from "react-icons/fa";
import { LuDumbbell } from "react-icons/lu";

interface ActivityData {
	name: string;
	sets: {
		reps: number;
		weight: number;
		duration: number;
	}[];
	calories: number;
}

interface CardProps {
	data: ActivityData;
	isDarkMode: boolean;
}

const Card: React.FC<CardProps> = ({ data, isDarkMode }) => {
	const { name, sets, calories } = data;

	const primaryColor = isDarkMode ? "dark-primary" : "light-primary";
	const secondaryColor = isDarkMode ? "dark-secondary" : "light-secondary";
	const highlightColor = isDarkMode ? "dark-highlight" : "light-highlight";
	const errorColor = isDarkMode ? "dark-error" : "light-error";
	const textColor = isDarkMode ? "dark-text" : "light-text";
	const bgColor = isDarkMode ? "dark-bg" : "light-bg";

	return (
		<div
			className={`p-4 rounded-lg mx-auto md:mx-0 md:ml-auto shadow-md dark:shadow-lg bg-light-bg dark:bg-dark-bg dark:border-gray-400 border-[1.5px] text-light-text w-full md:max-w-96 md:min-w-72 dark:text-dark-text`}
		>
			<div className="flex items-center mb-2  justify-between">
				<h2 className={`text-2xl font-bold  text-light-primary`}>{name}</h2>
				<LuDumbbell
					className={`text-light-primary mr-2 bg-light-primary/40 p-2 rounded font-extrabold text-4xl`}
				/>
			</div>

			<div className="mb-2">
				<span className={`font-bold text-${secondaryColor}`}>Calories:</span>{" "}
				<span className="font-bold text-sm">{calories}</span>
			</div>

			<div className="text-sm">
				<h3 className={`text-lg font-bold mb-1 text-${highlightColor}`}>
					Sets:
				</h3>
				{sets.map((set, index) => (
					<div key={index} className="flex items-center mb-1">
						<span className={`font-bold text-${secondaryColor}`}>
							Set {index + 1}:
						</span>
						<span className="ml-2">
							{set.reps > 0 && (
								<span>
									Reps: {set.reps}, Weight: {set.weight}
								</span>
							)}
							,
							{set.duration > 0 && (
								<span className="inline-flex items-center ml-2">
									<FaClock className={`text-${secondaryColor} mr-1`} />
									Duration: {set.duration} seconds
								</span>
							)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Card;
