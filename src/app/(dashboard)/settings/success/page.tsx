import { Button } from "@/components/CustomButton";
import { Success as SuccessIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
	const navigate = useNavigate();
	const { state } = useLocation();

	const msg =
		state?.from === "edit" ? (
			<>
				You have successfully created a <br /> new discount
			</>
		) : (
			<>
				You have successfully updated <br /> a discount
			</>
		);

	return (
		<div className="grid place-items-center h-[95vh]">
			<div className="flex-column !items-center gap-6">
				<div className="relative">
					<SuccessIcon className="h-fit w-fit" />
				</div>

				<div className="flex-column mt-2 !items-center gap-2.5">
					<h3 className="text-center text-lg">Success</h3>

					<p className="max-w-[50ch] px-2 text-center leading-5 text-grey">
						{msg}
					</p>

					<Button
						onClick={() => navigate("/dashboard/settings")}
						title="Close"
						className={cn("!mt-8 !w-full")}
					/>
				</div>
			</div>
		</div>
	);
}

export default Success;
