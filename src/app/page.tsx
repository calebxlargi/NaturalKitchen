import Link from "next/link";
import { Arrow } from "@/components/icons";
import { Photo } from "@/components/photo";
import { RestaurantCard } from "@/components/restaurant-card";
import { restaurants } from "@/data/restaurants";
import { getMenu, money } from "@/lib/menus";

export default function Home() {
  const featured = [getMenu("breakfast")!, getMenu("main")!, getMenu("cocktails")!];
  const specials = getMenu("specials")!;
  const specialDishes = specials.sections.flatMap(section => section.items).filter(dish => dish.price !== undefined).slice(1, 4);
  return <>
    <section className="home-hero">
      <div className="hero-copy"><p className="eyebrow">RESTAURANT · DELI · BAR</p><h1>Good food.<br />In good<br /><em>company.</em></h1><p className="hero-description">From your first coffee to your last cocktail.<br className="desktop-only" /> Make yourself at home.</p><div className="hero-actions"><Link className="button" href="/menus/">Explore our menus <Arrow /></Link><Link className="text-link" href="/restaurants/">Find your kitchen</Link></div><p className="hero-footnote">A LITTLE SOMETHING FOR EVERY DAY.</p></div>
      <div className="hero-image"><Photo name="breakfast" alt="A Natural Kitchen breakfast with eggs, avocado, toast, fresh juice and coffee" priority /><span className="photo-caption">The everyday, made special.</span></div>
    </section>
    <div className="day-ribbon" aria-label="All-day dining"><span>Breakfast & brunch</span><i aria-hidden="true">✳</i><span>Long lunches</span><i aria-hidden="true">✳</i><span>Evening drinks</span></div>
    <section className="container intro-section"><p className="eyebrow">YOUR ALL-DAY LONDON KITCHEN</p><div><h2>For the early birds.<br />The lunch crowd.<br /><em>The just-one-more crowd.</em></h2><p>Freshly prepared food, proper coffee, and a warm welcome. Whether you’re grabbing something from the deli or settling in for the evening, there’s a place for you at Natural Kitchen.</p><Link href="/about/" className="text-link">A little about us <Arrow /></Link></div></section>
    <section className="menu-discovery section-space" aria-labelledby="menu-heading"><div className="container"><div className="section-heading"><div><p className="eyebrow">FRESH FROM OUR KITCHEN</p><h2 id="menu-heading">Whatever you’re <em>in the mood for.</em></h2></div><Link className="text-link" href="/menus/">See all menus <Arrow /></Link></div><div className="three-grid">{featured.map((menu, index) => <Link href={`/menus/${menu.slug}/`} className="menu-feature" key={menu.slug}><Photo name={menu.image} alt={menu.imageAlt} sizes="(max-width: 700px) 100vw, 33vw" /><div className="menu-feature-title"><div><span className="eyebrow">{["A BRIGHTER MORNING", "TAKE YOUR TIME", "LET’S MAKE AN EVENING OF IT"][index]}</span><h3>{["Breakfast & brunch", "Lunch & dinner", "Cocktails & company"][index]}</h3></div><Arrow /></div></Link>)}</div></div></section>
    <section className="seasonal-section"><Photo name={specials.image} alt={specials.imageAlt} /><div className="seasonal-copy"><p className="eyebrow">ON THE MENU · {specials.edition.toUpperCase()}</p><h2>A new season.<br /><em>A fresh favourite.</em></h2><p>Something a little different, made with the same care. Discover our latest specials.</p><ul className="specials-teaser">{specialDishes.map(dish => <li key={dish.name}><span>{dish.name}</span><span>{money(dish.price!)}</span></li>)}</ul><Link className="button" href="/menus/specials/">This month’s specials <Arrow /></Link></div></section>
    <section className="container section-space" aria-labelledby="restaurant-heading"><div className="section-heading"><div><p className="eyebrow">THREE LONDON KITCHENS. ONE WARM WELCOME.</p><h2 id="restaurant-heading">Your table <em>is waiting.</em></h2></div><Link className="text-link" href="/restaurants/">Our restaurants <Arrow /></Link></div><div className="three-grid">{restaurants.map(restaurant => <RestaurantCard key={restaurant.slug} restaurant={restaurant} />)}</div></section>
    <section className="gather-section"><div className="container gather-inner"><div><p className="eyebrow">CATERING & PRIVATE EVENTS</p><h2>Bring your people.<br /><em>We’ll bring the food.</em></h2></div><div><p>Office lunches, special celebrations, and a reason to get everyone together. Let’s make it an occasion.</p><Link className="button button-light" href="/catering/">Let’s plan something <Arrow /></Link></div></div></section>
  </>;
}
