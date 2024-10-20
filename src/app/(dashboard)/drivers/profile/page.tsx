import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { useState } from "react";
import { tripsColumn } from "@/components/table/columns/driverTripColumn";
import { DataTable } from "@/components/table/DataTable";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { KeyboardArrowDown } from "@/constants/icons";
import {
	useApproveDriver,
	useGetDriverDetails,
	useRejectDriver,
} from "@/hook/useUsers";

import useHeaderTab from "@/hook/useHeaderTab";
import BackArrow from "@/components/BackArrow";
import TabsPanel from "@/components/tabs/TabsPanel";
import VehicleDetails from "../_tab-content/VehicleDetails";
import Withdrawals from "../_tab-content/Withdrawals";
import ProfileContent from "../_tab-content/Profile";
import SectionWrapper from "@/layouts/SectionWrapper";
import FallbackLoader from "@/components/fallback/FallbackLoader";

const tabIDs = ["Profile", "Vehicle and KYC Details", "Trips", "Withdrawals"];

function DriverProfile() {
	const [activeTab, setActiveTab] = useState(0);
	const { id } = useParams();
	const [exportData, setExportData] = useState<any>([]);
	const approveMutation = useApproveDriver();
	const rejectMutation = useRejectDriver();

	if (!id) {
		toast.error("Driver ID not found");
		return null;
	}

	const {
		data: driverData,
		isError,
		isLoading,
		refetch,
	} = useGetDriverDetails({ driverId: id! });

	const onApprove = async () => {
		try {
			await approveMutation.mutateAsync([id!]);
			toast.success("Driver approved successfully");

			refetch();
		} catch (error) {
			toast.error("Error processing request");
		}
	};

	const onDeactivate = async () => {
		try {
			await rejectMutation.mutateAsync([id!]);
			toast.success("Driver rejected successfully");

			refetch();
		} catch (error) {
			toast.error("Error processing request");
		}
	};

	let headerContent = useHeaderTab({
		activeTab,
		onApprove,
		onDeactivate,
		tableData: exportData,
	});

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
				break;
			case 2:
				setExportData(driverData?.driverTrips || []);
				break;
			case 3:
				setExportData(driverData?.driverWithdraws || []);
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

				<div className="row-flex-btwn gap-4 pr-1">
					<h3 className="w-full text-xl md:text-[1.35rem] capitalize">
						{driverData?.fullName || "Driver"} details
					</h3>

					{headerContent}
				</div>

				<div className="row-flex-start mt-3 gap-4 border-b border-border-100">
					<SlidingTabs
						activeTab={activeTab}
						changeTab={changeTab}
						tabIDs={tabIDs}
					/>
				</div>

				<div className="w-full mt-1.5">
					{isLoading ? (
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
								<VehicleDetails profileInfo={driverData} driverId={id} />
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
