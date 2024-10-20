import { ReactNode } from "react";
import { ArrowRight, Bell, Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";

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

				<div className="row-flex gap-3">
					{customContent && customContent()}

					<div
						className={cn("place-items-center grid", customContent && "pl-2")}
					>
						<PopoverWrapper
							containerStyles="rounded-xl border-border-100 min-w-[360px] py-6"
							trigger={
								<span
									className="icon-div !bg-background-100 relative"
									title="Notification"
								>
									<Bell className="size-4" />

									<span className="absolute size-1.5 bg-red-500 rounded-full right-[0.52rem] top-[0.35rem]"></span>
								</span>
							}
						>
							<Notification />
						</PopoverWrapper>
					</div>

					<div
						className="row-flex group cursor-pointer md:hidden"
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

const Notification = () => (
	<div className="flex-column gap-3 px-1.5">
		<div className="row-flex-btwn gap-4">
			<h3 className="font-semibold text-[1.05rem]">Notifications</h3>

			<span className="text-sm text-secondary cursor-pointer font-semibold active:scale-95 transition">
				Mark all as read
			</span>
		</div>

		<ul className="px-0.5 mt-4 mb-2 not-first-of-type:border-t">
			<li className="grid grid-cols-[max-content_1fr] gap-3 py-2">
				<span className="size-3 mt-1 bg-grey-200 rounded-full clip-circle" />

				<div className="flex-column pr-1">
					<h4 className="font-semibold"> Commission received</h4>
					<p className="grey-text !font-light line-clamp-2 break-all">
						A driver just paid you 10% commission
					</p>
					<span className="text-[0.7rem] mt-1 text-grey-200 tracking-wide">
						03:40pm - 23 Sept, 2024
					</span>
				</div>
			</li>
		</ul>

		<div className="cursor-pointer transition active:scale-95 text-base row-flex pt-3 px-4 mt-auto text-secondary font-semibold">
			View More
			<ArrowRight className="size-4 ml-1" />
		</div>
	</div>
);
