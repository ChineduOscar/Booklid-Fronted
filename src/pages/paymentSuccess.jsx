import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../services/paymentService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const reference = params.get("reference");
  const hasVerified = useRef(false);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: verifyPayment,
    onSuccess: () => {
      toast.success("Payment verified! Redirecting...");
      setTimeout(() => navigate("/"), 3000);
    },
    onError: () => toast.error("Verification failed. Please contact support."),
  });

  useEffect(() => {
    if (reference && !hasVerified.current) {
      hasVerified.current = true;
      mutate(reference);
    }
  }, [reference, mutate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-sm w-full">

        {/* Loading State */}
        {isPending && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Verifying Payment</h2>
            <p className="text-gray-500 mt-2">Please wait while we confirm your transaction...</p>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Payment Successful!</h2>
            <p className="text-gray-500 mt-2">Thank you for your purchase. Redirecting to home...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Verification Failed</h2>
            <p className="text-gray-500 mt-2">Something went wrong. Please check your transaction status.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-black transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;