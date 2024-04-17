import { z } from "zod";

//! here order of the validation matters
export const passwordSchema = z
	.string()
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/\d/, "Password must contain at least one digit")
	.regex(
		/[!@#$%^&*(),.?":{}|<>]/,
		"Password must contain at least one special character"
	)
	.min(8, "Password must be at least 8 characters long")
	.max(100, "Password must be at most 100 characters long");

export const usernameSchema = z
	.string()
	.min(3, "Username must be at least 3 characters long")
	.max(20, "Username must be at most 20 characters long")
	.regex(
		/^[a-zA-Z0-9_]+$/,
		"Username can only contain letters, numbers, and underscores"
	)
	.trim(); // Remove leading and trailing whitespace

export const emailSchema = z.string().email("Invalid email address").trim(); // Remove leading and trailing whitespace

export const signupSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: passwordSchema,
	name: z.string().min(2, "First name must be at least 2 characters long"),
});
