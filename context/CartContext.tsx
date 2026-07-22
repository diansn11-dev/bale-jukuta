"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // LOAD CART

  useEffect(() => {
    const savedCart = localStorage.getItem("bale-jukuta-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // SAVE CART

  useEffect(() => {
    localStorage.setItem("bale-jukuta-cart", JSON.stringify(cart));
  }, [cart]);

  // TAMBAH PRODUK KE KERANJANG

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        if (existing.quantity >= existing.stock) {
          alert(`Stok ${existing.name} hanya tersedia ${existing.stock} Kg`);

          return prev;
        }

        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: p.quantity + 1,
              }
            : p,
        );
      }

      return [...prev, item];
    });
  }

  // HAPUS PRODUK

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // TAMBAH JUMLAH

  function increaseQty(id: number) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.quantity >= item.stock) {
            alert(`Stok ${item.name} hanya tersedia ${item.stock} Kg`);

            return item;
          }

          return {
            ...item,

            quantity: item.quantity + 1,
          };
        }

        return item;
      }),
    );
  }

  // KURANGI JUMLAH

  function decreaseQty(id: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,

              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  }

  // KOSONGKAN CART

  function clearCart() {
    setCart([]);
  }

  // TOTAL HARGA

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,

    0,
  );

  // JUMLAH BARANG

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,

    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,

        cartCount,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        clearCart,

        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }

  return context;
}
