
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  User, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Minus, 
  X,
  Zap,
  Headphones
} from "lucide-react";
import { cn } from "./lib/utils";
import { useTravelAgent } from "./hooks/useTravelAgent";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-header">
    <div className="flex justify-between items-center px-6 md:px-10 py-4 w-full">
      <div className="text-2xl font-bold tracking-tighter text-zinc-100 font-headline">VINFAST</div>
      <div className="hidden md:flex items-center space-x-8 font-headline tracking-tight font-medium">
        <a className="text-zinc-100 border-b-2 border-zinc-100 pb-1" href="#">Models</a>
        <a className="text-zinc-400 hover:text-zinc-100 transition-colors" href="#">Services</a>
        <a className="text-zinc-400 hover:text-zinc-100 transition-colors" href="#">Experience</a>
        <a className="text-zinc-400 hover:text-zinc-100 transition-colors" href="#">Charging</a>
        <a className="text-zinc-400 hover:text-zinc-100 transition-colors" href="#">Store</a>
      </div>
      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-4">
          <button className="text-zinc-400 hover:text-zinc-100 transition-colors"><Globe size={20} /></button>
          <button className="text-zinc-400 hover:text-zinc-100 transition-colors"><User size={20} /></button>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2 text-sm font-bold uppercase tracking-widest scale-95 active:scale-90 transition-transform">
          Test Drive
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen w-full overflow-hidden">
    <img 
      alt="Sleek dark flagship electric SUV VF9" 
      className="absolute inset-0 w-full h-full object-cover" 
      src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent"></div>
    <div className="relative h-full flex flex-col justify-center px-6 md:px-24 max-w-7xl">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-headline text-primary tracking-[0.3em] uppercase mb-4 text-sm font-semibold"
      >
        The New Era of Mobility
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-headline text-5xl md:text-8xl font-bold tracking-tighter text-zinc-100 mb-6 leading-tight max-w-3xl"
      >
        KINETIC <br/> <span className="text-white/20">INTELLIGENCE.</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-body text-zinc-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
      >
        Experience the VF 9. A pinnacle of electric luxury where sustainable performance meets visionary design.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4"
      >
        <button className="kinetic-button kinetic-button-primary">EXPLORE NOW</button>
        <button className="kinetic-button kinetic-button-ghost">ORDER YOURS</button>
      </motion.div>
    </div>
  </section>
);

