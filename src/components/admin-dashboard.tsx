"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/catalog";
import { inr } from "@/lib/money";

type View = "overview" | "products" | "orders" | "customers" | "enquiries" | "coupons" | "settings";
type IconName = View | "search" | "bell" | "menu" | "close" | "arrow" | "store";

const navItems: { id: View; label: string; badge?: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products", badge: "5" },
  { id: "orders", label: "Orders", badge: "12" },
  { id: "customers", label: "Customers" },
  { id: "enquiries", label: "Enquiries", badge: "4" },
  { id: "coupons", label: "Dealer coupons" },
  { id: "settings", label: "Store settings" },
];

const stockById: Record<string, number> = {
  "LB-SH-001": 38,
  "LB-BL-002": 12,
  "LB-ST-003": 64,
  "LB-VS-004": 8,
  "LB-IN-005": 47,
};

const orders = [
  { id: "#LBI-1048", customer: "Arjun Mehta", city: "Gurugram", product: "Bravura Oxford", amount: 5799, status: "Paid", time: "12 min ago" },
  { id: "#LBI-1047", customer: "Rohan Kapoor", city: "Chandigarh", product: "Imperial Blazer", amount: 8499, status: "Packing", time: "42 min ago" },
  { id: "#LBI-1046", customer: "Kabir Sethi", city: "New Delhi", product: "Regent Shirt × 2", amount: 4998, status: "Shipped", time: "2 hr ago" },
  { id: "#LBI-1045", customer: "Vihaan Arora", city: "Jaipur", product: "Signore Vest", amount: 3199, status: "Paid", time: "3 hr ago" },
  { id: "#LBI-1044", customer: "Ishaan Malhotra", city: "Ludhiana", product: "Nero Trunks", amount: 1299, status: "Delivered", time: "Yesterday" },
  { id: "#LBI-1043", customer: "Aarav Bansal", city: "Noida", product: "Bravura Oxford", amount: 5799, status: "Cancelled", time: "Yesterday" },
];

const customers = [
  { name: "Arjun Mehta", initials: "AM", email: "arjun.m@example.com", orders: 4, spend: 22496, tier: "Private client" },
  { name: "Rohan Kapoor", initials: "RK", email: "rohan.k@example.com", orders: 3, spend: 18797, tier: "Returning" },
  { name: "Kabir Sethi", initials: "KS", email: "kabir.s@example.com", orders: 2, spend: 10797, tier: "Returning" },
  { name: "Vihaan Arora", initials: "VA", email: "vihaan.a@example.com", orders: 1, spend: 3199, tier: "New" },
  { name: "Ishaan Malhotra", initials: "IM", email: "ishaan.m@example.com", orders: 1, spend: 1299, tier: "New" },
];

const enquiries = [
  { type: "Distributor", name: "Ankit Retail House", location: "Lucknow, UP", message: "Interested in the complete portfolio for two premium menswear stores.", age: "18 min", status: "New" },
  { type: "Product", name: "Dev Khanna", location: "Mumbai, MH", message: "Need assistance selecting the right Oxford shoe size.", age: "1 hr", status: "New" },
  { type: "Career", name: "Nikhil Saini", location: "Yamuna Nagar, HR", message: "Application for retail operations and store launch support.", age: "4 hr", status: "Reviewing" },
  { type: "Business", name: "Northline Associates", location: "Dehradun, UK", message: "Exploring a regional distribution association for Uttarakhand.", age: "Yesterday", status: "Contacted" },
];

const chart = [38, 46, 42, 58, 51, 68, 63, 75, 70, 84, 78, 92];

