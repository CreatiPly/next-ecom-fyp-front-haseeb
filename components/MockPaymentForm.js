import { useState } from "react";

export default function MockPaymentForm({ onSubmit, onCancel }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const formatCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedCardNumber);
  };

  const validateCardNumber = (number) => {
    return number.replace(/\s/g, "").length === 16;
  };

  const validateExpiry = (date) => {
    const [year, month] = date.split("-");
    const now = new Date();
    const expiryDate = new Date(year, month);
    return expiryDate > now;
  };

  const validateCvv = (cvv) => {
    return cvv.length === 3 || cvv.length === 4;
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!validateExpiry(expiry)) {
      newErrors.expiry = "Expiry date must be in the future.";
    }

    if (!validateCvv(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h3 className="text-xl font-bold mb-4 text-center">
          Enter Payment Details
        </h3>

        <label className="block mb-1">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          className="w-full px-3 py-2 border rounded mb-2"
          maxLength="19"
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm">{errors.cardNumber}</p>
        )}

        <label className="block mb-1">Expiry Date</label>
        <input
          type="month"
          placeholder="MM/YYYY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        {errors.expiry && (
          <p className="text-red-500 text-sm">{errors.expiry}</p>
        )}

        <label className="block mb-1">CVV</label>
        <input
          type="number"
          placeholder="123"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
