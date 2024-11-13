import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import { InferType } from "yup";
import { useFormik } from "formik";
import { PasswordSchema } from "@/schema/validation";
import { cn } from "@/lib/utils";
import { Alert, CheckCircle, Lock } from "@/constants/icons";
import { toast } from "sonner";
import { useUpdatePassword } from "@/hook/useSettings";

function PasswordForm({ user }: { user?: any }) {
	const changePasswordMutation = useUpdatePassword();

	const onSubmit = async (values: InferType<typeof PasswordSchema>) => {
		try {
			const payload = {
				oldPassword: values.current_password!,
				newPassword: values.new_password,
				confirmNewPassword: values.confirm_password,
			};

			const res = await changePasswordMutation.mutateAsync(payload);
			toast.success(res?.message || "Password changed successfully");
		} catch {
			toast.error(
				`${changePasswordMutation.error?.message || "Error updating password."}`
			);
		}
	};

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				current_password: user?.currentPassword || "",
				new_password: "",
				confirm_password: "",
			},
			validationSchema: PasswordSchema,
			onSubmit,
		});

	return (
		<FormWrapper
			buttonLabel="Save"
			onSubmit={handleSubmit}
			isSubmitting={changePasswordMutation.isPending}
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
				errors={errors}
				touched={touched}
			/>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="new_password"
				label="New Password"
				field={{ value: values.new_password, type: "password" }}
				iconSrc={Lock}
				onChange={handleChange}
				errors={errors}
				touched={touched}
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
						!errors?.["new_password"] &&
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
