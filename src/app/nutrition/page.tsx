import UnderDevelopment from "@/components/UnderDevelopment";
import NutritionCard from "@/components/NutritionCard";
import React from "react";
import Card from "@/components/nutrition/Card";

export default function page() {
	return (
		<div>
			{/* <UnderDevelopment /> */}
			<div className="flex flex-col gap-2 w-[60%] mx-auto">
				<Card type="veg" imageUrl="/nutrition-plan-bg.jpg" />
				<Card type="non-veg" imageUrl="/nutrition-plan-bg.jpg" />
				<Card type="balanced" imageUrl="/nutrition-plan-bg.jpg" />
			</div>
		</div>
	);
}
