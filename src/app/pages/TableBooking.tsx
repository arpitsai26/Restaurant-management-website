import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Users, CheckCircle, Info, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import type { Reservation } from "../data/mockData";

const timeSlots = [
  "12:00 PM", "12:30 PM", "13:00 PM", "13:30 PM", "14:00 PM",
  "18:00 PM", "18:30 PM", "19:00 PM", "19:30 PM", "20:00 PM",
  "20:30 PM", "21:00 PM", "21:30 PM",
];

const tableTypes = [
  { value: "Window Table", label: "Window Table", desc: "City views, romantic setting", icon: "🪟", price: 0 },
  { value: "Garden Terrace", label: "Garden Terrace", desc: "Alfresco dining, seasonal", icon: "🌿", price: 0 },
  { value: "Bar Seating", label: "Bar Seating", desc: "Front-row kitchen views", icon: "🍸", price: 0 },
  { value: "Private Room", label: "Private Room", desc: "Exclusive, up to 18 guests", icon: "🔒", price: 100 },
  { value: "Chef's Table", label: "Chef's Table", desc: "Chef's special selection", icon: "👨‍🍳", price: 250 },
];

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableType: string;
  specialRequest: string;
}

const initialForm: FormData = {
  name: "", email: "", phone: "", date: "", time: "",
  guests: 2, tableType: "Window Table", specialRequest: "",
};