export function AdminDashboard() {
  const [view, setView] = useState<View>("overview");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();
    return products.filter((product) => !query || `${product.name} ${product.id} ${product.category}`.toLowerCase().includes(query));
  }, [search]);

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim();
    return orders.filter((order) => !query || Object.values(order).join(" ").toLowerCase().includes(query));
  }, [search]);

  function changeView(next: View) {
    setView(next);
    setSearch("");
    setSidebarOpen(false);
    setToast("");
  }

  function showDemoMessage(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  return (
    <div className="controlShell">
      <aside className={`controlSidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="controlBrand">
          <Image src="/brand/luca-brasi-monogram.svg" alt="" width={50} height={50} />
          <span><strong>Luca Brasi</strong><small>Command centre</small></span>
          <button className="controlClose" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><AdminIcon name="close" /></button>
        </div>

        <div className="controlStoreState"><span className="liveDot" /><div><strong>Storefront live</strong><small>Hard-coded demo mode</small></div></div>

        <nav className="controlNav" aria-label="Administration">
          <span className="controlNavLabel">Workspace</span>
          {navItems.slice(0, 6).map((item) => (
            <button className={view === item.id ? "active" : ""} onClick={() => changeView(item.id)} key={item.id}>
              <AdminIcon name={item.id} /><span>{item.label}</span>{item.badge && <small>{item.badge}</small>}
            </button>
          ))}
          <span className="controlNavLabel controlNavLabelSecond">System</span>
          {navItems.slice(6).map((item) => (
            <button className={view === item.id ? "active" : ""} onClick={() => changeView(item.id)} key={item.id}>
              <AdminIcon name={item.id} /><span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="controlSidebarFoot">
          <div className="controlUser"><span>TS</span><div><strong>Tushar</strong><small>Store administrator</small></div></div>
          <Link href="/"><AdminIcon name="store" /> View storefront</Link>
        </div>
      </aside>

      {sidebarOpen && <button className="controlScrim" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}

      <main className="controlMain">
        <header className="controlTopbar">
          <button className="controlMenu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><AdminIcon name="menu" /></button>
          <label className="controlSearch"><AdminIcon name="search" /><span className="srOnly">Search current view</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${view}…`} /></label>
          <div className="controlTopActions">
            <Link href="/" className="controlPreview"><AdminIcon name="store" /> Preview store</Link>
            <button className="controlBell" onClick={() => showDemoMessage("You have 3 new store notifications.")} aria-label="Notifications"><AdminIcon name="bell" /><span /></button>
            <div className="controlAvatar">TS</div>
          </div>
        </header>

        <div className="controlContent">
          <div className="controlPageHead">
            <div><span className="controlKicker">Luca Brasi International · Admin</span><h1>{navItems.find((item) => item.id === view)?.label}</h1><p>{viewDescription(view)}</p></div>
            <div className="controlPageActions">
              {view === "products" && <Link className="controlSecondaryAction" href="/admin/pricing">Pricing & offers</Link>}
              <button className="controlPrimaryAction" onClick={() => showDemoMessage(actionMessage(view))}>{actionLabel(view)} <AdminIcon name="arrow" /></button>
            </div>
          </div>

          <div className="demoBanner"><span>Demo workspace</span><p>All records on this dashboard are hard-coded. No customer, order, or business data is being stored yet.</p><code>DB: disconnected</code></div>

          {view === "overview" && <Overview changeView={changeView} />}
          {view === "products" && <ProductsView items={filteredProducts} onDemo={showDemoMessage} />}
          {view === "orders" && <OrdersView items={filteredOrders} onDemo={showDemoMessage} />}
          {view === "customers" && <CustomersView query={search} onDemo={showDemoMessage} />}
          {view === "enquiries" && <EnquiriesView query={search} onDemo={showDemoMessage} />}
          {view === "coupons" && <CouponsView onDemo={showDemoMessage} />}
          {view === "settings" && <SettingsView onDemo={showDemoMessage} />}
        </div>
      </main>

      {toast && <div className="controlToast" role="status"><span>✓</span>{toast}</div>}
    </div>
  );
}

