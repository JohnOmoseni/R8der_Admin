import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/components/Modal";
import { ColumnFiltersState } from "@tanstack/react-table";
import { staffColumn } from "@/components/table/columns/staffColumn";
import { toast } from "sonner";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { APP_ROLES } from "@/types";
import {
	useActivateStaff,
	useDeactivateStaff,
	useDeleteStaff,
	useGetStaffs,
} from "@/hook/useStaffs";

import TableSearch from "@/components/table/TableSearch";
import SectionWrapper from "@/layouts/SectionWrapper";
import Filters from "@/components/table/filters";
import AddStaff from "./AddStaff";
import useStaffHeader from "@/hook/useStaffHeader";

import withAuthAndRoleProtection from "@/hoc/withAuthAndRoleProtection";

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
	const { data: employeesData, isError, isFetching, refetch } = useGetStaffs();

	const activateMutation = useActivateStaff();
	const deactivateMutation = useDeactivateStaff();
	const deleteStaffMutation = useDeleteStaff();

	const headerContent = useStaffHeader(setShowModal, refetch);

	if (isError) toast.error("Something went wrong");

	const handleAction = async (id: "activate" | "deactivate" | "delete") => {
		const selectedIds = selectedRows.map((row) => row.userId);

		if (selectedIds.length === 0) {
			toast.error("No staffs selected!");
			return;
		}
		let res = selectedIds.length === 1 ? "Staff" : "Staffs";

		try {
			if (id === "activate") {
				const response = await activateMutation.mutateAsync(selectedIds);
				const message = response?.message;

				toast.success(message || `${res} activated successfully`);
			} else if (id === "deactivate") {
				const response = await deactivateMutation.mutateAsync(selectedIds);
				const message = response?.message;

				toast.success(message || `${res} deactivated successfully`);
			} else if (id === "delete") {
				const response = await deleteStaffMutation.mutateAsync(selectedIds);
				const message = response?.message;

				toast.success(message || `${res} deleted successfully`);
			}

			refetch();
		} catch (error: any) {
			const message = error.response?.data?.message;
			toast.error(message || "Error processing request");
		}
	};

	return (
		<SectionWrapper headerTitle="Staffs" customHeaderContent={headerContent}>
			{isFetching ? (
				<SkeletonLoader />
			) : (
				<>
					<div className="flex-column gap-4">
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
							<div className="row-flex-btwn gap-3 max-sm:!flex-wrap rounded-sm bg-background-200 px-2.5 py-2 brightness-105 sm:gap-4">
								<p className="text-xs font-semibold max-sm:text-center w-full">
									{selectedRows.length} row(s) selected
								</p>

								<div className="row-flex gap-2.5 w-full">
									<div
										className={cn(
											"badge-long !bg-background-100 !w-full",
											activateMutation.isPending &&
												"!grid grid-cols-[1fr_auto] !gap-2.5"
										)}
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
										className={cn(
											"badge-long !bg-foreground !text-secondary-foreground !w-full",
											deactivateMutation.isPending &&
												"!grid grid-cols-[1fr_auto] !gap-2.5 !px-8"
										)}
										onClick={() => handleAction("deactivate")}
									>
										Deactivate
										{deactivateMutation.isPending && (
											<BtnLoader isLoading={deactivateMutation.isPending} />
										)}
									</div>

									<div
										className={cn(
											"badge-long  !bg-red-700 !text-secondary-foreground !w-full",
											deleteStaffMutation.isPending &&
												"!grid grid-cols-[1fr_auto] !gap-2.5"
										)}
										onClick={() => handleAction("delete")}
									>
										Delete
										{deleteStaffMutation.isPending && (
											<BtnLoader isLoading={deleteStaffMutation.isPending} />
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
					hideClose={true}
				>
					<AddStaff setOpenModal={() => setShowModal(false)} />
				</Modal>
			)}
		</SectionWrapper>
	);
}

export default withAuthAndRoleProtection(Staffs, [APP_ROLES.Admin]);
