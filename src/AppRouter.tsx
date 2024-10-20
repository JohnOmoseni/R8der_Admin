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

import LayoutProvider from "./providers/LayoutProvider";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";
import NotFound from "./layouts/NotFound";

const AppRouter = () => {
	return (
		<>
			<ScrollToTop />
			<ErrorBoundary>
				<Routes>
					<Route element={<LayoutProvider />}>
						<Route path="/" element={<Navigate to={"/dashboard"} />} />
						<Route path="*" element={<NotFound />} />

						<Route element={<AuthLayout />}>
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
									<Route
										path="add-staff/success"
										element={<AddStaffSuccess />}
									/>
								</Route>

								<Route path="settlements" element={<Settlements />} />

								<Route path="withdrawals" element={<Withdrawals />} />

								<Route path="settings">
									<Route index element={<Settings />} />
									<Route path="success" element={<CouponSuccess />} />
								</Route>
							</Route>
						</Route>
					</Route>
				</Routes>
			</ErrorBoundary>
		</>
	);
};

export default AppRouter;
