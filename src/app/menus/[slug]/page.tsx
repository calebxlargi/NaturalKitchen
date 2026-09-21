import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { menus, getMenu, menuLinks } from "@/lib/menus";
import { MenuBrowser } from "@/components/menu-browser";
import { Photo } from "@/components/photo";

export const dynamicParams = false;
export function generateStaticParams() { return menus.map(menu => ({ slug: menu.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const menu = getMenu(slug);
  return { title: menu?.title ?? "Menu", description: menu?.description, alternates: { canonical: `/menus/${slug}/` } };
}
export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = getMenu(slug);
  if (!menu) notFound();
  return <><section className="menu-detail-hero"><div className="container menu-detail-hero-inner"><div><Link className="breadcrumb" href="/menus/">← All menus</Link><p className="eyebrow">FRESH FROM OUR KITCHEN · {menu.edition.toUpperCase()}</p><h1>{menu.title}</h1><p>{menu.description}</p></div><Photo name={menu.image} alt={menu.imageAlt} priority sizes="(max-width: 700px) 32vw, 26vw" /></div></section><MenuBrowser key={menu.slug} menu={menu} links={menuLinks} /></>;
}
