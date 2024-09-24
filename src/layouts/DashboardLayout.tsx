import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/Sidebar";

export default function DashboardLayout() {
	return (
		<div className="flex w-full h-full flex-col md:flex-row">
			<div className="scrollbar-thin overflow-x-hidden border-r border-border relative hidden w-72 overflow-y-auto shadow-sm md:block">
				<Sidebar />
			</div>

			<div className="flex-1 h-full overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
}
