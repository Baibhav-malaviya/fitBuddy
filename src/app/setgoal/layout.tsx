import React from "react";
import Link from "next/link";
import { GiAchievement } from "react-icons/gi";
import { GiOnTarget } from "react-icons/gi";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className=" w-full flex flex-col space-x-2 md:px-10">
			<div className="mt-2 flex space-x-1">
				<Link
					href={"/setgoal/goal"}
					className="flex items-center hover:bg-violet-500/20 p-[3px] px-2 rounded hover:text-violet-500 transition duration-300"
				>
					<GiOnTarget className="mr-2 text-lg text-violet-500" />

					<span className="">Goals</span>
				</Link>

				<Link
					href={"/setgoal/achievement"}
					className="flex items-center hover:bg-rose-500/20 p-[3px] px-2 rounded hover:text-rose-500 transition duration-300"
				>
					<GiAchievement className="mr-2 text-lg text-rose-500" />

					<span className="">Achievement</span>
				</Link>
			</div>
			<div>{children}</div>
		</div>
	);
}
