import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { SelectItem } from "@/components/ui/select";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { CreateAnnouncementSchema } from "@/schema/validation";
import { useBroadcastAnnouncement } from "@/hook/useAnnouncement";

import FormWrapper from "@/components/forms/FormWrapper";
import TextEditor from "./TextEditor";

type CreateAnnouncementProps = {
	announcement?: any;
	setOpenModal: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
			data: any;
		}>
	>;
};

const CreateAnnouncementForm = ({ setOpenModal }: CreateAnnouncementProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const broadcastMutation = useBroadcastAnnouncement();

	const targetAudience = [
		{ value: "all", label: "All" },
		{ value: "rider", label: "Riders" },
		{ value: "driver", label: "Drivers" },
	];

	const subTargetAudience = [
		{ value: "general", label: "General announcement" },
		{ value: "pending_registration", label: "Pending registration" },
		{ value: "completed_registration", label: "Completed registration" },
	];

	const channels = [
		{ value: "email", label: "Email" },
		{ value: "push", label: "Push Notification" },
	];

	const onSubmit = async (values: any) => {
		setIsLoading(true);

		const data = {
			subject: values.title,
			content: values.message,
			targetAudience: values.target?.toUpperCase(),
			subTargetAudience: values.sub_target?.toUpperCase(),
			channel: values?.channel?.toUpperCase(),
		};

		try {
			await broadcastMutation.mutateAsync(data);

			toast.success("Announcement Broadcast Successful");
			setOpenModal({ isOpen: true, data });
		} catch (error: any) {
			const message = error?.response?.data?.message || error.message;
			toast.error(message || "Error creating announcement");
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
		validationSchema: CreateAnnouncementSchema,
		onSubmit,
	});

	return (
		<FormWrapper
			btnStyles="!w-max"
			containerStyles="max-w-full"
			buttonLabel="Broadcast"
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
							labelStyles="opacity-70"
						/>

						<div className="flex-column sm:grid grid-cols-2 gap-y-5 gap-x-4">
							<CustomFormField
								fieldType={FormFieldType.SELECT}
								name="target"
								label="Target Audience"
								labelStyles="opacity-70 max-lg:w-[10ch]"
								onBlur={handleBlur}
								errors={errors}
								touched={touched}
								field={{
									value: values.target,
								}}
								onChange={(value: any) => {
									setFieldValue("target", value);
								}}
								selectList={targetAudience}
								inputStyles="!bg-background-100"
							>
								{targetAudience?.map((item, index) => (
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
								labelStyles="opacity-70 max-lg:w-[10ch]"
								onBlur={handleBlur}
								errors={errors}
								touched={touched}
								field={{
									value: values.sub_target,
								}}
								onChange={(value: any) => {
									setFieldValue("sub_target", value);
								}}
								selectList={subTargetAudience}
								inputStyles="!bg-background-100"
							>
								{subTargetAudience?.map((item, index) => (
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
								placeholder: "E.g push notification, email",
							}}
							onChange={(value: any) => {
								setFieldValue("channel", value);
							}}
							selectList={channels}
							inputStyles="!bg-background-100"
						>
							{channels?.map((item, index) => (
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
							fieldType={FormFieldType.INPUT}
							name="published_by"
							label="Published by"
							labelStyles="opacity-70"
							field={{
								value: values.published_by,
								placeholder: "e.g. John Doe",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							touched={touched}
						/>
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
