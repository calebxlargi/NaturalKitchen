import type { Metadata } from "next";
import Link from "next/link";
import { menus } from "@/lib/menus";
import { Photo } from "@/components/photo";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = { title: "Our menus", description: "Browse all eight Natural Kitchen menus online: breakfast, main menu, specials, bar food, puddings, cocktails, drinks, coffee and juices.", alternates: { canonical: "/menus/" } };
export default function Menus() {
  return <><section className="container page-intro center-intro"><p className="eyebrow">GOOD FOOD, ALL DAY</p><h1>Find your <em>favourite.</em></h1><p>From the first coffee to something sweet.<br />Take a look at what’s cooking.</p></section><section className="container menus-grid section-bottom" aria-label="All menus">{menus.map((menu, index) => <Link key={menu.slug} href={`/menus/${menu.slug}/`} className={`menu-index-card menu-index-${menu.slug}`}><Photo name={menu.image} alt={menu.imageAlt} priority={index < 2} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /><div className="menu-index-copy"><span className="eyebrow">{menu.slug === "specials" ? menu.edition.toUpperCase() : `0${index + 1} · EXPLORE THE MENU`}</span><div><h2>{menu.shortTitle}</h2><Arrow /></div><p>{menu.description}</p></div></Link>)}</section><div className="container menu-help"><p>Have a dietary requirement? Please speak to our team. Full allergen information is available at our restaurants.</p><Link href="/restaurants/" className="text-link">Get in touch <Arrow /></Link></div></>;
}
