// import { Card, Badge } from "@/components/ui/card";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/helpers";
import { CgNotes } from "react-icons/cg";

const GoalCard = ({
	goalType,
	targetValue,
	additionalDetails,
	targetCompletionDate,
	status,
}: any) => {
	const isCompleted = status === "completed";

	return (
		<Card className={isCompleted ? "opacity-50" : ""}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>{goalType}</CardTitle>
					<Badge variant={isCompleted ? "secondary" : "default"}>
						{isCompleted ? "Completed" : "Active"}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="flex items-center space-x-2">
				<CgNotes className="text-primary" />
				<p className="text-sm ">{additionalDetails}</p>
			</CardContent>
			<CardFooter className="flex flex-col items-center ">
				<div className="flex items-center  space-x-2 w-full">
					<p className="">Target Value: </p>
					<p className="text-sm ">{targetValue}</p>
				</div>
				<div className="flex items-center  space-x-2 w-full">
					<p className="text-sm font-bold">Target Completion Date</p>
					<p className="text-sm">
						{formatDate(new Date(targetCompletionDate))}
					</p>
				</div>
			</CardFooter>
		</Card>
	);
};

export default GoalCard;
