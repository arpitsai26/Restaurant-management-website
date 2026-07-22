export type MenuCategory =
  | "Starters" | "Main Course" | "Biryani" | "Pizza" | "Burgers"
  | "Chinese" | "South Indian" | "North Indian" | "Beverages" | "Desserts";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  rating: number;
  available: boolean;
  type: "veg" | "non-veg";
  isChefSpecial?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  prepTime?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  speciality: string;
  experience: string;
  awards: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: "Food" | "Interior" | "Events" | "Chefs";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number;
  image: string;
  capacity: number;
  category: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableType: string;
  specialRequest: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const menuItems: MenuItem[] = [
  {
    id: "s1", name: "Truffle Arancini", description: "Crispy risotto balls filled with black truffle and aged parmesan, served with saffron aioli",
    price: 525, category: "Starters", image: unsplash("1568901346375-23c9450c58cd", 600, 400),
    rating: 4.8, available: true, type: "veg", isPopular: true, prepTime: "15 min"
  },
  {
    id: "s2", name: "Seared Scallops", description: "Pan-seared Canadian scallops with cauliflower purée, crispy pancetta and micro herbs",
    price: 795, category: "Starters", image: unsplash("1546069901-ba9599a7e63c", 600, 400),
    rating: 4.9, available: true, type: "non-veg", isChefSpecial: true, prepTime: "20 min"
  },
  {
    id: "s3", name: "Chilli Paneer", description: "Crispy cottage cheese cubes tossed in spiced Indo-Chinese sauce with bell peppers",
    price: 445, category: "Starters", image: unsplash("1512621776951-a57141f2eefd", 600, 400),
    rating: 4.6, available: true, type: "veg", isPopular: true, prepTime: "18 min"
  },
  {
    id: "s4", name: "Chicken Tikka", description: "Tender chicken pieces marinated in yogurt and spices, grilled in a tandoor oven",
    price: 595, category: "Starters", image: unsplash("1504674900-67893bce14c3", 600, 400),
    rating: 4.7, available: true, type: "non-veg", isFeatured: true, prepTime: "25 min"
  },
  {
    id: "s5", name: "Samosa Chaat", description: "Crispy samosas topped with curd, tamarind chutney, mint chutney and sev",
    price: 395, category: "Starters", image: unsplash("1565299624946-b28f40a0ae38", 600, 400),
    rating: 4.7, available: true, type: "veg", isPopular: true, prepTime: "12 min"
  },
  {
    id: "s6", name: "Tandoori Broccoli", description: "Charred broccoli florets marinated in tandoori spices, served with mint chutney",
    price: 495, category: "Starters", image: unsplash("1512621776951-a57141f2eefd", 600, 400),
    rating: 4.5, available: true, type: "veg", prepTime: "18 min"
  },
  {
    id: "s7", name: "Fish Amritsari", description: "Crispy fried sole fish fillets marinated in Amritsari spices, served with tangy imli chutney",
    price: 695, category: "Starters", image: unsplash("1504674900-67893bce14c3", 600, 400),
    rating: 4.8, available: true, type: "non-veg", isFeatured: true, prepTime: "22 min"
  },
  {
    id: "mc1", name: "Raan-E-Mughlai", description: "Slow-roasted whole lamb leg marinated in saffron, mace and Kashmiri spices, served with truffle mashed potato and red wine jus",
    price: 2495, category: "Main Course", image: unsplash("1513104890138-7c749659a591", 600, 400),
    rating: 5.0, available: true, type: "non-veg", isChefSpecial: true, isFeatured: true, prepTime: "45 min"
  },
  {
    id: "mc2", name: "Pan-Roasted Salmon", description: "Atlantic salmon fillet with lemon caper butter, grilled asparagus and wild rice",
    price: 1349, category: "Main Course", image: unsplash("1565958011703-44f9829ba187", 600, 400),
    rating: 4.8, available: true, type: "non-veg", isPopular: true, prepTime: "28 min"
  },
  {
    id: "mc3", name: "Truffle Mushroom Risotto", description: "Arborio rice slowly cooked with forest mushrooms, black truffle and aged parmesan",
    price: 1149, category: "Main Course", image: unsplash("1555396273-367ea4eb4db5", 600, 400),
    rating: 4.7, available: true, type: "veg", isFeatured: true, prepTime: "30 min"
  },
  {
    id: "mc4", name: "Rogan Josh", description: "Kashmiri slow-cooked lamb curry with fennel, dried ginger and saffron",
    price: 1095, category: "Main Course", image: unsplash("1513104890138-7c749659a591", 600, 400),
    rating: 4.9, available: true, type: "non-veg", isChefSpecial: true, isFeatured: true, prepTime: "40 min"
  },
  {
    id: "mc5", name: "Chicken Korma", description: "Royal Mughlai chicken curry with cashew cream, rose water and aromatic spices",
    price: 895, category: "Main Course", image: unsplash("1565958011703-44f9829ba187", 600, 400),
    rating: 4.8, available: true, type: "non-veg", isPopular: true, prepTime: "30 min"
  },
  {
    id: "mc6", name: "Palak Paneer", description: "Fresh cottage cheese in a silky spinach gravy tempered with cumin, garlic and ginger",
    price: 695, category: "Main Course", image: unsplash("1555396273-367ea4eb4db5", 600, 400),
    rating: 4.7, available: true, type: "veg", prepTime: "25 min"
  },
  {
    id: "b1", name: "Royal Dum Biryani", description: "Slow-cooked Basmati rice with saffron, tender lamb and caramelised onions sealed in dough",
    price: 995, category: "Biryani", image: unsplash("1528735602780-2552fd46c7bc", 600, 400),
    rating: 4.9, available: true, type: "non-veg", isChefSpecial: true, isPopular: true, prepTime: "45 min"
  },
  {
    id: "b2", name: "Vegetable Dum Biryani", description: "Fragrant basmati rice layered with seasonal vegetables, saffron milk and fried onions",
    price: 795, category: "Biryani", image: unsplash("1567620905732-2d1ec7ab7445", 600, 400),
    rating: 4.6, available: true, type: "veg", prepTime: "40 min"
  },
  {
    id: "b3", name: "Prawn Biryani", description: "Jumbo prawns cooked with aromatic spices, long-grain basmati and caramelised shallots",
    price: 1149, category: "Biryani", image: unsplash("1546069901-ba9599a7e63c", 600, 400),
    rating: 4.8, available: true, type: "non-veg", isFeatured: true, prepTime: "40 min"
  },
  {
    id: "p1", name: "Tartufo Nero", description: "White base with black truffle oil, buffalo mozzarella, arugula and shaved parmesan",
    price: 945, category: "Pizza", image: unsplash("1565299624946-b28f40a0ae38", 600, 400),
    rating: 4.8, available: true, type: "veg", isChefSpecial: true, prepTime: "20 min"
  },
  {
    id: "p2", name: "Nduja Diavola", description: "San Marzano tomato, fior di latte, spicy Calabrian nduja and fresh basil",
    price: 849, category: "Pizza", image: unsplash("1555396273-367ea4eb4db5", 600, 400),
    rating: 4.7, available: true, type: "non-veg", isPopular: true, prepTime: "20 min"
  },
  {
    id: "bg1", name: "Chicken Tandoori Burger", description: "Grilled tandoori chicken patty with mint chutney, pickled onions, melted cheddar on brioche",
    price: 795, category: "Burgers", image: unsplash("1568901346375-23c9450c58cd", 600, 400),
    rating: 4.9, available: true, type: "non-veg", isPopular: true, isFeatured: true, prepTime: "18 min"
  },
  {
    id: "bg2", name: "Beyond Mushroom Burger", description: "Plant-based patty, smoked cheddar, portobello mushroom, sriracha aioli, pickled slaw",
    price: 695, category: "Burgers", image: unsplash("1512621776951-a57141f2eefd", 600, 400),
    rating: 4.5, available: true, type: "veg", prepTime: "15 min"
  },
  {
    id: "ch1", name: "Peking Duck", description: "Whole roasted Peking duck with crispy skin, served with pancakes, hoisin sauce and spring onions",
    price: 2049, category: "Chinese", image: unsplash("1504674900-67893bce14c3", 600, 400),
    rating: 4.9, available: true, type: "non-veg", isChefSpecial: true, prepTime: "50 min"
  },
  {
    id: "ch2", name: "Dim Sum Platter", description: "Eight pieces assorted dim sum - har gow, siu mai, char siu bao and crystal dumplings",
    price: 649, category: "Chinese", image: unsplash("1550547660-d9450f859349", 600, 400),
    rating: 4.7, available: true, type: "non-veg", isPopular: true, prepTime: "25 min"
  },
  {
    id: "si1", name: "Dosa Trio", description: "Crispy paper dosa, onion masala dosa and ghee rava dosa served with coconut chutney and sambar",
    price: 595, category: "South Indian", image: unsplash("1567620905732-2d1ec7ab7445", 600, 400),
    rating: 4.6, available: true, type: "veg", isPopular: true, prepTime: "20 min"
  },
  {
    id: "si2", name: "Chettinad Chicken Curry", description: "Aromatic South Indian curry with freshly ground Chettinad spices and curry leaves",
    price: 849, category: "South Indian", image: unsplash("1513104890138-7c749659a591", 600, 400),
    rating: 4.8, available: true, type: "non-veg", isFeatured: true, prepTime: "30 min"
  },
  {
    id: "ni1", name: "Butter Chicken", description: "Tender chicken in velvety tomato-cashew sauce, finished with cream and kasuri methi",
    price: 895, category: "North Indian", image: unsplash("1565958011703-44f9829ba187", 600, 400),
    rating: 4.9, available: true, type: "non-veg", isPopular: true, isFeatured: true, prepTime: "25 min"
  },
  {
    id: "ni2", name: "Dal Makhani", description: "Black lentils slow-cooked overnight with tomatoes, butter and cream",
    price: 645, category: "North Indian", image: unsplash("1550547660-d9450f859349", 600, 400),
    rating: 4.8, available: true, type: "veg", isChefSpecial: true, prepTime: "20 min"
  },
  {
    id: "bv1", name: "Saffron Rose Lemonade", description: "House-pressed lemon with saffron syrup, rose water and Himalayan pink salt",
    price: 295, category: "Beverages", image: unsplash("1495474472287-4d71bcdd2085", 600, 400),
    rating: 4.7, available: true, type: "veg", isPopular: true, prepTime: "5 min"
  },
  {
    id: "bv2", name: "Royal Masala Chai", description: "Assam tea brewed with cardamom, ginger, cinnamon and star anise, served in copper kulhad",
    price: 245, category: "Beverages", image: unsplash("1544025162-d76538ae2ea3", 600, 400),
    rating: 4.8, available: true, type: "veg", prepTime: "8 min"
  },
  {
    id: "d1", name: "Gulab Jamun Cheesecake", description: "NY-style cheesecake infused with gulab jamun, rose cream and pistachio brittle",
    price: 525, category: "Desserts", image: unsplash("1551024506-0bccd828d307", 600, 400),
    rating: 4.9, available: true, type: "veg", isChefSpecial: true, isFeatured: true, prepTime: "10 min"
  },
  {
    id: "d2", name: "Dark Chocolate Fondant", description: "Warm Valrhona chocolate fondant with vanilla bean ice cream and gold leaf",
    price: 595, category: "Desserts", image: unsplash("1567620905732-2d1ec7ab7445", 600, 400),
    rating: 4.8, available: true, type: "veg", isPopular: true, prepTime: "15 min"
  },
  {
    id: "d3", name: "Kulfi Trilogy", description: "Artisanal kulfi in mango, rose-cardamom and paan flavours with falooda noodles",
    price: 445, category: "Desserts", image: unsplash("1504674900-67893bce14c3", 600, 400),
    rating: 4.7, available: true, type: "veg", prepTime: "5 min"
  },
];

