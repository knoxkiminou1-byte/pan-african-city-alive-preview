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
const clientImage = (name: string) => `/images/client/${name}`;
const drumAudioPath = "/audio/village-drums-of-freedom.ogg";

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
    image: clientImage("real-bronze-figure.jpg"),
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
    image: clientImage("real-textile-shelf.jpg"),
    price: 92,
    badge: "Sample price",
    description: "A warm textile bundle for home, display, fashion styling, and gifting.",
    detail: "Quantity, dimensions, and material notes are intentionally left editable."
  },
  {
    id: "garment-rail-edit",
    name: "Garment Rail Edit",
    category: "Garments",
    image: clientImage("real-hood-model.jpg"),
    price: 74,
    badge: "Sample price",
    description: "A colorful apparel rail concept for garments, wraps, and wearable culture.",
    detail: "Built so the final store can add size, color, and pickup options."
  },
  {
    id: "beaded-necklace-set",
    name: "Beaded Necklace Set",
    category: "Jewelry",
    image: clientImage("real-jewelry-case.jpg"),
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
    image: clientImage("real-books-shelf.jpg"),
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
    image: clientImage("real-mask-wall-wide.jpg"),
    price: 150,
    badge: "Inquiry item",
    description: "A service-style listing for curating a home or office wall with cultural objects.",
    detail: "This keeps higher-touch purchases in inquiry mode instead of forcing instant checkout."
  },
  {
    id: "heritage-gift-bundle",
    name: "Heritage Gift Bundle",
    category: "Gifts",
    image: clientImage("real-doll-basket.jpg"),
    price: 58,
    badge: "Sample price",
    description: "A curated gift path for baskets, small art objects, jewelry, books, and oils.",
    detail: "Final bundles can be assembled seasonally for holidays, Kwanzaa, and local events."
  }
];

const collections: Collection[] = [
  {
    title: "Art & Masks",
    image: clientImage("real-front-mask-sign.jpg"),
    description: "Masks, gallery walls, object stories, and collector pieces."
  },
  {
    title: "Carvings",
    image: clientImage("real-bronze-figure.jpg"),
    description: "Wood figures, tabletop art, ritual objects, and home display."
  },
  {
    title: "Textiles",
    image: image("product-kente-fabric.jpg"),
    description: "Kente cloth, mudcloth, folded fabric, and textile storytelling."
  },
  {
    title: "Garments",
    image: clientImage("real-hood-model.jpg"),
    description: "Wearable culture, wraps, shirts, dresses, and statement apparel."
  },
  {
    title: "Jewelry",
    image: clientImage("real-jewelry-case.jpg"),
    description: "Beads, bracelets, necklaces, earrings, and counter treasures."
  },
  {
    title: "Body Care",
    image: image("product-shea-butter.jpg"),
    description: "Shea butter, black soap, oils, and daily care rituals."
  },
  {
    title: "Books & Oils",
    image: clientImage("real-books-shelf.jpg"),
    description: "Books, resources, incense, fragrance, and learning goods."
  },
  {
    title: "Gifts",
    image: clientImage("real-doll-basket.jpg"),
    description: "Curated bundles and small objects for meaningful giving."
  }
];

const programs: Program[] = [
  {
    id: "legacy",
    title: "Open House & Legacy Relaunch",
    image: image("event-open-house-generated.jpg"),
    dateLabel: "Next date to confirm",
    timeLabel: "Program format ready",
    location: "1848 Bay Road, East Palo Alto",
    description: "A community welcome, founder-story wall, shop tour, and retail relaunch moment."
  },
  {
    id: "drumming",
    title: "African Drumming & Dance",
    image: image("event-drumming-generated.jpg"),
    dateLabel: "Workshop lane",
    timeLabel: "Dates to confirm",
    location: "Gallery / performance area",
    description: "A low-barrier cultural program that turns the store into an active gathering space."
  },
  {
    id: "storytelling",
    title: "African Storytelling Evening",
    image: image("event-storytelling-generated.jpg"),
    dateLabel: "Story circle",
    timeLabel: "Dates to confirm",
    location: "Founder wall and gallery",
    description: "Founder-led and guest-led stories around objects, origin, memory, and belonging."
  },
  {
    id: "jewelry",
    title: "Jewelry Making Workshop",
    image: image("event-jewelry-generated.jpg"),
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current ?? new Audio(drumAudioPath);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.34;

    if (!enabled) {
      audio.pause();
      return;
    }

    void audio.play().catch(() => {
      audio.pause();
    });

    return () => {
      audio.pause();
    };
  }, [enabled]);
}

