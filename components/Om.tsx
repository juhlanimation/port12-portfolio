import Image from "next/image";
import { siteContent, assets } from "@/lib/config";

// Reusable text block component (DRY)
function AboutTextBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`corner-border ${className}`}>
      <p className="font-body leading-relaxed text-foreground text-justify">
        {siteContent.about}
      </p>
    </div>
  );
}

// Mobile image component
interface MobileImageProps {
  src: string;
  alt: string;
  aspect: string;
  width: string;
  align: "start" | "end";
}

function MobileImage({ src, alt, aspect, width, align }: MobileImageProps) {
  return (
    <div className={`flex ${align === "end" ? "justify-end" : "justify-start"}`}>
      <div className="relative" style={{ width, aspectRatio: aspect }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={width}
        />
      </div>
    </div>
  );
}

export function Om() {
  const mobileImages = assets.images.om.mobile;

  return (
    <section id="om" className="bg-background relative overflow-hidden">
      {/* Mobile/Tablet Layout - vertical flexbox */}
      <div className="lg:hidden px-6 sm:px-12 md:px-20 py-16 md:py-24 flex flex-col gap-8 md:gap-24">
        {/* Text block - centered, constrained width */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="w-full max-w-md md:max-w-lg">
            <AboutTextBlock className="p-4 text-base" />
          </div>
        </div>

        {/* Images - alternating alignment */}
        {mobileImages.map((img, index) => (
          <MobileImage
            key={img.src}
            src={img.src}
            alt={img.alt}
            aspect={img.aspect}
            width={img.width}
            align={index % 2 === 0 ? "end" : "start"}
          />
        ))}
      </div>

      {/* Desktop Layout - scattered collage (lg+)
          All containers use vw units, content fits within */}
      <div className="hidden lg:block relative overflow-hidden h-[74vw]">

        {/* Text block - top left */}
        <div
          className="absolute w-[28vw] h-[16vw] origin-top-left"
          style={{ top: '5vw', left: '20vw' }}
        >
          <div className="w-full h-full flex items-center">
            <AboutTextBlock className="p-[1vw] text-[1.1vw]" />
          </div>
        </div>

        {/* Image 1 - portrait, top right */}
        <div
          className="absolute w-[32vw] h-[23vw] origin-top-left"
          style={{ top: '6vw', left: '56vw' }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/1.webp"
              alt="Port12 medlemmer"
              fill
              className="object-contain object-top"
              sizes="28vw"
            />
          </div>
        </div>

        {/* Image 2 - people at gate, below paragraph left */}
        <div
          className="absolute w-[28vw] h-[18vw] origin-top-left"
          style={{ top: '30vw', left: '8vw' }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/2.webp"
              alt="Port12 fællesskab event"
              fill
              className="object-contain object-left"
              sizes="22vw"
            />
          </div>
        </div>

        {/* Image 3 - center-right */}
        <div
          className="absolute w-[26vw] h-[17vw] origin-top-left"
          style={{ top: '38vw', left: '52vw' }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/3.webp"
              alt="Port12"
              fill
              className="object-contain object-left"
              sizes="22vw"
            />
          </div>
        </div>

        {/* Image 4 - bottom left */}
        <div
          className="absolute w-[24vw] h-[18vw] origin-top-left"
          style={{ top: '56vw', left: '14vw' }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/4.webp"
              alt="Port12"
              fill
              className="object-contain object-left"
              sizes="24vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
