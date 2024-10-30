import Profile from "../../_sections/Profile";
import { cn } from "@/lib/utils";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { KeyboardArrowDown } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { useState } from "react";
import { useApproveDriverDocument } from "@/hook/useUsers";
import { toast } from "sonner";
import { DOCUMENT_TYPE } from "@/types/server";
import { StatusBadge } from "@/components/StatusBadge";
import { toTitleCase } from "@/utils";

const popoverList = ["Approve", "Reject"];
const approve = ["Approve"];
const reject = ["Reject"];

function VehicleDetails({
	profileInfo,
	driverId,
	refetch,
}: {
	profileInfo: any;
	refetch: any;
	driverId: string;
}) {
	const info: Record<string, any> = {
		vehicleImage: {
			value: profileInfo?.vehicleImage,
			status: profileInfo?.vehicleImagesApproved,
		},
		driverPhotoImage: {
			value: profileInfo?.driverPhotoImage,
			status: profileInfo?.driversPhotoApproved,
		},
		driverLicenceImage: {
			value: profileInfo?.driverLicenseImage,
			status: profileInfo?.driversLicenseApproved,
		},
		insuranceDocumentImage: {
			value: profileInfo?.insuranceDocumentImage,
			status: profileInfo?.insuranceDocumentApproved,
		},
		inspectionDocumentImage: {
			value: profileInfo?.inspectionDocumentImage,
			status: profileInfo?.otherInspectionDocumentApproved,
		},
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

	const handleItemClick = async (
		idx: number,
		id: string,
		type: "approve" | "reject",
		value: string
	) => {
		if (!onClickHandlers || typeof onClickHandlers[idx] !== "function") return;

		if (!value) {
			toast.info(`No document to ${type || "approve"}`);
			return;
		}

		setLoadingStates((prev) => {
			const newStates = [...prev];
			newStates[idx] = true;
			return newStates;
		});

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
			const res = await approveDocumentMutation.mutateAsync(data);
			const message =
				res?.message
					.split("_")
					.map((word: string) => word)
					.join(" ") || "";

			if (type === "approve") {
				toast.success(toTitleCase(message) || "Document approved successfully");
			} else if (type === "reject") {
				toast.error(toTitleCase(message) || "Document rejected successfully");
			}

			refetch();
		} catch {
			toast.error("Something went wrong");
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
				<div className="grid w-full items-center grid-cols-[1fr_1fr_auto] gap-4 bg-background-200 px-3 py-3 brightness-105">
					<p className="font-semibold">Documents</p>

					<p className="font-semibold">Status</p>
					<p className="font-semibold sm:justify-self-end">Actions</p>
				</div>

				<>
					{keys.map(({ key, label, id }) => (
						<div
							className="group items-center grid w-full grid-cols-[1fr_1fr_auto] gap-4 border-t border-border px-4 py-3.5"
							key={key}
						>
							<p className="flex-1 font-medium tracking-tight text-foreground-100">
								{label}
							</p>

							<div className={cn("font-semibold overflow-hidden w-max")}>
								<StatusBadge status={info[key]?.status} />
							</div>

							<PopoverWrapper
								trigger={
									<p className="badge sm:justify-self-end">
										View
										<KeyboardArrowDown className="size-4" />
									</p>
								}
								list={info[key]?.status === "NOT_VERIFIED" ? approve : reject}
								containerStyles=""
								renderItem={(item, index) => {
									const type =
										info[key]?.status === "NOT_VERIFIED" ? "approve" : "reject";
									return (
										<>
											<div
												className="row-flex-btwn w-full gap-2 cursor-pointer"
												onClick={() =>
													handleItemClick(index, id, type, info[key]?.value)
												}
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
