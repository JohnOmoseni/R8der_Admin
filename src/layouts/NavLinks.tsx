import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { setOpenMenu } from "@/redux/features/appSlice";
import { animateFn, linksAni } from "@/utils/animate";
import { SidebarLinksProp, useAppDispatch, useAppSelector } from "@/types";
import { Link, useLocation } from "react-router-dom";

export type NavLinkProps = SidebarLinksProp & {
	idx?: number;
};

function NavLinks({ label, href, icon: Icon, tag, idx }: NavLinkProps) {
	const { pathname } = useLocation();
	const isActive =
		pathname === href ||
		(pathname.startsWith(`${href}/`) && pathname.includes(tag!));
	const { openMenu } = useAppSelector((state) => state.appState);

	const dispatch = useAppDispatch();

	const handleClick = () => {
		if (openMenu) dispatch(setOpenMenu(false));
	};

	return (
		<li title={tag} className="nav-link relative w-full">
			<Link
				to={href}
				{...animateFn(linksAni, idx)}
				onClick={() => handleClick()}
				className="row-flex-start gap-3 p-1 transition-all"
			>
				<Icon className={cn(isActive && "stroke-variant", "size-5")} />

				<motion.span
					className={cn(
						"tracking-snug mt-0.5 text-base font-semibold capitalize",
						isActive && "text-foreground-variant"
					)}
				>
					{label}
				</motion.span>
			</Link>
		</li>
	);
}

export default NavLinks;
