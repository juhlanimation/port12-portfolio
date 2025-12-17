import Image from "next/image";

export function Om() {
  return (
    <section id="om" className="bg-background relative overflow-hidden">
      {/* Mobile Layout - vertical flexbox */}
      <div className="md:hidden min-h-screen px-6 pt-24 pb-12 flex flex-col gap-12">
        {/* Text block - centered, full width */}
        <div className="flex justify-center">
          <div className="w-full">
            <div className="corner-border p-4">
              <p className="font-body text-sm leading-relaxed text-foreground text-justify">
                Port12 er et kontorfællesskab, men vi er sgu mere fællesskab end
                vi er kontor. Godt nok sidder vi meget på vores flade og tapper i
                tastaturerne, men vi går mere op i at spille hinanden gode ved at
                dele: viden, erfaring, opgaver og inspiration. Det er dén energi,
                du locker ind på hos Port12.
              </p>
            </div>
          </div>
        </div>

        {/* Image 1 - right aligned */}
        <div className="flex justify-end">
          <div className="w-[65%] aspect-[3/4] relative">
            <Image
              src="/images/844A8660.webp"
              alt="Port12 medlemmer"
              fill
              className="object-cover"
              sizes="65vw"
            />
          </div>
        </div>

        {/* Image 2 - left aligned */}
        <div className="flex justify-start">
          <div className="w-[70%] aspect-[3/2] relative">
            <Image
              src="/images/844A8495.webp"
              alt="Port12 arbejdsplads"
              fill
              className="object-cover"
              sizes="70vw"
            />
          </div>
        </div>

        {/* Image 3 - right aligned */}
        <div className="flex justify-end">
          <div className="w-[60%] aspect-[3/4] relative">
            <Image
              src="/images/1G4A5929.webp"
              alt="Port12 medlem"
              fill
              className="object-cover"
              sizes="60vw"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout - horizontal scrolling grid */}
      <div className="hidden md:block h-screen px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 py-24">
        <div className="grid grid-cols-[repeat(6,minmax(400px,1fr))] grid-rows-2 gap-x-48 gap-y-32 h-full">

          {/* Cell 1 - Text block, right aligned */}
          <div className="flex items-center justify-end">
            <div className="w-[300px] md:w-[360px]">
              <div className="corner-border p-3 md:p-4">
                <p className="font-body text-xs md:text-sm leading-snug text-foreground text-justify">
                  Port12 er et kontorfællesskab, men vi er sgu mere fællesskab end
                  vi er kontor. Godt nok sidder vi meget på vores flade og tapper i
                  tastaturerne, men vi går mere op i at spille hinanden gode ved at
                  dele: viden, erfaring, opgaver og inspiration. Det er dén energi,
                  du locker ind på hos Port12.
                </p>
              </div>
            </div>
          </div>

          {/* Cell 2 - Portrait image, bottom-right aligned */}
          <div className="flex items-end justify-end">
            <div className="w-[200px] md:w-[240px] aspect-[3/4] relative">
              <Image
                src="/images/844A8660.webp"
                alt="Port12 medlemmer"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          </div>

          {/* Cell 3 - Landscape image, right aligned */}
          <div className="flex items-end justify-end">
            <div className="w-[280px] md:w-[340px] aspect-[3/2] relative">
              <Image
                src="/images/844A8495.webp"
                alt="Port12 arbejdsplads"
                fill
                className="object-cover"
                sizes="340px"
              />
            </div>
          </div>

          {/* Cell 4 - Empty */}
          <div />

          {/* Cell 5 - Portrait image, top-right aligned */}
          <div className="flex items-start justify-end">
            <div className="w-[200px] md:w-[240px] aspect-[3/4] relative">
              <Image
                src="/images/1G4A5929.webp"
                alt="Port12 medlem"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          </div>

          {/* Cell 6 (row 1, col 6) - Landscape image */}
          <div className="flex items-center justify-start">
            <div className="w-[300px] md:w-[360px] aspect-[3/2] relative">
              <Image
                src="/images/1G4A3859.webp"
                alt="Port12 fællesskab"
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
          </div>

          {/* Cell 7 (row 2, col 1) - Party image, bottom-left aligned */}
          <div className="flex items-end justify-start">
            <div className="w-[320px] md:w-[400px] aspect-[3/2] relative">
              <Image
                src="/images/port12-fest.webp"
                alt="Port12 fællesskab event"
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
          </div>

          {/* Cell 8 (row 2, col 2) - Staircase image, right aligned */}
          <div className="flex items-center justify-end">
            <div className="w-[260px] md:w-[320px] aspect-[3/2] relative">
              <Image
                src="/images/1G4A2833.webp"
                alt="Port12 kontor interiør"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          </div>

          {/* Cell 9 - Empty */}
          <div />

          {/* Cell 10 - Portrait image, bottom-right aligned */}
          <div className="flex items-end justify-end">
            <div className="w-[180px] md:w-[220px] aspect-[2/3] relative">
              <Image
                src="/images/1G4A5899.webp"
                alt="Port12 kreativt rum"
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
          </div>

          {/* Cell 11 - Empty */}
          <div />

          {/* Cell 12 - Portrait image, right aligned */}
          <div className="flex items-start justify-end">
            <div className="w-[180px] md:w-[220px] aspect-[2/3] relative">
              <Image
                src="/images/1G4A3857.webp"
                alt="Port12 interiør"
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
