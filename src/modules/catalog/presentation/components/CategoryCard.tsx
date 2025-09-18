import type { Category } from "../../domain";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition p-6 cursor-default md:cursor-pointer">
      <div className="aspect-[16/9] rounded-xl overflow-hidden border border-black/10">
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.imageAlt ?? category.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 will-change-transform hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-sm text-gray-400">Sin imagen</div>
        )}
      </div>

      <h3 className="mt-6 text-2xl font-bold text-[#11110f]">{category.name}</h3>
      <p className="mt-1 text-base text-[#11110f]/70">Explorar subcategorías</p>
    </div>
  );
}
