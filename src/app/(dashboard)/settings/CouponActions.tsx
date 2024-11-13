import { Modal } from "@/components/ui/components/Modal";
import { KeyboardArrowDown } from "@/constants/icons";
import { CouponResponseType } from "@/types/server";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { DropdownVariant } from "@/components/ui/components/DropdownVariant";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import CouponModal from "./CouponModal";
import { useDeactivateCoupon, useDeleteCoupon } from "@/hook/useSettings";

const dropdownList = ["Edit", "Delete", "Deactivate"];

function CouponActions({ coupon }: { coupon: CouponResponseType }) {
	const [openEditModal, setOpenEditModal] = useState(false);
	const deactivateMutation = useDeactivateCoupon();
	const deleteMutation = useDeleteCoupon();
	const navigate = useNavigate();

	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		dropdownList!?.map(() => false)
	);

	const onClickHandlers: { [index: number]: () => Promise<void> } = {
		0: () => Promise.resolve(setOpenEditModal(true)),
		1: () => handleDeleteCoupon(),
		2: () => handleDeactivateAcoupon(),
	};

	const handleItemClick = async (
		idx: number,
		closeDropdown: () => void,
		event: React.MouseEvent
	) => {
		event.stopPropagation();
		if (!onClickHandlers && !onClickHandlers[idx]) return;

		setLoadingStates((prev) => {
			const newStates = [...prev];
			newStates[idx] = true;
			return newStates;
		});

		try {
			await onClickHandlers[idx]();
		} finally {
			closeDropdown();

			setLoadingStates((prev) => {
				const newStates = [...prev];
				newStates[idx] = false;
				return newStates;
			});
		}
	};

	const handleDeactivateAcoupon = async () => {
		try {
			await deactivateMutation.mutateAsync(coupon?.target);
			toast.success("Coupon deactivated successfully");
			navigate(0);
		} catch {
			toast.error("Something went wrong");
		}
	};

	const handleDeleteCoupon = async () => {
		try {
			await deleteMutation.mutateAsync(coupon?.target);
			toast.success("Coupon deleted successfully");
			navigate(0);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<>
			<DropdownVariant
				trigger={
					<p className="badge-long">
						Action
						<KeyboardArrowDown className="size-4" />
					</p>
				}
				list={dropdownList}
				renderItem={(item, index, closeDropdown) => {
					return (
						<>
							<DropdownMenuItem
								key={index}
								onClick={(event) =>
									handleItemClick(index, closeDropdown, event)
								}
							>
								<div className="row-flex-btwn w-full gap-2">
									{item?.icon && <item.icon className="mr-2 size-4" />}

									{item}
									{loadingStates[index] && (
										<BtnLoader isLoading={loadingStates[index]} />
									)}
								</div>
							</DropdownMenuItem>
						</>
					);
				}}
			/>

			{openEditModal && (
				<Modal
					openModal={openEditModal}
					setOpenModal={() => setOpenEditModal(false)}
					modalStyles="!pt-3"
				>
					<CouponModal
						type="edit"
						coupon={coupon}
						closeModal={() => setOpenEditModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default CouponActions;
