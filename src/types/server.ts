import { APP_ROLES, Status } from ".";

export interface GetOverviewParams {
	startDate: string;
	endDate: string;
}

export interface GetByIdParams {
	page?: number;
	size?: number;
	driverId: string;
	riderId: string;
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
	drivers: DriverType[];
}

// DRIVER DETAILS
export type TripsType = {
	tripId: string;
	amount: number;
	date: string;
	status: any;
};

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
	driverTrips: TripsType[];
	driverWithdraws: WithdrawType[];
}

// APPROVE / REJECT DRIVERS
export type SELECTEDTYPE = string[];

// STAFFS
export type AddStaffParams = {
	fullName: string;
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
