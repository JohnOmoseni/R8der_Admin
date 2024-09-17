import { cn } from "@/lib/utils";
import Profile from "../../_sections/Profile";

function VehicleDetails({ profileInfo }: { profileInfo: any }) {
	const info: Record<string, any> = {
		vehicleImage: profileInfo?.vehicleImage,
		driverPhotoImage: profileInfo?.driverPhotoImage,
		driverLicenceImage: profileInfo?.driverLicenseImage,
		insuranceDocumentImage: profileInfo?.insuranceDocumentImage,
		inspectionDocumentImage: profileInfo?.inspectionDocumentImage,
	};

	const keys = [
		{ key: "driverPhotoImage", label: "Driver's photo" },
		{ key: "driverLicenceImage", label: "Driver's License" },
		{ key: "insuranceDocumentImage", label: "Insurance document" },
		{ key: "vehicleImage", label: "Vehicle images" },
		{ key: "inspectionDocumentImage", label: "Inspection document" },
	];

	return (
		<div className="flex-column gap-5">
			<Profile
				profileInfo={profileInfo}
				type="vehicleInfo"
				headingTitle="Vehicle details"
			/>

			<div className="rounded-sm border border-border text-base">
				<div className="grid w-full items-center grid-cols-[2fr_1fr_1fr] gap-4 bg-background-200 px-3 py-3 brightness-105">
					<p className="font-semibold">Documents</p>

					<p className="font-semibold">Status</p>
					<p className="font-semibold sm:justify-self-end">Actions</p>
				</div>

				<>
					{keys.map(({ key, label }) => (
						<div
							className="group items-center grid w-full grid-cols-[2fr_1fr_1fr] gap-4 border-t border-border px-4 py-3.5"
							key={key}
						>
							<p className="flex-1 font-medium tracking-tight text-foreground-100">
								{label}
							</p>

							<p className={cn("font-semibold")}>{info[key]}</p>

							<div className="badge sm:justify-self-end">View</div>
						</div>
					))}
				</>
			</div>
		</div>
	);
}

export default VehicleDetails;
