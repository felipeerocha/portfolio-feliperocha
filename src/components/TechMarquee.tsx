'use client';

const techs = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Postgres", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: ".NET", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
];

export const TechMarquee = ({ reverse = false }: { reverse?: boolean }) => {
  return (
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <div className={`flex gap-16 py-8 whitespace-nowrap ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
        {[...techs, ...techs].map((tech, i) => ( // Duplicado para loop infinito
          <div key={i} className="flex flex-col items-center gap-2 group">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(60,213,179,0.3)]">
              <img src={tech.url} alt={tech.name} className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs text-zinc-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};