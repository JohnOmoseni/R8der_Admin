import { Button } from "@/components/CustomButton";
import { Modal } from "@/components/ui/components/Modal";
import { Success as SuccessIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [showModal, setShowModal] = useState(true);

	const msg =
		state?.from === "edit" ? (
			<>
				You have successfully updated a <br /> new discount
			</>
		) : (
			<>
				You have successfully created <br /> a discount
			</>
		);

	return (
		<>
			{showModal && (
				<Modal
					openModal={showModal}
					setOpenModal={() => setShowModal(false)}
					modalStyles=""
					hideClose={true}
				>
					<div className="grid place-items-center pt-8 pb-4">
						<div className="flex-column !items-center gap-6">
							<div className="relative">
								<SuccessIcon className="h-fit w-fit" />
							</div>

							<div className="flex-column mt-1 !items-center gap-2">
								<h3 className="text-center text-lg">Success</h3>

								<p className="max-w-[50ch] px-2 text-center leading-5 text-grey">
									{msg}
								</p>

								<Button
									onClick={() => {
										setShowModal(false);
										navigate("/dashboard/settings");
									}}
									title="Close"
									className={cn("!mt-6 !w-full")}
								/>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

export default Success;
