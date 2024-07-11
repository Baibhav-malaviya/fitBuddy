// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SetGoalForm from "./SetGoalForm";
// import GoalList from "./GoalList";

// // Assuming you have a userId from your authentication system
// const userId = "123";

// const SetGoalPage: React.FC = () => {
// 	const [goals, setGoals] = useState([]);
// 	const [activeGoal, setActiveGoal] = useState(null);
// 	const [canEditGoal, setCanEditGoal] = useState(false);

// 	useEffect(() => {
// 		const fetchGoals = async () => {
// 			try {
// 				const response = await axios.get(
// 					`/api/goals/getGoals?userId=${userId}`
// 				);
// 				const goals = response.data;
// 				setGoals(goals);

// 				const activeGoal = goals.find((goal) => goal.status === "active");
// 				setActiveGoal(activeGoal);

// 				if (activeGoal) {
// 					const createdAt = new Date(activeGoal.createdAt);
// 					const now = new Date();
// 					const timeDiff = now.getTime() - createdAt.getTime();
// 					const hoursDiff = timeDiff / (1000 * 60 * 60);
// 					setCanEditGoal(hoursDiff < 24);
// 				}
// 			} catch (error) {
// 				console.error("Error fetching goals:", error);
// 			}
// 		};

// 		fetchGoals();
// 	}, []);

// 	const handleGoalSet = (newGoal) => {
// 		setGoals((prevGoals) => [...prevGoals, newGoal]);
// 		setActiveGoal(newGoal);
// 		setCanEditGoal(true);
// 	};

// 	const handleGoalDelete = async () => {
// 		try {
// 			await axios.delete(
// 				`/api/goals/deleteGoal?userId=${userId}&goalId=${activeGoal._id}`
// 			);
// 			setActiveGoal(null);
// 			setCanEditGoal(false);
// 			// Refetch goals after successful deletion
// 			const response = await axios.get(`/api/goals/getGoals?userId=${userId}`);
// 			setGoals(response.data);
// 		} catch (error) {
// 			console.error("Error deleting goal:", error);
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>Set Goal</h1>
// 			{activeGoal && (
// 				<div>
// 					<h2>Current Goal</h2>
// 					{/* Render current goal details */}
// 					{canEditGoal ? (
// 						<button>Edit Goal</button>
// 					) : (
// 						<button onClick={handleGoalDelete}>Delete Goal</button>
// 					)}
// 				</div>
// 			)}
// 			<SetGoalForm userId={userId} onGoalSet={handleGoalSet} />
// 			<h2>Previous Goals</h2>
// 			<GoalList
// 				userId={userId}
// 				goals={goals.filter((goal) => goal.status !== "active")}
// 			/>
// 		</div>
// 	);
// };

// export default SetGoalPage;

import UnderDevelopment from "@/components/UnderDevelopment";
import React from "react";

export default function Achievement() {
	return (
		<div>
			<UnderDevelopment />
			{/* <div className="w-full flex items-center justify-center text-4xl font-extrabold p-2 text-primary">
				You haven&apos;t won any Badges for Now
			</div> */}
		</div>
	);
}
