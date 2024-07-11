import React from "react";
import Image from "next/image";

const LandingPage = () => {
	return (
		<section className="flex flex-col gap-5">
			<div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
				<div className="w-full mx-auto px-4 py-8 rounded-lg shadow-md">
					<div className="relative mb-12">
						<Image
							src={"/fit-buddy2.jpg"}
							alt="Fitness Banner"
							height={500}
							width={1000}
							className="w-full h-auto rounded-lg shadow-md"
							style={{ filter: "blur(2px) brightness(0.6)" }}
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
							<header className="mb-8">
								<h1 className="text-5xl font-bold tracking-wide mb-2 text-white drop-shadow-lg">
									Welcome to FitLife Revolution!
								</h1>
								<p className="text-xl italic text-gray-300 drop-shadow-md">
									Transform Your Body, Transform Your Life
								</p>
							</header>
							<h2 className="text-5xl font-bold text-white drop-shadow-lg">
								Get Fit, Stay Motivated
							</h2>
						</div>
					</div>

					<section className="text-center mb-12">
						<h2 className="text-3xl font-semibold mb-6">Why Choose FitLife?</h2>
						<ul className="text-left space-y-4 ">
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<strong>Customized Workouts:</strong> Tailored fitness programs
								designed to fit your unique goals and lifestyle.
							</li>
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<strong>Expert Trainers:</strong> Learn from the best in the
								industry, with tips, tricks, and techniques to maximize your
								results.
							</li>
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<strong>Community Support:</strong> Join a vibrant community of
								fitness enthusiasts who will motivate and inspire you to stay on
								track.
							</li>
						</ul>
					</section>

					<section className="text-center mb-12">
						<h2 className="text-3xl font-semibold mb-4">
							Start Your Journey Today!
						</h2>
						<p className="mb-6 ">
							Whether you&apos;re a beginner or a seasoned athlete, our
							resources are designed to help you achieve your fitness goals.
						</p>
						<button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300">
							Join Now and Get Started!
						</button>
					</section>

					<section className="text-center">
						<h2 className="text-3xl font-semibold mb-4">
							Get Fit. Stay Healthy. Live Better.
						</h2>
						<p className="mb-6 ">Click below to start your transformation!</p>
						<button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300">
							Start Your Free Trial
						</button>
					</section>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
