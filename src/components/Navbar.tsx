"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
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
import { MdEdit } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { setTheme } = useTheme();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { toast } = useToast();
	const router = useRouter();
	const { data: session } = useSession();

	console.log("SESSION DATA IN NAVBAR: ", session);

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			// const response = await axios.post("/api/users/logout");
			const response = await signOut({ redirect: false });

			console.log("response in signOut NEXT-AUTH: ", response);
			toast({
				title: "Logged out successfully",
				description: "Navigating to the signup/login page.",
			});
			setIsLoading(false);
			router.push("/login");
		} catch (error) {
			setIsLoading(false);
			console.log("Error in user login");
		}
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-background border-b-[1px] border:foreground text-foreground py-4 px-6 flex justify-between items-center">
			{/* //? for logo*/}
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

				<Link href={"setgoal"}>
					<Button>Set Goals</Button>
				</Link>

				{/* working on it */}
				<Sheet>
					<SheetTrigger>
						{/* //todo avatar */}
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>
								<h2 className="text-2xl font-semibold ">Profile</h2>
							</SheetTitle>
							<SheetDescription>
								<div className="flex flex-col py-5 items-center justify-center space-y-1">
									<div className=" relative">
										<FaUserCircle size={70} />
										<Button
											size={"icon"}
											className="absolute -right-1 -bottom-1"
										>
											<Link href={"/profile"}>
												<MdEdit
													size={20}
													// className="absolute right-1 bottom-[2px]"
												/>
											</Link>
										</Button>
									</div>
									<h3 className="text-xl font-semibold">Your name</h3>
									<p>+91{maskPhoneNumber("7323913924")}</p>
								</div>

								{/* dropdown for appearance and logout */}
								<div className="flex justify-around mt-5 px-4">
									<DropdownMenu>
										<DropdownMenuTrigger>
											{" "}
											<Button variant={"outline"}>Appearance</Button>
										</DropdownMenuTrigger>

										<DropdownMenuContent>
											<DropdownMenuItem onClick={() => setTheme("light")}>
												Light
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={() => setTheme("dark")}>
												Dark
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={() => setTheme("system")}>
												System
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<div>
										<Button
											variant={"outline"}
											onClick={handleLogout}
											disabled={isLoading}
											className={`flex items-center space-x-1 ${
												isLoading && "opacity-85"
											}`}
										>
											<MdLogout />
											<span>Logout</span>
										</Button>
									</div>
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>

				{/* <button
					onClick={toggleTheme}
					className="p-2 shadow-md dark:shadow-md dark:shadow-gray-700 rounded-full "
				>
					{isDark ? <FaSun /> : <FaMoon />}
				</button> */}
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
			{/* for mobile responsive */}
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
					<Sheet>
						<SheetTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>
									<h2 className="text-2xl font-semibold ">Profile</h2>
								</SheetTitle>
								<SheetDescription>
									<div className="flex flex-col py-5 items-center justify-center space-y-1">
										<div className=" relative">
											<FaUserCircle size={70} />
											<Button
												size={"icon"}
												className="absolute -right-1 -bottom-1"
											>
												<Link href={"/profile"}>
													<MdEdit
														size={20}
														// className="absolute right-1 bottom-[2px]"
													/>
												</Link>
											</Button>
										</div>
										<h3 className="text-xl font-semibold">Your name</h3>
										<p>+91{maskPhoneNumber("7323913924")}</p>
									</div>
									{/* dropdown for appearance */}
									<div className="flex justify-around space-x-1 mt-5 px-2">
										<DropdownMenu>
											<DropdownMenuTrigger>
												{" "}
												<Button variant={"outline"} size={"sm"}>
													Appearance
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent>
												<DropdownMenuItem onClick={() => setTheme("light")}>
													Light
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={() => setTheme("dark")}>
													Dark
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={() => setTheme("system")}>
													System
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										<div>
											<Button
												variant={"outline"}
												size={"sm"}
												onClick={handleLogout}
												disabled={isLoading}
												className={`flex items-center space-x-1 ${
													isLoading && "opacity-85"
												}`}
											>
												<MdLogout />
												<span>Logout</span>
											</Button>
										</div>
									</div>
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

function maskPhoneNumber(phoneNumber: string): string {
	// Check if phoneNumber is a valid phone number (you may need more robust validation)
	if (!phoneNumber || phoneNumber.length < 6) {
		return "Invalid phone number";
	}

	// Extract first digit and last four digits
	const firstDigit = phoneNumber[0];
	const lastFourDigits = phoneNumber.slice(-4);

	// Replace middle digits with *
	const maskedMiddle = "*".repeat(phoneNumber.length - 5);

	// Concatenate first digit, masked middle, and last four digits
	const maskedNumber = `${firstDigit}${maskedMiddle}${lastFourDigits}`;

	return maskedNumber;
}
