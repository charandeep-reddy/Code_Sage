import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Free",
    price: "₹0",
    features: [
      "Basic AI Code Reviews",
      "5 Reviews / Day",
      "Learning Roadmaps",
      "Community Support",
    ],
  },
  {
    title: "Pro",
    price: "₹499",
    popular: true,
    features: [
      "Unlimited Reviews",
      "Interview Preparation",
      "AI Mentor",
      "Progress Analytics",
      "Priority Support",
    ],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-36">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-violet-400 font-semibold tracking-widest">
            PRICING
          </span>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Simple Pricing
          </h2>

          <p className="mt-6 text-lg text-slate-400 sm:text-xl">
            Start free. Upgrade whenever you are ready.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">

          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              whileHover={{ y: -10 }}
              className={`rounded-3xl border p-10 backdrop-blur-xl ${
                plan.popular
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {plan.popular && (
                <span className="inline-block mb-6 rounded-full bg-violet-600 px-4 py-2 text-sm text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {plan.title}
              </h3>

              <div className="mt-4 text-4xl font-black text-white sm:text-5xl">
                {plan.price}
                <span className="text-lg text-slate-400"> / month</span>
              </div>

              <div className="mt-10 space-y-5">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="text-green-400" size={20} />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="mt-10 w-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-semibold text-white transition hover:scale-105">
                Choose Plan
              </button>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Pricing;
