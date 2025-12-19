import { plans, getFeaturesForPlan, contact, siteContent, assets } from "@/lib/config";

// Clean minimal checkmark
function Check() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5L6.5 12L13 4" />
    </svg>
  );
}

// Division sign (÷)
function Division() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="8" cy="4" r="1.5" />
      <rect x="3" y="7" width="10" height="2" rx="1" />
      <circle cx="8" cy="12" r="1.5" />
    </svg>
  );
}

// Plus sign
function Plus() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M8 3V13M3 8H13" />
    </svg>
  );
}

// Feature icon component - Single Responsibility
function FeatureIcon({ type, value }: { type?: "plus"; value: boolean }) {
  if (type === "plus") return <Plus />;
  if (!value) return <Division />;
  return <Check />;
}

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: { name: string; value: boolean; type?: "plus" }[];
  illustration: string;
}

function PlanCard({ name, price, description, features, illustration }: PlanCardProps) {
  return (
    <div className="flex flex-col items-center text-center py-6 md:p-6">
      {/* Illustration */}
      <img
        src={illustration}
        alt={`${name} illustration`}
        className="w-48 h-48 object-contain mb-4"
      />
      {/* Title & Price */}
      <h3 className="font-heading text-5xl font-black tracking-tight">{name}</h3>
      <p className="font-body text-lg font-semibold mt-1">{price}</p>
      <p className="font-body text-[10px] uppercase tracking-wider opacity-60">ex moms / måned</p>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed mt-3 mb-4 opacity-80 whitespace-pre-line">
        {description}
      </p>

      {/* Divider */}
      <div className="w-32 md:w-full h-px bg-foreground/20 mb-4" />

      {/* Features list - centered container, left-aligned content */}
      <div className="flex justify-center w-full">
        <ul className="space-y-2 text-left">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <FeatureIcon type={feature.type} value={feature.value} />
              <span className="font-body text-[11px] uppercase tracking-wide leading-tight">
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Medlemskab() {
  return (
    <section id="medlemskab" className="section h-auto! bg-background text-foreground">
      <div className="flex flex-col items-center justify-center px-6 pb-16 sm:px-12 md:px-20">

        {/* Cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-2xl">
          <PlanCard
            name={plans.flex.name}
            price={plans.flex.price}
            description={plans.flex.description}
            features={getFeaturesForPlan("flex")}
            illustration={plans.flex.illustration}
          />
          <PlanCard
            name={plans.allIn.name}
            price={plans.allIn.price}
            description={plans.allIn.description}
            features={getFeaturesForPlan("allIn")}
            illustration={plans.allIn.illustration}
          />
        </div>

        {/* Contact section */}
        <div className="mt-14 md:mt-24 flex flex-col items-center text-center max-w-sm">
          <img
            src={assets.images.kontaktIllustration}
            alt="Kontakt illustration"
            className="w-36 h-36 object-contain mb-4"
          />
          <h3 className="font-heading text-5xl font-black tracking-tight">{siteContent.contactCta.title}</h3>
          <p className="font-body text-sm leading-relaxed opacity-80">
            {siteContent.contactCta.lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < siteContent.contactCta.lines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="nav-link font-body text-sm mt-6"
          >
            {contact.email}
          </a>
        </div>

      </div>
    </section>
  );
}
