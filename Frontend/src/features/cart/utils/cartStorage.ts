export type CartItem = {
  productId: string | number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  sellerId?: string;
};

const CART_KEY = "pets-veta-cart";
const CART_UPDATED_EVENT = "cart-updated";

const emitCartUpdated = () => {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const getCartItems = (): CartItem[] => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartUpdated();
};

export const addToCart = (item: CartItem) => {
  const cart = getCartItems();
  const existingSellerId = cart.find((cartItem) => cartItem.sellerId)?.sellerId;

  if (
    existingSellerId &&
    item.sellerId &&
    existingSellerId !== item.sellerId
  ) {
    return {
      success: false,
      message: "One order can contain products from one seller only.",
    };
  }

  const existing = cart.find(
    (cartItem) => cartItem.productId === item.productId,
  );

  if (existing) {
    const updatedCart = cart.map((cartItem) =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        : cartItem,
    );

    saveCartItems(updatedCart);

    return {
      success: true,
      message: "Cart updated successfully.",
    };
  }

  saveCartItems([...cart, item]);

  return {
    success: true,
    message: "Product added to cart successfully.",
  };
};

export const updateCartQuantity = (
  productId: string | number,
  quantity: number,
) => {
  const cart = getCartItems();

  const updatedCart = cart
    .map((item) => (item.productId === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  saveCartItems(updatedCart);
};

export const removeFromCart = (productId: string | number) => {
  const cart = getCartItems();

  saveCartItems(cart.filter((item) => item.productId !== productId));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  emitCartUpdated();
};