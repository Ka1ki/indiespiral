// app/reset-password/page.js
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAccountStore from "@/stores/useAccountStore";
import * as authApi from "@/api/auth";
import { toast } from "react-toastify";

function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const [email, setEmail] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otpVerified, setOtpVerified] = useState(false);
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const router = useRouter();

	// Prefill email from query parameter if available
	useEffect(() => {
		const prefillEmail = searchParams.get("email");
		if (prefillEmail) {
			setEmail(prefillEmail);
		}
	}, [searchParams]);

	// Mutations to handle OTP sending and verifying
	const sendOtp = useMutation(authApi.emailOtpOptions(() => setOtpSent(true)));
	const verifyOtp = useMutation(
		authApi.verifyEmailOtpOptions(() => setOtpVerified(true))
	);
	const resetPassword = useMutation(
		authApi.resetPasswordOptions(() => router.push("/account/login"))
	);

	function handleSendOtp(e) {
		e.preventDefault();
		sendOtp.mutate(email);
	}

	function handleVerifyOtp(e) {
		e.preventDefault();
		verifyOtp.mutate({ email, otp });
	}

	function handleResetPassword(e) {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		resetPassword.mutate({ email, otp, password: newPassword });
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center">Reset Password</h2>

				{/* Email Field */}
				<div>
					<label className="label">Email</label>
					<input
						type="email"
						className="w-full input input-bordered"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						disabled={email.length > 0}
					/>
				</div>

				{/* OTP Section */}
				{!otpSent && (
					<button
						className="w-full mt-4 btn btn-primary"
						onClick={handleSendOtp}
					>
						Send OTP
					</button>
				)}

				{otpSent && !otpVerified && (
					<>
						<div>
							<label className="label">OTP</label>
							<input
								type="text"
								className="w-full input input-bordered"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								placeholder="Enter OTP"
							/>
						</div>
						<button
							className="w-full mt-4 btn btn-primary"
							onClick={handleVerifyOtp}
						>
							Submit OTP
						</button>
					</>
				)}

				{/* New Password Fields */}
				{otpVerified && (
					<>
						<div>
							<label className="label">New Password</label>
							<input
								type="password"
								className="w-full input input-bordered"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="Enter new password"
							/>
						</div>
						<div>
							<label className="label">Confirm Password</label>
							<input
								type="password"
								className="w-full input input-bordered"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm new password"
							/>
						</div>
						<button
							className="w-full mt-4 btn btn-primary"
							onClick={handleResetPassword}
						>
							Reset Password
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default ResetPasswordPage;
