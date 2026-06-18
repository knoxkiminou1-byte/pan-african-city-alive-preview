import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CreditCard,
  ExternalLink,
  Filter,
  Heart,
  Mail,
  MapPin,
  Menu,
  Minus,
  Music2,
  PackageOpen,
  Phone,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ProductCategory = "Art & Masks" | "Carvings" | "Textiles" | "Garments" | "Jewelry" | "Body Care" | "Books & Oils" | "Gifts";
type EventKind = "legacy" | "drumming" | "storytelling" | "jewelry";

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  price: number;
  badge: string;
  description: string;
  detail: string;
}

interface Program {
  id: EventKind;
  title: string;
  image: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  description: string;
}

interface Collection {
  title: ProductCategory;
  image: string;
  description: string;
}

const image = (name: string) => `/images/final/${name}`;

const products: Product[] = [
  {
    id: "painted-gallery-mask",
    name: "Painted Gallery Mask",
    category: "Art & Masks",
    image: image("product-painted-mask.jpg"),
    price: 128,
    badge: "Sample price",
    description: "A vivid mask display piece for a hero wall, entry shelf, or collector corner.",
    detail: "Final inventory, origin notes, and artisan details should be confirmed before checkout is made live."
  },
  {
    id: "wood-carving-trio",
    name: "Wood Carving Trio",
    category: "Carvings",
    image: image("product-wood-carvings.jpg"),
    price: 84,
    badge: "Sample price",
    description: "A tabletop carving set inspired by the shop's dense wood-art display language.",
    detail: "Designed for browsing and inquiry, with product-story space ready for confirmed provenance."
  },
  {
    id: "kente-cloth-fold",
    name: "Kente Cloth Fold",
    category: "Textiles",
    image: image("product-kente-fabric.jpg"),
    price: 68,
    badge: "Sample price",
    description: "Bright folded cloth styling that carries the kente side-rail look into the shop.",
    detail: "The live catalog can swap this concept image for actual photographed inventory."
  },
  {
    id: "mudcloth-textile-bundle",
    name: "Mudcloth Textile Bundle",
    category: "Textiles",
    image: image("shop-textile-lounge.png"),
    price: 92,
    badge: "Sample price",
    description: "A warm textile bundle for home, display, fashion styling, and gifting.",
    detail: "Quantity, dimensions, and material notes are intentionally left editable."
  },
  {
    id: "garment-rail-edit",
    name: "Garment Rail Edit",
    category: "Garments",
    image: image("product-garments.jpg"),
    price: 74,
    badge: "Sample price",
    description: "A colorful apparel rail concept for garments, wraps, and wearable culture.",
    detail: "Built so the final store can add size, color, and pickup options."
  },
  {
    id: "beaded-necklace-set",
    name: "Beaded Necklace Set",
    category: "Jewelry",
    image: image("product-jewelry.jpg"),
    price: 46,
    badge: "Sample price",
    description: "Layered beadwork photographed for a rich counter-display shopping experience.",
    detail: "Add maker notes and care details once the final pieces are photographed."
  },
  {
    id: "shea-butter-jar",
    name: "Shea Butter Jar",
    category: "Body Care",
    image: image("product-shea-butter.jpg"),
    price: 18,
    badge: "Sample price",
    description: "A clean body-care shelf treatment for shea butter, oils, and daily care.",
    detail: "Ingredient and size information should be verified before a live sale."
  },
  {
    id: "black-soap-stack",
    name: "Black Soap Stack",
    category: "Body Care",
    image: image("product-black-soap.jpg"),
    price: 16,
    badge: "Sample price",
    description: "A tactile soap stack with warm lighting and clear retail framing.",
    detail: "This is a concept product listing until the exact inventory is confirmed."
  },
  {
    id: "books-incense-set",
    name: "Books & Incense Set",
    category: "Books & Oils",
    image: image("product-books-oils.jpg"),
    price: 42,
    badge: "Sample price",
    description: "A cultural-resource bundle joining books, scent, and counter discovery.",
    detail: "Book titles and publisher metadata should be added from the final catalog."
  },
  {
    id: "oil-discovery-bar",
    name: "Oil Discovery Bar",
    category: "Books & Oils",
    image: image("shop-shelf-oils.png"),
    price: 24,
    badge: "Sample price",
    description: "A scent-bar concept for oils, incense, and small giftable care items.",
    detail: "The checkout flow is ready for variants once fragrance names are confirmed."
  },
  {
    id: "gallery-wall-consult",
    name: "Gallery Wall Consultation",
    category: "Art & Masks",
    image: image("shop-gallery-back-wall.png"),
    price: 150,
    badge: "Inquiry item",
    description: "A service-style listing for curating a home or office wall with cultural objects.",
    detail: "This keeps higher-touch purchases in inquiry mode instead of forcing instant checkout."
  },
  {
    id: "heritage-gift-bundle",
    name: "Heritage Gift Bundle",
    category: "Gifts",
    image: image("real-store-merch-wall.jpg"),
    price: 58,
    badge: "Sample price",
    description: "A curated gift path for baskets, small art objects, jewelry, books, and oils.",
    detail: "Final bundles can be assembled seasonally for holidays, Kwanzaa, and local events."
  }
];

