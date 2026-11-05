globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, m as maybeRenderHead, h as addAttribute, q as renderScript, r as renderTemplate } from './astro/server_BfFI7yxH.mjs';
import { b as businessConfig } from './business_CgHEbruk.mjs';

const $$Map = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-card overflow-hidden border border-brand-border bg-brand-charcoal"> <!-- Privacy-friendly map container --> <div id="map-placeholder" class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-brand-charcoal to-brand-surface"> <div class="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center text-2xl mb-3">
📍
</div> <h3 class="text-white font-display font-bold text-lg">
Royal Drive Mechanics Workshop
</h3> <p class="text-xs sm:text-sm text-brand-grey mt-1 max-w-md"> ${businessConfig.address.full} </p> <div class="flex flex-wrap items-center justify-center gap-3 mt-4"> <button type="button" id="load-map-btn" class="px-4 py-2 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-glow-red">
🗺️ Load Interactive Map
</button> <a${addAttribute(businessConfig.address.googleMapsUrl, "href")} target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-white text-xs font-semibold transition">
Open in Google Maps ↗
</a> </div> <span class="text-[11px] text-brand-grey/60 mt-3">
Privacy-friendly: External Google Map assets load only upon your request.
</span> </div> <iframe id="map-iframe"${addAttribute(businessConfig.address.googleMapsEmbedUrl, "data-src")} class="w-full h-full border-0 hidden" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Royal Drive Mechanics Google Map"></iframe> </div> ${renderScript($$result, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/Map.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/Map.astro", void 0);

export { $$Map as $ };
