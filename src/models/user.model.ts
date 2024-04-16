import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	birthday?: Date;
	age?: number;
	weight?: number;
	height?: number;
	gender?: string;
	avatar?: string;
	resetPasswordToken?: string;
	resetPasswordExpires?: Date;
	emailVerificationCode?: string;
	emailVerificationCodeExpires?: Date;
	verificationToken?: string;
	verificationTokenExpires?: Date;
	isVerified: boolean;
	isEmailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	isCorrectPassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		birthday: { type: Date },
		age: { type: Number },
		weight: { type: Number },
		height: { type: Number },
		gender: { type: String, enum: ["male", "female", "other"] },
		resetPasswordToken: String,
		resetPasswordExpires: Date,
		isEmailVerified: { type: Boolean, default: false },
		emailVerificationCode: String,
		emailVerificationCodeExpires: Date,
		verificationToken: String,
		verificationTokenExpires: Date,
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.pre<IUser>("save", function (next) {
	if (this.isModified("birthday")) {
		const today = new Date();
		const birthDate = this.birthday;
		let age = today.getFullYear() - birthDate?.getFullYear()!;
		const monthDiff = today.getMonth() - birthDate?.getMonth()!;
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate?.getDate()!)
		) {
			age--;
		}
		this.age = age;
	}
	next();
});

userSchema.methods.isCorrectPassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User =
	mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
