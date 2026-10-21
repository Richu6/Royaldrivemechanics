import { useState, useEffect } from 'preact/hooks';
import type { TimeSlot } from '../../lib/slots';
import { generateIcsDataUrl } from '../../lib/ics';

interface Props {
  initialService?: string;
  turnstileSiteKey?: string;
}

export default function BookingWidget({ initialService = '', turnstileSiteKey = '' }: Props) {
  // Step state
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string>('');

  // Form fields
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [vehicle, setVehicle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [insuranceClaim, setInsuranceClaim] = useState<boolean>(false);
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');

  // Submission state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    service: string;
    slot_date: string;
    slot_time: string;
    displayTime: string;
    formattedDate: string;
    customer_name: string;
    vehicle: string;
  } | null>(null);

  // Parse URL query parameter for preselection if passed (e.g. ?service=brakes)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('service');
      if (s) {
        setSelectedService(s);
      }
    }
  }, []);

  // Set default minimum date (today) and maximum date (+60 days)
  const todayStr = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Fetch slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      setSelectedTime('');
      return;
    }

    let isMounted = true;
    setLoadingSlots(true);
    setSlotsError('');
    setSelectedTime('');

    fetch(`/api/availability?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data: any) => {
        if (!isMounted) return;
        setLoadingSlots(false);
        if (data.error) {
          setSlotsError(data.error);
          setSlots([]);
        } else if (data.slots) {
          setSlots(data.slots);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setLoadingSlots(false);
        setSlotsError('Could not check availability. Please verify your connection or call us directly.');
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setFormError('');

    if (!selectedService) {
      setFormError('Please select a service.');
      return;
    }
    if (!selectedDate) {
      setFormError('Please select an appointment date.');
      return;
    }
    if (!selectedTime) {
      setFormError('Please select an available time slot.');
      return;
    }
    if (!customerName || customerName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone || phone.trim().length < 10) {
      setFormError('Please enter a valid Canadian phone number (e.g. 365-524-2003).');
      return;
    }
    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!vehicle || vehicle.trim().length < 3) {
      setFormError('Please provide your vehicle year, make, and model (e.g. 2018 Honda Civic).');
      return;
    }
    if (!privacyConsent) {
      setFormError('You must agree to the privacy policy to submit a booking.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        service: selectedService,
        slot_date: selectedDate,
        slot_time: selectedTime,
        customer_name: customerName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        vehicle: vehicle.trim(),
        notes: notes.trim(),
        insurance_claim: insuranceClaim,
        privacy_consent: true,
        website: honeypot, // Honeypot
      };

      const res = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitting(false);
        setFormError(data.error || 'Booking could not be completed. Please try again.');
        // Refresh availability if race condition
        if (data.error && data.error.includes('taken')) {
          // Re-fetch slots
          fetch(`/api/availability?date=${selectedDate}`)
            .then((r) => r.json())
            .then((d) => {
              if (d.slots) setSlots(d.slots);
            });
        }
        return;
      }

      // Success!
      setSubmitting(false);
      setConfirmation({
        reference: data.booking.reference,
        service: data.booking.service,
        slot_date: data.booking.slot_date,
        slot_time: data.booking.slot_time,
        displayTime: data.displayTime || selectedTime,
        formattedDate: data.formattedDate || selectedDate,
        customer_name: customerName,
        vehicle,
      });

      // Scroll smoothly to top of booking component
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    } catch (err: any) {
      setSubmitting(false);
      setFormError('A network error occurred. Please try again or call Mirshad directly at 365-524-2003.');
    }
  };

  // If booking is confirmed, display the confirmation view
  if (confirmation) {
    const icsUrl = generateIcsDataUrl({
      reference: confirmation.reference,
      service: confirmation.service,
      slotDate: confirmation.slot_date,
      slotTime: confirmation.slot_time,
      customerName: confirmation.customer_name,
      vehicle: confirmation.vehicle,
    });

    return (
      <div className="bg-brand-surface border-2 border-brand-red rounded-card p-6 sm:p-10 shadow-glow-red text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-brand-red/20 text-brand-red rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-brand-red/40">
          ✓
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
          Your Slot Is Booked!
        </h2>
        <p className="text-brand-grey text-sm mt-1">
          A confirmation email has been dispatched to <strong className="text-white">{email}</strong>.
        </p>

        {/* Reference Box */}
        <div className="my-6 p-4 bg-brand-black/80 rounded-card border border-brand-border inline-block min-w-[280px]">
          <span className="text-xs uppercase tracking-wider text-brand-grey block">Booking Reference</span>
          <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red tracking-wider block mt-1">
            {confirmation.reference}
          </span>
        </div>

        {/* Details Card */}
        <div className="bg-brand-charcoal p-6 rounded-card border border-brand-border text-left max-w-md mx-auto mb-6 text-sm space-y-2.5">
          <div className="flex justify-between border-b border-brand-border/60 pb-2">
            <span className="text-brand-grey">Service:</span>
            <span className="text-white font-medium">{confirmation.service}</span>
          </div>
          <div className="flex justify-between border-b border-brand-border/60 pb-2">
            <span className="text-brand-grey">Date & Time:</span>
            <span className="text-white font-bold text-brand-red">{confirmation.formattedDate} at {confirmation.displayTime}</span>
          </div>
          <div className="flex justify-between border-b border-brand-border/60 pb-2">
            <span className="text-brand-grey">Vehicle:</span>
            <span className="text-white font-medium">{confirmation.vehicle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-grey">Location:</span>
            <span className="text-white font-medium text-right">Unit 6, 2630 Royal Windsor Dr, Mississauga</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={icsUrl}
            download={`rdm-appointment-${confirmation.reference}.ics`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-white text-sm font-semibold transition"
          >
            📅 Add to Calendar (.ics)
          </a>
          <a
            href="tel:+13655242003"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-sm font-semibold transition shadow-glow-red"
          >
            📞 Call 365-524-2003 (Mirshad)
          </a>
        </div>

        <p className="text-xs text-brand-grey mt-6">
          Need to change or cancel? Please call us directly at 365-524-2003 as early as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      method="POST"
      action="/api/book"
      onSubmit={handleSubmit}
      className="bg-brand-surface border border-brand-border rounded-card p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto"
      noValidate
    >
      {/* Invisible Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e: any) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="border-b border-brand-border pb-6 mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
          Book an Appointment
        </h2>
        <p className="text-brand-grey text-sm mt-1">
          Pick your service, select an available bay slot, and receive instant confirmation.
        </p>
      </div>

      {formError && (
        <div className="mb-6 p-4 rounded-card bg-red-950/80 border border-red-800 text-red-200 text-sm flex items-start gap-3">
          <span className="text-brand-red font-bold text-lg leading-none">⚠</span>
          <div>
            <p className="font-semibold">Notice</p>
            <p>{formError}</p>
          </div>
        </div>
      )}

      {/* Step 1: Choose Service */}
      <div className="mb-8">
        <label htmlFor="service-select" className="block text-sm font-semibold text-white uppercase tracking-wider mb-2">
          1. Select Service <span className="text-brand-red">*</span>
        </label>
        <select
          id="service-select"
          name="service"
          value={selectedService}
          onChange={(e: any) => setSelectedService(e.target.value)}
          required
          className="w-full bg-brand-charcoal border border-brand-border rounded-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm"
        >
          <option value="">-- Choose a service --</option>
          <option value="All Oil Changes">All Oil Changes (15% OFF Promo)</option>
          <option value="Brakes">Brakes (15% OFF Promo)</option>
          <option value="Tune-Ups">Tune-Ups</option>
          <option value="Suspension">Suspension</option>
          <option value="Engine & Transmissions">Engine & Transmissions</option>
          <option value="Safety Inspections & Certification">Safety Inspections & Certification (MTO Licensed)</option>
          <option value="Collision Work / Collision Repairs">Collision Work / Insurance Claims</option>
        </select>
      </div>

      {/* Step 2: Choose Date */}
      <div className="mb-8">
        <label htmlFor="slot-date" className="block text-sm font-semibold text-white uppercase tracking-wider mb-2">
          2. Select Date <span className="text-brand-red">*</span>
        </label>
        <input
          type="date"
          id="slot-date"
          name="slot_date"
          min={todayStr}
          max={maxDateStr}
          value={selectedDate}
          onChange={(e: any) => setSelectedDate(e.target.value)}
          required
          className="w-full bg-brand-charcoal border border-brand-border rounded-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm"
        />
        <p className="text-xs text-brand-grey mt-1">
          Open Mon–Sat 8:00 AM – 6:00 PM (Closed Sundays & statutory holidays). Book up to 60 days ahead.
        </p>
      </div>

      {/* Step 3: Choose Time Slot */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-white uppercase tracking-wider mb-2">
          3. Select Time Slot <span className="text-brand-red">*</span>
        </label>

        {!selectedDate ? (
          <p className="text-sm text-brand-grey italic bg-brand-charcoal/50 p-4 rounded-card border border-brand-border/40">
            Please pick a date first to see available workshop slots.
          </p>
        ) : loadingSlots ? (
          <div className="flex items-center gap-3 text-sm text-brand-grey p-4">
            <span className="w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></span>
            Checking real-time bay availability...
          </div>
        ) : slotsError ? (
          <p className="text-sm text-red-400 bg-red-950/40 p-3 rounded-card border border-red-900">
            {slotsError}
          </p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-brand-grey bg-brand-charcoal p-4 rounded-card border border-brand-border">
            No slots available for this date. Please choose another date.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {slots.map((s) => (
              <button
                type="button"
                key={s.time}
                disabled={!s.available}
                onClick={() => setSelectedTime(s.time)}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-card border transition-all text-center focus:outline-none focus:ring-2 focus:ring-brand-red ${
                  selectedTime === s.time
                    ? 'bg-brand-red border-brand-red text-white shadow-glow-red scale-102'
                    : s.available
                    ? 'bg-brand-charcoal border-brand-border text-white hover:border-brand-red hover:bg-brand-charcoal/80'
                    : 'bg-brand-black border-brand-border/40 text-brand-grey/40 cursor-not-allowed line-through'
                }`}
              >
                {s.displayTime}
                {!s.available && (
                  <span className="block text-[10px] font-normal no-underline opacity-60">
                    {s.reason === 'past_cutoff' ? 'Past cutoff' : 'Full'}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        <input type="hidden" name="slot_time" value={selectedTime} />
      </div>

      {/* Step 4: Vehicle & Contact Information */}
      <div className="border-t border-brand-border pt-6 mb-8">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          4. Vehicle & Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="customer_name" className="block text-xs text-brand-grey mb-1">
              Your Full Name <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={customerName}
              onChange={(e: any) => setCustomerName(e.target.value)}
              placeholder="e.g. John Doe"
              required
              className="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs text-brand-grey mb-1">
              Phone Number <span className="text-brand-red">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
              placeholder="365-524-2003"
              required
              className="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-xs text-brand-grey mb-1">
              Email Address <span className="text-brand-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
            />
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-xs text-brand-grey mb-1">
              Vehicle (Year, Make, Model) <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="vehicle"
              name="vehicle"
              value={vehicle}
              onChange={(e: any) => setVehicle(e.target.value)}
              placeholder="e.g. 2018 Honda Civic"
              required
              className="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-xs text-brand-grey mb-1">
            Optional Note / Description of Problem
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e: any) => setNotes(e.target.value)}
            placeholder="Describe any symptoms, squeaks, warning lights, or specific requests..."
            className="w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm resize-none"
          ></textarea>
        </div>

        {/* Insurance Claim Checkbox */}
        <label className="flex items-start gap-3 p-3.5 rounded-card bg-brand-charcoal/60 border border-brand-border cursor-pointer hover:border-brand-grey/60 transition mb-4">
          <input
            type="checkbox"
            name="insurance_claim"
            checked={insuranceClaim}
            onChange={(e: any) => setInsuranceClaim(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-brand-red focus:ring-brand-red bg-brand-surface border-brand-border"
          />
          <div className="text-xs">
            <span className="font-semibold text-white block">I'm booking for a collision / insurance claim</span>
            <span className="text-brand-grey">We work directly with all major insurance companies for estimates and direct billing.</span>
          </div>
        </label>

        {/* Privacy Consent Checkbox */}
        <label className="flex items-start gap-3 p-3.5 rounded-card bg-brand-charcoal/60 border border-brand-border cursor-pointer hover:border-brand-grey/60 transition">
          <input
            type="checkbox"
            name="privacy_consent"
            checked={privacyConsent}
            onChange={(e: any) => setPrivacyConsent(e.target.checked)}
            required
            className="mt-0.5 w-4 h-4 rounded text-brand-red focus:ring-brand-red bg-brand-surface border-brand-border"
          />
          <span className="text-xs text-brand-grey">
            I consent to Royal Drive Mechanics storing my contact and vehicle details solely to manage this appointment, in compliance with PIPEDA and Canadian privacy standards.{' '}
            <a href="/privacy" target="_blank" className="text-brand-red underline">Read Privacy Policy</a>.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={submitting || !selectedTime}
          className={`w-full py-4 px-6 rounded-card text-base font-bold uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-red ${
            submitting || !selectedTime
              ? 'bg-brand-red/50 cursor-not-allowed'
              : 'bg-brand-red hover:bg-brand-red-hover shadow-glow-red hover:shadow-glow-red-lg'
          }`}
        >
          {submitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Confirming Your Slot...
            </>
          ) : (
            'Confirm Booking →'
          )}
        </button>

        <p className="text-xs text-center text-brand-grey mt-3">
          Instant on-screen confirmation with calendar sync. Free cancellation by phone at 365-524-2003.
        </p>
      </div>
    </form>
  );
}
