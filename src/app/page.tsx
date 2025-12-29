"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectModal } from "@/components/ProjectModal";

// --- DADOS ---
const career = [
  {
    role: "Systems Analyst",
    company: "OSM Consultoria",
    period: "2025 - Atual",
    desc: "Implementação de Chatbots com IA (LLMs) e dashboards estratégicos com Python.",
  },
  {
    role: "Software Developer",
    company: "Pontype",
    period: "2025 - Atual",
    desc: "Desenvolvimento Full Stack (FastAPI/React) de CMS e portais. Foco em arquitetura escalável e Mobile-First.",
  },
  {
    role: "Software Developer - FullStack",
    company: "Stefanini",
    period: "2024 - 2025",
    desc: "Arquitetura de Microsserviços .NET 8, BFF com NestJS e Microfrontends.",
  },
  {
    role: "Software Engineer",
    company: "Impercap",
    period: "2024 - 2025",
    desc: "Apps Mobile React Native, deploy em Cloud e backend Azure SQL.",
  },
];

const courses = [
  { name: "Scrum Fundamentals Certified (SFC)", org: "CertiProf" },
  { name: "Java Avançado & POO", org: "Curso Livre" },
  { name: "Gestão de Processos", org: "Curso Livre" },
  { name: "JavaScript/TypeScript Avançado", org: "Curso Livre" },
  { name: "Métodos Ágeis", org: "Curso Livre" },
];

