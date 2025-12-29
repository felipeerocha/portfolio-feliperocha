export const TechBadge = ({ name }: { name: string }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md transition hover:border-accent/50 hover:text-accent">
    {name}
  </span>
);