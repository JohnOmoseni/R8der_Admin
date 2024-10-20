import { cn } from "@/lib/utils";
import { Button } from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

function VerifyOTP() {
	const { handleVerifyOtp, handleResendOtp, isLoadingAuth } = useAuth();
	const [otpValue, setOtpValue] = useState("");
	const [error, setError] = useState("");
	const isSubmitting = false;

	const onVerify = async () => {};

	const onResendOtp = async () => {};

	return (
		<>
			<div className="flex-column gap-1.5">
				<h3 className="text-2xl">Verify OTP</h3>
				<p className="leading-5 tracking-wide text-foreground-100 min-[500px]:w-max">
					Enter the 4-Digit OTP code sent to
					<p className="text-secondary font-normal">customer@email.com</p>
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
								className={cn("border-red-400 border-2  ring-red-400")}
								index={0}
							/>
							<InputOTPSlot className="" index={1} />
							<InputOTPSlot className="" index={2} />
							<InputOTPSlot className="" index={3} />
						</InputOTPGroup>
					</InputOTP>

					{error && (
						<p className="row-flex-start mt-2 text-base text-red-400">
							{error || "Incorrect OTP code"}
						</p>
					)}

					<p className="mt-1.5 leading-5 tracking-wide text-foreground-100">
						Resend code in:{" "}
						<span className="text-secondary inline-flex font-normal">
							02:59
						</span>
					</p>
				</div>
			</div>

			<Button
				type="submit"
				title={isSubmitting ? "Verifing..." : "Verify"}
				className={cn("!mt-auto !w-full !py-5")}
				disabled={true}
				isLoading={isLoadingAuth}
			/>
		</>
	);
}

export default VerifyOTP;
