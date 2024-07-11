"use client";
import React, { useState } from "react";
import GoalCard from "@/components/GoalCard";
import goalCardDatas from "@/data/fakeGoalData.json";
// import { Card, Dropdown, DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown';
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

//todo  Total number of goals
//todo  Number of completed goals
//todo  Number of active goals
//todo  Percentage of goals completed

export default function CurrGoal() {
	const [sortOrder, setSortOrder] = useState(""); // asc, desc
	const [filterStatus, setFilterStatus] = useState(""); // active, completed, all

	const sortedGoals = sortGoals(goalCardDatas, sortOrder);
	const filteredGoals = filterGoals(sortedGoals, filterStatus);

	const handleSortChange = (order: string) => {
		console.log("order: ", order);
		setSortOrder(order);
	};

	const handleFilterChange = (status: string) => {
		setFilterStatus(status);
	};

	return (
		<div className="w-full flex items-center justify-center flex-col ">
			<p className="text-2xl font-extrabold p-2 text-primary bg-muted rounded-md my-2">
				Here all the goal will come on going as well as completed one.
			</p>
			<div className="mb-4 flex space-x-2 justify-between">
				{/* drop down for sorting on the basis of time */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant={"outline"}>Sort</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => handleSortChange("asc")}>
							Due Date (Ascending)
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleSortChange("desc")}>
							Due Date (Descending)
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* drop down for filtering */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant={"outline"}>Filter</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => handleFilterChange("all")}>
							All
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleFilterChange("active")}>
							Active
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleFilterChange("completed")}>
							Completed
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* card displaying */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filteredGoals.map((data: any, idx: number) => (
					<GoalCard
						key={idx}
						goalType={data.goalType}
						targetValue={data.targetValue}
						additionalDetails={data.additionalDetails}
						targetCompletionDate={data.targetCompletionDate}
						status={data.status}
					/>
				))}
			</div>
		</div>
	);
}

const sortGoals = (goals: any, order: any) => {
	return [...goals].sort((a, b) => {
		const aDate = new Date(a.targetCompletionDate).getTime(); // Convert date string to Date object
		const bDate = new Date(b.targetCompletionDate).getTime(); // Convert date string to Date object

		if (order === "asc") {
			return aDate - bDate;
		} else if (order === "desc") {
			return bDate - aDate;
		}
		return 0;
	});
};

const filterGoals = (goals: any, status: any) => {
	if (status === "all") {
		return goals;
	} else if (status === "active") {
		return goals.filter((goal: any) => goal.status === "active");
	} else if (status === "completed") {
		return goals.filter((goal: any) => goal.status === "completed");
	}
	return goals;
};
