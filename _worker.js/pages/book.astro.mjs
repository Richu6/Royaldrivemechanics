globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BfFI7yxH.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CBF2eo35.mjs';
import { d, h, u } from '../chunks/jsxRuntime.module_CUMDQ0x3.mjs';
import { g as generateIcsDataUrl } from '../chunks/ics_DiaXBE1A.mjs';
import { S } from '../chunks/_@astro-renderers_CfQf9S2F.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_CfQf9S2F.mjs';
import { s as seoData } from '../chunks/seo_y-YGCs9Y.mjs';
import { b as businessConfig } from '../chunks/business_C17_wgfw.mjs';

function BookingWidget({
  initialService = "",
  turnstileSiteKey = ""
}) {
  const [selectedService, setSelectedService] = d(initialService);
  const [selectedDate, setSelectedDate] = d("");
  const [selectedTime, setSelectedTime] = d("");
  const [slots, setSlots] = d([]);
  const [loadingSlots, setLoadingSlots] = d(false);
  const [slotsError, setSlotsError] = d("");
  const [customerName, setCustomerName] = d("");
  const [phone, setPhone] = d("");
  const [email, setEmail] = d("");
  const [vehicle, setVehicle] = d("");
  const [notes, setNotes] = d("");
  const [insuranceClaim, setInsuranceClaim] = d(false);
  const [privacyConsent, setPrivacyConsent] = d(false);
  const [honeypot, setHoneypot] = d("");
  const [submitting, setSubmitting] = d(false);
  const [formError, setFormError] = d("");
  const [confirmation, setConfirmation] = d(null);
  h(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("service");
      if (s) {
        setSelectedService(s);
      }
    }
  }, []);
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const maxDate = /* @__PURE__ */ new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split("T")[0];
  h(() => {
    if (!selectedDate) {
      setSlots([]);
      setSelectedTime("");
      return;
    }
    let isMounted = true;
    setLoadingSlots(true);
    setSlotsError("");
    setSelectedTime("");
    fetch(`/api/availability?date=${selectedDate}`).then((res) => res.json()).then((data) => {
      if (!isMounted) return;
      setLoadingSlots(false);
      if (data.error) {
        setSlotsError(data.error);
        setSlots([]);
      } else if (data.slots) {
        setSlots(data.slots);
      }
    }).catch((err) => {
      if (!isMounted) return;
      setLoadingSlots(false);
      setSlotsError("Could not check availability. Please verify your connection or call us directly.");
    });
    return () => {
      isMounted = false;
    };
  }, [selectedDate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!selectedService) {
      setFormError("Please select a service.");
      return;
    }
    if (!selectedDate) {
      setFormError("Please select an appointment date.");
      return;
    }
    if (!selectedTime) {
      setFormError("Please select an available time slot.");
      return;
    }
    if (!customerName || customerName.trim().length < 2) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!phone || phone.trim().length < 10) {
      setFormError("Please enter a valid Canadian phone number (e.g. 365-524-2003).");
      return;
    }
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!vehicle || vehicle.trim().length < 3) {
      setFormError("Please provide your vehicle year, make, and model (e.g. 2018 Honda Civic).");
      return;
    }
    if (!privacyConsent) {
      setFormError("You must agree to the privacy policy to submit a booking.");
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
        website: honeypot
        // Honeypot
      };
      const res = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitting(false);
        setFormError(data.error || "Booking could not be completed. Please try again.");
        if (data.error && data.error.includes("taken")) {
          fetch(`/api/availability?date=${selectedDate}`).then((r) => r.json()).then((d) => {
            if (d.slots) setSlots(d.slots);
          });
        }
        return;
      }
      setSubmitting(false);
      setConfirmation({
        reference: data.booking.reference,
        service: data.booking.service,
        slot_date: data.booking.slot_date,
        slot_time: data.booking.slot_time,
        displayTime: data.displayTime || selectedTime,
        formattedDate: data.formattedDate || selectedDate,
        customer_name: customerName,
        vehicle
      });
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: 150,
          behavior: "smooth"
        });
      }
    } catch (err) {
      setSubmitting(false);
      setFormError("A network error occurred. Please try again or call Mirshad directly at 365-524-2003.");
    }
  };
  if (confirmation) {
    const icsUrl = generateIcsDataUrl({
      reference: confirmation.reference,
      service: confirmation.service,
      slotDate: confirmation.slot_date,
      slotTime: confirmation.slot_time,
      customerName: confirmation.customer_name,
      vehicle: confirmation.vehicle
    });
    return u("div", {
      className: "bg-brand-surface border-2 border-brand-red rounded-card p-6 sm:p-10 shadow-glow-red text-center max-w-2xl mx-auto",
      children: [u("div", {
        className: "w-16 h-16 bg-brand-red/20 text-brand-red rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-brand-red/40",
        children: "✓"
      }), u("h2", {
        className: "text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight",
        children: "Your Slot Is Booked!"
      }), u("p", {
        className: "text-brand-grey text-sm mt-1",
        children: ["A confirmation email has been dispatched to ", u("strong", {
          className: "text-white",
          children: email
        }), "."]
      }), u("div", {
        className: "my-6 p-4 bg-brand-black/80 rounded-card border border-brand-border inline-block min-w-[280px]",
        children: [u("span", {
          className: "text-xs uppercase tracking-wider text-brand-grey block",
          children: "Booking Reference"
        }), u("span", {
          className: "text-2xl sm:text-3xl font-display font-bold text-brand-red tracking-wider block mt-1",
          children: confirmation.reference
        })]
      }), u("div", {
        className: "bg-brand-charcoal p-6 rounded-card border border-brand-border text-left max-w-md mx-auto mb-6 text-sm space-y-2.5",
        children: [u("div", {
          className: "flex justify-between border-b border-brand-border/60 pb-2",
          children: [u("span", {
            className: "text-brand-grey",
            children: "Service:"
          }), u("span", {
            className: "text-white font-medium",
            children: confirmation.service
          })]
        }), u("div", {
          className: "flex justify-between border-b border-brand-border/60 pb-2",
          children: [u("span", {
            className: "text-brand-grey",
            children: "Date & Time:"
          }), u("span", {
            className: "text-white font-bold text-brand-red",
            children: [confirmation.formattedDate, " at ", confirmation.displayTime]
          })]
        }), u("div", {
          className: "flex justify-between border-b border-brand-border/60 pb-2",
          children: [u("span", {
            className: "text-brand-grey",
            children: "Vehicle:"
          }), u("span", {
            className: "text-white font-medium",
            children: confirmation.vehicle
          })]
        }), u("div", {
          className: "flex justify-between",
          children: [u("span", {
            className: "text-brand-grey",
            children: "Location:"
          }), u("span", {
            className: "text-white font-medium text-right",
            children: "Unit 6, 2630 Royal Windsor Dr, Mississauga"
          })]
        })]
      }), u("div", {
        className: "flex flex-col sm:flex-row items-center justify-center gap-4",
        children: [u("a", {
          href: icsUrl,
          download: `rdm-appointment-${confirmation.reference}.ics`,
          className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-brand-charcoal hover:bg-brand-border border border-brand-border text-white text-sm font-semibold transition",
          children: "📅 Add to Calendar (.ics)"
        }), u("a", {
          href: "tel:+13655242003",
          className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-brand-red hover:bg-brand-red-hover text-white text-sm font-semibold transition shadow-glow-red",
          children: "📞 Call 365-524-2003 (Mirshad)"
        })]
      }), u("p", {
        className: "text-xs text-brand-grey mt-6",
        children: "Need to change or cancel? Please call us directly at 365-524-2003 as early as possible."
      })]
    });
  }
  return u("form", {
    method: "POST",
    action: "/api/book",
    onSubmit: handleSubmit,
    className: "bg-brand-surface border border-brand-border rounded-card p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto",
    noValidate: true,
    children: [u("div", {
      className: "hidden",
      "aria-hidden": "true",
      children: [u("label", {
        htmlFor: "website",
        children: "Leave this field blank"
      }), u("input", {
        type: "text",
        id: "website",
        name: "website",
        value: honeypot,
        onChange: (e) => setHoneypot(e.target.value),
        tabIndex: -1,
        autoComplete: "off"
      })]
    }), u("div", {
      className: "border-b border-brand-border pb-6 mb-8",
      children: [u("h2", {
        className: "text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight",
        children: "Book an Appointment"
      }), u("p", {
        className: "text-brand-grey text-sm mt-1",
        children: "Pick your service, select an available bay slot, and receive instant confirmation."
      })]
    }), formError && u("div", {
      className: "mb-6 p-4 rounded-card bg-red-950/80 border border-red-800 text-red-200 text-sm flex items-start gap-3",
      children: [u("span", {
        className: "text-brand-red font-bold text-lg leading-none",
        children: "⚠"
      }), u("div", {
        children: [u("p", {
          className: "font-semibold",
          children: "Notice"
        }), u("p", {
          children: formError
        })]
      })]
    }), u("div", {
      className: "mb-8",
      children: [u("label", {
        htmlFor: "service-select",
        className: "block text-sm font-semibold text-white uppercase tracking-wider mb-2",
        children: ["1. Select Service ", u("span", {
          className: "text-brand-red",
          children: "*"
        })]
      }), u("select", {
        id: "service-select",
        name: "service",
        value: selectedService,
        onChange: (e) => setSelectedService(e.target.value),
        required: true,
        className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm",
        children: [u("option", {
          value: "",
          children: "-- Choose a service --"
        }), u("option", {
          value: "All Oil Changes",
          children: "All Oil Changes (15% OFF Promo)"
        }), u("option", {
          value: "Brakes",
          children: "Brakes (15% OFF Promo)"
        }), u("option", {
          value: "Tune-Ups",
          children: "Tune-Ups"
        }), u("option", {
          value: "Suspension",
          children: "Suspension"
        }), u("option", {
          value: "Engine & Transmissions",
          children: "Engine & Transmissions"
        }), u("option", {
          value: "Safety Inspections & Certification",
          children: "Safety Inspections & Certification (MTO Licensed)"
        }), u("option", {
          value: "Collision Work / Collision Repairs",
          children: "Collision Work / Insurance Claims"
        })]
      })]
    }), u("div", {
      className: "mb-8",
      children: [u("label", {
        htmlFor: "slot-date",
        className: "block text-sm font-semibold text-white uppercase tracking-wider mb-2",
        children: ["2. Select Date ", u("span", {
          className: "text-brand-red",
          children: "*"
        })]
      }), u("input", {
        type: "date",
        id: "slot-date",
        name: "slot_date",
        min: todayStr,
        max: maxDateStr,
        value: selectedDate,
        onChange: (e) => setSelectedDate(e.target.value),
        required: true,
        className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm"
      }), u("p", {
        className: "text-xs text-brand-grey mt-1",
        children: "Open Mon–Sat 8:00 AM – 6:00 PM (Closed Sundays & statutory holidays). Book up to 60 days ahead."
      })]
    }), u("div", {
      className: "mb-8",
      children: [u("label", {
        className: "block text-sm font-semibold text-white uppercase tracking-wider mb-2",
        children: ["3. Select Time Slot ", u("span", {
          className: "text-brand-red",
          children: "*"
        })]
      }), !selectedDate ? u("p", {
        className: "text-sm text-brand-grey italic bg-brand-charcoal/50 p-4 rounded-card border border-brand-border/40",
        children: "Please pick a date first to see available workshop slots."
      }) : loadingSlots ? u("div", {
        className: "flex items-center gap-3 text-sm text-brand-grey p-4",
        children: [u("span", {
          className: "w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin"
        }), "Checking real-time bay availability..."]
      }) : slotsError ? u("p", {
        className: "text-sm text-red-400 bg-red-950/40 p-3 rounded-card border border-red-900",
        children: slotsError
      }) : slots.length === 0 ? u("p", {
        className: "text-sm text-brand-grey bg-brand-charcoal p-4 rounded-card border border-brand-border",
        children: "No slots available for this date. Please choose another date."
      }) : u("div", {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5",
        children: slots.map((s) => u("button", {
          type: "button",
          disabled: !s.available,
          onClick: () => setSelectedTime(s.time),
          className: `py-3 px-3 text-xs sm:text-sm font-semibold rounded-card border transition-all text-center focus:outline-none focus:ring-2 focus:ring-brand-red ${selectedTime === s.time ? "bg-brand-red border-brand-red text-white shadow-glow-red scale-102" : s.available ? "bg-brand-charcoal border-brand-border text-white hover:border-brand-red hover:bg-brand-charcoal/80" : "bg-brand-black border-brand-border/40 text-brand-grey/40 cursor-not-allowed line-through"}`,
          children: [s.displayTime, !s.available && u("span", {
            className: "block text-[10px] font-normal no-underline opacity-60",
            children: s.reason === "past_cutoff" ? "Past cutoff" : "Full"
          })]
        }, s.time))
      }), u("input", {
        type: "hidden",
        name: "slot_time",
        value: selectedTime
      })]
    }), u("div", {
      className: "border-t border-brand-border pt-6 mb-8",
      children: [u("h3", {
        className: "text-sm font-semibold text-white uppercase tracking-wider mb-4",
        children: "4. Vehicle & Contact Details"
      }), u("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4",
        children: [u("div", {
          children: [u("label", {
            htmlFor: "customer_name",
            className: "block text-xs text-brand-grey mb-1",
            children: ["Your Full Name ", u("span", {
              className: "text-brand-red",
              children: "*"
            })]
          }), u("input", {
            type: "text",
            id: "customer_name",
            name: "customer_name",
            value: customerName,
            onChange: (e) => setCustomerName(e.target.value),
            placeholder: "e.g. John Doe",
            required: true,
            className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
          })]
        }), u("div", {
          children: [u("label", {
            htmlFor: "phone",
            className: "block text-xs text-brand-grey mb-1",
            children: ["Phone Number ", u("span", {
              className: "text-brand-red",
              children: "*"
            })]
          }), u("input", {
            type: "tel",
            id: "phone",
            name: "phone",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            placeholder: "365-524-2003",
            required: true,
            className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
          })]
        })]
      }), u("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4",
        children: [u("div", {
          children: [u("label", {
            htmlFor: "email",
            className: "block text-xs text-brand-grey mb-1",
            children: ["Email Address ", u("span", {
              className: "text-brand-red",
              children: "*"
            })]
          }), u("input", {
            type: "email",
            id: "email",
            name: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "john@example.com",
            required: true,
            className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
          })]
        }), u("div", {
          children: [u("label", {
            htmlFor: "vehicle",
            className: "block text-xs text-brand-grey mb-1",
            children: ["Vehicle (Year, Make, Model) ", u("span", {
              className: "text-brand-red",
              children: "*"
            })]
          }), u("input", {
            type: "text",
            id: "vehicle",
            name: "vehicle",
            value: vehicle,
            onChange: (e) => setVehicle(e.target.value),
            placeholder: "e.g. 2018 Honda Civic",
            required: true,
            className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
          })]
        })]
      }), u("div", {
        className: "mb-4",
        children: [u("label", {
          htmlFor: "notes",
          className: "block text-xs text-brand-grey mb-1",
          children: "Optional Note / Description of Problem"
        }), u("textarea", {
          id: "notes",
          name: "notes",
          rows: 3,
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          placeholder: "Describe any symptoms, squeaks, warning lights, or specific requests...",
          className: "w-full bg-brand-charcoal border border-brand-border rounded-card px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-red text-sm resize-none"
        })]
      }), u("label", {
        className: "flex items-start gap-3 p-3.5 rounded-card bg-brand-charcoal/60 border border-brand-border cursor-pointer hover:border-brand-grey/60 transition mb-4",
        children: [u("input", {
          type: "checkbox",
          name: "insurance_claim",
          checked: insuranceClaim,
          onChange: (e) => setInsuranceClaim(e.target.checked),
          className: "mt-0.5 w-4 h-4 rounded text-brand-red focus:ring-brand-red bg-brand-surface border-brand-border"
        }), u("div", {
          className: "text-xs",
          children: [u("span", {
            className: "font-semibold text-white block",
            children: "I'm booking for a collision / insurance claim"
          }), u("span", {
            className: "text-brand-grey",
            children: "We work directly with all major insurance companies for estimates and direct billing."
          })]
        })]
      }), u("label", {
        className: "flex items-start gap-3 p-3.5 rounded-card bg-brand-charcoal/60 border border-brand-border cursor-pointer hover:border-brand-grey/60 transition",
        children: [u("input", {
          type: "checkbox",
          name: "privacy_consent",
          checked: privacyConsent,
          onChange: (e) => setPrivacyConsent(e.target.checked),
          required: true,
          className: "mt-0.5 w-4 h-4 rounded text-brand-red focus:ring-brand-red bg-brand-surface border-brand-border"
        }), u("span", {
          className: "text-xs text-brand-grey",
          children: ["I consent to Royal Drive Mechanics storing my contact and vehicle details solely to manage this appointment, in compliance with PIPEDA and Canadian privacy standards.", " ", u("a", {
            href: "/privacy",
            target: "_blank",
            className: "text-brand-red underline",
            children: "Read Privacy Policy"
          }), "."]
        })]
      })]
    }), u("div", {
      children: [u("button", {
        type: "submit",
        disabled: submitting || !selectedTime,
        className: `w-full py-4 px-6 rounded-card text-base font-bold uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-red ${submitting || !selectedTime ? "bg-brand-red/50 cursor-not-allowed" : "bg-brand-red hover:bg-brand-red-hover shadow-glow-red hover:shadow-glow-red-lg"}`,
        children: submitting ? u(S, {
          children: [u("span", {
            className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
          }), "Confirming Your Slot..."]
        }) : "Confirm Booking →"
      }), u("p", {
        className: "text-xs text-center text-brand-grey mt-3",
        children: "Instant on-screen confirmation with calendar sync. Free cancellation by phone at 365-524-2003."
      })]
    })]
  });
}