const collections: Collection[] = [
  {
    title: "Art & Masks",
    image: image("product-painted-mask.jpg"),
    description: "Masks, gallery walls, object stories, and collector pieces."
  },
  {
    title: "Carvings",
    image: image("product-wood-carvings.jpg"),
    description: "Wood figures, tabletop art, ritual objects, and home display."
  },
  {
    title: "Textiles",
    image: image("product-kente-fabric.jpg"),
    description: "Kente cloth, mudcloth, folded fabric, and textile storytelling."
  },
  {
    title: "Garments",
    image: image("product-garments.jpg"),
    description: "Wearable culture, wraps, shirts, dresses, and statement apparel."
  },
  {
    title: "Jewelry",
    image: image("product-jewelry.jpg"),
    description: "Beads, bracelets, necklaces, earrings, and counter treasures."
  },
  {
    title: "Body Care",
    image: image("product-shea-butter.jpg"),
    description: "Shea butter, black soap, oils, and daily care rituals."
  },
  {
    title: "Books & Oils",
    image: image("product-books-oils.jpg"),
    description: "Books, resources, incense, fragrance, and learning goods."
  },
  {
    title: "Gifts",
    image: image("real-store-merch-wall.jpg"),
    description: "Curated bundles and small objects for meaningful giving."
  }
];

const programs: Program[] = [
  {
    id: "legacy",
    title: "Open House & Legacy Relaunch",
    image: image("real-store-room.jpg"),
    dateLabel: "Next date to confirm",
    timeLabel: "Program format ready",
    location: "1848 Bay Road, East Palo Alto",
    description: "A community welcome, founder-story wall, shop tour, and retail relaunch moment."
  },
  {
    id: "drumming",
    title: "African Drumming & Dance",
    image: image("hero-store-mask.png"),
    dateLabel: "Workshop lane",
    timeLabel: "Dates to confirm",
    location: "Gallery / performance area",
    description: "A low-barrier cultural program that turns the store into an active gathering space."
  },
  {
    id: "storytelling",
    title: "African Storytelling Evening",
    image: image("keisha-story-wall.jpg"),
    dateLabel: "Story circle",
    timeLabel: "Dates to confirm",
    location: "Founder wall and gallery",
    description: "Founder-led and guest-led stories around objects, origin, memory, and belonging."
  },
  {
    id: "jewelry",
    title: "Jewelry Making Workshop",
    image: image("event-jewelry-workshop-crop.jpg"),
    dateLabel: "Hands-on class",
    timeLabel: "Dates to confirm",
    location: "Workshop table",
    description: "A tactile workshop path connected to the jewelry, beadwork, and gift categories."
  }
];

