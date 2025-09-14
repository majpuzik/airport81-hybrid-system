import Image from "next/image";

export default function DockCard({ slug, title, desc, img }:{ slug:string; title:string; desc:string; img:string }){
  return (
    <a href={slug} className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-36">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{desc}</p>
      </div>
    </a>
  );
}