export const menuCategories: MenuCategory[] = [
  "Starters", "Main Course", "Biryani", "Pizza", "Burgers",
  "Chinese", "South Indian", "North Indian", "Beverages", "Desserts"
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Alexandra Pemberton", role: "Food Critic, The Times",
    review: "An extraordinary dining experience that transcends ordinary expectations. The Royal Dum Biryani is nothing short of a revelation.",
    rating: 5, avatar: unsplash("1507003211169-0a1dd7228f2d", 80, 80), date: "March 2025" },
  { id: "t2", name: "Marcus Chen", role: "Executive Chef",
    review: "Grill & Thrill represents the pinnacle of contemporary Indian-fusion cuisine.",
    rating: 5, avatar: unsplash("1500648767791-00dcc994a43e", 80, 80), date: "February 2025" },
  { id: "t3", name: "Priya Mehta", role: "Michelin Guide Inspector",
    review: "The attention to detail here is exceptional. From the hand-crafted tableware to the sommelier's impeccable pairing suggestions.",
    rating: 5, avatar: unsplash("1494790108377-be9c29b29330", 80, 80), date: "January 2025" },
  { id: "t4", name: "James Whitfield", role: "Travel Writer",
    review: "I have dined at three-Michelin-starred restaurants across Europe, and Grill & Thrill holds its own magnificently.",
    rating: 5, avatar: unsplash("1472099645785-5658abf4ff4e", 80, 80), date: "December 2024" },
  { id: "t5", name: "Sofia Reyes", role: "Lifestyle Editor",
    review: "The most romantic dining room in the city - the candlelit ambiance, the impeccable service and the breathtaking food.",
    rating: 5, avatar: unsplash("1438761681033-6461ffad8d80", 80, 80), date: "November 2024" },
  { id: "t6", name: "David Okonkwo", role: "Restaurant Consultant",
    review: "Grill & Thrill has created something truly rare: a restaurant where innovation and tradition exist in perfect harmony.",
    rating: 5, avatar: unsplash("1507591064-52bef064acb4", 80, 80), date: "October 2024" },
];

