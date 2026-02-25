import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Shield,
  CreditCard,
  Loader2,
  CircleAlert,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { Header } from "../components/dashboard/Header";
import { EscrowTimeline } from "../components/transactions/EscrowTimeline";
import { StatusBadge, type StatusType } from "../components/ui/StatusBadge";
import { useGetAdminTransactionDetailsQuery } from "@/redux/features/api/baseApi";

function mapStatusToBadge(status: string): StatusType {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("succeed") ||
    normalized.includes("paid") ||
    normalized.includes("complete")
  ) {
    return "completed";
  }
  if (normalized.includes("process") || normalized.includes("progress")) {
    return "in-progress";
  }
  if (normalized.includes("cancel")) {
    return "cancelled";
  }
  if (normalized.includes("fail") || normalized.includes("decline")) {
    return "failed";
  }

  return "pending";
}

function formatLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTimelineStep(paymentStatus: string, orderStatus: string): number {
  const normalizedPayment = paymentStatus.toLowerCase();
  const normalizedOrder = orderStatus.toLowerCase();

  if (normalizedPayment.includes("fail") || normalizedPayment.includes("cancel")) {
    return 1;
  }
  if (normalizedOrder.includes("deliver")) {
    return 5;
  }
  if (
    normalizedOrder.includes("ship") ||
    normalizedOrder.includes("transit") ||
    normalizedOrder.includes("out_for_delivered")
  ) {
    return 3;
  }
  if (normalizedOrder.includes("process")) {
    return 2;
  }
  if (
    normalizedPayment.includes("succeed") ||
    normalizedPayment.includes("paid") ||
    normalizedPayment.includes("complete")
  ) {
    return 2;
  }

  return 1;
}

function getDisplayPaymentMethod(
  paymentMethod: string | null,
  cardBrand: string | null,
  lastFourDigits: string | null,
): string {
  const parts: string[] = [];
  if (cardBrand) {
    parts.push(cardBrand.toUpperCase());
  }
  if (paymentMethod) {
    parts.push(formatLabel(paymentMethod));
  }
  if (lastFourDigits) {
    parts.push(`**** ${lastFourDigits}`);
  }

  return parts.length > 0 ? parts.join(" ") : "Not Available";
}

export function TransactionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAdminTransactionDetailsQuery(id || "", {
      skip: !id,
      refetchOnMountOrArgChange: true,
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#278687] mx-auto mb-4" />
            <p className="text-gray-500">Loading transaction details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data?.success || !data?.data) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md px-6">
            <CircleAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Transaction Not Found
            </h2>
            <p className="text-gray-500 mb-6">
              {isError
                ? "Failed to load transaction details. Please try again."
                : `The transaction ${id} does not exist.`}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 rounded-lg bg-[#278687] text-sm font-medium text-white hover:bg-[#1f6c6d] transition-colors inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const transaction = data.data;
  const buyerName =
    transaction.order.buyer.fullName || transaction.order.buyer.user.email;
  const vendorName =
    transaction.order.vendor.businessName ||
    transaction.order.vendor.storename ||
    transaction.order.vendor.fullName;
  const paymentMethodLabel = getDisplayPaymentMethod(
    transaction.paymentMethod,
    transaction.cardBrand,
    transaction.lastFourDigits,
  );
  const timelineStep = getTimelineStep(transaction.status, transaction.order.status);

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Shield className="w-6 h-6 text-[#278687]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Transaction {transaction.id}
                    </h1>
                    <p className="text-gray-500">
                      Order {transaction.order.orderNumber} for {buyerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isFetching && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                  <StatusBadge status={mapStatusToBadge(transaction.status)} />
                </div>
              </div>

              <EscrowTimeline currentStep={timelineStep} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                    Payment Method
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#278687]" />
                    <span className="font-medium text-gray-900">
                      {paymentMethodLabel}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                    Payout Recipient
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-900">{vendorName}</span>
                    <span className="text-gray-400 text-sm">
                      {transaction.order.vendor.vendorCode}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                    Stripe Payment ID
                  </div>
                  <div className="font-mono text-sm text-gray-900 break-all">
                    {transaction.stripePaymentId || "Not Available"}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                    Status
                  </div>
                  <div className="font-medium text-gray-900">
                    {formatLabel(transaction.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">Financial Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Admin Commission</span>
                  <span className="font-medium text-red-600">
                    -${transaction.adminCommissionAmount.toFixed(2)}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Vendor Payout</span>
                  <span className="text-xl font-bold text-[#278687]">
                    ${transaction.vendorPayoutAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Linked Order</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Order Number</span>
                  <span className="font-mono font-medium text-gray-900">
                    {transaction.order.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Order Status</span>
                  <span className="text-sm text-gray-900">
                    {formatLabel(transaction.order.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Date</span>
                  <span className="text-sm text-gray-900">
                    {new Date(transaction.order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                to={`/orders/${transaction.order.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                View Order Details
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Parties</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Buyer</p>
                  <p className="font-medium text-gray-900">{buyerName}</p>
                  <p className="text-gray-500">{transaction.order.buyer.user.email}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-500 mb-1">Vendor</p>
                  <p className="font-medium text-gray-900">{vendorName}</p>
                  <p className="text-gray-500">{transaction.order.vendor.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
