import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import NavbarBeforeAuth from "@/components/NavbarBeforeAuth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fit Buddy",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark  ">
			<body className={`${inter.className}  `}>
				<Navbar />
				<NavbarBeforeAuth />
				<Main>{children}</Main>
				<Toaster />
			</body>
		</html>
	);
}
