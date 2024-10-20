import { cn } from "@/lib/utils";
import { useState } from "react";
import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { useAuth } from "@/context/AuthContext";
import TabsPanel from "@/components/tabs/TabsPanel";
import SectionWrapper from "@/layouts/SectionWrapper";
import Profile from "./_tab-content/Profile";
import Config from "./_tab-content/Config";
import Coupons from "./_tab-content/Coupons";

const tabIDs = ["Profile", "Configurations", "Discounts & Coupons"];
const tabIDsStaff = ["Profile"];

function Settings() {
	const [activeTab, setActiveTab] = useState(0);
	const { role } = useAuth();

	const changeTab = (idx: number) => {
		setActiveTab(idx);
	};

	return (
		<SectionWrapper
			headerTitle="Settings"
			mainContainerStyles="pt-8 pb-6 px-4 md:px-8"
		>
			<div className="flex-column gap-4">
				<div className="row-flex-start gap-4 border-b border-border-100">
					<SlidingTabs
						activeTab={activeTab}
						changeTab={changeTab}
						tabIDs={role === "ADMIN" ? tabIDs : tabIDsStaff}
					/>
				</div>

				<div
					className={cn(
						"w-full mt-3  max-w-4xl",
						activeTab !== 2 && "sm:max-xl:pr-8"
					)}
				>
					<TabsPanel activeTab={activeTab} id={tabIDs[0]} idx={0}>
						<Profile />
					</TabsPanel>

					{role === "ADMIN" && (
						<>
							<TabsPanel activeTab={activeTab} id={tabIDs[1]} idx={1}>
								<Config />
							</TabsPanel>
							<TabsPanel activeTab={activeTab} id={tabIDs[2]} idx={2}>
								<Coupons />
							</TabsPanel>
						</>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

export default Settings;
