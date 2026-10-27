"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayCustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  gstin?: string;
}

export interface RazorpayCheckoutOptions {
  amountInRupees: number;
  orderReferenceId: string;
  customer: RazorpayCustomerDetails;
  description?: string;
  notes?: Record<string, string | number | undefined>;
  onSuccess: (paymentResult: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onError: (errorMsg: string) => void;
  onDismiss?: () => void;
}

/**
 * Loads the official Razorpay Checkout SDK script dynamically.
 */
export function loadRazorpayCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay Checkout SDK script.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/**
 * Triggers the official Razorpay Standard Checkout popup.
 * Connects with server-side order creation and cryptographic signature verification.
 */
export async function triggerRazorpayCheckout({
  amountInRupees,
  orderReferenceId,
  customer,
  description = "Corporate Print Order Advance Payment",
  notes = {},
  onSuccess,
  onError,
  onDismiss,
}: RazorpayCheckoutOptions): Promise<void> {
  try {
    // 1. Create official Razorpay Order on server
    const createRes = await fetch("/api/payments/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInRupees,
        receipt: orderReferenceId,
        notes: {
          ...notes,
          orderRef: orderReferenceId,
          customerName: customer.fullName,
          companyName: customer.companyName || "",
          gstin: customer.gstin || "",
          phone: customer.phone,
        },
      }),
    });

    const createData = await createRes.json();
    if (!createData.success || !createData.orderId) {
      throw new Error(createData.error || "Unable to generate Razorpay order session.");
    }

    // 2. Load the checkout script
    const scriptLoaded = await loadRazorpayCheckoutScript();
    if (!scriptLoaded) {
      throw new Error("Payment gateway script could not be initialized. Please check your internet connection.");
    }

    // 3. Configure Razorpay Standard Checkout Options
    const rzpOptions = {
      key: createData.keyId,
      amount: createData.amount,
      currency: createData.currency || "INR",
      name: "Incredible Treasures",
      description: `${description} (${orderReferenceId})`,
      image: "https://incredibletreasures.com/logo-square.png", // Fallback brand icon
      order_id: createData.orderId,
      prefill: {
        name: customer.fullName,
        email: customer.email,
        contact: customer.phone.replace(/[^0-9]/g, "").slice(-10),
      },
      notes: {
        company: customer.companyName || "Corporate Client",
        orderId: orderReferenceId,
      },
      theme: {
        color: "#A9782B", // Luxury Gold Brand Accent
        backdrop_color: "rgba(15, 23, 42, 0.8)",
      },
      modal: {
        ondismiss: function () {
          if (onDismiss) onDismiss();
        },
        escape: true,
        backdropclose: false,
      },
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // 4. Verify payment signature on server
          const verifyRes = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderReferenceId,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyData.success || !verifyData.verified) {
            throw new Error(verifyData.error || "Payment verification failed. Please contact accounts desk.");
          }

          onSuccess(response);
        } catch (err: any) {
          onError(err?.message || "Cryptographic verification failed for payment.");
        }
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.on("payment.failed", function (failResponse: any) {
      console.warn("Razorpay Payment Failed:", failResponse);
      onError(
        failResponse.error?.description ||
          "Payment was declined by bank or UPI provider. Please retry."
      );
    });

    rzp.open();
  } catch (err: any) {
    console.error("Razorpay initiation error:", err);
    onError(err?.message || "Failed to launch payment checkout.");
  }
}
