import { Link } from "react-router";

export function Privacy() {
  return (
    <div className="bg-[#0a0a0a] pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs text-primary tracking-widest uppercase mb-2">Legal</p>
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#f0ebe0] mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-[#7a7065] space-y-6 leading-relaxed">
          <p><strong className="text-[#c8b89a]">Last updated: 1 January 2025</strong></p>
          <p>Grill & Thrill Fine Dining ("we", "our", "us") respects your privacy. This policy describes how we collect, use and protect information about you when you use our website or dine with us.</p>
          <h3 className="font-['Playfair_Display'] text-lg text-[#f0ebe0]">Information We Collect</h3>
          <p>We collect personal information you provide when making reservations, contacting us, or using our website: name, email, phone number, and dining preferences.</p>
          <h3 className="font-['Playfair_Display'] text-lg text-[#f0ebe0]">How We Use Your Information</h3>
          <p>We use your information to manage reservations, improve our service, and send you relevant communications. We never sell your data to third parties.</p>
          <h3 className="font-['Playfair_Display'] text-lg text-[#f0ebe0]">Contact</h3>
          <p>Questions? Contact our Data Protection Officer at <Link to="/contact" className="text-primary">privacy@grillandthrill.com</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="bg-[#0a0a0a] pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs text-primary tracking-widest uppercase mb-2">Legal</p>
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#f0ebe0] mb-8">Terms & Conditions</h1>
        <div className="text-[#7a7065] space-y-6 leading-relaxed">
          <p><strong className="text-[#c8b89a]">Last updated: 1 January 2025</strong></p>
          <p>By using this website and dining at Grill & Thrill Fine Dining, you agree to these terms. Please read them carefully.</p>
          <h3 className="font-['Playfair_Display'] text-lg text-[#f0ebe0]">Reservations</h3>
          <p>Reservations are subject to availability. We reserve the right to confirm or decline any booking. Cancellation fees apply as described in our FAQ.</p>
          <h3 className="font-['Playfair_Display'] text-lg text-[#f0ebe0]">Intellectual Property</h3>
          <p>All content on this website — photography, menus, copy — is the intellectual property of Grill & Thrill Fine Dining and may not be reproduced without written permission.</p>
          <h3 className="font-['Playfair_Display'] text-lg text-[#f0ebe0]">Contact</h3>
          <p>Questions? <Link to="/contact" className="text-primary">Get in touch</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export function Careers() {
  const roles = [
    { title: "Sous Chef — Indian Cuisine", type: "Full-time", location: "Bhubaneswar, Odisha" },
    { title: "Head Sommelier", type: "Full-time", location: "Bhubaneswar, Odisha" },
    { title: "Restaurant Manager", type: "Full-time", location: "Bhubaneswar, Odisha" },
    { title: "Front of House Supervisor", type: "Full-time", location: "Bhubaneswar, Odisha" },
    { title: "Pastry Chef", type: "Full-time", location: "Bhubaneswar, Odisha" },
  ];
  return (
    <div className="bg-[#0a0a0a] pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs text-primary tracking-widest uppercase mb-2">Join the Team</p>
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#f0ebe0] mb-4">Careers at Grill & Thrill</h1>
        <p className="text-[#7a7065] mb-12 max-w-xl">We are always looking for passionate, talented individuals to join our family. We offer competitive salaries, professional development and a culture built on respect and excellence.</p>
        <div className="space-y-4">
          {roles.map(role => (
            <div key={role.title} className="flex items-center justify-between p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl hover:border-[rgba(200,155,60,0.3)] transition-all duration-300">
              <div>
                <h3 className="font-semibold text-[#f0ebe0] text-sm mb-1">{role.title}</h3>
                <div className="flex gap-4 text-xs text-[#5a5040]">
                  <span>📍 {role.location}</span>
                  <span>💼 {role.type}</span>
                </div>
              </div>
              <Link to="/contact" className="text-xs px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-[#0a0a0a] transition-all duration-200">
                Apply
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