export const chefs: Chef[] = [
  { id: "c1", name: "Arjun Kapoor", role: "Executive Chef & Co-Founder",
    bio: "Trained at Le Cordon Bleu Paris and apprenticed under Heston Blumenthal.",
    image: unsplash("1577219491135-ce391730fb2c", 400, 500),
    speciality: "Modern Indian Fusion", experience: "20 years",
    awards: ["Michelin Star 2022", "Best Chef of the Year 2023", "Times Food Award 2024"] },
  { id: "c2", name: "Isabella Romano", role: "Head Pastry Chef",
    bio: "A graduate of the Culinary Institute of America, Isabella has redefined dessert as an art form.",
    image: unsplash("1556909211-36987daf7b4d", 400, 500),
    speciality: "Artisan Pastry & Desserts", experience: "14 years",
    awards: ["Best Pastry Chef 2023", "Gold Medal - World Pastry Cup", "Forbes 30 Under 30"] },
  { id: "c3", name: "Wei Zhang", role: "Sous Chef - Asian Cuisines",
    bio: "Raised in Chengdu and trained at the China Culinary Academy.",
    image: unsplash("1544025162-d76538ae2ea3", 400, 500),
    speciality: "Contemporary Asian Cuisine", experience: "16 years",
    awards: ["Best Asian Restaurant Chef 2022", "CNN Travel Featured Chef 2024"] },
  { id: "c4", name: "Priya Nair", role: "Chef de Cuisine - South Indian",
    bio: "Priya has elevated traditional recipes with contemporary plating and modern techniques.",
    image: unsplash("1513104890138-7c749659a591", 400, 500),
    speciality: "Regional South Indian", experience: "12 years",
    awards: ["Kerala Tourism Best Chef", "Conde Nast Traveller Featured 2024"] },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", title: "Raan Plating", image: unsplash("1513104890138-7c749659a591", 600, 800), category: "Food" },
  { id: "g2", title: "The Grand Dining Room", image: unsplash("1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4", 800, 500), category: "Interior" },
  { id: "g3", title: "Royal Dum Biryani", image: unsplash("1528735602780-2552fd46c7bc", 600, 700), category: "Food" },
  { id: "g4", title: "Chef Arjun at Work", image: unsplash("1577219491135-ce391730fb2c", 600, 800), category: "Chefs" },
  { id: "g5", title: "Private Dining Suite", image: unsplash("1517248135467-4c7edcad34c4", 800, 500), category: "Interior" },
  { id: "g6", title: "Dessert Artistry", image: unsplash("1551024506-0bccd828d307", 600, 600), category: "Food" },
  { id: "g7", title: "New Year Gala 2025", image: unsplash("1550966871-3ed3cccb7197", 800, 600), category: "Events" },
  { id: "g8", title: "Chef Isabella Creating", image: unsplash("1556909211-36987daf7b4d", 600, 800), category: "Chefs" },
  { id: "g9", title: "The Wine Cellar", image: unsplash("1559329007-40df8a9345d8", 800, 600), category: "Interior" },
  { id: "g10", title: "Peking Duck Ceremony", image: unsplash("1504674900-67893bce14c3", 600, 700), category: "Food" },
  { id: "g11", title: "Corporate Dinner", image: unsplash("1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4", 800, 500), category: "Events" },
  { id: "g12", title: "The Open Kitchen", image: unsplash("1556909211-36987daf7b4d", 800, 600), category: "Interior" },
  { id: "g13", title: "Truffle Risotto", image: unsplash("1555396273-367ea4eb4db5", 600, 600), category: "Food" },
  { id: "g14", title: "Wedding Setup", image: unsplash("1550966871-3ed3cccb7197", 800, 700), category: "Events" },
  { id: "g15", title: "Chef Priya with Spices", image: unsplash("1513104890138-7c749659a591", 600, 800), category: "Chefs" },
  { id: "g16", title: "Bar and Lounge", image: unsplash("1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4", 800, 500), category: "Interior" },
];

