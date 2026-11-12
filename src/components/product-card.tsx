import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import { ArrowIcon } from "@/components/icons";
import { discountPercent, inr } from "@/lib/money";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.mrp, product.price);

  return (
    <article className="productCard">
      <Link className="productImage" href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="productBadge">{product.badge}</span>
        <span className="viewCue" aria-hidden="true"><ArrowIcon /></span>
      </Link>
      <div className="productInfo">
        <div className="productMeta">
          <span>{product.category}</span>
          <span>★ {product.rating} · {product.reviewCount}</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="swatchRow" aria-label="Available colours">
          {product.colours.map((colour) => (
            <span
              className="swatch"
              style={{ backgroundColor: colour.hex }}
              title={colour.name}
              key={colour.name}
            />
          ))}
          <span className="variantSummary">{product.sizes.length} sizes</span>
        </div>
        <div className="priceRow">
          <strong>{inr.format(product.price)}</strong>
          <s>{inr.format(product.mrp)}</s>
          <span>{discount}% off</span>
        </div>
        <div className="offerLine">{product.offer}</div>
      </div>
    </article>
  );
}
