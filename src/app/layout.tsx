import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import NavbarBeforeAuth from "@/components/NavbarBeforeAuth";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/app/context/AuthProvider";
import { getServerSession } from "next-auth";
import NavbarComponent from "@/components/NavbarComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fit Buddy",
	description:
		"This is a work-out tracker app, it will also guide you to achieve your fitness goal by tracking your daily workout and by suggesting you a good diet.",
};

export default async function RootLayout({
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
					<AuthProvider>
						{/* {session ? <Navbar /> : <NavbarBeforeAuth />} */}
						<NavbarComponent />
						<Main>{children}</Main>
						<Toaster />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
