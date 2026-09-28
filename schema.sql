-- ==============================================================================
-- RADO SWITZERLAND - VIP CONCIERGE & ATELIER SUPABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/xyqwuwayvwmhjeibdksk/sql/new

-- 1. Create table for VIP Boutique Concierge Appointments
CREATE TABLE IF NOT EXISTS public.concierge_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    boutique_location TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    consultation_type TEXT NOT NULL,
    special_requests TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- 2. Create table for RADO Privé VIP Members & Inquiries
CREATE TABLE IF NOT EXISTS public.vip_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    interest_category TEXT,
    message TEXT,
    vip_status TEXT DEFAULT 'prospective' CHECK (vip_status IN ('prospective', 'verified', 'atelier_exclusive'))
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.concierge_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Public Submissions (Anon access allowed to submit)
DROP POLICY IF EXISTS "Allow anonymous insert concierge" ON public.concierge_appointments;
CREATE POLICY "Allow anonymous insert concierge" ON public.concierge_appointments
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous select own concierge" ON public.concierge_appointments;
CREATE POLICY "Allow anonymous select own concierge" ON public.concierge_appointments
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow anonymous insert vip" ON public.vip_inquiries;
CREATE POLICY "Allow anonymous insert vip" ON public.vip_inquiries
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous select vip" ON public.vip_inquiries;
CREATE POLICY "Allow anonymous select vip" ON public.vip_inquiries
    FOR SELECT TO anon USING (true);

-- 5. Confirmation message
COMMENT ON TABLE public.concierge_appointments IS 'RADO Private Boutique Appointment Consultations';
COMMENT ON TABLE public.vip_inquiries IS 'RADO Privé VIP Inquiries & Atelier Subscriptions';
