"use client";
import React from "react";
import Link from "next/link";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav className="bg-light-bg dark:bg-dark-bg border-b-[1px] dark:border-dark-text border-light-text text-light-text dark:text-dark-text py-4 px-6 flex justify-between items-center">
			<div className="flex items-center">
				<Link href="/" className="font-bold text-pink-600 text-lg mr-4">
					FitTracker
				</Link>
				<div className="hidden md:flex space-x-4">
					<Link
						href="/about"
						className="hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
					>
						About
					</Link>
					<Link
						href="/features"
						className="hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
					>
						Features
					</Link>
				</div>
			</div>

			<div className="hidden md:flex items-center">
				<Link
					href="/login"
					className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 flex items-center"
				>
					<FaSignInAlt className="mr-2" />
					Login
				</Link>
				<Link
					href="/signup"
					className="flex items-center hover:text-light-primary dark:hover:text-dark-primary transition duration-300"
				>
					<FaUserCircle className="mr-2" />
					Register
				</Link>
			</div>

			<div className="md:hidden">
				<Link
					href="/login"
					className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 flex items-center"
				>
					<FaSignInAlt className="mr-2" />
					Login
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