const categories = ["All", ...collections.map((collection) => collection.title)] as const;
type CategoryFilter = (typeof categories)[number];

const navItems = [
  ["Story", "#story"],
  ["Shop", "#shop"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["Visit", "#visit"]
] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function useDrumLoop(enabled: boolean) {
  const audioContext = useRef<AudioContext | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
      return;
    }

    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const ctx = audioContext.current ?? new AudioCtor();
    audioContext.current = ctx;
    void ctx.resume();

    const hit = (frequency: number, gainValue: number, delay: number, duration = 0.18) => {
      const start = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(38, frequency * 0.55), start + duration);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(720, start);
      gain.gain.setValueAtTime(gainValue, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.05);
    };

    const pattern = () => {
      hit(118, 0.085, 0);
      hit(205, 0.032, 0.28, 0.12);
      hit(152, 0.052, 0.58, 0.15);
      hit(238, 0.026, 0.88, 0.12);
      hit(124, 0.078, 1.16, 0.18);
      hit(185, 0.038, 1.48, 0.13);
    };

    pattern();
    timer.current = window.setInterval(pattern, 1900);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [enabled]);
}

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introOpening, setIntroOpening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [drumsOn, setDrumsOn] = useState(false);

  useDrumLoop(drumsOn);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = !query || [product.name, product.category, product.description].some((value) => value.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({ product, quantity: cart[product.id] })),
    [cart]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function openSite() {
    if (introOpening) return;
    setIntroOpening(true);
    setDrumsOn(true);
    window.setTimeout(() => setIntroVisible(false), 1180);
  }

  function addToCart(product: Product, quantity = 1) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + quantity }));
    setCheckoutDone(false);
    setCartOpen(true);
  }

  function setQuantity(productId: string, quantity: number) {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  }

  function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutDone(true);
  }

  function handleRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRsvpDone(true);
  }

  return (
    <div className="app-shell">
      {introVisible && <IntroOverlay isOpening={introOpening} onOpen={openSite} />}
      <Header
        cartCount={cartCount}
        drumsOn={drumsOn}
        menuOpen={menuOpen}
        onCart={() => setCartOpen(true)}
        onMenu={() => setMenuOpen((value) => !value)}
        onToggleDrums={() => setDrumsOn((value) => !value)}
      />
      {menuOpen && <MobileNav onClose={() => setMenuOpen(false)} />}

      <main>
        <Hero onShop={() => document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" })} />
        <Story />
        <Collections activeCategory={activeCategory} onSelect={setActiveCategory} />
        <Shop
          activeCategory={activeCategory}
          products={filteredProducts}
          searchTerm={searchTerm}
          onAdd={addToCart}
          onCategory={setActiveCategory}
          onSearch={setSearchTerm}
          onSelect={setSelectedProduct}
        />
        <Events onRsvp={(program) => {
          setActiveProgram(program);
          setRsvpDone(false);
        }} />
        <Gallery />
        <Visit />
      </main>

      <Footer />

      {selectedProduct && <ProductModal product={selectedProduct} onAdd={addToCart} onClose={() => setSelectedProduct(null)} />}
      {cartOpen && (
        <CartDrawer
          checkoutDone={checkoutDone}
          items={cartItems}
          total={cartTotal}
          onCheckout={handleCheckout}
          onClose={() => setCartOpen(false)}
          onQuantity={setQuantity}
        />
      )}
      {activeProgram && (
        <RsvpModal
          done={rsvpDone}
          program={activeProgram}
          onClose={() => setActiveProgram(null)}
          onSubmit={handleRsvp}
        />
      )}
    </div>
  );
}

