import { MonthSection } from "@/components/month-section";
import { months } from "@/lib/data";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@assets/stock_images/open_journal_noteboo_1ebef28d.jpg";
import { ReflectionsChat } from "@/components/reflection";
import { Ripple } from "@/components/ui/ripple"


const data = {"January": {"sentence": ["You brought autumn\u2019s spirit to life through intricate pumpkin carvings.", "You embraced the lively culture of Dublin with a joyful visit to the Guinness Brewery."], "paths": ["/pics/PXL_20241105_052926338.jpg", "/pics/PXL_20250613_114813418.jpg"], "intentions": "Continue exploring new places and expressing creativity throughout the year."}, "February": {"sentence": ["You gathered with friends in Ottawa, finding joy in simple games of poker.", "You shared laughter and connection over a spirited Monopoly game in Cornwall."], "paths": ["/pics/PXL_20241117_042132583.MP.jpg", "/pics/PXL_20250804_020546809.jpg"], "intentions": "Foster deeper relationships and make time for meaningful social moments."}, "March": {"sentence": ["You savored a peaceful meal at a sunlit caf\u00e9 in Avignon.", "You participated in an immigration event, embracing community in Ottawa."], "paths": ["/pics/PXL_20250604_183838165.jpg", "/pics/PXL_20250815_132757903.jpg"], "intentions": "Seek balance between personal enjoyment and contributing to your community."}, "April": {"sentence": ["You explored the rich history of France through its majestic monuments.", "You embraced quiet moments of reflection by the waterfront in Kingston."], "paths": ["/pics/PXL_20250605_105503394.jpg", "/pics/PXL_20251003_232003715.jpg"], "intentions": "Take time to appreciate history and find peace in quiet reflection."}, "May": {"sentence": ["You visited the iconic Louvre Pyramid, blending art and history in Paris.", "You engaged in professional growth at a formal event in Edmonton."], "paths": ["/pics/PXL_20250605_144006449.jpg", "/pics/PXL_20251005_192242139.MP.jpg"], "intentions": "Balance cultural exploration with career advancement this year."}, "June": {"sentence": ["You enjoyed the warm embrace of Italy\u2019s classic Margherita pizza.", "You proudly celebrated your Canadian citizenship, marking a new chapter."], "paths": ["/pics/PXL_20250605_164631460.jpg", "/pics/PXL_20251108_153720289.jpg"], "intentions": "Appreciate life\u2019s simple joys and honor new beginnings with pride."}, "July": {"sentence": ["You stood amidst Paris' grand halls, surrounded by timeless art and history.", "You connected with the echoes of the past through statues and ornate ceilings."], "paths": ["/pics/PXL_20250606_110127979.jpg"], "intentions": "Continue to seek knowledge and cultural enrichment in all your travels."}, "August": {"sentence": ["You paused by the Seine, letting the Eiffel Tower witness your thoughtful gaze.", "Your painted nails and silver chain caught the sun's gentle Parisian glow."], "paths": ["/pics/PXL_20250606_134402006.jpg"], "intentions": "Cherish moments of quiet reflection and express yourself authentically."}, "September": {"sentence": ["You captured the city's rhythm from a balcony overlooking the Seine.", "Your view painted a serene portrait of Parisian life and light."], "paths": ["/pics/PXL_20250607_110043096.jpg"], "intentions": "Embrace new perspectives and find beauty in everyday moments."}, "October": {"sentence": ["You stood beneath the Arc de Triomphe, marking a memorable Halloween night.", "Your peace sign shone brightly against the historic Parisian backdrop."], "paths": ["/pics/PXL_20250608_090325167.jpg"], "intentions": "Celebrate moments of joy and history, embracing life\u2019s unique experiences."}, "November": {"sentence": ["You carried the warmth of a freshly baked baguette through Parisian streets.", "Each step on the cobblestones whispered tales of simple pleasures and daily rhythms."], "paths": ["/pics/PXL_20250608_144201383.jpg"], "intentions": "Slow down to savor life\u2019s small, everyday joys and cultivate mindfulness."}, "December": {"sentence": ["You stood thoughtfully before London's Tower Bridge, amidst the chilly December air.", "The historic bridge framed your quiet reflection and sense of place."], "paths": ["/pics/PXL_20250610_103010819.jpg"], "intentions": "Find serenity in moments of stillness and deepen your appreciation for the world around you."}};

const seasonMap: Record<string, "winter" | "spring" | "summer" | "autumn"> = {
  January: "winter",
  February: "winter",
  March: "spring",
  April: "spring",
  May: "spring",
  June: "summer",
  July: "summer",
  August: "summer",
  September: "autumn",
  October: "autumn",
  November: "autumn",
  December: "winter",
};

const monthsData = Object.entries(data).map(([name, monthData]) => ({
  id: name.toLowerCase(),
  name,
  season: seasonMap[name],
  images: monthData.paths,
  memory: monthData.sentence,
  resolution: monthData.intentions,
}));

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <main className="bg-background min-h-screen relative font-sans selection:bg-primary/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left shadow-[0_0_10px_hsl(var(--primary))]"
        style={{ scaleX }}
      />

      {/* Hero / Cover */}
      {/* <BubbleBackground
        interactive={false}
        className="absolute inset-0 flex items-center justify-center rounded-xl"
      /> */}
      <header className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          {/* <div
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(${heroImage})` }}
          /> */}
          <Ripple mainCircleSize={900} />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" /> */}
        </motion.div>

        <div className="relative z-20 text-center px-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-primary text-glow text-sm font-bold tracking-[0.5em] uppercase block mb-4">
              This year was special...
            </span>
            <h1 className="text-8xl md:text-[12rem] font-serif font-bold tracking-tighter leading-[0.8]">
              Your <span className="italic text-primary">Year</span>
              <br />
              In Review
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-muted-foreground max-w-xs mx-auto text-sm uppercase tracking-widest font-medium">
              Scroll to explore your history
            </p>
            <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent animate-bounce" />
          </motion.div>
        </div>
      </header>

      {/* Months - Infinite Scroll Style */}
      <div className="relative z-10">
        {monthsData.map((month, index) => (
          <MonthSection key={month.id} data={month} index={index} />
        ))}
      </div>

      {/* Chat section */}
      <ReflectionsChat />
      
      {/* Footer */}
      <footer className="h-[50vh] flex flex-col items-center justify-center text-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2 scale-150" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl md:text-8xl font-serif italic">
            The story continues.
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all uppercase tracking-widest text-xs"
          >
            Relive the magic
          </motion.button>
        </div>
      </footer>
    </main>
  );
}
