import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";
import { announcementsColumn } from "@/components/table/columns/announcementColumn";
import { Modal } from "@/components/ui/components/Modal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "@/constants/icons";

import SectionWrapper from "@/layouts/SectionWrapper";
import Preview from "./Preview";

function Announcements() {
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
					<div
						className={cn(
							"badge small-text min-w-[125px] gap-2 !pl-2.5 !pr-3 !border-border-variant !bg-secondary !text-secondary-foreground"
						)}
						onClick={() => setOpenPreview(true)}
					>
						<Plus className="size-4 text-secondary-foreground" />
						<p className="mt-0.5 font-semibold">New Broadcast</p>
					</div>
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
