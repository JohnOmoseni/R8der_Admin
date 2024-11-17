import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { CommissionType } from "./server";

export const APP_ROLES = {
	Admin: "ADMIN",
	User: "USER",
	Staff: "STAFF",
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
	| "DEACTIVATED"
	| "Verified"
	| "Not Verified"
	| "Active"
	| "Inactive"
	| "Deactivated";

export type ROLE = "ADMIN" | "STAFF";

export type User = {
	userId: string;
	username: string;
	firstName: string;
	email: string;
	phone: string;
	img: string;
	otpVerified: boolean;
	role: (typeof APP_ROLES)[keyof typeof APP_ROLES];
};

export type LoadingState = {
	type: "approve" | "deactivate" | "";
	loading: boolean;
};

export type SidebarLinksProp = {
	icon: any;
	label: string;
	href: string;
	tag?: string;
	idx?: number;
};

export type TabsPanelProp = {
	activeTab: number;
	id: string;
	idx: number;
	children: React.ReactNode;
};

export type TabsProps = {
	activeTab: number;
	changeTab: (idx: number) => void;
	tabIDs: string[];
};

export type TabProps = {
	idx: number;
	activeTab: number;
	tab: string;
	changeTab: (idx: number) => void;
	className?: string;
};

export type SettingsDataType = {
	basicTripFee?: number;
	luxuryTripFee?: number;
	driverCommissionType?: CommissionType;
	driverCommissionAmount?: number;
};

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
