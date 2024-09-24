import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { tabIDs } from "@/constants";
import { useState } from "react";
import { tripsColumn } from "@/components/table/columns/tripsColumn";
import { DataTable } from "@/components/table/DataTable";
import { useParams } from "react-router-dom";
import { useGetRiderDetails } from "@/hook/useGetOverview";
import BackArrow from "@/components/BackArrow";
import TabsPanel from "@/components/tabs/TabsPanel";
import SectionWrapper from "@/layouts/SectionWrapper";
import Profile from "../../drivers/_tab-content/Profile";
import { toast } from "sonner";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function CustomerProfile() {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState(tabIDs[0]);
	const {
		data: riderData,
		isError,
		isLoading,
	} = useGetRiderDetails({ riderId: id! });

	console.log("[RIDER]", riderData);

	if (isError) toast.error("Error fetching customer details");

	const changeTab = (id: string) => {
		id && setActiveTab(id);
	};

	return (
		<SectionWrapper headerTitle="Customers" mainContainerStyles="py-6 px-4">
			<div className="flex-column gap-6">
				<BackArrow />

				<h3 className="mt-4">{riderData?.fullName || "Rider"} details</h3>

				<div className="row-flex-start gap-4 border-b border-border-100">
					<SlidingTabs
						activeTab={activeTab}
						changeTab={changeTab}
						tabIDs={tabIDs}
					/>
				</div>

				<div className="mt-3 w-full">
					{isLoading ? (
						<div className="loader-container">
							<FallbackLoader />
						</div>
					) : (
						<>
							<TabsPanel activeTab={activeTab} id={tabIDs[0]} idx={0}>
								<Profile
									profileInfo={riderData}
									type="customerInfo"
									headingTitle="Profile"
								/>
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[1]} idx={1}>
								<DataTable
									columns={tripsColumn}
									tableData={riderData?.riderTrips || []}
								/>
							</TabsPanel>
						</>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

export default CustomerProfile;
