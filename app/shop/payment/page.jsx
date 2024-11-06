"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RazorpayCheckout() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const orderId = searchParams.get("orderId");
	const phone = searchParams.get("phone");
	const order = searchParams.get("order");
	const [paymentStatus, setPaymentStatus] = useState("loading");

	useEffect(() => {
		let rzpInstance = null;

		const loadRazorpay = async () => {
			if (orderId && typeof window !== "undefined") {
				try {
					const script = document.createElement("script");
					script.src = "https://checkout.razorpay.com/v1/checkout.js";
					script.async = true;

					await new Promise((resolve, reject) => {
						script.onload = resolve;
						script.onerror = reject;
						document.body.appendChild(script);
					});

					// Small delay to ensure Razorpay is fully loaded
					await new Promise((resolve) => setTimeout(resolve, 1000));

					initializeRazorpay();
				} catch (error) {
					console.error("Error loading Razorpay:", error);
					setPaymentStatus("failure");
				}
			}
		};

		const forceClosePopup = () => {
			// Try multiple methods to close the popup
			if (rzpInstance) {
				try {
					rzpInstance.close();
					console.log("Closed via instance method");
				} catch (e) {
					console.error("Error closing via instance method:", e);
				}
			}

			// Attempt to find and close modal directly
			const modalElement = document.querySelector(".razorpay-container");
			if (modalElement) {
				modalElement.style.display = "none";
				console.log("Closed via DOM manipulation");
			}

			// Clear any backdrop
			const backdrop = document.querySelector(".razorpay-backdrop");
			if (backdrop) {
				backdrop.style.display = "none";
			}
		};

		const initializeRazorpay = () => {
			const options = {
				key: "rzp_test_uMQ4AiVL7v76C2",
				order_id: orderId,
				handler: function (response) {
					console.log("Payment Success:", response);
					setPaymentStatus("success");
					forceClosePopup();
					router.push(`/shop/orders/${order}`);
				},
				modal: {
					ondismiss: function () {
						console.log("Checkout form closed by user");
						setPaymentStatus("dismissed");
						forceClosePopup();
					},
					escape: true,
				},
				prefill: { phone },
			};

			try {
				rzpInstance = new window.Razorpay(options);
				rzpInstance.on("payment.failed", function (response) {
					console.log("Payment Failed:", response);
					setPaymentStatus("failure");
					forceClosePopup();
					// You might want to redirect here
					// router.push('/payment-failed');
				});
				rzpInstance.open();
			} catch (error) {
				console.error("Error initializing Razorpay:", error);
				setPaymentStatus("failure");
			}
		};

		loadRazorpay();

		// Cleanup function
		return () => {
			forceClosePopup();
		};
	}, [orderId, phone]);

	// Helper function to retry payment
	const retryPayment = () => {
		setPaymentStatus("loading");
		window.location.reload();
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				{paymentStatus === "loading" && (
					<p className="text-lg">Loading payment gateway...</p>
				)}
				{paymentStatus === "success" && (
					<div>
						<h2 className="text-2xl font-bold text-green-600">
							Payment Successful!
						</h2>
						<p className="mt-2">Thank you for your purchase.</p>
					</div>
				)}
				{(paymentStatus === "failure" || paymentStatus === "dismissed") && (
					<div>
						<h2 className="text-2xl font-bold text-red-600">
							{paymentStatus === "failure"
								? "Payment Failed"
								: "Payment Cancelled"}
						</h2>
						<p className="mt-2">
							{paymentStatus === "failure"
								? "Sorry, there was an issue processing your payment."
								: "You have closed the payment window."}
						</p>
						<button
							onClick={retryPayment}
							className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
						>
							Retry Payment
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
