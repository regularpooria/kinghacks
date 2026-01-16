import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MonthData } from "@/lib/data";
import { Quote } from "lucide-react";

interface MonthSectionProps {
  data: MonthData;
  index: number;
}

export function MonthSection({ data, index }: MonthSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects for different elements
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      id={data.id}
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Visual Content (Moves with Scroll) */}
        <motion.div
          style={{ y: yImage, opacity, scale }}
          className="relative group order-2 lg:order-1"
        >
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex gap-4">
             <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={data.images[0]} 
                  alt={data.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
             </div>
             {data.images[1] && (
               <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-12">
                  <img 
                    src={data.images[1]} 
                    alt={data.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
               </div>
             )}
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          style={{ y: yText, opacity }}
          className="space-y-10 order-1 lg:order-2"
        >
          <div className="space-y-4">
            <motion.span 
              className="text-primary text-glow font-bold tracking-[0.3em] uppercase text-xs"
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              whileInView={{ letterSpacing: "0.3em", opacity: 1 }}
            >
              {data.season}
            </motion.span>
            <h2 className="text-7xl md:text-9xl font-serif leading-none italic">
              {data.name}
            </h2>
          </div>

          <div className="space-y-8 max-w-lg">
            <div className="relative">
              <Quote className="absolute -top-6 -left-8 w-12 h-12 text-primary/10 -z-10" />
              <div className="space-y-4">
                {data.memory.map((sentence, i) => (
                  <p key={i} className="text-2xl text-foreground/90 font-serif leading-relaxed italic">
                    "{sentence}"
                  </p>
                ))}
              </div>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent" />

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                Intentions
              </h3>
              <p className="text-xl text-primary/90 font-medium">
                {data.resolution}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Large Background Number */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0"
      >
        <span className="text-[40vw] font-serif font-black text-white leading-none">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
      </motion.div>
    </section>
  );
}
