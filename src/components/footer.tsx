import Link from "next/link";
import { Arrow } from "./icons";

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-top">
      <div><Link href="/" className="wordmark">NATURAL KITCHEN<span>LONDON</span></Link><p>Good food. In good company.</p></div>
      <div><p className="eyebrow">COME ON IN</p><Link href="/menus/">Explore the menus</Link><Link href="/restaurants/">Find your kitchen</Link><Link href="/book/">Book a table</Link></div>
      <div><p className="eyebrow">A LITTLE ABOUT US</p><Link href="/about/">Our story</Link><Link href="/catering/">Catering & events</Link><a href="mailto:info@naturalkitchen.co.uk">Get in touch</a></div>
      <div><p className="eyebrow">STAY A LITTLE LONGER</p><a href="https://www.instagram.com/naturalkitchen_london/" target="_blank" rel="noreferrer">Follow us on Instagram <Arrow /></a><a href="mailto:info@naturalkitchen.co.uk">info@naturalkitchen.co.uk</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} All The Ducks Ltd.</span><span>Restaurant · Deli · Bar</span><a href="#top">Back to top ↑</a></div>
  </footer>;
}
