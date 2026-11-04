globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                   */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BfFI7yxH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D3dGXdD2.mjs';
import { b as businessConfig } from '../../chunks/business_CgHEbruk.mjs';
import { g as generateIcsDataUrl } from '../../chunks/ics_v4tzH2Fq.mjs';
import { f as formatTime12 } from '../../chunks/slots_DhcAzSUO.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_CfQf9S2F.mjs';

const $$Astro = createAstro("https://royaldrivemechanics.ca");
const prerender = false;
const $$Confirmed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Confirmed;
  const url = new URL(Astro2.request.url);
  const ref = url.searchParams.get("ref") || "RDM-CONFIRMED";
  const service = url.searchParams.get("service") || "Auto Service";
  const date = url.searchParams.get("date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const time = url.searchParams.get("time") || "10:00";
  const displayTime = formatTime12(time);
  const formattedDate = (/* @__PURE__ */ new Date(`${date}T12:00:00Z`)).toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const icsUrl = generateIcsDataUrl({
    reference: ref,
    service,
    slotDate: date,
    slotTime: time,
    vehicle: "Vehicle"
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Booking Confirmed | Royal Drive Mechanics", "description": "Your service slot at Royal Drive Mechanics in Mississauga has been confirmed.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-16 sm:py-24 bg-brand-black min-h-[80vh] flex items-center justify-center"> <div class="max-w-2xl mx-auto px-4 sm:px-6 w-full"> <div class="bg-brand-surface border-2 border-brand-red rounded-card p-8 sm:p-12 shadow-glow-red text-center"> <div class="w-16 h-16 bg-brand-red/20 text-brand-red rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-brand-red/40">
✓
</div> <h1 class="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
Your Slot Is Booked!
</h1> <p class="text-brand-grey text-sm mt-2">
Thank you for choosing Royal Drive Mechanics. We look forward to servicing your vehicle.
</p> <!-- Reference Box --> <div class="my-8 p-4 bg-brand-black/90 rounded-card border border-brand-border inline-block min-w-[280px]"> <span class="text-xs uppercase tracking-wider text-brand-grey block">Booking Reference</span> <span class="text-3xl font-display font-bold text-brand-red tracking-wider block mt-1"> ${ref} </span> </div> <!-- Details Card --> <div class="bg-brand-charcoal p-6 rounded-card border border-brand-border text-left max-w-md mx-auto mb-8 text-sm space-y-3"> <div class="flex justify-between border-b border-brand-border/60 pb-2"> <span class="text-brand-grey">Service:</span> <span class="text-white font-medium">${service}</span> </div> <div class="flex justify-between border-b border-brand-border/60 pb-2"> <span class="text-brand-grey">Date & Time:</span> <span class="text-white font-bold text-brand-red">${formattedDate} at ${displayTime}</span> </div> <div class="flex justify-between"> <span class="text-brand-grey">Workshop Address:</span> <span class="text-white font-medium text-right">${businessConfig.address.full}</span> </div> </div> <!-- Action Buttons --> <div class="flex flex-col sm:flex-row items-center justify-center gap-4"> <a${addAttribute(icsUrl, "href")}${addAttribute(`rdm-appointment-${ref}.ics`, "download")} class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-white text-sm font-semibold transition">
📅 Add to Calendar (.ics)
</a> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold transition shadow-glow-red">
📞 Call ${businessConfig.contact.phone} </a> </div> <p class="text-xs text-brand-grey mt-8">
Need to change or cancel? Please call us directly at <strong>365-524-2003</strong> as early as possible.
</p> <div class="mt-8 pt-6 border-t border-brand-border/60"> <a href="/" class="text-xs text-brand-grey hover:text-white underline transition">
← Return to Home
</a> </div> </div> </div> </section> ` })}`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/booking/confirmed.astro", void 0);

const $$file = "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/booking/confirmed.astro";
const $$url = "/booking/confirmed";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Confirmed,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
