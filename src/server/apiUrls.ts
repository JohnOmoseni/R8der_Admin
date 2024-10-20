export const API_DOMAIN =
	import.meta.env.VITE_API_ENDPOINT || "http://tripiee.com";

if (!API_DOMAIN) {
	throw new Error("API_DOMAIN is not defined in the environment variables.");
}

export default {
	// Auth Requests
	LOGIN: `/trip/account/auth/signin`,
	LOGOUT: `/trip/account/auth/logout`,
	VERIFY_OTP: `/trip/account/auth/otp/verify`,
	RESEND_OTP: `/trip/account/auth/send/otp`,
	REFRESH_TOKEN: `/auth/refresh-token`,

	// GET Requests
	GET_SUMMARY: `/trip/dashboard/rider/driver/overview`,
	GET_REVENUE_STATS: `/trip/dashboard/revenue/stats`,

	GET_RIDERS: `/trip/dashboard/rider/overview`,
	GET_RIDER_DETAILS: `/trip/dashboard/rider`,

	GET_TRIP: `/trip/dashboard/trips/overview`,
	GET_TRIP_PERFORMANCE: `/trip/dashboard/trips/performance`,
	GET_ALL_TRIPS: `/trip/dashboard/trips/summary`,
	GET_TRIP_DETAILS: `/trip/dashboard/tripdetails`,

	GET_DRIVERS: `/trip/dashboard/drivers/overview`,
	GET_DRIVER_DETAILS: `/trip/dashboard/driver`,

	GET_WITHDRAWALS: `/trip/dashboard/withdrawals/summary`,
	GET_WITHDRAWAL_DETAILS: `/trip/dashboard/withdrawaldetails`,

	GET_ALL_ROLES: `/api/staffs/all_roles`,
	GET_STAFFS_ADMINS: `/trip/dashboard/staff-and-admin`,
	GET_ALL_ADMINS: `/trip/dashboard/admin`,
	GET_ALL_STAFFS: `/trip/dashboard/staff`,
	GET_STAFF_DETAILS: `/trip/dashboard/search-users`,

	GET_SETTINGS: "/trip/dashboard/settings",

	GET_COUPON_CODES: `/trip/dashboard/coupon-codes`,
	GET_COUPON_BYTARGET: `/trip/dashboard/coupon-target`,
	GET_COUPON_BYCODE: `/trip/dashboard/coupon-code`,

	// POST Requests
	POST_APPROVE_DRIVER: `/trip/dashboard/driver/verify/accept`,
	POST_REJECT_DRIVER: `/trip/dashboard/driver/verify/reject`,
	POST_ADD_STAFF: `/trip/dashboard/add/staff`,

	POST_CREATE_COUPON: `/trip/dashboard/new-coupon`,

	// UPDATE Requests
	PUT_ACTIVATE_STAFF: `/trip/dashboard/staff/activate`,
	PUT_DEACTIVATE_STAFF: `/trip/dashboard/staff/deactivate`,

	PUT_UPDATE_SETTINGS: `/trip/dashboard/settings`,
	PATCH_UPDATE_SETTINGS: `/trip/account/auth/change/password`,

	PUT_UPDATE_COUPON: `/trip/dashboard/update`,
	PUT_DEACTIVATE_COUPON: `/trip/dashboard/deactivate`,

	PUT_UPDATE_ROLE: `/trip/dashboard/update/role`,

	PUT_APPROVE_DOCUMENT: `/trip/dashboard/document/approval`,

	// DELETE Requests
	DELETE_COUPON: `/trip/dashboard/delete`,
};
