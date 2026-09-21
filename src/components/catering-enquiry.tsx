"use client";
import { useState } from "react";
import { Arrow } from "./icons";

export function CateringEnquiry() {
  const [draft, setDraft] = useState<string | null>(null);
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Natural Kitchen,\n\nI’d like to enquire about ${data.get("type")}.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nDate: ${data.get("date") || "To be confirmed"}\nGuests: ${data.get("guests") || "To be confirmed"}\n\n${data.get("message")}\n\nThank you!`;
    const url = `mailto:info@naturalkitchen.co.uk?subject=${encodeURIComponent(`Catering & event enquiry — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setDraft(url);
    window.location.href = url;
  }
  return <form className="enquiry-form" onSubmit={prepare}>
    <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label><label>What are you planning?<select name="type"><option>Office catering</option><option>A private celebration</option><option>Venue hire</option><option>Something else</option></select></label><label>Preferred date <span>(optional)</span><input name="date" type="date" /></label><label>Number of guests <span>(optional)</span><input name="guests" type="number" min="1" max="10000" /></label></div><label>Tell us a little more<textarea name="message" rows={4} maxLength={1500} placeholder="The occasion, location, and anything you’d like us to know…" required /></label><p className="small-note">This opens an email draft for you to review and send. Your enquiry is confirmed only once our team replies.</p><button type="submit" className="button">Prepare my enquiry <Arrow /></button>{draft && <p role="status" className="form-feedback">If your email app didn’t open, <a href={draft}>open your draft here</a>, or email info@naturalkitchen.co.uk.</p>}
  </form>;
}
