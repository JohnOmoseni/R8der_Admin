import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { useState } from "react";
import { tripsColumn } from "@/components/table/columns/driverTripColumn";
import { DataTable } from "@/components/table/DataTable";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
	useApproveDriver,
	useGetDriverDetails,
	useRejectDriver,
} from "@/hook/useUsers";
import { LoadingState } from "@/types";

import BackArrow from "@/components/BackArrow";
import TabsPanel from "@/components/tabs/TabsPanel";
import VehicleDetails from "../_tab-content/VehicleDetails";
import Withdrawals from "../_tab-content/Withdrawals";
import ProfileContent from "../_tab-content/Profile";
import SectionWrapper from "@/layouts/SectionWrapper";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import HeaderContent from "./HeaderContent";

const tabIDs = ["Profile", "Vehicle and KYC Details", "Trips", "Withdrawals"];

function DriverProfile() {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState(0);
	const [exportData, setExportData] = useState<any>([]);
	const [filename, setFilename] = useState("");
	const [isLoading, setIsLoading] = useState<LoadingState>({
		type: "",
		loading: false,
	});

	const approveMutation = useApproveDriver();
	const rejectMutation = useRejectDriver();

	if (!id) {
		toast.error("Driver ID not found");
		return null;
	}

	const {
		data: driverData,
		isError,
		isFetching,
		refetch,
	} = useGetDriverDetails({ driverId: id! });

	const onApprove = async () => {
		if (isLoading?.type === "deactivate" && isLoading?.loading) return;

		setIsLoading({ type: "approve", loading: true });

		try {
			await approveMutation.mutateAsync([id!]);
			toast.success("Driver approved successfully");

			refetch();
		} catch (error) {
			toast.error("Error processing request");
		} finally {
			setIsLoading({ type: "approve", loading: false });
		}
	};

	const onDeactivate = async () => {
		if (isLoading?.type === "approve" && isLoading?.loading) return;

		setIsLoading({ type: "deactivate", loading: true });

		try {
			await rejectMutation.mutateAsync([id!]);
			toast.success("Driver deactivated successfully");

			refetch();
		} catch (error) {
			toast.error("Error processing request");
		} finally {
			setIsLoading({ type: "deactivate", loading: false });
		}
	};

	if (isError) toast.error("Error fetching driver details");

	const changeTab = (id: number) => {
		setActiveTab(id);

		const dataArray = Object.entries(driverData!)?.map(([key, value]) => ({
			key,
			value,
		}));

		switch (id) {
			case 1:
				setExportData(dataArray);
				setFilename("Vehicle Details.xlsx");
				break;
			case 2:
				setExportData(driverData?.driverTrips || []);
				setFilename("Trips.xlsx");

				break;
			case 3:
				setExportData(driverData?.driverWithdraws || []);
				setFilename("Withdrawals.xlsx");

				break;
			default:
				setExportData([]);
				break;
		}
	};

	return (
		<SectionWrapper headerTitle="Drivers" mainContainerStyles="py-6 px-4">
			<div className="flex-column gap-6">
				<BackArrow />

				<div className="grid grid-cols-[1fr_auto] gap-4 pr-1">
					<h3 className="w-full text-xl md:text-[1.35rem] capitalize">
						{driverData?.fullName || "Driver"} details
					</h3>
					<HeaderContent
						activeTab={activeTab}
						tableData={exportData}
						filename={filename}
						onApprove={onApprove}
						onDeactivate={onDeactivate}
						isLoading={isLoading}
					/>{" "}
				</div>

				<div className="row-flex-start mt-3 gap-4 border-b border-border-100">
					<SlidingTabs
						activeTab={activeTab}
						changeTab={changeTab}
						tabIDs={tabIDs}
					/>
				</div>

				<div className="w-full mt-1.5">
					{isFetching ? (
						<div className="loader-container">
							<FallbackLoader />
						</div>
					) : (
						<>
							<TabsPanel activeTab={activeTab} id={tabIDs[0]} idx={0}>
								<ProfileContent
									type="driverInfo"
									profileInfo={driverData}
									headingTitle="Driver details"
								/>
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[1]} idx={1}>
								<VehicleDetails
									profileInfo={driverData}
									driverId={id}
									refetch={refetch}
								/>
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[2]} idx={2}>
								<DataTable
									columns={tripsColumn}
									tableData={driverData?.driverTrips || []}
								/>
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[3]} idx={3}>
								<Withdrawals withdrawals={driverData?.driverWithdraws} />
							</TabsPanel>
						</>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

export default DriverProfile;
