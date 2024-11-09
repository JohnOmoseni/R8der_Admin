import BackArrow from "@/components/BackArrow";
import SectionWrapper from "@/layouts/SectionWrapper";
import CreateAnnouncementForm from "@/components/forms/CreateAnnouncementForm";
import Success from "./Success";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { useNavigate } from "react-router-dom";

function CreateAnnouncement() {
	const [openModal, setOpenModal] = useState({ isOpen: false, data: null });
	const navigate = useNavigate();

	return (
		<>
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

					<CreateAnnouncementForm setOpenModal={setOpenModal} />
				</div>
			</SectionWrapper>

			<Modal
				openModal={openModal?.isOpen}
				setOpenModal={() => setOpenModal({ isOpen: false, data: null })}
				modalStyles="max-w-md"
			>
				<div className="mt-3 mb-2 px-4">
					<Success
						data={openModal?.data}
						closeModal={() => {
							setOpenModal({ isOpen: false, data: null });
							navigate(-1);
						}}
					/>
				</div>
			</Modal>
		</>
	);
}

export default CreateAnnouncement;
