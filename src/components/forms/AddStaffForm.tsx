import { useState } from "react";
import { useFormik } from "formik";
import { InferType } from "yup";
import { AddStaffSchema } from "@/schema/validation";
import { toast } from "sonner";

import FormWrapper from "./FormWrapper";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { SelectItem } from "../ui/select";
import { Envelope } from "@/constants/icons";

const AddStaffForm = ({ user }: { user?: any }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (values: InferType<typeof AddStaffSchema>) => {
		setIsLoading(true);
		console.log(values);

		try {
		} catch {
			toast.error("Error adding staff");
			// toastNotify(toast, "Error adding staff");
		} finally {
			setIsLoading(false);
		}
	};

	const {
		values,
		errors,
		touched,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			name: user?.name || "",
			email: user?.email || "",
			role: user?.role || "",
		},
		validationSchema: AddStaffSchema,
		onSubmit,
	});

	return (
		<FormWrapper
			buttonLabel="Add Staff"
			onSubmit={handleSubmit}
			isSubmitting={isLoading}
		>
			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="name"
				label="Name"
				field={{ value: values.name, placeholder: "John Doe" }}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="email"
				label="Email address"
				field={{
					value: values.email,
					placeholder: "e.g user@gmail.com",
					type: "email",
				}}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				iconSrc={Envelope}
				touched={touched}
			/>

			<CustomFormField
				fieldType={FormFieldType.SELECT}
				name="role"
				label="Role"
				field={{ value: values.role }}
				onChange={(value: string) => {
					setFieldValue("role", value);
				}}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			>
				<SelectItem value="admin" className="shad-select-item">
					Admin
				</SelectItem>
				<SelectItem value="staff" className="shad-select-item">
					Staff
				</SelectItem>
			</CustomFormField>
		</FormWrapper>
	);
};

export default AddStaffForm;
