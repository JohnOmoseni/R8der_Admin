import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import api from "@/server/axios";
import { toast } from "sonner";
import { routes } from "@/constants";
import { authApi } from "@/server/actions/auth";
import { APP_ROLES, User } from "@/types";
import { NavigateFunction } from "react-router-dom";
import { Alert } from "@/constants/icons";

type AuthContextType = {
	user?: User | null;
	token?: string | null;
	role?: (typeof APP_ROLES)[keyof typeof APP_ROLES] | string | null;
	handleLogin: (
		email: string,
		password: string,
		isAdminRoute?: boolean
	) => Promise<void>;
	handleVerifyOtp: (otp: string, email: string) => Promise<void>;
	handleResendOtp: (email: string) => Promise<void>;
	handleLogout: () => Promise<void>;
	isAuthenticated?: boolean;
	isLoadingAuth?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderType = PropsWithChildren & {
	navigate: NavigateFunction;
};

export default function AuthProvider({
	children,
	navigate,
	...props
}: AuthProviderType) {
	const [user, setUser] = useState<User | null>();
	const [token, setToken] = useState<string | null>();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(false);
	const [role, setRole] = useState<
		(typeof APP_ROLES)[keyof typeof APP_ROLES] | string | null
	>();

	// Session timeout management
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const startSessionTimer = () => {
			if (timeoutId) clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				handleLogout();
				toast.info("Session expired. You have been logged out.");
			}, 30 * 60 * 1000); // 30 minutes
		};

		// Start the timer when user is authenticated
		if (isAuthenticated) {
			startSessionTimer();
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isAuthenticated]); // Only re-run when authentication status changes

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const storedUser = sessionStorage.getItem("currentUser_ryder");
				const token = sessionStorage.getItem("token_ryder");
				if (!token) {
					setToken(null);
					setUser(null);
					return;
				}

				const currentUser = JSON.parse(storedUser!);
				setToken(JSON.parse(token));
				setUser(currentUser);
				setRole(currentUser?.role);
			} catch (error) {
				setToken(null);
				setUser(null);
			}
		};

		fetchUser();
	}, []);

	const handleLogin = async (
		email: string,
		password: string,
		isAdminRoute?: boolean
	) => {
		if (!email || !password) return;
		setIsLoadingAuth(true);

		try {
			const data = await authApi.login({ email, password });

			if (!data?.status) throw new Error(data?.message || "Error Signing in");
			const response = data?.data;

			const authToken = response?.accessToken;

			const currentUser = {
				userId: response.userId,
				username: `${response?.firstName} ${response?.lastName}`,
				firstName: response.firstName,
				email: response.email,
				phone: response.phone,
				img: response.photosImagePath,
				otpVerified: false,
				role: response?.roles?.[0] === "admin-user" ? "ADMIN" : "STAFF",
				isAdminRoute,
			};

			setToken(authToken);
			setUser(currentUser);
			setRole(currentUser?.role);
			sessionStorage.setItem("currentUser_ryder", JSON.stringify(currentUser));
			sessionStorage.setItem("token_ryder", JSON.stringify(authToken));

			if (!isAdminRoute) {
				toast.success(data?.message || "Login successful. Please verify OTP.");
				navigate("/verify-otp");
			}
		} catch (error: any) {
			// null - request made and it failed
			const errorMessage = error?.response?.data?.message;
			let message = "Error signing in";

			if (errorMessage?.includes("Invalid username or password")) {
				message = "Email not found";
			} else if (errorMessage?.includes("Bad Credentials")) {
				message = "Incorrect password";
			}

			setToken(null);
			setUser(null);
			setRole(null);
			toast.error(
				<div className="row-flex-start gap-2">
					<Alert className="size-5 text-red-500 self-start" />
					<div className="flex-column gap-0.5">
						<h3>{errorMessage || message}</h3> <p className="">{message}</p>
					</div>
				</div>
			);
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleVerifyOtp = async (otp: string, email: string) => {
		if (!otp || !email) return;
		setIsLoadingAuth(true);

		try {
			const data = await authApi.verifyOtp({ otp, email });

			if (!data?.status)
				throw new Error(data?.message || "OTP verification failed");

			const updatedUser = {
				...user,
				otpVerified: true,
			};

			setUser(updatedUser as User);
			setIsAuthenticated(true);
			toast.success("OTP verified successfully. Redirecting to dashboard...");
			sessionStorage.setItem("currentUser_ryder", JSON.stringify(updatedUser));

			navigate("/dashboard");
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;
			toast.error(errorMessage || "Failed to verify OTP. Please try again.");
			throw new Error(errorMessage || "Failed to verify OTP.");
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleResendOtp = async (email: string) => {
		if (!email) return;

		try {
			const data = await authApi.resendOtp({ email });

			if (!data?.status)
				throw new Error(data?.message || "Failed to resend OTP");
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;

			throw new Error(errorMessage || "Failed to resend OTP.");
		}
	};

	const handleLogout = async () => {
		try {
			await authApi.logout();
			setToken(null);
			setUser(null);
			setIsAuthenticated(false);
			sessionStorage.removeItem("currentUser_ryder");
			sessionStorage.removeItem("token_ryder");

			toast.success("Logged out successfully");
			navigate(routes.LOGIN);
		} catch {
			toast.error(
				<div className="row-flex-start gap-2">
					<Alert className="size-5 text-red-500 self-start" />
					<div className="flex-column gap-0.5">
						<h3>Something went wrong</h3> <p className="">Failed to log out</p>
					</div>
				</div>
			);
		}
	};

	useLayoutEffect(() => {
		const requestInterceptor = api.interceptors.request.use((config: any) => {
			// if there is a token, add it to the headers of the request, otherwise passs the authorization header that was there before
			config.headers.Authorization =
				!config?._retry && token
					? `Bearer ${token}`
					: config.headers.Authorization;

			return config;
		});

		return () => {
			api.interceptors.request.eject(requestInterceptor);
		};
	}, [token]);

	useLayoutEffect(() => {
		const refreshInterceptor = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;

				if (
					error?.response?.status === 403 &&
					error?.response?.message === "Unauthorized"
				) {
					originalRequest._retry = true;
					try {
						const response = await authApi.refreshAccessToken();
						setToken(response.data?.accessToken);

						originalRequest.headers.Authorization = `Bearer ${response.data?.accessToken}`;

						return api.request(originalRequest);
					} catch (error) {
						console.error("Failed to refresh token:", error);
					}
				}

				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.response.eject(refreshInterceptor);
		};
	}, [token]);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				role,
				isAuthenticated,
				isLoadingAuth,
				handleLogin,
				handleLogout,
				handleVerifyOtp,
				handleResendOtp,
			}}
			{...props}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
