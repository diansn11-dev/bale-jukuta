export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export let cart: CartItem[] = [];

export function addToCart(product: CartItem) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }
}

export function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
