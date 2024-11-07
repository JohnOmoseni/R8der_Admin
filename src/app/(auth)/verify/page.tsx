import { cn } from "@/lib/utils";
import { Button } from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function VerifyOTP() {
	const { handleVerifyOtp, handleResendOtp, isLoadingAuth, user } = useAuth();
	const [otpValue, setOtpValue] = useState("");
	const [error, setError] = useState("");
	const [resendCountdown, setResendCountdown] = useState(180);
	const [isResendingOtp, setIsResendingOtp] = useState(false);
	const [isCountdownActive, setIsCountdownActive] = useState(false);
	const [isResendRequested, setIsResendRequested] = useState(false);
	const [hasMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isCountdownActive && resendCountdown > 0) {
			const interval = setInterval(() => {
				setResendCountdown((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else if (resendCountdown === 0) {
			setIsCountdownActive(false);
		}
	}, [isCountdownActive, resendCountdown]);

	useEffect(() => {
		(async () => {
			await handleResend();
			setIsMounted(true);
		})();
	}, []);

	const handleSubmit = async () => {
		setError("");

		try {
			await handleVerifyOtp(otpValue, user?.email || "");
		} catch (e) {
			setError("Failed to verify OTP.");
		} finally {
		}
	};

	const handleResend = async () => {
		if (isResendingOtp) return;
		setError("");
		setIsResendingOtp(true);

		try {
			await handleResendOtp(user?.email || "");

			setResendCountdown(180);
			setIsCountdownActive(true);
			if (hasMounted) {
				toast.success("OTP resent successfully");
				setIsResendRequested(true);
			}
		} catch (e: any) {
			toast.error(e?.message || "Failed to resend OTP");
			setError("Failed to resend OTP. Please try again.");
		} finally {
			setIsResendingOtp(false);
		}
	};

	return (
		<>
			<div className="flex-column gap-1.5">
				<h3 className="text-2xl">Verify OTP</h3>
				<p className="leading-5 tracking-wide text-foreground-100 min-[500px]:w-max">
					Enter the 4-Digit OTP code sent to
					<span className="text-secondary block font-normal">
						{user?.email || (
							<span className="italic tracking-wide">unknown</span>
						)}
					</span>
				</p>
			</div>

			<div className="pt-4 pb-6">
				<div className="flex-column gap-3">
					<InputOTP
						maxLength={4}
						value={otpValue}
						onChange={(value) => setOtpValue(value)}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={0}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={1}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={2}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={3}
							/>
						</InputOTPGroup>
					</InputOTP>

					{error && (
						<p className="font-semibold tracking-wide text-base text-red-500">
							Incorrect OTP code
						</p>
					)}

					<div className="">
						{resendCountdown === 0 ? (
							<span
								className="font-semibold text-secondary cursor-pointer"
								onClick={handleResend}
							>
								{isResendingOtp && hasMounted ? "Resending..." : "Resend OTP"}
							</span>
						) : (
							<p className="mt-0.5 leading-5 text-foreground-100 tracking-wide">
								Resend code in:{" "}
								<span className="text-secondary inline-flex font-normal">
									{Math.floor(resendCountdown / 60)
										.toString()
										.padStart(2, "0")}
									:{(resendCountdown % 60).toString().padStart(2, "0")}
								</span>
							</p>
						)}
					</div>
				</div>
			</div>

			<Button
				type="submit"
				title={isLoadingAuth ? "Verifing..." : "Verify"}
				className={cn("!mt-auto !w-full !py-5")}
				disabled={isLoadingAuth || otpValue.length !== 4}
				onClick={handleSubmit}
				isLoading={isLoadingAuth}
			/>
		</>
	);
}

export default VerifyOTP;
