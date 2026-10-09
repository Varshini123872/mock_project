import { FiAward, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';
const benefits = [
  { icon: FiAward, title: 'High Quality', detail: 'Crafted from top materials' },
  { icon: FiShield, title: 'Warranty Protection', detail: 'Over 2 years' },
  { icon: FiTruck, title: 'Free Delivery', detail: 'On orders over ₹5,000' },
  { icon: FiHeadphones, title: '24 / 7 Support', detail: 'Dedicated support' },
];
export default function Benefits() { return <section className="benefits">{benefits.map(({icon: Icon,title,detail}) => <div key={title}><Icon className="benefit-icon"/><span><strong>{title}</strong><small>{detail}</small></span></div>)}</section>; }
