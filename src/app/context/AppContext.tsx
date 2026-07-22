import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { MenuItem, Reservation } from "../data/mockData";
import { sampleReservations, sampleMessages, menuItems as initialMenuItems } from "../data/mockData";
import type { ContactMessage } from "../data/mockData";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  reservations: Reservation[];
  addReservation: (r: Omit<Reservation, "id" | "status" | "createdAt">) => void;
  updateReservationStatus: (id: string, status: Reservation["status"]) => void;
  deleteReservation: (id: string) => void;
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, "id" | "createdAt" | "read">) => void;
  deleteContactMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = { email: "admin@grillandthrill.com", password: "admin123" };

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("grill_thrill_user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("grill_thrill_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [reservations, setReservations] = useState<Reservation[]>(sampleReservations);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(sampleMessages);
  const [activeSection, setActiveSection] = useState("overview");
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("grill_thrill_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = { id: "admin1", name: "Admin Grill & Thrill", email, role: "admin" };
      setUser(adminUser);
    localStorage.setItem("grill_thrill_user", JSON.stringify(adminUser));
      return true;
    }
    // Simulate regular user login
    if (email && password.length >= 6) {
      const regularUser: User = {
        id: `user_${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        email,
        role: "user"
      };
      setUser(regularUser);
      localStorage.setItem("grill_thrill_user", JSON.stringify(regularUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("grill_thrill_user");
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const addReservation = useCallback((r: Omit<Reservation, "id" | "status" | "createdAt">) => {
    const newRes: Reservation = {
      ...r, id: `r${Date.now()}`, status: "pending",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setReservations(prev => [newRes, ...prev]);
  }, []);

  const updateReservationStatus = useCallback((id: string, status: Reservation["status"]) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const deleteReservation = useCallback((id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  }, []);

  const addMenuItem = useCallback((item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = { ...item, id: `mi${Date.now()}` };
    setMenuItems(prev => [newItem, ...prev]);
  }, []);

  const updateMenuItem = useCallback((id: string, item: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, ...item } : m));
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems(prev => prev.filter(m => m.id !== id));
  }, []);

  const addContactMessage = useCallback((msg: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
    const newMsg: ContactMessage = {
      ...msg, id: `m${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0], read: false
    };
    setContactMessages(prev => [newMsg, ...prev]);
  }, []);

  const deleteContactMessage = useCallback((id: string) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  const markMessageRead = useCallback((id: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  }, []);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed(prev => [id, ...prev.filter(v => v !== id)].slice(0, 6));
  }, []);

  return (
    <AppContext.Provider value={{
      user, login, logout,
      favorites, toggleFavorite, isFavorite,
      reservations, addReservation, updateReservationStatus, deleteReservation,
      menuItems, addMenuItem, updateMenuItem, deleteMenuItem,
      contactMessages, addContactMessage, deleteContactMessage, markMessageRead,
      activeSection, setActiveSection,
      recentlyViewed, addRecentlyViewed,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
