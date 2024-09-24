import { useState } from "react";
import { useFormik } from "formik";
import { InferType } from "yup";
import { AddStaffSchema } from "@/schema/validation";
import { toast } from "sonner";

import FormWrapper from "./FormWrapper";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { SelectItem } from "../ui/select";
import { Envelope } from "@/constants/icons";
import { useAddStaff } from "@/hook/usePostQuery";
import { ROLE } from "@/types";
import { useNavigate } from "react-router-dom";

const AddStaffForm = () => {
	const newStaffMutation = useAddStaff();
	const navigate = useNavigate();

	const onSubmit = async (values: InferType<typeof AddStaffSchema>) => {
		console.log(values);

		try {
			const data = {
				fullName: values.name,
				email: values.email,
				roleStatus: values.role as ROLE,
			};

			await newStaffMutation.mutateAsync(data);
			toast.success("Staff added successfully");
			navigate("/dashboard/add-staff/success");
		} catch {
			toast.error("Error adding staff");
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
			name: "",
			email: "",
			role: "",
		},
		validationSchema: AddStaffSchema,
		onSubmit,
	});

	return (
		<FormWrapper
			buttonLabel="Add Staff"
			onSubmit={handleSubmit}
			isSubmitting={newStaffMutation?.isPending}
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
				<SelectItem value="ADMIN" className="shad-select-item">
					Admin
				</SelectItem>
				<SelectItem value="STAFF" className="shad-select-item">
					Staff
				</SelectItem>
			</CustomFormField>
		</FormWrapper>
	);
};

export default AddStaffForm;
