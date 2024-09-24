import { Button } from "@/components/CustomButton";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { ConfigSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { InferType } from "yup";

function Config({ user }: { user?: any }) {
	const [isLoading, setIsLoading] = useState(false);

	const initialValues = {
		customerBasicFee: user?.basicFee,
		customerLuxuryFee: user?.luxuryFee,
		driverComissionType: "percentage",
		driverComissionAmount: user?.commissionAMount,
	};

	const onSubmit = (values: InferType<typeof ConfigSchema>) => {
		setIsLoading(true);
		console.log(values);
	};

	const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
		initialValues,
		validationSchema: ConfigSchema,
		onSubmit,
	});

	return (
		<div className="flex-column gap-8 max-w-2xl">
			<Section
				title="Customer Fee Configuration"
				value1={values.customerBasicFee}
				value2={values.customerLuxuryFee}
				desc1="Customer service fee for basic trips"
				desc2="Customer service fee for basic trips"
				setFieldValue={setFieldValue}
				handleChange={handleChange}
				placeholder={"\u20A6100"}
			/>

			<Section
				title="Driver Fee Configurations"
				value1={values.driverComissionType}
				value2={values.driverComissionAmount}
				showCheckbox
				desc1="Driver commission type"
				desc2="Driver commission amount"
				setFieldValue={setFieldValue}
				handleChange={handleChange}
				placeholder="10%"
			/>

			<Button
				onClick={handleSubmit}
				disabled={isLoading}
				isLoading={isLoading}
				type="submit"
				title="Save"
				className="!mt-3 ml-auto !w-max"
			/>
		</div>
	);
}

export default Config;

type SectionType = {
	title: string;
	desc1: string;
	desc2: string;
	value1: any;
	value2: any;
	placeholder: string;
	showCheckbox?: boolean;
	handleChange?: any;
	setFieldValue?: any;
};

const Section = ({
	title,
	desc1,
	desc2,
	value1,
	value2,
	placeholder,
	setFieldValue,
	showCheckbox,
	handleChange,
}: SectionType) => {
	return (
		<div className="flex-column gap-3">
			<h3>{title}</h3>

			<div className="py-3 px-3 brightness-105 bg-background-200 rounded-md flex-column gap-4">
				<div className="grid grid-cols-[1fr_1fr] min-[850px]:grid-cols-[minmax(max-content,_230px)_1fr] gap-6 items-center">
					<p className="text-sm sm:whitespace-nowrap">{desc1}</p>

					{showCheckbox ? (
						<div className="flex-column min-[550px]:row-flex-start gap-y-2 w-full gap-x-[15%]">
							<CustomFormField
								fieldType={FormFieldType.CHECKBOX}
								name="driverComissionType"
								label="Percentage"
								field={{
									value: value1 == "percentage" ? true : false,
								}}
								onChange={() => {
									setFieldValue("driverComissionType", "percentage");
								}}
							/>

							<CustomFormField
								fieldType={FormFieldType.CHECKBOX}
								name="driverComissionType"
								label="Flat fee"
								field={{
									value: value1 === "flat" ? true : false,
								}}
								onChange={() => {
									setFieldValue("driverComissionType", "flat");
								}}
							/>
						</div>
					) : (
						<CustomFormField
							name="basicFee"
							fieldType={FormFieldType.INPUT}
							field={{
								value: value1,
								placeholder: placeholder,
							}}
							onChange={handleChange}
						/>
					)}
				</div>

				<div className="grid grid-cols-[1fr_1fr] min-[850px]:grid-cols-[minmax(max-content,_230px)_1fr] gap-6 items-center">
					<p className="text-sm sm:whitespace-nowrap">{desc2}</p>

					<CustomFormField
						name="luxuryFee"
						fieldType={FormFieldType.INPUT}
						field={{
							value: value2,
							placeholder: placeholder,
						}}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
};
