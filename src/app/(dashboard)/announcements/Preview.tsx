import EmptyList from "@/components/EmptyList";
import { Button } from "@/components/CustomButton";
import { AnnouncementType } from "@/types/server";
import { toTitleCase } from "@/utils";

function Preview({
	preview,
	closeModal,
}: {
	preview?: AnnouncementType;
	closeModal: () => void;
}) {
	const data = {
		channel: preview?.channel || "Push Notifications",
		subject: preview?.subject || "-",
		target: preview?.targetAudience,
		sub_target: preview?.subTargetAudience,
	};

	return (
		<div className="flex-column gap-3">
			<div className="my-3 px-1 grid">
				{data ? (
					<div className="flex-column gap-4">
						{Object.entries(data || []).map(([key, value], idx) => {
							return (
								<div key={idx} className="row-flex-btwn gap-4 px-0.5">
									<span className="min-w-[10ch] font-light text-foreground-100 capitalize ">
										{toTitleCase(key) || ""}
									</span>

									<p className="font-semibold capitalize max-w-[60ch] text-end">
										{value as any}
									</p>
								</div>
							);
						})}

						<div className="flex-column gap-2.5 mt-2 w-full">
							<p className="font-semibold">Message</p>

							<div className="rounded-lg w-full max-h-[200px] scrollbar-thin overflow-y-auto bg-background-100 py-5 px-4 pr-1.5 flex-column gap-4 shadow-sm">
								<p className="leading-5 text-foreground-100 w-full">
									{preview?.content}
								</p>
							</div>
						</div>
					</div>
				) : (
					<EmptyList
						emptyTitle="No data"
						emptySubText=""
						containerStyles="h-full"
					/>
				)}
			</div>

			<Button title="Close" onClick={closeModal} />
		</div>
	);
}

export default Preview;
