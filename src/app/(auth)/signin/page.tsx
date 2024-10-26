import { Button } from "@/components/CustomButton";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { useLayoutEffect } from "react";
import { routes } from "@/constants";
import { useNavigate } from "react-router-dom";

function SignIn() {
	const { handleLogin, isLoadingAuth, user, token } = useAuth();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (token && user?.otpVerified) {
			navigate(routes.DASHBOARD);
		}
	}, [user, token]);

	const onSubmit = async (values: InferType<typeof SignUpSchema>) => {
		await handleLogin(values?.email, values?.password);
	};

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: SignUpSchema,
		onSubmit,
	});

	return (
		<>
			<div className="flex-column gap-1.5">
				<h3 className="text-2xl">Sign in</h3>
				<p className="whitespace-normal leading-5 tracking-wide text-foreground-100 min-[500px]:w-max">
					Welcome, let’s sign you in to your account
				</p>
			</div>

			<div className="pt-4">
				<form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
					<div className="flex-column gap-5">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="email"
							label="Email address"
							field={{
								value: values.email,
								placeholder: "user@gmail.com",
								type: "email",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Envelope}
							touched={touched}
							tag="auth"
							inputStyles="h-10"
						/>

						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="password"
							label="Password"
							field={{
								value: values.password,
								type: "password",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Lock}
							touched={touched}
							tag="auth"
							inputStyles="h-10"
						/>
					</div>
					<Button
						type="submit"
						title={isSubmitting ? "Submitting..." : "Sign in"}
						className={cn("!mt-auto !w-full !py-5")}
						disabled={isLoadingAuth}
						isLoading={isLoadingAuth}
					/>
				</form>
			</div>
		</>
	);
}

export default SignIn;
