import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { restaurants, directionsUrl } from "@/data/restaurants";
import { Photo } from "@/components/photo";
import { Arrow } from "@/components/icons";

export const dynamicParams = false;
export function generateStaticParams() { return restaurants.map(restaurant => ({ slug: restaurant.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = restaurants.find(r => r.slug === slug);
  return { title: `${restaurant?.name ?? "Restaurant"}, ${restaurant?.neighbourhood ?? "London"}`, description: restaurant?.description, alternates: { canonical: `/restaurants/${slug}/` } };
}
export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = restaurants.find(r => r.slug === slug);
  if (!restaurant) notFound();
  return <><section className="venue-hero"><div className="venue-hero-copy"><Link className="breadcrumb" href="/restaurants/">← All restaurants</Link><p className="eyebrow">YOUR NATURAL KITCHEN · {restaurant.neighbourhood.toUpperCase()}</p><h1>{restaurant.name}</h1><p>{restaurant.description}</p><div className="hero-actions"><a href={`tel:${restaurant.telephone}`} className="button">Call to book <Arrow /></a><a href={`mailto:${restaurant.email}?subject=${encodeURIComponent(`Table enquiry — ${restaurant.name}`)}`} className="text-link">Email the team <Arrow /></a></div></div><Photo name={restaurant.image} alt={`The restaurant interior at Natural Kitchen ${restaurant.name}`} priority /></section><section className="container venue-details"><div><p className="eyebrow">FIND US</p><h2>Come on <em>over.</em></h2><address>{restaurant.address}<br />{restaurant.postcode}</address><a className="text-link" href={directionsUrl(restaurant)} target="_blank" rel="noreferrer">Get directions <Arrow /></a><div className="venue-contact"><a href={`tel:${restaurant.telephone}`}>{restaurant.phone}</a><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></div></div><div className="venue-hours"><p className="eyebrow">WHEN TO VISIT</p>{restaurant.hours.map(group => <div key={group.title}><h3>{group.title}</h3>{group.lines.map(line => <p key={line}>{line}</p>)}</div>)}<p className="venue-note">{restaurant.note}</p><p className="small-note">Please contact us for bank holiday hours.</p></div></section><section className="simple-cta container"><h2>A little something <em>for everyone.</em></h2><Link className="button" href="/menus/">Explore our menus <Arrow /></Link></section></>;
}
