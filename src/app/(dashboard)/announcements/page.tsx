import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";
import { announcementsColumn } from "@/components/table/columns/announcementColumn";
import { Modal } from "@/components/ui/components/Modal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "@/constants/icons";
import { useNavigate } from "react-router-dom";

import SectionWrapper from "@/layouts/SectionWrapper";
import Preview from "./Preview";

function Announcements() {
	const navigate = useNavigate();
	const [openPreview, setOpenPreview] = useState(false);
	const isError = false;
	const isLoading = false;
	const data: any = [];

	if (isError) toast.error("Error fetching trips");

	return (
		<>
			<SectionWrapper
				headerTitle="Announcements"
				customHeaderContent={
					<>
						<div
							title="New Announcement"
							className="icon-div !bg-secondary sm:hidden -mr-2"
							onClick={() => navigate("/dashboard/announcements/create")}
						>
							<Plus className="size-5 font-semibold text-secondary-foreground" />
						</div>

						<div
							className={cn(
								"badge max-sm:!hidden small-text min-w-[125px] gap-2 !pl-2.5 !pr-3 !border-border-variant !bg-secondary !text-secondary-foreground"
							)}
							onClick={() => navigate("/dashboard/announcements/create")}
						>
							<Plus className="size-4 text-secondary-foreground" />
							<p className="mt-0.5 font-semibold">New Broadcast</p>
						</div>
					</>
				}
			>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<>
						<div className="mt-6">
							<DataTable columns={announcementsColumn} tableData={data || []} />
						</div>

						<Modal
							openModal={openPreview}
							setOpenModal={() => setOpenPreview(false)}
							modalStyles="max-w-lg max-h-[590px] "
							title="Broadcast Preview"
							description="This is a preview of this broadcast content"
						>
							<div className="mt-4">
								<Preview closeModal={() => setOpenPreview(false)} />
							</div>
						</Modal>

						{/* <Modal
							openModal={openPreview}
							setOpenModal={() => setOpenPreview(false)}
							modalStyles="max-w-md"
						>
							<div className="mt-3 mb-2 px-4">
								<Success closeModal={() => setOpenPreview(false)} />
							</div>
						</Modal> */}
					</>
				)}
			</SectionWrapper>
		</>
	);
}

export default Announcements;
