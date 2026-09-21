export const restaurants = [
  {
    slug: "angel-court", name: "Angel Court", neighbourhood: "Bank",
    address: "1A Copthall Avenue", postcode: "London EC2R 7BH",
    phone: "020 7374 8531", telephone: "+442073748531", email: "angelcourt@naturalkitchen.co.uk",
    image: "angel-court", description: "A place to meet in the heart of the City. From breakfast and the deli counter to an evening at the bar, make Angel Court part of your day.",
    hours: [
      { title: "Restaurant & bar", lines: ["Monday–Thursday · 8am until late", "Friday · from 11.30am", "Weekends · closed"] },
      { title: "Deli", lines: ["Monday–Thursday · 8am–3pm", "Friday · from 11.30am"] },
    ],
    note: "Available for private hire at weekends.",
  },
  {
    slug: "new-street-square", name: "New Street Square", neighbourhood: "Fetter Lane",
    address: "15–17 New Street Square", postcode: "London EC4A 3AP",
    phone: "020 7583 6655", telephone: "+442075836655", email: "fetterlane@naturalkitchen.co.uk",
    image: "new-street-square", description: "A little pause in the working day. Join us for breakfast, settle in for lunch, or take something freshly prepared from our deli.",
    hours: [
      { title: "Restaurant", lines: ["Monday–Friday · 7.30am–4pm", "Weekends · closed"] },
      { title: "Deli", lines: ["Monday–Friday · 7.30am–3pm", "Drinks & bakery available until 5pm"] },
    ],
    note: "Deli available to take away or eat in. Available for private hire at weekends.",
  },
  {
    slug: "trinity-square", name: "Trinity Square", neighbourhood: "Tower Hill",
    address: "7 Pepys Street, Trinity Square", postcode: "London EC3N 4AF",
    phone: "020 3246 1043", telephone: "+442032461043", email: "trinity@naturalkitchen.co.uk",
    image: "trinity-square", description: "Make a day of it at Tower Hill. Our restaurant and bar welcome you throughout the week, from breakfast to an unhurried evening.",
    hours: [
      { title: "Restaurant & bar", lines: ["Monday–Friday · 8am until late", "Saturday–Sunday · 9am until late"] },
    ],
    note: "No deli at this location. Our restaurant menu is available for takeaway.",
  },
];

export function directionsUrl(restaurant: (typeof restaurants)[number]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Natural Kitchen ${restaurant.address} ${restaurant.postcode}`)}`;
}
