import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { Photo } from "./photo";
import { Arrow } from "./icons";

export function RestaurantCard({ restaurant }: { restaurant: (typeof restaurants)[number] }) {
  return <article className="restaurant-card">
    <Link href={`/restaurants/${restaurant.slug}/`} className="image-link" aria-label={`Explore ${restaurant.name}`}><Photo name={restaurant.image} alt={`Inside Natural Kitchen ${restaurant.name}`} sizes="(max-width: 700px) 100vw, 33vw" /></Link>
    <div className="restaurant-card-copy"><p className="eyebrow">{restaurant.neighbourhood}</p><h3><Link href={`/restaurants/${restaurant.slug}/`}>{restaurant.name}</Link></h3><p>{restaurant.address}<br />{restaurant.postcode}</p><Link className="text-link" href={`/restaurants/${restaurant.slug}/`}>Make yourself at home <Arrow /></Link></div>
  </article>;
}
