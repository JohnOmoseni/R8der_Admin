import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";
import { ColumnFiltersState } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/CustomButton";
import { couponsColumn } from "@/components/table/columns/couponsColumn";
import { Modal } from "@/components/ui/components/Modal";
import TableSearch from "@/components/table/TableSearch";
import CouponModal from "../CouponModal";
import { useGetAllCouponCodes } from "@/hook/useSettings";

function Coupons() {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [showModal, setShowModal] = useState(false);

	const { data: couponCodes, isError, isLoading } = useGetAllCouponCodes();

	if (isError) toast.error("Error fetching information");

	return (
		<>
			{isLoading ? (
				<SkeletonLoader loaderVariant />
			) : (
				<>
					<div className="flex-column gap-3">
						<h3 className="">
							Discount and Coupons ({couponCodes?.length || 0})
						</h3>

						<div className="mt-3 row-flex-btwn gap-4">
							<TableSearch
								placeholder="Search by name, code"
								filterBy="code"
								columnFilters={columnFilters}
								setColumnFilters={setColumnFilters}
							/>

							<Button
								onClick={() => setShowModal(true)}
								title="Create Coupon"
								className={cn("!w-max")}
							/>
						</div>

						<div className="mt-4">
							<DataTable
								columns={couponsColumn}
								tableData={couponCodes || []}
								columnFilters={columnFilters}
							/>
						</div>
					</div>

					{showModal && (
						<Modal
							openModal={showModal}
							setOpenModal={() => setShowModal(false)}
							modalStyles=""
							hideClose={true}
						>
							<CouponModal
								type="create"
								setOpenModal={() => setShowModal(false)}
							/>
						</Modal>
					)}
				</>
			)}
		</>
	);
}

export default Coupons;