export default function TableBooking() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const { addReservation, user } = useApp();

  const today = new Date().toISOString().split("T")[0];

  const update = (field: keyof FormData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Phone number required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Partial<FormData> = {};
    if (!form.date) errs.date = "Please select a date";
    else if (form.date < today) errs.date = "Cannot book a past date";
    if (!form.time) errs.time = "Please select a time";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = () => {
    const payload: Omit<Reservation, "id" | "status" | "createdAt"> = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      tableType: form.tableType,
      specialRequest: form.specialRequest,
    };
    addReservation(payload);
    setSubmitted(true);
  };

  const selectedTable = tableTypes.find(t => t.value === form.tableType);

  if (submitted) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center p-10 bg-[#141414] border border-[rgba(200,155,60,0.3)] rounded-3xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#f0ebe0] mb-3">Reservation Received!</h2>
          <p className="text-[#7a7065] mb-6 leading-relaxed">
            Thank you, <span className="text-[#c8b89a] font-medium">{form.name}</span>. Your reservation for{" "}
            <span className="text-primary font-medium">{form.guests} guests</span> on{" "}
            <span className="text-[#c8b89a]">{form.date}</span> at{" "}
            <span className="text-[#c8b89a]">{form.time}</span> has been submitted for approval.
          </p>
          <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-[rgba(200,155,60,0.1)] text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#5a5040]">Table Type</span>
              <span className="text-[#c8b89a]">{form.tableType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5a5040]">Confirmation sent to</span>
              <span className="text-[#c8b89a]">{form.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5a5040]">Status</span>
              <span className="text-yellow-400/80 text-xs px-2 py-0.5 bg-yellow-900/20 rounded-full">Pending Approval</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6 text-left">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#7a7065]">We will confirm your reservation by email within 2 hours. For urgent requests, call us on +91 78901 23456.</p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm(initialForm); setStep(1); }}
            className="px-8 py-3 bg-primary text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#d4a843] transition-all duration-300"
          >
            Make Another Reservation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-56 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&h=400&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-1">An Unforgettable Evening</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white">Reserve a Table</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {([1, 2, 3] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                s < step ? "bg-primary text-[#0a0a0a]" :
                s === step ? "bg-primary text-[#0a0a0a] ring-4 ring-primary/20" :
                "bg-[#141414] border border-[rgba(200,155,60,0.2)] text-[#5a5040]"
              }`}>
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              <span className={`ml-2 text-xs hidden sm:block ${s === step ? "text-primary" : "text-[#5a5040]"}`}>
                {s === 1 ? "Your Details" : s === 2 ? "Date & Time" : "Confirm"}
              </span>
              {i < 2 && <div className={`mx-4 h-px w-12 sm:w-20 ${s < step ? "bg-primary" : "bg-[rgba(200,155,60,0.15)]"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Guest Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-6">Your Details</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { field: "name" as const, label: "Full Name", placeholder: "Alexandra Pemberton", type: "text" },
                  { field: "email" as const, label: "Email Address", placeholder: "alex@email.com", type: "email" },
                  { field: "phone" as const, label: "Phone Number", placeholder: "+44 20 7946 0958", type: "tel" },
                ].map(({ field, label, placeholder, type }) => (
                  <div key={field} className={field === "phone" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">{label}</label>
                    <input
                      type={type}
                      value={form[field] as string}
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

              {/* Number of Guests */}
              <div>
                <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-3">
                  Number of Guests
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                    <button
                      key={n}
                      onClick={() => update("guests", n)}
                      className={`w-12 h-12 rounded-xl text-sm font-medium transition-all duration-200 ${
                        form.guests === n
                          ? "bg-primary text-[#0a0a0a] shadow-[0_0_15px_rgba(200,155,60,0.3)]"
                          : "bg-[#141414] border border-[rgba(200,155,60,0.15)] text-[#7a7065] hover:border-primary hover:text-primary"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {user && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <Info className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-xs text-[#7a7065]">Signed in as <span className="text-primary">{user.name}</span> — your details have been pre-filled.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Date & Time & Table */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0]">Date & Table</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={e => update("date", e.target.value)}
                    className={`w-full px-4 py-3 bg-[#141414] border rounded-xl text-[#f0ebe0] focus:outline-none transition-colors text-sm cursor-pointer ${
                      errors.date ? "border-destructive" : "border-[rgba(200,155,60,0.15)] focus:border-primary"
                    }`}
                  />
                  {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
                  <p className="text-xs text-[#3a3025] mt-1">We are open Wednesday – Sunday</p>
                </div>

                <div>
                  <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Time
                  </label>
                  <select
                    value={form.time}
                    onChange={e => update("time", e.target.value)}
                    className={`w-full px-4 py-3 bg-[#141414] border rounded-xl text-[#c8b89a] focus:outline-none transition-colors text-sm cursor-pointer ${
                      errors.time ? "border-destructive" : "border-[rgba(200,155,60,0.15)] focus:border-primary"
                    }`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Table Type */}
              <div>
                <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-3">Table Preference</label>
                <div className="grid gap-3">
                  {tableTypes.map(t => (
                    <button
                      key={t.value}
                      onClick={() => update("tableType", t.value)}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                        form.tableType === t.value
                          ? "border-primary bg-primary/5"
                          : "border-[rgba(200,155,60,0.1)] bg-[#141414] hover:border-[rgba(200,155,60,0.3)]"
                      }`}
                    >
                      <span className="text-2xl">{t.icon}</span>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${form.tableType === t.value ? "text-primary" : "text-[#c8b89a]"}`}>{t.label}</p>
                        <p className="text-xs text-[#5a5040]">{t.desc}</p>
                      </div>
                      {t.price > 0 && (
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">+£{t.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-2">Special Requests</label>
                <textarea
                  value={form.specialRequest}
                  onChange={e => update("specialRequest", e.target.value)}
                  placeholder="Dietary requirements, allergies, occasion details, accessibility needs..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-xl text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-6">Confirm Reservation</h2>

              <div className="bg-[#141414] border border-[rgba(200,155,60,0.2)] rounded-2xl overflow-hidden mb-6">
                <div className="p-5 border-b border-[rgba(200,155,60,0.1)]">
                  <p className="text-xs text-primary uppercase tracking-wider mb-1">Reservation Summary</p>
                  <h3 className="font-['Playfair_Display'] text-xl text-[#f0ebe0]">{selectedTable?.icon} {form.tableType}</h3>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { label: "Guest Name", value: form.name, icon: "👤" },
                    { label: "Email", value: form.email, icon: "✉️" },
                    { label: "Phone", value: form.phone, icon: "📞" },
                    { label: "Date", value: form.date, icon: "📅" },
                    { label: "Time", value: form.time, icon: "🕐" },
                    { label: "Guests", value: `${form.guests} person${form.guests > 1 ? "s" : ""}`, icon: "👥" },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{icon}</span>
                        <span className="text-xs text-[#5a5040] uppercase tracking-wider">{label}</span>
                      </div>
                      <span className="text-sm text-[#c8b89a] font-medium">{value}</span>
                    </div>
                  ))}
                  {form.specialRequest && (
                    <div className="pt-3 border-t border-[rgba(200,155,60,0.1)]">
                      <p className="text-xs text-[#5a5040] uppercase tracking-wider mb-1">Special Requests</p>
                      <p className="text-sm text-[#7a7065] italic">{form.specialRequest}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-primary/5 border border-primary/15 rounded-xl mb-6">
                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#c8b89a] font-medium mb-1">Cancellation Policy</p>
                  <p className="text-xs text-[#5a5040]">Free cancellation up to 24 hours before your reservation. Same-day cancellations incur a £25 per person fee.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[rgba(200,155,60,0.1)]">
          {step > 1 ? (
            <button
              onClick={() => setStep(s => (s - 1) as Step)}
              className="px-6 py-3 border border-[rgba(200,155,60,0.2)] text-[#c8b89a] rounded-xl text-sm hover:border-primary hover:text-primary transition-all duration-200"
            >
              Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-[#0a0a0a] font-semibold rounded-xl text-sm hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_20px_rgba(200,155,60,0.25)]"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-[#0a0a0a] font-bold rounded-xl text-sm hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_20px_rgba(200,155,60,0.4)]"
            >
              <CheckCircle className="w-4 h-4" /> Confirm Reservation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
