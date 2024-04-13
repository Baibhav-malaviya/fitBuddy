"use client";
import React, { useState } from "react";
import axios from "axios";
import {
	FaUserEdit,
	FaSave,
	FaInfoCircle,
	FaTimesCircle,
	FaExternalLinkAlt,
} from "react-icons/fa";
import { calculateBMI, calculateBMR } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
	name: string;
	email: string;
	password: string;
	birthday: Date | null;
	age: number | null;
	weight: number | null;
	height: number | null;
	gender: "male" | "female" | "other" | null;
}

const Profile: React.FC = () => {
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		password: "",
		birthday: null,
		age: 22, // this is fake just to make the BMR calculator work
		weight: null,
		height: null,
		gender: null,
	});

	//! calculating bmi
	const bmi =
		calculateBMI(user.weight, user.height) !== null
			? calculateBMI(user.weight, user.height)
			: "Need weight and height to calculate BMI";

	//! calculating bmr
	const bmr =
		calculateBMR(user.weight, user.height, user.age, user.gender) ||
		"Need weight, height, age and gender to calculate BMR";

	const [editing, setEditing] = useState(false);
	const [showBmiInfo, setShowBmiInfo] = useState(false);
	const [showBmrInfo, setShowBmrInfo] = useState(false);

	//! input change controller
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	//! form submit controller
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await axios.put("/api/users/update", user);
			setEditing(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex justify-center items-center">
			<div className="bg-light-bg dark:bg-dark-bg shadow-lg dark:border-[1px] border-gray-100 rounded-lg p-8 max-w-3xl">
				<h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					<div>
						{/* name input */}
						<div className="relative mb-4">
							<Input
								type="text"
								id="name"
								name="name"
								value={user.name}
								onChange={handleChange}
								disabled={!editing}
								placeholder="Name"
							/>
							{editing && (
								<FaTimesCircle
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light-text dark:text-dark-text hover:text-light-error dark:hover:text-dark-error cursor-pointer"
									onClick={() =>
										setUser((prevUser) => ({ ...prevUser, name: "" }))
									}
								/>
							)}
						</div>
						{/* birthday input */}
						<div className="relative mb-4">
							<Input
								type="date"
								id="birthday"
								name="birthday"
								value={
									user.birthday ? user.birthday.toString().split("T")[0] : ""
								}
								onChange={(e) => handleChange(e)}
								disabled={!editing}
								placeholder="Birthday"
							/>
							{editing && (
								<FaTimesCircle
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light-text dark:text-dark-text hover:text-light-error dark:hover:text-dark-error cursor-pointer"
									onClick={() =>
										setUser((prevUser) => ({ ...prevUser, birthday: null }))
									}
								/>
							)}
						</div>
						{/* gender radio button */}
						<div className="mb-4">
							<span className="text-light-text dark:text-dark-text font-medium">
								Gender:
							</span>
							<div className="mt-2 flex items-center space-x-4">
								<div className="flex items-center">
									<input
										type="radio"
										id="male"
										name="gender"
										value="male"
										checked={user.gender === "male"}
										onChange={handleChange}
										disabled={!editing}
										className="form-radio h-5 w-5 text-light-highlight dark:text-dark-highlight transition-colors duration-300"
									/>
									<label
										htmlFor="male"
										className="ml-2 text-light-text dark:text-dark-text"
									>
										Male
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										id="female"
										name="gender"
										value="female"
										checked={user.gender === "female"}
										onChange={handleChange}
										disabled={!editing}
										className="form-radio h-5 w-5 text-light-highlight dark:text-dark-highlight transition-colors duration-300"
									/>
									<label
										htmlFor="female"
										className="ml-2 text-light-text dark:text-dark-text"
									>
										Female
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										id="other"
										name="gender"
										value="other"
										checked={user.gender === "other"}
										onChange={handleChange}
										disabled={!editing}
										className="form-radio h-5 w-5 text-light-highlight dark:text-dark-highlight transition-colors duration-300"
									/>
									<label
										htmlFor="other"
										className="ml-2 text-light-text dark:text-dark-text"
									>
										Other
									</label>
								</div>
							</div>
						</div>
					</div>

					<div>
						{/* weight and height */}
						<div className="mb-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-light-text dark:text-dark-text font-medium">
									Weight & Height
								</span>
							</div>
							<div className="flex space-x-4">
								<div className="relative flex-1">
									<Input
										type="number"
										id="weight"
										name="weight"
										value={user.weight || ""}
										onChange={handleChange}
										disabled={!editing}
										placeholder="Weight (kg)"
										min="0"
										step="0.1"
									/>
									{editing && user.weight !== null && (
										<FaTimesCircle
											className="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-text dark:text-dark-text hover:text-light-error dark:hover:text-dark-error cursor-pointer"
											onClick={() =>
												setUser((prevUser) => ({ ...prevUser, weight: null }))
											}
										/>
									)}
								</div>

								<div className="relative flex-1">
									<Input
										type="number"
										id="height"
										name="height"
										value={user.height || ""}
										onChange={handleChange}
										disabled={!editing}
										placeholder="Height (cm)"
										min="0"
										step="0.1"
									/>
									{editing && user.height !== null && (
										<FaTimesCircle
											className="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-text dark:text-dark-text hover:text-light-error dark:hover:text-dark-error cursor-pointer"
											onClick={() =>
												setUser((prevUser) => ({ ...prevUser, height: null }))
											}
										/>
									)}
								</div>
							</div>
						</div>

						{/* bmi input */}
						<div className="mb-4">
							<div className="flex items-center justify-between mb-2">
								<label
									htmlFor="bmi"
									className="flex items-center text-light-text dark:text-dark-text font-medium"
								>
									BMI
									<button
										type="button"
										className="ml-2 text-light-highlight dark:text-dark-highlight hover:text-light-primary dark:hover:text-dark-primary focus:outline-none"
										onClick={() => setShowBmiInfo(!showBmiInfo)}
									>
										<FaInfoCircle />
									</button>
								</label>
							</div>

							<Input
								type="text"
								id="bmi"
								name="bmi"
								value={bmi || ""}
								disabled
								readOnly
							/>
							{showBmiInfo && (
								<div className="mt-2 bg-secondary text-accent-foreground p-2 rounded-md">
									<p className="italic text-xs">
										Body Mass Index (BMI) is a value derived from the mass
										(weight) and height of an individual. It is a widely used
										screening tool to identify potential weight problems in
										adults.
									</p>
									<a
										href="https://en.wikipedia.org/wiki/Body_mass_index"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center text-light-highlight dark:text-dark-highlight hover:text-light-primary dark:hover:text-dark-primary"
									>
										<FaExternalLinkAlt className="mr-2" />
										Learn more about BMI
									</a>
								</div>
							)}
						</div>

						{/* bmr input */}
						<div className="mb-4">
							<div className="flex items-center justify-between mb-2">
								<label
									htmlFor="bmr"
									className="flex items-center text-light-text dark:text-dark-text font-medium"
								>
									BMR
									<button
										type="button"
										className="ml-2 text-light-highlight dark:text-dark-highlight hover:text-light-primary dark:hover:text-dark-primary focus:outline-none"
										onClick={() => setShowBmrInfo(!showBmrInfo)}
									>
										<FaInfoCircle />
									</button>
								</label>
							</div>
							<Input
								type="text"
								id="bmr"
								name="bmr"
								value={bmr || ""}
								disabled
								readOnly
							/>
							{showBmrInfo && (
								<div className="mt-2 bg-secondary text-accent-foreground p-2 rounded-md">
									<p className="italic text-xs">
										Basal Metabolic Rate (BMR) is the minimum amount of energy
										(calories) your body needs to perform basic life-sustaining
										functions like breathing, circulating blood, and maintaining
										body temperature while at rest.
									</p>
									<a
										href="https://en.wikipedia.org/wiki/Basal_metabolic_rate"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center text-light-highlight dark:text-dark-highlight hover:text-light-primary dark:hover:text-dark-primary"
									>
										<FaExternalLinkAlt className="mr-2" />
										Learn more about BMR
									</a>
								</div>
							)}
						</div>
					</div>
				</form>

				{/* Edit and save button  */}
				<div className="flex justify-end mt-8">
					{editing ? (
						<Button type="submit" onClick={() => setEditing(false)}>
							<FaSave className="mr-2" />
							Save
						</Button>
					) : (
						<AlertDialog>
							<AlertDialogTrigger>
								<Button>
									<span className="flex items-center justify-center ">
										<FaUserEdit className="mr-2" /> Edit
									</span>
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel
										onClick={() => console.log("You have selected cancel")}
									>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction onClick={() => setEditing(true)}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default Profile;
