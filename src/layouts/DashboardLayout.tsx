import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";

export default function DashboardLayout() {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/firebase-messaging-sw.js")
				.then((registration) => {
					console.log("Service Worker registered:", registration);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);

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
