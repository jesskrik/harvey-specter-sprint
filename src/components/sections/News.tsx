type NewsItem = {
  img: string;
  description: string;
};

const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const NEWS_ITEMS: NewsItem[] = [
  { img: "/images/news-1.png", description: DESCRIPTION },
  { img: "/images/news-2.png", description: DESCRIPTION },
  { img: "/images/news-3.png", description: DESCRIPTION },
];

function ReadMore() {
  return (
    <button className="border-b border-black flex items-center gap-[10px] py-1 hover:opacity-70 transition-opacity">
      <span className="text-[14px] font-medium tracking-[-0.04em] text-black leading-none">
        Read more
      </span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
        <path
          d="M5 13 L13 5 M7 5 H13 V11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  );
}

function NewsCard({
  item,
  expanded = false,
  className = "",
  width,
}: {
  item: NewsItem;
  expanded?: boolean;
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={`flex flex-col gap-4 items-start ${className}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      <div className="w-full aspect-[353/469] overflow-hidden">
        <img
          src={item.img}
          alt=""
          className="size-full object-cover"
        />
      </div>
      <p
        className={`text-[14px] tracking-[-0.04em] leading-[1.3] text-[#1f1f1f] ${
          expanded ? "flex-1" : ""
        }`}
      >
        {item.description}
      </p>
      <ReadMore />
    </div>
  );
}

export default function News() {
  return (
    <section id="news" className="bg-[#f3f3f3]">

      {/* ── Mobile — heading + horizontal-scroll cards ── */}
      <div className="md:hidden py-16 px-4 flex flex-col gap-8">
        <h2
          className="font-light text-black uppercase"
          style={{
            fontSize: "32px",
            letterSpacing: "-0.08em",
            lineHeight: "0.86",
          }}
        >
          Keep up with my<br />latest news &amp;<br />achievements
        </h2>
        <div className="-mx-4 px-4 overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {NEWS_ITEMS.map((item, i) => (
              <NewsCard key={i} item={item} width={300} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop — rotated heading + 3 cards with vertical dividers ── */}
      <div className="hidden md:flex items-end justify-between py-[120px] px-8 gap-8">
        {/* Rotated heading */}
        <div className="flex w-[110px] h-[706px] items-center justify-center shrink-0">
          <div className="-rotate-90 whitespace-nowrap">
            <h2
              className="font-light text-black uppercase"
              style={{
                fontSize: "64px",
                letterSpacing: "-0.08em",
                lineHeight: "0.86",
              }}
            >
              <span className="block">Keep up with my latest</span>
              <span className="block">news &amp; achievements</span>
            </h2>
          </div>
        </div>

        {/* 3 cards with dividers */}
        <div className="flex items-start gap-[31px] shrink-0">
          <NewsCard
            item={NEWS_ITEMS[0]}
            expanded
            className="w-[353px] h-[581px] shrink-0"
          />
          <div className="w-px self-stretch bg-black/30 shrink-0" />
          <NewsCard
            item={NEWS_ITEMS[1]}
            className="w-[353px] pt-[120px] shrink-0"
          />
          <div className="w-px self-stretch bg-black/30 shrink-0" />
          <NewsCard
            item={NEWS_ITEMS[2]}
            expanded
            className="w-[353px] h-[581px] shrink-0"
          />
        </div>
      </div>

    </section>
  );
}
