import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { routes } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function AuthProtectedRoute({ children }: PropsWithChildren) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const pathname = useLocation().pathname as string;

	useLayoutEffect(() => {
		if (user && pathname === "/signin") {
			// Redirect to dashboard page if already logged in
			navigate(routes.DASHBOARD, { replace: true });
		}
	}, [navigate, user, pathname]);

	if (user === undefined) return <FallbackLoader />;

	return children;
}

export default AuthProtectedRoute;
