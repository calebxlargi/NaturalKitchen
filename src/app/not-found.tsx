import Link from "next/link";
import { Arrow } from "@/components/icons";
export default function NotFound() {
  return <section className="container page-intro center-intro not-found"><p className="eyebrow">404 · A LITTLE DETOUR</p><h1>Let’s get you<br /><em>back to the table.</em></h1><p>We couldn’t find that page. There’s still plenty to discover.</p><Link className="button" href="/menus/">Explore our menus <Arrow /></Link><Link className="text-link" href="/">Back to home</Link></section>;
}
