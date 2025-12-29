'use client';
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  desc: string;
  longDesc: string;
  tech: string[];
  image: string;
  video?: string;
  link: string;
  challenges: string[];
  repoLink?: string; // NOVO CAMPO OPCIONAL (?)
}

export const ProjectModal = ({ 
  selectedProject, 
  onClose 
}: { 
  selectedProject: Project | null, 
  onClose: () => void 
}) => {
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  const dotColors = [
    "bg-accent shadow-[0_0_8px_rgba(60,213,179,0.8)]",
    "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
    "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
  ];

  return (
    <AnimatePresence>
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: 9999 }}
        >
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden border border-white/10 group"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white rounded-full hover:bg-accent hover:text-black transition-all duration-300 border border-white/10 backdrop-blur-sm"
            >
              <X size={20} />
            </button>

            {/* MÍDIA */}
            <div className="relative w-full h-[400px] bg-zinc-900 group-hover:shadow-[0_0_30px_rgba(60,213,179,0.1)] transition-shadow duration-500">
               {selectedProject.video ? (
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
                     <source src={selectedProject.video} type="video/mp4" />
                  </video>
               ) : (
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-90" />
               )}
               
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
               
               <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-accent text-black rounded-full shadow-[0_0_10px_rgba(60,213,179,0.4)]">
                            success case
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => (
                            <span key={t} className="px-3 py-1 text-xs font-medium text-zinc-300 bg-black/50 border border-white/10 rounded-md backdrop-blur-md">
                                {t}
                            </span>
                        ))}
                    </div>
                  </motion.div>
               </div>
            </div>

            {/* CONTEÚDO */}
            <div className="relative z-10 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-zinc-950/50 backdrop-blur-sm">
                
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                            <Layers className="text-accent" size={20} /> O Projeto
                        </h3>
                        <p className="text-zinc-400 leading-loose text-lg font-light text-justify">
                            {selectedProject.longDesc || selectedProject.desc}
                        </p>
                    </div>
                    
                    <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
                        <h3 className="text-lg font-bold text-white mb-4">Desafios & Soluções Técnicas</h3>
                        <ul className="space-y-3">
                            {selectedProject.challenges?.map((challenge, index) => (
                                <li key={index} className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dotColors[index % dotColors.length]}`}></span>
                                    {challenge}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 sticky top-4">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Acessar Projeto</h3>
                        
                        <a href={selectedProject.link} target="_blank" className="group flex items-center justify-center gap-3 w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(60,213,179,0.4)] mb-3">
                            <ExternalLink size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> 
                            Ver Online
                        </a>
                        
                        {/* CONDICIONAL: Só aparece se repoLink existir */}
                        {selectedProject.repoLink && (
                            <a 
                                href={selectedProject.repoLink} 
                                target="_blank"
                                className="group flex items-center justify-center gap-3 w-full bg-black text-white border border-zinc-700 py-4 rounded-xl font-medium hover:bg-zinc-900 hover:border-white/30 transition-all cursor-pointer"
                            >
                                <Github size={20} className="text-zinc-400 group-hover:text-white transition-colors" /> 
                                Repositório
                            </a>
                        )}

                        <p className="text-[10px] text-zinc-600 text-center mt-6">
                            © 2025 Felipe Rocha. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};