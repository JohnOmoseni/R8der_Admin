import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import VerifyOTP from "./app/(auth)/verify/page";

import Dashboard from "./app/(dashboard)/page";
import Customers from "./app/(dashboard)/customers/page";
import Drivers from "./app/(dashboard)/drivers/page";
import Staffs from "./app/(dashboard)/staffs/page";
import AddStaffSuccess from "./app/(dashboard)/staffs/success/page";
import Settings from "./app/(dashboard)/settings/page";
import Withdrawals from "./app/(dashboard)/withdrawals/page";
import CustomerProfile from "./app/(dashboard)/customers/profile/page";
import DriverProfile from "./app/(dashboard)/drivers/profile/page";
import Trips from "./app/(dashboard)/trips/page";
import CouponSuccess from "./app/(dashboard)/settings/success/page";
import Settlements from "./app/(dashboard)/settlements/page";
import Announcements from "./app/(dashboard)/announcements/page";
import CreateAnnouncement from "./app/(dashboard)/announcements/CreateAnnouncement";

import LayoutProvider from "./providers/LayoutProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./layouts/NotFound";
import AuthProtectedRoute from "./AuthProtectedRoute";
import MapboxMap from "./(maps)/MapBoxMap";

const AppRouter = () => {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route element={<LayoutProvider />}>
					<Route path="/" element={<Navigate to={"/dashboard"} />} />

					<Route path="/share">
						<Route index element={<MapboxMap />} />
					</Route>

					<Route
						element={
							<AuthProtectedRoute>
								<AuthLayout />
							</AuthProtectedRoute>
						}
					>
						<Route path="/signin" element={<SignIn />} />
						<Route path="/verify-otp" element={<VerifyOTP />} />
					</Route>

					<Route
						element={
							<ProtectedRoute>
								<DashboardLayout />
							</ProtectedRoute>
						}
					>
						<Route path="/dashboard">
							<Route index element={<Dashboard />} />
							<Route path="*" element={<Dashboard />} />

							<Route path="customers">
								<Route index element={<Customers />} />
								<Route path="profile/:id" element={<CustomerProfile />} />
							</Route>

							<Route path="trips">
								<Route index element={<Trips />} />
								<Route path="*" element={<Trips />} />
							</Route>

							<Route path="drivers">
								<Route index element={<Drivers />} />
								<Route path="profile/:id" element={<DriverProfile />} />
							</Route>

							<Route path="staffs">
								<Route index element={<Staffs />} />
								<Route path="add-staff/success" element={<AddStaffSuccess />} />
							</Route>

							<Route path="withdrawals" element={<Withdrawals />} />
							<Route path="settlements" element={<Settlements />} />

							<Route path="announcements">
								<Route index element={<Announcements />} />
								<Route path="create" element={<CreateAnnouncement />} />
							</Route>

							<Route path="settings">
								<Route index element={<Settings />} />
								<Route path="success" element={<CouponSuccess />} />
							</Route>
						</Route>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};

export default AppRouter;
