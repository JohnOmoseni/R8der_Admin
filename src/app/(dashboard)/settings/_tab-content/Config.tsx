import { Button } from "@/components/CustomButton";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { useGetSettingsList, useUpdateSettings } from "@/hook/useSettings";
import { ConfigSchema } from "@/schema/validation";
import { CommissionType } from "@/types/server";
import { useFormik } from "formik";
import { toast } from "sonner";
import { InferType } from "yup";

function Config() {
	const { data, isError, isLoading, error } = useGetSettingsList();
	const updateSettingsMutation = useUpdateSettings();
	const settingsList = data?.settingsData;

	const initialValues = {
		customerBasicFee: settingsList?.basicTripFee || "",
		customerLuxuryFee: settingsList?.luxuryTripFee || "",
		driverCommissionType: settingsList?.driverCommissionType || "PERCENTAGE",
		driverCommissionAmount: settingsList?.driverCommissionAmount || "",
	};

	if (isError)
		toast.error(`${error?.message || "Error fetching Settings list"}`);

	const onSubmit = async (values: InferType<typeof ConfigSchema>) => {
		try {
			const payload = {
				basicTripFee: values.customerBasicFee,
				luxuryTripFee: values.customerLuxuryFee,
				driverCommissionType: values.driverCommissionType as CommissionType,
				driverCommissionAmount: values.driverCommissionAmount,
			};

			await updateSettingsMutation.mutateAsync(payload);

			toast.success(
				updateSettingsMutation.data?.message || "Setiings updated successfully"
			);
		} catch {}
	};

	const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
		initialValues,
		validationSchema: null,
		onSubmit,
		enableReinitialize: true,
	});

	return isLoading ? (
		<div className="relative w-full min-h-[70vh]">
			<FallbackLoader />
		</div>
	) : (
		<div className="flex-column gap-8 max-w-2xl">
			<Section
				title="Customer Fee Configuration"
				value1={values.customerBasicFee}
				value2={values.customerLuxuryFee}
				desc1="Customer service fee for basic trips"
				desc2="Customer service fee for luxury trips"
				setFieldValue={setFieldValue}
				handleChange={handleChange}
				placeholder={"\u20A6100"}
				name1="customerBasicFee"
				name2="customerLuxuryFee"
				inputType="number"
			/>

			<Section
				title="Driver Fee Configurations"
				value1={values.driverCommissionType}
				value2={values.driverCommissionAmount}
				showCheckbox
				desc1="Driver commission type"
				desc2="Driver commission amount"
				setFieldValue={setFieldValue}
				handleChange={handleChange}
				placeholder="10%"
				name1="driverCommissionType"
				name2="driverCommissionAmount"
				inputType="number"
			/>

			<Button
				onClick={handleSubmit}
				disabled={updateSettingsMutation.isPending}
				isLoading={updateSettingsMutation.isPending}
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
	name1: string;
	name2: string;
	value1: any;
	value2: any;
	placeholder: string;
	showCheckbox?: boolean;
	handleChange?: any;
	setFieldValue?: any;
	inputType?: string;
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
	name1,
	name2,
	inputType,
}: SectionType) => {
	return (
		<div className="flex-column gap-3">
			<h3>{title}</h3>

			<div className="py-3 px-3 brightness-105 bg-background-200 rounded-md flex-column gap-4">
				<div className="grid grid-cols-[1fr_1fr] min-[900px]:grid-cols-[minmax(max-content,_230px)_1fr] gap-6 items-center">
					<p className="text-sm sm:whitespace-nowrap">{desc1}</p>

					{showCheckbox ? (
						<div className="flex-column min-[550px]:row-flex-start gap-y-2 w-full gap-x-[15%]">
							<CustomFormField
								fieldType={FormFieldType.CHECKBOX}
								name="driverCommissionType"
								label="Percentage"
								field={{
									value: value1 == "PERCENTAGE" ? true : false,
								}}
								onChange={() => {
									setFieldValue("driverCommissionType", "PERCENTAGE");
								}}
							/>

							<CustomFormField
								fieldType={FormFieldType.CHECKBOX}
								name="driverCommissionType"
								label="Flat fee"
								field={{
									value: value1 === "FLAT" ? true : false,
								}}
								onChange={() => {
									setFieldValue("driverCommissionType", "FLAT");
								}}
							/>
						</div>
					) : (
						<CustomFormField
							name={name1}
							fieldType={FormFieldType.INPUT}
							field={{
								value: value1,
								placeholder: placeholder,
								type: inputType,
							}}
							onChange={handleChange}
						/>
					)}
				</div>

				<div className="grid grid-cols-[1fr_1fr] min-[850px]:grid-cols-[minmax(max-content,_230px)_1fr] gap-6 items-center">
					<p className="text-sm sm:whitespace-nowrap">{desc2}</p>

					<CustomFormField
						name={name2}
						fieldType={FormFieldType.INPUT}
						field={{
							value: value2,
							placeholder: placeholder,
							type: inputType,
						}}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
};
