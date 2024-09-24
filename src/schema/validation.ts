import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const PasswordSchema = yup.object().shape({
	current_password: yup.string().required("Current password is required"),
	new_password: yup
		.string()
		.min(6, "New password must be at least 6 characters")
		.required("New password is required"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("new_password"), undefined], "Passwords must match")
		.required("Please confirm your new password"),
});

export const AddStaffSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters")
		.required("Field is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Field is required"),
	role: yup
		.mixed()
		.oneOf(["ADMIN", "STAFF"], "Role must be either 'admin' or 'staff'")
		.required("Field is required"),
});

export const CongfigSchema = yup.object().shape({
	customerBasicFee: yup.number().min(2, "Too low").max(5000, "Too high"),
	customerLuxuryFee: yup.number().min(2, "Too low").max(5000, "Too high"),
	driverComissionAmount: yup.number().min(2, "Too low").max(5000, "Too high"),
	driverComissionType: yup.string(),
});
