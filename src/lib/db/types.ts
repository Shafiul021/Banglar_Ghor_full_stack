export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  neighborhood: string;
  category: string;
  description: string;
  short_description: string;
  hero_image: string;
  budget_min: number;
  budget_max: number;
  budget_display: string;
  timeline: string;
  property_type: string;
  year_completed: number;
  featured: number; // 1 or 0
  published: number; // 1 or 0
  client_goals?: string;
  challenges?: string;
  design_approach?: string;
  construction_notes?: string;
  final_result?: string;
  materials?: string; // JSON array of { category: string, detail: string }
  sort_order: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  image_type: 'hero' | 'gallery' | 'before' | 'after' | 'detail';
  caption?: string;
  sort_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  hero_image: string;
  benefits: string; // JSON array of string
  scope_items: string; // JSON array of string
  materials_summary: string;
  process_steps: string; // JSON array of { step: string, title: string, desc: string }
  faq_items?: string; // JSON array of { q: string, a: string }
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  project_type: string;
  rating: number;
  quote: string;
  image_url?: string;
  featured: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Pricing' | 'Design' | 'Construction' | 'Timeline' | 'Financing';
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  state_region: string;
  description: string;
  neighborhoods: string; // JSON array of strings
  image_url: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface ProcessStep {
  id: string;
  step_number: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string; // JSON array of strings
  image_url: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface CompanySettings {
  id: string;
  company_name: string;
  phone: string;
  email: string;
  address: string;
  business_hours: string;
  license_info: string;
  insurance_info: string;
  hero_eyebrow: string;
  hero_heading: string;
  hero_subtext: string;
  hero_image: string;
  why_us_heading: string;
  why_us_subtext: string;
  cta_heading: string;
  cta_subtext: string;
  footer_about: string;
  updated_at: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  project_type: string;
  property_type: string;
  budget: string;
  timeline: string;
  project_details: string;
  address?: string;
  preferred_contact_method?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Consultation Scheduled' | 'Proposal Sent' | 'Won' | 'Lost' | 'Archived';
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'New' | 'Read' | 'Responded' | 'Archived';
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'Super Admin' | 'Content Manager' | 'Project Manager' | 'Sales' | 'Editor' | 'Viewer';
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  admin_user: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: string;
  created_at: string;
}

export interface MediaItem {
  id: string;
  name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  category: string;
  created_at: string;
}
