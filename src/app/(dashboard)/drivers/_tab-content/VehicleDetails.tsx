import Profile from "../../_sections/Profile";
import { cn } from "@/lib/utils";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { KeyboardArrowDown } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { useState } from "react";
import { useApproveDriverDocument } from "@/hook/useUsers";
import { toast } from "sonner";
import { DOCUMENT_TYPE } from "@/types/server";

const popoverList = ["Approve", "Reject"];

function VehicleDetails({
	profileInfo,
	driverId,
}: {
	profileInfo: any;
	driverId: string;
}) {
	const info: Record<string, any> = {
		vehicleImage: profileInfo?.vehicleImage,
		driverPhotoImage: profileInfo?.driverPhotoImage,
		driverLicenceImage: profileInfo?.driverLicenseImage,
		insuranceDocumentImage: profileInfo?.insuranceDocumentImage,
		inspectionDocumentImage: profileInfo?.inspectionDocumentImage,
	};
	const approveDocumentMutation = useApproveDriverDocument();

	const keys = [
		{ key: "driverPhotoImage", label: "Driver's photo", id: "DRIVERS_PHOTO" },
		{
			key: "driverLicenceImage",
			label: "Driver's License",
			id: "DRIVERS_LICENSE",
		},
		{
			key: "insuranceDocumentImage",
			label: "Insurance document",
			id: "INSURANCE_DOCUMENT",
		},
		{ key: "vehicleImage", label: "Vehicle images", id: "VEHICLE_IMAGES" },
		{
			key: "inspectionDocumentImage",
			label: "Inspection document",
			id: "INSPECTION_DOCUMENT",
		},
	];

	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		popoverList!?.map(() => false)
	);

	const onClickHandlers: {
		[index: number]: (
			id: string,
			type: "approve" | "reject"
		) => Promise<void> | null;
	} = {
		0: (id: string, type: "approve" | "reject") =>
			handleApproveDocument(id, type),
		1: (id: string, type: "approve" | "reject") =>
			handleApproveDocument(id, type),
	};

	const handleItemClick = async (idx: number, id: string, value: string) => {
		if (!onClickHandlers || typeof onClickHandlers[idx] !== "function") return;

		if (!value) {
			toast.info("No document");
			return;
		}

		setLoadingStates((prev) => {
			const newStates = [...prev];
			newStates[idx] = true;
			return newStates;
		});

		const type = idx === 0 ? "approve" : "reject";
		try {
			await onClickHandlers[idx](id, type);
		} finally {
			setLoadingStates((prev) => {
				const newStates = [...prev];
				newStates[idx] = false;
				return newStates;
			});
		}
	};

	const handleApproveDocument = async (
		id: string,
		type: "approve" | "reject"
	) => {
		const data = {
			id: driverId,
			documentType: id as DOCUMENT_TYPE,
			approve: type === "approve" ? true : false,
		};

		try {
			await approveDocumentMutation.mutateAsync(data);
			if (type === "approve") {
				toast.success("Document approved successfully");
			} else {
				toast.error("Document rejected successfully");
			}
		} catch {
			console.log("Something went wrong");
		}
	};

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
					{keys.map(({ key, label, id }) => (
						<div
							className="group items-center grid w-full grid-cols-[2fr_1fr_1fr] gap-4 border-t border-border px-4 py-3.5"
							key={key}
						>
							<p className="flex-1 font-medium tracking-tight text-foreground-100">
								{label}
							</p>

							<p className={cn("font-semibold")}>{info[key]}</p>

							<PopoverWrapper
								trigger={
									<p className="badge sm:justify-self-end">
										View
										<KeyboardArrowDown className="size-4" />
									</p>
								}
								list={popoverList}
								containerStyles=""
								renderItem={(item, index) => {
									return (
										<>
											<div
												className="row-flex-btwn w-full gap-2 cursor-pointer"
												onClick={() => handleItemClick(index, id, info[key])}
											>
												{item?.icon && <item.icon className="mr-2 size-4" />}

												{item}
												{loadingStates[index] && (
													<BtnLoader isLoading={loadingStates[index]} />
												)}
											</div>
										</>
									);
								}}
							/>
						</div>
					))}
				</>
			</div>
		</div>
	);
}

export default VehicleDetails;
