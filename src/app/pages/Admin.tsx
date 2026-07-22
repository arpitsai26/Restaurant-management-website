import { useState } from "react";
import { Navigate, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, UtensilsCrossed, Calendar, MessageSquare, Image as ImageIcon,
  Users, LogOut, Crown, TrendingUp, CheckCircle, XCircle, Clock, Menu,
  Trash2, Edit3, Plus, Eye, BarChart2, PieChart, X, ChefHat, Search
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { useApp } from "../context/AppContext";
import { revenueData, categoryOrderData } from "../data/mockData";
import type { MenuItem } from "../data/mockData";

type AdminSection = "overview" | "menu" | "reservations" | "messages" | "gallery" | "users";

const navItems: { id: AdminSection; icon: typeof LayoutDashboard; label: string }[] = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "menu", icon: UtensilsCrossed, label: "Menu Management" },
  { id: "reservations", icon: Calendar, label: "Reservations" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "gallery", icon: ImageIcon, label: "Gallery" },
  { id: "users", icon: Users, label: "Users" },
];

const GOLD = "#C89B3C";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a14] border border-[rgba(200,155,60,0.3)] rounded-lg p-3 text-xs">
        <p className="text-primary font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.name === "revenue" ? `₹${p.value.toLocaleString("en-IN")}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Admin() {
  const { user, logout, reservations, updateReservationStatus, deleteReservation,
    menuItems, deleteMenuItem, addMenuItem, updateMenuItem,
    contactMessages, deleteContactMessage, markMessageRead } = useApp();

  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "", description: "", price: 0, category: "Starters",
    type: "veg", available: true, rating: 4.5,
    image: "https://images.unsplash.com/photo-1504674900-67893bce14c3?w=600&h=400&fit=crop&auto=format"
  });

  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalReservations = reservations.length;
  const pendingRes = reservations.filter(r => r.status === "pending").length;
  const unreadMessages = contactMessages.filter(m => !m.read).length;

  const statusColor = {
    approved: "text-green-400 bg-green-900/20 border-green-800/30",
    pending: "text-yellow-400 bg-yellow-900/20 border-yellow-800/30",
    rejected: "text-red-400 bg-red-900/20 border-red-800/30",
  };

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.price) return;
    if (editingItem) {
      updateMenuItem(editingItem.id, newItem as Partial<MenuItem>);
    } else {
      addMenuItem(newItem as Omit<MenuItem, "id">);
    }
    setShowAddMenu(false);
    setEditingItem(null);
    setNewItem({ name: "", description: "", price: 0, category: "Starters", type: "veg", available: true, rating: 4.5 });
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddMenu(true);
  };

  const filteredMenuItems = menuItems.filter(i =>
    !menuSearch || i.name.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      // ── OVERVIEW ──
      case "overview":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0] mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue (YTD)", value: `₹${(totalRevenue / 1000).toFixed(0)}K`, change: "+18%", icon: TrendingUp, color: GOLD },
                  { label: "Total Reservations", value: totalReservations, change: `${pendingRes} pending`, icon: Calendar, color: "#6366f1" },
                  { label: "Menu Items", value: menuItems.length, change: "Active", icon: UtensilsCrossed, color: "#22c55e" },
                  { label: "Unread Messages", value: unreadMessages, change: `${contactMessages.length} total`, icon: MessageSquare, color: "#f59e0b" },
                ].map(({ label, value, change, icon: Icon, color }) => (
                  <div key={label} className="p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">{change}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#f0ebe0] mb-1">{value}</p>
                    <p className="text-xs text-[#5a5040]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-primary" />
                    <p className="font-medium text-sm text-[#f0ebe0]">Monthly Revenue & Reservations</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,155,60,0.08)" />
                    <XAxis dataKey="month" tick={{ fill: "#5a5040", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#5a5040", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#7a7065" }} />
                    <Line type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2} dot={false} name="revenue" />
                    <Line type="monotone" dataKey="reservations" stroke="#6366f1" strokeWidth={2} dot={false} name="reservations" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
                <div className="flex items-center gap-2 mb-5">
                  <PieChart className="w-4 h-4 text-primary" />
                  <p className="font-medium text-sm text-[#f0ebe0]">Orders by Category</p>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryOrderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryOrderData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#141414", border: "1px solid rgba(200,155,60,0.2)", borderRadius: 8, fontSize: 11 }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {categoryOrderData.slice(0, 4).map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                        <span className="text-xs text-[#5a5040]">{d.name}</span>
                      </div>
                      <span className="text-xs font-medium text-[#c8b89a]">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reservations */}
            <div className="p-5 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium text-sm text-[#f0ebe0]">Recent Reservations</p>
                <button onClick={() => setActiveSection("reservations")} className="text-xs text-primary hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(200,155,60,0.1)]">
                      {["Guest", "Date", "Guests", "Table", "Status"].map(h => (
                        <th key={h} className="pb-3 text-left text-xs text-[#5a5040] uppercase tracking-wider font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.slice(0, 5).map(r => (
                      <tr key={r.id} className="border-b border-[rgba(200,155,60,0.05)]">
                        <td className="py-3 text-[#c8b89a] text-xs">{r.name}</td>
                        <td className="py-3 text-[#7a7065] text-xs">{r.date}</td>
                        <td className="py-3 text-[#7a7065] text-xs">{r.guests}</td>
                        <td className="py-3 text-[#7a7065] text-xs">{r.tableType}</td>
                        <td className="py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${statusColor[r.status]}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      // ── MENU MANAGEMENT ──
      case "menu":
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0]">Menu Management</h2>
              <button
                onClick={() => { setEditingItem(null); setShowAddMenu(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-[#0a0a0a] text-xs font-bold rounded-lg hover:bg-[#d4a843] transition-all duration-200"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5040]" />
              <input
                value={menuSearch}
                onChange={e => setMenuSearch(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-lg text-[#f0ebe0] placeholder:text-[#3a3025] text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(200,155,60,0.1)]">
                    {["Item", "Category", "Price", "Type", "Rating", "Status", "Actions"].map(h => (
                      <th key={h} className="pb-3 px-3 text-left text-xs text-[#5a5040] uppercase tracking-wider font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map(item => (
                    <tr key={item.id} className="border-b border-[rgba(200,155,60,0.05)] hover:bg-[rgba(200,155,60,0.02)] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#1a1a14] flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs text-[#c8b89a] font-medium line-clamp-1">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs text-[#7a7065]">{item.category}</td>
                      <td className="py-3 px-3 text-xs font-bold text-primary">₹{item.price.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          item.type === "veg" ? "text-green-400 bg-green-900/20 border-green-800/30" : "text-red-400 bg-red-900/20 border-red-800/30"
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-[#c8b89a]">⭐ {item.rating}</td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          item.available ? "text-green-400 bg-green-900/20 border-green-800/30" : "text-red-400 bg-red-900/20 border-red-800/30"
                        }`}>
                          {item.available ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(item)} className="text-[#5a5040] hover:text-primary transition-colors">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteMenuItem(item.id)} className="text-[#5a5040] hover:text-destructive transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      // ── RESERVATIONS ──
      case "reservations":
        return (
          <div className="space-y-5">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0]">Reservations</h2>
            <div className="grid grid-cols-3 gap-4 mb-2">
              {[
                { label: "Total", value: reservations.length, color: "text-[#f0ebe0]" },
                { label: "Pending", value: reservations.filter(r => r.status === "pending").length, color: "text-yellow-400" },
                { label: "Approved", value: reservations.filter(r => r.status === "approved").length, color: "text-green-400" },
              ].map(s => (
                <div key={s.label} className="p-4 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#5a5040] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {reservations.map(r => (
                <div key={r.id} className="p-4 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-medium text-sm text-[#f0ebe0]">{r.name}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${statusColor[r.status]}`}>
                          {r.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-1 text-xs text-[#5a5040]">
                        <span>📅 {r.date} at {r.time}</span>
                        <span>👥 {r.guests} guests</span>
                        <span>🪑 {r.tableType}</span>
                      </div>
                      {r.specialRequest && (
                        <p className="text-xs text-[#7a7065] mt-1 italic">"{r.specialRequest}"</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateReservationStatus(r.id, "approved")}
                            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-green-400 bg-green-900/20 border border-green-800/30 rounded-lg hover:bg-green-900/40 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button>
                          <button
                            onClick={() => updateReservationStatus(r.id, "rejected")}
                            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg hover:bg-red-900/40 transition-colors"
                          >
                            <XCircle className="w-3 h-3" /> Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteReservation(r.id)}
                        className="p-1.5 text-[#3a3025] hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ── MESSAGES ──
      case "messages":
        return (
          <div className="space-y-5">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0]">Contact Messages</h2>
            <div className="space-y-3">
              {contactMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-xl border transition-all duration-200 ${
                    !msg.read
                      ? "bg-[#141414] border-[rgba(200,155,60,0.25)]"
                      : "bg-[#111111] border-[rgba(200,155,60,0.08)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-medium text-sm text-[#f0ebe0]">{msg.name}</p>
                        <span className="text-xs text-[#5a5040]">{msg.email}</span>
                        {!msg.read && (
                          <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full border border-primary/30">New</span>
                        )}
                      </div>
                      <p className="text-xs text-primary font-medium mb-1">{msg.subject}</p>
                      <p className="text-xs text-[#7a7065] leading-relaxed">{msg.message}</p>
                      <p className="text-[10px] text-[#3a3025] mt-2">{msg.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <button
                          onClick={() => markMessageRead(msg.id)}
                          className="p-1.5 text-[#5a5040] hover:text-primary transition-colors"
                          title="Mark as read"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteContactMessage(msg.id)}
                        className="p-1.5 text-[#3a3025] hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {contactMessages.length === 0 && (
                <div className="text-center py-12 text-[#5a5040]">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No messages yet</p>
                </div>
              )}
            </div>
          </div>
        );

      // ── GALLERY ──
      case "gallery":
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0]">Gallery Management</h2>
              <Link to="/gallery" className="text-xs text-primary hover:underline">View Public Gallery →</Link>
            </div>
            <p className="text-sm text-[#5a5040]">Gallery images are managed through the Gallery page and data layer. In production, connect to Cloudinary via the backend API.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="relative aspect-square bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl overflow-hidden group">
                  <img
                    src={`https://images.unsplash.com/photo-${["1504674900-67893bce14c3","1546069901-ba9599a7e63c","1565958011703-44f9829ba187","1528735602780-2552fd46c7bc","1551024506-0bccd828d307","1544025162-d76538ae2ea3","1512621776951-a57141f2eefd","1555396273-367ea4eb4db5"][i-1]}?w=200&h=200&fit=crop&auto=format`}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/40 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="aspect-square bg-[#141414] border border-dashed border-[rgba(200,155,60,0.25)] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Plus className="w-6 h-6 text-[#5a5040] mb-1" />
                <span className="text-xs text-[#3a3025]">Add Image</span>
              </div>
            </div>
          </div>
        );

      // ── USERS ──
      case "users":
        return (
          <div className="space-y-5">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ebe0]">User Management</h2>
            <div className="space-y-3">
              {[
                { name: "Admin Grill & Thrill", email: "admin@grillandthrill.com", role: "admin", joined: "2013-09-01", reservations: "—" },
                { name: "Alexandra Pemberton", email: "alex@pemberton.co.uk", role: "user", joined: "2024-03-15", reservations: "12" },
                { name: "Marcus Chen", email: "m.chen@outlook.com", role: "user", joined: "2024-06-22", reservations: "5" },
                { name: "Priya Mehta", email: "priya.m@gmail.com", role: "user", joined: "2025-01-10", reservations: "3" },
                { name: "James Whitfield", email: "j.whitfield@thetimes.co.uk", role: "user", joined: "2024-11-05", reservations: "8" },
              ].map(u => (
                <div key={u.email} className="flex items-center gap-4 p-4 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {u.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#c8b89a] truncate">{u.name}</p>
                      {u.role === "admin" && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full border border-primary/30">ADMIN</span>
                      )}
                    </div>
                    <p className="text-xs text-[#5a5040]">{u.email} · Joined {u.joined}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#7a7065]">{u.reservations} bookings</p>
                    {u.role !== "admin" && (
                      <button className="text-[10px] text-destructive/60 hover:text-destructive mt-0.5 transition-colors">Remove</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex">
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col
        bg-[#070707] border-r border-[rgba(200,155,60,0.12)] transition-all duration-300
        ${sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"}
      `}
        style={{ minHeight: "100dvh" }}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[rgba(200,155,60,0.1)]">
          <div className="flex items-center gap-2.5">
            <Crown className="w-5 h-5 text-primary" />
            <div>
          <p className="font-['Playfair_Display'] text-sm font-bold text-primary tracking-widest uppercase">Grill & Thrill</p>
              <p className="text-[9px] tracking-widest text-[#3a3025] uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-left ${
                activeSection === id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-[#5a5040] hover:text-[#c8b89a] hover:bg-[rgba(200,155,60,0.04)]"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
              {id === "messages" && unreadMessages > 0 && (
                <span className="ml-auto text-[10px] bg-primary text-[#0a0a0a] px-1.5 py-0.5 rounded-full font-bold">
                  {unreadMessages}
                </span>
              )}
              {id === "reservations" && pendingRes > 0 && (
                <span className="ml-auto text-[10px] bg-yellow-600 text-[#0a0a0a] px-1.5 py-0.5 rounded-full font-bold">
                  {pendingRes}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[rgba(200,155,60,0.1)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-primary text-[#0a0a0a] flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#c8b89a] truncate">{user.name}</p>
              <p className="text-[10px] text-[#3a3025] truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] text-[#5a5040] hover:text-[#c8b89a] border border-[rgba(200,155,60,0.1)] rounded-lg transition-colors">
              <Eye className="w-3 h-3" /> Site
            </Link>
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] text-[#5a5040] hover:text-destructive border border-[rgba(200,155,60,0.1)] rounded-lg transition-colors"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a]/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[rgba(200,155,60,0.1)] px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 text-[#7a7065] hover:text-primary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ebe0] capitalize">
              {navItems.find(n => n.id === activeSection)?.label}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>

      {/* Add/Edit Menu Modal */}
      <AnimatePresence>
        {showAddMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#141414] border border-[rgba(200,155,60,0.2)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ebe0]">
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
                </h3>
                <button onClick={() => { setShowAddMenu(false); setEditingItem(null); }} className="text-[#5a5040] hover:text-[#c8b89a]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { field: "name", label: "Item Name", type: "text", placeholder: "Truffle Arancini" },
                  { field: "description", label: "Description", type: "textarea", placeholder: "Brief description..." },
                  { field: "price", label: "Price (₹)", type: "number", placeholder: "0" },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-1.5">{label}</label>
                    {type === "textarea" ? (
                      <textarea
                        value={(newItem as any)[field] || ""}
                        onChange={e => setNewItem(p => ({ ...p, [field]: e.target.value }))}
                        placeholder={placeholder}
                        rows={2}
                        className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[rgba(200,155,60,0.15)] rounded-lg text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                      />
                    ) : (
                      <input
                        type={type}
                        value={(newItem as any)[field] || ""}
                        onChange={e => setNewItem(p => ({ ...p, [field]: type === "number" ? parseFloat(e.target.value) : e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[rgba(200,155,60,0.15)] rounded-lg text-[#f0ebe0] placeholder:text-[#3a3025] focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-1.5">Category</label>
                    <select
                      value={newItem.category || "Starters"}
                      onChange={e => setNewItem(p => ({ ...p, category: e.target.value as MenuItem["category"] }))}
                      className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[rgba(200,155,60,0.15)] rounded-lg text-[#c8b89a] text-sm focus:outline-none focus:border-primary cursor-pointer"
                    >
                      {["Starters","Main Course","Biryani","Pizza","Burgers","Chinese","South Indian","North Indian","Beverages","Desserts"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#7a7065] uppercase tracking-wider mb-1.5">Type</label>
                    <select
                      value={newItem.type || "veg"}
                      onChange={e => setNewItem(p => ({ ...p, type: e.target.value as "veg" | "non-veg" }))}
                      className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[rgba(200,155,60,0.15)] rounded-lg text-[#c8b89a] text-sm focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={newItem.available ?? true}
                    onChange={e => setNewItem(p => ({ ...p, available: e.target.checked }))}
                    className="accent-[#C89B3C]"
                  />
                  <label htmlFor="available" className="text-sm text-[#c8b89a]">Available on menu</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveItem}
                    className="flex-1 py-2.5 bg-primary text-[#0a0a0a] font-semibold text-sm rounded-lg hover:bg-[#d4a843] transition-all duration-200"
                  >
                    {editingItem ? "Save Changes" : "Add Item"}
                  </button>
                  <button
                    onClick={() => { setShowAddMenu(false); setEditingItem(null); }}
                    className="px-5 py-2.5 border border-[rgba(200,155,60,0.2)] text-[#7a7065] text-sm rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
