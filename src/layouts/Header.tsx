import TooltipWrapper from "@/components/ui/components/TooltipWrapper";

import { ReactNode } from "react";
import { Bell, Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";

function Header({
	title,
	customContent,
}: {
	title?: string;
	customContent?: () => ReactNode;
}) {
	const dispatch = useDispatch();

	return (
		<div className="flex-column relative z-10 min-h-[60px] w-full justify-center border-b border-border-100 px-6 py-3">
			<div className="row-flex-btwn gap-6">
				<h2 className="capitalize">{title || "Overview"}</h2>

				<div className="row-flex gap-4">
					{customContent && customContent()}

					<div
						className={cn(
							"hidden place-items-center md:grid",
							customContent && "pl-4"
						)}
					>
						<TooltipWrapper
							trigger={
								<span className="icon-div">
									<Bell className="size-5" />
								</span>
							}
							content={<p className="p-1 text-center">Notification</p>}
						/>
					</div>

					<div
						className="row-flex group cursor-pointer sm:hidden"
						onClick={() => dispatch(setOpenMenu(true))}
					>
						<Menu className="size-6 transition-all group-hover:scale-95" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
