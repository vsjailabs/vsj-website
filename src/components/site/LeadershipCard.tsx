import Image from "next/image";

function LinkedInGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export type Leader = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  expertise: readonly string[];
  linkedin: string | null;
  /** Optional path under /public to a square headshot (e.g. "/team/poonam-kumari.jpg"). */
  avatar?: string | null;
};

export function LeadershipCard({ person }: { person: Leader }) {
  return (
    <article
      className="group relative flex flex-col rounded-2xl border border-(--border) bg-(--surface-1) p-6 sm:p-7 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-(--brand-violet)/10 hover:border-(--brand-violet)/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex items-center gap-4">
        {person.avatar ? (
          <Image
            src={person.avatar}
            alt={`${person.name}, ${person.role}`}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover shadow-md shadow-(--brand-violet)/20 ring-2 ring-(--surface-1)"
            itemProp="image"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid place-items-center h-16 w-16 rounded-full text-white text-lg font-semibold tracking-wide bg-[linear-gradient(135deg,var(--brand-violet),var(--brand-blue)_55%,var(--brand-cyan))] shadow-md shadow-(--brand-violet)/20"
          >
            {person.initials}
          </div>
        )}
        <div className="min-w-0">
          <h3
            className="text-base sm:text-lg font-semibold tracking-tight text-(--foreground) truncate"
            itemProp="name"
          >
            {person.name}
          </h3>
          <p
            className="mt-0.5 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-(--brand-teal-text)"
            itemProp="jobTitle"
          >
            {person.role}
          </p>
        </div>
      </div>

      <p
        className="mt-5 text-sm leading-relaxed text-(--muted)"
        itemProp="description"
      >
        {person.bio}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {person.expertise.map((tag) => (
          <li
            key={tag}
            className="inline-flex items-center rounded-full border border-(--border) bg-(--surface-2) px-2.5 py-1 text-[11px] font-medium text-(--foreground)/80"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-5 border-t border-(--border) flex items-center justify-between">
        <span className="text-xs text-(--muted)">Leadership · VSJ AI Labs</span>
        {person.linkedin ? (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener"
            aria-label={`${person.name} on LinkedIn`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--muted) hover:text-(--brand-violet-2) hover:bg-(--surface-2) transition-colors"
            itemProp="sameAs"
          >
            <LinkedInGlyph />
          </a>
        ) : (
          <span
            aria-label={`LinkedIn profile coming soon for ${person.name}`}
            title="LinkedIn coming soon"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--muted)/50"
          >
            <LinkedInGlyph />
          </span>
        )}
      </div>
    </article>
  );
}
