import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, money } from '../data';
import { useStore } from '../context/StoreContext';
import PageBanner from '../components/PageBanner';

const categoryOf = (product) => {
  if (!product) return '—';
  const desc = product.desc || '';
  if (/chair/i.test(desc)) return 'Chair';
  if (/sofa/i.test(desc)) return 'Sofa';
  if (/table/i.test(desc)) return 'Table';
  if (/lamp|lighting/i.test(desc)) return 'Lighting';
  if (/bed/i.test(desc)) return 'Bedroom';
  if (/pot|planter|mug|decor/i.test(desc)) return 'Home decor';
  return 'Furniture';
};

export default function Comparison() {
  const [params] = useSearchParams();
  const requestedId = Number(params.get('product'));
  const requestedProduct = products.find(p => p.id === requestedId);
  const initialFirst = requestedProduct || products[0];
  const initialSecond = products.find(p => p.id !== initialFirst.id);
  const [selectedIds, setSelectedIds] = useState([initialFirst?.id, initialSecond?.id].filter(Boolean));
  const { addToCart } = useStore();

  useEffect(() => {
    if (!requestedProduct) return;
    setSelectedIds(current => current.includes(requestedProduct.id)
      ? [requestedProduct.id, ...current.filter(id => id !== requestedProduct.id)]
      : [requestedProduct.id, ...current]);
  }, [requestedId]);

  const selectedProducts = useMemo(
    () => selectedIds.map(id => products.find(p => p.id === Number(id))).filter(Boolean),
    [selectedIds]
  );
  const availableProducts = products.filter(p => !selectedIds.includes(p.id));
  const addProduct = idValue => {
    const id = Number(idValue);
    if (!id || selectedIds.includes(id)) return;
    setSelectedIds(current => [...current, id]);
  };
  const removeProduct = id => setSelectedIds(current => current.filter(productId => productId !== id));
  const rows = [
    ['Price', p => money(p.price)],
    ['Product', p => p.name],
    ['Category', categoryOf],
    ['In Stock', () => 'Yes'],
    ['Warranty', () => '1 year'],
    ['Care', () => 'Wipe with a soft dry cloth'],
  ];
  const layoutStyle = { gridTemplateColumns: `minmax(260px, 1.45fr) repeat(${selectedProducts.length}, minmax(190px, 1fr)) minmax(190px, 1fr)` };
  const tableStyle = { gridTemplateColumns: `minmax(230px, .8fr) repeat(${Math.max(selectedProducts.length, 1)}, minmax(150px, 1.4fr))` };

  return <>
    <PageBanner title="Product Comparison" crumb="Product Comparison" />
    <main className="comparison-page">
    <section className="comparison-layout comparison-layout-live" style={layoutStyle}>
      <div className="compare-intro">
        <h2>Go to Product page for more Products</h2>
        <Link to="/shop">View More</Link>
      </div>
      {selectedProducts.map(p => <div className="compare-product" key={p.id}>
        <button className="compare-remove" type="button" aria-label={`Remove ${p.name} from comparison`} title={`Remove ${p.name}`} onClick={() => removeProduct(p.id)}>×</button>
        <Link className="compare-image-link" to={`/product/${p.id}`}><img src={p.image} alt={p.name}/></Link>
        <h3>{p.name}</h3>
        <b>{money(p.price)}</b>
        <p className="compare-stars"><span>★★★★★</span> <small>5 Reviews</small></p>
        <Link className="compare-view-product" to={`/product/${p.id}`}>View Product</Link>
      </div>)}
      <div className="add-compare">
        <h3>Add A Product</h3>
        <select aria-label="Add a product to comparison" value="" onChange={e => addProduct(e.target.value)}>
          <option value="" disabled>Choose a product</option>
          {availableProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
    </section>
    <section className="comparison-table comparison-table-live">
      <h2>General</h2>
      {rows.map(([label, getValue]) => <div className="comparison-row" key={label} style={tableStyle}>
        <b>{label}</b>
        {selectedProducts.map(p => <span key={`${label}-${p.id}`}>{getValue(p)}</span>)}
      </div>)}
      {selectedProducts.length > 0 && <div className="comparison-cart-row" style={{ gridTemplateColumns: tableStyle.gridTemplateColumns }}>
        <span aria-hidden="true" />
        {selectedProducts.map(p => <div key={p.id}><button className="compare-cart-button" type="button" onClick={() => addToCart(p)}>Add {p.name} to Cart</button></div>)}
      </div>}
    </section>
    </main>
  </>;
}
