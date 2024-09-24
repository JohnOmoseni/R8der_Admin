import { Button } from "@/components/CustomButton";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { Envelope, Lock, Logo } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

function SignIn() {
	const { handleLogin, isLoadingAuth } = useAuth();

	const onSubmit = async (values: InferType<typeof SignUpSchema>) => {
		console.log("Form submitted:", values);

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
		<div className="fixed h-full w-full overflow-hidden bg-[#033678] px-3 py-6">
			<Link to="#" className="row-flex mx-auto w-[96%] px-3">
				<Logo className="h-fit w-16 object-contain text-center" />
			</Link>

			<div className="absolute left-1/2 top-1/2 mt-10 min-h-[320px] min-w-[300px] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background px-5 py-6 shadow-sm min-[450px]:w-full">
				<div className="flex-column gap-4">
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
				</div>
			</div>
		</div>
	);
}

export default SignIn;
