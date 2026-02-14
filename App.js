import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { 
  X, Github, Linkedin, Mail, Phone, Download, Code, Sparkles, Send, Bot,
  Layers, Monitor, Edit3, Save, User, Camera, Upload, FileText, Briefcase,
  GraduationCap, ChevronRight, Globe, ExternalLink, MapPin, AlertCircle
} from 'lucide-react';

// YOUR ACTUAL FIREBASE CONFIGURATION (Updated from your snippet)
const firebaseConfig = {
  apiKey: "AIzaSyDZOhsYjxnlxnCxVFBHI4KaiprRh2T8bUc",
  authDomain: "shiva-portfolio-b9a9e.firebaseapp.com",
  projectId: "shiva-portfolio-b9a9e",
  storageBucket: "shiva-portfolio-b9a9e.firebasestorage.app",
  messagingSenderId: "697670939036",
  appId: "1:697670939036:web:0a150a98cdc2351221d859",
  measurementId: "G-K8YND4DQHM"
};

// Guard clause to ensure keys are present
const isFirebaseConfigured = firebaseConfig.apiKey !== "";

let app, auth, db;
if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

const App = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [firebaseError, setFirebaseError] = useState(!isFirebaseConfigured);
  
  const [profile, setProfile] = useState({
    name: "Shivasagar Bandage",
    role: "Full Stack Developer & Data Analyst",
    email: "shivasagarbandage616@gmail.com",
    phone: "+91 6364260169",
    location: "Hyderabad, India",
    preferredLocations: ["Hyderabad", "Bangalore", "Pune"],
    summary: "MCA graduate specialized in Python development and Machine Learning. Passionate about building intelligent, data-driven solutions with modern web technologies.",
    profilePic: "", 
    cvFile: null,
    skills: ["Python", "JavaScript", "React", "Java", "Machine Learning", "MySQL"],
    mcaCgpa: "8.25",
    linkedin: "https://www.linkedin.com/in/shivasagar-bandage-39b0312a0/",
    github: "https://github.com/Shivsagara"
  });

  const projects = [
    { 
      id: 1,
      title: "Emotion-Based Music System", 
      desc: "Developed a real-time emotion detection system that recommends music based on the user's emotional state.", 
      fullDesc: "This project leverages Deep Learning and Computer Vision to analyze facial expressions in real-time. Using frameworks like MTCNN for face detection and Deep Face for emotion classification.",
      tech: ["Python", "Deep Learning", "OpenCV"],
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      features: ["Real-time facial analysis", "Automatic playlist generation"],
      previewUrl: "#"
    },
    { 
      id: 2,
      title: "Crop Recommendation System", 
      desc: "Data science project optimizing agricultural yield based on soil NPK and weather parameters.", 
      fullDesc: "Built to support precision agriculture, this system analyzes environmental data including Nitrogen (N), Phosphorous (P), Potassium (K) levels, temperature, humidity, pH, and rainfall.",
      tech: ["Python", "Pandas", "Scikit-Learn"],
      img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop",
      features: ["Soil health analysis", "Weather-integrated predictions"],
      previewUrl: "#"
    }
  ];

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth failed:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (u && db) {
            // Path: /artifacts/portfolio/users/{uid}/data/profile
            const docRef = doc(db, 'artifacts', 'shiva-portfolio', 'users', u.uid, 'profile');
            getDoc(docRef).then(snap => {
                if (snap.exists()) setProfile(snap.data());
            });
        }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user || !db) return;
    try {
      const docRef = doc(db, 'artifacts', 'shiva-portfolio', 'users', user.uid, 'profile');
      await setDoc(docRef, profile);
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 font-sans pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
        <nav className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
          <div className="text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollToSection('home')}>SB.</div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-white/60">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="px-4 py-2 rounded-full transition-all flex items-center gap-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700"
          >
            {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </nav>
      </header>

      {/* Edit Form (Overlay) */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-[2rem] w-full max-w-xl p-8 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Your Profile</h2>
                <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white transition-colors"><X /></button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-white/40 block mb-1">Full Name</label>
                    <input 
                        type="text" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 text-white"
                    />
                </div>
                <div>
                    <label className="text-xs text-white/40 block mb-1">Professional Summary</label>
                    <textarea 
                        value={profile.summary} 
                        onChange={(e) => setProfile({...profile, summary: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 h-32 text-white"
                    />
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsEditing(false)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-bold">Cancel</button>
                  <button onClick={handleSave} className="flex-1 py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all">Save Changes</button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-48 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <img 
            src={profile.profilePic || `https://ui-avatars.com/api/?name=${profile.name}&background=2563eb&color=fff&size=512`} 
            className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-2 border-white/10 relative z-10 shadow-2xl"
            alt="Profile"
          />
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-4">
          I'm <span className="text-blue-500">{profile.name.split(' ')[0]}</span>.
        </h1>
        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-10 leading-relaxed font-light">{profile.summary}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => window.print()} className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-lg">
            <Download size={18} /> Download CV
          </button>
          <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Mail size={18} /> Let's Connect
          </button>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-white/90">
          <span className="w-12 h-[1px] bg-blue-500"></span> Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl">
              <img src={project.img} className="w-full aspect-video object-cover" alt={project.title} />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/50 text-sm mb-6">{project.desc}</p>
                <button onClick={() => setSelectedProject(project)} className="text-blue-400 font-bold flex items-center gap-2">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16">
          <h2 className="text-4xl font-bold mb-8">Let's Work Together</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><Mail /></div>
                <div><p className="text-xs text-white/40 uppercase">Email</p><p>{profile.email}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><Phone /></div>
                <div><p className="text-xs text-white/40 uppercase">Phone</p><p>{profile.phone}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><MapPin /></div>
                <div><p className="text-xs text-white/40 uppercase">Location</p><p>{profile.location}</p></div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Social Presence</p>
              <div className="flex flex-col gap-3">
                <a href={profile.linkedin} target="_blank" className="p-4 bg-white/5 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors">
                  <span className="flex items-center gap-3"><Linkedin size={20} className="text-blue-400"/> LinkedIn</span>
                  <ExternalLink size={16} />
                </a>
                <a href={profile.github} target="_blank" className="p-4 bg-white/5 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors">
                  <span className="flex items-center gap-3"><Github size={20}/> GitHub</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedProject(null)}></div>
          <div className="bg-[#0f0f0f] w-full max-w-2xl rounded-[2rem] border border-white/10 relative z-10 overflow-hidden shadow-2xl">
            <img src={selectedProject.img} className="w-full h-48 object-cover" alt="" />
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="text-white/70 mb-6 leading-relaxed">{selectedProject.fullDesc}</p>
              <div className="flex gap-4">
                <button onClick={() => setSelectedProject(null)} className="flex-1 py-4 bg-white/10 rounded-full font-bold">Close</button>
                <a href={selectedProject.previewUrl} className="flex-1 py-4 bg-blue-600 rounded-full font-bold text-center">Live Preview</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-10 text-white/20 text-xs uppercase tracking-widest">
        Built with React & Firebase • © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
};

export default App;