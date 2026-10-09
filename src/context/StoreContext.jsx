import { createContext, useContext, useMemo, useState } from 'react';

const StoreContext = createContext(null);
export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const addToCart = (product, quantity = 1) => setCart(current => {
    const found = current.find(item => item.id === product.id);
    return found
      ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...current, { ...product, quantity }];
  });
  const removeFromCart = id => setCart(current => current.filter(item => item.id !== id));
  const setQuantity = (id, quantity) => setCart(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item));
  const toggleWishlist = product => setWishlist(current => current.some(item => item.id === product.id) ? current.filter(item => item.id !== product.id) : [...current, product]);
  const value = useMemo(() => ({ cart, wishlist, addToCart, removeFromCart, setQuantity, toggleWishlist }), [cart, wishlist]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside StoreProvider');
  return value;
}
