import React from "react";

export default function Main({ children }: any) {
	return (
		<div className="flex min-h-max flex-col items-center dark:bg-dark-bg bg-light-bg px-2 dark:text-dark-text text-light-text justify-center">
			{children}
		</div>
	);
}
