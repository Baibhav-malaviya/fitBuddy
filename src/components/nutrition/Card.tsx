import Image from "next/image";

const NutritionPlanCard = ({
	type,
	imageUrl,
}: {
	type: string;
	imageUrl: string;
}) => {
	const renderContent = () => {
		switch (type) {
			case "veg":
				return (
					<>
						<h3 className="text-3xl font-bold text-white mb-4">
							Vegetarian Nutrition Plan
						</h3>
						<p className="text-lg text-gray-300 mb-6">
							Discover the power of plant-based nutrition with our delicious and
							nutritious vegetarian meal plans, designed to fuel your body and
							promote overall wellness.
						</p>
					</>
				);
			case "non-veg":
				return (
					<>
						<h3 className="text-3xl font-bold text-white mb-4">
							Non-Vegetarian Nutrition Plan
						</h3>
						<p className="text-lg text-gray-300 mb-6">
							Indulge in a balanced blend of plant and animal-based proteins
							with our carefully crafted non-vegetarian meal plans, ensuring you
							receive the essential nutrients for optimal performance.
						</p>
					</>
				);
			case "balanced":
				return (
					<>
						<h3 className="text-3xl font-bold text-white mb-4">
							Balanced Nutrition Plan
						</h3>
						<p className="text-lg text-gray-300 mb-6">
							Embrace a holistic approach to nutrition with our balanced meal
							plans, combining the best of both vegetarian and non-vegetarian
							options for a well-rounded and sustainable dietary lifestyle.
						</p>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className="relative group w-auto h-auto ">
			<Image
				src={imageUrl}
				alt={`${type} Nutrition Plan`}
				height={500}
				width={800}
				className="w-full h-auto rounded-lg shadow-md"
				style={{ filter: "brightness(0.6)" }}
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				{renderContent()}
				<button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300">
					Learn More
				</button>
			</div>
		</div>
	);
};

export default NutritionPlanCard;
