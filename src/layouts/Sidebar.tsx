import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { SidebarLinksProp } from "@/types";
import { Switch } from "@/components/ui/switch";
import {
	logo,
	Logout as Logout,
	Userround as UserRound,
} from "@/constants/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const LinkRow = ({ href, icon: Icon, label, tag }: SidebarLinksProp) => {
	const link =
		"group relative w-full row-flex-start leading-none whitespace-nowrap text-base transition-all brightness-90";
	const activeLink = cn(link, "text-foreground-variant brightness-100");

	const { pathname } = useLocation();
	const isActive = pathname === href;

	return (
		<li title={tag} className={isActive ? activeLink : link}>
			<Link
				className="nav-link row-flex-start size-full gap-1.5 py-1 font-semibold transition-all group-hover:scale-105"
				to={href}
			>
				<Icon className={cn(isActive && "stroke-variant", "size-5")} />

				{label}
			</Link>
		</li>
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
								<span className="mt-2 inline-block text-xs text-grey">
									{idx === 1 ? " Booking management" : "Operations"}
								</span>
							);

							return (
								<div className="" key={idx}>
									{(idx === 1 || idx === 4) && label}
									{link.allowedRoles.includes(role!) ? (
										<LinkRow key={idx} {...link} />
									) : null}
								</div>
							);
						})}
					</ul>
				</div>

				<div className="mx-auto mt-auto fixed bottom-0 w-72">
					<div className="mb-6 mt-12">
						<div className="pl-[50px]">
							<div className="row-flex-start gap-2.5">
								<p className="font-semibold">Live mode</p>
								<Switch />
							</div>
							<p className="my-2.5 text-xs font-light text-foreground-variant">
								Switch to Dev mode
							</p>
						</div>

						<div className="flex-column border-t border-border-100 pt-4 pl-[50px]">
							<div className="row-flex-start gap-2">
								{user?.img ? (
									<AvatarWrapper src={user.img} />
								) : (
									<UserRound className="h-fit w-auto" />
								)}
								<span className="mt-1 inline-flex text-base capitalize">
									{user?.firstName || "User"}
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
									<ClipLoader
										loading={isLoading}
										size={18}
										color={"red"}
										aria-label="Loading"
										data-testid="loader"
										className="row-flex mr-1.5 text-secondary"
									/>
								) : (
									<Logout className="h-fit w-5" />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
export default Sidebar;
