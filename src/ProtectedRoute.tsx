import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { routes } from "./constants";
import { useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function ProtectedRoute({ children }: PropsWithChildren) {
	const { user, token } = useAuth();
	const navigate = useNavigate();

	console.log("[Current user]", user);

	useLayoutEffect(() => {
		if (user === null || token === null) {
			navigate(routes.LOGIN, { replace: true });
		} else if (!user?.otpVerified && token) {
			// navigate(routes.VERIFY_OTP, { replace: true });
		}
	}, [navigate, user, token]);

	if (user === undefined) {
		return <FallbackLoader />;
	}

	return children;
}

export default ProtectedRoute;
