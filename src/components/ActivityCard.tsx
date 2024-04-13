import React from "react";
import { FaClock, FaRunning } from "react-icons/fa";
import { LuDumbbell } from "react-icons/lu";
import { Button } from "./ui/button";

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

	return (
		<div
			className={`p-4 rounded-lg mx-auto md:mx-0 md:ml-auto shadow-md dark:shadow-lg bg-background text-foreground dark:border-gray-400 border-[1.5px] text-light-text w-full md:max-w-96 md:min-w-72 dark:text-dark-text h-auto`}
		>
			<div className="flex items-center mb-2  justify-between">
				<h2 className={`text-2xl font-bold  text-light-primary`}>{name}</h2>

				<Button size={"icon"}>
					<LuDumbbell className="text-xl font-extrabold" />
				</Button>
			</div>

			<div className="mb-2">
				<span className={`font-bold `}>Calories:</span>{" "}
				<span className="font-bold text-sm">{calories}</span>
			</div>

			<div className="text-sm">
				<h3 className={`text-lg font-bold mb-1 `}>Sets:</h3>
				{sets.map((set, index) => (
					<div key={index} className="flex items-center mb-1">
						<span className={`font-bold `}>Set {index + 1}:</span>
						<span className="ml-2">
							{set.reps > 0 && (
								<span>
									span {set.reps}, Weight: {set.weight}
								</span>
							)}
							,
							{set.duration > 0 && (
								<span className="inline-flex items-center ml-2">
									<FaClock className={`text-primary mr-1 text-lg`} />
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
