import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Gem,
  Heart,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Music2,
  PackageOpen,
  Palette,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  X
} from "lucide-react";
import { useMemo, useState } from "react";

type ProductKind = "mask" | "textile" | "jewelry" | "body" | "book" | "carving" | "oil" | "basket";
type PreviewMode = "interactive" | "picture";

interface Product {
  id: string;
  name: string;
  category: string;
  kind: ProductKind;
  note: string;
  origin: string;
  palette: string[];
}

interface EventItem {
  title: string;
  date: string;
  venue: string;
  note: string;
  icon: "calendar" | "music" | "book" | "gem";
}

const products: Product[] = [
  {
    id: "mask-wall",
    name: "Gallery mask wall",
    category: "Art",
    kind: "mask",
    note: "A hero wall concept for carved masks, story cards, and object-origin labels.",
    origin: "Preview display",
    palette: ["#d7a332", "#b3241c", "#1e6a45", "#2b6fb0"]
  },
  {
    id: "mudcloth-kente",
    name: "Kente and mudcloth folds",
    category: "Textiles",
    kind: "textile",
    note: "Bold fabric rails inspired by the side-panel treatment from the Andreas reference.",
    origin: "Preview shop",
    palette: ["#f6ecd8", "#151515", "#b3241c", "#d7a332"]
  },
  {
    id: "beadwork",
    name: "Beaded jewelry tray",
    category: "Jewelry",
    kind: "jewelry",
    note: "Layered color, easy browsing, and small gift discovery for the front counter.",
    origin: "Preview shop",
    palette: ["#1e6a45", "#e66d2f", "#2b6fb0", "#d7a332"]
  },
  {
    id: "shea-black-soap",
    name: "Shea butter and black soap",
    category: "Body",
    kind: "body",
    note: "A cleaner wellness shelf for shea butter, black soap, oils, and care items.",
    origin: "Preview shop",
    palette: ["#f6ecd8", "#8b5a2b", "#151515", "#d7a332"]
  },
  {
    id: "culture-books",
    name: "Books and cultural resources",
    category: "Books",
    kind: "book",
    note: "A small resource stack to connect retail with education and storytelling.",
    origin: "Preview shop",
    palette: ["#5a202c", "#1e6a45", "#d7a332", "#f6ecd8"]
  },
  {
    id: "carving-table",
    name: "Carvings and tabletop art",
    category: "Art",
    kind: "carving",
    note: "A tactile center table for wood, bronze-style objects, dolls, and home goods.",
    origin: "Preview shop",
    palette: ["#8b4a2f", "#d7a332", "#151515", "#f6ecd8"]
  },
  {
    id: "oil-bar",
    name: "Oil and incense bar",
    category: "Body",
    kind: "oil",
    note: "Warm scent, clear labels, and a discovery bar near checkout.",
    origin: "Preview shop",
    palette: ["#c89b3c", "#1e6a45", "#b3241c", "#f6ecd8"]
  },
  {
    id: "basket-craft",
    name: "Basket and gift stack",
    category: "Gifts",
    kind: "basket",
    note: "A giftable stack for baskets, small home pieces, and curated bundles.",
    origin: "Preview shop",
    palette: ["#d9c4a1", "#a64b2a", "#5f6b45", "#151515"]
  }
];

const categories = ["All", "Art", "Textiles", "Jewelry", "Body", "Books", "Gifts"];

const events: EventItem[] = [
  {
    title: "Open House Celebration and Legacy Relaunch",
    date: "Saturday, May 2, 2026",
    venue: "Renaissance Entrepreneurship Center",
    note: "A relaunch-style community welcome moment for the current East Palo Alto chapter.",
    icon: "calendar"
  },
  {
    title: "Live African Drumming and Dance",
    date: "Wednesday, March 25, 2026",
    venue: "Pan African City Alive Performance Space",
    note: "A performance-space signal that the store can be more than a shop.",
    icon: "music"
  },
  {
    title: "African Storytelling Evening",
    date: "Wednesday, March 25, 2026",
    venue: "Pan African City Alive Gallery",
    note: "Founder-story energy translated into a repeatable community event lane.",
    icon: "book"
  },
  {
    title: "African Jewelry Making Workshop",
    date: "Wednesday, March 25, 2026",
    venue: "Pan African City Alive Workshop Room",
    note: "Hands-on workshop programming that can turn visitors into participants.",
    icon: "gem"
  }
];

