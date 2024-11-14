import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { SidebarLinksProp } from "@/types";
import {
	logo,
	Logout as Logout,
	Userround as UserRound,
} from "@/constants/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import Collapsible from "@/components/ui/components/Collapsible";

type SidebarProps = SidebarLinksProp & { isAccordion?: boolean };

const LinkRow = ({ href, icon: Icon, label, tag, idx }: SidebarProps) => {
	const link =
		"group relative w-full row-flex-start leading-none whitespace-nowrap  transition-all brightness-90";
	const linkInner =
		"row-flex-start w-full gap-1.5 font-semibold transition-all";
	const activeLink = cn(link, "text-foreground-variant brightness-100");

	const { pathname } = useLocation();
	const isActive =
		pathname === href ||
		(pathname.startsWith(`${href}/`) && pathname.includes(tag!));

	return (
		<div title={tag} className={link}>
			{idx === 1 ? (
				<TripCollapsible
					label={label}
					href={href}
					Icon={Icon}
					pathname={pathname}
					linkInner={linkInner}
				/>
			) : (
				<Link
					className={cn(linkInner, "nav-link group-hover:scale-105")}
					to={href}
				>
					<Icon className={cn(isActive && "stroke-variant", "size-6")} />
					<span
						className={cn(
							"mt-0.5 text-[1rem] font-semibold ",
							isActive && activeLink
						)}
					>
						{label}
					</span>
				</Link>
			)}
		</div>
	);
};

function Sidebar() {
	const { role, user, handleLogout } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const onLogout = async () => {
		setIsLoading(true);
		await handleLogout();

		setIsLoading(false);
	};

	return (
		<motion.div className="flex size-full pt-6">
			<div className="flex-column w-full">
				<div className="flex-column gap-12 px-[20%]">
					<Link to="/" className="row-flex-start">
						<img
							src={logo}
							alt="logo"
							className="h-fit w-[4.5rem] object-contain max-md:mx-auto"
						/>
					</Link>

					<ul className="flex-column w-full gap-3">
						{sidebarLinks.map((link, idx) => {
							let label = (
								<span className="my-2 inline-block text-xs text-grey">
									{idx === 1 ? " Booking management" : "Operations"}
								</span>
							);
							const isLinkAllowed =
								link.showAlways || (role && link.allowedRoles.includes(role));

							return (
								<React.Fragment key={idx}>
									{(idx === 1 || idx === 4) && label}
									{isLinkAllowed ? (
										<li className="">
											<LinkRow key={idx} {...link} idx={idx} />
										</li>
									) : null}
								</React.Fragment>
							);
						})}
					</ul>
				</div>

				<div className="mx-auto mt-auto bottom-0 w-72">
					<div className=" my-6 flex-column border-t border-border-100 pt-4 pl-[50px]">
						<div className="row-flex-start gap-2">
							{user?.img ? (
								<AvatarWrapper src={user.img} />
							) : (
								<UserRound className="h-fit w-auto" />
							)}
							<span className="mt-1 row-flex-btwn gap-3 text-base capitalize flex-1 pr-6">
								{user?.firstName || "User"}

								<span className="badge !text-xs !py-1 !cursor-auto">
									{role || "User"}
								</span>
							</span>
						</div>

						<div
							className="row-flex-start mt-5 cursor-pointer gap-3"
							onClick={onLogout}
						>
							<span className="text-base mt-0.5">
								{isLoading ? "Signing out" : "Log out"}
							</span>

							{isLoading ? (
								<BtnLoader isLoading={isLoading} />
							) : (
								<Logout className="h-fit w-5" />
							)}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
export default Sidebar;

type TripCollapsibleType = {
	href: string;
	Icon: any;
	label: string;
	pathname: string;
	linkInner: string;
};

export const TripCollapsible = ({
	href,
	Icon,
	label,
	pathname,
	linkInner,
}: TripCollapsibleType) => {
	const circle =
		"w-3 h-3 rounded-full border-[3px] border-foreground shadow bg-transparent";
	return (
		<Collapsible
			trigger={
				<Link
					className={cn(linkInner, "hover:scale-105")}
					to={href}
					state="Customers"
				>
					<Icon
						className={cn(
							pathname.includes("/dashboard/trips") && "stroke-variant",
							"size-6"
						)}
					/>
					<span
						className={cn(
							"mt-0.5 font-semibold text-[1rem]",
							pathname.includes("/dashboard/trips") &&
								"text-foreground-variant brightness-100"
						)}
					>
						{label}
					</span>
				</Link>
			}
			content={() => (
				<div className="flex-column mt-4 mb-2 gap-3 px-2">
					<Link
						to="/dashboard/trips/customers"
						state={"Customer"}
						className={cn(
							linkInner,
							"py-0 hover:scale-95",
							pathname === "/dashboard/trips/customers" && "text-secondary"
						)}
					>
						<span
							className={cn(
								circle,
								pathname === "/dashboard/trips/customers" && "border-secondary"
							)}
						/>
						<span className="font-semibold mt-[2px] text-sm">Customers</span>
					</Link>
					<Link
						to="/dashboard/trips/drivers"
						state={"Driver"}
						className={cn(
							linkInner,
							"py-0 hover:scale-95",
							pathname === "/dashboard/trips/drivers" && "text-secondary"
						)}
					>
						<span
							className={cn(
								circle,
								pathname === "/dashboard/trips/drivers" && "border-secondary"
							)}
						/>
						<span className="font-semibold mt-[2px] text-sm">Drivers</span>
					</Link>
				</div>
			)}
		/>
	);
};
