import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import PageBanner from '../components/PageBanner';
export default function Wishlist(){const {wishlist}=useStore();return <><PageBanner title="Wishlist"/><section className="section wishlist-page">{wishlist.length ? <div className="product-grid">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="cart-empty"><h2>Your wishlist is empty</h2><p>Tap the heart on a product to save your favourites here.</p><Link className="gold-button" to="/shop">Explore products</Link></div>}</section></>}