function Overview({ changeView }: { changeView: (view: View) => void }) {
  return (
    <>
      <section className="controlStats">
        <Metric label="Gross sales" value="₹1,84,620" delta="+18.4%" note="vs previous 30 days" tone="gold" />
        <Metric label="Orders" value="48" delta="+12.1%" note="6 awaiting action" />
        <Metric label="Customers" value="39" delta="+8 new" note="31 returning visits" />
        <Metric label="Conversion" value="3.8%" delta="+0.6%" note="from 1,264 sessions" />
      </section>

      <section className="controlOverviewGrid">
        <article className="controlCard controlRevenue">
          <div className="controlCardHead"><div><span>Revenue pulse</span><h2>Sales performance</h2></div><select aria-label="Revenue period" defaultValue="30"><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></div>
          <div className="revenueTotal"><strong>₹1.84L</strong><span>↑ 18.4%</span></div>
          <div className="revenueChart" aria-label="Revenue chart showing an upward trend">
            {chart.map((height, index) => <span key={index} style={{ height: `${height}%` }}><i /></span>)}
          </div>
          <div className="revenueAxis"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div>
        </article>

        <article className="controlCard controlQuickActions">
          <div className="controlCardHead"><div><span>Shortcuts</span><h2>Quick actions</h2></div></div>
          <button onClick={() => changeView("products")}><span>01</span><div><strong>Review products</strong><small>Stock, visibility and catalogue</small></div><AdminIcon name="arrow" /></button>
          <button onClick={() => changeView("orders")}><span>02</span><div><strong>Process orders</strong><small>6 orders need attention</small></div><AdminIcon name="arrow" /></button>
          <button onClick={() => changeView("enquiries")}><span>03</span><div><strong>Reply to enquiries</strong><small>2 new business leads</small></div><AdminIcon name="arrow" /></button>
          <Link href="/admin/pricing"><span>04</span><div><strong>Adjust pricing</strong><small>Offers and dealer coupons</small></div><AdminIcon name="arrow" /></Link>
        </article>
      </section>

      <section className="controlBottomGrid">
        <article className="controlCard controlRecentOrders">
          <div className="controlCardHead"><div><span>Latest activity</span><h2>Recent orders</h2></div><button onClick={() => changeView("orders")}>View all</button></div>
          <OrderTable items={orders.slice(0, 4)} compact />
        </article>
        <article className="controlCard controlStock">
          <div className="controlCardHead"><div><span>Inventory</span><h2>Stock watch</h2></div></div>
          {products.slice(0, 4).map((product) => {
            const stock = stockById[product.id];
            return <div className="stockItem" key={product.id}><div><Image src={product.image} alt="" fill sizes="48px" /></div><span><strong>{product.name}</strong><small>{stock} units available</small></span><i className={stock < 15 ? "low" : ""}>{stock < 15 ? "Low" : "Healthy"}</i></div>;
          })}
        </article>
      </section>
    </>
  );
}

function Metric({ label, value, delta, note, tone }: { label: string; value: string; delta: string; note: string; tone?: string }) {
  return <article className={`controlMetric ${tone ?? ""}`}><span>{label}</span><div><strong>{value}</strong><i>{delta}</i></div><small>{note}</small><b aria-hidden="true" /></article>;
}

function ProductsView({ items, onDemo }: { items: typeof products; onDemo: (message: string) => void }) {
  return (
    <section className="controlCard controlDataCard">
      <div className="controlDataToolbar"><div><button className="active">All products</button><button>Published</button><button>Low stock</button></div><span>{items.length} products</span></div>
      <div className="controlTableWrap">
        <table className="controlTable productAdminTable"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Inventory</th><th>Status</th><th /></tr></thead><tbody>
          {items.map((product) => { const stock = stockById[product.id]; return <tr key={product.id}><td><div className="adminProduct"><span><Image src={product.image} alt="" fill sizes="56px" /></span><div><strong>{product.name}</strong><small>{product.id}</small></div></div></td><td>{product.category}</td><td><strong>{inr.format(product.price)}</strong><small className="tableOldPrice">MRP {inr.format(product.mrp)}</small></td><td><div className="inventoryCell"><span><i style={{ width: `${Math.min(100, stock * 1.5)}%` }} /></span><small>{stock} units</small></div></td><td><Status value={stock ? "Published" : "Draft"} /></td><td><button className="tableMenu" onClick={() => onDemo(`${product.name} editor will connect to the product database later.`)}>•••</button></td></tr>; })}
        </tbody></table>
      </div>
      {!items.length && <EmptyState label="No products match this search." />}
    </section>
  );
}

