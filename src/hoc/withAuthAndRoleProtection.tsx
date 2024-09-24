import { useLayoutEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/constants";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "@/components/fallback/FallbackLoader";

const withAuthAndRoleProtection = <P extends object>(
	WrappedComponent: React.ComponentType<P>,
	allowedRoles: string[] // Array of roles allowed to access the component
) => {
	const ProtectedComponent = (props: P) => {
		// @ts-ignore
		const { user, token, role } = useAuth();
		const { pathname } = useLocation();
		const navigate = useNavigate();

		useLayoutEffect(() => {
			// Redirect to login if not authenticated
			if (!token) {
				navigate(routes.LOGIN, { replace: true });
				toast.warning("Please log in.");
				return;
			}

			// Check if the user has the required role for this route
			const hasRequiredRole = allowedRoles.includes(role!);

			// If the user doesn't have the required role, redirect to unauthorized page
			if (token && !hasRequiredRole) {
				navigate(routes.UNAUTH);
				toast.warning("Unauthorized access");
			}
		}, [token, role, allowedRoles, pathname]);

		if (token === undefined || role === undefined) {
			return <FallbackLoader />; // Show a loader while checking authentication and role
		}

		// If the user has the required role, render the wrapped component
		return <WrappedComponent {...props} />;
	};

	return ProtectedComponent;
};

export default withAuthAndRoleProtection;
