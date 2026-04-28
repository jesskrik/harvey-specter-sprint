export default function ImageBreak() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ── Mobile — portrait crop, image shifted left so face is centred ── */}
      <div className="md:hidden relative aspect-[375/558]">
        <img
          src="/images/camera.png"
          alt=""
          className="absolute h-full max-w-none top-0"
          style={{ left: "-36.41%", width: "213.34%" }}
        />
      </div>

      {/* ── Desktop — full bleed, native aspect ratio ── */}
      <div className="hidden md:block relative aspect-[1062/697]">
        <img
          src="/images/camera.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      </div>

    </section>
  );
}
