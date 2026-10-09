import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import PageBanner from '../components/PageBanner';
import { money } from '../data';
import { useStore } from '../context/StoreContext';
export default function Cart(){
 const {cart,removeFromCart,setQuantity}=useStore();
 const subtotal=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
 return <><PageBanner title="Cart"/><section className="cart-layout"><div className="cart-table-wrap">{cart.length===0?<div className="cart-empty"><span>🛍️</span><h2>Your cart is empty</h2><p>Let’s find something beautiful for your home.</p><Link className="gold-button" to="/shop">Continue shopping</Link></div>:<table className="cart-table"><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr></thead><tbody>{cart.map(item=><tr key={item.id}><td><div className="cart-product"><img src={item.image} alt={item.name}/><span>{item.name}</span></div></td><td>{money(item.price)}</td><td><input aria-label={`${item.name} quantity`} type="number" min="1" value={item.quantity} onChange={e=>setQuantity(item.id,e.target.value)}/></td><td>{money(item.price*item.quantity)}</td><td><button className="remove" aria-label={`Remove ${item.name}`} onClick={()=>removeFromCart(item.id)}><FiTrash2/></button></td></tr>)}</tbody></table>}</div>{cart.length>0&&<aside className="cart-totals"><h2>Cart Totals</h2><p>Subtotal <span>{money(subtotal)}</span></p><p>Total <strong>{money(subtotal)}</strong></p><Link to="/checkout" className="checkout-button">Check Out</Link><Link className="continue-link" to="/shop">Continue shopping</Link></aside>}</section></>;
}
