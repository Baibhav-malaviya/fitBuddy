import React from "react";

export default function Main({ children }: any) {
	return (
		<div className="flex min-h-max flex-col items-center bg-background px-2 text-foreground justify-center">
			{children}
		</div>
	);
}
