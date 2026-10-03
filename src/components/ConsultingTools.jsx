"use client";

import styles from "./ConsultingTools.module.css";

// Simple Icons CDN slugs — https://simpleicons.org
const tools = [
  { name: "Make.com",        slug: "make"          },
  { name: "n8n",             slug: "n8n"           },
  { name: "Zapier",          slug: "zapier"        },
  { name: "Airtable",        slug: "airtable"      },
  { name: "Supabase",        slug: "supabase"      },
  { name: "Notion",          slug: "notion"        },
  { name: "WhatsApp",        slug: "whatsapp"      },
  { name: "Twilio",          slug: "twilio"        },
  { name: "Stripe",          slug: "stripe"        },
  { name: "Razorpay",        slug: "razorpay"      },
  { name: "Next.js",         slug: "nextdotjs"     },
  { name: "React",           slug: "react"         },
  { name: "Python",          slug: "python"        },
  { name: "OpenAI",          slug: "openai"        },
  { name: "Gemini",          slug: "googlegemini"  },
  { name: "Resend",          slug: "resend"        },
  { name: "LangChain",       slug: "langchain"     },
  { name: "Tally",           slug: "tally"         },
  { name: "Meta Graph API",  slug: "meta"          },
  { name: "Ollama",          slug: "ollama"        },
  { name: "Ayrshare",        slug: "ayrshare"      },
  { name: "Cal.com",         slug: "caldotcom"     },
];

// Warm ivory color — #e8e3d8
const ICON_COLOR = "e8e3d8";

function LogoChip({ name, slug }) {
  return (
    <div className={styles.chip}>
      <div className={styles.iconWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${slug}/${ICON_COLOR}`}
          alt={name}
          width={28}
          height={28}
          className={styles.icon}
          onError={(e) => {
            // Fallback: hide img and show text monogram
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <span className={styles.fallback}>{name.slice(0, 2).toUpperCase()}</span>
      </div>
      <span className={styles.chipLabel}>{name}</span>
    </div>
  );
}

export default function ConsultingTools() {
  return (
    <section className={styles.section} id="tools">
      <div className={styles.header}>
        <div className={styles.eyebrow}>Stack</div>
        <p className={styles.intro}>
          Every tool below is something I&apos;ve deployed in production — not just experimented with.
          I pick based on what fits your infrastructure, budget, and team.
        </p>
      </div>

      {/* Marquee strip */}
      <div className={styles.track}>
        <div className={styles.fade} data-side="left" />
        <div className={styles.fade} data-side="right" />
        <div className={styles.reel}>
          {/* Two copies for seamless loop */}
          {[...tools, ...tools].map((t, i) => (
            <LogoChip key={`${t.slug}-${i}`} name={t.name} slug={t.slug} />
          ))}
        </div>
      </div>

      <p className={styles.note}>
        + whatever is already in your stack. I adapt to your environment — not the other way around.
      </p>
    </section>
  );
}
