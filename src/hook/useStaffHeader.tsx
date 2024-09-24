import { DropdownList } from "@/components/ui/components/DropdownList";
import { Plus, Setting } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type Props = Dispatch<SetStateAction<boolean>>;

export default function useStaffHeader(setShowModal: Props) {
	const topAction =
		"badge small-text min-w-[125px] gap-2 !bg-transparent !pl-2.5 !pr-4";

	let headerContent;
	headerContent = (
		<div className="max-[450px]:hidden row-flex-start gap-3 md:border-r border-border-100 md:pr-4">
			<DropdownList
				showSeparator
				trigger={
					<div className={cn("action-styles", "sm:!px-4")}>
						<Setting className="size-4" />
						<p className="mt-0.5 font-semibold">Manage Roles</p>
					</div>
				}
				list={[
					<div className="w-full mb-1 mx-0.5">
						<p className="font-semibold">Admin</p>
						<p className="mt-1 text-xs">
							Can manage everything on the platform
						</p>
					</div>,
					<div className=" w-full mt-1 mx-0.5">
						<p className="font-semibold">Staff</p>
						<p className="mt-1 text-xs">Can only view items on the platform </p>
					</div>,
				]}
			/>

			<div
				className={cn(
					topAction,
					"!border-border-variant !bg-secondary !text-secondary-foreground"
				)}
				onClick={() => setShowModal(true)}
			>
				<Plus className="size-4 text-secondary-foreground" />
				<p className="mt-0.5 font-semibold">Add Staff</p>
			</div>
		</div>
	);

	return headerContent;
}
