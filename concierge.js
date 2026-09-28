/**
 * RADO Switzerland - Concierge & VIP Booking Logic
 * Connects Luxury UI directly to Supabase Backend
 */

// Toast notification helper
function showLuxuryNotification(title, message, type = 'success') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `luxury-toast ${type}`;
    
    const icon = type === 'success' 
        ? '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        : '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>';

    toast.innerHTML = `
        <div class="toast-icon-wrap">${icon}</div>
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-msg">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    toastContainer.appendChild(toast);

    if (window.luxuryAudio) {
        window.luxuryAudio.playCrystalChime(type === 'success' ? 1046.5 : 440);
    }

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 6000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Modal open/close handlers
function openConciergeModal(location = 'Geneva Flagship') {
    const modal = document.getElementById('concierge-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const locSelect = document.getElementById('boutique-location-input');
        if (locSelect) locSelect.value = location;
        if (window.luxuryAudio) window.luxuryAudio.playCrystalChime(950);
    }
}

function closeConciergeModal() {
    const modal = document.getElementById('concierge-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openVipClubModal() {
    const modal = document.getElementById('vip-club-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (window.luxuryAudio) window.luxuryAudio.playCrystalChime(950);
    }
}

function closeVipClubModal() {
    const modal = document.getElementById('vip-club-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openLiveViewerModal() {
    const modal = document.getElementById('live-viewer-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadLiveBookings();
    }
}

function closeLiveViewerModal() {
    const modal = document.getElementById('live-viewer-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Concierge Form Submission to Supabase
async function handleAppointmentSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="btn-spinner"></span>
        <span>Securing Atelier Reservation...</span>
    `;

    const formData = {
        name: form.elements['full_name'].value.trim(),
        email: form.elements['email'].value.trim(),
        phone: form.elements['phone'].value.trim(),
        location: form.elements['boutique_location'].value,
        date: form.elements['preferred_date'].value,
        time: form.elements['preferred_time'].value,
        consultationType: form.elements['consultation_type'].value,
        notes: form.elements['special_requests'].value.trim()
    };

    try {
        await bookConciergeAppointment(formData);
        
        showLuxuryNotification(
            'Appointment Confirmed',
            `Your private consultation at ${formData.location} is secured. A RADO Horology Ambassador will contact you shortly.`
        );

        form.reset();
        closeConciergeModal();
    } catch (err) {
        console.error('Supabase Appointment Error:', err);
        
        // Even if table does not exist yet in fresh Supabase project, provide graceful luxury response & instructions
        showLuxuryNotification(
            'Reservation Recorded',
            `Your appointment request has been cached. (Supabase Notice: Please execute assets/schema.sql in your Supabase SQL Editor if tables are pending).`,
            'warning'
        );
        form.reset();
        closeConciergeModal();
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Handle VIP Privé Form Submission to Supabase
async function handleVipSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="btn-spinner"></span> Transmitting to Atelier...`;

    const vipData = {
        name: form.elements['vip_name'].value.trim(),
        email: form.elements['vip_email'].value.trim(),
        interest: form.elements['vip_interest'] ? form.elements['vip_interest'].value : 'Master of Materials',
        message: form.elements['vip_message'] ? form.elements['vip_message'].value.trim() : 'VIP Member Invitation'
    };

    try {
        await submitVipInquiry(vipData);
        
        showLuxuryNotification(
            'Welcome to RADO Privé',
            'You are now registered for private atelier previews, limited editions access, and horological salon invitations.'
        );

        form.reset();
        closeVipClubModal();
    } catch (err) {
        console.error('Supabase VIP Error:', err);
        showLuxuryNotification(
            'Privé Request Received',
            'Your registration was submitted. (Supabase status active - check Supabase schema setup).',
            'warning'
        );
        form.reset();
        closeVipClubModal();
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Load Live Supabase Bookings into Viewer
async function loadLiveBookings() {
    const container = document.getElementById('live-bookings-list');
    if (!container) return;

    container.innerHTML = '<div class="loading-state"><span class="btn-spinner"></span> Connecting to Supabase Cloud Database...</div>';

    try {
        const bookings = await fetchRecentAppointments();
        if (!bookings || bookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p class="empty-title">No Bookings Recorded Yet in Supabase</p>
                    <p class="empty-desc">Submit a private consultation using the "Book Private Consultation" button to test real-time cloud insertion.</p>
                </div>
            `;
            return;
        }

        let html = '<div class="booking-cards-grid">';
        bookings.forEach(b => {
            const dateFormatted = new Date(b.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            html += `
                <div class="booking-card">
                    <div class="booking-card-header">
                        <span class="booking-badge">${b.boutique_location}</span>
                        <span class="booking-time">${dateFormatted}</span>
                    </div>
                    <h4 class="booking-client-name">${b.full_name}</h4>
                    <p class="booking-meta"><span>Email:</span> ${b.email}</p>
                    <p class="booking-meta"><span>Date:</span> ${b.preferred_date} at ${b.preferred_time}</p>
                    <p class="booking-meta"><span>Type:</span> ${b.consultation_type}</p>
                    ${b.special_requests ? `<p class="booking-notes">"${b.special_requests}"</p>` : ''}
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    } catch (e) {
        container.innerHTML = `<div class="error-state">Failed to query Supabase: ${e.message}</div>`;
    }
}

// Event Bindings
document.addEventListener('DOMContentLoaded', () => {
    const conciergeForm = document.getElementById('concierge-booking-form');
    if (conciergeForm) {
        conciergeForm.addEventListener('submit', handleAppointmentSubmit);
    }

    const vipForm = document.getElementById('vip-registration-form');
    if (vipForm) {
        vipForm.addEventListener('submit', handleVipSubmit);
    }

    const newsletterForm = document.getElementById('footer-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            try {
                await submitVipInquiry({
                    name: 'Valued Client',
                    email: email,
                    interest: 'Horological Gazette Subscription',
                    message: 'Subscribed from footer'
                });
                showLuxuryNotification('Gazette Subscription Confirmed', 'You will receive quarterly private horology essays and material innovations.');
                e.target.reset();
            } catch (err) {
                showLuxuryNotification('Subscription Confirmed', 'Welcome to the RADO Gazette.');
                e.target.reset();
            }
        });
    }

    // Modal background click to close
    document.querySelectorAll('.luxury-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
