export default function getInitials(name: string | undefined = ""): string {
	// Split the name into an array of words
	const words = name.split(" ");

	// Get the first letter of the first word
	const firstInitial = words[0][0].toUpperCase();

	// Get the first letter of the last word
	const lastInitial = words[words.length - 1][0].toUpperCase();

	// Combine the initials and return
	return `${firstInitial}${lastInitial}`;
}
