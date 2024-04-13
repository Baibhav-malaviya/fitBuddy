"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

import { formatDate } from "@/utils/helpers";
import data from "@/data/fakeWorkoutData.json";
import ActivityCard from "@/components/ActivityCard";
import PopupModal from "@/components/PopupModal";
import ExerciseForm from "@/components/ExerciseForm";
import { IWorkoutExercise } from "@/components/ExerciseForm";
import { Button } from "@/components/ui/button";

export default function Page() {
	const [selectedDate, setSelectedDate] = React.useState(() => {
		const today = new Date();
		today.setDate(today.getDate() - 1); // Set the date to one day before the current date
		return today;
	});
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (exercises: IWorkoutExercise[]) => {
		// Handle the submission logic here
		console.log("Exercises for today: ", exercises);
	};
	const formContent = <ExerciseForm onSubmit={handleSubmit} />;

	const currentData = data.filter((d) => {
		const dataDate = new Date(d.date);

		return (
			dataDate.getFullYear() === selectedDate.getFullYear() &&
			dataDate.getMonth() === selectedDate.getMonth() &&
			dataDate.getDate() === selectedDate.getDate()
		);
	});

	const totalCalories =
		currentData.length > 0
			? currentData[0].exercises.reduce((sum, curr) => sum + curr.calories, 0)
			: 0;

	const handleDateClick = (date: any) => {
		setSelectedDate(date);
	};

	return (
		<>
			<div className="flex items-center text-xs sm:text-base justify-between w-full shadow-md dark:border-[1.5px] rounded-md p-3 mb-4">
				<div className="font-semibold font-mono">
					Total Calories Burnt: {totalCalories}
				</div>

				<Button variant={"secondary"} onClick={() => setIsOpen(true)}>
					<FaPlus className="mr-2 font-light" /> Add Workout
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-2 md:grid-cols-12">
				<div className=" md:col-span-4">
					<div className="p-4 border px-8 w-full md:w-96 rounded-lg bg-background text-foreground shadow-md">
						<div className="flex items-baseline justify-between">
							<h2 className="text-2xl font-semibold mb-4">Select Date</h2>
							<h3 className="italic font-mono text-light-primary">
								{formatDate(selectedDate)}
							</h3>
						</div>

						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={handleDateClick}
							className="rounded-md border"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1   lg:grid-cols-2 gap-4  md:col-span-8">
					{currentData.length > 0 ? (
						currentData[0].exercises.map((el, idx) => (
							<ActivityCard key={idx} data={el} isDarkMode={true} />
						))
					) : (
						<div className="  col-span-8 w-full ml-auto flex justify-center items-center font-bold">
							<h1 className="h-auto">
								You haven&apos;t done any exercise on {formatDate(selectedDate)}{" "}
							</h1>
						</div>
					)}
				</div>
			</div>
			<PopupModal isOpen={isOpen} setIsOpen={setIsOpen} content={formContent} />
		</>
	);
}
