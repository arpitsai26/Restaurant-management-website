import { Link } from "react-router";
import { motion } from "motion/react";
import { Award, Star, ArrowRight, CheckCircle } from "lucide-react";
import { chefs } from "../data/mockData";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
      <div className="w-1.5 h-1.5 bg-primary rotate-45" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center gap-1 mb-3">
      <p className="text-xs tracking-[0.4em] uppercase text-primary font-medium">{children}</p>
      <GoldDivider />
    </div>
  );
}

const timeline = [
  { year: "2013", event: "Grill & Thrill opens its doors in Bhubaneswar with Chef Arjun Kapoor at the helm." },
  { year: "2015", event: "Chef Isabella Romano joins, transforming the dessert menu and earning our first major award." },
  { year: "2017", event: "Expansion to 90 covers with the addition of the Private Cellar Room and Garden Terrace." },
  { year: "2019", event: "Featured in The Times, The Guardian and Condé Nast Traveller. First Michelin recognition." },
  { year: "2022", event: "Awarded our first Michelin Star. Chef Wei Zhang joins to lead the Asian cuisine portfolio." },
  { year: "2024", event: "Second Michelin Star awarded. Named Best Indian Fine Dining Restaurant by Zagat." },
];

const awards = [
  { title: "Michelin ★★", year: "2024", org: "Michelin Guide" },
  { title: "Best Indian Fine Dining", year: "2024", org: "Zagat Guide" },
  { title: "Restaurant of the Year", year: "2023", org: "The Times" },
  { title: "Best Chef of the Year", year: "2023", org: "Caterer & Hotelkeeper" },
  { title: "Outstanding Wine List", year: "2023", org: "Wine Spectator" },
  { title: "Sustainability Award", year: "2022", org: "Sustainable Restaurant Association" },
];

const values = [
  "Seasonally driven, farm-to-table sourcing from trusted UK and international producers",
  "Zero-waste kitchen philosophy with full composting and sustainable packaging",
  "Living wage employer — 100% of our team earn above London Living Wage",
  "Community partnerships with culinary schools to develop the next generation of chefs",
  "Carbon-neutral operations through certified offset programmes",
  "Named Best Employer in Hospitality 2023 by the People 1st Foundation",
];

export default function About() {
  return (
    <div className="bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-2">Our Heritage</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl font-bold text-white">About Grill & Thrill</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#f0ebe0] mb-6">
            A Legacy of Culinary Excellence
          </h2>
            <p className="text-[#7a7065] leading-relaxed mb-5">
            Grill & Thrill was born from a conversation between childhood friends — Chef Arjun Kapoor and restaurateur Ravi Sharma — about why Bhubaneswar lacked a truly world-class Indian fine dining destination. In September 2013, they answered that question with a wood-fire tandoor and an uncompromising vision.
            </p>
            <p className="text-[#7a7065] leading-relaxed mb-5">
            The name "Grill & Thrill" — embodies the excitement and passion of live grilling combined with the thrill of exceptional flavours. It is a restaurant that transcends geography, weaving Indian soul through masterful grilling and presenting it in a language the whole world can taste and appreciate.
            </p>
            <p className="text-[#7a7065] leading-relaxed">
            Today, with two Michelin stars and a team of eight master chefs representing four traditions, Grill & Thrill continues to evolve. Every season brings new dishes, new producers, new stories — but always the same unwavering commitment to extraordinary food.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#141414] row-span-2">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=600&fit=crop&auto=format"
                alt="Chef Arjun Kapoor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#141414]">
              <img
                src="https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=300&h=300&fit=crop&auto=format"
                alt="Open kitchen"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#141414]">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76538ae2ea3?w=300&h=300&fit=crop&auto=format"
                alt="Signature dish"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#0d0d0b] border-y border-[rgba(200,155,60,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>What Drives Us</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">Mission & Vision</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-2xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-4">Our Mission</h3>
              <p className="text-[#7a7065] leading-relaxed">
                To celebrate the extraordinary depth and diversity of Indian culinary heritage by presenting it through the finest ingredients, classical technique and unwavering hospitality — creating an experience that moves, surprises and delights every single guest.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-2xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <span className="text-2xl">🔭</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-4">Our Vision</h3>
              <p className="text-[#7a7065] leading-relaxed">
                To become the definitive benchmark for Indian fine dining globally — a restaurant that earns three Michelin stars, inspires a new generation of chefs, and proves to the world that Indian cuisine belongs at the very pinnacle of gastronomy.
              </p>
            </motion.div>
          </div>

          {/* Quality Standards */}
          <motion.div
            {...fadeUp}
            className="mt-12 p-8 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-2xl"
          >
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-6 text-center">Our Commitments</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#7a7065] leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">The Grill & Thrill Story</h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-8 pl-4"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#141414] border-2 border-primary flex items-center justify-center flex-shrink-0 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="pb-2">
                  <span className="text-primary font-['DM_Mono',monospace] font-medium text-sm tracking-widest">{item.year}</span>
                  <p className="text-[#c8b89a] mt-1 leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Chefs */}
      <section className="py-24 bg-[#0d0d0b] border-y border-[rgba(200,155,60,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>The Culinary Team</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">Meet Our Chefs</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {chefs.map((chef, i) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-2xl hover:border-[rgba(200,155,60,0.3)] transition-all duration-300"
              >
                <div className="w-full sm:w-36 h-48 sm:h-36 rounded-xl overflow-hidden bg-[#1a1a14] flex-shrink-0">
                  <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-primary uppercase tracking-wider mb-1">{chef.speciality}</p>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#f0ebe0] mb-1">{chef.name}</h3>
                  <p className="text-sm text-[#5a5040] mb-3">{chef.role} · {chef.experience}</p>
                  <p className="text-sm text-[#7a7065] leading-relaxed mb-4 line-clamp-3">{chef.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {chef.awards.slice(0, 2).map(award => (
                      <span key={award} className="text-[10px] px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full tracking-wide">
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <SectionLabel>Recognition</SectionLabel>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">Awards & Honours</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl hover:border-[rgba(200,155,60,0.3)] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-[#f0ebe0] text-sm">{award.title}</p>
                <p className="text-xs text-[#5a5040]">{award.org} · {award.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d0d0b] border-t border-[rgba(200,155,60,0.08)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#f0ebe0] mb-4">
              Come Experience the Story
            </h2>
            <p className="text-[#7a7065] mb-8">Every dish has a history. Every meal, a memory. We invite you to be part of ours at Grill & Thrill.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="px-8 py-3 bg-primary text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#d4a843] transition-all duration-300">
                Make a Reservation
              </Link>
              <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-3 border border-[rgba(200,155,60,0.3)] text-[#c8b89a] rounded-lg hover:border-primary hover:text-primary transition-all duration-300">
                Explore the Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
