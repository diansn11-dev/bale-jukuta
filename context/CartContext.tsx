"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";

// ========================================
// TYPES
// ========================================

export type CartItem = {
  id: number;

  productId?: number;

  variantId?: number;
  weight?: string;

  name: string;
  image: string;

  price: number;
  quantity: number;
  stock: number;
};

// ========================================
// HELPER
// ========================================

function getItemKey(item: CartItem) {
  return item.variantId ?? item.id;
}

// ========================================
// CONTEXT TYPE
// ========================================

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  total: number;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;

  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;

  clearCart: () => void;
};

// ========================================
// CONTEXT
// ========================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ========================================
// PROVIDER
// ========================================

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ========================================
  // LOAD CART
  // ========================================

  useEffect(() => {
    const savedCart = localStorage.getItem("bale-jukuta-cart");

    if (!savedCart) return;

    try {
      setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Gagal membaca cart:", error);
      localStorage.removeItem("bale-jukuta-cart");
    }
  }, []);

  // ========================================
  // SAVE CART
  // ========================================

  useEffect(() => {
    localStorage.setItem("bale-jukuta-cart", JSON.stringify(cart));
  }, [cart]);

  // ========================================
  // TAMBAH KE KERANJANG
  // ========================================

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existing = prev.find((p) => getItemKey(p) === getItemKey(item));

      if (existing) {
        if (existing.quantity >= existing.stock) {
          toast.error(
            `Stok ${existing.name} hanya ${existing.stock} ${
              existing.weight ? "Ekor" : "Kg"
            }`,
          );

          return prev;
        }

        toast.success("Jumlah produk diperbarui");

        return prev.map((p) =>
          getItemKey(p) === getItemKey(item)
            ? {
                ...p,
                quantity: p.quantity + 1,
              }
            : p,
        );
      }

      if (item.stock <= 0) {
        toast.error(`${item.name} sedang habis`);
        return prev;
      }

      toast.success("Produk berhasil ditambahkan ke keranjang");

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }

  // ========================================
  // HAPUS PRODUK
  // ========================================

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => getItemKey(item) !== id));

    toast.success("Produk dihapus dari keranjang");
  }

  // ========================================
  // TAMBAH JUMLAH
  // ========================================

  function increaseQty(id: number) {
    setCart((prev) =>
      prev.map((item) => {
        if (getItemKey(item) !== id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          toast.error(
            `Stok ${item.name} hanya ${item.stock} ${
              item.weight ? "Ekor" : "Kg"
            }`,
          );

          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  }

  // ========================================
  // KURANGI JUMLAH
  // ========================================

  function decreaseQty(id: number) {
    setCart((prev) =>
      prev.map((item) => {
        if (getItemKey(item) !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      }),
    );
  }

  // ========================================
  // KOSONGKAN KERANJANG
  // ========================================

  function clearCart() {
    setCart([]);
  }

  // ========================================
  // TOTAL HARGA
  // ========================================

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ========================================
  // JUMLAH ITEM
  // ========================================

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        total,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ========================================
// HOOK
// ========================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }

  return context;
}