const projects = [
  {
    title: "Austay PetHouse",
    desc: "Hospedagem de pets, projetada para facilitar a reserva de serviços.",
    longDesc:
      "Plataforma digital para hospedagem e cuidados de pets, desenvolvida com foco em escalabilidade e organização das regras de negócio, garantindo uma estrutura robusta, clara e preparada para crescimento, além de uma experiência confiável para os usuários.",
    tech: ["React/React Native", "Python", "FastAPI", "Expo"],
    link: "https://www.figma.com/design/kTafl1GK5hALsYCPkLO8Do/PetHOuse?node-id=14-104&t=CGJNv2XsXakCTs01-1",
    image: "/IMG/Home.png",
    challenges: [
      "Definição de arquitetura escalável, garantindo crescimento do sistema sem perda de performance.",
      "Alinhamento entre negócio, produto e tecnologia, assegurando entregas claras e bem priorizadas.",
      "Estruturação de fluxos e regras de negócio complexas, mantendo código organizado e sustentável.",
    ],
    repoLink: "https://github.com/felipeerocha/austay-frontendMobile",
  },
  {
    title: "Sistema Acadêmico UCB",
    desc: "Gestão de atividades complementares com foco em UX.",
    longDesc:
      "Este projeto consiste em uma plataforma digital para o controle de atividades complementares da UCB. Minha atuação foi em UI/UX Design, com foco na criação da experiência do usuário, definição de fluxos de navegação e desenvolvimento de interfaces claras e funcionais, facilitando o uso do sistema por alunos, coordenadores e secretarias.",
    tech: ["Figma", "UX/UI", "Design"],
    link: "https://www.figma.com/design/5iNOW6ry6jJsEyySZTXTMq/PROTOTIPO-APP-METODOS-AGEIS?node-id=0-1&t=YAIHmNg781hzBK1I-1",
    image: "/IMG/ATIVIDADE.png",
    challenges: [
      "Mapeamento de fluxos complexos de aprovação acadêmica.",
      "Criação de Design System consistente no Figma.",
      "Redução de cliques para o usuário final realizar cadastros.",
    ],
  },
  {
    title: "App Barber",
    desc: "Aplicativo de agendamento para barbearias com foco em UX",
    longDesc:
      "Aplicativo de agendamento para barbearias com foco em UX, projetado para tornar a marcação de horários rápida e intuitiva. A experiência do usuário prioriza poucos passos, clareza na escolha de serviços, barbeiros e horários, além de facilitar a organização da agenda dos profissionais.",
    tech: ["Figma", "UX/UI", "Design"],
    link: "https://www.figma.com/design/mYEWR9pZx9VpoIpa5CIxDu/Barbearia?node-id=0-1&t=YAIHmNg781hzBK1I-1",
    image: "/IMG/BARBER2.png",
    challenges: [
      "Redução de etapas no agendamento para aumentar conversão.",
      "Interface clara para escolha de serviços e barbeiros, evitando confusão.",
      "Visualização eficiente da agenda, melhorando organização e controle de horários.",
    ],
  },
  {
    title: "+DRUGMORE",
    desc: "Logística e vendas para redes farmacêuticas.",
    longDesc:
      "Aplicativo móvel para farmácias, desenvolvido para otimizar a compra de medicamentos e produtos de saúde por meio de uma plataforma moderna, escalável e intuitiva. O sistema integra backend robusto e interfaces bem definidas, garantindo performance, organização dos dados e uma experiência de uso simples e eficiente.",
    tech: ["SQL Server", "Docker", "React/React Native", ".NET", "Expo"],
    link: "https://www.figma.com/design/SZqyD56NcpQsSd3e2fTol9/Lab.-Banco-de-Dados---Farm%C3%A1cia---Entrega-03?node-id=0-1&t=YAIHmNg781hzBK1I-1",
    image: "/IMG/DRUG2.png",
    challenges: [
      "Arquitetura escalável e containerizada, garantindo estabilidade e fácil manutenção.",
      "Integração eficiente entre frontend e backend, assegurando fluidez e consistência dos dados.",
      "Interfaces claras e acessíveis, facilitando a navegação e o processo de compra.",
    ],
  },
  {
    title: "App Impercap Suporte",
    desc: "Suporte técnico em apenas alguns cliques",
    longDesc:
      "Aplicativo desenvolvido para oferecer suporte técnico a profissionais, centralizando instruções, orientações e informações sobre produtos, com foco em facilitar instalações, manutenções e reduzir erros em campo.",
    tech: ["Azure", "Docker", "React Native", ".NET", "Expo"],
    link: "https://play.google.com/store/apps/details?id=com.Impercap.app&pcampaignid=web_share",
    image: "/IMG/impercap.png",
    challenges: [
      "Centralização de informações técnicas, facilitando acesso rápido em campo.",
      "Organização clara de conteúdos e instruções, reduzindo dúvidas e retrabalho.",
      "Interface funcional e objetiva, otimizando o uso em ambientes operacionais.",
    ],
  },
  {
    title: "Painel CMS",
    desc: "Gestão de materiais e publicações simplificada.",
    longDesc:
      "Painel CMS desenvolvido para jornalistas, permitindo a criação, edição e gerenciamento de conteúdos de forma rápida e organizada, com foco em performance, usabilidade e controle editorial.",
    tech: ["Postgres", "Docker", "Python", "Tailwind"],
    link: "#",
    image: "/IMG/painel.png",
    challenges: [
      "Gestão eficiente de conteúdos e publicações, otimizando o fluxo editorial.",
      "Interface clara para edição e organização de páginas, reduzindo complexidade operacional.",
      "Estrutura escalável e modular, facilitando manutenção e evolução do sistema.",
    ],
  },
];

// Componente Separador
const TechDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-32 relative opacity-50">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-black border-x border-zinc-700"></div>
    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
    <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div>
  </div>
);

