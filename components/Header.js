import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <header className="bg-background text-text py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
          >
            EcomFrontHaseeb
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/products" className="nav-link">
              All products
            </Link>
            <Link href="/categories" className="nav-link">
              Categories
            </Link>
          </nav>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="hidden md:flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            <span>Cart ({cartProducts?.length})</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileNavActive((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileNavActive ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          <button
            className="self-end text-primary"
            onClick={() => setMobileNavActive(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <Link
            href="/"
            className="nav-link-mobile"
            onClick={() => setMobileNavActive(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="nav-link-mobile"
            onClick={() => setMobileNavActive(false)}
          >
            All products
          </Link>
          <Link
            href="/categories"
            className="nav-link-mobile"
            onClick={() => setMobileNavActive(false)}
          >
            Categories
          </Link>
          <Link
            href="/cart"
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => setMobileNavActive(false)}
          >
            <span>Cart ({cartProducts?.length})</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {mobileNavActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileNavActive(false)}
        ></div>
      )}
    </header>
  );
}
