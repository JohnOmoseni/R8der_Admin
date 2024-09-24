import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { useState } from "react";
import { tripsColumn } from "@/components/table/columns/tripsColumn";
import { DataTable } from "@/components/table/DataTable";
import { useParams } from "react-router-dom";
import { useGetDriverDetails } from "@/hook/useGetOverview";
import { toast } from "sonner";

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
	const [activeTab, setActiveTab] = useState(tabIDs[0]);
	let headerContent = useHeaderTab(activeTab);
	const { id } = useParams();

	const {
		data: driverData,
		isError,
		isLoading,
	} = useGetDriverDetails({ driverId: id! });

	if (isError) toast.error("Error fetching driver details");

	const changeTab = (id: string) => {
		id && setActiveTab(id);
	};

	return (
		<SectionWrapper headerTitle="Drivers" mainContainerStyles="py-6 px-4">
			<div className="flex-column gap-6">
				<BackArrow />

				<div className="row-flex-btwn gap-4">
					<h3 className="w-full">{driverData?.fullName || "Driver"} details</h3>

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
								<VehicleDetails profileInfo={driverData} />
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[2]} idx={1}>
								<DataTable
									columns={tripsColumn}
									tableData={driverData?.driverTrips || []}
								/>
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[3]} idx={1}>
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