function IntroOverlay({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  return (
    <div className={`intro-overlay ${isOpening ? "is-opening" : ""}`}>
      <img className="intro-image" src={image("hero-store-mask.png")} alt="Colorful Pan African City Alive store interior with a mask centerpiece" />
      <div className="intro-scrim" aria-hidden="true" />
      <button className="mask-opener" type="button" aria-label="Click the mask to open Pan African City Alive" onClick={onOpen}>
        <span className="mouth-cover" aria-hidden="true" />
        <span className="mask-command">Click the mask to open</span>
      </button>
      <div className="intro-panel">
        <LogoMark />
        <p>Assistant user: this is now the finished storefront draft. Inventory, prices, and booking actions remain demonstration data until Keisha confirms the final catalog.</p>
        <button className="button primary" type="button" onClick={onOpen}>
          <Sparkles aria-hidden="true" size={18} />
          Enter the store
        </button>
      </div>
    </div>
  );
}

function Header({
  cartCount,
  drumsOn,
  menuOpen,
  onCart,
  onMenu,
  onToggleDrums
}: {
  cartCount: number;
  drumsOn: boolean;
  menuOpen: boolean;
  onCart: () => void;
  onMenu: () => void;
  onToggleDrums: () => void;
}) {
  return (
    <>
      <div className="top-strip">
        <span>Since 1993</span>
        <span>Serving the Bay Area & beyond</span>
        <span>Culture</span>
        <span>Community</span>
        <span>Commerce</span>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pan African City Alive home">
          <LogoMark />
          <span>
            Pan African
            <strong>City Alive</strong>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-action text-action" type="button" onClick={onToggleDrums} aria-label={drumsOn ? "Turn drum ambience off" : "Turn drum ambience on"}>
            {drumsOn ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
            <span>{drumsOn ? "Drums on" : "Drums off"}</span>
          </button>
          <button className="icon-action cart-action" type="button" onClick={onCart} aria-label={`Open bag with ${cartCount} items`}>
            <ShoppingBag aria-hidden="true" size={20} />
            <span>{cartCount}</span>
          </button>
          <button className="icon-action menu-action" type="button" onClick={onMenu} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
            {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </header>
    </>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map(([label, href]) => (
        <a key={label} href={href} onClick={onClose}>{label}</a>
      ))}
    </nav>
  );
}

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 100 100" role="img" aria-label="Pan-African red black and green symbol">
      <path d="M20 56a30 30 0 0 1 60 0" fill="none" stroke="#B3241C" strokeWidth="9" strokeLinecap="round" />
      <path d="M29 56a21 21 0 0 1 42 0" fill="none" stroke="#151515" strokeWidth="9" strokeLinecap="round" />
      <path d="M38 56a12 12 0 0 1 24 0" fill="none" stroke="#1E6A45" strokeWidth="9" strokeLinecap="round" />
      <path d="M50 56v25" stroke="#201A18" strokeWidth="8" strokeLinecap="round" />
      <circle cx="50" cy="53" r="10" fill="#F6ECD8" stroke="#201A18" strokeWidth="6" />
      <path d="M50 10c7 12 14 20 25 25-11 5-18 13-25 25-7-12-14-20-25-25 11-5 18-13 25-25z" fill="#D7A332" opacity=".18" />
    </svg>
  );
}