function App() {
  const [introVisible, setIntroVisible] = useState(false);
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
      <img className="intro-image" src="/images/generated-mask-store.png" alt="Colorful Pan African City Alive store interior" />
      <div className="intro-scrim" aria-hidden="true" />
      <button className="mask-opener" type="button" aria-label="Click the mask to open the Pan African City Alive preview" onClick={onOpen}>
        <span className="intro-mask-wrap" aria-hidden="true">
          <img className="intro-mask-cutout" src={image("hero-cream-mask-cutout.png")} alt="" />
          <svg className="mask-lips" viewBox="0 0 240 82" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lipFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ff5b42" />
                <stop offset="0.5" stopColor="#bf1f2a" />
                <stop offset="1" stopColor="#5a1725" />
              </linearGradient>
              <linearGradient id="lipGold" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#f5cc5b" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#ffe88a" stopOpacity="0.78" />
                <stop offset="1" stopColor="#f5cc5b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path className="lip-shadow" d="M10 42C45 10 84 11 120 33C156 11 197 10 230 42C194 48 155 48 120 43C84 48 46 48 10 42Z" />
            <ellipse className="lip-mouth-open" cx="120" cy="48" rx="92" ry="15" />
            <path className="lip-upper" d="M8 40C45 7 84 10 120 32C156 10 198 7 232 40C198 47 158 48 120 42C82 48 45 47 8 40Z" />
            <path className="lip-lower" d="M12 43C50 66 88 73 120 58C152 73 191 66 228 43C192 83 49 83 12 43Z" />
            <path className="lip-center" d="M17 42C58 34 94 35 120 43C146 35 181 34 223 42" />
            <path className="lip-gold-line" d="M38 31C68 22 96 25 120 37C144 25 174 22 204 31" />
            <ellipse className="lip-highlight left" cx="75" cy="31" rx="28" ry="5" />
            <ellipse className="lip-highlight right" cx="166" cy="31" rx="28" ry="5" />
          </svg>
        </span>
      </button>
      <div className="intro-panel">
        <LogoMark />
        <strong>Hey Mama Keisha, this is a preview.</strong>
        <p>This is a preview of how Pan African City Alive can feel online: colorful, welcoming, shoppable, and rooted in your story. Products, prices, and dates are sample content until you choose the final details.</p>
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
    <svg className="logo-mark" viewBox="0 0 100 100" role="img" aria-label="Pan-African flag symbol with Africa silhouette">
      <circle cx="50" cy="50" r="44" fill="#FFF7E9" stroke="#201A18" strokeWidth="4" />
      <path d="M18 37h64" stroke="#B3241C" strokeWidth="12" strokeLinecap="round" />
      <path d="M18 50h64" stroke="#151515" strokeWidth="12" strokeLinecap="round" />
      <path d="M18 63h64" stroke="#1E6A45" strokeWidth="12" strokeLinecap="round" />
      <path
        className="logo-africa"
        d="M52 13c-8 2-15 7-18 15-3 7 1 12-3 18-3 4-9 6-9 12 0 6 7 8 12 10 6 3 5 10 11 14 5 4 12 1 13-5 2-8-2-12 5-20 5-6 13-7 15-14 3-9-6-11-10-17-5-8-7-15-16-13z"
        fill="#151515"
        stroke="#D7A332"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#FFF7E9" strokeWidth="3" opacity=".92" />
      <path d="M18 78c18 10 46 10 64 0" fill="none" stroke="#B3241C" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-welcome">Welcome to</p>
        <h1>
          <span>Pan African</span>
          <span>City Alive</span>
        </h1>
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
        <div className="hero-mask-stage">
          <img src={image("hero-client-mask-curated.png")} alt="African mask from Pan African City Alive displayed inside a bright cultural store" />
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story-section" id="story">
      <div className="story-photo">
        <img src={image("mama-keisha-preview.jpg")} alt="Mama Keisha smiling inside a warm Pan African City Alive preview store setting" />
      </div>
      <div className="story-copy">
        <p className="section-kicker">Our story. Our legacy. Our future.</p>
        <h2>Keisha Evans keeps the room alive.</h2>
        <p>
          Pan African City Alive has been part of the Bay Area cultural retail landscape since 1993. The strongest public profile shows Keisha Evans as the current owner/operator, with the shop centered on authentic African goods, cultural education, and storytelling.
        </p>
        <p>
          This preview turns that identity into a digital store: dense with color and objects, but organized with clear categories, product stories, events, and an easy path to visit or request pickup.
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
        <h2>Fully shoppable preview, ready for final inventory.</h2>
        <p>Products, prices, and checkout behavior work in this preview. Items marked sample should be replaced with verified inventory before accepting payment.</p>
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
    [image("mama-keisha-preview.jpg"), "Mama Keisha preview portrait for the founder story"],
    [clientImage("real-keisha-wall.jpg"), "Supplied founder wall photo for Keisha Evans"],
    [clientImage("real-mask-wall-wide.jpg"), "Supplied mask wall photo showing current object density"],
    [clientImage("real-front-mask-sign.jpg"), "Supplied front display photo with Pan African City Alive store information"],
    [clientImage("real-jewelry-case.jpg"), "Supplied jewelry case photo for the shop preview"],
    [clientImage("real-beaded-mask.jpg"), "Supplied beaded mask and textile display"],
    [image("event-drumming-generated.jpg"), "Generated drumming event preview image"],
    [image("event-storytelling-generated.jpg"), "Generated storytelling event preview image"],
    [clientImage("real-bronze-leopards.jpg"), "Supplied bronze leopard sculptures"],
    [clientImage("real-egyptian-panel.jpg"), "Supplied Egyptian art panel"],
    [clientImage("real-doll-basket.jpg"), "Supplied basket of handmade dolls"],
    [image("shop-shelf-oils.png"), "Warm retail shelf with oils, baskets, and mask detail"],
    [clientImage("real-cream-mask.jpg"), "Supplied cream mask closeup"]
  ] as const;

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-head">
        <p className="section-kicker">Art gallery</p>
        <h2>The visual system is built from the room.</h2>
        <p>Every image is either supplied, public-source supported, or generated/derived for this preview storefront direction.</p>
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
          Send inquiry
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
        <small>Drum ambience: "Village Drums of Freedom - Black Africa (djembe mix)" by Gerald Achee, CC BY-SA 3.0, via Wikimedia Commons.</small>
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
                Preview request saved here so you can see how pickup and invoice requests would feel.
              </p>
            )}
          </form>
        </>
      ) : (
        <div className="empty-state">
          <ShoppingBag aria-hidden="true" size={44} />
          <h3>Your bag is ready.</h3>
          <p>Add a product from the store to preview the shopping flow.</p>
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
              Preview RSVP saved. Final dates still need confirmation before this becomes a live booking.
            </p>
          )}
        </form>
      </article>
    </div>
  );
}

export default App;
