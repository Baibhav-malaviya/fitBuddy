"use client";
import UnderDevelopment from "@/components/UnderDevelopment";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
	BarChart,
	Bar,
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LineChart,
	Line,
	PolarGrid,
	RadarChart,
	Radar,
	PolarAngleAxis,
	PolarRadiusAxis,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import moment from "moment";

const originalData = [
	{ day: "Page A", caloriesTarget: 230, caloriesBurned: 270 },
	{ day: "Page B", caloriesTarget: 120, caloriesBurned: 100 },
	{ day: "Page C", caloriesTarget: 220, caloriesBurned: 170 },
	{ day: "Page D", caloriesTarget: 300, caloriesBurned: 280 },
	{ day: "Page E", caloriesTarget: 230, caloriesBurned: 150 },
	{ day: "Page F", caloriesTarget: 500, caloriesBurned: 220 },
	{ day: "Page G", caloriesTarget: 175, caloriesBurned: 200 },
];

const radarData = [
	{
		day: "sunday",
		strength: 80,
		flexibility: 40,
		endurance: 70,
	},
	{
		day: "monday",
		strength: 70,
		flexibility: 85,
		endurance: 20,
	},
	{
		day: "tuesday",
		strength: 85,
		flexibility: 25,
		endurance: 65,
	},
	{
		day: "wednesday",
		strength: 80,
		flexibility: 50,
		endurance: 70,
	},
	{
		day: "thursday",
		strength: 75,
		flexibility: 95,
		endurance: 45,
	},
	{
		day: "friday",
		strength: 80,
		flexibility: 45,
		endurance: 70,
	},
	{
		day: "saturday",
		strength: 95,
		flexibility: 60,
		endurance: 65,
	},
];

const today = moment(); // Get today's date

// Create an array of the previous 7 days, up to and including yesterday
const last7Days = Array.from({ length: 7 }, (_, i) => {
	const date = today.clone().subtract(i, "days");
	return date.isSameOrBefore(today, "day") ? date.format("dddd") : null;
});

// Remove null values from the array
const filteredLast7Days = last7Days.filter((day) => day !== null);

// Map the original data to the new format
const data = filteredLast7Days.map((day, idx) => {
	const matchingData = originalData.find((item) => item.day === day);
	return (
		matchingData || {
			day,
			caloriesTarget: originalData[idx].caloriesTarget,
			caloriesBurned: originalData[idx].caloriesBurned,
		}
	);
});

