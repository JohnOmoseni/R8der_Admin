import { cn } from "@/lib/utils";
import { Button } from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

function VerifyOTP() {
	const { handleVerifyOtp, handleResendOtp, isLoadingAuth, user } = useAuth();
	const [otpValue, setOtpValue] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resendCountdown, setResendCountdown] = useState(180);

	useEffect(() => {
		if (resendCountdown > 0) {
			const interval = setInterval(() => {
				setResendCountdown((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [resendCountdown]);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setError("");

		try {
			await handleVerifyOtp(Number(otpValue), user?.email || "");
		} catch (e) {
			console.log("TESTE", e, "running");
			setError("Failed to verify OTP.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResend = async () => {
		setError("");
		setResendCountdown(180);

		try {
			await handleResendOtp(user?.email || "");
		} catch (e) {
			setError("Failed to resend OTP. Please try again.");
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

					<p className="mt-1.5 leading-5 tracking-wide text-foreground-100">
						Resend code in:{" "}
						<span className="text-secondary inline-flex font-normal">
							{Math.floor(resendCountdown / 60)
								.toString()
								.padStart(2, "0")}
							:{(resendCountdown % 60).toString().padStart(2, "0")}
						</span>
					</p>

					{resendCountdown === 0 && (
						<Button
							title="Resend OTP"
							className=" !w-max !px-3.5"
							onClick={handleResend}
							disabled={isSubmitting}
						/>
					)}
				</div>
			</div>

			<Button
				type="submit"
				title={isSubmitting ? "Verifing..." : "Verify"}
				className={cn("!mt-auto !w-full !py-5")}
				disabled={isSubmitting || otpValue.length !== 4}
				onClick={handleSubmit}
				isLoading={isLoadingAuth}
			/>
		</>
	);
}

export default VerifyOTP;
