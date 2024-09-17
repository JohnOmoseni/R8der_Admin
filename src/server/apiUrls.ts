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

	// POST Requests
	POST_APPROVE_DRIVER: `/trip/dashboard/driver/verify/accept`,
	POST_REJECT_DRIVER: `/trip/dashboard/driver/verify/reject`,
};
