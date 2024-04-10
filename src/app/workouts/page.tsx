"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Calendar from "react-calendar";
import { formatDate } from "@/utils/helpers";
import data from "@/data/fakeWorkoutData.json";
import ActivityCard from "@/components/ActivityCard";
import PopupModal from "@/components/PopupModal";
import ExerciseForm from "@/components/ExerciseForm";
import { IWorkoutExercise } from "@/components/ExerciseForm";

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

	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	// Handle form submission logic here
	// 	console.log(formData);
	// };

	const handleSubmit = (exercises: IWorkoutExercise[]) => {
		// Handle the submission logic here
		console.log("Exercises for today: ", exercises);
	};
	const formContent = <ExerciseForm onSubmit={handleSubmit} />;

	// const formContent = (
	// 	<form onSubmit={handleSubmit}>
	// 		<div className="mb-4">
	// 			<label
	// 				className="block text-light-text dark:text-dark-text font-bold mb-2"
	// 				htmlFor="name"
	// 			>
	// 				Name
	// 			</label>
	// 			<input
	// 				className="shadow appearance-none border rounded w-full py-2 px-3 text-light-text dark:text-dark-text leading-tight focus:outline-none focus:shadow-outline bg-light-bg dark:bg-dark-bg"
	// 				id="name"
	// 				type="text"
	// 				name="name"
	// 				value={formData.name}
	// 				onChange={handleChange}
	// 				required
	// 			/>
	// 		</div>
	// 		<div className="mb-6">
	// 			<label
	// 				className="block text-light-text dark:text-dark-text font-bold mb-2"
	// 				htmlFor="email"
	// 			>
	// 				Email
	// 			</label>
	// 			<input
	// 				className="shadow appearance-none border rounded w-full py-2 px-3 text-light-text dark:text-dark-text leading-tight focus:outline-none focus:shadow-outline bg-light-bg dark:bg-dark-bg"
	// 				id="email"
	// 				type="email"
	// 				name="email"
	// 				value={formData.email}
	// 				onChange={handleChange}
	// 				required
	// 			/>
	// 		</div>
	// 		<div className="flex items-center justify-between">
	// 			<button
	// 				className="bg-dark-primary dark:bg-dark-secondary hover:bg-light-primary dark:hover:bg-dark-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	// 				type="submit"
	// 			>
	// 				Submit
	// 			</button>
	// 		</div>
	// 	</form>
	// );

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
				<button
					onClick={() => setIsOpen(true)}
					className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 flex items-center"
				>
					<FaPlus className="mr-2" /> Add Workout
				</button>
			</div>

			<div className="grid grid-cols-1 gap-2 md:grid-cols-12">
				<div className=" md:col-span-4">
					<div className="p-4 border px-8 w-full md:w-96 rounded-lg bg-light-bg dark:bg-dark-bg shadow-md">
						<div className="flex items-baseline justify-between">
							<h2 className="text-2xl font-semibold mb-4">Select Date</h2>
							<h3 className="italic font-mono text-light-primary">
								{formatDate(selectedDate)}
							</h3>
						</div>
						<Calendar value={selectedDate} onChange={handleDateClick} />
					</div>
				</div>

				<div className="grid grid-cols-1  lg:grid-cols-2 gap-4  md:col-span-8">
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
