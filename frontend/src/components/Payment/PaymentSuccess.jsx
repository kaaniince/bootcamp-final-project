import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <BsCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-brown-600 text-white px-6 py-2 rounded hover:bg-brown-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
