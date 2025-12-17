
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

// Clean minimal dash
function Dash() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 8H12" />
    </svg>
  );
}

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: { name: string; value: boolean | string }[];
}

function PlanCard({ name, price, description, features }: PlanCardProps) {
  return (
    <div className="flex flex-col p-6">
      {/* Title & Price */}
      <h3 className="font-title text-4xl font-black tracking-tight">{name}</h3>
      <p className="font-body text-lg font-semibold mt-1">{price}</p>
      <p className="font-body text-[10px] uppercase tracking-wider opacity-60">ex moms / måned</p>

      {/* Description */}
      <p className="font-body text-xs leading-relaxed mt-3 mb-4 opacity-80">
        {description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-foreground/20 mb-4" />

      {/* Features list */}
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            {feature.value === false ? (
              <Dash />
            ) : (
              <Check />
            )}
            <span className="font-body text-[11px] uppercase tracking-wide leading-tight">
              {feature.name}
              {typeof feature.value === "string" && (
                <span className="opacity-60 normal-case block text-[10px]">{feature.value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Medlemskab() {
  const flexFeatures = [
    { name: "Fri adgang 24/7", value: true },
    { name: "Egen nøgle", value: true },
    { name: "Wi-Fi (1000 Mbit)", value: true },
    { name: "Køkken & toilet", value: true },
    { name: "Printer & scanner", value: true },
    { name: "Bord & stol", value: true },
    { name: "Mødelokale", value: "Anden prioritet" },
    { name: "Ekstern skærm", value: "Hvis ledig" },
    { name: "Egen fast plads", value: false },
    { name: "Reol plads", value: false },
  ];

  const allInFeatures = [
    { name: "Fri adgang 24/7", value: true },
    { name: "Egen nøgle", value: true },
    { name: "Wi-Fi (1000 Mbit)", value: true },
    { name: "Køkken & toilet", value: true },
    { name: "Printer & scanner", value: true },
    { name: "Bord & stol", value: true },
    { name: "Mødelokale", value: "Første prioritet" },
    { name: "Ekstern skærm", value: true },
    { name: "Egen fast plads", value: true },
    { name: "Reol plads", value: true },
  ];

  return (
    <section id="medlemskab" className="section h-auto! md:h-screen! bg-background text-foreground">
      <div className="h-full flex flex-col items-center justify-center px-6 py-16 md:py-0 sm:px-12 md:px-20">

        {/* Cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 w-full max-w-3xl">
          <PlanCard
            name="FLEX"
            price="1.300 DKK"
            description="Frihed og fleksibilitet - betal kun for adgang, ikke for plads."
            features={flexFeatures}
          />
          <PlanCard
            name="ALL-IN"
            price="2.000 DKK"
            description="Dit second home - fast plads uden krav om at rydde op."
            features={allInFeatures}
          />
        </div>

      </div>
    </section>
  );
}
