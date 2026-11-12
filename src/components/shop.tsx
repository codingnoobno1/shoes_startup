"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { categories, products } from "@/data/catalog";
import { SearchIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { useCatalogPricing } from "@/lib/catalog-pricing";

export function Shop() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const pricedProducts = useCatalogPricing(products);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return pricedProducts.filter((product) => {
      const inCategory = category === "All" || product.category === category;
      const matches =
        !normalized ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalized);
      return inCategory && matches;
    });
  }, [category, pricedProducts, query]);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="heroCopy">
          <span className="eyebrow">The private launch collection · 2026</span>
          <h1 id="hero-title">Dress like your<br /><em>name matters.</em></h1>
          <p>
            Purposeful tailoring, polished leather and elevated essentials—made
            for the man who enters quietly and is remembered.
          </p>
          <a className="primaryButton" href="#collection">
            Explore the collection <span>↘</span>
          </a>
        </div>
        <div className="heroVisual" aria-label="Featured Bravura Oxford shoes">
          <div className="heroOrb" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/oxford-shoes.jpg" alt="Oxblood leather Oxford shoes" />
          <div className="heroProductTag">
            <span>01 / Signature piece</span>
            <strong>Bravura Oxford</strong>
            <small>Hand-finished full-grain leather</small>
          </div>
        </div>
        <div className="heroIndex" aria-hidden="true">01</div>
      </section>

      <section className="trustStrip" aria-label="Shopping assurances">
        <div><TruckIcon /><span><strong>Complimentary delivery</strong>Above ₹2,999</span></div>
        <div><ShieldIcon /><span><strong>Secure advance payment</strong>Provider-ready checkout</span></div>
        <div><span className="trustMonogram">LB</span><span><strong>Considered quality</strong>Materials selected to endure</span></div>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">Curated for your wardrobe</span>
            <h2 id="collection-title">The launch edit</h2>
          </div>
          <p>
            Five foundations, one point of view. Each piece is designed to hold
            its own and work effortlessly with the rest.
          </p>
        </div>

        <div className="catalogToolbar">
          <div className="categoryTabs" role="tablist" aria-label="Product categories">
            {["All", ...categories].map((item) => (
              <button
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
                role="tab"
                aria-selected={category === item}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="searchBox">
            <SearchIcon />
            <span className="srOnly">Search products</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the edit"
            />
          </label>
        </div>

        <div className="resultLine">
          <span>{visibleProducts.length} pieces</span>
          <span>Prices include all applicable taxes</span>
        </div>

        {visibleProducts.length ? (
          <div className="productGrid">
            {visibleProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <p>No pieces match that search.</p>
            <button onClick={() => { setQuery(""); setCategory("All"); }}>
              Reset collection
            </button>
          </div>
        )}
      </section>

      <section className="brandStatement">
        <Image className="brandStatementMark" src="/brand/luca-brasi-monogram.svg" width={290} height={290} alt="" aria-hidden="true" />
        <p>“Style is not the loudest thing in the room.<br />It is the thing the room remembers.”</p>
        <span>Luca Brasi International</span>
      </section>
    </>
  );
}
