"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { FaArrowLeft } from "react-icons/fa6";

const SetGoalsPage: React.FC = () => {
	const [activeSection, setActiveSection] = useState(0);
	const [goalType, setGoalType] = useState("");
	const [targetValue, setTargetValue] = useState("");
	const [goalDetails, setGoalDetails] = useState("");
	const [targetDate, setTargetDate] = useState<Date | null>(null);
	const { toast } = useToast();

	const handleGoalTypeChange = (type: string) => {
		setGoalType(type);
		setActiveSection(1);
	};

	const handleNextSection = () => {
		setActiveSection((prevSection) => prevSection + 1);
	};

	const handlePrevSection = () => {
		setActiveSection((prevSection) => prevSection - 1);
	};

	const handleSubmitGoal = () => {
		// Handle goal submission logic here
		console.log("welcome to handleSubmitGoal");
		const activeGoalLength = 2;
		if (activeGoalLength >= 2) {
			toast({
				title: "Goal setting unsuccess-full",
				description:
					"You can't set new goal because you already have two active goal",
			});
			console.log("active goal is already 2");
			return;
		}
		console.log("Goal Type:", goalType);
		console.log("Target Value:", targetValue);
		console.log("Goal Details:", goalDetails);
		console.log("Target Date:", targetDate);
	};

	return (
		<div className="container mx-auto py-8">
			<div className="mb-8 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2  justify-between items-baseline pr-2 md:pr-5">
				<h1 className="text-xl sm:text3xl font-bold ">
					Set Your Fitness Goals
				</h1>{" "}
				<p className="text-xs">
					<span className="mr-2 text-destructive">NOTE:</span>You can only set{" "}
					<span className="bg-primary px-1 italic mx-1 font-bold">
						new goal
					</span>
					{", "}
					if you don&apos;t have more than 2 active goals
				</p>
			</div>
			<Card className=" p-4 sm:p-8">
				{/* for all the four Button and the Button is disabled on the basis of previous Button **action** */}
				<div className="mb-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
					<Button
						variant={activeSection === 0 ? "default" : "outline"}
						onClick={() => setActiveSection(0)} //todo WE need to make this div mobile responsive
					>
						Select Goal Type
					</Button>
					<Button
						variant={activeSection === 1 ? "default" : "outline"}
						onClick={() => setActiveSection(1)}
						disabled={!goalType}
					>
						Set Target
					</Button>
					<Button
						variant={activeSection === 2 ? "default" : "outline"}
						onClick={() => setActiveSection(2)}
						disabled={!targetValue}
					>
						Additional Details
					</Button>
					<Button
						variant={activeSection === 3 ? "default" : "outline"}
						onClick={() => setActiveSection(3)}
						disabled={!goalDetails}
					>
						Review &amp; Submit
					</Button>
				</div>

				{/* selecting goal */}
				{activeSection === 0 && (
					<div className="grid grid-cols-2 gap-4">
						<Button
							variant={goalType === "weight-loss" ? "default" : "outline"}
							onClick={() => handleGoalTypeChange("weight-loss")}
						>
							Weight Loss
						</Button>
						<Button
							variant={goalType === "muscle-gain" ? "default" : "outline"}
							onClick={() => handleGoalTypeChange("muscle-gain")}
						>
							Muscle Gain
						</Button>
						<Button
							variant={goalType === "endurance" ? "default" : "outline"}
							onClick={() => handleGoalTypeChange("endurance")}
						>
							Endurance
						</Button>
						<Button
							variant={goalType === "flexibility" ? "default" : "outline"}
							onClick={() => handleGoalTypeChange("flexibility")}
						>
							Flexibility
						</Button>
					</div>
				)}

				{/* for setting target values */}
				{activeSection === 1 && (
					<div>
						{/* message on the basis of selected goal type */}
						<p className="text-gray-500 mb-4">
							{goalType === "weight-loss"
								? "Enter your target weight loss in pounds or kilograms."
								: goalType === "muscle-gain"
								? "Enter your target muscle gain in pounds or kilograms."
								: goalType === "endurance"
								? "Enter your target distance or duration."
								: "Enter your desired flexibility level or specific exercises."}
						</p>
						<Input
							type="number"
							placeholder="Enter target value"
							value={targetValue}
							onChange={(e) => setTargetValue(e.target.value)}
							className="mb-4"
						/>
						{/* prev and next button */}
						<div className="flex justify-between">
							<Button variant="ghost" onClick={handlePrevSection}>
								Back
							</Button>
							<Button onClick={handleNextSection}>Next</Button>
						</div>
					</div>
				)}

				{/* writing a notes and selecting target completion dates */}
				{activeSection === 2 && (
					<div>
						<p className="text-gray-500 mb-4">
							Provide any additional details or notes about your goal.
						</p>
						<Input
							placeholder="Additional goal details (optional)"
							value={goalDetails}
							onChange={(e) => setGoalDetails(e.target.value)}
							className="mb-4"
						/>

						<p className="text-gray-500 mb-4">
							Select probable target completion dates
						</p>
						<div className="mb-4">
							<div className="w-auto">
								<Calendar
									mode="single"
									selected={targetDate || undefined}
									onSelect={(date: any) => setTargetDate(date)}
									className="rounded-md  border"
								/>
							</div>
						</div>
						<div className="flex justify-between">
							<Button variant="ghost" onClick={handlePrevSection}>
								Back
							</Button>
							<Button onClick={handleNextSection}>Next</Button>
						</div>
					</div>
				)}

				{/* review the goal and proceed to save */}
				{activeSection === 3 && (
					<div>
						<h2 className="text-xl font-bold mb-4">Review Your Goal</h2>
						<p className="mb-2">
							<span className="font-bold">Goal Type:</span> {goalType}
						</p>
						<p className="mb-2">
							<span className="font-bold">Target Value:</span> {targetValue}
						</p>
						<p className="mb-2">
							<span className="font-bold">Additional Details:</span>{" "}
							{goalDetails || "N/A"}
						</p>
						<p className="mb-4">
							<span className="font-bold">Target Completion Date:</span>{" "}
							{targetDate
								? targetDate.toLocaleDateString()
								: "No target date set"}
						</p>
						<div className="flex justify-between">
							<Button
								variant="outline"
								size={"icon"}
								onClick={handlePrevSection}
							>
								<FaArrowLeft className="mr-1" />
							</Button>
							<Button onClick={handleSubmitGoal}>Submit Goal</Button>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
};

export default SetGoalsPage;
