import Image from "next/image";

export function Photo({ name, alt, className = "", priority = false, sizes = "(max-width: 700px) 100vw, 50vw" }: { name: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`photo ${className}`}><Image src={`/images/${name}.webp`} alt={alt} fill sizes={sizes} priority={priority} /></div>;
}