function OrdersView({ items, onDemo }: { items: typeof orders; onDemo: (message: string) => void }) {
  return <section className="controlCard controlDataCard"><div className="controlDataToolbar"><div><button className="active">All orders</button><button>Unfulfilled</button><button>Paid</button><button>Delivered</button></div><span>{items.length} orders shown</span></div><OrderTable items={items} onDemo={onDemo} />{!items.length && <EmptyState label="No orders match this search." />}</section>;
}

function OrderTable({ items, compact = false, onDemo }: { items: typeof orders; compact?: boolean; onDemo?: (message: string) => void }) {
  return <div className="controlTableWrap"><table className="controlTable"><thead><tr><th>Order</th><th>Customer</th>{!compact && <th>Destination</th>}<th>Product</th><th>Total</th><th>Status</th><th /></tr></thead><tbody>{items.map((order) => <tr key={order.id}><td><strong>{order.id}</strong><small>{order.time}</small></td><td>{order.customer}</td>{!compact && <td>{order.city}</td>}<td>{order.product}</td><td><strong>{inr.format(order.amount)}</strong></td><td><Status value={order.status} /></td><td><button className="tableMenu" onClick={() => onDemo?.(`${order.id} is demo data. Order details will open after database connection.`)}>•••</button></td></tr>)}</tbody></table></div>;
}

