/**
 * RADO Switzerland - Master of Materials
 * Core Interactive Experience Application
 */

// Material Science Data for Interactive Explorer
const MATERIAL_DATA = {
    'ceramic': {
        title: 'High-Tech Ceramic',
        tagline: 'Lightness, Hardness, and Sensual Warmth',
        vickersHardness: '1,250 – 1,900 HV',
        weightComparison: 'Weight: ~6.0 g/cm³ (Lightweight & Inert)',
        temperature: 'Adapts instantly to skin temperature',
        scratchResistance: 'Diamond-like Scratch Proof',
        description: 'Pioneered by RADO in 1986. Made from ultra-fine zirconium oxide powder baked at 1,450°C. Silky, hypoallergenic, and impervious to the ravages of time.',
        colorways: ['Jet Black Obsidian', 'Pure Arctic White', 'Jungle Green', 'Navy Blue Matte'],
        badge: 'Iconic Innovation'
    },
    'ceramos': {
        title: 'Ceramos™ Platinum Composite',
        tagline: 'The Fusion of High-Tech Ceramic & Metal Alloy',
        vickersHardness: '1,300 – 1,750 HV',
        weightComparison: 'Weight: 90% Ceramic, 10% Metal Composite',
        temperature: 'Warm metallic touch with zero tarnish',
        scratchResistance: 'Permanent Metallic Sheen',
        description: 'A revolutionary material marriage created by RADO. Sintered under extreme pressure to combine the eternal hardness of ceramic with the distinctive, warm metallic luster of precious alloys.',
        colorways: ['Rose Gold Glow', 'Platinum Silver', 'Warm Champagne'],
        badge: 'Proprietary Alchemy'
    },
    'plasma': {
        title: 'Plasma High-Tech Ceramic',
        tagline: 'Forged in Plasma at 20,000°C Without Any Metal',
        vickersHardness: '1,400 HV',
        weightComparison: 'Pure Ceramic Structure with Metallic Glow',
        temperature: 'Thermic equilibrium with human body',
        scratchResistance: 'Scratch-Proof Molecular Transformation',
        description: 'A patented oven treatment alters the molecular composition of white ceramic gases activated at 20,000°C. The result is an otherworldly brilliant metallic sheen created with 100% pure high-tech ceramic.',
        colorways: ['Galactic Anthracite', 'Gunmetal Mirror', 'Polished Obsidian'],
        badge: 'Patented Science'
    },
    'sapphire': {
        title: 'Faceted Sapphire Crystal',
        tagline: 'Hardness Second Only to Diamond',
        vickersHardness: '2,000 HV (Mohs Scale 9)',
        weightComparison: 'Optically Pure Corundum Crystal',
        temperature: 'Anti-reflective, thermal shock resistant',
        scratchResistance: 'Impenetrable Clarity',
        description: 'Grown from pure aluminum oxide crystallization. RADO curves, metallizes, and 3D facets the crystal to form unified monobloc cases where the crystal becomes the very silhouette of the timepiece.',
        colorways: ['Double Anti-Reflective', 'Metallized Smoked Gold', 'Prismatic Edge'],
        badge: 'Optical Mastery'
    }
};

// Material Explorer Controller
function selectMaterial(materialKey) {
    const data = MATERIAL_DATA[materialKey];
    if (!data) return;

    // Update active tab buttons
    document.querySelectorAll('.material-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.material === materialKey);
    });

    // Update Details Display
    const titleEl = document.getElementById('mat-detail-title');
    const tagEl = document.getElementById('mat-detail-tagline');
    const descEl = document.getElementById('mat-detail-desc');
    const vickersEl = document.getElementById('mat-detail-vickers');
    const tempEl = document.getElementById('mat-detail-temp');
    const weightEl = document.getElementById('mat-detail-weight');
    const scratchEl = document.getElementById('mat-detail-scratch');
    const badgeEl = document.getElementById('mat-detail-badge');
    const visualizer = document.getElementById('material-orb-visualizer');

    if (titleEl) titleEl.textContent = data.title;
    if (tagEl) tagEl.textContent = data.tagline;
    if (descEl) descEl.textContent = data.description;
    if (vickersEl) vickersEl.textContent = data.vickersHardness;
    if (tempEl) tempEl.textContent = data.temperature;
    if (weightEl) weightEl.textContent = data.weightComparison;
    if (scratchEl) scratchEl.textContent = data.scratchResistance;
    if (badgeEl) badgeEl.textContent = data.badge;

    if (visualizer) {
        visualizer.className = `material-orb-sphere orb-${materialKey}`;
    }

    if (window.luxuryAudio) {
        window.luxuryAudio.playCrystalChime(750);
    }
}

// Heritage Timeline Controller
function initHeritageSlider() {
    const milestones = document.querySelectorAll('.timeline-card');
    const navItems = document.querySelectorAll('.timeline-nav-item');

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            milestones.forEach(m => m.classList.remove('active'));
            
            item.classList.add('active');
            if (milestones[index]) {
                milestones[index].classList.add('active');
            }
            if (window.luxuryAudio) window.luxuryAudio.playCrystalChime(600 + index * 100);
        });
    });
}

// Navbar Scroll Morph & Parallax
function handleNavbarScroll() {
    const navbar = document.querySelector('.luxury-navbar');
    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Reveal on Scroll Animations
function initScrollObserver() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Mobile Navigation Toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links-menu');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });
    }
}

// Magnetic Subtle Cursor Glow
function initCursorAura() {
    const aura = document.createElement('div');
    aura.className = 'luxury-cursor-aura';
    document.body.appendChild(aura);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        auraX += (mouseX - auraX) * 0.1;
        auraY += (mouseY - auraY) * 0.1;
        aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleNavbarScroll);
    initScrollObserver();
    initHeritageSlider();
    initMobileMenu();
    initCursorAura();

    // Default material
    selectMaterial('ceramic');

    // Material tabs
    document.querySelectorAll('.material-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const matKey = btn.dataset.material;
            selectMaterial(matKey);
        });
    });

    // Sound toggle button
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            if (window.luxuryAudio) {
                window.luxuryAudio.toggleSound();
            }
        });
    }
});
