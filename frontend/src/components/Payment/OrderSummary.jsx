const OrderSummary = ({ cart, total }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* Ürün Listesi */}
      <div className="space-y-4 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.amount}</p>
              </div>
            </div>
            <p className="font-medium">${item.price * item.amount}</p>
          </div>
        ))}
      </div>

      {/* Toplam */}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span>${parseFloat(total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