export default function Progress() {
	const [goal, setGoal] = useState(350);
	const [opacity, setOpacity] = useState({
		caloriesTarget: "opacity-100",
		caloriesBurned: "opacity-100",
	});
	const handleMouseEnter = (e: any) => {
		setOpacity((prevOpacity) => ({
			...prevOpacity,
			[e.dataKey]: "opacity-80",
		}));
	};
	const handleMouseOut = (e: any) => {
		setOpacity({
			caloriesTarget: "opacity-100",
			caloriesBurned: "opacity-100",
		});
	};

	return (
		<div>
			{/* <UnderDevelopment /> */}
			{/* //! tab switch */}
			<div className="w-full mt-4">
				<Tabs defaultValue="account">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="account">Bar</TabsTrigger>
						<TabsTrigger value="password">Line</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Weekly Goal</CardTitle>
								<p className="text-muted-foreground font-semibold text-sm">
									Set you daily activity goal
								</p>
							</CardHeader>
							<CardContent>
								<div className="flex justify-center items-center space-x-16">
									<Button
										variant="outline"
										size={"icon"}
										className="p-1"
										onClick={() => setGoal(goal - 20)}
									>
										-
									</Button>
									<div className="flex flex-col items-center justify-center s">
										<h1 className="text-5xl font-bold">{goal}</h1>
										<p className=" text-xs text-muted-foreground font-semibold">
											CALORIES/DAY
										</p>
									</div>
									<Button
										variant="outline"
										size={"icon"}
										className="p-1"
										onClick={() => setGoal(goal + 20)}
									>
										+
									</Button>
								</div>

								<div className="mt-4 h-32">
									<ResponsiveContainer width="100%" aspect={3}>
										<BarChart data={data}>
											<YAxis dataKey="caloriesTarget" />
											<Bar
												dataKey="caloriesTarget"
												className={`fill-primary ${opacity.caloriesTarget}`}
											/>
											<Bar
												dataKey="caloriesBurned"
												className={`fill-red-500 ${opacity.caloriesBurned}`}
											/>

											<Legend
												verticalAlign="bottom"
												iconType="diamond"
												margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
												height={2}
												onMouseEnter={handleMouseEnter}
												onMouseLeave={handleMouseOut}
											/>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full">Set Goal</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="password">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Weekly Goal</CardTitle>
								<p className="text-muted-foreground font-semibold text-sm">
									Set you daily activity goal
								</p>
							</CardHeader>
							<CardContent>
								<div className="flex justify-center items-center space-x-16">
									<Button
										variant="outline"
										size={"icon"}
										className="p-1"
										onClick={() => setGoal(goal - 20)}
									>
										-
									</Button>
									<div className="flex flex-col items-center justify-center s">
										<h1 className="text-5xl font-bold">{goal}</h1>
										<p className=" text-xs text-muted-foreground font-semibold">
											CALORIES/DAY
										</p>
									</div>
									<Button
										variant="outline"
										size={"icon"}
										className="p-1"
										onClick={() => setGoal(goal + 20)}
									>
										+
									</Button>
								</div>

								<div className="mt-4 h-32">
									<ResponsiveContainer width="100%" aspect={3}>
										<LineChart data={data}>
											<YAxis dataKey="caloriesTarget" />
											<Line
												dataKey="caloriesBurned"
												className="stroke-primary"
											/>
											<Line
												dataKey="caloriesTarget"
												className="stroke-cyan-500 stroke-2"
											/>
											<Legend
												verticalAlign="bottom"
												iconType="diamond"
												margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
												height={2}
												onMouseEnter={handleMouseEnter}
												onMouseLeave={handleMouseOut}
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full">Set Goal</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			<div className="flex flex-col sm:flex-row gap-5 items-center my-4">
				<Card className="w-[50%]">
					<CardHeader>
						<CardTitle className="text-2xl">Weekly Goal</CardTitle>
						<p className="text-muted-foreground font-semibold text-sm">
							Set you daily activity goal
						</p>
					</CardHeader>
					<CardContent>
						<div className="flex justify-center items-center space-x-16">
							<Button
								variant="outline"
								size={"icon"}
								className="p-1"
								onClick={() => setGoal(goal - 20)}
							>
								-
							</Button>
							<div className="flex flex-col items-center justify-center s">
								<h1 className="text-5xl font-bold">{goal}</h1>
								<p className=" text-xs text-muted-foreground font-semibold">
									CALORIES/DAY
								</p>
							</div>
							<Button
								variant="outline"
								size={"icon"}
								className="p-1"
								onClick={() => setGoal(goal + 20)}
							>
								+
							</Button>
						</div>

						<div className="mt-4 h-32">
							<ResponsiveContainer width="100%" aspect={3}>
								<BarChart data={data}>
									<YAxis dataKey="caloriesTarget" />
									<Bar
										dataKey="caloriesTarget"
										className={`fill-primary ${opacity.caloriesTarget}`}
									/>
									<Bar
										dataKey="caloriesBurned"
										className={`fill-red-500 ${opacity.caloriesBurned}`}
									/>
									<CartesianGrid />
									<Legend
										verticalAlign="bottom"
										iconType="diamond"
										height={6}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseOut}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Set Goal</Button>
					</CardFooter>
				</Card>
				{/* //! line graph */}
				<Card className="w-[50%]">
					<CardHeader>
						<CardTitle className="text-2xl">Weekly Goal</CardTitle>
						<p className="text-muted-foreground font-semibold text-sm">
							Set you daily activity goal
						</p>
					</CardHeader>
					<CardContent>
						<div className="flex justify-center items-center space-x-16">
							<Button
								variant="outline"
								size={"icon"}
								className="p-1"
								onClick={() => setGoal(goal - 20)}
							>
								-
							</Button>
							<div className="flex flex-col items-center justify-center s">
								<h1 className="text-5xl font-bold">{goal}</h1>
								<p className=" text-xs text-muted-foreground font-semibold">
									CALORIES/DAY
								</p>
							</div>
							<Button
								variant="outline"
								size={"icon"}
								className="p-1"
								onClick={() => setGoal(goal + 20)}
							>
								+
							</Button>
						</div>

						<div className="mt-4 h-32">
							<ResponsiveContainer width="100%" aspect={3}>
								<LineChart data={data}>
									<YAxis dataKey="caloriesTarget" />
									<Line dataKey="caloriesBurned" className="fill-primary" />
									<Line dataKey="caloriesTarget" className="fill-secondary" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Set Goal</Button>
					</CardFooter>
				</Card>
			</div>
			<div>
				<ResponsiveContainer width="100%" aspect={1}>
					<RadarChart data={radarData}>
						<PolarGrid />
						<PolarAngleAxis dataKey="day" />
						<PolarRadiusAxis angle={30} domain={[0, 100]} />
						<Radar
							dataKey="endurance"
							fillOpacity={0.6}
							className="fill-red-500"
						/>
						<Radar
							dataKey="strength"
							fillOpacity={0.6}
							className="fill-primary"
						/>
						<Radar
							dataKey="flexibility"
							fillOpacity={0.6}
							className="fill-cyan-500"
						/>

						<Tooltip />
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
