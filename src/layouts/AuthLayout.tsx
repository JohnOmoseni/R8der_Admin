import { Outlet } from "react-router-dom";
import { Logo } from "@/constants/icons";
import { Link } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className="fixed h-full w-full overflow-hidden bg-[#033678] px-3 py-6">
			<Link to="#" className="row-flex mx-auto w-[96%] px-3">
				<Logo className="h-fit w-16 object-contain text-center" />
			</Link>

			<div className="absolute left-1/2 top-1/2 mt-10 min-h-[320px] min-w-[300px] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background px-5 py-6 shadow-sm min-[450px]:w-full">
				<div className="flex-column gap-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
