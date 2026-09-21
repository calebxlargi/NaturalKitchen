"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Dish, Menu } from "@/lib/types";
import { Arrow, SearchIcon } from "./icons";

const money = (n: number) => `£${n.toFixed(2)}`;
function DishEntry({ dish }: { dish: Dish }) {
  return <article className="dish"><div className="dish-heading"><h3>{dish.name}</h3>{dish.price !== undefined && <span className="dish-price">{money(dish.price)}</span>}{dish.priceLabel && <span className="dish-price price-label">{dish.priceLabel}</span>}</div>{dish.tags && <div className="dish-tags">{dish.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}{dish.description && <p>{dish.description}</p>}{dish.prices && <dl className="price-options">{dish.prices.map(price => <div key={price.label}><dt>{price.label}</dt><dd>{money(price.amount)}</dd></div>)}</dl>}{dish.extras?.map(extra => <p className="dish-extra" key={extra}>{extra}</p>)}</article>;
}

export function MenuBrowser({ menu, links }: { menu: Menu; links: { slug: string; title: string }[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("All");
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten free"].filter(tag => menu.sections.some(section => section.items.some(item => item.tags?.includes(tag))));
  const sections = useMemo(() => menu.sections.map(section => ({ ...section, items: section.items.filter(dish => {
    const text = [dish.name, dish.description, ...(dish.extras || [])].join(" ").toLocaleLowerCase();
    return text.includes(query.trim().toLocaleLowerCase()) && (diet === "All" || dish.tags?.includes(diet));
  }) })).filter(section => section.items.length > 0), [menu, query, diet]);
  const count = sections.reduce((sum, section) => sum + section.items.length, 0);
  const filtered = query.trim() !== "" || diet !== "All";
  return <div className="container menu-page-layout">
    <aside className="menu-sidebar"><p className="eyebrow">OUR MENUS</p><nav aria-label="Choose a menu">{links.map(link => <Link href={`/menus/${link.slug}/`} key={link.slug} aria-current={link.slug === menu.slug ? "page" : undefined}>{link.title}<span aria-hidden="true">↗</span></Link>)}</nav><div className="sidebar-contact"><p>A question about<br />something on the menu?</p><Link className="text-link" href="/restaurants/">Ask our team <Arrow /></Link></div></aside>
    <div className="menu-body">
      <label className="mobile-menu-picker">Choose a menu<select value={menu.slug} onChange={event => router.push(`/menus/${event.target.value}/`)}>{links.map(link => <option key={link.slug} value={link.slug}>{link.title}</option>)}</select></label>
      <div className="menu-tools"><label className="menu-search"><SearchIcon /><span className="sr-only">Search this menu</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a dish or ingredient…" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}</label>{dietaryOptions.length > 0 && <div className="diet-filters" aria-label="Dietary preferences">{["All", ...dietaryOptions].map(option => <button key={option} type="button" aria-pressed={diet === option} onClick={() => setDiet(option)}>{option}</button>)}</div>}</div>
      {diet !== "All" && <p className="filter-note">Showing dishes explicitly labelled {diet.toLowerCase()} on this menu. Extras may change suitability. Please confirm any dietary requirements with our team.</p>}
      {menu.serviceNote && <p className="menu-service-note">{menu.serviceNote}</p>}
      <nav className="section-jumps" aria-label="Menu sections">{sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
      <p className={filtered ? "result-count" : "sr-only"} role="status">{filtered ? `${count} ${count === 1 ? "item" : "items"} found` : "All menu items shown"}</p>
      {sections.map(section => <section key={section.id} id={section.id} className="dish-section"><div className="dish-section-heading"><span className="section-number" aria-hidden="true">{String(menu.sections.findIndex(s => s.id === section.id) + 1).padStart(2, "0")}</span><h2>{section.title}</h2></div>{section.description && <p className="section-description">{section.description}</p>}<div className="dish-grid">{section.items.map(dish => <DishEntry dish={dish} key={dish.name} />)}</div></section>)}
      {sections.length === 0 && <div className="empty-menu"><h2>No matches just yet.</h2><p>Try another dish or ingredient, or take a look at the full menu.</p><button className="button" onClick={() => { setQuery(""); setDiet("All"); }}>Show the whole menu <Arrow /></button></div>}
      <div className="menu-notices"><p className="eyebrow">A LITTLE GOOD TO KNOW</p>{menu.notices.map(note => <p key={note}>{note}</p>)}<p>All prices are in pounds sterling. {menu.edition} menu.</p>{menu.slug === "drinks" && <Link href="/menus/cocktails/" className="text-link">Explore our cocktails <Arrow /></Link>}</div>
    </div>
  </div>;
}
