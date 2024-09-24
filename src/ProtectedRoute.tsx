import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";
import { routes } from "./constants";

function ProtectedRoute({ children }: PropsWithChildren) {
	const { user } = useAuth();
	const navigate = useNavigate();

	console.log("[Current user]", user);

	useLayoutEffect(() => {
		if (user === null) {
			// Redirect to login page
			navigate(routes.LOGIN, { replace: true });
		}
	}, [navigate, user]);

	if (user === undefined) return <FallbackLoader />;

	return children;
}

export default ProtectedRoute;
