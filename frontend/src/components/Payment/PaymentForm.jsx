import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { ENDPOINTS } from "../../constants";
import { toast } from "react-toastify";

const PaymentForm = ({ onPaymentSuccess }) => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createOrder = async () => {
    try {
      // Form verilerinin dolu olduğunu kontrol et
      if (
        !formData.cardName ||
        !formData.cardNumber ||
        !formData.expiry ||
        !formData.cvv
      ) {
        throw new Error("Please fill in all payment fields");
      }
      // Kullanıcı kontrolü
      if (!user || !user._id) {
        throw new Error("User not authenticated");
      }
      // Sipariş verilerini hazırla
      const orderData = {
        userId: user._id, // user.id yerine user._id kullanıyoruz
        products: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          amount: item.amount,
          image: item.image,
        })),
      };
      console.log("Sending order data:", orderData); // Debug için
      const response = await fetch(ENDPOINTS.ORDER.CREATE, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }
      return await response.json();
    } catch (error) {
      console.error("Order creation error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user?._id) {
        toast.error("Please login to continue");
        return;
      }

      if (!cart?.length) {
        toast.error("Your cart is empty");
        return;
      }

      // Form validasyonu
      const requiredFields = [
        "cardName",
        "cardNumber",
        "expiry",
        "cvv",
        "address",
        "city",
        "zipCode",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      setLoading(true);
      await onPaymentSuccess();
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card Holder Name
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-brown-600 text-white py-2 px-4 rounded-md hover:bg-brown-700 transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