function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-welcome">Welcome to</p>
        <h1>Pan African City Alive</h1>
        <p className="hero-tagline">Culture. Community. Commerce.</p>
        <p className="hero-text">
          A Black-owned African cultural retail store and community gathering place in East Palo Alto, led by Keisha Evans and rooted in authentic goods, story, and connection.
        </p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={onShop}>
            <ShoppingBag aria-hidden="true" size={19} />
            Shop the store
          </button>
          <a className="button secondary" href="#story">
            <User aria-hidden="true" size={19} />
            Meet Keisha
          </a>
        </div>
        <div className="fact-row" aria-label="Store facts">
          <span><CalendarDays aria-hidden="true" size={18} /> Founded 1993</span>
          <span><User aria-hidden="true" size={18} /> Keisha Evans</span>
          <span><MapPin aria-hidden="true" size={18} /> 1848 Bay Road</span>
        </div>
      </div>
      <div className="hero-media">
        <img src={image("hero-mask-closeup.png")} alt="Colorful African mask centerpiece inside a bright cultural store" />
        <div className="launch-panel">
          <strong>Storefront Build</strong>
          <span>Full shopping flow, event RSVP, founder story, gallery, visit path, and launch-ready SEO foundation.</span>
          <small>Live commerce data is marked where it still needs confirmation.</small>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story-section" id="story">
      <div className="story-photo">
        <img src={image("keisha-public-portrait.jpg")} alt="Keisha Evans smiling inside Pan African City Alive" />
      </div>
      <div className="story-copy">
        <p className="section-kicker">Our story. Our legacy. Our future.</p>
        <h2>Keisha Evans keeps the room alive.</h2>
        <p>
          Pan African City Alive has been part of the Bay Area cultural retail landscape since 1993. The strongest public profile shows Keisha Evans as the current owner/operator, with the shop centered on authentic African goods, cultural education, and storytelling.
        </p>
        <p>
          This finished build turns that identity into a digital store: dense with color and objects, but organized with clear categories, product stories, events, and an easy path to visit or request pickup.
        </p>
        <a className="button outline" href="#visit">
          Plan your visit
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
      <div className="value-strip" aria-label="Brand values">
        <article>
          <BookOpen aria-hidden="true" />
          <strong>Heritage</strong>
          <span>Rooted in African traditions and ancestral wisdom.</span>
        </article>
        <article>
          <Heart aria-hidden="true" />
          <strong>Community</strong>
          <span>A gathering place for learning and healing.</span>
        </article>
        <article>
          <Sparkles aria-hidden="true" />
          <strong>Empowerment</strong>
          <span>Supporting Black business and creative expression.</span>
        </article>
        <article>
          <PackageOpen aria-hidden="true" />
          <strong>Legacy</strong>
          <span>Building a lasting impact for future generations.</span>
        </article>
      </div>
    </section>
  );
}

