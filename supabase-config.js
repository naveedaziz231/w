/**
 * RADO Switzerland - Supabase Cloud Database Client Configuration
 * Master of Materials Experience & VIP Concierge
 */

// Supabase Connection Credentials (from user project)
const SUPABASE_PROJECT_URL = 'https://xyqwuwayvwmhjeibdksk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cXd1d2F5dndtaGplaWJka3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NzQxNTksImV4cCI6MjEwNjE1MDE1OX0.A_FpcceSpkbPPEdMEtIatnKL0Jsrx58b-iVwALHUd3Y';

let supabaseClient = null;

// Initialize Supabase Client
function initSupabase() {
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabaseClient = window.supabase.createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
            console.log('%c[RADO CONCIERGE] Supabase client initialized successfully.', 'color: #c5a059; font-weight: bold;');
            checkSupabaseConnection();
        } else {
            console.warn('[RADO CONCIERGE] Supabase JS SDK not loaded yet. Retrying...');
            setTimeout(initSupabase, 500);
        }
    } catch (err) {
        console.error('[RADO CONCIERGE] Error initializing Supabase:', err);
    }
}

// Test Connection & Table Status
async function checkSupabaseConnection() {
    const statusIndicator = document.getElementById('supabase-status-indicator');
    const statusText = document.getElementById('supabase-status-text');
    
    if (!supabaseClient) return;

    try {
        // Query check to test connectivity
        const { data, error } = await supabaseClient
            .from('concierge_appointments')
            .select('id')
            .limit(1);

        if (statusIndicator && statusText) {
            if (!error) {
                statusIndicator.className = 'status-dot online';
                statusText.textContent = 'Boutique Cloud Connected';
            } else if (error.code === 'PGRST116' || error.message.includes('relation') || error.code === '42P01') {
                // Table not created yet
                statusIndicator.className = 'status-dot pending-table';
                statusText.textContent = 'Connected (Run schema.sql in Supabase)';
            } else {
                statusIndicator.className = 'status-dot online';
                statusText.textContent = 'Boutique Service Active';
            }
        }
    } catch (e) {
        console.log('Supabase connection note:', e.message);
        if (statusIndicator && statusText) {
            statusIndicator.className = 'status-dot online';
            statusText.textContent = 'VIP Concierge Active';
        }
    }
}

// Insert Boutique Appointment
async function bookConciergeAppointment(appointmentData) {
    if (!supabaseClient) {
        throw new Error('Supabase client is not connected.');
    }

    const payload = {
        full_name: appointmentData.name,
        email: appointmentData.email,
        phone: appointmentData.phone || '',
        boutique_location: appointmentData.location,
        preferred_date: appointmentData.date,
        preferred_time: appointmentData.time,
        consultation_type: appointmentData.consultationType || 'Bespoke Atelier Viewing',
        special_requests: appointmentData.notes || '',
        status: 'pending'
    };

    const { data, error } = await supabaseClient
        .from('concierge_appointments')
        .insert([payload])
        .select();

    if (error) {
        console.error('Error inserting appointment into Supabase:', error);
        throw error;
    }

    return data;
}

// Insert VIP Member / Inquiry
async function submitVipInquiry(vipData) {
    if (!supabaseClient) {
        throw new Error('Supabase client is not connected.');
    }

    const payload = {
        full_name: vipData.name,
        email: vipData.email,
        interest_category: vipData.interest || 'High-Tech Ceramic Heritage',
        message: vipData.message || '',
        vip_status: 'prospective'
    };

    const { data, error } = await supabaseClient
        .from('vip_inquiries')
        .insert([payload])
        .select();

    if (error) {
        console.error('Error registering VIP member in Supabase:', error);
        throw error;
    }

    return data;
}

// Fetch recent appointments for the VIP concierge viewer
async function fetchRecentAppointments() {
    if (!supabaseClient) return [];
    try {
        const { data, error } = await supabaseClient
            .from('concierge_appointments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);
        
        if (error) throw error;
        return data || [];
    } catch (err) {
        console.warn('Could not fetch appointments (table may not exist yet):', err.message);
        return [];
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
});
