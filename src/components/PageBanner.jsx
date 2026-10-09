import { Link } from 'react-router-dom';
export default function PageBanner({title,crumb}){
  return <section className="page-banner"><div className="banner-overlay"><Link to="/" className="mini-logo" aria-label="Furniro home"><span>F</span></Link><h1>{title}</h1><p><Link to="/" className="breadcrumb-home">Home</Link><span>›</span>{crumb||title}</p></div></section>
}
