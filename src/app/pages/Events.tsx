import { motion } from "motion/react";
import { Calendar, Clock, Users, ArrowRight, Tag } from "lucide-react";
import { events } from "../data/mockData";
import { Link } from "react-router";

export default function Events() {
  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-56 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550966871-3ed3cccb7197?w=1920&h=400&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-1">Exceptional Evenings</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white">Events & Experiences</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(200,155,60,0.35)] transition-all duration-400"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#1a1a14]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs px-3 py-1.5 bg-primary/90 text-[#0a0a0a] rounded-full font-semibold">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#f0ebe0] mb-2">{event.title}</h3>
                <p className="text-sm text-[#7a7065] leading-relaxed mb-5">{event.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2 text-xs text-[#5a5040]">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5a5040]">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5a5040]">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>{event.capacity} seats available</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5a5040]">
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-bold text-sm">₹{event.price.toLocaleString("en-IN")} pp</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-[#0a0a0a] transition-all duration-300"
                >
                  Enquire & Book <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Private Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4?w=1200&h=400&fit=crop&auto=format)` }}
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          <div className="relative z-10 p-12 text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Exclusive Gatherings</p>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white mb-4">
              Planning a Private Event?
            </h2>
            <p className="text-[#c8b89a] max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Our Private Cellar Room seats up to 18 and the Garden Terrace accommodates 40. From corporate dinners to milestone celebrations — we create extraordinary evenings.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-[#0a0a0a] font-semibold rounded-xl hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_30px_rgba(200,155,60,0.4)]"
            >
              Enquire About Private Dining
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
