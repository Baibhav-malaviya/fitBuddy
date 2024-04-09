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
} from "react-icons/fa";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-light-bg dark:bg-dark-bg border-b-[1px] dark:border-dark-text border-light-text text-light-text dark:text-dark-text py-4 px-6 flex justify-between items-center">
			<div className="flex items-center">
				<Link href="/" className="font-bold text-pink-600 text-lg mr-4">
					FitTracker
				</Link>
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
						className="flex items-center hover:bg-blue-500/20 p-[3px] px-2 rounded hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
					>
						<FaRunning className="mr-2 text-light-primary" />

						<span className="md:hidden lg:inline">Workouts</span>
					</Link>
					<Link
						href="/nutrition"
						className="flex items-center hover:bg-green-500/20 p-[3px] px-2 rounded hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300"
					>
						<FaUtensils className="mr-2 text-dark-secondary" />

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

			<div className="hidden md:flex  items-center">
				<button className="flex items-center hover:text-indigo-500 dark:text-indigo-500 mr-4 transition duration-300">
					<FaBell className="mr-2 text-indigo-500" />
					Reminders
				</button>
				<button className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-white font-bold py-2 px-4 rounded mr-4 transition duration-300">
					Set Goals
				</button>
				<Link
					href="/profile"
					className="flex items-center hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
				>
					<FaUserCircle className="mr-2" />
				</Link>
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
						className="flex items-center hover:bg-blue-500/20 p-[3px] px-2 rounded hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
					>
						<FaRunning className="mr-2 text-light-primary" />

						<span className="md:hidden lg:inline">Workouts</span>
					</Link>
					<Link
						href="/nutrition"
						className="flex items-center hover:bg-green-500/20 p-[3px] px-2 rounded hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300"
					>
						<FaUtensils className="mr-2 text-dark-secondary" />

						<span className="md:hidden lg:inline">Nutrition</span>
					</Link>
					<Link
						href="/community"
						className="flex items-center hover:bg-red-500/20 p-[3px] px-2  rounded hover:text-orange-500 dark:hover:text-orange-500 transition duration-300"
					>
						<FaComments className="mr-2 text-orange-500" />

						<span className="md:hidden lg:inline">Community</span>
					</Link>
					<button className="flex items-center py-2 hover:text-light-primary dark:hover:text-dark-primary transition duration-300">
						<FaBell className="mr-2" />
						Reminders
					</button>
					<button className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
						Set Goals
					</button>
					<Link
						href="/profile"
						className="flex items-center py-2 hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
					>
						<FaUserCircle className="mr-2" />
						Profile
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
