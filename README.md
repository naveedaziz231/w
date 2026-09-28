# RADO Switzerland — Haute Horlogerie & Master of Materials Experience

An ultra-luxurious, design-forward website for **RADO Watch** ("Master of Materials"), created with high-end Swiss horology aesthetics in HTML5, CSS3, and JavaScript, directly integrated with **Supabase Cloud Database**.

---

## 📂 Project Architecture

```text
c:/Users/Admin/Desktop/w/
│
├── index.html                  # Main Luxury Brand Experience & VIP Portals
│
├── css/
│   ├── style.css               # Core Swiss Luxury Styles, Typography, Gradients & Hero
│   ├── components.css          # Interactive Material Lab, Modals, Timeline, Toasts & Status
│   └── responsive.css          # Mobile, Tablet & High-DPI Desktop Layout Rules
│
├── js/
│   ├── supabase-config.js      # Supabase Client Initialization & API Queries
│   ├── app.js                  # Material Science Explorer, Timeline & Cursor Aura
│   ├── concierge.js            # VIP Appointments, Form Processing & Live Viewer
│   └── audio-fx.js             # Web Audio API Swiss Escapement & Crystal Chime Engine
│
└── assets/
    └── schema.sql              # Supabase Database Migration Script (Tables, RLS & Policies)
```

---

## 💎 Features & Design Highlights

1. **Luxurious Brand Universe & Philosophy**
   - High-contrast obsidian black (`#050507`), champagne gold (`#c5a059`), and plasma platinum styling.
   - Elegant typography pairing: *Cinzel* & *Cormorant Garamond* serifs with modern *Outfit* sans-serif.
   - "Master of Materials" 4 Pillars: Hardness, Lightness, Hypoallergenic Purity, Thermal Equilibrium.

2. **Interactive Material Alchemy Laboratory**
   - Live 3D animated sphere inspector for:
     - **High-Tech Ceramic** (Polished Obsidian, 1,900 HV)
     - **Ceramos™ Composite** (Platinum & Gold fusion)
     - **Plasma Ceramic** (Forged at 20,000°C without metal)
     - **Faceted Sapphire Crystal** (Corundum Crystal Mohs 9)

3. **Interactive Heritage Milestones**
   - Decade timeline from the founding in 1917 (Lengnau, Switzerland) to DiaStar (1962), High-Tech Ceramic (1986), Plasma Physics (1998), Monobloc (2011), and Skeleton Calibres (2021).

4. **Swiss Horology Audio Synthesizer**
   - Web Audio API acoustic engine providing authentic Swiss escapement tick-tock rhythms and subtle ceramic crystal chimes on button interactions (with easy mute/unmute control in the navbar).

5. **Supabase Cloud Integration**
   - **VIP Boutique Concierge Reservations**: Book bespoke private viewings across Geneva, Zurich, Tokyo Ginza, New York 5th Ave, London, and Dubai.
   - **RADO Privé VIP Membership Application**: Collector circle registration.
   - **Real-Time Database Health Indicator**: Live connection status badge in the footer.
   - **Live Cloud Bookings Inspector**: Interactive modal allowing viewing of live database entries.

---

## 🗄️ Supabase Database Setup

Your Supabase project credentials are automatically configured in `js/supabase-config.js`:
- **Project URL**: `https://xyqwuwayvwmhjeibdksk.supabase.co`
- **Publishable / Anon Key**: Embedded in configuration

### To set up the tables in Supabase:
1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/xyqwuwayvwmhjeibdksk/sql/new).
2. Copy and paste the contents of `assets/schema.sql`.
3. Click **RUN**.

---

## 🚀 How to Run the Website

Simply double-click `index.html` to open it in any modern browser, or serve it locally:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve
```
Then navigate to `http://localhost:8000`.
