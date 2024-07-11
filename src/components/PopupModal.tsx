import React, { ReactNode, useEffect } from "react";
import { Button } from "./ui/button";

interface PopupModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	content: ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
	isOpen,
	setIsOpen,
	content,
}) => {
	useEffect(() => {
		// Add the overflow-hidden class to the body element when the modal is open
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			// Remove the overflow-hidden class from the body element when the modal is closed
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpen]);
	return (
		<div
			className={`fixed  inset-0 z-50  flex items-center justify-center px-1 sm:px-0 ${
				isOpen ? "visible" : "invisible"
			}`}
		>
			<div className="absolute inset-0 bg-black opacity-70"></div>
			<div
				className={`relative overflow-y-scroll h-auto max-h-screen rounded-lg p-8 dark:border-[1.5px] shadow-md   min-w-full sm:min-w-96 w-auto bg-background text-foreground `}
			>
				<Button
					variant={"destructive"}
					size={"icon"}
					className="absolute top-4 right-4 "
					onClick={() => setIsOpen(false)}
				>
					<svg
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</Button>
				{content}
			</div>
		</div>
	);
};

export default PopupModal;

{
	/* <form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-light-text dark:text-dark-text font-bold mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-light-text dark:text-dark-text leading-tight focus:outline-none focus:shadow-outline bg-light-bg dark:bg-dark-bg"
							id="name"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-light-text dark:text-dark-text font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-light-text dark:text-dark-text leading-tight focus:outline-none focus:shadow-outline bg-light-bg dark:bg-dark-bg"
							id="email"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-dark-primary dark:bg-dark-secondary hover:bg-light-primary dark:hover:bg-dark-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Submit
						</button>
					</div>
				</form> */
}