function CustomersView({ query, onDemo }: { query: string; onDemo: (message: string) => void }) {
  const shown = customers.filter((customer) => !query || `${customer.name} ${customer.email} ${customer.tier}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="controlCard controlDataCard"><div className="controlDataToolbar"><div><button className="active">All customers</button><button>Returning</button><button>High value</button></div><span>{shown.length} customers</span></div><div className="customerGrid">{shown.map((customer) => <article className="customerCard" key={customer.email}><div className="customerAvatar">{customer.initials}</div><Status value={customer.tier} /><h3>{customer.name}</h3><a href={`mailto:${customer.email}`}>{customer.email}</a><dl><div><dt>Orders</dt><dd>{customer.orders}</dd></div><div><dt>Total spend</dt><dd>{inr.format(customer.spend)}</dd></div></dl><button onClick={() => onDemo(`${customer.name}'s profile will load from the customer database later.`)}>View customer <AdminIcon name="arrow" /></button></article>)}</div>{!shown.length && <EmptyState label="No customers match this search." />}</section>;
}

function EnquiriesView({ query, onDemo }: { query: string; onDemo: (message: string) => void }) {
  const shown = enquiries.filter((item) => !query || Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div className="enquiryGrid">{shown.map((item, index) => <article className="controlCard enquiryCard" key={`${item.name}-${index}`}><div className="enquiryHead"><span>{item.type}</span><Status value={item.status} /></div><h2>{item.name}</h2><small>{item.location} · {item.age} ago</small><p>{item.message}</p><div><button onClick={() => onDemo(`Reply workflow for ${item.name} will connect to email or CRM later.`)}>Open enquiry</button><button aria-label="More options" onClick={() => onDemo("Enquiry actions are visual only in demo mode.")}>•••</button></div></article>)}{!shown.length && <EmptyState label="No enquiries match this search." />}</div>;
}

function CouponsView({ onDemo }: { onDemo: (message: string) => void }) {
  return <><section className="couponSummary"><article><span>Reserved codes</span><strong>20</strong><small>Unique dealer allocations</small></article><article><span>Active codes</span><strong>0</strong><small>Awaiting dealer appointments</small></article><article><span>Average discount</span><strong>10%</strong><small>Default allocation</small></article></section><section className="controlCard dealerPanel"><div><span className="controlKicker">Dealer programme</span><h2>Coupon reserve is ready.</h2><p>Twenty unique dealer codes are pre-generated and inactive. Assign, set a discount, and activate each code when a dealer joins the network.</p><Link className="controlPrimaryAction" href="/admin/pricing">Manage all dealer coupons <AdminIcon name="arrow" /></Link></div><div className="couponStack"><span>LBI-DEALER-01 <i>Inactive</i></span><span>LBI-DEALER-02 <i>Inactive</i></span><span>LBI-DEALER-03 <i>Inactive</i></span><button onClick={() => onDemo("All 20 coupon records are available in Pricing & promotions.")}>+ 17 more reserved codes</button></div></section></>;
}

function SettingsView({ onDemo }: { onDemo: (message: string) => void }) {
  return <form className="settingsGrid" onSubmit={(event) => { event.preventDefault(); onDemo("Settings saved in demo mode. Database persistence will be added later."); }}><section className="controlCard settingsSection"><div className="controlCardHead"><div><span>Identity</span><h2>Store details</h2></div></div><label>Business name<input defaultValue="Luca Brasi International" /></label><label>Customer email<input type="email" defaultValue="lucabrasiinternational@gmail.com" /></label><label>Business address<textarea rows={3} defaultValue="218, Lakshmi Garden, Yamuna Nagar, Haryana" /></label></section><section className="controlCard settingsSection"><div className="controlCardHead"><div><span>Commerce</span><h2>Operational defaults</h2></div></div><label>Currency<select defaultValue="INR"><option value="INR">INR — Indian Rupee</option></select></label><label>Complimentary delivery threshold<input defaultValue="2999" inputMode="numeric" /></label><label>Default offer title<input defaultValue="Private Launch Offer" /></label><label className="settingsCheck"><input type="checkbox" defaultChecked /><span>Show prices inclusive of applicable taxes</span></label></section><div className="settingsActions"><p>These controls are visual placeholders until the database and authentication layers are connected.</p><button className="controlPrimaryAction" type="submit">Save demo settings <AdminIcon name="arrow" /></button></div></form>;
}

function Status({ value }: { value: string }) {
  const slug = value.toLowerCase().replaceAll(" ", "-");
  return <span className={`controlStatus status-${slug}`}><i />{value}</span>;
}

function EmptyState({ label }: { label: string }) {
  return <div className="controlEmpty"><span>⌁</span><p>{label}</p></div>;
}

function viewDescription(view: View) {
  const descriptions: Record<View, string> = {
    overview: "A clear view of today’s store performance and priorities.",
    products: "Manage the catalogue, pricing, stock, and product visibility.",
    orders: "Review payments, fulfilment progress, and delivery status.",
    customers: "Understand customer value and purchase history.",
    enquiries: "Keep up with product, career, and distribution conversations.",
    coupons: "Reserve and activate unique codes for appointed dealers.",
    settings: "Configure store identity and operational defaults.",
  };
  return descriptions[view];
}

function actionLabel(view: View) {
  const labels: Record<View, string> = { overview: "Create report", products: "Add product", orders: "Export orders", customers: "Export customers", enquiries: "New enquiry", coupons: "Create coupon", settings: "Save settings" };
  return labels[view];
}

function actionMessage(view: View) {
  const messages: Record<View, string> = {
    overview: "Reports will become available after analytics data is connected.",
    products: "Product creation is ready to connect to the catalogue database.",
    orders: "Order export will be enabled when real orders are stored.",
    customers: "Customer export will be enabled with the customer database.",
    enquiries: "Enquiries will be created through the connected CRM or inbox.",
    coupons: "Coupon creation is available in Pricing & promotions.",
    settings: "Use the settings form below to preview store configuration.",
  };
  return messages[view];
}

function AdminIcon({ name }: { name: IconName }) {
  const common = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    products: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    orders: <><path d="M6 3h12v18H6z" /><path d="M9 7h6M9 11h6M9 15h4" /></>,
    customers: <><circle cx="9" cy="8" r="4" /><path d="M2.5 21c.5-5 3-7 6.5-7s6 2 6.5 7M16 5.5a3.5 3.5 0 0 1 0 6.8M17 15c2.8.5 4.3 2.4 4.5 6" /></>,
    enquiries: <><path d="M4 4h16v12H8l-4 4V4Z" /><path d="M8 8h8M8 12h5" /></>,
    coupons: <><path d="M3 8a3 3 0 0 0 0 6v4h18v-4a3 3 0 0 0 0-6V4H3v4Z" /><path d="M13 4v14M9 8l6 6M15 8l-6 6" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    store: <><path d="M4 10v10h16V10M3 4h18l-2 6H5L3 4Z" /><path d="M9 20v-6h6v6" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
