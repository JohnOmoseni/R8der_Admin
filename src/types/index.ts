import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

export const APP_ROLES = {
	Admin: "Admin",
	User: "User",
	Staff: "Staff",
};

export type Status =
	| "VERIFED"
	| "NOT_VERIFIED"
	| "APPROVED"
	| "SUCCESS"
	| "ACTIVE"
	| "COMPLETED"
	| "REQUESTED"
	| "CANCELLED"
	| "ACCEPTED"
	| "IN_PROGRESS"
	| "FAILED"
	| "DEACTIVATED";

export type ROLE = "admin" | "staff";

export type User = {
	userId: string;
	username: string;
	firstName: string;
	email: string;
	phone: string;
	img: string;
	role: (typeof APP_ROLES)[keyof typeof APP_ROLES];
};

export type SidebarLinksProp = {
	icon: any;
	label: string;
	href: string;
	tag?: string;
};

export type TabsPanelProp = {
	activeTab: string;
	id: string;
	idx: number;
	children: React.ReactNode;
};

export type TabsProps = {
	activeTab: string;
	changeTab: (id: string) => void;
	tabIDs: string[];
};

export type TabProps = {
	id: string;
	activeTab: string;
	tab: string;
	changeTab: (id: string) => void;
	className?: string;
};

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
