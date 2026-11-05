globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, q as renderScript, k as renderComponent, v as renderSlot, w as renderHead, u as unescapeHTML } from './astro/server_BfFI7yxH.mjs';
/* empty css                        */
import { b as businessConfig } from './business_CgHEbruk.mjs';

const $$Astro$1 = createAstro("https://royaldrivemechanics.ca");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/book", label: "Book a Slot" },
    { href: "/contact", label: "Contact" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 bg-brand-black/95 backdrop-blur-md border-b border-brand-border"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between h-20"> <!-- Logo Branding --> <a href="/" class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-red rounded p-1"> <!-- Logo Image with clean fallback --> <div class="h-12 w-auto flex items-center justify-center" style="max-height: 48px;"> <img src="/brand/rdm-logo-transparent.png" alt="Royal Drive Mechanics Logo" height="48" style="height: 48px; max-height: 48px; width: auto; object-fit: contain;" class="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102" onerror="this.style.display='none'; document.getElementById('logo-wordmark-fallback').style.display='flex';"> <div id="logo-wordmark-fallback" class="hidden flex-col justify-center font-display font-bold leading-none tracking-tight"> <span class="text-brand-red text-xl sm:text-2xl font-black italic tracking-widest">RDM</span> <span class="text-white text-xs sm:text-sm tracking-wider uppercase">Royal Drive Mechanics</span> </div> </div> </a> <!-- Desktop Navigation Links --> <nav class="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Main Navigation"> ${navLinks.map((link) => {
    const isActive = currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href);
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`transition-colors py-1 border-b-2 font-medium ${isActive ? "text-white border-brand-red font-semibold" : "text-brand-grey border-transparent hover:text-white hover:border-brand-border"}`, "class")}> ${link.label} </a>`;
  })} </nav> <!-- Desktop Action CTAs (Call & Book) --> <div class="hidden md:flex items-center gap-4"> <!-- Direct Call Button --> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="flex items-center gap-2 text-sm font-semibold text-white px-3.5 py-2 rounded-card border border-brand-border bg-brand-charcoal hover:border-brand-grey hover:bg-brand-surface transition"${addAttribute(`Call ${businessConfig.contact.phone}`, "aria-label")}> <span class="text-brand-red text-base">📞</span> <span>${businessConfig.contact.phone}</span> </a> <!-- Book a Slot Button --> <a href="/book" class="inline-flex items-center justify-center px-5 py-2.5 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-glow-red hover:shadow-glow-red-lg">
Book a Slot
</a> </div> <!-- Mobile Hamburger Button --> <div class="flex items-center gap-3 md:hidden"> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="p-2 text-brand-red text-lg border border-brand-border rounded bg-brand-charcoal" aria-label="Call Royal Drive Mechanics">
📞
</a> <button type="button" id="mobile-menu-btn" class="p-2.5 rounded-card border border-brand-border text-brand-grey hover:text-white hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red" aria-label="Toggle navigation menu" aria-expanded="false"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </div> <!-- Mobile Dropdown Navigation --> <div id="mobile-menu" class="hidden md:hidden border-t border-brand-border bg-brand-charcoal px-4 pt-3 pb-6 space-y-3"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="block px-3 py-2.5 rounded-card text-base font-semibold text-white hover:bg-brand-surface hover:text-brand-red border border-transparent hover:border-brand-border"> ${link.label} </a>`)} <div class="pt-4 border-t border-brand-border/60 flex flex-col gap-3"> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="flex items-center justify-center gap-2 py-3 rounded-card bg-brand-surface border border-brand-border text-white text-sm font-semibold">
📞 Call ${businessConfig.contact.phone} </a> <a href="/book" class="flex items-center justify-center py-3 rounded-card bg-brand-red text-white text-sm font-bold uppercase tracking-wider shadow-glow-red">
Book a Slot
</a> </div> </div> </header> ${renderScript($$result, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-brand-charcoal border-t border-brand-border text-brand-grey text-sm"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> <!-- Brand & Mission Column --> <div class="space-y-4"> <a href="/" class="inline-block"> <img src="/brand/rdm-logo-transparent.png" alt="Royal Drive Mechanics" height="40" style="height: 40px; max-height: 40px; width: auto; object-fit: contain;" class="h-10 w-auto object-contain" onerror="this.style.display='none'; document.getElementById('footer-logo-wordmark').style.display='block';"> <span id="footer-logo-wordmark" class="hidden text-xl font-display font-bold text-white tracking-wider">
ROYAL DRIVE MECHANICS
</span> </a> <p class="text-xs text-brand-grey leading-relaxed"> ${businessConfig.taglines.primary} </p> <p class="text-xs text-brand-grey leading-relaxed"> ${businessConfig.type} </p> <div class="pt-2"> <a${addAttribute(businessConfig.contact.instagramUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-xs text-white hover:text-brand-red transition"> <span>📸 Instagram:</span> <span class="font-semibold text-brand-red">${businessConfig.contact.instagramHandle}</span> </a> </div> </div> <!-- Quick Links Column --> <div class="space-y-3"> <h3 class="text-white font-display font-semibold text-sm uppercase tracking-wider border-b border-brand-border/60 pb-2">
Quick Links
</h3> <ul class="space-y-2 text-xs"> <li><a href="/" class="hover:text-white transition">Home</a></li> <li><a href="/services" class="hover:text-white transition">All Services</a></li> <li><a href="/services/oil-changes" class="hover:text-white transition">Oil Changes</a></li> <li><a href="/services/brakes" class="hover:text-white transition">Brake Repair & Service</a></li> <li><a href="/services/safety-inspections" class="hover:text-white transition">MTO Safety Inspections</a></li> <li><a href="/services/collision-repairs" class="hover:text-white transition">Collision & Body Repairs</a></li> <li><a href="/book" class="text-brand-red font-semibold hover:text-brand-red-hover transition">Book a Slot Online →</a></li> <li><a href="/contact" class="hover:text-white transition">Contact & Location</a></li> </ul> </div> <!-- Contact & Hours Column --> <div class="space-y-3"> <h3 class="text-white font-display font-semibold text-sm uppercase tracking-wider border-b border-brand-border/60 pb-2">
Contact & Workshop
</h3> <div class="space-y-2.5 text-xs"> <div> <span class="text-white block font-medium">Workshop Address:</span> <p>${businessConfig.address.street}</p> <p>${businessConfig.address.city}, ${businessConfig.address.province} ${businessConfig.address.postalCode}</p> <a${addAttribute(businessConfig.address.googleMapsUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-brand-red hover:underline text-[11px] font-semibold mt-0.5 inline-block">
Get Directions on Google Maps ↗
</a> </div> <div> <span class="text-white block font-medium">Phone / Contact:</span> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="text-brand-red font-bold hover:underline"> ${businessConfig.contact.phone} </a> <span class="text-brand-grey text-[11px] block">Contact: ${businessConfig.contact.contactPerson}</span> </div> <div> <span class="text-white block font-medium">Email:</span> <a${addAttribute(businessConfig.contact.emailMailto, "href")} class="hover:text-white underline"> ${businessConfig.contact.email} </a> </div> <div class="pt-1"> <span class="text-white block font-medium">Operating Hours:</span> ${businessConfig.displayHours.map((h) => renderTemplate`<p class="text-[11px]">${h.days}: <span class="text-white">${h.time}</span></p>`)} </div> </div> </div> <!-- Credentials & Areas Column --> <div class="space-y-3"> <h3 class="text-white font-display font-semibold text-sm uppercase tracking-wider border-b border-brand-border/60 pb-2">
Certifications & Areas
</h3> <div class="space-y-3 text-xs"> <div class="bg-brand-surface p-3 rounded-card border border-brand-border/80"> <span class="text-white font-semibold block text-[11px] text-brand-red uppercase tracking-wider mb-1">
Official Credential
</span> <p class="text-white font-medium text-xs leading-snug"> ${businessConfig.credentials.mtoLicense} </p> <p class="text-[11px] text-brand-grey mt-1"> ${businessConfig.credentials.certifiedInspectionCentre} — ${businessConfig.credentials.inspectionTagline} </p> </div> <div> <span class="text-white block font-medium mb-1">Areas We Serve:</span> <p class="text-xs text-brand-grey leading-relaxed"> ${businessConfig.serviceAreas.join(" \xB7 ")} </p> </div> <div> <span class="text-white block font-medium mb-1">Google Rating:</span> <div class="flex items-center gap-1.5 text-xs"> <span class="text-brand-red font-bold">★ ${businessConfig.googleReviews.rating}</span> <span>from ${businessConfig.googleReviews.reviewCount} verified reviews</span> </div> </div> </div> </div> </div> <!-- Bottom Legal Bar --> <div class="border-t border-brand-border/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"> <p>© ${currentYear} ${businessConfig.name}. All rights reserved.</p> <div class="flex items-center gap-6"> <a href="/privacy" class="hover:text-white transition">Privacy Policy (PIPEDA)</a> <a href="/terms" class="hover:text-white transition">Terms & Estimates</a> <a href="/terms#offer-terms" class="hover:text-white transition">Offer Terms</a> </div> </div> </div> </footer>`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/Footer.astro", void 0);

const $$StickyActions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Mobile Sticky Bottom Action Bar (Call · WhatsApp · Book) -->${maybeRenderHead()}<nav aria-label="Quick Actions" class="fixed bottom-0 inset-x-0 z-40 bg-brand-charcoal/95 backdrop-blur-md border-t border-brand-border md:hidden px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"> <div class="grid grid-cols-3 gap-2 max-w-md mx-auto"> <!-- Call Action --> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="flex flex-col items-center justify-center py-2 px-1 rounded-card bg-brand-surface border border-brand-border hover:border-brand-red text-white text-xs font-semibold transition active:scale-95" aria-label="Call Royal Drive Mechanics"> <span class="text-base mb-0.5">📞</span> <span>Call</span> </a> <!-- WhatsApp Message Action --> <a${addAttribute(businessConfig.contact.whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center py-2 px-1 rounded-card bg-brand-surface border border-[#25D366]/40 hover:border-[#25D366] text-white text-xs font-semibold transition active:scale-95" aria-label="WhatsApp Royal Drive Mechanics"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" class="w-4 h-4 mb-0.5"> <path fill="#25D366" d="M87.608 0C39.277 0 0 39.277 0 87.608c0 15.331 4.002 29.737 11.012 42.227L0 175.552l46.738-11.012c12.025 6.344 25.693 9.964 40.217 9.964h.004c48.327 0 87.608-39.277 87.608-87.608C175.216 39.277 135.935 0 87.608 0zm0 160.512h-.004c-13.036 0-25.803-3.508-36.956-10.12l-2.65-1.573-27.457 6.47 6.566-26.945-1.723-2.763c-7.248-11.527-11.077-24.858-11.077-38.57 0-39.872 32.447-72.32 72.32-72.32 19.31 0 37.465 7.527 51.103 21.195 13.638 13.668 21.14 31.835 21.136 51.16-.004 39.872-32.447 72.466-72.259 72.466zm39.691-54.155c-2.175-1.088-12.867-6.347-14.863-7.073-1.996-.727-3.45-1.088-4.904 1.088-1.454 2.175-5.63 7.073-6.901 8.524-1.271 1.451-2.542 1.633-4.717.544-2.175-1.088-9.178-3.382-17.483-10.793-6.463-5.77-10.826-12.89-12.097-15.065-1.271-2.175-.136-3.351.955-4.432.98-.973 2.175-2.538 3.263-3.809.544-.727.907-1.36 1.36-2.266.453-.907.227-1.723-.113-2.448-.34-.726-4.904-11.811-6.718-16.166-1.769-4.249-3.565-3.673-4.904-3.74-1.271-.063-2.723-.076-4.177-.076-1.454 0-3.81.544-5.81 2.72-1.996 2.175-7.627 7.436-7.627 18.135 0 10.7 7.809 21.035 8.897 22.487 1.088 1.453 15.365 23.476 37.229 32.913 5.205 2.248 9.269 3.59 12.44 4.597 5.228 1.664 9.987 1.428 13.745.866 4.192-.634 12.867-5.267 14.68-10.35 1.814-5.085 1.814-9.435 1.27-10.35-.544-.908-1.996-1.453-4.176-2.538z"></path> </svg> <span>WhatsApp</span> </a> <!-- Book Action --> <a href="/book" class="flex flex-col items-center justify-center py-2 px-1 rounded-card bg-brand-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red transition active:scale-95" aria-label="Book a Service Slot"> <span class="text-base mb-0.5">📅</span> <span>Book</span> </a> </div> </nav>`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/StickyActions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b, _c, _d;
const $$Astro = createAstro("https://royaldrivemechanics.ca");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    canonicalPath = "",
    ogImage = "/og-image.jpg",
    noindex = false,
    breadcrumbs,
    serviceSchema,
    faqSchema
  } = Astro2.props;
  const siteUrl = "https://royaldrivemechanics.ca";
  const canonicalUrl = new URL(canonicalPath, siteUrl).href;
  const fullOgImageUrl = new URL(ogImage, siteUrl).href;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#business`,
    name: businessConfig.name,
    alternateName: businessConfig.shortName,
    description: businessConfig.type,
    url: siteUrl,
    telephone: businessConfig.contact.phoneIntl,
    email: businessConfig.contact.email,
    priceRange: "$$",
    image: [
      `${siteUrl}/brand/rdm-logo-full.jpg`,
      `${siteUrl}/og-image.jpg`
    ],
    logo: `${siteUrl}/brand/rdm-logo-full.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessConfig.address.street,
      addressLocality: businessConfig.address.city,
      addressRegion: businessConfig.address.province,
      postalCode: businessConfig.address.postalCode,
      addressCountry: "CA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessConfig.address.coordinates.latitude,
      longitude: businessConfig.address.coordinates.longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: businessConfig.googleReviews.rating.toString(),
      reviewCount: businessConfig.googleReviews.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1"
    },
    sameAs: [
      businessConfig.contact.instagramUrl,
      businessConfig.googleReviews.googleReviewUrl
    ],
    areaServed: businessConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area
    }))
  };
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.url, siteUrl).href
    }))
  } : null;
  const faqPageSchema = faqSchema && faqSchema.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSchema.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  } : null;
  return renderTemplate(_d || (_d = __template(['<html lang="en-CA" class="bg-brand-black text-brand-white scroll-smooth selection:bg-brand-red selection:text-white"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', '><link rel="canonical"', '><link rel="alternate" hreflang="en-CA"', ">", "", '<!-- Favicons & App Icons --><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#D4202B"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name" content="Royal Drive Mechanics"><meta property="og:locale" content="en_CA"><!-- Twitter Cards --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- JSON-LD Structured Data --><script type="application/ld+json">', "<\/script>", "", "", "", '</head> <body class="min-h-screen flex flex-col font-sans antialiased text-brand-white bg-brand-black pb-16 md:pb-0"> <!-- Accessible Skip Link --> <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-red focus:text-white focus:font-bold focus:rounded-card focus:shadow-glow-red">\nSkip to main content\n</a> ', ' <main id="main-content" class="flex-grow"> ', " </main> ", " ", " <!-- \u2728 Scroll-Reveal Animation Observer --> <script>\n      (function () {\n        function initReveal() {\n          // Fallback: no IntersectionObserver \u2192 show all immediately\n          if (typeof IntersectionObserver === 'undefined') {\n            document.querySelectorAll('.reveal, .reveal-group').forEach(function (el) {\n              el.classList.add('is-visible');\n            });\n            return;\n          }\n\n          var observer = new IntersectionObserver(\n            function (entries) {\n              entries.forEach(function (entry) {\n                if (entry.isIntersecting) {\n                  entry.target.classList.add('is-visible');\n                  observer.unobserve(entry.target);\n                }\n              });\n            },\n            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }\n          );\n\n          document.querySelectorAll('.reveal, .reveal-group').forEach(function (el) {\n            observer.observe(el);\n          });\n        }\n\n        // Run after DOM is ready\n        if (document.readyState === 'loading') {\n          document.addEventListener('DOMContentLoaded', initReveal);\n        } else {\n          initReveal();\n        }\n      })();\n    <\/script> </body> </html> "])), title, addAttribute(description, "content"), addAttribute(canonicalUrl, "href"), addAttribute(canonicalUrl, "href"), noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, !noindex && renderTemplate`<meta name="robots" content="index, follow">`, addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullOgImageUrl, "content"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullOgImageUrl, "content"), unescapeHTML(JSON.stringify(localBusinessSchema)), breadcrumbSchema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(breadcrumbSchema))), serviceSchema && renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(serviceSchema))), faqPageSchema && renderTemplate(_c || (_c = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(faqPageSchema))), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "StickyActions", $$StickyActions, {}));
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