export const blogPosts: BlogPost[] = [
  { id: "bl1", title: "The Art of Dum Cooking: A 400-Year Journey",
    excerpt: "Tracing the origins of dum pukht cooking from Mughal royal kitchens to Grill and Thrill.",
    content: "Full article content here...",
    image: unsplash("1528735602780-2552fd46c7bc", 800, 500),
    author: "Arjun Kapoor", date: "15 March 2025", category: "Culinary Heritage",
    readTime: "6 min read", tags: ["Biryani", "Mughal Cuisine", "Dum Cooking", "Heritage"] },
  { id: "bl2", title: "The Art of Slow-Cooking: A Himalayan Tradition",
    excerpt: "Our Executive Chef journey mastering the slow-cooking techniques.",
    content: "Full article content here...",
    image: unsplash("1513104890138-7c749659a591", 800, 500),
    author: "Arjun Kapoor", date: "28 February 2025", category: "Ingredient Stories",
    readTime: "5 min read", tags: ["Slow Cooking", "Kashmir", "Sustainability", "Farm-to-Fork"] },
  { id: "bl3", title: "Dessert Reinvented: Isabella East-Meets-West Philosophy",
    excerpt: "How our Pastry Chef found the perfect marriage between French technique and Indian flavours.",
    content: "Full article content here...",
    image: unsplash("1551024506-0bccd828d307", 800, 500),
    author: "Isabella Romano", date: "10 February 2025", category: "Chef Stories",
    readTime: "4 min read", tags: ["Pastry", "Fusion", "Desserts", "Technique"] },
  { id: "bl4", title: "The Spice Route: Understanding Our Spice Philosophy",
    excerpt: "Every spice we use tells a story.",
    content: "Full article content here...",
    image: unsplash("1550547660-d9450f859349", 800, 500),
    author: "Priya Nair", date: "22 January 2025", category: "Ingredients",
    readTime: "7 min read", tags: ["Spices", "Kerala", "Sourcing", "Flavour"] },
  { id: "bl5", title: "Wine Pairing Masterclass: Indian Food and Burgundy",
    excerpt: "Our sommelier breaks the myth that wine does not pair with Indian food.",
    content: "Full article content here...",
    image: unsplash("1559329007-40df8a9345d8", 800, 500),
    author: "Editorial Team", date: "5 January 2025", category: "Wine and Drinks",
    readTime: "8 min read", tags: ["Wine", "Pairing", "Sommelier", "Burgundy"] },
  { id: "bl6", title: "Grill and Thrill Named Best Indian Fine Dining 2025",
    excerpt: "We are humbled to receive the Michelin recognition.",
    content: "Full article content here...",
    image: unsplash("1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4", 800, 500),
    author: "Editorial Team", date: "18 December 2024", category: "News and Awards",
    readTime: "3 min read", tags: ["Award", "Michelin", "Recognition", "Grill and Thrill"] },
];

