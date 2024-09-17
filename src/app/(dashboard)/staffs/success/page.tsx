import { Button } from "@/components/CustomButton";
import { Success as SuccessIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

function Success() {
	const navigate = useNavigate();

	return (
		<div className="grid place-items-center h-vh">
			<div className="flex-column !items-center gap-6">
				<div className="relative">
					<SuccessIcon className="h-fit w-fit" />
				</div>

				<div className="flex-column mt-2 !items-center gap-2.5">
					<h3 className="text-center text-lg">Success</h3>

					<p className="max-w-sm px-2 text-center leading-5 text-grey">
						You have successfully added a new staff
					</p>

					<Button
						onClick={() => navigate("/staffs")}
						title="Close"
						className={cn("!mt-auto !w-full")}
					/>
				</div>
			</div>
		</div>
	);
}

export default Success;
