import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import Dashboard from "./app/(dashboard)/page";
import Customers from "./app/(dashboard)/customers/page";
import Drivers from "./app/(dashboard)/drivers/page";
import Staffs from "./app/(dashboard)/staffs/page";
import AddStaffSuccess from "./app/(dashboard)/staffs/success/page";
import Settings from "./app/(dashboard)/settings/page";
import Withdrawals from "./app/(dashboard)/withdrawals/page";
import CustomerProfile from "./app/(dashboard)/customers/profile/page";
import DriverProfile from "./app/(dashboard)/drivers/profile/page";

import LayoutProvider from "./providers/LayoutProvider";
import ScrollToTop from "./components/ScrollToTop";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";

const AppRouter = () => {
	return (
		<>
			<ScrollToTop />
			<ErrorBoundary>
				<Routes>
					<Route element={<LayoutProvider />}>
						<Route path="/signin" element={<SignIn />} />
						<Route path="/" element={<Navigate to={"/dashboard"} />} />

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

								<Route path="drivers">
									<Route index element={<Drivers />} />
									<Route path="profile/:id" element={<DriverProfile />} />
								</Route>

								<Route path="staffs" element={<Staffs />} />
								<Route path="add-staff/success" element={<AddStaffSuccess />} />

								<Route path="withdrawals" element={<Withdrawals />} />
								<Route path="settings" element={<Settings />} />
							</Route>
						</Route>
					</Route>
				</Routes>
			</ErrorBoundary>
		</>
	);
};

export default AppRouter;
