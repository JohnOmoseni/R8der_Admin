import CouponForm from "@/components/forms/CouponForm";
import { Close } from "@/constants/icons";
import { CouponResponseType } from "@/types/server";

function CouponModal({
	setOpenModal,
	type,
	coupon,
}: {
	setOpenModal: () => void;
	coupon?: CouponResponseType;
	type?: "edit" | "create";
}) {
	return (
		<div className="">
			<div className=" px-4 pb-4">
				<div className="badge" onClick={setOpenModal}>
					<Close className="icon size-4" />
					<p className="mt-[1px] text-sm font-medium capitalize transition">
						Close
					</p>
				</div>
			</div>

			<div className="flex-1 border-t border-border px-6 pb-6 pt-8">
				<h3 className="capitalize text-[1.2rem]">
					{type === "create" ? "Create A Discount" : "Edit Discount"}
				</h3>
				<CouponForm type={type} coupon={coupon} />
			</div>
		</div>
	);
}

export default CouponModal;
