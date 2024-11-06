import { crud, createQueryOptions, createMutationOptions } from "@/api/crud";
import useAccountStore from "@/stores/useAccountStore";
import { error } from "console";
const route = "/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//count
export function countOptions(
	setIsExistingUser: (isExistingUser: boolean) => void,
	setId: (id: string) => void,
	goToResetPage: () => void
) {
	return createMutationOptions(
		[route, "check"],
		(email: string) => crud.get(`${route}/count`, { email, type: "user" }),
		{
			onSuccess: (data) => {
				if (data.length && data[0].phoneVerified == false) {
					toast.warn("Create a Password to login");
					goToResetPage();
				} else {
					setId(data.length ? data[0]._id : "");
					setIsExistingUser(data.length ? true : false);
				}
			},
			onError: (error) => {
				toast.error("An error occurred");
			},
		}
	);
}

// login
interface LoginInput {
	uid: string;
	pass: string;
}
export function loginOptions() {
	return createMutationOptions(
		[route, "login"],
		(data: LoginInput) => crud.post(`${route}/login`, data),
		{
			onSuccess: (data) =>
				useAccountStore.getState().login(data.account, data.token),
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);
}

// signup
interface SignupInput {
	name: string;
	email: string;
	phone: string;
	pass: string;
}
export function signupOptions() {
	return createMutationOptions(
		[route, "signup"],
		(data: SignupInput) => crud.post(`${route}/signup`, data),
		{
			onSuccess: (data) =>
				useAccountStore.getState().login(data.account, data.token),
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);
}

//send email otp
export function emailOtpOptions(setOtpSent: (otpSent: boolean) => void) {
	return createMutationOptions(
		[route, "email", "otp"],
		(email: string) => crud.post(`${route}/email/otp`, { email }),
		{
			onSuccess: (data) => {
				setOtpSent(true);
				toast.success("OTP sent to your email");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);
}

//verify email otp
export function verifyEmailOtpOptions(
	setOtpVerified: (otpVerified: boolean) => void
) {
	return createMutationOptions(
		[route, "email", "otp", "verify"],
		(data: { email: string; otp: string }) =>
			crud.post(`${route}/email/otp/verify`, data),
		{
			onSuccess: (data) => {
				setOtpVerified(true);
				toast.success("Email verified");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);
}

//reset password with otp
export function resetPasswordOptions(goToLoginPage: () => void) {
	return createMutationOptions(
		[route, "reset", "password"],
		(data: { email: string; pass: string; otp: string }) =>
			crud.post(`${route}/password/reset`, data),
		{
			onSuccess: (data) => {
				toast.success("Password reset successfully");
				goToLoginPage();
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);
}
