import { useState } from "react";
import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import TabsPanel from "@/components/tabs/TabsPanel";
import SectionWrapper from "@/layouts/SectionWrapper";
import Profile from "./_tab-content/Profile";
import Config from "./_tab-content/Config";

const tabIDs = ["Profile", "Configurations"];

function Settings() {
	const [activeTab, setActiveTab] = useState(tabIDs[0]);

	const changeTab = (id: string) => {
		id && setActiveTab(id);
	};

	return (
		<SectionWrapper
			headerTitle="Settings"
			mainContainerStyles="pt-8 pb-6 px-4 md:px-8"
		>
			<div className="flex-column gap-5">
				<div className="row-flex-start gap-4 border-b border-border-100">
					<SlidingTabs
						activeTab={activeTab}
						changeTab={changeTab}
						tabIDs={tabIDs}
					/>
				</div>

				<div className="w-full mt-4 sm:max-xl:pr-8 max-w-4xl">
					<TabsPanel activeTab={activeTab} id={tabIDs[0]} idx={0}>
						<Profile />
					</TabsPanel>
					<TabsPanel activeTab={activeTab} id={tabIDs[1]} idx={1}>
						<Config />
					</TabsPanel>
				</div>
			</div>
		</SectionWrapper>
	);
}

export default Settings;