function Collections({ activeCategory, onSelect }: { activeCategory: CategoryFilter; onSelect: (category: CategoryFilter) => void }) {
  return (
    <section className="collections-section" aria-label="Shop collections">
      <div className="section-head inline">
        <div>
          <p className="section-kicker">Shop our collections</p>
          <h2>Browse the store by room, shelf, and story.</h2>
        </div>
        <a href="#shop">View all products <ArrowRight aria-hidden="true" size={18} /></a>
      </div>
      <div className="collection-rail">
        {collections.map((collection) => (
          <button
            key={collection.title}
            className={`collection-card ${activeCategory === collection.title ? "is-active" : ""}`}
            type="button"
            onClick={() => onSelect(collection.title)}
          >
            <img src={collection.image} alt="" />
            <span>{collection.title}</span>
            <small>{collection.description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function Shop({
  activeCategory,
  products,
  searchTerm,
  onAdd,
  onCategory,
  onSearch,
  onSelect
}: {
  activeCategory: CategoryFilter;
  products: Product[];
  searchTerm: string;
  onAdd: (product: Product) => void;
  onCategory: (category: CategoryFilter) => void;
  onSearch: (value: string) => void;
  onSelect: (product: Product) => void;
}) {
  return (
    <section className="shop-section" id="shop">
      <div className="section-head">
        <p className="section-kicker">The store</p>
        <h2>Fully shoppable draft, ready for final inventory.</h2>
        <p>Products, prices, and checkout behavior are working in this build. Items marked sample should be replaced with verified inventory before accepting payment.</p>
      </div>
      <div className="shop-controls">
        <label className="search-box">
          <Search aria-hidden="true" size={18} />
          <input value={searchTerm} onChange={(event) => onSearch(event.target.value)} placeholder="Search masks, oils, books..." />
        </label>
        <div className="filter-row" aria-label="Product filters">
          <Filter aria-hidden="true" size={18} />
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "is-active" : ""}
              type="button"
              onClick={() => onCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <button className="product-image" type="button" onClick={() => onSelect(product)}>
              <img src={product.image} alt={product.name} />
              <span>{product.badge}</span>
            </button>
            <div className="product-info">
              <small>{product.category}</small>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-footer">
                <strong>{formatCurrency(product.price)}</strong>
                <button className="button mini" type="button" onClick={() => onAdd(product)}>
                  <ShoppingBag aria-hidden="true" size={16} />
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Events({ onRsvp }: { onRsvp: (program: Program) => void }) {
  return (
    <section className="events-section" id="events">
      <div className="section-head inline">
        <div>
          <p className="section-kicker">Events & community experiences</p>
          <h2>Programming that turns retail into gathering.</h2>
        </div>
        <p>Public 2026 listings show a relaunch and cultural programming direction. These modules are ready for the next confirmed dates.</p>
      </div>
      <div className="events-grid">
        {programs.map((program) => (
          <article className="event-card" key={program.id}>
            <img src={program.image} alt="" />
            <div>
              <span>{program.dateLabel}</span>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <small>{program.timeLabel} · {program.location}</small>
              <button className="button event-button" type="button" onClick={() => onRsvp(program)}>
                <CalendarDays aria-hidden="true" size={17} />
                Request a seat
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const gallery = [
    [image("hero-store-mask.png"), "The bright shop direction with mask centerpiece and kente side rails"],
    [image("shop-gallery-back-wall.png"), "Gallery wall for masks, shelves, books, oils, and story cards"],
    [image("keisha-wall-panel-crop.jpg"), "Founder story wall showing Keisha Evans and the origin narrative"],
    [image("real-store-room.jpg"), "Supplied real store interior showing current object density"],
    [image("shop-shelf-oils.png"), "Warm retail shelf with oils, baskets, and mask detail"],
    [image("product-jewelry.jpg"), "Jewelry and beadwork category image"]
  ] as const;

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-head">
        <p className="section-kicker">Art gallery</p>
        <h2>The visual system is built from the room.</h2>
        <p>Every image is either supplied, public-source supported, or generated/derived for this finished storefront direction.</p>
      </div>
      <div className="gallery-grid">
        {gallery.map(([src, alt], index) => (
          <img key={src} className={index === 0 ? "wide" : ""} src={src} alt={alt} />
        ))}
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="visit-section" id="visit">
      <div className="visit-copy">
        <p className="section-kicker">Come visit us</p>
        <h2>Experience the culture in person.</h2>
        <p>Current public materials point to 1848 Bay Road in East Palo Alto as the clearest current location. Current hours should be confirmed by phone before visiting.</p>
      </div>
      <div className="visit-card">
        <a href="https://www.google.com/maps/search/?api=1&query=1848%20Bay%20Road%2C%20East%20Palo%20Alto%2C%20CA%2094303" target="_blank" rel="noreferrer">
          <MapPin aria-hidden="true" />
          1848 Bay Road, East Palo Alto, CA 94303
        </a>
        <a href="tel:+16506305274">
          <Phone aria-hidden="true" />
          (650) 630-5274
        </a>
        <a href="mailto:panafricancity@gmail.com">
          <Mail aria-hidden="true" />
          panafricancity@gmail.com
        </a>
        <a href="https://www.panafricancityalive.com/" target="_blank" rel="noreferrer">
          <ExternalLink aria-hidden="true" />
          Official website
        </a>
      </div>
      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <h3>Ask about a visit, event, or item</h3>
        <label>
          Name
          <input required placeholder="Your name" />
        </label>
        <label>
          Email
          <input required type="email" placeholder="you@example.com" />
        </label>
        <label>
          Message
          <textarea rows={4} placeholder="Tell Keisha what you are looking for..." />
        </label>
        <button className="button primary" type="submit">
          <Send aria-hidden="true" size={17} />
          Draft inquiry
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <LogoMark />
        <div>
          <strong>Pan African City Alive</strong>
          <span>Culture is our foundation. Community is our purpose. Legacy is our promise.</span>
        </div>
      </div>
      <div className="footer-links">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </div>
      <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="newsletter-email">Stay connected</label>
        <div>
          <input id="newsletter-email" type="email" placeholder="Email address" />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </footer>
  );
}

function ProductModal({ product, onAdd, onClose }: { product: Product; onAdd: (product: Product) => void; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <article className="product-modal" role="dialog" aria-modal="true" aria-label={product.name}>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close product details">
          <X aria-hidden="true" />
        </button>
        <img src={product.image} alt={product.name} />
        <div>
          <small>{product.category} · {product.badge}</small>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.detail}</p>
          <strong>{formatCurrency(product.price)}</strong>
          <button className="button primary" type="button" onClick={() => onAdd(product)}>
            <ShoppingBag aria-hidden="true" size={18} />
            Add to bag
          </button>
        </div>
      </article>
    </div>
  );
}

function CartDrawer({
  checkoutDone,
  items,
  total,
  onCheckout,
  onClose,
  onQuantity
}: {
  checkoutDone: boolean;
  items: { product: Product; quantity: number }[];
  total: number;
  onCheckout: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onQuantity: (productId: string, quantity: number) => void;
}) {
  return (
    <aside className="cart-drawer" aria-label="Shopping bag">
      <div className="drawer-head">
        <div>
          <span>Preview bag</span>
          <h2>Your order</h2>
        </div>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close bag">
          <X aria-hidden="true" />
        </button>
      </div>
      {items.length ? (
        <>
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                  <div className="quantity-row">
                    <button type="button" onClick={() => onQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name}`}>
                      <Minus aria-hidden="true" size={14} />
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => onQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name}`}>
                      <Plus aria-hidden="true" size={14} />
                    </button>
                    <button type="button" onClick={() => onQuantity(product.id, 0)} aria-label={`Remove ${product.name}`}>
                      <Trash2 aria-hidden="true" size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cart-total">
            <span>Estimated sample total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <form className="checkout-form" onSubmit={onCheckout}>
            <h3>Request pickup / invoice</h3>
            <label>
              Name
              <input required placeholder="Your name" />
            </label>
            <label>
              Email
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              Pickup date
              <input type="date" />
            </label>
            <label>
              Notes
              <textarea rows={3} placeholder="Ask about sizes, origin, availability..." />
            </label>
            <button className="button primary" type="submit">
              <CreditCard aria-hidden="true" size={18} />
              Submit request
            </button>
            {checkoutDone && (
              <p className="success-message">
                <Check aria-hidden="true" size={18} />
                Request drafted. In the live site this can connect to email, Shopify, Square, or a custom checkout.
              </p>
            )}
          </form>
        </>
      ) : (
        <div className="empty-state">
          <ShoppingBag aria-hidden="true" size={44} />
          <h3>Your bag is ready.</h3>
          <p>Add a product from the store to test the shopping flow.</p>
        </div>
      )}
    </aside>
  );
}

function RsvpModal({ done, program, onClose, onSubmit }: { done: boolean; program: Program; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <article className="rsvp-modal" role="dialog" aria-modal="true" aria-label={`Request a seat for ${program.title}`}>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close RSVP">
          <X aria-hidden="true" />
        </button>
        <img src={program.image} alt="" />
        <form onSubmit={onSubmit}>
          <small>{program.dateLabel} · {program.timeLabel}</small>
          <h2>{program.title}</h2>
          <p>{program.description}</p>
          <label>
            Name
            <input required placeholder="Your name" />
          </label>
          <label>
            Email
            <input required type="email" placeholder="you@example.com" />
          </label>
          <label>
            Guests
            <input min="1" type="number" defaultValue="1" />
          </label>
          <button className="button primary" type="submit">
            <CalendarDays aria-hidden="true" size={18} />
            Request RSVP
          </button>
          {done && (
            <p className="success-message">
              <Check aria-hidden="true" size={18} />
              RSVP request drafted. Final dates still need confirmation before this becomes a live booking.
            </p>
          )}
        </form>
      </article>
    </div>
  );
}

export default App;
