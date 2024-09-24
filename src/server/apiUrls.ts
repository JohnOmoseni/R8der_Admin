export const API_DOMAIN =
	import.meta.env.VITE_API_ENDPOINT || "http://tripiee.com";

if (!API_DOMAIN) {
	throw new Error("API_DOMAIN is not defined in the environment variables.");
}

export default {
	// Auth Requests
	LOGIN: `/trip/account/auth/signin`,
	LOGOUT: `/trip/account/auth/logout`,
	REFRESH_TOKEN: `/auth/refresh-token`,

	// GET Requests
	GET_SUMMARY: `/trip/dashboard/rider/driver/overview`,

	GET_RIDERS: `/trip/dashboard/rider/overview`,
	GET_RIDER_DETAILS: `/trip/dashboard/rider`,

	GET_TRIP: `/trip/dashboard/trips/overview`,

	GET_DRIVERS: `/trip/dashboard/drivers/overview`,
	GET_DRIVER_DETAILS: `/trip/dashboard/driver`,

	GET_ALL_ROLES: `/api/staffs/all_roles`,
	GET_STAFFS_ADMINS: `/trip/dashboard/staff-and-admin`,
	GET_ALL_ADMINS: `/trip/dashboard/admin`,
	GET_ALL_STAFFS: `/trip/dashboard/staff`,
	GET_STAFF_DETAILS: `/trip/dashboard/search-users`,

	// POST Requests
	POST_APPROVE_DRIVER: `/trip/dashboard/driver/verify/accept`,
	POST_REJECT_DRIVER: `/trip/dashboard/driver/verify/reject`,
	POST_ADD_STAFF: `/api/staffs/add_staff`,

	// UPDATE Requests
	PUT_ACTIVATE_STAFF: `/trip/dashboard/staff/activate`,
	PUT_DEACTIVATE_STAFF: `/trip/dashboard/staff/deactivate`,
};
