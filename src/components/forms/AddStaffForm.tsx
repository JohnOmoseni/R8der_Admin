import { useFormik } from "formik";
import { InferType } from "yup";
import { AddStaffSchema } from "@/schema/validation";
import { toast } from "sonner";
import { SelectItem } from "../ui/select";
import { Envelope } from "@/constants/icons";
import { ROLE } from "@/types";
import { useNavigate } from "react-router-dom";
import { useAddStaff } from "@/hook/useStaffs";

import FormWrapper from "./FormWrapper";
import CustomFormField, { FormFieldType } from "./CustomFormField";

const AddStaffForm = () => {
	const newStaffMutation = useAddStaff();
	const navigate = useNavigate();

	const roles = [
		{
			value: "ADMIN",
			label: "Admin",
		},
		{ value: "STAFF", label: "STAFF" },
	];

	const onSubmit = async (values: InferType<typeof AddStaffSchema>) => {
		try {
			const data = {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				roleStatus: values.role as ROLE,
			};

			await newStaffMutation.mutateAsync(data);
			toast.success("Staff added successfully");
			navigate("/dashboard/staffs/add-staff/success");
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
			firstName: "",
			lastName: "",
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
				name="firstName"
				label="First Name"
				field={{ value: values.firstName, placeholder: "John" }}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="lastName"
				label="Last Name"
				field={{ value: values.lastName, placeholder: "Doe" }}
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
				selectList={roles}
			>
				{roles?.map((role) => (
					<SelectItem
						key={role.value}
						value={role.value}
						className="shad-select-item"
					>
						{role.label}
					</SelectItem>
				))}
			</CustomFormField>
		</FormWrapper>
	);
};

export default AddStaffForm;
