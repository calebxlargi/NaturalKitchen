import data from "@/data/menus.json";
import type { Menu } from "./types";

export const menus: Menu[] = data;
export const getMenu = (slug: string) => menus.find((menu) => menu.slug === slug);
export const money = (amount: number) => `£${amount.toFixed(2)}`;

export const menuLinks = menus.map(({ slug, shortTitle }) => ({ slug, title: shortTitle }));
