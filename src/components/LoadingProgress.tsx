// components/LoadingBar.js
"use client";
import Router from "next/router";
import { useEffect, useState } from "react";

const LoadingBar = () => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => {
			setLoading(true);
		};
		const handleStop = () => {
			setLoading(false);
		};

		Router.events.on("routeChangeStart", handleStart);
		Router.events.on("routeChangeComplete", handleStop);
		Router.events.on("routeChangeError", handleStop);

		return () => {
			Router.events.off("routeChangeStart", handleStart);
			Router.events.off("routeChangeComplete", handleStop);
			Router.events.off("routeChangeError", handleStop);
		};
	}, []);

	return (
		<div>
			{loading && (
				<div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse"></div>
			)}
		</div>
	);
};

export default LoadingBar;
