import { APP_ROLES } from "@/types";
import {
	Announcement,
	Banknote,
	Car,
	Dashboard,
	Money,
	Settings,
	User,
	Users,
	Usersquare,
} from "./icons";

export const routes = {
	ROOT: "/",
	LOGIN: "/signin",
	VERIFY_OTP: "/verify-otp",
	UNAUTH: "/dashboard",
	DASHBOARD: "/dashboard",
	PUBLIC_ROUTES: ["/signin", "/verify-otp"],
	ADMIN_ROUTES: [
		"/dashboard/staffs",
		"/dashboard/withdrawals",
		"/dashboard/settlements",
	],
};

export const tabIDs = ["Profile", "Trips"];

export const selectOptions = [
	{ label: "Today", value: "today" },
	{ label: "Yesterday", value: "yesterday" },
	{ label: "Last 7 days", value: "week" },
	{ label: "Last 30 days", value: "month" },
	{ label: "This Year", value: "year" },
	{ label: "Custom", value: "custom" },
];

export const sidebarLinks = [
	{
		label: "Dashboard",
		href: "/dashboard",
		tag: "dashboard",
		icon: Dashboard,
		allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
		showAlways: true,
	},
	{
		label: "Trips",
		href: "/dashboard/trips/customers",
		tag: "trips",
		icon: Car,
		allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
	},
	{
		label: "Customers",
		href: "/dashboard/customers",
		tag: "customers",
		icon: Users,
		allowedRoles: [APP_ROLES.Admin, APP_ROLES.Staff],
	},
	{
		label: "Drivers",
		href: "/dashboard/drivers",
		tag: "drivers",
		icon: Usersquare,
		allowedRoles: [APP_ROLES.Admin, APP_ROLES.Staff],
	},
	{
		label: "Settlements",
		href: "/dashboard/settlements",
		tag: "settlements",
		icon: Money,
		allowedRoles: [APP_ROLES.Admin],
	},
	{
		label: "Withdrawals",
		href: "/dashboard/withdrawals",
		tag: "withdrawals",
		icon: Banknote,
		allowedRoles: [APP_ROLES.Admin],
	},
	{
		label: "Users",
		href: "/dashboard/staffs",
		tag: "staffs",
		icon: User,
		allowedRoles: [APP_ROLES.Admin],
	},
	{
		label: "Announcements",
		href: "/dashboard/announcements",
		tag: "announcements",
		icon: Announcement,
		showAlways: true,
		allowedRoles: [APP_ROLES.Admin],
	},
	{
		label: "Settings",
		href: "/dashboard/settings",
		tag: "settings",
		icon: Settings,
		allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
		showAlways: true,
	},
];

export const staffSelectOptions = [
	{
		value: "admin",
		label: (
			<div className="flex-column gap-1">
				<p className="font-semibold">Admin</p>
				<p className="text-sm text-foreground-100">
					Can manage everything on the platform
				</p>
			</div>
		),
	},
	{
		value: "staff",
		label: (
			<div className="flex-column gap-1">
				<p className="font-semibold">Staff</p>
				<p className="text-sm text-foreground-100">
					Can only view items on the platform
				</p>
			</div>
		),
	},
];

// Overview Defaults
export const defaultTrips = [
	{
		label: "Total trips completed",
		volume: 0,
		value: "A$ 0.00",
		status: "high",
	},
	{
		label: "Total uncompleted trips",
		volume: 0,
		value: "A$ 0.00",
		status: "low",
	},
	{
		label: "Total trips in progress",
		volume: 0,
		value: "A$ 0.00",
		status: "neutral",
	},
];

export const defaultDriverStats = [
	{
		label: "Total registered drivers",
		value: 0,
		status: "high",
	},
	{
		label: "Total verified drivers",
		value: 0,
		status: "high",
	},
	{
		label: "Total unverified drivers",
		value: 0,
		status: "low",
	},
];

export const defaultCustomerStats = [
	{
		label: "Total registered customers",
		value: 0,
		status: "high",
	},
	{
		label: "Customers that have taken trips",
		value: 0,
		status: "high",
	},
	{
		label: "Total unverified drivers",
		value: 0,
		status: "low",
	},
];

export const defaultRevenueStats = [
	{
		label: "Total Revenue Volume",
		value: "0",
		isValue: false,
	},
	{
		label: "Total Revenue Value",
		value: "0",
		isValue: true,
	},
	{
		label: "Drivers Debts",
		value: "0",
		isValue: true,
	},
];

// Profile defaults
export const infoMapper = (profileInfo: any): Record<string, any> => ({
	name: profileInfo?.fullName,
	email: profileInfo?.emailAddress,
	phone: profileInfo?.phone,
	address: profileInfo?.img || "123 Main St",
	city: profileInfo?.img || "New York",
	state: profileInfo?.img || "NY",
	userSince: profileInfo?.img || "2021-01-01",
	img: profileInfo?.img,
});

export const customerInfoMapper = (profileInfo: any) => ({
	deviceType: profileInfo?.deviceType,
	totalSpent: profileInfo?.totalAmountPaid,
	totalTrips: profileInfo?.totalTrips,
	creditCard: "****-****-****-4567",
	paymentMethods: profileInfo?.paymentMethods || [
		"Credit Card",
		"PayPal",
		"Apple Pay",
	],
});

export const driverInfoMapper = (profileInfo: any) => ({
	walletNo: profileInfo?.wallet,
	status: profileInfo?.status,
	rating: profileInfo?.rating,
	totalEarnings: profileInfo?.earnings,
	totalTrips: profileInfo?.totalTrips,
	vehicleBrand: profileInfo?.vehicleBrand,
	vehicleModel: profileInfo?.vehicleModel,
	vehiclePlateNumber: profileInfo?.vehiclePlateNumber,
	vehicleColor: profileInfo?.vehicleColour,
	vehicleYear: profileInfo?.vehicleYear,
});

export const keyMappings: Record<
	string,
	Array<{ key: string; label: string }>
> = {
	customerInfo: [
		{ key: "name", label: "Full name" },
		{ key: "email", label: "Email address" },
		{ key: "phone", label: "Phone number" },
		{ key: "paymentMethods", label: "Payment methods" },
		{ key: "orders", label: "Total trips" },
		{ key: "totalSpent", label: "Total amount paid" },
	],
	driverInfo: [
		{ key: "status", label: "Status" },
		{ key: "name", label: "Full name" },
		{ key: "email", label: "Email address" },
		{ key: "phone", label: "Phone number" },
		{ key: "walletNo", label: "Wallet number" },
		{ key: "rating", label: "Rating" },
		{ key: "totalTrips", label: "Total trips" },
		{ key: "totalEarnings", label: "Total Earnings" },
	],
	vehicleInfo: [
		{ key: "vehicleBrand", label: "Vehicle brand" },
		{ key: "vehicleModel", label: "Vehicle model" },
		{ key: "vehiclePlateNumber", label: "Vehicle plate number" },
		{ key: "vehicleColor", label: "Vehicle colour" },
		{ key: "vehicleYear", label: "Vehicle year of production" },
	],
	documents: [
		{ key: "driverPhotoImage", label: "Driver's photo" },
		{ key: "driverLicenceImage", label: "Driver's License" },
		{ key: "insuranceDocumentImage", label: "Insurance document" },
		{ key: "vehicleImage", label: "Vehicle Images" },
		{ key: "inspectionDocumentImage", label: "Inspection document" },
	],
	default: [
		{ key: "name", label: "Full name" },
		{ key: "email", label: "Email address" },
		{ key: "phone", label: "Phone number" },
	],
};
