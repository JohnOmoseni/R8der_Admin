import CouponForm from "@/components/forms/CouponForm";
import { Close } from "@/constants/icons";
import { CouponResponseType } from "@/types/server";

function CouponModal({
	closeModal,
	type,
	coupon,
}: {
	closeModal: () => void;
	coupon?: CouponResponseType;
	type?: "edit" | "create";
}) {
	return (
		<div className="">
			<div className="pb-4">
				<div className="badge" onClick={closeModal}>
					<Close className="icon size-4" />
					<p className="mt-[1px] text-sm leading-none font-medium capitalize transition">
						Close
					</p>
				</div>
			</div>

			<div className="flex-1 border-t border-border px-0.5 pt-5">
				<h3 className="capitalize text-[1.2rem]">
					{type === "create" ? "Create A Discount" : "Edit Discount"}
				</h3>
				<CouponForm type={type} coupon={coupon} />
			</div>
		</div>
	);
}

export default CouponModal;
