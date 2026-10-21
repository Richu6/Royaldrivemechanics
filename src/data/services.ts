export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  leadTagline: string;
  shortDescription: string;
  fullDescription: string;
  longContent: string[];
  whatsIncluded: string[];
  signsYouNeedThis: string[];
  faqs: ServiceFAQ[];
  collisionSteps?: { step: number; title: string; description: string }[];
  icon: string;
  relatedServiceSlugs: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "oil-changes",
    slug: "oil-changes",
    name: "All Oil Changes",
    shortName: "Oil Changes",
    leadTagline: "Keep your engine clean and running smoothly.",
    shortDescription: "Regular oil and filter changes are vital to prolonging engine life, cooling critical components, and preventing premature friction wear in Mississauga driving conditions.",
    fullDescription: "At Royal Drive Mechanics, we provide fast, comprehensive oil change services tailored to your vehicle manufacturer's exact specifications. Whether your vehicle requires full synthetic, synthetic blend, high-mileage, or conventional motor oil, our technicians replace your oil and premium filter while performing a multi-point courtesy inspection on fluids, belts, and tire pressures.",
    longContent: [
      "Engine oil is the lifeblood of your vehicle. Over time, heat, stop-and-go traffic across the Greater Toronto Area, and cold Canadian winter mornings cause oil to break down and collect harmful deposits, carbon soot, and metal particles. Running on degraded oil increases internal engine friction, reduces fuel economy, and risks catastrophic component failure.",
      "At our Mississauga workshop on Royal Windsor Drive, we utilize only premium OEM-grade lubricants and high-filtration oil filters. Every oil service includes draining the old oil completely, inspecting the drain plug gasket, torquing fasteners to factory specs, and replenishing with the exact viscosity recommended by your automaker.",
      "In addition to the oil service, our technicians carry out a complimentary visual check on your air filter, cabin filter, brake fluid moisture, coolant strength, serpentine belt condition, and wiper blades to ensure complete road confidence."
    ],
    whatsIncluded: [
      "Complete engine oil drain and refill with OEM-spec synthetic, synthetic blend, or conventional oil",
      "New premium oil filter replacement",
      "Multi-point underhood fluid check (brake, transmission, coolant, power steering, washer fluids)",
      "Visual inspection of belts, hoses, steering linkages, and suspension components",
      "Tire pressure check and adjustment to factory PSI",
      "Maintenance reminder light reset"
    ],
    signsYouNeedThis: [
      "Engine oil light or maintenance reminder illuminated on your dashboard",
      "Dark, gritty, or sludgy oil visible on the dipstick",
      "Loud ticking, knocking, or excessive engine noise at idle",
      "Burning oil smell inside or around the vehicle cabin",
      "Exceeded 5,000 to 10,000 km or 6 months since your last service"
    ],
    faqs: [
      {
        question: "How often should I change the oil in my vehicle?",
        answer: "Most modern vehicles using full synthetic oil require changes every 8,000 to 12,000 km or every 6 months. However, severe Canadian driving conditions—such as cold winter starts, short urban trips, and frequent highway idling—often benefit from 6,000 to 8,000 km intervals."
      },
      {
        question: "What is the difference between synthetic and conventional oil?",
        answer: "Synthetic oil is chemically engineered with fewer impurities, providing superior thermal stability in extreme cold (-30°C) and hot summer operating temperatures, better engine protection, and longer service intervals compared to conventional mineral oils."
      },
      {
        question: "Do you reset my vehicle's service maintenance indicator?",
        answer: "Yes, our technicians reset the digital oil life monitor and maintenance reminder on your dashboard after every oil service."
      }
    ],
    icon: "oil-can",
    relatedServiceSlugs: ["tune-ups", "brakes", "engine-transmissions"]
  },
  {
    id: "tune-ups",
    slug: "tune-ups",
    name: "Tune-Ups",
    shortName: "Tune-Ups",
    leadTagline: "Better performance. Better fuel economy.",
    shortDescription: "Restore responsive acceleration, smooth engine idling, and peak fuel efficiency with comprehensive tune-up and ignition maintenance.",
    fullDescription: "A comprehensive engine tune-up at Royal Drive Mechanics cleans out performance sluggishness caused by fouled spark plugs, clogged air filters, and worn ignition coils. We inspect, diagnose, and replace vital ignition and intake components to bring your engine back to peak factory responsiveness.",
    longContent: [
      "Today's computer-controlled engines demand precise spark timing and calibrated fuel delivery. Over tens of thousands of kilometers, spark plug electrodes erode, ignition coils lose resistance, throttle bodies accumulate carbon varnish, and engine filters become restricted. The result is sluggish throttle response, reduced kilometers-per-litre, and occasional misfires.",
      "At RDM Mississauga, our tune-up service goes far beyond simply replacing spark plugs. We utilize advanced diagnostic scanning tools to evaluate live engine sensor parameters, fuel trims, oxygen sensor reactions, and ignition firing voltages.",
      "Whether you commute daily down the QEW or drive commercial routes in Mississauga, our tune-up packages keep your engine operating at its cleanest and most efficient."
    ],
    whatsIncluded: [
      "Computer diagnostic scan for pending and active trouble codes",
      "Iridium or platinum spark plug inspection and replacement to factory gap specs",
      "Ignition coil pack and ignition wire resistance testing",
      "Engine air filter and cabin air filter inspection and replacement",
      "Throttle body cleaning and carbon deposit removal",
      "Fuel injector cleaner treatment and idle speed calibration"
    ],
    signsYouNeedThis: [
      "Rough, vibrating, or stumbling idle when stopped at traffic lights",
      "Noticeable drop in fuel economy (fewer kilometers per tank)",
      "Sluggish acceleration or hesitation when pressing the gas pedal",
      "Intermittent engine misfire or flashing Check Engine Light",
      "Difficulty starting or prolonged cranking in cold weather"
    ],
    faqs: [
      {
        question: "When does my car need an engine tune-up?",
        answer: "Most modern cars with platinum or iridium plugs require tune-ups between 80,000 and 120,000 km. However, if you notice rough idling, decreased gas mileage, or hard starting, you should have it inspected sooner."
      },
      {
        question: "Will a tune-up turn off my Check Engine light?",
        answer: "If the Check Engine light is triggered by ignition misfires, worn spark plugs, or intake airflow issues, fixing those faults and clearing the ECU codes will resolve the warning."
      },
      {
        question: "How does a tune-up improve fuel economy?",
        answer: "Fresh spark plugs and a clean intake ensure complete combustion of the air-fuel mixture, preventing wasted unburnt fuel from exiting through the exhaust."
      }
    ],
    icon: "spark-plug",
    relatedServiceSlugs: ["oil-changes", "engine-transmissions", "safety-inspections"]
  },
  {
    id: "suspension",
    slug: "suspension",
    name: "Suspension",
    shortName: "Suspension",
    leadTagline: "A smoother ride starts with a solid suspension.",
    shortDescription: "Eliminate road clunks, improve highway stability, and maintain even tire wear with precision suspension and steering repairs.",
    fullDescription: "Potholes, winter frost heaves, and salt-treated roads take a heavy toll on struts, shocks, control arms, and ball joints. Royal Drive Mechanics provides expert steering and suspension diagnostics, component replacement, and ride comfort restoration.",
    longContent: [
      "Your vehicle's suspension system is responsible for more than just a smooth ride: it is critical for braking distance, steering control, and tire contact with the pavement. When struts, shocks, bushings, or tie rod ends wear out, your vehicle bounces uncontrollably, dives during emergency braking, and wanders unpredictably in highway ruts.",
      "At our Mississauga workshop on Royal Windsor Drive, we perform thorough mechanical inspections on all four corners of your vehicle. We test shock rebound, examine hydraulic seal leakage, check ball joint play, and inspect rubber control arm bushings for tearing and salt degradation.",
      "We install high-grade OEM and heavy-duty aftermarket suspension components to ensure your car handles securely in all seasons."
    ],
    whatsIncluded: [
      "Comprehensive steering and suspension safety inspection on vehicle lift",
      "Strut and shock absorber health and leak testing",
      "Ball joint, control arm, and bushing wear diagnostics",
      "Inner and outer tie rod end play inspection",
      "Sway bar link and stabilizer bar bushing evaluation",
      "Wheel bearing hub noise and play assessment"
    ],
    signsYouNeedThis: [
      "Clunking, popping, or rattling sounds when driving over bumps and uneven pavement",
      "Excessive bouncing, nose-diving during braking, or body roll in corners",
      "Vehicle pulls to one side on flat, straight roads",
      "Uneven or cupped tire tread wear across the inner or outer edges",
      "Loose or wandering steering wheel feeling at highway speeds"
    ],
    faqs: [
      {
        question: "How long do shocks and struts typically last?",
        answer: "In Ontario road conditions with winter potholes and road salt, shocks and struts generally last between 80,000 and 120,000 km before internal damping valves and rubber seals degrade."
      },
      {
        question: "Is it safe to drive with a worn suspension?",
        answer: "Driving on worn suspension components increases your emergency stopping distance by up to 20%, causes severe premature tire wear, and risks sudden separation of critical parts like ball joints or tie rods."
      },
      {
        question: "Do I need a wheel alignment after suspension repairs?",
        answer: "Yes, whenever steering or suspension components like struts, tie rods, or control arms are replaced, a wheel alignment is necessary to prevent tire scrubbing and pull."
      }
    ],
    icon: "suspension-spring",
    relatedServiceSlugs: ["brakes", "safety-inspections", "tune-ups"]
  },
  {
    id: "engine-transmissions",
    slug: "engine-transmissions",
    name: "Engine & Transmissions",
    shortName: "Engine & Transmissions",
    leadTagline: "Expert care for the heart of your vehicle.",
    shortDescription: "Specialized mechanical diagnostics, timing chain and belt services, transmission fluid flushes, and heavy driveline repairs.",
    fullDescription: "From check engine light troubleshooting and cooling system repairs to transmission diagnostics and mechanical rebuilds, Royal Drive Mechanics has the diagnostic gear and mechanical expertise to handle major automotive systems with total precision.",
    longContent: [
      "The engine and transmission represent the most complex and expensive mechanical systems in any motor vehicle. Minor symptoms like an unexpected gear slip, delayed engagement, subtle coolant leak, or intermittent timing rattle can quickly escalate into costly internal damage if ignored.",
      "At Royal Drive Mechanics, we prioritize honest, accurate diagnosis. We don't guess or throw parts at problems. Our technicians utilize professional scan tools, digital pressure gauges, borescope cameras, and smoke leak detectors to pinpoint the exact root cause of engine or transmission distress.",
      "Whether you require a transmission fluid exchange, a replacement radiator, a timing belt and water pump kit, cylinder head repair, or an entire driveline replacement, we provide clear written estimates before any work begins."
    ],
    whatsIncluded: [
      "Deep computer diagnostics including live powertrain data logging",
      "Automatic and manual transmission fluid checks and exchanges",
      "Cooling system pressure testing (radiator, water pump, thermostat, hoses)",
      "Timing belt and timing chain tensioner inspections and replacements",
      "Gasket leak detection (valve cover, oil pan, head gasket analysis)",
      "Engine mount and transmission mount integrity checks"
    ],
    signsYouNeedThis: [
      "Transmission slips, revs without accelerating, or jerks violently between gears",
      "Check engine light glowing or flashing on dashboard",
      "Puddles of red transmission fluid, pink coolant, or dark engine oil beneath your car",
      "Engine temperature gauge climbing into the hot red zone or steam from hood",
      "Rattling or metallic grinding noises coming from the engine bay"
    ],
    faqs: [
      {
        question: "Should transmission fluid ever be changed if it's labeled 'lifetime'?",
        answer: "Automaker 'lifetime' fluid claims often refer to the standard warranty period. For long-term vehicle longevity, transmission fluid breaks down under heat and should typically be serviced every 60,000 to 100,000 km."
      },
      {
        question: "Can I drive if my Check Engine light is flashing?",
        answer: "No. A flashing Check Engine light indicates an active severe misfire that can rapidly melt your catalytic converter and cause catastrophic engine damage. Pull over safely and arrange towing to our workshop."
      },
      {
        question: "Do you provide written estimates before starting engine or transmission work?",
        answer: "Yes, we always provide a detailed written estimate outlining the required parts and labor, and we never proceed with additional work without your explicit approval."
      }
    ],
    icon: "engine-gear",
    relatedServiceSlugs: ["oil-changes", "tune-ups", "safety-inspections"]
  },
  {
    id: "brakes",
    slug: "brakes",
    name: "Brakes",
    shortName: "Brakes",
    leadTagline: "Reliable stopping power, every time.",
    shortDescription: "High-grade brake pads, precision rotor resurfacing or replacement, caliper servicing, and brake fluid flushes for dependable stopping in any weather.",
    fullDescription: "Your vehicle's braking system is your primary line of defense on Ontario roads. At Royal Drive Mechanics, we inspect pads, rotors, drums, calipers, hardware, and hydraulic lines, using premium ceramic or semi-metallic friction materials designed for quiet operation and long lifespan.",
    longContent: [
      "Stopping safely under emergency conditions requires 100% brake hydraulic integrity and optimal friction between your pads and rotors. In Mississauga, winter road brine, salt spray, and stop-and-go highway congestion cause brake caliper sliders to seize, pad backing plates to rust, and brake rotors to develop heavy corrosion grooves.",
      "At RDM, we never perform slap-pad replacements. Every brake service includes measuring rotor thickness with precision micrometers, cleaning and lubricating caliper slide pins with high-temperature silicone grease, replacing anti-rattle hardware clips, and bleeding out old moisture-laden brake fluid.",
      "Take advantage of our current 15% off promotion on brake services to ensure your family's safety on the road."
    ],
    whatsIncluded: [
      "Full digital measurement of brake pad friction material thickness",
      "Brake rotor runout and thickness micrometer inspection",
      "Installation of premium ceramic or semi-metallic brake pads",
      "Rotor replacement or precision machining",
      "Brake caliper inspection, piston boot check, and slider pin lubrication",
      "Brake fluid moisture content test and complete hydraulic bleeding",
      "Emergency/parking brake linkage inspection and adjustment"
    ],
    signsYouNeedThis: [
      "High-pitched squealing, screeching, or harsh metallic grinding when stopping",
      "Brake pedal feels spongy, soft, or sinks all the way to the floor",
      "Steering wheel or brake pedal shakes and pulsates when braking from highway speeds",
      "Vehicle pulls noticeably to the left or right when brakes are applied",
      "Brake warning or ABS warning light illuminated on the dashboard"
    ],
    faqs: [
      {
        question: "How do I know if I need new brake rotors or just pads?",
        answer: "We measure your rotors with a micrometer. If the rotor thickness is above the manufacturer's discard minimum and free of deep rust grooves, heat spots, or warpage, they can often be reused. Otherwise, new rotors are required for safe stopping."
      },
      {
        question: "Why do my brakes squeak in the morning?",
        answer: "A light squeak on humid mornings is often just flash surface rust on the rotors being swept off by the pads during the first few stops. If the squealing persists continuously, your brake wear sensors are signaling that pad replacement is needed."
      },
      {
        question: "How long do typical brake pads last in Ontario?",
        answer: "Brake pads usually last between 40,000 and 70,000 km, depending on your driving style, city vs. highway ratio, and vehicle weight."
      }
    ],
    icon: "brake-disc",
    relatedServiceSlugs: ["suspension", "oil-changes", "safety-inspections"]
  },
  {
    id: "safety-inspections",
    slug: "safety-inspections",
    name: "Safety Inspections & Certification",
    shortName: "Safety Inspections",
    leadTagline: "Your safety is our priority.",
    shortDescription: "Official Ontario Ministry of Transportation (MTO) Licensed Motor Vehicle Inspection Station. Certified Vehicle Inspection Centre.",
    fullDescription: "Need an Ontario Safety Standards Certificate (SSC) to register a newly purchased used vehicle, transfer ownership, or certify an out-of-province automobile? Royal Drive Mechanics is a licensed MTO Motor Vehicle Inspection Station adhering strictly to Ontario passenger vehicle safety guidelines.",
    longContent: [
      "In Ontario, transferring a used vehicle or registering an automobile brought from another province requires an official Safety Standards Certificate issued by an authorized inspection station. At Royal Drive Mechanics, we operate as a fully accredited Licensed Motor Vehicle Inspection Station under the Ontario Ministry of Transportation.",
      "Our licensed technicians carry out systematic, impartial inspections across all regulated vehicle safety systems: braking performance, steering linkages, suspension joints, structural chassis integrity, exhaust emissions, lighting and electrical indicators, windshield wipers, tires, and seatbelt assemblies.",
      "If your vehicle passes, we issue the official certificate promptly. If any item does not meet Ministry specifications, we explain the findings clearly and provide an itemized estimate for the required repairs so you can pass re-inspection with zero hassle."
    ],
    whatsIncluded: [
      "Official Ontario Ministry of Transportation multi-point mechanical inspection",
      "Comprehensive brake system measurement (pad/shoe thickness and drum/rotor diameter)",
      "Steering, suspension, and ball joint mechanical tolerance testing",
      "Tire tread depth measurement and structural tire condition audit",
      "Exhaust system, catalytic converter, and emissions integrity check",
      "Body structure, subframe, and chassis rust perforation examination",
      "Exterior lighting, turn signal, defroster, and horn operation verification",
      "Official Ontario Safety Standards Certificate issuance upon passing"
    ],
    signsYouNeedThis: [
      "Buying or selling a used vehicle in the province of Ontario",
      "Transferring vehicle ownership between family members or private parties",
      "Registering an out-of-province vehicle with ServiceOntario",
      "Upgrading vehicle registration status from 'unfit' to 'fit'",
      "Pre-purchase peace-of-mind inspection before buying a private used car"
    ],
    faqs: [
      {
        question: "How long is an Ontario Safety Standards Certificate valid?",
        answer: "An Ontario Safety Standards Certificate is valid for 36 calendar days from the date of the inspection for registration purposes at ServiceOntario."
      },
      {
        question: "What happens if my vehicle does not pass the safety inspection?",
        answer: "Ontario regulations provide a 10-day period during which required repairs can be completed and the vehicle re-inspected at the same station without paying the full inspection fee again."
      },
      {
        question: "Does an MTO Safety Inspection include a vehicle warranty?",
        answer: "No. A safety inspection certifies that the vehicle met the minimum Ontario safety requirements on the exact day of inspection; it is not a warranty on overall mechanical longevity."
      }
    ],
    icon: "clipboard-check",
    relatedServiceSlugs: ["brakes", "suspension", "engine-transmissions"]
  },
  {
    id: "collision-repairs",
    slug: "collision-repairs",
    name: "Collision Work / Collision Repairs",
    shortName: "Collision Repairs",
    leadTagline: "We work directly with all major insurance providers.",
    shortDescription: "Complete auto body repair, collision restoration, and seamless insurance claim handling in Mississauga.",
    fullDescription: "From minor bumper scrapes, door dings, and fender repairs to major structural collision damage, Royal Drive Mechanics works directly with all major Canadian insurance companies to get you back on the road safely and stress-free.",
    longContent: [
      "Being involved in a traffic accident is stressful enough without having to navigate complicated insurance paperwork and repair logistics. At Royal Drive Mechanics, we take the headache out of collision repairs by working directly with your insurance adjuster.",
      "Our experienced body and mechanical technicians handle structural straightening, panel replacement, color-matched refinishing, and full mechanical re-alignment in-house. Because we are both a mechanical garage and a collision facility, we inspect and repair underlying steering, suspension, and sensor components that typical body shops might overlook.",
      "You have the legal right under Ontario insurance laws to choose the repair facility of your choice for insurance claims. Choose the dedicated care and precision of Royal Drive Mechanics."
    ],
    collisionSteps: [
      {
        step: 1,
        title: "Assessment & Damage Documentation",
        description: "We carefully inspect your vehicle's exterior panels, structural frame, and mechanical components, taking detailed photographic documentation of all damage."
      },
      {
        step: 2,
        title: "Insurance Estimate & Direct Coordination",
        description: "We prepare an itemized repair estimate and submit it directly to your insurance company adjuster to secure quick authorization without delay."
      },
      {
        step: 3,
        title: "Precision Body & Mechanical Repair",
        description: "Our certified technicians perform structural alignment, dent repairs, panel replacements, computer paint matching, and mechanical recalibration."
      },
      {
        step: 4,
        title: "Multi-Point Quality & Safety Check",
        description: "Before handing back your keys, we perform a comprehensive quality audit, road test, and final vehicle wash to ensure your vehicle is returned in pristine condition."
      }
    ],
    whatsIncluded: [
      "Direct coordination and electronic estimating with all major Canadian insurance providers",
      "Unibody and frame alignment assessment",
      "Bumper, fender, quarter panel, and door repair or replacement",
      "Computerized color-matched paint refinishing and clear coat blending",
      "Post-collision mechanical inspection (suspension, steering, alignment, radiators)",
      "ADAS sensor calibration and safety systems reset"
    ],
    signsYouNeedThis: [
      "Involved in an accident, collision, or parking lot impact",
      "Cracked, loose, or dented front or rear bumper cover",
      "Fender, hood, door, or quarter panel body creases and scratch damage",
      "Car pulls violently or handles abnormally after an impact",
      "Processing an insurance claim and need a trusted repair partner"
    ],
    faqs: [
      {
        question: "Do I have to use the body shop my insurance company recommends?",
        answer: "No. In Ontario, you have the absolute legal right to choose any licensed repair facility you trust. Insurance companies cannot force you to use their preferred supplier."
      },
      {
        question: "Can you help me deal with my insurance claim paperwork?",
        answer: "Yes, we work directly with all major insurance companies and handle communications, photographic estimates, and supplemental damage claims on your behalf."
      },
      {
        question: "Do you handle both mechanical damage and body work from an accident?",
        answer: "Yes! Because we are both a licensed mechanical workshop and collision repair center, we restore both cosmetic body panels and underlying suspension or mechanical components under one roof."
      }
    ],
    icon: "car-collision",
    relatedServiceSlugs: ["safety-inspections", "suspension", "brakes"]
  }
];
