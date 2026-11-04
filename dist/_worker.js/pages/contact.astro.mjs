globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { e as createAstro, f as createComponent, k as renderComponent, q as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BfFI7yxH.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_nOKoNsR3.mjs';
import { $ as $$Map } from '../chunks/Map_B7GMRe5j.mjs';
import { b as businessConfig } from '../chunks/business_CgHEbruk.mjs';
import { s as seoData } from '../chunks/seo_y-YGCs9Y.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_CfQf9S2F.mjs';

const $$Astro = createAstro("https://royaldrivemechanics.ca");
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const seo = seoData.contact;
  const isSent = Astro2.url.searchParams.get("sent") === "true";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo.title, "description": seo.description, "canonicalPath": seo.canonicalPath, "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" }
  ] }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-16 sm:py-20 bg-brand-black border-b border-brand-border"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Top Title --> <div class="text-center max-w-2xl mx-auto mb-12 reveal"> <span class="text-xs font-bold uppercase tracking-wider text-brand-red">
Get in Touch
</span> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white uppercase tracking-tight mt-1">
Contact Royal Drive Mechanics
</h1> <div class="w-16 h-1 bg-brand-red mx-auto mt-3 rounded-full"></div> <p class="text-sm sm:text-base text-brand-grey mt-4 leading-relaxed">
Need quick advice, an insurance estimate, or directions? Contact Mirshad directly or drop by our workshop on Royal Windsor Drive.
</p> </div> <!-- Hero Contact Channels Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 reveal-group"> <!-- Big Call Button Card --> <div class="bg-brand-surface border-2 border-brand-red/80 p-6 rounded-card shadow-glow-red flex flex-col justify-between"> <div> <div class="w-12 h-12 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-2xl mb-4">
📞
</div> <span class="text-xs uppercase tracking-wider text-brand-grey font-semibold block">Telephone</span> <h2 class="text-xl font-display font-bold text-white mt-1"> ${businessConfig.contact.phone} </h2> <p class="text-xs text-brand-grey mt-2">
Speak directly with Mirshad. Tap to call or copy the number.
</p> </div> <div class="mt-6 flex flex-col gap-2"> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="w-full py-2.5 px-4 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider text-center transition">
Call Us Now
</a> <button type="button" id="copy-phone-btn" class="w-full py-2 px-4 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-brand-grey hover:text-white text-xs font-semibold transition">
📋 Copy Number
</button> <span id="copy-success" class="hidden text-[11px] text-green-400 text-center font-medium">
✓ Copied to clipboard!
</span> </div> </div> <!-- WhatsApp Option --> ${renderTemplate`<div class="bg-brand-surface border border-[#25D366]/40 p-6 rounded-card flex flex-col justify-between hover:border-[#25D366] transition"> <div> <div class="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 flex items-center justify-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" class="w-7 h-7"> <path fill="#25D366" d="M87.608 0C39.277 0 0 39.277 0 87.608c0 15.331 4.002 29.737 11.012 42.227L0 175.552l46.738-11.012c12.025 6.344 25.693 9.964 40.217 9.964h.004c48.327 0 87.608-39.277 87.608-87.608C175.216 39.277 135.935 0 87.608 0zm0 160.512h-.004c-13.036 0-25.803-3.508-36.956-10.12l-2.65-1.573-27.457 6.47 6.566-26.945-1.723-2.763c-7.248-11.527-11.077-24.858-11.077-38.57 0-39.872 32.447-72.32 72.32-72.32 19.31 0 37.465 7.527 51.103 21.195 13.638 13.668 21.14 31.835 21.136 51.16-.004 39.872-32.447 72.466-72.259 72.466zm39.691-54.155c-2.175-1.088-12.867-6.347-14.863-7.073-1.996-.727-3.45-1.088-4.904 1.088-1.454 2.175-5.63 7.073-6.901 8.524-1.271 1.451-2.542 1.633-4.717.544-2.175-1.088-9.178-3.382-17.483-10.793-6.463-5.77-10.826-12.89-12.097-15.065-1.271-2.175-.136-3.351.955-4.432.98-.973 2.175-2.538 3.263-3.809.544-.727.907-1.36 1.36-2.266.453-.907.227-1.723-.113-2.448-.34-.726-4.904-11.811-6.718-16.166-1.769-4.249-3.565-3.673-4.904-3.74-1.271-.063-2.723-.076-4.177-.076-1.454 0-3.81.544-5.81 2.72-1.996 2.175-7.627 7.436-7.627 18.135 0 10.7 7.809 21.035 8.897 22.487 1.088 1.453 15.365 23.476 37.229 32.913 5.205 2.248 9.269 3.59 12.44 4.597 5.228 1.664 9.987 1.428 13.745.866 4.192-.634 12.867-5.267 14.68-10.35 1.814-5.085 1.814-9.435 1.27-10.35-.544-.908-1.996-1.453-4.176-2.538z"></path> </svg> </div> <span class="text-xs uppercase tracking-wider text-brand-grey font-semibold block">WhatsApp</span> <h2 class="text-lg font-display font-bold text-white mt-1">
Chat on WhatsApp
</h2> <p class="text-xs text-brand-grey mt-2">
Send photos of damage, squeak audio, or quick questions directly.
</p> </div> <div class="mt-6"> <a${addAttribute(businessConfig.contact.whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-card bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider text-center transition"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" class="w-4 h-4 flex-shrink-0"> <path fill="black" d="M87.608 0C39.277 0 0 39.277 0 87.608c0 15.331 4.002 29.737 11.012 42.227L0 175.552l46.738-11.012c12.025 6.344 25.693 9.964 40.217 9.964h.004c48.327 0 87.608-39.277 87.608-87.608C175.216 39.277 135.935 0 87.608 0zm0 160.512h-.004c-13.036 0-25.803-3.508-36.956-10.12l-2.65-1.573-27.457 6.47 6.566-26.945-1.723-2.763c-7.248-11.527-11.077-24.858-11.077-38.57 0-39.872 32.447-72.32 72.32-72.32 19.31 0 37.465 7.527 51.103 21.195 13.638 13.668 21.14 31.835 21.136 51.16-.004 39.872-32.447 72.466-72.259 72.466zm39.691-54.155c-2.175-1.088-12.867-6.347-14.863-7.073-1.996-.727-3.45-1.088-4.904 1.088-1.454 2.175-5.63 7.073-6.901 8.524-1.271 1.451-2.542 1.633-4.717.544-2.175-1.088-9.178-3.382-17.483-10.793-6.463-5.77-10.826-12.89-12.097-15.065-1.271-2.175-.136-3.351.955-4.432.98-.973 2.175-2.538 3.263-3.809.544-.727.907-1.36 1.36-2.266.453-.907.227-1.723-.113-2.448-.34-.726-4.904-11.811-6.718-16.166-1.769-4.249-3.565-3.673-4.904-3.74-1.271-.063-2.723-.076-4.177-.076-1.454 0-3.81.544-5.81 2.72-1.996 2.175-7.627 7.436-7.627 18.135 0 10.7 7.809 21.035 8.897 22.487 1.088 1.453 15.365 23.476 37.229 32.913 5.205 2.248 9.269 3.59 12.44 4.597 5.228 1.664 9.987 1.428 13.745.866 4.192-.634 12.867-5.267 14.68-10.35 1.814-5.085 1.814-9.435 1.27-10.35-.544-.908-1.996-1.453-4.176-2.538z"></path> </svg>
Message on WhatsApp
</a> </div> </div>`} <!-- Text / SMS Option --> <div class="bg-brand-surface border border-brand-border p-6 rounded-card flex flex-col justify-between hover:border-brand-red transition"> <div> <div class="w-12 h-12 rounded-full bg-brand-charcoal text-white border border-brand-border flex items-center justify-center text-2xl mb-4">
📱
</div> <span class="text-xs uppercase tracking-wider text-brand-grey font-semibold block">Text Message</span> <h2 class="text-lg font-display font-bold text-white mt-1">
Send an SMS
</h2> <p class="text-xs text-brand-grey mt-2">
Standard mobile text message directly to our workshop line.
</p> </div> <div class="mt-6"> <a${addAttribute(businessConfig.contact.smsUrl, "href")} class="w-full inline-block py-2.5 px-4 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-white text-xs font-bold uppercase tracking-wider text-center transition">
Send SMS Text
</a> </div> </div> <!-- Email Option --> <div class="bg-brand-surface border border-brand-border p-6 rounded-card flex flex-col justify-between hover:border-brand-red transition"> <div> <div class="w-12 h-12 rounded-full bg-brand-charcoal text-white border border-brand-border flex items-center justify-center text-2xl mb-4">
✉️
</div> <span class="text-xs uppercase tracking-wider text-brand-grey font-semibold block">Email</span> <h2 class="text-lg font-display font-bold text-white mt-1">
Direct Email
</h2> <p class="text-xs text-brand-grey mt-2 truncate"> ${businessConfig.contact.email} </p> </div> <div class="mt-6"> <a${addAttribute(businessConfig.contact.emailMailto, "href")} class="w-full inline-block py-2.5 px-4 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-white text-xs font-bold uppercase tracking-wider text-center transition">
Compose Email
</a> </div> </div> </div> <!-- Workshop Location, Map & Message Form Grid --> <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"> <!-- Left: Address, Hours, Instagram & Map --> <div class="lg:col-span-7 space-y-6 reveal reveal-left"> <div class="bg-brand-surface border border-brand-border rounded-card p-6 sm:p-8"> <h2 class="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">
Workshop Location & Hours
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-grey"> <div> <span class="text-white font-semibold block uppercase mb-1">Mississauga Garage:</span> <p class="text-sm text-white font-medium">${businessConfig.address.street}</p> <p>${businessConfig.address.city}, ${businessConfig.address.province} ${businessConfig.address.postalCode}</p> <a${addAttribute(businessConfig.address.googleMapsUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-brand-red font-semibold hover:underline inline-block mt-2">
Open in Google Maps ↗
</a> </div> <div> <span class="text-white font-semibold block uppercase mb-1">Operating Hours:</span> ${businessConfig.displayHours.map((h) => renderTemplate`<p class="py-0.5">${h.days}: <span class="text-white font-medium">${h.time}</span></p>`)} </div> </div> <div class="mt-6 pt-6 border-t border-brand-border/60 flex items-center justify-between"> <div> <span class="text-xs text-brand-grey block">Follow our latest projects:</span> <a${addAttribute(businessConfig.contact.instagramUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-brand-red font-semibold text-xs hover:underline"> ${businessConfig.contact.instagramHandle} </a> </div> <span class="text-xs bg-brand-charcoal px-3 py-1 rounded border border-brand-border text-brand-grey">
MTO Licensed Station
</span> </div> </div> <!-- Privacy-friendly map --> ${renderComponent($$result2, "Map", $$Map, {})} </div> <!-- Right: Message Form --> <div class="lg:col-span-5 reveal reveal-right"> <div class="bg-brand-surface border border-brand-border rounded-card p-6 sm:p-8"> <h2 class="text-xl font-display font-bold text-white uppercase tracking-tight mb-2">
Send Us a Message
</h2> <p class="text-xs text-brand-grey mb-6">
Have an inquiry? Fill in the details below and we will email or call you back shortly.
</p> ${isSent && renderTemplate`<div class="mb-6 p-4 rounded-card bg-green-950/80 border border-green-800 text-green-200 text-xs">
✓ Thank you! Your message has been sent to our shop. We will get in touch with you promptly.
</div>`} <form method="POST" action="/api/contact" class="space-y-4"> <!-- Honeypot --> <div class="hidden" aria-hidden="true"> <input type="text" name="website"${addAttribute(-1, "tabIndex")} autoComplete="off"> </div> <div> <label for="contact-name" class="block text-xs text-brand-grey mb-1">Your Name *</label> <input type="text" id="contact-name" name="name" required class="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-brand-red focus:outline-none" placeholder="e.g. Adithya"> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"> <div> <label for="contact-phone" class="block text-xs text-brand-grey mb-1">Phone Number *</label> <input type="tel" id="contact-phone" name="phone" required class="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-brand-red focus:outline-none" placeholder="365-524-2003"> </div> <div> <label for="contact-email" class="block text-xs text-brand-grey mb-1">Email Address *</label> <input type="email" id="contact-email" name="email" required class="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-brand-red focus:outline-none" placeholder="name@example.com"> </div> </div> <div> <label for="contact-service" class="block text-xs text-brand-grey mb-1">Service Needed (Optional)</label> <select id="contact-service" name="service" class="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-brand-red focus:outline-none"> <option value="General Inquiry">General Inquiry</option> <option value="All Oil Changes">All Oil Changes</option> <option value="Brakes">Brakes</option> <option value="Tune-Ups">Tune-Ups</option> <option value="Suspension">Suspension</option> <option value="Engine & Transmissions">Engine & Transmissions</option> <option value="Safety Inspections & Certification">Safety Inspections & Certification</option> <option value="Collision Work / Collision Repairs">Collision Work / Insurance Claim</option> </select> </div> <div> <label for="contact-message" class="block text-xs text-brand-grey mb-1">Message *</label> <textarea id="contact-message" name="message"${addAttribute(4, "rows")} required placeholder="Tell us what's happening with your vehicle..." class="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-brand-red focus:outline-none resize-none"></textarea> </div> <button type="submit" class="w-full py-3 px-4 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-glow-red">
Send Message →
</button> </form> </div> </div> </div> </div> </section> ` })} ${renderScript($$result, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/contact.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/contact.astro", void 0);

const $$file = "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
