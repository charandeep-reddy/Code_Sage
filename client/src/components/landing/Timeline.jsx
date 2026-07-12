import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Target,
  Trophy,
  Rocket,
} from "lucide-react";

const journey = [
  {
    icon: Code2,
    title: "Beginner",
    subtitle: "Start Your Coding Journey",
    description:
      "Build programming fundamentals with guided AI assistance.",
  },
  {
    icon: Brain,
    title: "Problem Solver",
    subtitle: "Master DSA",
    description:
      "Practice structured problem solving with personalized feedback.",
  },
  {
    icon: Target,
    title: "Interview Ready",
    subtitle: "Prepare With Confidence",
    description:
      "AI mock interviews, coding challenges and performance reports.",
  },
  {
    icon: Trophy,
    title: "Professional",
    subtitle: "Build Real Projects",
    description:
      "Develop production-level applications with AI mentorship.",
  },
  {
    icon: Rocket,
    title: "Software Engineer",
    subtitle: "Achieve Your Goal",
    description:
      "Become job-ready with strong coding skills and confidence.",
  },
];

function Timeline() {
  return (
    <section id="journey" className="relative overflow-hidden py-36">
      <div className="mx-auto max-w-[1200px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-semibold tracking-widest text-violet-400">
            YOUR JOURNEY
          </span>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Grow Into An Engineer
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
            CodeSage does not just review code. It guides your complete journey
            from beginner to professional software engineer.
          </p>
        </motion.div>

        <div className="relative mt-24">
          <div className="absolute bottom-0 left-8 top-0 w-1 rounded-full bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500" />

          <div className="space-y-16">
            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex gap-10"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_0_35px_rgba(139,92,246,.45)]">
                    <Icon className="text-white" size={30} />
                  </div>

                  <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40">
                    <span className="font-semibold text-violet-400">
                      Stage {index + 1}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                      {item.title}
                    </h3>

                    <h4 className="mt-2 text-lg text-blue-400">
                      {item.subtitle}
                    </h4>

                    <p className="mt-5 leading-8 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
