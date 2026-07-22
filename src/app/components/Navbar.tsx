import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Heart, User, LogOut, ChevronDown, Crown } from "lucide-react";
import { useApp } from "../context/AppContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  {
    label: "Explore",
    children: [
      { to: "/gallery", label: "Gallery" },
      { to: "/blog", label: "Blog" },
      { to: "/events", label: "Events" },
    ]
  },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, favorites } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[rgba(200,155,60,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-['Playfair_Display'] text-xl font-bold text-primary tracking-[0.15em] uppercase">
                  Grill & Thrill
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#7a7065] font-light">
                  Fine Dining
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                      className="flex items-center gap-1 text-sm tracking-wide text-[#c8b89a] hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-44 bg-[#141414] border border-[rgba(200,155,60,0.2)] rounded-lg overflow-hidden shadow-xl"
                        >
                          {link.children.map(child => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              className={({ isActive }) =>
                                `block px-4 py-3 text-sm transition-colors duration-200 ${
                                  isActive ? "text-primary bg-[rgba(200,155,60,0.1)]" : "text-[#c8b89a] hover:text-primary hover:bg-[rgba(200,155,60,0.05)]"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to!}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `text-sm tracking-wide transition-colors duration-200 font-medium relative group ${
                        isActive ? "text-primary" : "text-[#c8b89a] hover:text-primary"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span className={`absolute -bottom-1 left-0 right-0 h-px bg-primary transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/menu"
                className="relative p-2 text-[#c8b89a] hover:text-primary transition-colors"
                title="Favourites"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(200,155,60,0.3)] text-[#c8b89a] hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-[#0a0a0a] flex items-center justify-center text-xs font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-sm">{user.name.split(" ")[0]}</span>
                    {user.role === "admin" && (
                      <span className="text-[10px] bg-primary text-[#0a0a0a] px-1.5 py-0.5 rounded font-bold tracking-wide">
                        ADMIN
                      </span>
                    )}
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-[#141414] border border-[rgba(200,155,60,0.2)] rounded-lg overflow-hidden shadow-xl"
                      >
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-3 text-sm text-[#c8b89a] hover:text-primary hover:bg-[rgba(200,155,60,0.05)] transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Crown className="w-4 h-4" /> Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#c8b89a] hover:text-destructive hover:bg-[rgba(192,57,43,0.05)] transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#c8b89a] border border-[rgba(200,155,60,0.3)] rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
                >
                  <User className="w-4 h-4" /> Sign In
                </Link>
              )}

              <Link
                to="/booking"
                className="px-5 py-2.5 text-sm font-semibold tracking-wide bg-primary text-[#0a0a0a] rounded-lg hover:bg-[#d4a843] transition-all duration-200 shadow-[0_0_20px_rgba(200,155,60,0.3)]"
              >
                Reserve a Table
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#c8b89a] hover:text-primary transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-20 overflow-y-auto lg:hidden"
          >
            <div className="px-6 py-8 space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/menu", label: "Menu" },
                { to: "/gallery", label: "Gallery" },
                { to: "/blog", label: "Blog" },
                { to: "/events", label: "Events" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-4 text-lg font-medium border-b border-[rgba(200,155,60,0.1)] transition-colors ${
                      isActive ? "text-primary" : "text-[#c8b89a]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-6 space-y-3">
                <Link
                  to="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 bg-primary text-[#0a0a0a] font-semibold rounded-lg"
                >
                  Reserve a Table
                </Link>
                {user ? (
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="block w-full text-center py-3 border border-[rgba(200,155,60,0.3)] text-[#c8b89a] rounded-lg"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-3 border border-[rgba(200,155,60,0.3)] text-[#c8b89a] rounded-lg"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
