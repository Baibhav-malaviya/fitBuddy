// components/ProgressBar.js

import React from "react";

const ProgressBar = ({ progress }: any) => {
	return (
		<div className="fixed top-0 left-0 right-0 h-4">
			<div
				className="h-2 bg-blue-500 transition-all duration-500"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default ProgressBar;
