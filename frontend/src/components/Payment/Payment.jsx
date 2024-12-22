import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants";

const Payment = () => {
  const { total, cart, clearCart } = useContext(CartContext);
  const { user, isAuthenticated, checkAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        await checkAuth();
      }
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
      return;
    }
  }, [isAuthenticated, cart, navigate]);

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);

      // Ödeme işlemi öncesi tekrar auth kontrolü
      if (!user || !isAuthenticated) {
        throw new Error("Authentication required");
      }

      // Sepet kontrolü
      if (!cart || cart.length === 0) {
        throw new Error("Cart is empty");
      }

      // Sipariş oluşturma isteği
      const response = await fetch(ENDPOINTS.ORDER.CREATE_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          products: cart,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      // Sepeti temizle
      await fetch(ENDPOINTS.BASKET.CLEAR_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: user._id }),
      });

      // Context'teki sepeti temizle
      await clearCart();

      // Başarılı ödeme sayfasına yönlendir
      toast.success("Payment successful!");
      navigate("/payment-success");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <PaymentForm
            onPaymentSuccess={handlePaymentSuccess}
            loading={loading}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <OrderSummary cart={cart} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