export const faqs: FAQItem[] = [
  { id: "f1", question: "Do you accommodate dietary restrictions and allergies?", answer: "Absolutely. We cater to all dietary needs including gluten-free, vegan, vegetarian, nut-free and Jain diets.", category: "Dietary" },
  { id: "f2", question: "How far in advance should I make a reservation?", answer: "We recommend booking at least 48 hours in advance for weekday dining and 1 week for weekend dinners.", category: "Reservations" },
  { id: "f3", question: "Is there a dress code?", answer: "We maintain a smart-casual to formal dress code.", category: "Dining" },
  { id: "f4", question: "Do you offer private dining?", answer: "Yes - our Private Cellar Room seats up to 18 guests and the Garden Terrace accommodates up to 40.", category: "Events" },
  { id: "f5", question: "Do you have a wine list?", answer: "Our award-winning cellar houses over 300 labels.", category: "Drinks" },
  { id: "f6", question: "What is your cancellation policy?", answer: "Cancellations made 24 hours before your reservation incur no charge.", category: "Reservations" },
  { id: "f7", question: "Do you offer a tasting menu?", answer: "Yes - our 7-course Chef Tasting Menu changes seasonally.", category: "Dining" },
  { id: "f8", question: "Is there parking available?", answer: "Valet parking is available Thursday through Sunday from 6pm.", category: "Practical" },
  { id: "f9", question: "Can I bring my own birthday cake?", answer: "Yes - we welcome celebration cakes with 24 hours notice.", category: "Events" },
  { id: "f10", question: "Do you serve halal meat?", answer: "Yes, all our lamb and chicken are certified halal.", category: "Dietary" },
];