// Variantes de animação
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    // Listener para o movimento do mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scrollYProgress]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black overflow-x-hidden font-sans relative">
      {/* --- MOUSE SPOTLIGHT EFFECT --- */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(60, 213, 179, 0.06), transparent 80%)`,
        }}
      />

      {/* HEADER HUD (CORRIGIDO: MENU CENTRALIZADO ABSOLUTO) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "py-4 bg-black/80 backdrop-blur-xl border-zinc-800"
            : "py-8 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative">
          {" "}
          {/* Adicionado 'relative' aqui */}
          {/* LOGO INOVADORA - FR TECH */}
          <div className="group cursor-pointer flex items-center gap-1 font-mono text-xl font-bold tracking-tighter z-10">
            <span className="text-zinc-600 group-hover:text-accent transition-colors duration-300">
              &lt;
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:to-accent transition-all duration-300">
              FR
            </span>
            <span className="text-zinc-600 group-hover:text-accent transition-colors duration-300">
              /&gt;
            </span>
          </div>
          {/* NAV CENTRALIZADA (ABSOLUTE) */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400 absolute left-1/2 -translate-x-1/2">
            <a
              href="#about"
              className="hover:text-white transition hover:scale-105"
            >
              Sobre
            </a>
            <a
              href="#stack"
              className="hover:text-white transition hover:scale-105"
            >
              Tech
            </a>
            <a
              href="#projects"
              className="hover:text-white transition hover:scale-105"
            >
              Cases
            </a>
          </nav>
          {/* BOTÃO CRIATIVO (Efeito Líquido) */}
          <a
            href="https://wa.me/556199149491?text=Ol%C3%A1%2C+Felipe%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden px-6 py-2 rounded-full bg-transparent border border-white/20 text-sm font-bold transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(60,213,179,0.3)] z-10"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Fale Comigo
            </span>
            <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </a>
        </div>
      </header>

      {/* --- CAMADA DE FUNDO VIVO (AURORA ANIMADA) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[50%] opacity-20 blur-3xl animate-aurora bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#1a1a1a_50%,#000000_100%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-accent/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "-5s" }}
        ></div>
        <div className="absolute inset-0 bg-grid-small-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>

      {/* --- CAMADA DE ELEMENTOS DECORATIVOS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] w-24 h-24 rounded-full bg-zinc-800/50 backdrop-blur-md border border-white/5"
        />
        <motion.div
          animate={{ y: [0, 60, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full bg-accent/5 backdrop-blur-md border border-accent/10"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[15%] w-16 h-16 border border-white/5 bg-white/2"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[20%] w-12 h-12 border border-accent/10 bg-accent/2"
        />

        <div className="absolute top-1/2 left-0 w-[500px] h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent rotate-45 blur-xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -rotate-12 blur-xl opacity-30"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [20, -20] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          className="absolute top-[30%] left-[10%] font-mono text-xs text-accent/20"
        >
          &lt;System /&gt;
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [20, -20] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
          className="absolute bottom-[40%] right-[5%] font-mono text-xs text-purple-500/20"
        >
          {`{ deploy: true }`}
        </motion.div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20">
          <motion.div
            style={{ y: yHero, opacity: opacityHero }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1.5 }}
              className="mb-8 relative"
            >
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
              <span className="relative px-6 py-2 rounded-full border border-accent/30 bg-black/50 backdrop-blur text-sm text-accent font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(60,213,179,0.3)]">
                System Initialized
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-600 leading-[1.1]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Felipe Rocha
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mb-12 leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-white font-semibold">
                Software Engineer & Technical Product Manager.
              </span>
              <br />
              Não apenas escrevo código. Eu crio sistemas escaláveis e
              experiências memoráveis que resolvem problemas reais de negócio.
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explorar Projetos <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
              <a
                href="#about"
                className="px-8 py-4 border border-zinc-700 text-zinc-300 rounded-lg font-bold hover:bg-zinc-900 hover:text-white transition flex items-center gap-2"
              >
                Sobre a Máquina
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator (PULANDO) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }} // Animação Yoyo
            transition={{
              delay: 1.5,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
            <span className="text-[10px] uppercase tracking-widest">
              Scroll
            </span>
          </motion.div>
        </section>

        <TechDivider />

        {/* TECH CAROUSEL */}
        <section id="stack" className="py-10 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-accent"></span>
              Arsenal Tecnológico
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-accent"></span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <TechMarquee />
            <div className="mt-8 opacity-50 hover:opacity-100 transition duration-500">
              <TechMarquee reverse />
            </div>
          </motion.div>
        </section>

        <TechDivider />

        {/* SOBRE MIM & CARREIRA */}
        <section id="about" className="py-20 max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* COLUNA ESQUERDA: FOTO E INTRO */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group w-full max-w-md mx-auto"
              >
                {/* Moldura Tech */}
                <div className="absolute -inset-1 border border-zinc-800 rounded-2xl z-0 bg-zinc-900/50"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent -translate-x-2 -translate-y-2 z-20"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent translate-x-2 translate-y-2 z-20"></div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  <Image
                    src="/IMG/me2.jpeg"
                    alt="Felipe Rocha"
                    fill
                    className="object-cover transition duration-700 grayscale-0 group-hover:grayscale group-hover:scale-105"
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm relative overflow-hidden group hover:border-accent/30 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></div>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-white">
                  <GraduationCap className="text-accent" /> Formação & Cursos
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start border-b border-zinc-800 pb-2">
                    <span className="text-sm text-zinc-300">
                      Engenharia de Software
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      UCB (Em andamento)
                    </span>
                  </li>
                  {courses.map((course, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-start border-b border-zinc-800/50 pb-2 last:border-0 hover:pl-2 transition-all"
                    >
                      <span className="text-sm text-zinc-400">
                        {course.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* COLUNA DIREITA: CARREIRA E TEXTO */}
            <div className="lg:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4">
                  <Cpu className="text-accent w-10 h-10" /> Trajetória
                  Profissional
                </h2>

                <p className="text-lg text-zinc-400 leading-relaxed mb-12 border-l-2 border-accent/30 pl-6">
                  Minha abordagem combina a precisão técnica da engenharia com a
                  visão estratégica de gerenciamento. Não apenas escrevo código;
                  construo ecossistemas digitais que funcionam.
                </p>

                <div className="space-y-8 relative">
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-zinc-800 z-0"></div>

                  {career.map((job, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative z-10 pl-16 group"
                    >
                      <div className="absolute left-[10px] top-1 w-5 h-5 rounded-full border-4 border-black bg-zinc-700 group-hover:bg-accent transition-colors duration-300 shadow-[0_0_10px_black]"></div>

                      <div className="bg-zinc-900/20 p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 transform group-hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-accent transition">
                              {job.role}
                            </h3>
                            <span className="text-xs font-mono text-zinc-500 px-2 py-1 bg-black rounded border border-zinc-800">
                              {job.period}
                            </span>
                          </div>
                          <h4 className="text-zinc-400 font-medium mb-3">
                            @ {job.company}
                          </h4>
                          <p className="text-sm text-zinc-500 leading-relaxed">
                            {job.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <TechDivider />

        {/* PROJETOS (BENTO GRID - CORRIGIDO) */}
        <section
          id="projects"
          className="py-20 max-w-7xl mx-auto px-6 relative"
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-accent text-sm font-mono uppercase tracking-widest">
                <Code2 size={16} /> Selected Cases
              </div>
              <h2 className="text-5xl font-bold text-white">
                Projetos Recentes
              </h2>
            </div>
          </motion.div>

          {/* GRID CONFIGURADO PARA 3 COLUNAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[400px] gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                // LOGICA DE ZIG-ZAG PARA 6 ITENS:
                // Linha 1: (0: Span 2), (1: Span 1)
                // Linha 2: (2: Span 1), (3: Span 2)
                // Linha 3: (4: Span 2), (5: Span 1)
                className={`group relative ${
                  i === 0 || i === 3 || i === 4
                    ? "lg:col-span-2"
                    : "lg:col-span-1"
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <SpotlightCard className="h-full cursor-pointer overflow-hidden border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-500">
                  <div className="absolute inset-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <div className="mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase font-bold bg-white/10 border border-white/20 text-white px-2 py-1 rounded backdrop-blur-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 line-clamp-2 max-w-xl group-hover:text-white transition-colors">
                      {project.desc}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-0">
                      [ Acessar Dados ] <ChevronRight size={14} />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-small-white/[0.2]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />

          <motion.div
            className="relative z-10 max-w-3xl mx-auto px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              Ready to Deploy?
            </h2>
            <p className="text-xl text-zinc-400 mb-12">
              Vamos transformar sua ideia em código de alta performance.
            </p>

            <a
              href="mailto:felipe90rcha@hotmail.com"
              className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-full text-lg font-bold hover:bg-accent hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <Briefcase size={20} /> Iniciar Projeto
            </a>
          </motion.div>
        </section>

        <footer className="py-12 border-t border-zinc-900 bg-black text-center text-zinc-600 text-sm">
          <div className="flex justify-center gap-8 mb-6">
            {/* GitHub */}
            <a
              href="https://github.com/felipeerocha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6 hover:text-white cursor-pointer transition hover:scale-110" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/felipe-rocha-2a12b8239"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 hover:text-white cursor-pointer transition hover:scale-110" />
            </a>

            {/* E-mail */}
            <a href="mailto:felipe90rcha@hotmail.com">
              <Mail className="w-6 h-6 hover:text-white cursor-pointer transition hover:scale-110" />
            </a>
          </div>
          <p>© 2025 Felipe Rocha. Software Engineer</p>
        </footer>
      </div>

      <ProjectModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
