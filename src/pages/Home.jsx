import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiHeart } from 'react-icons/fi';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

// Room photos are cropped from the original Figma home-page reference supplied by the user.
const rooms = [
  { number: '01', name: 'Inner Peace', type: 'Bed Room', image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1000&q=85' },
  { number: '02', name: 'Dining Delight', type: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=85' },
  { number: '03', name: 'Calm Living', type: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85' },
];
const gallery = [
  { image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85', alt: 'Furniture inspiration desk' },
  { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85', alt: 'Dining room inspiration' },
  { image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85', alt: 'Bedroom inspiration' },
  { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85', alt: 'Living room inspiration' },
  { image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85', alt: 'Interior detail inspiration' },
  { image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85', alt: 'Warm home interior' },
  { image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85', alt: 'Cozy home furniture inspiration' },
];
export default function Home() {
  const [roomIndex, setRoomIndex] = useState(0);
  const room = rooms[roomIndex];
  const previous = () => setRoomIndex(i => (i - 1 + rooms.length) % rooms.length);
  const next = () => setRoomIndex(i => (i + 1) % rooms.length);
  const nextRoom = rooms[(roomIndex + 1) % rooms.length];
  return <>
    <section className="hero hero-compact">
      <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85" alt="Furniro modern living room collection" />
      <div className="hero-card">
        <p className="eyebrow">New Arrival</p>
        <h1>Discover Our<br />New Collection</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <Link className="gold-button" to="/shop">BUY NOW</Link>
      </div>
    </section>
    <section className="section browse">
      <h2>Browse The Range</h2>
      <p className="section-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="category-grid">
        <Link to="/shop"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85" alt="Dining room" /><h3>Dining</h3></Link>
        <Link to="/shop"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85" alt="Living room" /><h3>Living</h3></Link>
        <Link to="/shop"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85" alt="Bedroom" /><h3>Bedroom</h3></Link>
      </div>
    </section>
    <section className="section products-section">
      <h2>Our Products</h2>
      <div className="product-grid">{products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}</div>
      <Link className="outline-button" to="/shop">Show More</Link>
    </section>
    <section className="inspiration">
      <div className="inspiration-copy">
        <h2>50+ Beautiful rooms inspiration</h2>
        <p className="inspiration-description">Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
        <Link className="gold-button" to="/shop">Explore More</Link>
        <div className="room-controls" aria-label="Room inspiration controls">
          <button aria-label="Previous room" onClick={previous}>‹</button>
          <span>{room.number} / {String(rooms.length).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="room-feature" key={room.number}>
        <img src={room.image} alt={room.name} />
        <div className="room-caption"><span>{room.number} <i /> {room.type}</span><h3>{room.name}</h3><Link to="/shop" aria-label={`Explore ${room.name}`}><FiArrowUpRight /></Link></div>
      </div>
      <div className="room-next-preview">
        <img src={nextRoom.image} alt={`${nextRoom.name} inspiration`} />
        <button aria-label="Next room" onClick={next}><FiArrowRight /></button>
        <div className="room-dots room-preview-dots" aria-label="Choose room">{rooms.map((r, i) => <button key={r.number} aria-label={`Show room ${i + 1}`} className={i === roomIndex ? 'active' : ''} onClick={() => setRoomIndex(i)} />)}</div>
      </div>
    </section>
    <section className="section gallery">
      <p className="section-sub gallery-kicker">Share your setup with</p>
      <h2 className="gallery-title">#FuniroFurniture</h2>
      <p className="gallery-intro">Beautiful corners, thoughtful details, and furniture that makes a house feel like home.</p>
      <div className="gallery-grid">{gallery.map((item, i) => <div className={`gallery-tile gallery-tile-${i + 1}`} key={item.alt}><img src={item.image} alt={item.alt} /><span><FiHeart /> #FuniroFurniture</span></div>)}</div>
    </section>
  </>;
}
