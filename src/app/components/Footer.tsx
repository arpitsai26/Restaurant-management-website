import { Link } from "react-router";
import { Crown, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070707] border-t border-[rgba(200,155,60,0.15)]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5 group w-fit">
              <Crown className="w-6 h-6 text-primary" />
              <div>
                <div className="font-['Playfair_Display'] text-xl font-bold text-primary tracking-[0.15em] uppercase">
                  Grill & Thrill
                </div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#5a5040] font-light">
                  Fine Dining
                </div>
              </div>
            </Link>
            <p className="text-[#5a5040] text-sm leading-relaxed mb-6">
              A temple of culinary artistry where ancient Indian flavours meet modern grilling techniques.
              Michelin-recognised. Memory-making.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(200,155,60,0.2)] text-[#5a5040] hover:text-primary hover:border-primary transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-base font-semibold text-[#f0ebe0] mb-5 tracking-wide">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "Our Story" },
                { to: "/menu", label: "The Menu" },
                { to: "/gallery", label: "Gallery" },
                { to: "/events", label: "Events" },
                { to: "/blog", label: "Journal" },
                { to: "/careers", label: "Careers" },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#5a5040] hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Playfair_Display'] text-base font-semibold text-[#f0ebe0] mb-5 tracking-wide">
              Find Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#5a5040] leading-relaxed">
                  Bhubaneswar, Odisha, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+917890123456" className="text-sm text-[#5a5040] hover:text-primary transition-colors">
                  +91 78901 23456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:reservations@grillandthrill.com" className="text-sm text-[#5a5040] hover:text-primary transition-colors">
                  reservations@grillandthrill.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-['Playfair_Display'] text-base font-semibold text-[#f0ebe0] mb-5 tracking-wide">
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {[
                { days: "Monday – Tuesday", hours: "Closed" },
                { days: "Wednesday – Thursday", hours: "12pm – 10:30pm" },
                { days: "Friday – Saturday", hours: "12pm – 11:30pm" },
                { days: "Sunday", hours: "12pm – 9:30pm" },
              ].map(({ days, hours }) => (
                <li key={days} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#3a3025] uppercase tracking-wider">{days}</p>
                    <p className={`text-sm font-medium ${hours === "Closed" ? "text-destructive/70" : "text-[#7a6a50]"}`}>
                      {hours}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-[#0a0a0a] text-sm font-semibold rounded-lg hover:bg-[#d4a843] transition-all duration-200"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(200,155,60,0.4)] to-transparent" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3a3025] text-center sm:text-left">
            © {currentYear} Grill & Thrill Fine Dining. All rights reserved. Crafted with passion in Bhubaneswar.
          </p>
          <div className="flex items-center gap-6">
            {[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Use" },
              { to: "/faq", label: "FAQ" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-[#3a3025] hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
