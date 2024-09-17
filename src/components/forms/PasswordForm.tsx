import { useState } from "react";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import { InferType } from "yup";
import { useFormik } from "formik";
import { PasswordSchema } from "@/schema/validation";
import { cn } from "@/lib/utils";
import { Alert, CheckCircle, Lock } from "@/constants/icons";

function PasswordForm({ user }: { user?: any }) {
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (values: InferType<typeof PasswordSchema>) => {
		setIsLoading(true);
		console.log(values);
	};

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				current_password: user?.currentPassword || "123456",
				new_password: "123456",
				confirm_password: "123456",
			},
			validationSchema: PasswordSchema,
			onSubmit,
		});

	return (
		<FormWrapper
			buttonLabel="Save"
			onSubmit={handleSubmit}
			isSubmitting={isLoading}
			containerStyles="mt-0"
			btnStyles="!w-max !ml-auto"
		>
			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="current_password"
				label="Current password"
				field={{
					value: values.current_password,
					type: "password",
				}}
				iconSrc={Lock}
				onChange={handleChange}
			/>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="new_password"
				label="New Password"
				field={{ value: values.new_password, type: "password" }}
				iconSrc={Lock}
				onChange={handleChange}
			/>

			<div className="relative w-full pb-4">
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					name="confirm_password"
					label="Confirm new password"
					field={{ value: values.confirm_password, type: "password" }}
					iconSrc={Lock}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
				/>

				<span
					className={cn(
						"ml-0.5 mt-1.5 mb-2 hidden text-xs",
						touched?.["confirm_password"] && "row-flex-start gap-1"
					)}
				>
					{errors?.["confirm_password"] && touched?.["confirm_password"] ? (
						<>
							<Alert size={16} className="error-text" />
							<span className="error-text">{errors?.["confirm_password"]}</span>
						</>
					) : (
						!errors?.["confirm_password"] &&
						touched?.["confirm_password"] && (
							<>
								<CheckCircle className="size-5 success-text" />
								<span className="success-text">Password Matched</span>
							</>
						)
					)}
				</span>
			</div>
		</FormWrapper>
	);
}

export default PasswordForm;
