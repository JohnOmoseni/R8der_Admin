import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { staffData } from "@/components/table/staffData";
import { Plus, Setting } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/components/Modal";
import { ColumnFiltersState } from "@tanstack/react-table";
import { staffColumn } from "@/components/table/columns/staffColumn";

import TableSearch from "@/components/table/TableSearch";
import SectionWrapper from "@/layouts/SectionWrapper";
import Filters from "@/components/table/filters";
import AddStaff from "./AddStaff";
import withAuthAndRoleProtection from "@/hoc/withAuthAndRoleProtection";

function Staffs() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [showModal, setShowModal] = useState(false);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const action = "badge small-text sm:!px-6";
	const topAction =
		"badge small-text min-w-[125px] gap-2 !bg-transparent !pl-2.5 !pr-4";

	let headerContent;
	headerContent = (
		<div className="row-flex-start gap-3 border-r border-border-100 pr-5">
			<div className={cn(action, "")}>
				<Setting className="size-4" />
				<p className="mt-0.5 font-semibold">Manage Roles</p>
			</div>

			<div
				className={cn(
					topAction,
					"!border-border-variant !bg-secondary !text-secondary-foreground"
				)}
				onClick={() => setShowModal(true)}
			>
				<Plus className="size-4 text-secondary-foreground" />
				<p className="mt-0.5 font-semibold">Add Staff</p>
			</div>
		</div>
	);

	return (
		<SectionWrapper headerTitle="Staffs" customHeaderContent={headerContent}>
			<div className="flex-column mt-3 gap-4">
				<div className="row-flex-btwn gap-3.5">
					<TableSearch
						columnFilters={columnFilters}
						setColumnFilters={setColumnFilters}
						placeholder="Search by email"
					/>

					<Filters
						setColumnFilters={setColumnFilters}
						selectedFilter={selectedFilter}
						setSelectedFilter={setSelectedFilter}
					/>
				</div>

				<div className="row-flex-btwn gap-3 rounded-sm bg-background-200 px-2.5 py-2 brightness-105 sm:gap-4">
					<p className="text-xs font-semibold">rows selected</p>

					<div className="row-flex gap-2.5">
						<div className={cn(action, "")}>Approve</div>
						<div className={cn(action, "")}>Reject</div>
					</div>
				</div>

				<DataTable
					columnFilters={columnFilters}
					columns={staffColumn}
					tableData={staffData}
				/>
			</div>

			{showModal && (
				<Modal
					openModal={showModal}
					setOpenModal={() => setShowModal(false)}
					modalStyles="overflow-hidden"
				>
					<AddStaff setOpenModal={() => setShowModal(false)} />
				</Modal>
			)}
		</SectionWrapper>
	);
}

// export default withAuthAndRoleProtection(Staffs, [APP_ROLES.Admin]);
export default Staffs;
