import { Link } from 'react-router-dom';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { money } from '../data';

export default function CartDrawer({ open, onClose, cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <>
    {open && <button className="drawer-backdrop" aria-label="Close cart panel" onClick={onClose} />}
    <aside className={`cart-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer-heading"><h2>Shopping Cart</h2><button onClick={onClose} aria-label="Close cart"><FiX /></button></div>
      {cart.length === 0 ? <div className="drawer-empty"><span>🛍️</span><p>Your cart is waiting for something lovely.</p><button className="gold-button" onClick={onClose}>Continue shopping</button></div> : <>
        <div className="drawer-items">{cart.map(item => <div className="drawer-item" key={item.id}>
          <img src={item.image} alt={item.name}/><div className="drawer-item-copy"><strong>{item.name}</strong><small>{item.quantity} × {money(item.price)}</small></div>
          <button aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
        </div>)}</div>
        <div className="drawer-bottom"><p><span>Subtotal</span><strong>{money(total)}</strong></p><div className="drawer-links"><Link to="/cart" onClick={onClose}>Cart</Link><Link to="/comparison" onClick={onClose}>Comparison</Link><Link to="/checkout" onClick={onClose}>Checkout</Link></div></div>
      </>}
      {cart.length === 0 && <div className="drawer-bottom drawer-bottom-empty"><div className="drawer-links"><Link to="/cart" onClick={onClose}>Cart</Link><Link to="/comparison" onClick={onClose}>Comparison</Link><Link to="/checkout" onClick={onClose}>Checkout</Link></div></div>}
    </aside>
  </>;
}
