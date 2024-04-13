"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
	FaUserCircle,
	FaHome,
	FaChartBar,
	FaRunning,
	FaUtensils,
	FaComments,
	FaBell,
	FaBars,
	FaTimes,
	FaMoon,
	FaSun,
} from "react-icons/fa";
import { Button } from "./ui/button";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [isDark, setIsDark] = useState(true);

	const toggleTheme = () => {
		const htmlElement = document.documentElement;

		htmlElement.classList.remove(isDark ? "dark" : "light");
		htmlElement.classList.add(!isDark ? "dark" : "light");

		setIsDark(!isDark);
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-light-bg dark:bg-dark-bg border-b-[1px] dark:border-dark-text border-light-text text-light-text dark:text-dark-text py-4 px-6 flex justify-between items-center">
			<div className="flex items-center">
				<Link href="/" className="font-bold text-pink-600 text-lg mr-4">
					FitTracker
				</Link>
				{/* For desktop */}
				<div className="hidden md:flex space-x-4">
					<Link
						href="/dashboard"
						className="flex relative hover:bg-yellow-500/20 group p-[3px] px-2 md:py-2 lg:py-[3px] rounded-md items-center hover:text-yellow-500 dark:hover:text-yellow-500 transition duration-300"
					>
						<FaHome className="mr-2 text-yellow-500" />
						<span className="md:hidden lg:inline">Dashboard</span>
						{/* <span className="absolute text-xs font-light top-full left-4 bg-black/90 p-[2px] rounded text-gray-50 group-hover:inline  hidden ">
							Dashboard
						</span> */}
					</Link>
					<Link
						href="/progress"
						className="flex items-center hover:bg-red-500/20 p-[3px] px-2 rounded hover:text-red-500 dark:hover:text-red-500 transition duration-300"
					>
						<FaChartBar className="mr-2 text-red-500" />

						<span className="md:hidden lg:inline">Progress</span>
					</Link>
					<Link
						href="/workouts"
						className="flex items-center hover:bg-blue-500/20 p-[3px] px-2 rounded hover:text-blue-500 transition duration-300"
					>
						<FaRunning className="mr-2 text-blue-500" />

						<span className="md:hidden lg:inline">Workouts</span>
					</Link>
					<Link
						href="/nutrition"
						className="flex items-center hover:bg-green-500/20 p-[3px] px-2 rounded hover:text-green-500 transition duration-300"
					>
						<FaUtensils className="mr-2 text-green-500" />

						<span className="md:hidden lg:inline">Nutrition</span>
					</Link>
					<Link
						href="/community"
						className="flex items-center hover:bg-red-500/20 p-[3px] px-2  rounded hover:text-orange-500 dark:hover:text-orange-500 transition duration-300"
					>
						<FaComments className="mr-2 text-orange-500" />

						<span className="md:hidden lg:inline">Community</span>
					</Link>
				</div>
			</div>

			<div className="hidden md:flex  items-center space-x-2">
				<Button variant={"outline"}>
					{" "}
					<FaBell className="mr-2 text-indigo-500" />
					Reminders
				</Button>

				<Button>Set Goals</Button>
				<Link
					href="/profile"
					className="flex items-center hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
				>
					<FaUserCircle className="mr-2" />
				</Link>
				<button
					onClick={toggleTheme}
					className="p-2 shadow-md dark:shadow-md dark:shadow-gray-700 rounded-full "
				>
					{isDark ? <FaSun /> : <FaMoon />}
				</button>
			</div>

			<div className="md:hidden">
				<button
					onClick={toggleMenu}
					className="text-light-text dark:text-dark-text transition duration-300"
				>
					{isOpen ? (
						<FaTimes className="text-2xl" />
					) : (
						<FaBars className="text-2xl" />
					)}
				</button>
			</div>

			<div
				className={`md:hidden ${
					isOpen ? "block" : "hidden"
				} transition duration-500 ease-in-out`}
			>
				<div className="flex flex-col mt-4 space-y-2">
					<Link
						href="/dashboard"
						className="flex items-center hover:bg-yellow-500/20 p-[3px] px-2 rounded hover:text-yellow-500 dark:hover:text-yellow-500 transition duration-300"
					>
						<FaHome className="mr-2 text-yellow-500" />
						Dashboard
					</Link>
					<Link
						href="/progress"
						className="flex items-center hover:bg-red-500/20 p-[3px] px-2 rounded hover:text-red-500 dark:hover:text-red-500 transition duration-300"
					>
						<FaChartBar className="mr-2 text-red-500" />

						<span className="md:hidden lg:inline">Progress</span>
					</Link>
					<Link
						href="/workouts"
						className="flex items-center hover:bg-blue-500/20 p-[3px] px-2 rounded hover:text-blue-500 transition duration-300"
					>
						<FaRunning className="mr-2 text-blue-500" />

						<span className="md:hidden lg:inline">Workouts</span>
					</Link>
					<Link
						href="/nutrition"
						className="flex items-center hover:bg-green-500/20 p-[3px] px-2 rounded hover:text-green-500 transition duration-300"
					>
						<FaUtensils className="mr-2 text-green-500" />

						<span className="md:hidden lg:inline">Nutrition</span>
					</Link>
					<Link
						href="/community"
						className="flex items-center hover:bg-red-500/20 p-[3px] px-2  rounded hover:text-orange-500 dark:hover:text-orange-500 transition duration-300"
					>
						<FaComments className="mr-2 text-orange-500" />

						<span className="md:hidden lg:inline">Community</span>
					</Link>
					<Button variant={"outline"}>
						{" "}
						<FaBell className="mr-2 text-indigo-500" />
						Reminders
					</Button>
					<Button>Set Goals</Button>
					<Link
						href="/profile"
						className="flex items-center py-2 hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
					>
						<FaUserCircle className="mr-2" />
						Profile
					</Link>
					<div>
						<button
							onClick={toggleTheme}
							className="p-2 shadow-md dark:shadow-md dark:shadow-gray-700 rounded-full "
						>
							{isDark ? <FaSun /> : <FaMoon />}
						</button>
						<span className="ml-2">Theme</span>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