const Lineup = () => {
  const vehicles = [
    { id: "VF5", name: "VF 5", desc: "Urban Agility. All-Electric Freedom.", img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800" },
    { id: "VF7", name: "VF 7", desc: "Sporty Precision. Advanced Tech.", img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800" },
    { id: "VF8", name: "VF 8", desc: "Intelligent Comfort. Seamless Power.", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" },
    { id: "VF9", name: "VF 9", desc: "The Flagship. Uncompromised Luxury.", img: "https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="py-32 bg-surface">
      <div className="px-6 md:px-24 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">THE LINEUP</h2>
          <p className="text-on-surface-variant max-w-md">Precision-engineered for every lifestyle, from agile city commuters to full-sized family luxury.</p>
        </div>
        <div className="flex space-x-4">
          <button className="w-12 h-12 flex items-center justify-center border border-outline-variant/20 text-zinc-400 hover:text-zinc-100 hover:border-zinc-100 transition-all">
            <ChevronLeft size={24} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-outline-variant/20 text-zinc-400 hover:text-zinc-100 hover:border-zinc-100 transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide px-6 md:px-24 space-x-8 pb-12">
        {vehicles.map((v) => (
          <div key={v.id} className="flex-none w-80 bg-surface-container-lowest group cursor-pointer">
            <div className="h-64 overflow-hidden mb-6">
              <img 
                alt={v.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                src={v.img}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <h3 className="font-headline text-2xl font-bold tracking-tight mb-2">{v.name}</h3>
              <p className="text-zinc-500 text-sm mb-4">{v.desc}</p>
              <div className="flex items-center text-primary text-sm font-bold tracking-widest">
                VIEW DETAILS <ArrowRight className="ml-2" size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const BentoGrid = () => (
  <section className="py-32 bg-surface-container-low px-6 md:px-24">
    <div className="mb-20">
      <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-center text-on-surface">BEYOND THE DRIVE</h2>
      <div className="w-24 h-1 bg-primary mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[600px]">
      <div className="md:col-span-8 relative bg-surface-container-lowest overflow-hidden">
        <img 
          alt="High-tech charging station" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          src="https://images.unsplash.com/photo-1620121692029-d088224efc74?auto=format&fit=crop&q=80&w=1200"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-12 flex flex-col justify-end">
          <h3 className="font-headline text-3xl font-bold mb-4 text-zinc-100">SMART INFRASTRUCTURE</h3>
          <p className="text-zinc-300 max-w-lg mb-6">Global charging network designed for seamless travel across continents.</p>
          <a className="text-primary font-bold tracking-widest text-sm uppercase" href="#">Learn More</a>
        </div>
      </div>
      <div className="md:col-span-4 grid grid-rows-2 gap-8">
        <div className="bg-surface-container-high p-10 flex flex-col justify-center items-start">
          <Sparkles className="text-primary mb-6" size={40} />
          <h3 className="font-headline text-xl font-bold mb-2 uppercase text-zinc-100">ADAS 2.0</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">Advanced driver assistance systems powered by cutting-edge AI.</p>
        </div>
        <div className="bg-surface-container-high p-10 flex flex-col justify-center items-start">
          <Headphones className="text-primary mb-6" size={40} />
          <h3 className="font-headline text-xl font-bold mb-2 uppercase text-zinc-100">SMART SERVICE</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">Your digital assistant, always ready to optimize your journey.</p>
        </div>
      </div>
    </div>
  </section>
);

const GlobalVision = () => (
  <section className="py-32 bg-surface overflow-hidden">
    <div className="px-6 md:px-24 flex flex-col lg:flex-row items-center gap-20">
      <div className="w-full lg:w-1/2 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 border border-outline-variant/10"></div>
        <img 
          alt="Modern minimalist architecture" 
          className="relative z-10 w-full aspect-[4/5] object-cover" 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10"></div>
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter mb-8 text-on-surface">GLOBAL <br/><span className="text-white/20">VISION.</span></h2>
        <div className="space-y-8 max-w-xl">
          {[
            { n: "01", t: "Sustainable Legacy", d: "Pioneering the green revolution with a 100% electric vehicle lineup by the end of 2024." },
            { n: "02", t: "Vietnamese Spirit", d: "Exporting innovation and Vietnamese craftsmanship to the global stage." },
            { n: "03", t: "Customer Centric", d: "Revolutionizing the ownership experience with industry-leading warranties and service." }
          ].map((item) => (
            <div key={item.n} className="flex gap-6">
              <span className="text-4xl font-headline font-bold text-white/10">{item.n}</span>
              <div>
                <h4 className="font-headline text-xl font-bold mb-2 text-on-surface">{item.t}</h4>
                <p className="text-zinc-400">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-12 px-10 py-4 border-2 border-primary text-zinc-100 font-bold tracking-widest hover:bg-primary hover:text-on-primary transition-all">
          OUR STORY
        </button>
      </div>
    </div>
  </section>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useTravelAgent();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-zinc-200"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg">
                  <Zap className="text-white" size={16} />
                </div>
                <span className="font-headline font-bold text-zinc-900 tracking-tight">Vivi — VinFast AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-100 rounded-md transition-colors">
                <Minus className="text-zinc-900" size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col bg-zinc-50/30">
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="text-zinc-400" size={32} />
                  </div>
                  <h4 className="font-headline font-bold text-zinc-900 mb-2">Xin chào!</h4>
                  <p className="text-zinc-500 text-sm">Tôi là Vivi, chuyên gia tư vấn xe VinFast. Tôi có thể giúp bạn chọn xe, tính chi phí và tư vấn chính sách.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col mb-4", m.role === "user" ? "items-end" : "items-start")}>
                  <span className="text-[10px] text-zinc-400 mb-1 uppercase font-semibold tracking-wider">
                    {m.role === "user" ? "BẠN" : "VIVI"}
                  </span>
                  <div className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm max-w-[85%] shadow-sm",
                    m.role === "user" ? "bg-zinc-900 text-white rounded-tr-none" : "bg-white text-zinc-800 border border-zinc-100 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start mb-4">
                  <div className="bg-white px-4 py-2.5 rounded-2xl border border-zinc-100 rounded-tl-none flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Input */}
            <div className="p-4 border-t border-zinc-100 bg-white">
              <div className="relative flex items-center">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="w-full bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-200 text-sm py-3 pl-4 pr-12 rounded-xl text-zinc-800 placeholder:text-zinc-400" 
                  placeholder="Nhập tin nhắn..." 
                  type="text"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-3 text-zinc-900 hover:text-zinc-600 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="text-center mt-3">
                <span className="text-[10px] text-zinc-400">Trợ lý AI bởi <span className="text-zinc-900 font-medium">Vivi — VinFast</span></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-zinc-900 text-zinc-100 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group border border-white/10"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-neutral-950 w-full border-t border-zinc-800/20">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 py-20 max-w-7xl mx-auto text-sm tracking-wide text-zinc-300">
      <div className="md:col-span-1">
        <div className="text-xl font-black text-zinc-100 mb-4 font-headline">VINFAST</div>
        <p className="text-zinc-500 leading-relaxed max-w-xs">Driving the world forward with intelligent mobility and sustainable energy solutions.</p>
      </div>
      <div>
        <h4 className="text-zinc-100 font-bold mb-6 uppercase tracking-widest">Company</h4>
        <ul className="space-y-4 text-zinc-500">
          <li><a className="hover:text-zinc-300 transition-colors" href="#">About Us</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Global Network</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Newsroom</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Investors</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-zinc-100 font-bold mb-6 uppercase tracking-widest">Support</h4>
        <ul className="space-y-4 text-zinc-500">
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Contact Us</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Find a Dealer</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Maintenance</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Charging Map</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-zinc-100 font-bold mb-6 uppercase tracking-widest">Legal</h4>
        <ul className="space-y-4 text-zinc-500">
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Privacy Policy</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Terms of Service</a></li>
          <li><a className="hover:text-zinc-300 transition-colors" href="#">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-zinc-800/20 py-8 px-12 text-center text-zinc-600 text-xs">
      © 2024 VinFast. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Lineup />
      <BentoGrid />
      <GlobalVision />
      <Footer />
      <ChatWidget />
    </div>
  );
}

