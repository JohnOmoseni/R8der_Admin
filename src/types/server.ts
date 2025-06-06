import { APP_ROLES, Status } from ".";

export interface GetOverviewParams {
	startDate: string;
	endDate: string;
}

export type PeriodTypeParams =
	| "TODAY"
	| "YESTERDAY"
	| "WEEK"
	| "MONTH"
	| "YEAR"
	| "ALLTIME"
	| "ALL"
	| "CUSTOM";

export type DriverStandingParams = "ALL" | "VERIFIED" | "UNVERIFIED" | "OWING";

export interface GetByIdParams {
	driverId: string;
	riderId: string;
	periodType?: PeriodTypeParams;
}

// RIDERS
export interface GetRidersResponse {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dateCreated: string;
	trips: number;
	riderId: string;
}

export interface GetRiderByIdResponse {
	fullName: string;
	firstName?: string;
	lastName?: string;
	emailAddress: string;
	phoneNumber: string;
	created_at?: string;
	paymentMethod: string;
	totalTrips: number;
	totalAmountPaid: number;
	riderTrips: TripType[];
}

// DRIVERS
export interface DriverType {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dateCreated: string;
	trips: string | number;
	driverId: string;
	status?: Status;
	averageRating?: number;
}

export interface GetDriversResponse {
	totalDrivers: number;
	verifiedDrivers: number;
	unverifiedDrivers: number;
	owningDrivers: number;
	drivers: DriverType[];
}

// DRIVER DETAILS
export type TripType = {
	tripId: string;
	amount: number;
	date: string;
	status: any;
};

// DRIVER WITHDRAW TYPE
export type WithdrawType = {
	type: string | null;
	refId: string | null;
	amount: number;
	bank: string | null;
	accountNo: string | null;
	date: string;
	status: any;
};

export interface DriverDetailsType {
	fullName: string | null;
	emailAddress: string | null;
	phoneNumber: string | null;
	status: any;
	wallet: string | null;
	averageRating: number;
	totalTrips: number;
	earnings: number;
	vehicleBrand: string | null;
	vehicleModel: string | null;
	vehiclePlateNumber: string | null;
	vehicleColour: string | null;
	vehicleYear: number;
	vehicleImage: [string | null, string | null, string | null, string | null];
	driverPhotoImage: string | null;
	driverLicenceImage: string | null;
	insuranceDocumentImage: string | null;
	inspectionDocumentImage: string | null;
	driverTrips: TripType[];
	driverWithdraws: WithdrawType[];
	dateJoined: string | null;
	vehicleImagesApproved: Status | null;
	driversLicenseApproved: Status | null;
	driversPhotoApproved: Status | null;
	insuranceDocumentApproved: Status | null;
	otherInspectionDocumentApproved: Status | null;
}

// APPROVE / REJECT DRIVERS
export type SELECTEDTYPE = string[];
export type DOCUMENT_TYPE =
	| "DRIVERS_LICENSE"
	| "DRIVERS_PHOTO"
	| "INSURANCE_DOCUMENT"
	| "VEHICLE_IMAGES"
	| "INSPECTION_DOCUMENT";

export type ApproveDriverDocument = {
	documentType: DOCUMENT_TYPE;
	approve: boolean;
	id: string;
};

// STAFFS
export type AddStaffParams = {
	firstName: string;
	lastName: string;
	email: string;
	roleStatus?: (typeof APP_ROLES)[keyof typeof APP_ROLES];
};

export interface GetAllEmployeesType {
	name: string;
	email: string;
	roleName: string;
	dateAdded: string;
	status: Status;
	userId: string;
}

export interface UpdateRoleParams {
	email: string;
	newRoleName: "staff-user" | "admin-user";
}

// TRIPS
export interface AllTripsType {
	totalTrips: number;
	totalValue: number;
	trip: TripsType[];
}

export interface TripsType {
	riderName: string;
	driverName: string;
	tripId: string;
	amount: number;
	status: Status;
	date: string;
}

// WITHDRWAWALS
export interface WithdrawalType {
	customer_name: string;
	type: string;
	ref_id: string;
	amount: number;
	bank: string;
	account_no: string;
	date: string;
	status: Status;
	transaction_id: string;
}

export interface SettlementType {
	driver_name: string;
	id: string;
	trip_amount: number;
	trip_id: string;
	transaction_id: string;
	date: string | null | undefined;
	driver_commission: string;
	percentage: string;
	status: Status;
}

// ANNOUNCEMENTS
export type AnnouncementType = {
	id: number | string;
	subject: string;
	content: string;
	targetAudience: "DRIVER" | "CUSTOMER";
	subTargetAudience:
		| "PENDING_REGISTRATION"
		| "GENERAL"
		| "COMPLETED_REGISTRATION";
	publishDate: Date | null;
	channel: "EMAIL" | "PUSH";
	publishedBy?: string;
};

export type AnnouncementParams = {
	id?: string;
	subject: string;
	content: string;
	targetAudience: "DRIVER" | "CUSTOMER";
	subTargetAudience:
		| "PENDING_REGISTRATION"
		| "GENERAL"
		| "COMPLETED_REGISTRATION";
	channel: "EMAIL" | "PUSH";
	publishedBy: string;
};

// SETTINGS - Settings List
export type CommissionType = "FLAT" | "PERCENTAGE";

export type SettingsType =
	| "BASIC_TRIP_FEE"
	| "LUXURY_TRIP_FEE"
	| "DRIVER_COMM_FEE";
export interface SettingsResponse {
	settingsType: SettingsType;
	commissionType: CommissionType;
	value: number;
}

export type UpdatePasswordParams = {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

export type CouponTargetParmas = "DRIVERS" | "CUSTOMERS";
export type DiscountTypeParmas = "PERCENTAGE" | "FIXED";

export type CouponResponseType = {
	code: string;
	description: string;
	target: CouponTargetParmas;
	discountType: DiscountTypeParmas;
	amount: number | string;
	active?: boolean;
	expiryDate: string | Date;
};

export interface LocationResponse {
	status: string;
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	isp: string;
	org: string;
	as: string;
	query: string;
}
