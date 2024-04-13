"use client";
import React from "react";
import Link from "next/link";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { Button } from "./ui/button";

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

			<div className="hidden md:flex space-x-1 items-center">
				<Button size={"lg"} className="flex">
					<Link href="/login" className="flex items-center ">
						<FaSignInAlt className="mr-2" />
						Login
					</Link>
				</Button>
				<Button size={"lg"} variant={"outline"}>
					<Link href="/signup" className="flex items-center ">
						<FaUserCircle className="mr-2" />
						Register
					</Link>
				</Button>
			</div>

			<div className="md:hidden">
				<Button size={"lg"} className="flex">
					<Link href="/login" className="flex items-center ">
						<FaSignInAlt className="mr-2" />
						Login
					</Link>
				</Button>
			</div>
		</nav>
	);
};

export default Navbar;
