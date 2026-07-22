import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [sent, setSent] = useState(false);
  const { addContactMessage } = useApp();

  const update = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addContactMessage(form);
    setSent(true);
  };

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-56 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4?w=1920&h=400&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-1">We're Here for You</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <motion.div {...fadeUp} className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Get in Touch</p>
              <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#f0ebe0] mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="text-[#7a7065] leading-relaxed">
                Whether you're enquiring about a reservation, a private event, catering, or just want to say hello — our team is ready to assist.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "Visit Us",
                  lines: ["Bhubaneswar", "Odisha", "India"],
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  lines: ["+91 78901 23456", "+91 78901 23457 (Events)"],
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  lines: ["reservations@grillandthrill.com", "events@grillandthrill.com"],
                },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-4 p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a5040] uppercase tracking-wider mb-1.5">{title}</p>
                    {lines.map(line => <p key={line} className="text-sm text-[#c8b89a]">{line}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-xs text-[#5a5040] uppercase tracking-wider">Opening Hours</p>
              </div>
              <div className="space-y-2">
                {[
                  { days: "Monday – Tuesday", hours: "Closed", closed: true },
                  { days: "Wednesday – Thursday", hours: "12:00 – 22:30", closed: false },
                  { days: "Friday – Saturday", hours: "12:00 – 23:30", closed: false },
                  { days: "Sunday", hours: "12:00 – 21:30", closed: false },
                ].map(({ days, hours, closed }) => (
                  <div key={days} className="flex justify-between items-center">
                    <span className="text-sm text-[#7a7065]">{days}</span>
                    <span className={`text-sm font-medium ${closed ? "text-destructive/60" : "text-[#c8b89a]"}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-56 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=300&fit=crop&auto=format"
                alt="Restaurant location"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(200,155,60,0.5)]">
                  <MapPin className="w-6 h-6 text-[#0a0a0a]" />
                </div>
                <p className="text-sm font-medium text-[#f0ebe0]">Bhubaneswar</p>
                <p className="text-xs text-[#7a7065]">Odisha, India</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full border-2 border-primary flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0] mb-3">Message Sent!</h3>
                <p className="text-[#7a7065] mb-6 max-w-sm">Thank you for reaching out. A member of our team will respond within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="px-6 py-2.5 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-[#0a0a0a] transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-6">Send a Message</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { field: "name" as const, label: "Full Name", placeholder: "Your full name" },
                    { field: "email" as const, label: "Email Address", placeholder: "your@email.com" },
                  ].map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">{label}</label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={form[field]}
                        onChange={e => update(field, e.target.value)}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 bg-[#141414] border rounded-xl text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none transition-colors text-sm ${
                          errors[field] ? "border-destructive" : "border-[rgba(200,155,60,0.15)] focus:border-primary"
                        }`}
                      />
                      {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => update("subject", e.target.value)}
                    placeholder="Reservation enquiry, private dining, feedback..."
                    className={`w-full px-4 py-3 bg-[#141414] border rounded-xl text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none transition-colors text-sm ${
                      errors.subject ? "border-destructive" : "border-[rgba(200,155,60,0.15)] focus:border-primary"
                    }`}
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => update("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className={`w-full px-4 py-3 bg-[#141414] border rounded-xl text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none transition-colors text-sm resize-none ${
                      errors.message ? "border-destructive" : "border-[rgba(200,155,60,0.15)] focus:border-primary"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-[#0a0a0a] font-semibold rounded-xl hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_20px_rgba(200,155,60,0.25)]"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
