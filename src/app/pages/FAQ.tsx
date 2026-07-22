import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/mockData";
import { Link } from "react-router";

const faqCategories = ["All", ...Array.from(new Set(faqs.map(f => f.category)))];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>("f1");

  const filtered = activeCategory === "All" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Common Questions</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#7a7065]">
            Everything you need to know about dining at Grill & Thrill. Can't find your answer?{" "}
            <Link to="/contact" className="text-primary hover:underline">Contact our team</Link>.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap justify-center">
          {faqCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-[#0a0a0a]"
                  : "bg-[#141414] border border-[rgba(200,155,60,0.15)] text-[#7a7065] hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openId === faq.id
                  ? "border-[rgba(200,155,60,0.35)] bg-[#141414]"
                  : "border-[rgba(200,155,60,0.1)] bg-[#141414] hover:border-[rgba(200,155,60,0.25)]"
              }`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full mt-0.5 whitespace-nowrap flex-shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-sm font-medium text-[#f0ebe0] leading-relaxed">{faq.question}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openId === faq.id ? "border-primary bg-primary/10 text-primary" : "border-[rgba(200,155,60,0.2)] text-[#5a5040]"
                }`}>
                  {openId === faq.id ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t border-[rgba(200,155,60,0.1)]">
                      <p className="text-sm text-[#7a7065] leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-2xl text-center">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#f0ebe0] mb-2">Still have questions?</h3>
          <p className="text-sm text-[#7a7065] mb-6">Our team is happy to help with any enquiry, large or small.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="px-6 py-2.5 bg-primary text-[#0a0a0a] font-semibold text-sm rounded-lg hover:bg-[#d4a843] transition-all duration-300">
              Send a Message
            </Link>
            <a href="tel:+917890123456" className="px-6 py-2.5 border border-[rgba(200,155,60,0.3)] text-[#c8b89a] text-sm rounded-lg hover:border-primary hover:text-primary transition-all duration-300">
              +91 78901 23456
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
