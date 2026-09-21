import type { MetadataRoute } from "next";
import { menus } from "@/lib/menus";
import { restaurants } from "@/data/restaurants";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "menus/", "restaurants/", "about/", "catering/", "book/", ...menus.map(m => `menus/${m.slug}/`), ...restaurants.map(r => `restaurants/${r.slug}/`)];
  return routes.map(route => ({ url: `https://www.naturalkitchen.co.uk/${route}`, changeFrequency: route.includes("menus") ? "monthly" : "yearly", priority: route === "" ? 1 : 0.8 }));
}
