"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/data/catalog";
import { galleryAngles } from "@/data/catalog";
import { ArrowIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { useCatalogPricing } from "@/lib/catalog-pricing";
import { discountPercent, inr } from "@/lib/money";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [colour, setColour] = useState(product.colours[0].name);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const [pricedProduct] = useCatalogPricing([product]);
  const angle = galleryAngles[activeImage];
  const discount = discountPercent(pricedProduct.mrp, pricedProduct.price);

  const checkoutHref = useMemo(
    () =>
      `/checkout?product=${encodeURIComponent(product.slug)}&size=${encodeURIComponent(size)}&colour=${encodeURIComponent(colour)}&qty=${quantity}`,
    [colour, product.slug, quantity, size],
  );

  function share(channel: "whatsapp" | "facebook") {
    const url = window.location.href;
    const text = `Discover ${product.name} from Luca Brasi International`;
    const shareUrl =
      channel === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${text} — ${url}`)}`
        : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=720,height=620");
  }

  return (
    <section className="productDetailShell">
      <div className="productBreadcrumb">
        <Link href="/">Shop</Link><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong>
      </div>

      <div className="productDetailGrid">
        <div className="gallery">
          <div className="galleryThumbs" aria-label="Product gallery">
            {galleryAngles.map((item, index) => (
              <button
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`Show ${item.label}`}
                aria-pressed={activeImage === index}
                key={item.label}
              >
                <Image src={product.gallery[index]} alt="" fill sizes="96px" />
              </button>
            ))}
          </div>
          <div className="galleryMain">
            <Image
              src={product.gallery[activeImage]}
              alt={`${product.name} — ${angle.label}`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{
                objectPosition: angle.position,
                transform: `scale(${angle.scale})`,
              }}
            />
            <span className="galleryCounter">0{activeImage + 1} / 05</span>
            <span className="galleryLabel">{angle.label}</span>
          </div>
        </div>

        <div className="productPurchase">
          <span className="eyebrow">{product.category} · {pricedProduct.badge}</span>
          <h1>{product.name}</h1>
          <div className="detailRating">★ {product.rating} <span>({product.reviewCount} verified reviews)</span></div>
          <p className="detailDescription">{product.description}</p>

          <div className="detailPricing">
            <strong>{inr.format(pricedProduct.price)}</strong>
            <s>{inr.format(pricedProduct.mrp)}</s>
            <span>{discount}% off</span>
          </div>
          <div className="detailOffer"><span>◆</span>{pricedProduct.offer} · You save {inr.format(pricedProduct.mrp - pricedProduct.price)}</div>

          <fieldset className="choiceGroup">
            <legend>Colour <strong>{colour}</strong></legend>
            <div className="colourChoices">
              {product.colours.map((item) => (
                <button
                  type="button"
                  className={colour === item.name ? "active" : ""}
                  onClick={() => setColour(item.name)}
                  aria-label={item.name}
                  aria-pressed={colour === item.name}
                  key={item.name}
                >
                  <span style={{ backgroundColor: item.hex }} />
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="choiceGroup">
            <legend>Size <button type="button" onClick={() => setNotice("Size guide: choose your usual formalwear size. Between sizes? Size up for comfort.")}>Size guide</button></legend>
            <div className="sizeChoices">
              {product.sizes.map((item) => (
                <button
                  type="button"
                  className={size === item ? "active" : ""}
                  onClick={() => setSize(item)}
                  aria-pressed={size === item}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          {notice && <p className="inlineNotice" role="status">{notice}</p>}

          <div className="purchaseActions">
            <div className="quantityControl" aria-label="Quantity">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => Math.min(5, value + 1))} aria-label="Increase quantity">+</button>
            </div>
            <Link className="primaryButton purchaseButton" href={checkoutHref}>
              Buy now <ArrowIcon />
            </Link>
          </div>

          <div className="shareRow">
            <span>Share this piece</span>
            <button onClick={() => share("whatsapp")} type="button">WhatsApp</button>
            <button onClick={() => share("facebook")} type="button">Facebook</button>
          </div>

          <div className="detailAssurances">
            <div><TruckIcon /><span><strong>Complimentary delivery</strong>On this order</span></div>
            <div><ShieldIcon /><span><strong>Protected checkout</strong>Secure provider handoff</span></div>
          </div>

          <details open>
            <summary>Material & construction</summary>
            <p>{product.material}</p>
          </details>
          <details>
            <summary>Care</summary>
            <p>{product.care}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
