globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getTorontoDateTime, a as getSlotsForDate } from '../../chunks/slots_DhcAzSUO.mjs';
import { g as getBookedSlotsForDate } from '../../chunks/db_BWXGbpz6.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_CfQf9S2F.mjs';

const prerender = false;
const GET = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const dateStr = url.searchParams.get("date");
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(JSON.stringify({ error: "Please provide a valid date in YYYY-MM-DD format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const d1 = locals?.runtime?.env?.DB;
    const bookedSlots = await getBookedSlotsForDate(d1, dateStr);
    const torontoNow = getTorontoDateTime();
    const result = getSlotsForDate(dateStr, bookedSlots, torontoNow);
    if (result.error) {
      return new Response(JSON.stringify({ date: dateStr, slots: [], error: result.error }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0"
        }
      });
    }
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch (err) {
    console.error("API /api/availability error:", err);
    return new Response(JSON.stringify({ error: "Internal server error checking availability." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
