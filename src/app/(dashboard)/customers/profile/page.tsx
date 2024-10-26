import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { tabIDs } from "@/constants";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInitials } from "@/utils";
import { useGetRiderDetails } from "@/hook/useUsers";
import BackArrow from "@/components/BackArrow";
import TabsPanel from "@/components/tabs/TabsPanel";
import SectionWrapper from "@/layouts/SectionWrapper";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import Trips from "./Trips";
import Profile from "./Profile";
import dayjs from "dayjs";
import { PeriodTypeParams } from "@/types/server";

function CustomerProfile() {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState(0);
	const [periodType, setPeriodType] = useState<PeriodTypeParams>("MONTH");
	const {
		data: riderData,
		isError,
		isLoading,
		refetch,
	} = useGetRiderDetails({ riderId: id!, periodType: periodType });

	if (isError) toast.error("Error fetching customer details");

	useEffect(() => {
		refetch();
	}, [periodType]);

	const changeTab = (id: number) => {
		!isNaN(id) && setActiveTab(id);
	};

	return (
		<SectionWrapper headerTitle="Customers" mainContainerStyles="py-6 px-4">
			<div className="flex-column gap-6">
				<BackArrow />

				<div className="rounded-lg border border-border-100 mt-1 pt-4 pb-3 px-5">
					<div className="row-flex-start gap-4 mb-8">
						<AvatarWrapper
							containerClassName="!bg-[#033678] size-14"
							fallback={getInitials(riderData?.fullName)}
							src={riderData?.img}
						/>

						<div className="flex-column gap-0.5 flex-1 w-full">
							<h3 className="text-lg sm:text-xl">
								{riderData?.fullName || "Rider"} details
							</h3>
							<span className="grey-text !font-light">
								Date joined:{" "}
								{riderData?.dateJoined
									? dayjs(riderData?.dateJoined).format("YYYY-MM-DD, h:mm A")
									: "---"}
							</span>
						</div>
					</div>

					<div className="row-flex-start gap-4">
						<SlidingTabs
							activeTab={activeTab}
							changeTab={changeTab}
							tabIDs={tabIDs}
						/>
					</div>
				</div>

				<div className="w-full">
					{isLoading ? (
						<div className="loader-container">
							<FallbackLoader />
						</div>
					) : (
						<>
							<TabsPanel activeTab={activeTab} id={tabIDs[0]} idx={0}>
								<Profile profileInfo={riderData} />
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[1]} idx={1}>
								<Trips riderData={riderData} setPeriodType={setPeriodType} />
							</TabsPanel>
						</>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

export default CustomerProfile;
