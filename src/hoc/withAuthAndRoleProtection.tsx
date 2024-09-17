import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/constants";
import { toast } from "sonner";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import { useLocation, useNavigate } from "react-router-dom";

interface WithAuthAndRoleProtectionProps {
	allowedRoles: string[]; // Array of roles allowed to access the component
}

const withAuthAndRoleProtection = <P extends object>(
	WrappedComponent: React.ComponentType<P>,
	allowedRoles: string[]
) => {
	const ProtectedComponent = (props: P) => {
		const { user, token, isAuthenticated } = useAuth();
		const navigate = useNavigate();
		const { pathname } = useLocation();
		const role = "Admin";

		useEffect(() => {
			// Redirect to login if not authenticated
			if (!isAuthenticated || !token) {
				navigate(routes.LOGIN);
				toast.warning("Please log in.");
				return;
			}

			// Check if the user has the required role for this route
			const hasRequiredRole = allowedRoles.includes(role || "");

			// If the user doesn't have the required role, redirect to unauthorized page
			if (isAuthenticated && token && !hasRequiredRole) {
				navigate(routes.UNAUTH);
				toast.warning("Unauthorized access");
			}
		}, [isAuthenticated, token, role, allowedRoles, navigate, pathname]);

		if (token === undefined || role === undefined) {
			return <FallbackLoader />; // Show a loader while checking authentication and role
		}

		// If the user has the required role, render the wrapped component
		return <WrappedComponent {...props} />;
	};

	return ProtectedComponent;
};

export default withAuthAndRoleProtection;
