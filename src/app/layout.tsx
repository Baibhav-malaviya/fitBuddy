import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import NavbarBeforeAuth from "@/components/NavbarBeforeAuth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fit Buddy",
	description:
		"This is a work-out tracker app, it will also guide you to achieve your fitness goal by tracking your daily workout and by suggesting you a good diet.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}  `}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<NavbarBeforeAuth />
					<Main>{children}</Main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
