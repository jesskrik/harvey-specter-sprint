export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "list"; items: string[]; ordered?: boolean };

export type NewsPost = {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  author?: string;
  authorRole?: string;
  body: ArticleBlock[];
};

// Static placeholders — wire to Sanity once a `news` schema is added.
export const NEWS: NewsPost[] = [
  {
    slug: "2025-in-numbers",
    date: "2026.04.28",
    category: "Editorial",
    title: "Our 2025 in numbers",
    excerpt:
      "A short retrospective on the year — projects shipped, lessons learned, and the moments that mattered. Plus what we're focused on across the rest of 2026.",
    image: "/images/news-2.png",
    author: "Harvey Specter",
    authorRole: "Founder",
    body: [
      {
        type: "paragraph",
        text: "Every January we sit down with a notebook and ask the same question: what did we actually do last year? Not the headline projects. The whole arc — what shifted in the studio, what we got right, what we got wrong, and what we'd do differently if we ran the year again.",
      },
      {
        type: "paragraph",
        text: "Twelve engagements shipped in 2025. Five for returning clients, four for founders we'd never met before January, three for partner agencies bringing us in for specialist work. Roughly half were full brand systems; the rest split between web builds, campaign work, and editorial photography.",
      },
      { type: "subheading", text: "What worked" },
      {
        type: "list",
        items: [
          "Shorter discovery sprints — two weeks of structured questions instead of four weeks of meandering.",
          "Saying no to fixed-fee work below a threshold. Every fixed-fee under that line lost us money in 2024 and 2025.",
          "Pairing strategy and design from week one. The hand-off model never quite suited the kind of work we do.",
        ],
      },
      {
        type: "quote",
        text: "Scope discipline beats scope creep every time.",
        attribution: "what we kept saying out loud, all year",
      },
      { type: "subheading", text: "What didn't" },
      {
        type: "paragraph",
        text: "Two engagements we shouldn't have taken. In both cases the warning signs were obvious in the first call — misaligned timelines, pricing pushback that wasn't really about money, an unclear decision-maker on the client side. Both lessons we'd learned before. Both lessons we relearned anyway.",
      },
      {
        type: "image",
        src: "/images/news-1.png",
        alt: "Studio workspace",
        caption: "From the studio archive — March 2025.",
      },
      {
        type: "paragraph",
        text: "For 2026 we're sticking to a similar shape. Fewer engagements, deeper work. We've already filled the spring; summer slots open in May. If you're thinking about something, it's a good month to write.",
      },
    ],
  },
  {
    slug: "agency-976-collaboration",
    date: "2026.04.10",
    category: "Partnership",
    title: "Studio collaboration with Agency 976",
    excerpt:
      "We're partnering with Agency 976 on a multi-quarter brand programme spanning identity, web, and editorial photography. First work goes live in late summer.",
    image: "/images/work-3.png",
    author: "Harvey Specter",
    authorRole: "Founder",
    body: [
      {
        type: "paragraph",
        text: "We're delighted to announce a new partnership with Agency 976, the Paris-based creative shop, on a multi-quarter brand programme for one of their long-standing clients in the hospitality sector.",
      },
      {
        type: "paragraph",
        text: "The remit is end-to-end: a full identity refresh, a new editorial site, and an extended photography programme tracking the brand across its three flagship venues. Agency 976 leads strategy and account; the studio leads design and production.",
      },
      {
        type: "quote",
        text: "Clear lanes, mutual respect for craft, and a shared commitment to ship things we'd both put on a portfolio.",
      },
      {
        type: "paragraph",
        text: "It's the third time we've teamed up with the Agency 976 crew on a project of this scale. Each one teaches us something new about how the best agency-studio relationships work.",
      },
      {
        type: "paragraph",
        text: "First work goes live in late summer. We'll have a fuller write-up then.",
      },
    ],
  },
  {
    slug: "cyberpunk-caffe-launch",
    date: "2026.03.22",
    category: "Launch",
    title: "Cyberpunk Caffe goes live",
    excerpt:
      "Eight months of work shipped this week — a full brand system, editorial site, and launch campaign for one of our favourite hospitality clients.",
    image: "/images/work-2.png",
    body: [
      {
        type: "paragraph",
        text: "After eight months of work, Cyberpunk Caffe is officially live — full brand system, editorial site, and the first wave of campaign assets all out in the world this week.",
      },
      {
        type: "paragraph",
        text: "The brief was unusual: a hospitality concept that wanted to feel like a magazine, not a menu. The challenge was building a system that could carry both the warmth of a coffee shop and the authority of an editorial publication, without one diluting the other.",
      },
      {
        type: "paragraph",
        text: "The answer landed in the typography. A single italic display face used at extreme scales, paired with a quiet mono caption family for everything functional. The result is a brand that reads as one voice across a coffee cup, a website, and a poster.",
      },
      {
        type: "paragraph",
        text: "Full case study in the projects archive. The launch campaign continues across April and May.",
      },
    ],
  },
  {
    slug: "webby-awards-2026",
    date: "2026.03.05",
    category: "Event",
    title: "Speaking at Webby Awards 2026",
    excerpt:
      "Joining a panel on independent studios and the art of saying no — what scope discipline actually looks like, and why it makes the work better.",
    image: "/images/news-1.png",
    body: [
      {
        type: "paragraph",
        text: "Honoured to be joining a panel at the Webby Awards 2026 in May, alongside three studio leads we've admired for years. The topic: the art of saying no — what scope discipline actually looks like in practice, and why it tends to make the work better, not smaller.",
      },
      {
        type: "paragraph",
        text: "It's a conversation we've wanted to have publicly for a while. Most studio writing is about how to take on more, do more, deliver more. Almost none of it is about the equally important inverse — when to hold a line, when to walk away, and how to do both without burning the relationship.",
      },
      {
        type: "paragraph",
        text: "If you're attending the event, find us at the panel. If not, we'll publish a long-form version of the conversation on the blog in late May.",
      },
    ],
  },
  {
    slug: "surfers-paradise-press",
    date: "2026.02.18",
    category: "Press",
    title: "Surfers Paradise featured in Brand New",
    excerpt:
      "Our identity work for Surfers Paradise gets a write-up on Under Consideration. A small thrill, an enormous compliment — read the full piece.",
    image: "/images/work-1.png",
    body: [
      {
        type: "paragraph",
        text: "Brand New picked up our work for Surfers Paradise this week, and it's a piece worth reading whether you saw the original launch or not. Armin's review is generous and detailed, and the comments — once you scroll past the obligatory pile-on — have a few sharp observations we hadn't considered.",
      },
      {
        type: "paragraph",
        text: "The Brand New write-up coincided with the Surfers Paradise team rolling out the second phase of the rollout: print collateral, retail signage, and the first run of co-branded merchandise. All of it built on the system we shipped in late 2025.",
      },
      {
        type: "paragraph",
        text: "Press is a small thrill, an enormous compliment, and almost never the point. But this one made our week.",
      },
    ],
  },
  {
    slug: "studio-launch",
    date: "2026.01.10",
    category: "Studio",
    title: "H.Studio opens its doors in Chicago",
    excerpt:
      "After a year of freelance work and quiet planning, the studio is officially open. New website, new home base, same standards.",
    image: "/images/news-3.png",
    author: "Harvey Specter",
    authorRole: "Founder",
    body: [
      {
        type: "paragraph",
        text: "After a year of running freelance projects out of a coffee shop and quietly planning what came next, H.Studio is officially open. New website launching alongside this post, a small permanent home base on the South Side, and a slate of work already in progress.",
      },
      {
        type: "paragraph",
        text: "The decision to formalise the studio was the result of a slow conclusion — that the kind of work we wanted to do consistently was bigger than what made sense for a one-name freelancer. Brand systems, web builds, editorial campaigns. Things that benefit from a studio container, even a small one.",
      },
      {
        type: "paragraph",
        text: "We're staying small on purpose. A founder, a regular cast of trusted collaborators, no permanent expansion plans. The aim is to be the studio that's exactly the right size for the work — not bigger, not smaller.",
      },
      {
        type: "paragraph",
        text: "Welcome. Have a look around.",
      },
    ],
  },
];
