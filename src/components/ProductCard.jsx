import { Link } from 'react-router-dom';
import { FiHeart, FiShare2, FiShuffle } from 'react-icons/fi';
import { money } from '../data';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product: p }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const liked = wishlist.some(item => item.id === p.id);
  const shareProduct = () => {
    const url = `${window.location.origin}/product/${p.id}`;
    if (navigator.share) navigator.share({ title: p.name, text: p.desc, url }).catch(() => {});
    else window.prompt('Copy product link:', url);
  };

  return <article className="product-card">
    <div className="product-photo">
      <Link to={`/product/${p.id}`} className="product-image-link"><img src={p.image} alt={p.name} loading="lazy" /></Link>
      {p.badge && <span className={`badge ${p.badge === 'New' ? 'new' : ''}`}>{p.badge}</span>}
      <div className="product-hover-overlay">
        <button className="hover-add-cart" onClick={() => addToCart(p)}>Add to cart</button>
        <div className="hover-product-actions">
          <button onClick={shareProduct}><FiShare2 /> Share</button>
          <Link to={`/comparison?product=${p.id}`}><FiShuffle /> Compare</Link>
          <button className={liked ? 'is-liked' : ''} onClick={() => toggleWishlist(p)}><FiHeart fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Liked' : 'Like'}</button>
        </div>
      </div>
      <button className={`product-heart ${liked ? 'is-liked' : ''}`} aria-label={liked ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} onClick={() => toggleWishlist(p)}><FiHeart fill={liked ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="product-info">
      <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
      <p>{p.desc}</p>
      <div className="prices"><strong>{money(p.price)}</strong>{p.old && <del>{money(p.old)}</del>}</div>
    </div>
  </article>;
}
