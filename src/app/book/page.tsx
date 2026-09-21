import type { Metadata } from "next";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { Photo } from "@/components/photo";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = { title: "Book a table", description: "Choose your Natural Kitchen and contact our team directly to arrange a table.", alternates: { canonical: "/book/" } };
export default function BookingPage() {
  return <><section className="container page-intro center-intro"><p className="eyebrow">WE’LL SAVE YOU A SEAT</p><h1>Let’s get <em>together.</em></h1><p>Choose your kitchen and call or email our team to arrange a table.<br />We’ll be happy to help with your plans.</p></section><section className="container booking-grid section-bottom" aria-label="Choose a restaurant to book">{restaurants.map(restaurant => <article className="booking-card" key={restaurant.slug}><Photo name={restaurant.image} alt={`Inside ${restaurant.name}`} sizes="(max-width: 700px) 100vw, 33vw" /><div><p className="eyebrow">{restaurant.neighbourhood}</p><h2>{restaurant.name}</h2><p>{restaurant.address}<br />{restaurant.postcode}</p><a className="button" href={`tel:${restaurant.telephone}`}>Call {restaurant.phone}<Arrow /></a><a className="text-link" href={`mailto:${restaurant.email}?subject=${encodeURIComponent(`Table enquiry — ${restaurant.name}`)}&body=${encodeURIComponent("Hello Natural Kitchen,\n\nI’d like to enquire about a table.\n\nDate: \nTime: \nNumber of guests: \nName: \nTelephone: \nAny dietary requirements: \n\nThank you!")}`}>Email a table enquiry <Arrow /></a><Link className="small-link" href={`/restaurants/${restaurant.slug}/`}>View opening hours & directions</Link></div></article>)}</section><div className="container booking-note"><p>Planning a larger gathering or private event?</p><Link href="/catering/" className="text-link">Let’s plan something <Arrow /></Link></div></>;
}
