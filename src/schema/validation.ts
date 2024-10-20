import * as yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const SignUpSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const PasswordSchema = yup.object().shape({
	current_password: yup.string(),
	new_password: yup
		.string()
		.min(8, "New password must be at least 8 characters")
		.matches(
			passwordRegex,
			"New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
		)
		.required("New password is required"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("new_password"), undefined], "Passwords must match")
		.required("Please confirm your new password"),
});

export const AddStaffSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters")
		.required("Field is required"),
	lastName: yup
		.string()
		.min(2, "Name must be at least 2 characters")
		.required("Field is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Field is required"),
	role: yup
		.mixed()
		.oneOf(["ADMIN", "STAFF"], "Role must be either 'Admin' or 'Staff'")
		.required("Field is required"),
});

export const CouponSchema = yup.object().shape({
	title: yup
		.string()
		.min(2, "Name must be at least 2 characters")
		.required("Field is required"),
	description: yup
		.string()
		.min(2, "Name must be at least 2 characters")
		.required("Field is required"),
	discountType: yup
		.string()
		.nullable()
		.oneOf(
			["PERCENTAGE", "FIXED"],
			"Discount type can be either Percentage or Fixed"
		)
		.required("Field is required"),
	amount: yup.string().required("Field is required"),
	target: yup
		.string()
		.nullable()
		.oneOf(
			["DRIVERS", "CUSTOMERS"],
			"Coupon Target can be either Drivers or Customers"
		)
		.required("Field is required"),
	expiryDate: yup.date().required("Field is required"),
});

export const ConfigSchema = yup.object().shape({
	customerBasicFee: yup.number(),
	customerLuxuryFee: yup.number(),
	driverCommissionAmount: yup.number().min(2, "Too low").max(5000, "Too high"),
	driverCommissionType: yup.string(),
});
