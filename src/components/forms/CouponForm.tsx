import { useFormik } from "formik";
import { InferType } from "yup";
import { CouponSchema } from "@/schema/validation";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { SelectItem } from "../ui/select";
import { useCreateCoupon, useUpdateDiscount } from "@/hook/useSettings";
import { CouponResponseType } from "@/types/server";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import DatePicker from "./DatePicker";
import FormWrapper from "./FormWrapper";

const CouponForm = ({
	coupon,
	type = "create",
}: {
	coupon?: CouponResponseType;
	type?: "edit" | "create";
}) => {
	const createCouponMutation = useCreateCoupon();
	const editCouponMutation = useUpdateDiscount();
	const navigate = useNavigate();

	const discountTypes = [
		{
			label: "Percentage",
			value: "PERCENTAGE",
		},
		{
			label: "Fixed",
			value: "FIXED",
		},
	];

	const targets = [
		{
			label: "Customers",
			value: "CUSTOMERS",
		},
		{
			label: "Drivers",
			value: "DRIVERS",
		},
	];

	const onSubmit = async (values: InferType<typeof CouponSchema>) => {
		try {
			const data = {
				code: values.title,
				description: values.description,
				discountType: values.discountType,
				amount: values.amount,
				target: values.target,
				active: true,
				expiryDate: values.expiryDate,
			};

			if (type === "create") {
				await createCouponMutation.mutateAsync(data);
				toast.success("Coupon created successfully");
				navigate("/dashboard/settings/success", {
					state: { from: "create" },
				});
			} else if (type === "edit") {
				await editCouponMutation.mutateAsync(data);
				toast.success("Coupon updated successfully");
				navigate("/dashboard/settings/success", {
					state: { from: "edit", coupon: data },
				});
			}
		} catch (err) {
			let msg = type === "create" ? "creating" : "updating";
			toast.error(`Error ${msg} discount`);
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
			title: coupon?.code || "",
			description: coupon?.description || "",
			discountType: coupon?.discountType || ("" as any),
			amount: (coupon?.amount as string) || "",
			target: coupon?.target || ("" as any),
			expiryDate: (coupon?.expiryDate as any) || "",
		},
		validationSchema: CouponSchema,
		onSubmit,
	});

	return (
		<FormWrapper
			buttonLabel={type === "create" ? "Create Discount" : "Edit Discount"}
			onSubmit={handleSubmit}
			isSubmitting={
				createCouponMutation?.isPending || editCouponMutation.isPending
			}
		>
			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="title"
				label="Title"
				field={{
					value: values.title,
					placeholder: "Enter Title",
					disabled: type === "edit",
				}}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
				inputStyles="px-3"
			/>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="description"
				label="Description"
				field={{ value: values.description, placeholder: "Short description" }}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
				inputStyles="px-3"
			/>

			<CustomFormField
				fieldType={FormFieldType.SELECT}
				name="discountType"
				label="Discount Type"
				field={{
					value: values.discountType,
					placeholder: "e.g percentage or fixed",
				}}
				onChange={(value: string) => {
					setFieldValue("discountType", value);
				}}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
				selectList={discountTypes}
			>
				{discountTypes?.map((type) => (
					<SelectItem
						key={type.value}
						value={type.value}
						className="shad-select-item"
					>
						{type.label}
					</SelectItem>
				))}
			</CustomFormField>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="amount"
				label="Fixed Amount"
				field={{ value: values.amount, placeholder: "\u20A6800" }}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
				inputStyles="px-3"
			/>

			<CustomFormField
				fieldType={FormFieldType.SELECT}
				name="target"
				label="Target"
				field={{ value: values.target }}
				onChange={(value: string) => {
					setFieldValue("target", value);
				}}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
				inputStyles="!justify-between"
				selectList={targets}
			>
				{targets?.map((target) => (
					<SelectItem
						key={target.value}
						value={target.value}
						className="shad-select-item"
					>
						{target.label}
					</SelectItem>
				))}
			</CustomFormField>

			<CustomFormField
				fieldType={FormFieldType.SKELETON}
				name="expiryDate"
				label="Expiry Date"
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
				renderSkeleton={() => (
					<DatePicker
						selected={values.expiryDate}
						onChange={(date: Date) => setFieldValue("expiryDate", date)}
					/>
				)}
			></CustomFormField>
		</FormWrapper>
	);
};

export default CouponForm;
