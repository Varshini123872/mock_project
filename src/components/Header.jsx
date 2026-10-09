import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { products } from '../data';
import ProductCard from './ProductCard';
import { FiUser, FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';
import CartDrawer from './CartDrawer';

export default function Header() {
  const nav = [['Home','/'],['Shop','/shop'],['About','/about'],['Contact','/contact'],['Blog','/blog']];
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, wishlist, removeFromCart } = useStore();
  const [query, setQuery] = useState('');
  const searchWrapRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!searchOpen) return;
    const handleOutsidePointer = (event) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(event.target) && !event.target.closest('[aria-label="Search"]')) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') { setSearchOpen(false); setQuery(''); }
    };
    document.addEventListener('pointerdown', handleOutsidePointer);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointer);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);
  const searchResults = query.trim() ? products.filter(p => `${p.name} ${p.desc}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 4) : [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <>
    <header className="site-header"><Link className="logo" to="/"><span className="logo-mark" aria-hidden="true">F</span> Furniro</Link>
      <nav className={`main-nav ${mobileOpen ? 'mobile-open' : ''}`}>{nav.map(([n,p]) => <NavLink key={n} to={p} onClick={() => { setMobileOpen(false); setSearchOpen(false); setQuery(''); }}>{n}</NavLink>)}</nav>
      <div className="header-actions"><Link aria-label="My account" title="My account" className="header-icon-link" to="/account"><FiUser/></Link><Link aria-label="Wishlist" className="header-icon-link" to="/wishlist" title={`Wishlist (${wishlist.length})`}><FiHeart/></Link><button aria-label="Search" onClick={() => setSearchOpen(v => !v)}><FiSearch/></button><button aria-label="Open shopping cart" onClick={() => setCartOpen(true)} className="cart-trigger"><FiShoppingCart/>{count > 0 && <span className="header-count">{count}</span>}</button><button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? <FiX/> : <FiMenu/>}</button></div>
    </header>
    {searchOpen && <div className="header-search-wrap" ref={searchWrapRef}><form className="header-search" onSubmit={e => { e.preventDefault(); navigate(`/shop?search=${encodeURIComponent(query)}`); setSearchOpen(false); }}><FiSearch/><input value={query} onChange={e => setQuery(e.target.value)} autoFocus placeholder="Search furniture..."/><button type="button" aria-label="Close search" onClick={() => {setSearchOpen(false);setQuery('')}}><FiX/></button></form>{query.trim() && <div className="search-results">{searchResults.length ? searchResults.map(p => <Link key={p.id} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{p.desc}</small></span><strong>{p.price.toLocaleString('id-ID')}</strong></Link>) : <p>No matching products found.</p>}<button className="search-all" onClick={() => {navigate(`/shop?search=${encodeURIComponent(query)}`);setSearchOpen(false)}}>View all results</button></div>}</div>}
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} removeFromCart={removeFromCart}/>
  </>;
}