const languageCards = [
  "Welcome home to the colors, textures, tools, and stories that keep culture alive.",
  "For 33 years, Pan African City Alive has been more than a store. It is a room where objects speak.",
  "Every mask, oil, book, cloth, carving, and bracelet deserves a label that tells people where to begin.",
  "This preview keeps the richness, clears the path, and lets Keisha's founder story lead."
];

const routeSteps = [
  "Arrival",
  "Founder Story",
  "Feature Table",
  "Textiles",
  "Jewelry",
  "Home Goods",
  "Checkout",
  "Workshop"
];

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introOpening, setIntroOpening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [bagCount, setBagCount] = useState(0);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("interactive");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  function openIntro() {
    if (introOpening) return;
    setIntroOpening(true);
    window.setTimeout(() => setIntroVisible(false), 1280);
  }

  return (
    <div className="app-shell">
      {introVisible && <IntroOverlay isOpening={introOpening} onOpen={openIntro} />}
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        bagCount={bagCount}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
      />

      <main>
        {previewMode === "interactive" ? (
          <>
        <section className="hero-section section-pad" id="top">
          <div className="preview-ribbon enter-copy">
            <Sparkles aria-hidden="true" size={18} />
            <span>
              Hey assistant user, this is a preview just showing you what it could look like. The shop
              and booking actions are mock interactions for concept review.
            </span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="section-label">Preview concept for Keisha Evans</p>
              <h1>Pan African City Alive</h1>
              <p className="hero-lede">
                A brighter, richer digital home for the East Palo Alto cultural store: founder story,
                authentic goods, gallery energy, workshops, and a preview shop that feels alive before
                checkout ever turns on.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#shop-preview">
                  <ShoppingBag aria-hidden="true" size={20} />
                  Explore preview shop
                </a>
                <a className="button secondary" href="#story">
                  <BookOpen aria-hidden="true" size={20} />
                  Read the story
                </a>
              </div>
            </div>

            <div className="hero-stage" aria-label="3D preview of Pan African City Alive store concept">
              <div className="stage-card storefront-card">
                <img src="/images/paca-storefront-reference.png" alt="Pan African City Alive storefront reference from the supplied research brief" />
              </div>
              <div className="stage-card mask-card">
                <MaskSculpture open={false} label="Pan-African preview mask" />
              </div>
              <div className="stage-card tag-card">
                <span>Founded</span>
                <strong>1993</strong>
                <small>East Palo Alto cultural retail hybrid</small>
              </div>
            </div>
          </div>
        </section>

        <MetricStrip />

        <section className="story-section section-pad" id="story">
          <div className="story-media">
            <img src="/images/paca-storefront-reference.png" alt="Storefront reference for Pan African City Alive from the research brief" />
            <div className="photo-note">
              <ShieldCheck aria-hidden="true" size={18} />
              Brief-derived storefront reference
            </div>
          </div>
          <div className="story-copy">
            <p className="section-label">Founder-led retail</p>
            <h2>Keep the cultural richness. Make the path unmistakable.</h2>
            <p>
              The research profile frames Pan African City Alive as a long-running Black-owned
              African cultural retail business led by Keisha Evans. The best site strategy is not to
              flatten the store into generic luxury. It is to sharpen what is already there:
              heritage color, product density, founder storytelling, clear category signs, event
              rhythm, and a real community invitation.
            </p>
            <div className="story-list">
              <span>Masks</span>
              <span>Carvings</span>
              <span>Fabrics</span>
              <span>Garments</span>
              <span>Jewelry</span>
              <span>Shea butter</span>
              <span>Black soap</span>
              <span>Books</span>
              <span>Oils</span>
            </div>
          </div>
        </section>

        <LanguageWall />

        <section className="journey-section section-pad" id="build-plan">
          <div className="section-heading">
            <p className="section-label">Community-boutique hybrid</p>
            <h2>A site journey that mirrors the store journey.</h2>
          </div>
          <div className="route-map" aria-label="Retail journey map">
            {routeSteps.map((step, index) => (
              <div className="route-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className="layout-panels">
            <article>
              <Store aria-hidden="true" size={30} />
              <h3>Arrival first</h3>
              <p>Open with the storefront, the mask, the address, and the preview notice immediately.</p>
            </article>
            <article>
              <Palette aria-hidden="true" size={30} />
              <h3>Color with control</h3>
              <p>Oxblood, gold, green, red, cobalt, terracotta, raffia, and cream, with no black-dominant backdrop.</p>
            </article>
            <article>
              <LayoutGrid aria-hidden="true" size={30} />
              <h3>Density that scans</h3>
              <p>Shop categories are full and tactile, but every shelf has a label, rhythm, and reason.</p>
            </article>
          </div>
        </section>

        <ShopPreview
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onAdd={() => setBagCount((count) => count + 1)}
        />

        <section className="artifact-section section-pad" id="artifacts">
          <div className="section-heading split">
            <div>
              <p className="section-label">Custom visual system</p>
              <h2>3D details without hiding the goods.</h2>
            </div>
            <p>
              The mask, product cards, and pattern rails are custom project assets. They are built
              into the site so the preview works as a zip, not as a set of fragile external links.
            </p>
          </div>
          <div className="artifact-grid">
            <div className="artifact-mask">
              <MaskSculpture open label="Open mouth mask detail" />
            </div>
            <div className="artifact-copy">
              <h3>Click-to-open entrance</h3>
              <p>
                The first screen tells the viewer it is a preview, asks them to click, then the
                mask mouth opens and the page reveals. It keeps the exact ritual you asked for,
                but stays bright, colorful, and premium.
              </p>
              <a className="button tertiary" href="#top">
                <ArrowRight aria-hidden="true" size={20} />
                Replay by refreshing
              </a>
            </div>
          </div>
        </section>

        <EventsSection />

        <section className="peer-section section-pad" id="benchmarks">
          <div className="section-heading">
            <p className="section-label">Best-site lessons folded in</p>
            <h2>Built from cultural retail patterns that already work.</h2>
          </div>
          <div className="benchmark-grid">
            <BenchmarkCard title="Pan-African Connection" text="Mission, events, gallery retail, and a store that feels like a cultural room." />
            <BenchmarkCard title="Marcus Books and Hakim's" text="Legacy, founder memory, direct signage, and public trust across generations." />
            <BenchmarkCard title="Nubian Hueman" text="Curated marketplace logic, emerging brands, and product discovery with cultural point of view." />
            <BenchmarkCard title="BLK MKT Vintage" text="Object density, archival wall moments, and retail as storytelling instead of simple inventory." />
          </div>
        </section>

        <VisitSection />
          </>
        ) : (
          <PictureOptionPage onAdd={() => setBagCount((count) => count + 1)} />
        )}
      </main>

      <Footer />
    </div>
  );
}

function PictureOptionPage({ onAdd }: { onAdd: () => void }) {
  const [mouthOpen, setMouthOpen] = useState(false);

  return (
    <>
      <section className="picture-hero" id="top">
        <img
          className="picture-hero-bg"
          src="/images/generated-mask-store.png"
          alt="Generated Pan African City Alive store interior with colorful mask"
        />
        <div className="picture-hero-panel">
          <p className="section-label">Option 2: picture-led preview</p>
          <h1>Pan African City Alive</h1>
          <p>
            This version keeps the same SEO and structure, but leads with the generated preview
            pictures, the real Keisha founder wall, and a more photographic store experience.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#picture-board">
              <PackageOpen aria-hidden="true" size={20} />
              View preview board
            </a>
            <a className="button secondary" href="#shop-preview">
              <ShoppingBag aria-hidden="true" size={20} />
              View picture shop
            </a>
          </div>
        </div>
        <div className="picture-preview-note">
          <strong>Assistant user:</strong>
          <span>This is still a preview concept only. The store is not live.</span>
        </div>
      </section>

      <MetricStrip />

      <section className="picture-board-section section-pad" id="picture-board">
        <div className="section-heading split">
          <div>
            <p className="section-label">Generated full-page direction</p>
            <h2>The preview picture becomes option two.</h2>
          </div>
          <p>
            This board is preserved as an image-led option so the client can compare the current
            coded interpretation against the more literal generated composition.
          </p>
        </div>
        <figure className="picture-board-frame">
          <img src="/images/generated-preview-board.png" alt="Generated full page preview concept for Pan African City Alive" />
        </figure>
      </section>

      <section className="picture-founder-section section-pad" id="story">
        <div className="picture-founder-copy">
          <p className="section-label">Real founder material added</p>
          <h2>Keisha's wall should lead the story.</h2>
          <p>
            The supplied founder-wall photo gives the site an authentic narrative anchor: Keisha
            Evans, the September 1993 origin, the learning curve, the perseverance, and the shop as
            a place that helps people feel at home while learning where culture comes from.
          </p>
          <div className="story-list">
            <span>Keisha Evans</span>
            <span>Since September 1993</span>
            <span>Founder story</span>
            <span>Education through objects</span>
          </div>
        </div>
        <div className="picture-photo-stack">
          <img src="/images/keisha-founder-wall.jpeg" alt="Meet Keisha Evans founder wall photo" />
          <img src="/images/paca-interior-real.jpeg" alt="Real Pan African City Alive store interior photo" />
        </div>
      </section>

      <section className="picture-entrance-lab section-pad" id="artifacts">
        <div className="section-heading split">
          <div>
            <p className="section-label">Entrance animation concept</p>
            <h2>Closed mouth first. Open mouth after the click.</h2>
          </div>
          <p>
            This simulates the generated mask with a closed-mouth overlay. Click the image and the
            lips open away to reveal the original open-mouth picture.
          </p>
        </div>
        <button
          className={`photo-mask-demo ${mouthOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setMouthOpen(true)}
          aria-label="Click the mask to open the animated mouth preview"
        >
          <img src="/images/generated-mask-store.png" alt="Generated mask scene with animated closed mouth overlay" />
          <span className="demo-mouth-cover" aria-hidden="true" />
          <span className="demo-command">Click the mask to open</span>
        </button>
      </section>

      <section className="picture-shop-section section-pad" id="shop-preview">
        <div className="section-heading split">
          <div>
            <p className="section-label">Picture shop section</p>
            <h2>Use the generated product collage as the shop mood.</h2>
          </div>
          <p>
            This is still a false shop. The imagery establishes the visual standard for masks,
            carvings, kente, garments, jewelry, shea butter, black soap, books, oils, and incense.
          </p>
        </div>
        <div className="picture-shop-grid">
          <figure>
            <img src="/images/generated-product-collage.png" alt="Generated product collage with masks, textiles, jewelry, shea butter, black soap, books, and oils" />
          </figure>
          <div className="picture-shop-copy">
            <h3>Preview store bundle</h3>
            <p>
              A visual placeholder for a curated starter catalog: hero mask, textile stack,
              jewelry tray, body-care shelf, books, incense, and home objects.
            </p>
            <button className="button primary" type="button" onClick={onAdd}>
              <ShoppingBag aria-hidden="true" size={20} />
              Add picture bundle
            </button>
          </div>
        </div>
      </section>

      <EventsSection />
      <VisitSection />
    </>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
  bagCount,
  previewMode,
  setPreviewMode
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  bagCount: number;
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;
}) {
  const links = [
    ["Story", "#story"],
    ["Shop", "#shop-preview"],
    ["Events", "#events"],
    ["Visit", "#visit"],
    ["Build Plan", "#build-plan"]
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Pan African City Alive preview home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>Pan African City Alive</span>
      </a>

      <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <div className="mode-switch" aria-label="Preview option switcher">
          <button
            type="button"
            className={previewMode === "interactive" ? "is-active" : ""}
            onClick={() => setPreviewMode("interactive")}
          >
            Option 1
          </button>
          <button
            type="button"
            className={previewMode === "picture" ? "is-active" : ""}
            onClick={() => setPreviewMode("picture")}
          >
            Option 2
          </button>
        </div>
        <a className="icon-button" href="#shop-preview" aria-label={`Preview bag with ${bagCount} items`}>
          <ShoppingBag aria-hidden="true" size={20} />
          <span>{bagCount}</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>
    </header>
  );
}

function IntroOverlay({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  return (
    <div className={`intro-overlay picture-intro ${isOpening ? "is-opening" : ""}`}>
      <img
        className="picture-intro-image"
        src="/images/generated-mask-store.png"
        alt="Generated Pan African City Alive mask store preview"
      />
      <div className="picture-intro-scrim" aria-hidden="true" />
      <button className="picture-mask-button" type="button" onClick={onOpen} aria-label="Click the mask to open Pan African City Alive preview">
        <span className="closed-mouth-patch" aria-hidden="true" />
        <span className="click-mask-command">Click the mask to open</span>
      </button>
      <div className="intro-copy picture-intro-copy">
        <p>Hey assistant user, this is a preview just showing you what it could look like.</p>
        <button className="button primary intro-cta" type="button" onClick={onOpen}>
          <Sparkles aria-hidden="true" size={20} />
          Click the mask to open
        </button>
      </div>
    </div>
  );
}

function MaskSculpture({ open, label }: { open: boolean; label: string }) {
  return (
    <svg className={`mask-sculpture ${open ? "mouth-open" : ""}`} viewBox="0 0 320 390" role="img" aria-label={label}>
      <defs>
        <linearGradient id="maskFace" x1="58" y1="20" x2="274" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f6ecd8" />
          <stop offset="0.2" stopColor="#d7a332" />
          <stop offset="0.48" stopColor="#e66d2f" />
          <stop offset="0.72" stopColor="#b3241c" />
          <stop offset="1" stopColor="#1e6a45" />
        </linearGradient>
        <linearGradient id="maskNose" x1="145" y1="138" x2="181" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2b6fb0" />
          <stop offset="1" stopColor="#1e6a45" />
        </linearGradient>
        <filter id="maskShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#5a202c" floodOpacity="0.24" />
        </filter>
      </defs>
      <g filter="url(#maskShadow)">
        <path className="mask-crest" d="M74 87c12-43 43-67 86-67s75 24 87 67l-40 28-47-22-48 22z" fill="#1e6a45" />
        <path d="M88 92c0-29 145-29 145 0l34 43c14 55-5 141-55 193-18 19-35 29-52 31-17-2-34-12-52-31-50-52-69-138-55-193z" fill="url(#maskFace)" stroke="#151515" strokeWidth="9" />
        <path d="M94 112c28-24 105-28 132 0" fill="none" stroke="#f6ecd8" strokeWidth="12" strokeLinecap="round" />
        <path d="M102 136l43-20 15 55-38 10z" fill="#f6ecd8" stroke="#151515" strokeWidth="7" />
        <path d="M218 136l-43-20-15 55 38 10z" fill="#f6ecd8" stroke="#151515" strokeWidth="7" />
        <path d="M117 152c9 10 22 10 31 0" fill="none" stroke="#151515" strokeWidth="8" strokeLinecap="round" />
        <path d="M172 152c9 10 22 10 31 0" fill="none" stroke="#151515" strokeWidth="8" strokeLinecap="round" />
        <path d="M151 171c-7 31-12 58-17 82 18 12 34 13 52 0-5-24-10-51-17-82z" fill="url(#maskNose)" stroke="#151515" strokeWidth="7" />
        <path className="mouth-top" d="M120 276c27-24 53-24 80 0-17 12-63 12-80 0z" fill="#151515" />
        <path className="mouth-bottom" d="M121 286c25 22 54 22 78 0-13 35-65 35-78 0z" fill="#5a202c" stroke="#151515" strokeWidth="7" />
        <path d="M73 145l-36 24 25 42 30-22z" fill="#b3241c" stroke="#151515" strokeWidth="7" />
        <path d="M247 145l36 24-25 42-30-22z" fill="#b3241c" stroke="#151515" strokeWidth="7" />
        <path d="M65 215l32 19-8 62-39-34zM255 215l-32 19 8 62 39-34z" fill="#d7a332" stroke="#151515" strokeWidth="7" />
        <path d="M105 324c33 33 77 33 110 0" fill="none" stroke="#f6ecd8" strokeWidth="8" strokeLinecap="round" />
        <path d="M160 22v70M128 34l32 58 32-58" fill="none" stroke="#d7a332" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="99" cy="235" r="11" fill="#2b6fb0" stroke="#151515" strokeWidth="6" />
        <circle cx="221" cy="235" r="11" fill="#2b6fb0" stroke="#151515" strokeWidth="6" />
        <path d="M78 84l27 33M242 84l-27 33" stroke="#e66d2f" strokeWidth="12" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function MetricStrip() {
  const metrics = [
    ["Founded", "1993"],
    ["Current hub", "1848 Bay Road"],
    ["Core mix", "Art, textiles, body care"],
    ["Site mode", "Preview only"]
  ];
  return (
    <section className="metric-strip" aria-label="Pan African City Alive preview facts">
      {metrics.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}

function LanguageWall() {
  return (
    <section className="language-wall section-pad" aria-label="Preview language entering the screen">
      <div className="section-heading">
        <p className="section-label">Language as it enters</p>
        <h2>Sample copy moments for the first screen and scroll.</h2>
      </div>
      <div className="language-grid">
        {languageCards.map((text, index) => (
          <article className="language-card" key={text} style={{ animationDelay: `${index * 90}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ShopPreview({
  products,
  activeCategory,
  setActiveCategory,
  onAdd
}: {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onAdd: () => void;
}) {
  return (
    <section className="shop-section section-pad" id="shop-preview">
      <div className="section-heading split">
        <div>
          <p className="section-label">False shop section</p>
          <h2>A preview shop with real category logic.</h2>
        </div>
        <p>
          These are concept products and custom visuals, not live inventory or checkout. The point is
          to make the future store feel shoppable before a catalog is connected.
        </p>
      </div>

      <div className="shop-toolbar" aria-label="Shop preview filters">
        <div className="search-pill">
          <Search aria-hidden="true" size={18} />
          <span>Search preview goods</span>
        </div>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              data-testid={`filter-${category.toLowerCase()}`}
              className={activeCategory === category ? "is-active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <article className="product-card" data-testid={`product-${product.id}`}>
      <div className="product-art">
        <ProductArt product={product} />
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.origin}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.note}</p>
        <button className="button product-button" type="button" data-testid={`add-${product.id}`} onClick={onAdd}>
          <ShoppingBag aria-hidden="true" size={18} />
          Add to preview bag
        </button>
      </div>
    </article>
  );
}

function ProductArt({ product }: { product: Product }) {
  const [a, b, c, d] = product.palette;
  const grad = `grad-${product.id}`;

  if (product.kind === "mask") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        </defs>
        <rect width="420" height="300" rx="8" fill="#f6ecd8" />
        <path d="M30 34h360v232H30z" fill={c} opacity=".15" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${82 + i * 92} 48)`}>
            <path d="M44 0c45 28 51 117 0 171C-7 117-1 28 44 0z" fill={i === 1 ? `url(#${grad})` : d} stroke="#151515" strokeWidth="7" />
            <path d="M18 63h20M50 63h20" stroke="#151515" strokeWidth="7" strokeLinecap="round" />
            <path d="M28 122c10 10 22 10 32 0" fill="none" stroke="#151515" strokeWidth="7" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    );
  }

  if (product.kind === "textile") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <rect width="420" height="300" rx="8" fill={a} />
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <g key={`${row}-${col}`} transform={`translate(${col * 70} ${row * 60})`}>
              <rect width="70" height="60" fill={(row + col) % 2 ? b : c} />
              <path d="M35 5l28 25-28 25L7 30z" fill={(row + col) % 2 ? d : a} stroke="#151515" strokeWidth="2" />
              <path d="M0 0h70M0 60h70M0 30h70" stroke="#f6ecd8" strokeWidth="3" />
            </g>
          ))
        )}
      </svg>
    );
  }

  if (product.kind === "jewelry") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <rect width="420" height="300" rx="8" fill="#fff7e9" />
        <ellipse cx="210" cy="158" rx="154" ry="82" fill={a} opacity=".16" />
        {[0, 1, 2].map((ring) => (
          <ellipse key={ring} cx="210" cy="146" rx={132 - ring * 32} ry={60 - ring * 12} fill="none" stroke={[a, b, c][ring]} strokeWidth="16" />
        ))}
        {[...Array(18)].map((_, i) => (
          <circle key={i} cx={70 + i * 16} cy={218 + Math.sin(i) * 16} r="8" fill={[a, b, c, d][i % 4]} />
        ))}
      </svg>
    );
  }

  if (product.kind === "body") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <rect width="420" height="300" rx="8" fill="#f6ecd8" />
        <rect x="50" y="188" width="320" height="32" fill="#d9c4a1" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${84 + i * 88} 80)`}>
            <rect x="0" y="38" width="56" height="82" rx="8" fill={i === 1 ? b : a} stroke="#151515" strokeWidth="6" />
            <rect x="9" y="16" width="38" height="28" fill={d} stroke="#151515" strokeWidth="5" />
            <ellipse cx="28" cy="120" rx="37" ry="12" fill="#151515" opacity=".15" />
          </g>
        ))}
        <path d="M258 188c12-44 82-45 96 0z" fill={c} stroke="#151515" strokeWidth="6" />
      </svg>
    );
  }

  if (product.kind === "book") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <rect width="420" height="300" rx="8" fill="#fff7e9" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${82 + i * 58} ${64 + i * 9}) rotate(${i * -3})`}>
            <rect width="78" height="128" rx="4" fill={[a, b, c, d][i]} stroke="#151515" strokeWidth="6" />
            <rect x="16" y="24" width="46" height="8" fill="#f6ecd8" />
            <rect x="16" y="42" width="36" height="8" fill="#f6ecd8" />
          </g>
        ))}
        <path d="M70 230h280" stroke="#151515" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  if (product.kind === "carving") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <rect width="420" height="300" rx="8" fill="#f6ecd8" />
        <path d="M104 224h212" stroke="#151515" strokeWidth="10" strokeLinecap="round" />
        <path d="M144 94c36-52 96-52 132 0l-34 130h-64z" fill={a} stroke="#151515" strokeWidth="7" />
        <path d="M184 116h20M216 116h20" stroke="#151515" strokeWidth="7" strokeLinecap="round" />
        <path d="M198 162c11 10 23 10 34 0" fill="none" stroke="#151515" strokeWidth="7" strokeLinecap="round" />
        <circle cx="108" cy="178" r="34" fill={b} stroke="#151515" strokeWidth="7" />
        <circle cx="312" cy="178" r="34" fill={c} stroke="#151515" strokeWidth="7" />
      </svg>
    );
  }

  if (product.kind === "oil") {
    return (
      <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
        <rect width="420" height="300" rx="8" fill="#fff7e9" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${66 + i * 58} ${75 + (i % 2) * 18})`}>
            <path d="M24 0h22l8 42v102H16V42z" fill={[a, b, c, d][i % 4]} stroke="#151515" strokeWidth="6" />
            <rect x="13" y="74" width="44" height="30" fill="#f6ecd8" stroke="#151515" strokeWidth="5" />
          </g>
        ))}
        <path d="M60 244h300" stroke="#151515" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 420 300" role="img" aria-label={product.name}>
      <rect width="420" height="300" rx="8" fill="#f6ecd8" />
      <ellipse cx="210" cy="234" rx="140" ry="30" fill="#151515" opacity=".15" />
      <path d="M96 148c42 82 186 82 228 0l-24 78H120z" fill={a} stroke="#151515" strokeWidth="7" />
      <path d="M96 148c42-76 186-76 228 0-42 32-186 32-228 0z" fill={b} stroke="#151515" strokeWidth="7" />
      <path d="M144 136c25-26 107-26 132 0" fill="none" stroke={c} strokeWidth="12" strokeLinecap="round" />
      <path d="M122 178h176M134 205h152" stroke={d} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function EventsSection() {
  return (
    <section className="events-section section-pad" id="events">
      <div className="section-heading split">
        <div>
          <p className="section-label">Events and culture</p>
          <h2>Programming becomes part of the store's SEO story.</h2>
        </div>
        <p>
          The official event list visible in research showed a 2026 relaunch celebration plus
          drumming, storytelling, and jewelry workshop modules. Since those listed dates are now
          before June 18, 2026, this preview frames them as relaunch program references.
        </p>
      </div>
      <div className="event-grid">
        {events.map((event) => (
          <article className="event-card" key={event.title}>
            <EventIcon type={event.icon} />
            <span>{event.date}</span>
            <h3>{event.title}</h3>
            <p>{event.note}</p>
            <small>{event.venue}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function EventIcon({ type }: { type: EventItem["icon"] }) {
  const size = 26;
  if (type === "music") return <Music2 aria-hidden="true" size={size} />;
  if (type === "book") return <BookOpen aria-hidden="true" size={size} />;
  if (type === "gem") return <Gem aria-hidden="true" size={size} />;
  return <CalendarDays aria-hidden="true" size={size} />;
}

function BenchmarkCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="benchmark-card">
      <Heart aria-hidden="true" size={24} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function VisitSection() {
  return (
    <section className="visit-section section-pad" id="visit">
      <div className="visit-panel">
        <div>
          <p className="section-label">Visit and connect</p>
          <h2>Make the next action obvious.</h2>
          <p>
            This preview keeps contact details visible, avoids pretending the shop is live, and gives
            a clear path for the next phase: confirm inventory, hours, photography, events, and checkout.
          </p>
        </div>
        <div className="contact-stack" aria-label="Contact details">
          <a href="https://www.google.com/maps/search/?api=1&query=1848%20Bay%20Road%2C%20East%20Palo%20Alto%2C%20CA%2094303" target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" size={22} />
            1848 Bay Road, East Palo Alto, CA 94303
          </a>
          <a href="tel:+16506305274">
            <Phone aria-hidden="true" size={22} />
            (650) 630-5274
          </a>
          <a href="mailto:panafricancity@gmail.com">
            <Mail aria-hidden="true" size={22} />
            panafricancity@gmail.com
          </a>
        </div>
        <div className="visit-actions">
          <a className="button primary" href="https://www.panafricancityalive.com/" target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden="true" size={20} />
            Official site
          </a>
          <a className="button secondary" href="https://www.facebook.com/panafricancityalive/" target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden="true" size={20} />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Pan African City Alive Preview</strong>
        <p>
          A concept site for review only. Product cards, cart state, dates, and calls to action are
          preview scaffolding until the store confirms live inventory and operations.
        </p>
      </div>
      <div className="footer-links">
        <a href="#top">Top</a>
        <a href="#shop-preview">Shop preview</a>
        <a href="#visit">Visit</a>
      </div>
    </footer>
  );
}

export default App;