export const events: Event[] = [
  { id: "ev1", title: "Midsummer Chef Table", description: "An intimate 8-seat evening with Executive Chef Arjun Kapoor.",
    date: "21 June 2025", time: "7:00 PM", price: 8995, image: unsplash("1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4", 800, 500), capacity: 8, category: "Chef Table" },
  { id: "ev2", title: "Spice Route Wine Pairing Dinner", description: "A curated 6-course Indian tasting menu paired with exceptional Old World wines.",
    date: "4 July 2025", time: "7:30 PM", price: 6495, image: unsplash("1559329007-40df8a9345d8", 800, 500), capacity: 24, category: "Wine Pairing" },
  { id: "ev3", title: "Masterclass: The Art of Biryani", description: "Join Chef Arjun for a hands-on masterclass in dum cooking.",
    date: "19 July 2025", time: "11:00 AM", price: 4495, image: unsplash("1528735602780-2552fd46c7bc", 800, 500), capacity: 16, category: "Masterclass" },
  { id: "ev4", title: "Bastille Day Celebration Dinner", description: "A special Franco-Indian fusion evening with live jazz quartet, champagne reception and a 5-course menu blending French technique with Indian soul.",
    date: "14 July 2025", time: "7:00 PM", price: 5495, image: unsplash("1550966871-3ed3cccb7197", 800, 500), capacity: 60, category: "Seasonal Event" },
];

