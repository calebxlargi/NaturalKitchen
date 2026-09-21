export type Price = { label: string; amount: number };
export type Dish = {
  name: string;
  description?: string;
  price?: number;
  priceLabel?: string;
  prices?: Price[];
  tags?: string[];
  extras?: string[];
};
export type MenuSection = {
  id: string;
  title: string;
  description?: string;
  items: Dish[];
};
export type Menu = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  source: string;
  edition: string;
  serviceNote?: string;
  notices: string[];
  sections: MenuSection[];
};
