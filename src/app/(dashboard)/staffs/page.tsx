import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/components/Modal";
import { ColumnFiltersState } from "@tanstack/react-table";
import { staffColumn } from "@/components/table/columns/staffColumn";
import { useActivateStaff, useDeactivateStaff } from "@/hook/usePostQuery";
import { toast } from "sonner";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { useGetStaffs } from "@/hook/useGetOverview";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";

import TableSearch from "@/components/table/TableSearch";
import SectionWrapper from "@/layouts/SectionWrapper";
import Filters from "@/components/table/filters";
import AddStaff from "./AddStaff";
import useStaffHeader from "@/hook/useStaffHeader";

// @ts-ignore
import withAuthAndRoleProtection from "@/hoc/withAuthAndRoleProtection";
import { APP_ROLES } from "@/types";

const options = [
	{ label: "All", value: "all" },
	{ label: "Admin", value: "ADMIN" },
	{ label: "Staff", value: "STAFF" },
];

function Staffs() {
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [showModal, setShowModal] = useState(false);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const { data: employeesData, isError, isLoading, refetch } = useGetStaffs();

	const activateMutation = useActivateStaff();
	const deactivateMutation = useDeactivateStaff();

	const headerContent = useStaffHeader(setShowModal, refetch);

	if (isError) toast.error("Something went wrong");

	const handleAction = async (id: "activate" | "deactivate") => {
		const selectedIds = selectedRows.map((row) => row.userId);

		if (selectedIds.length === 0) {
			toast.error("No staffs selected!");
			return;
		}
		let res = selectedIds.length === 1 ? "Staff" : "Staffs";

		try {
			if (id === "activate") {
				await activateMutation.mutateAsync(selectedIds);
				toast.success(`${res} activated successfully`);
			} else if (id === "deactivate") {
				await deactivateMutation.mutateAsync(selectedIds);
				toast.success(`${res} deactivated successfully`);
			}

			refetch();
		} catch (error) {
			toast.error("Error processing request");
		}
	};

	return (
		<SectionWrapper headerTitle="Staffs" customHeaderContent={headerContent}>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<>
					<div className="flex-column mt-3 gap-4">
						<div className="row-flex-btwn gap-3.5">
							<TableSearch
								columnFilters={columnFilters}
								setColumnFilters={setColumnFilters}
								placeholder="Search by email"
								filterBy="email"
							/>

							<Filters
								setColumnFilters={setColumnFilters}
								selectedFilter={selectedFilter}
								setSelectedFilter={setSelectedFilter}
								options={options}
								columnId="roleName"
								placeholder={"Filter by role"}
							/>
						</div>

						{selectedRows.length > 0 && (
							<div className="row-flex-btwn gap-3 rounded-sm bg-background-200 px-2.5 py-2 brightness-105 sm:gap-4">
								<p className="text-xs font-semibold">
									{selectedRows.length} row(s) selected
								</p>

								<div className="row-flex gap-2.5 ">
									<div
										className={cn("badge-long !bg-background-100")}
										onClick={() => handleAction("activate")}
									>
										Activate
										{activateMutation.isPending && (
											<BtnLoader
												isLoading={activateMutation.isPending}
												color="#16a34a "
											/>
										)}
									</div>
									<div
										className={cn("badge-long !bg-background-100")}
										onClick={() => handleAction("deactivate")}
									>
										Deactivate
										{deactivateMutation.isPending && (
											<BtnLoader isLoading={deactivateMutation.isPending} />
										)}
									</div>
								</div>
							</div>
						)}

						<DataTable
							columnFilters={columnFilters}
							columns={staffColumn}
							tableData={employeesData || []}
							setSelectedRows={setSelectedRows}
						/>
					</div>
				</>
			)}

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

export default withAuthAndRoleProtection(Staffs, [APP_ROLES.Admin]);