export const stats = {
  yearsOfExcellence: 12,
  dishesServed: "2.4M+",
  awards: 24,
  masterChefs: 8,
  happyGuests: "180K+",
  michelin: "★★",
};

export const revenueData = [
  { month: "Jan", revenue: 42000, reservations: 284 },
  { month: "Feb", revenue: 38000, reservations: 260 },
  { month: "Mar", revenue: 51000, reservations: 340 },
  { month: "Apr", revenue: 48000, reservations: 320 },
  { month: "May", revenue: 62000, reservations: 410 },
  { month: "Jun", revenue: 58000, reservations: 390 },
  { month: "Jul", revenue: 71000, reservations: 465 },
  { month: "Aug", revenue: 69000, reservations: 450 },
  { month: "Sep", revenue: 55000, reservations: 365 },
  { month: "Oct", revenue: 60000, reservations: 400 },
  { month: "Nov", revenue: 74000, reservations: 490 },
  { month: "Dec", revenue: 89000, reservations: 580 },
];

export const categoryOrderData = [
  { name: "Main Course", value: 28, fill: "#C89B3C" },
  { name: "Biryani", value: 22, fill: "#e8b86d" },
  { name: "North Indian", value: 18, fill: "#8b6914" },
  { name: "Desserts", value: 12, fill: "#d4a843" },
  { name: "Starters", value: 10, fill: "#f0c86a" },
  { name: "Others", value: 10, fill: "#5a4010" },
];

export const sampleReservations: Reservation[] = [
  { id: "r1", name: "Alexandra Pemberton", email: "alex@pemberton.co.uk", phone: "+44 20 7946 0958", date: "2025-07-18", time: "19:30", guests: 4, tableType: "Window Table", specialRequest: "Anniversary dinner - please arrange flowers", status: "approved", createdAt: "2025-07-10" },
  { id: "r2", name: "Marcus Chen", email: "m.chen@outlook.com", phone: "+44 7911 234567", date: "2025-07-19", time: "20:00", guests: 2, tableType: "Bar Seating", specialRequest: "", status: "pending", createdAt: "2025-07-12" },
  { id: "r3", name: "Priya Mehta", email: "priya.m@gmail.com", phone: "+44 7800 789012", date: "2025-07-20", time: "19:00", guests: 6, tableType: "Private Dining Room", specialRequest: "Nut allergy - please be careful", status: "pending", createdAt: "2025-07-14" },
];

export const sampleMessages: ContactMessage[] = [
  { id: "m1", name: "John Smith", email: "john.smith@example.com", subject: "Wedding Reception Inquiry", message: "Hello, I'm interested in booking your venue for a wedding reception of approx 80 guests in September. Could you please share your banquet packages and availability?", createdAt: "2025-07-15", read: false },
  { id: "m2", name: "Emily Davis", email: "emily.d@outlook.com", subject: "Dietary Restrictions", message: "I have a reservation for next week. I wanted to confirm if you can accommodate gluten-free and dairy-free requirements for our party of 4?", createdAt: "2025-07-14", read: false },
  { id: "m3", name: "Raj Patel", email: "raj.patel@gmail.com", subject: "Corporate Event", message: "We are looking to host a corporate dinner for 25 people on August 10th. Could you please send me your private dining menu and pricing options?", createdAt: "2025-07-13", read: true },
  { id: "m4", name: "Sarah Wilson", email: "sarah.w@yahoo.com", subject: "Lost Item", message: "I dined at your restaurant last Friday and believe I left a black leather handbag under my table. It's a medium-sized Michael Kors bag. Could you please check?", createdAt: "2025-07-12", read: true },
  { id: "m5", name: "Michael Chen", email: "m.chen@proton.me", subject: "Gift Voucher", message: "I'd like to purchase a gift voucher for 2 people for a tasting menu experience. Can you please let me know the available options and how I can order one?", createdAt: "2025-07-11", read: false },
];
