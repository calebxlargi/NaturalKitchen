import type { Metadata } from "next";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/restaurant-card";

export const metadata: Metadata = { title: "Our London restaurants", description: "Find Natural Kitchen at Angel Court, New Street Square and Trinity Square. Opening hours, directions and contact details.", alternates: { canonical: "/restaurants/" } };
export default function RestaurantsPage() {
  return <><section className="container page-intro center-intro"><p className="eyebrow">COME ON IN</p><h1>Your neighbourhood.<br /><em>Your Natural Kitchen.</em></h1><p>Three London kitchens. Fresh food, good company,<br />and a table with your name on it.</p></section><section className="container three-grid section-bottom">{restaurants.map(restaurant => <RestaurantCard key={restaurant.slug} restaurant={restaurant} />)}</section></>;
}
