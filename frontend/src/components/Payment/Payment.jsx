import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";

const Payment = () => {
  const { total, cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    setLoading(true);
    // Clear cart and navigate after successful payment
    setTimeout(() => {
      clearCart();
      navigate("/payment-success");
      setLoading(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-brown-600 text-white px-6 py-2 rounded hover:bg-brown-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol taraf - Ödeme Formu */}
        <div className="bg-white p-6 rounded-lg shadow">
          <PaymentForm
            onPaymentSuccess={handlePaymentSuccess}
            loading={loading}
          />
        </div>

        {/* Sağ taraf - Sipariş Özeti */}
        <div className="bg-white p-6 rounded-lg shadow">
          <OrderSummary cart={cart} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