const $$Astro = createAstro("https://royaldrivemechanics.ca");
const $$Book = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Book;
  const seo = seoData.book;
  const initialService = Astro2.url.searchParams.get("service") || "";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo.title, "description": seo.description, "canonicalPath": seo.canonicalPath, "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Book a Slot", url: "/book" }
  ] }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-16 sm:py-20 bg-brand-black min-h-[85vh]"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Top Introduction --> <div class="text-center max-w-2xl mx-auto mb-10"> <div class="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface border border-brand-red/40 rounded-full text-xs text-white mb-3"> <span class="text-brand-red font-bold">Real-Time Bay Availability</span> · Mississauga
</div> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
Reserve Your Service Slot
</h1> <div class="w-16 h-1 bg-brand-red mx-auto mt-3 rounded-full"></div> <p class="text-sm sm:text-base text-brand-grey mt-4 leading-relaxed">
Select your service, choose an available 60-minute bay slot, and get instant confirmation. Never double-booked.
</p> </div> <!-- Main Booking Widget Preact Island --> ${renderComponent($$result2, "BookingWidget", BookingWidget, { "client:load": true, "initialService": initialService, "client:component-hydration": "load", "client:component-path": "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/components/islands/BookingWidget", "client:component-export": "default" })} <!-- Assistance Callout --> <div class="max-w-2xl mx-auto mt-12 p-6 rounded-card bg-brand-charcoal border border-brand-border text-center text-xs text-brand-grey"> <p class="text-white font-medium text-sm mb-1">
Prefer booking over the phone or have emergency breakdown questions?
</p> <p class="mb-4">
Mirshad is available during workshop hours at <strong class="text-brand-red">${businessConfig.contact.phone}</strong>.
</p> <a${addAttribute(businessConfig.contact.phoneTel, "href")} class="inline-flex items-center gap-2 px-5 py-2.5 rounded-card bg-brand-surface hover:bg-brand-border border border-brand-border text-white text-xs font-bold transition">
📞 Call ${businessConfig.contact.phone} Now
</a> </div> </div> </section> ` })}`;
}, "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/book.astro", void 0);

const $$file = "C:/Users/sebin/OneDrive/Documents/Desktop/royaldrivemechanics/src/pages/book.astro";
const $$url = "/book";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Book,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
