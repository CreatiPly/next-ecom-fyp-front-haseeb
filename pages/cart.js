import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import MockPaymentForm from "@/components/MockPaymentForm";
import { formatPrice } from "@/utils/priceFormatter";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    setIsPaymentModalOpen(false);
    // Show loading indicator (you can add a loading state if you want)

    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="bg-accent py-12 container mx-auto px-4">
          <div className="bg-background rounded-lg shadow-md p-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">
              Thanks for your order!
            </h1>
            <p className="text-text">
              We will email you when your order will be sent.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Cart</h2>
            {cartProducts?.length > 0 && (
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Clear Cart
              </button>
            )}
            {!cartProducts?.length && (
              <div className="text-text">Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-center py-2">Quantity</th>
                    <th className="text-right py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="py-4 flex items-center">
                        <div className="w-16 h-16 mr-4">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <span>{product.title}</span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => lessOfThisProduct(product._id)}
                          className="bg-primary text-background px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </span>
                        <button
                          onClick={() => moreOfThisProduct(product._id)}
                          className="bg-primary text-background px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </td>
                      <td className="text-right">
                        {formatPrice(
                          cartProducts.filter((id) => id === product._id)
                            .length * product.price
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2" className="text-right font-bold py-4">
                      Total:
                    </td>
                    <td className="text-right font-bold py-4">
                      {formatPrice(total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="bg-background rounded-lg shadow-md p-8 mt-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Order information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="mt-6 w-full bg-primary text-background py-2 px-4 rounded hover:bg-secondary transition-colors"
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
        {isPaymentModalOpen && (
          <MockPaymentForm
            onSubmit={goToPayment}
            onCancel={() => setIsPaymentModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}
