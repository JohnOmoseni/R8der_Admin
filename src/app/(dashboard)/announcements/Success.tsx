import { Button } from "@/components/CustomButton";
import { Success_2 as SuccessIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { AnnouncementParams } from "@/types/server";

function Success({
	data,
	closeModal,
}: {
	data: AnnouncementParams | null;
	closeModal: () => void;
}) {
	return (
		<div className="grid place-items-center">
			<div className="flex-column !items-center gap-4">
				<div className="relative">
					<SuccessIcon className="h-fit w-fit" />
				</div>

				<div className="flex-column mt-2 !items-center gap-2">
					<h3 className="text-center text-lg">Broadcast Sent</h3>

					<p className="max-w-[50ch] text-center leading-7">
						<span className="text-grey">
							You have successfully shared a broadcast to:
						</span>

						<span className="font-semibold inline-block ">
							[{data?.targetAudience || "target"}]{" "}
							<span className="text-grey">to</span> [
							{data?.subTargetAudience || "sub-target"}]
						</span>
					</p>

					<Button onClick={closeModal} title="Close" className={cn("!mt-8")} />
				</div>
			</div>
		</div>
	);
}

export default Success;
