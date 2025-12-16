import Image from "next/image";

// Dotted square with optional checkmark inside
function CheckBox({ checked }: { checked: boolean }) {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 dotted-box">
      {checked && (
        <Image
          src="/images/checkmark.webp"
          alt=""
          width={16}
          height={23}
          className="object-contain absolute -top-2 left-0.5"
        />
      )}
    </div>
  );
}

// Dash/line for unavailable features
function DashMark() {
  return (
    <div className="inline-flex items-center justify-center w-5 h-5">
      <Image
        src="/images/dash.webp"
        alt=""
        width={8}
        height={2}
        className="object-contain"
      />
    </div>
  );
}

export function Medlemskab() {
  const features = [
    { name: "PRIS PR. MÅNED", flex: "1.300 DKK, ex moms", allIn: "2.000 DKK, ex moms" },
    { name: "FRI ADGANG 24/7", flex: true, allIn: true },
    { name: "EGEN NØGLE", flex: true, allIn: true },
    { name: "WI-FI (1000 MBIT)", flex: true, allIn: true },
    { name: "KØKKEN & TOILET", flex: true, allIn: true },
    { name: "PRINTER & SCANNER", flex: true, allIn: true },
    { name: "BORD & STOL", flex: true, allIn: true },
    { name: "MØDELOKALE", flex: "ANDEN PRIORITET", allIn: "FØRSTE PRIORITET" },
    { name: "EKSTERN SKÆRM", flex: "HVIS LEDIG", allIn: true },
    { name: "EGEN FAST PLADS", flex: "dash", allIn: true },
    { name: "REOL PLADS", flex: "dash", allIn: true },
  ];

  const renderCell = (value: boolean | string) => {
    if (value === "dash") return <DashMark />;
    if (typeof value === "string") return value;
    return <CheckBox checked={value} />;
  };

  return (
    <section id="medlemskab" className="section bg-background text-foreground relative">
      <div className="h-full flex flex-col justify-start px-12 sm:px-20 md:px-32 lg:px-48 pt-12 pb-8">

        {/* Top section - Three columns to align with table */}
        <div className="w-full mb-8">
          <div className="grid grid-cols-3 gap-8">

            {/* Empty first column to match table layout */}
            <div />

            {/* FLEX Column */}
            <div className="flex flex-col items-center text-center">
              {/* Illustration placeholder */}
              <div className="w-120 h-90 mb-0 relative">
                <Image
                  src="/images/flex-illustration.webp"
                  alt="FLEX membership"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-title text-7xl font-black tracking-tight mb-3 w-full max-w-xs">FLEX</h3>
              <p className="font-body text-sm leading-relaxed max-w-xs text-justify">
                Frihed og fleksibilitet - betal kun for adgang ikke for plads (men husk lige at rydde op når du daffer hjem.)
              </p>
            </div>

            {/* ALL-IN Column */}
            <div className="flex flex-col items-center text-center">
              {/* Illustration placeholder */}
              <div className="w-120 h-90 mb-0 relative">
                <Image
                  src="/images/allin-illustration.webp"
                  alt="ALL-IN membership"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-title text-7xl font-black tracking-tight mb-3 w-full max-w-xs">ALL-IN</h3>
              <p className="font-body text-sm leading-relaxed max-w-xs text-justify">
                Find dig til rette i dit second home! Fast base og arbejdsplads uden bøvl og krav til at cleane bordet
              </p>
            </div>

          </div>
        </div>

        {/* Bottom section - Table */}
        <div className="w-full">
          <table className="w-full font-body uppercase tracking-wider">
            <tbody>
              {features.map((feature, index) => {
                const isPrice = index === 0;
                return (
                  <tr key={index} className="border-b border-white">
                    <td className="text-left py-3 w-1/3 text-[10px]">{feature.name}</td>
                    <td className={`text-center py-3 w-1/3 ${isPrice ? "text-sm font-bold" : "text-xs"}`}>
                      {renderCell(feature.flex)}
                    </td>
                    <td className={`text-center py-3 w-1/3 ${isPrice ? "text-sm font-bold" : "text-xs"}`}>
                      {renderCell(feature.allIn)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
