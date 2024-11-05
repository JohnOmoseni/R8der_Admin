import BackArrow from "@/components/BackArrow";
import SectionWrapper from "@/layouts/SectionWrapper";
import CreateAnnouncementForm from "@/components/forms/CreateAnnouncementForm";

function CreateAnnouncement() {
	return (
		<SectionWrapper headerTitle="Announcements" mainContainerStyles="">
			<div className="flex-column gap-4">
				<BackArrow />

				<div className="flex-column mt-2">
					<h3 className="w-full text-xl md:text-[1.35rem] capitalize">
						Create Announcement
					</h3>
					<p className="text-foreground-100">
						Broadcast announcement to customers
					</p>
				</div>

				<CreateAnnouncementForm />
			</div>
		</SectionWrapper>
	);
}

export default CreateAnnouncement;
