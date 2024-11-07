import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { SelectItem } from "@/components/ui/select";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";

import FormWrapper from "@/components/forms/FormWrapper";
import TextEditor from "./TextEditor";

type CreateAnnouncementProps = {
	announcement?: any;
};

const CreateAnnouncementForm = ({}: CreateAnnouncementProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const questionTypes = [
		{ value: "MultiChoice", label: "Multiple Choice" },
		{ value: "MultiSelect", label: "Multiple Select" },
	];

	const onSubmit = async (values: any) => {
		setIsLoading(true);

		console.log("FORM VALUES", values);
		try {
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
					error.message ||
					"Error uploading question"
			);
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
			title: "",
			target: "",
			sub_target: "",
			channel: "",
			message: "",
			published_by: "",
		},
		validationSchema: "",
		onSubmit,
	});

	return (
		<FormWrapper
			btnStyles="!w-max"
			containerStyles="max-w-full"
			buttonLabel="Add question"
			onSubmit={handleSubmit}
			isSubmitting={isLoading}
		>
			<div className="relative  max-w-[1000px]">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-16">
					<div className="flex-column gap-5">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="title"
							label="Subject Title"
							field={{ value: values.title, placeholder: "Enter title" }}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							touched={touched}
						/>

						<div className="flex-column sm:grid grid-cols-2 gap-y-5 gap-x-4">
							<CustomFormField
								fieldType={FormFieldType.SELECT}
								name="target"
								label="Target Audience"
								labelStyles="opacity-70"
								onBlur={handleBlur}
								errors={errors}
								touched={touched}
								field={{
									value: values.target,
								}}
								onChange={(value: any) => {
									setFieldValue("target", value);
								}}
								selectList={questionTypes}
								inputStyles="!bg-background-100"
							>
								{questionTypes?.map((item, index) => (
									<SelectItem
										key={index}
										value={item?.value}
										className="shad-select-item"
									>
										{item?.label}
									</SelectItem>
								))}
							</CustomFormField>

							<CustomFormField
								fieldType={FormFieldType.SELECT}
								name="sub_target"
								label="Sub-Target Audience"
								labelStyles="opacity-70"
								onBlur={handleBlur}
								errors={errors}
								touched={touched}
								field={{
									value: values.sub_target,
								}}
								onChange={(value: any) => {
									setFieldValue("sub_target", value);
								}}
								selectList={questionTypes}
								inputStyles="!bg-background-100"
							>
								{questionTypes?.map((item, index) => (
									<SelectItem
										key={index}
										value={item?.value}
										className="shad-select-item"
									>
										{item?.label}
									</SelectItem>
								))}
							</CustomFormField>
						</div>

						<CustomFormField
							fieldType={FormFieldType.SELECT}
							name="channel"
							label="Channel"
							labelStyles="opacity-70"
							onBlur={handleBlur}
							errors={errors}
							touched={touched}
							field={{
								value: values.channel,
							}}
							onChange={(value: any) => {
								setFieldValue("channel", value);
							}}
							selectList={questionTypes}
							inputStyles="!bg-background-100"
						>
							{questionTypes?.map((item, index) => (
								<SelectItem
									key={index}
									value={item?.value}
									className="shad-select-item"
								>
									{item?.label}
								</SelectItem>
							))}
						</CustomFormField>
					</div>

					<div className="flex-column gap-1.5">
						<p className="font-semibold text-base mb-2">Published Details</p>

						<CustomFormField
							fieldType={FormFieldType.SELECT}
							name="published_by"
							label="Published by"
							labelStyles="opacity-70"
							onBlur={handleBlur}
							errors={errors}
							touched={touched}
							field={{
								value: values.published_by,
								placeholder: "John Omoseni",
							}}
							onChange={(value: any) => {
								setFieldValue("published_by", value);
							}}
							selectList={questionTypes}
							inputStyles="!bg-background-100"
						>
							{questionTypes?.map((item, index) => (
								<SelectItem
									key={index}
									value={item?.value}
									className="shad-select-item"
								>
									{item?.label}
								</SelectItem>
							))}
						</CustomFormField>
					</div>
				</div>

				<div className="mt-6">
					<CustomFormField
						fieldType={FormFieldType.SKELETON}
						name="message"
						onBlur={handleBlur}
						errors={errors}
						touched={touched}
						renderSkeleton={() => (
							<TextEditor
								value={values.message}
								onHandleChange={(content: string) => {
									setFieldValue(`message`, content);
								}}
							/>
						)}
					/>
				</div>
			</div>
		</FormWrapper>
	);
};

export default CreateAnnouncementForm;
