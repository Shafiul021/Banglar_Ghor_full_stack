-- =====================================================================
-- Banlgar Ghor Remodeling - Production Supabase PostgreSQL Schema & RLS
-- =====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Company Settings Table
CREATE TABLE IF NOT EXISTS public.company_settings (
    id TEXT PRIMARY KEY DEFAULT 'company-main',
    company_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    business_hours TEXT NOT NULL,
    license_info TEXT NOT NULL,
    insurance_info TEXT NOT NULL,
    hero_eyebrow TEXT NOT NULL,
    hero_heading TEXT NOT NULL,
    hero_subtext TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    why_us_heading TEXT NOT NULL,
    why_us_subtext TEXT NOT NULL,
    cta_heading TEXT NOT NULL,
    cta_subtext TEXT NOT NULL,
    footer_about TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    budget_min INTEGER NOT NULL,
    budget_max INTEGER NOT NULL,
    budget_display TEXT NOT NULL,
    timeline TEXT NOT NULL,
    property_type TEXT NOT NULL,
    year_completed INTEGER NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    client_goals TEXT,
    challenges TEXT,
    design_approach TEXT,
    construction_notes TEXT,
    final_result TEXT,
    materials JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);

-- 3. Project Images Table
CREATE TABLE IF NOT EXISTS public.project_images (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type TEXT NOT NULL CHECK (image_type IN ('hero', 'gallery', 'before', 'after', 'detail')),
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    scope_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    materials_summary TEXT NOT NULL,
    process_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    faq_items JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(published);

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    project_type TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    quote TEXT NOT NULL,
    image_url TEXT,
    featured INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(published);

-- 6. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('General', 'Process', 'Pricing', 'Design', 'Construction', 'Timeline', 'Financing')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON public.faqs(published);

-- 7. Service Areas Table
CREATE TABLE IF NOT EXISTS public.service_areas (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    state_region TEXT NOT NULL,
    description TEXT NOT NULL,
    neighborhoods JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Process Steps Table
CREATE TABLE IF NOT EXISTS public.process_steps (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Consultation Requests Table (Leads)
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    project_type TEXT NOT NULL,
    property_type TEXT NOT NULL,
    budget TEXT NOT NULL,
    timeline TEXT NOT NULL,
    project_details TEXT NOT NULL,
    address TEXT,
    preferred_contact_method TEXT DEFAULT 'Email',
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Consultation Scheduled', 'Proposal Sent', 'Won', 'Lost', 'Archived')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_consultation_status ON public.consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created_at ON public.consultation_requests(created_at);

-- 11. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Read', 'Responded', 'Archived')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);

-- 12. Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Super Admin', 'Content Manager', 'Project Manager', 'Sales', 'Editor', 'Viewer')),
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    admin_user TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Media Library Table
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

-- Public can READ published content
CREATE POLICY "Public read company settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (published = 1);
CREATE POLICY "Public read project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public read published services" ON public.services FOR SELECT USING (published = 1);
CREATE POLICY "Public read published testimonials" ON public.testimonials FOR SELECT USING (published = 1);
CREATE POLICY "Public read published faqs" ON public.faqs FOR SELECT USING (published = 1);
CREATE POLICY "Public read published service areas" ON public.service_areas FOR SELECT USING (published = 1);
CREATE POLICY "Public read published process steps" ON public.process_steps FOR SELECT USING (published = 1);
CREATE POLICY "Public read published team members" ON public.team_members FOR SELECT USING (published = 1);

-- Public can INSERT leads/messages (Forms)
CREATE POLICY "Public submit consultation requests" ON public.consultation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Public CANNOT read leads or messages (Protected by absence of SELECT policy for anon)
-- Authenticated admins have full CRUD access
CREATE POLICY "Admins full access company_settings" ON public.company_settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access projects" ON public.projects TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access project_images" ON public.project_images TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access services" ON public.services TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access testimonials" ON public.testimonials TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access faqs" ON public.faqs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access service_areas" ON public.service_areas TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access process_steps" ON public.process_steps TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access team_members" ON public.team_members TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access consultation_requests" ON public.consultation_requests TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access contact_messages" ON public.contact_messages TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access admin_users" ON public.admin_users TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access audit_logs" ON public.audit_logs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access media_items" ON public.media_items TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- STORAGE BUCKETS (Supabase Storage)
-- =====================================================================
-- insert into storage.buckets (id, name, public) values ('remodeling-media', 'remodeling-media', true) on conflict do nothing;
-- create policy "Public Access Media" on storage.objects for select using ( bucket_id = 'remodeling-media' );
-- create policy "Authenticated Uploads" on storage.objects for insert to authenticated with check ( bucket_id = 'remodeling-media' );
