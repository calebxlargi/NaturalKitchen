import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const menus = JSON.parse(await readFile("src/data/menus.json", "utf8"));
const expectedCounts = { breakfast: 16, main: 35, specials: 7, "bar-food": 9, puddings: 5, cocktails: 10, drinks: 58, "coffee-juices": 22 };
assert.equal(menus.length, 8, "All eight supplied menus must be present");
for (const menu of menus) {
  assert.equal(menu.sections.reduce((sum, section) => sum + section.items.length, 0), expectedCounts[menu.slug], `${menu.title}: missing menu entries`);
  assert.equal(new Set(menu.sections.map(section => section.id)).size, menu.sections.length, `${menu.slug}: section anchors must be unique`);
  await access(`docs/source-menus/${menu.source}`);
  await access(`public/images/${menu.image}.webp`);
  const html = await readFile(`out/menus/${menu.slug}/index.html`, "utf8");
  assert(!/href=["'][^"']*\.pdf/i.test(html), `${menu.slug}: menu must not link visitors to a PDF`);
  for (const section of menu.sections) for (const item of section.items) {
    assert(item.name && (item.price !== undefined || item.prices?.length || item.priceLabel), `${item.name}: price information missing`);
    const values = [item.price, ...(item.prices || []).map(p => p.amount)].filter(value => value !== undefined);
    assert(values.every(value => Number.isFinite(value) && value > 0), `${item.name}: invalid price`);
  }
}
const dish = (slug, name) => menus.find(menu => menu.slug === slug).sections.flatMap(section => section.items).find(item => item.name === name);
// These are intentionally different in the supplied main and bar PDFs.
assert.deepEqual(dish("main", "Tempura chilli, salt & pepper squid").prices.map(p => p.amount), [11.95, 19.75]);
assert.deepEqual(dish("bar-food", "Tempura salt & pepper squid").prices.map(p => p.amount), [11.5, 19.5]);
assert.deepEqual(dish("main", "Sweet & spicy Korean fried chicken").prices.map(p => p.amount), [11, 19.25]);
assert.deepEqual(dish("bar-food", "Sweet & spicy Korean fried chicken").prices.map(p => p.amount), [11.95, 19.75]);
assert.deepEqual(dish("specials", "Ribeye steak & chips").prices.map(p => p.amount), [32.95, 38.95, 45.95]);
assert(menus.find(m => m.slug === "cocktails").serviceNote.includes("same two cocktails"));
for (const route of ["", "menus", "restaurants", "about", "book", "catering", "restaurants/angel-court", "restaurants/new-street-square", "restaurants/trinity-square"]) {
  await access(`out/${route ? route + "/" : ""}index.html`);
}
console.log("Verified all 8 menus, 162 menu entries, menu-specific prices, source files, and exported routes.");
