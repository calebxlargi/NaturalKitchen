import type { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement>;
export function Arrow(props: Props) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M5 19 19 5M5 5h14v14" /></svg>;
}
export function SearchIcon(props: Props) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
}
export function Pin(props: Props) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
