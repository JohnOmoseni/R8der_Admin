import { ReactNode } from "react";
import { Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";

function Header({
	title,
	customContent,
}: {
	title?: string;
	customContent?: () => ReactNode;
}) {
	const dispatch = useDispatch();

	return (
		<div className="relative z-10 sm:min-h-[60px] w-full border-b px-3.5 sm:px-6 py-3">
			<div className="flex justify-between gap-6">
				<h2 className="capitalize">{title || "Overview"}</h2>

				<div className="flex gap-3">
					{customContent && customContent()}

					<div
						className="flex group cursor-pointer md:hidden"
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
