import type { APIRoute } from 'astro';
import { getSlotsForDate, getTorontoDateTime } from '../../lib/slots';
import { getBookedSlotsForDate } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const dateStr = url.searchParams.get('date');

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(JSON.stringify({ error: 'Please provide a valid date in YYYY-MM-DD format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Access Cloudflare D1 binding from runtime environment if present
    const d1 = (locals as any)?.runtime?.env?.DB;

    // Fetch existing confirmed bookings for this date
    const bookedSlots = await getBookedSlotsForDate(d1, dateStr);

    // Calculate available slots in America/Toronto time
    const torontoNow = getTorontoDateTime();
    const result = getSlotsForDate(dateStr, bookedSlots, torontoNow);

    if (result.error) {
      return new Response(JSON.stringify({ date: dateStr, slots: [], error: result.error }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      },
    });
  } catch (err: any) {
    console.error('API /api/availability error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error checking availability.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
