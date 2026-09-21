import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";

const origin = "http://127.0.0.1:4173";
const menus = JSON.parse(await readFile("src/data/menus.json", "utf8"));
const routes = ["/", "/menus/", ...menus.map(menu => `/menus/${menu.slug}/`), "/restaurants/", "/restaurants/angel-court/", "/restaurants/new-street-square/", "/restaurants/trinity-square/", "/about/", "/book/", "/catering/"];
const output = process.env.SCREENSHOT_DIR || "test-results";
await mkdir(output, { recursive: true });
const server = spawn(process.execPath, ["scripts/preview.mjs"], { stdio: ["ignore", "pipe", "inherit"] });
await new Promise((resolve, reject) => { server.stdout.once("data", resolve); server.once("error", reject); server.once("exit", code => reject(new Error(`Preview exited with ${code}`))); });
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined, args: ["--no-sandbox", "--disable-gpu"], headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const width of (process.env.TEST_WIDTHS || "1440,768,390,320").split(",").map(Number)) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of routes) {
      const response = await page.goto(origin + route, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, `${route} at ${width}px`);
      assert.equal(await page.locator("h1").count(), 1, `${route}: one page heading`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert(!overflow, `${route} overflows at ${width}px`);
      assert.equal(await page.locator('a[href$=".pdf"]').count(), 0, `${route}: no PDF menu links`);
      if (route.startsWith("/menus/") && route !== "/menus/") {
        const menu = menus.find(menu => route === `/menus/${menu.slug}/`);
        assert.equal(await page.locator(".dish").count(), menu.sections.reduce((sum, section) => sum + section.items.length, 0), `${route}: all dishes rendered`);
      }
    }
    console.log(`Checked ${routes.length} routes at ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator('.desktop-navigation a[href="/menus/"]').click();
  await page.waitForURL("**/menus/");
  await page.locator('.menu-index-card[href="/menus/main/"]').click();
  await page.waitForURL("**/menus/main/");
  await page.getByRole("searchbox", { name: "Search this menu" }).fill("tempura");
  await page.waitForFunction(() => document.querySelectorAll(".dish").length === 1);
  assert.match(await page.locator(".dish").innerText(), /£11\.95/);
  assert.match(await page.locator(".dish").innerText(), /£19\.75/);
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.getByRole("button", { name: "Vegan", exact: true }).click();
  await page.waitForFunction(() => document.querySelectorAll(".dish").length === 1);
  assert.match(await page.locator(".dish h3").innerText(), /Vegan Protein Curry/);
  await page.getByRole("searchbox").fill("no-such-dish-999");
  await page.getByRole("button", { name: "Show the whole menu" }).click();
  await page.waitForFunction(() => document.querySelectorAll(".dish").length === 35);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("combobox", { name: "Choose a menu", exact: true }).selectOption("cocktails");
  await page.waitForURL("**/menus/cocktails/");
  assert.match(await page.locator(".menu-service-note").innerText(), /same two cocktails/);
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator(".dish").count(), 10);
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert(await page.locator("#mobile-navigation").isVisible());
  await page.keyboard.press("Escape");
  assert(!(await page.locator("#mobile-navigation").isVisible()));
  await page.goto(origin + "/book/", { waitUntil: "networkidle" });
  assert.equal(await page.locator('.booking-card a[href^="tel:"]').count(), 3);
  assert.equal(await page.locator('.booking-card a[href^="mailto:"]').count(), 3);
  await page.goto(origin + "/catering/", { waitUntil: "networkidle" });
  await page.getByLabel("Your name", { exact: true }).fill("Preview Guest");
  await page.getByLabel("Email address", { exact: true }).fill("guest@example.com");
  await page.getByLabel("Tell us a little more", { exact: true }).fill("An office lunch for 20 guests.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  const draft = await page.getByRole("link", { name: "open your draft here" }).getAttribute("href");
  assert.match(decodeURIComponent(draft), /An office lunch for 20 guests/);
  assert(draft.startsWith("mailto:info@naturalkitchen.co.uk?"));
  const notFound = await page.goto(origin + "/this-page-does-not-exist/", { waitUntil: "networkidle" });
  assert.equal(notFound.status(), 404);
  assert.match(await page.locator("h1").innerText(), /back to the table/);
  assert.deepEqual(errors, [], "Browser runtime errors");
  for (const [name, route, width, height] of [["homepage-desktop", "/", 1440, 1000], ["homepage-mobile", "/", 390, 844], ["menu-desktop", "/menus/main/", 1440, 1000], ["menu-mobile", "/menus/breakfast/", 390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.goto(origin + route, { waitUntil: "networkidle" });
    // Activate lazy images before capturing the entire page.
    await page.locator("img").evaluateAll(images => images.forEach(image => { image.loading = "eager"; }));
    await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
    if (name === "homepage-desktop") await page.screenshot({ path: `${output}/homepage-preview.png` });
  }
  console.log("Passed navigation, search, dietary filtering, reset, mobile menu selection, direct reload, booking links, email draft, 404 and runtime checks. Screenshots saved.");
} finally {
  await browser?.close();
  server.kill();
}
