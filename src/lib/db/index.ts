import { createClient, Client } from '@libsql/client';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import {
  Project,
  ProjectImage,
  Service,
  Testimonial,
  FAQ,
  ServiceArea,
  ProcessStep,
  TeamMember,
  CompanySettings,
  ConsultationRequest,
  ContactMessage,
  AdminUser,
  AuditLog,
  MediaItem,
} from './types';
import {
  INITIAL_COMPANY_SETTINGS,
  INITIAL_PROJECTS,
  INITIAL_PROJECT_IMAGES,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_SERVICE_AREAS,
  INITIAL_PROCESS_STEPS,
  INITIAL_TEAM_MEMBERS,
} from './seed-data';

let clientInstance: Client | null = null;
let initialized = false;

export function getDb(): Client {
  if (!clientInstance) {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'banlgar_ghor.db');
    clientInstance = createClient({
      url: `file:${dbPath}`,
    });
  }
  return clientInstance;
}

export async function ensureDbInitialized() {
  if (initialized) return;
  const db = getDb();

  // Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS company_settings (
      id TEXT PRIMARY KEY,
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
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
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
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      client_goals TEXT,
      challenges TEXT,
      design_approach TEXT,
      construction_notes TEXT,
      final_result TEXT,
      materials TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS project_images (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      image_type TEXT NOT NULL,
      caption TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      hero_image TEXT NOT NULL,
      benefits TEXT NOT NULL,
      scope_items TEXT NOT NULL,
      materials_summary TEXT NOT NULL,
      process_steps TEXT NOT NULL,
      faq_items TEXT,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      project_type TEXT NOT NULL,
      rating INTEGER NOT NULL,
      quote TEXT NOT NULL,
      image_url TEXT,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS service_areas (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      state_region TEXT NOT NULL,
      description TEXT NOT NULL,
      neighborhoods TEXT NOT NULL,
      image_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS process_steps (
      id TEXT PRIMARY KEY,
      step_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      deliverables TEXT NOT NULL,
      image_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL,
      image_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS consultation_requests (
      id TEXT PRIMARY KEY,
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
      preferred_contact_method TEXT,
      status TEXT DEFAULT 'New',
      internal_notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'New',
      internal_notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_user TEXT NOT NULL,
      action TEXT NOT NULL,
      entity TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      created_at TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS media_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_size INTEGER,
      mime_type TEXT,
      category TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // Seed data with INSERT OR IGNORE (safe and idempotent)
    // Seed Company Settings
    const s = INITIAL_COMPANY_SETTINGS;
    await db.execute({
      sql: `INSERT OR IGNORE INTO company_settings (
        id, company_name, phone, email, address, business_hours, license_info, insurance_info,
        hero_eyebrow, hero_heading, hero_subtext, hero_image, why_us_heading, why_us_subtext,
        cta_heading, cta_subtext, footer_about, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        s.id, s.company_name, s.phone, s.email, s.address, s.business_hours, s.license_info, s.insurance_info,
        s.hero_eyebrow, s.hero_heading, s.hero_subtext, s.hero_image, s.why_us_heading, s.why_us_subtext,
        s.cta_heading, s.cta_subtext, s.footer_about, s.updated_at
      ],
    });

    // Seed Projects
    for (const p of INITIAL_PROJECTS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO projects (
          id, title, slug, location, neighborhood, category, description, short_description,
          hero_image, budget_min, budget_max, budget_display, timeline, property_type,
          year_completed, featured, published, client_goals, challenges, design_approach,
          construction_notes, final_result, materials, sort_order, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          p.id, p.title, p.slug, p.location, p.neighborhood, p.category, p.description, p.short_description,
          p.hero_image, p.budget_min, p.budget_max, p.budget_display, p.timeline, p.property_type,
          p.year_completed, p.featured, p.published, p.client_goals || '', p.challenges || '', p.design_approach || '',
          p.construction_notes || '', p.final_result || '', p.materials || '[]', p.sort_order, p.created_at, p.updated_at
        ],
      });
    }

    // Seed Project Images
    for (const img of INITIAL_PROJECT_IMAGES) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO project_images (id, project_id, image_url, image_type, caption, sort_order, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [img.id, img.project_id, img.image_url, img.image_type, img.caption || '', img.sort_order, img.created_at],
      });
    }

    // Seed Services
    for (const srv of INITIAL_SERVICES) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO services (
          id, name, slug, short_description, full_description, hero_image, benefits, scope_items,
          materials_summary, process_steps, faq_items, sort_order, published, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          srv.id, srv.name, srv.slug, srv.short_description, srv.full_description, srv.hero_image,
          srv.benefits, srv.scope_items, srv.materials_summary, srv.process_steps, srv.faq_items || '[]',
          srv.sort_order, srv.published, srv.created_at, srv.updated_at
        ],
      });
    }

    // Seed Testimonials
    for (const t of INITIAL_TESTIMONIALS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO testimonials (id, name, location, project_type, rating, quote, image_url, featured, published, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [t.id, t.name, t.location, t.project_type, t.rating, t.quote, t.image_url || '', t.featured, t.published, t.created_at, t.updated_at],
      });
    }

    // Seed FAQs
    for (const f of INITIAL_FAQS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO faqs (id, question, answer, category, sort_order, published, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [f.id, f.question, f.answer, f.category, f.sort_order, f.published, f.created_at, f.updated_at],
      });
    }

    // Seed Service Areas
    for (const a of INITIAL_SERVICE_AREAS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO service_areas (id, name, state_region, description, neighborhoods, image_url, sort_order, published, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [a.id, a.name, a.state_region, a.description, a.neighborhoods, a.image_url, a.sort_order, a.published, a.created_at, a.updated_at],
      });
    }

    // Seed Process Steps
    for (const ps of INITIAL_PROCESS_STEPS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO process_steps (id, step_number, title, subtitle, description, deliverables, image_url, sort_order, published, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [ps.id, ps.step_number, ps.title, ps.subtitle, ps.description, ps.deliverables, ps.image_url, ps.sort_order, ps.published, ps.created_at, ps.updated_at],
      });
    }

    // Seed Team Members
    for (const tm of INITIAL_TEAM_MEMBERS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO team_members (id, name, role, bio, image_url, sort_order, published, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [tm.id, tm.name, tm.role, tm.bio, tm.image_url, tm.sort_order, tm.published, tm.created_at, tm.updated_at],
      });
    }

    // Seed Super Admin User
    const adminPasswordHash = await bcrypt.hash('admin123456', 10);
    await db.execute({
      sql: `INSERT OR IGNORE INTO admin_users (id, email, password_hash, full_name, role, is_active, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'usr-admin-1',
        'admin@banlgarghor.com',
        adminPasswordHash,
        'Rahman Banlgar',
        'Super Admin',
        1,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    });

    // Seed sample Consultation Leads
    await db.execute({
      sql: `INSERT OR IGNORE INTO consultation_requests (
        id, name, email, phone, zip_code, project_type, property_type, budget, timeline, project_details, address, preferred_contact_method, status, internal_notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'lead-1',
        'Victoria Kensington',
        'victoria.k@gmail.com',
        '(917) 555-4921',
        '10024',
        'Kitchen Remodeling',
        'Pre-War Co-op',
        '$100k–$250k',
        '1–3 Months',
        'Gut renovation of our 350 sq ft Upper West Side kitchen. Seeking custom fluted walnut millwork and marble waterfall island.',
        'West End Ave & 79th St, Apt 8B',
        'Email',
        'New',
        'Requested initial walk-through next Tuesday.',
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    });

    await db.execute({
      sql: `INSERT OR IGNORE INTO consultation_requests (
        id, name, email, phone, zip_code, project_type, property_type, budget, timeline, project_details, address, preferred_contact_method, status, internal_notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'lead-2',
        'Ethan & Chloe Bennett',
        'ethan.bennett@firm.com',
        '(718) 555-8832',
        '11215',
        'Whole-Home Renovation',
        'Brownstone',
        '$250k–$500k',
        '3–6 Months',
        'Full 4-story historic brownstone restoration in Park Slope. Restoring historic woodwork while modernizing the parlor kitchen and bathrooms.',
        '8th Ave & 2nd St, Brooklyn',
        'Phone',
        'Consultation Scheduled',
        'Met on site; preparing preliminary space planning proposal.',
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    });

    // Seed sample Contact Message
    await db.execute({
      sql: `INSERT OR IGNORE INTO contact_messages (
        id, name, email, phone, message, status, internal_notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'msg-1',
        'Jonathan Miller',
        'jmiller@archgroup.com',
        '(212) 555-9011',
        'Inquiring if your design-build team collaborates with independent architectural studios for high-end Chelsea loft renovations.',
        'New',
        'Follow up with Rahman.',
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    });

    // Seed sample Media Items
    await db.execute({
      sql: `INSERT OR IGNORE INTO media_items (id, name, file_url, category, created_at) VALUES (?, ?, ?, ?, ?)`,
      args: ['med-1', 'Chelsea Kitchen Hero', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop', 'projects', new Date().toISOString()],
    });

    // Seed initial Audit Log
    await db.execute({
      sql: `INSERT OR IGNORE INTO audit_logs (id, admin_user, action, entity, details, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      args: ['audit-1', 'System Initializer', 'Initialized Database', 'System', 'Seed database populated with luxury NYC remodeling content.', new Date().toISOString()],
    });


  initialized = true;
}

// -------------------------------------------------------------
// REPOSITORY FUNCTIONS
// -------------------------------------------------------------

function toPlain<T>(data: T): T {
  if (data === null || data === undefined) return data;
  return JSON.parse(JSON.stringify(data));
}

export async function getCompanySettings(): Promise<CompanySettings> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute('SELECT * FROM company_settings LIMIT 1');
  if (res.rows.length === 0) return toPlain(INITIAL_COMPANY_SETTINGS);
  return toPlain(res.rows[0] as unknown as CompanySettings);
}

export async function updateCompanySettings(data: Partial<CompanySettings>): Promise<CompanySettings> {
  await ensureDbInitialized();
  const db = getDb();
  const current = await getCompanySettings();
  const updated: CompanySettings = {
    ...current,
    ...data,
    updated_at: new Date().toISOString(),
  };

  await db.execute({
    sql: `UPDATE company_settings SET
      company_name = ?, phone = ?, email = ?, address = ?, business_hours = ?,
      license_info = ?, insurance_info = ?, hero_eyebrow = ?, hero_heading = ?,
      hero_subtext = ?, hero_image = ?, why_us_heading = ?, why_us_subtext = ?,
      cta_heading = ?, cta_subtext = ?, footer_about = ?, updated_at = ?
      WHERE id = ?`,
    args: [
      updated.company_name, updated.phone, updated.email, updated.address, updated.business_hours,
      updated.license_info, updated.insurance_info, updated.hero_eyebrow, updated.hero_heading,
      updated.hero_subtext, updated.hero_image, updated.why_us_heading, updated.why_us_subtext,
      updated.cta_heading, updated.cta_subtext, updated.footer_about, updated.updated_at,
      updated.id,
    ],
  });

  return updated;
}

export async function getProjects(options?: {
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  category?: string;
}): Promise<Project[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM projects WHERE 1=1';
  const args: (string | number)[] = [];

  if (options?.publishedOnly !== false) {
    sql += ' AND published = 1';
  }
  if (options?.featuredOnly) {
    sql += ' AND featured = 1';
  }
  if (options?.category && options.category !== 'All') {
    sql += ' AND category = ?';
    args.push(options.category);
  }

  sql += ' ORDER BY sort_order ASC, created_at DESC';
  const res = await db.execute({ sql, args });
  const projects = res.rows as unknown as Project[];

  // Fetch images for each project
  for (const p of projects) {
    const imgRes = await db.execute({
      sql: 'SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC',
      args: [p.id],
    });
    p.images = imgRes.rows as unknown as ProjectImage[];
  }

  return toPlain(projects);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT * FROM projects WHERE slug = ? LIMIT 1',
    args: [slug],
  });
  if (res.rows.length === 0) return null;
  const project = res.rows[0] as unknown as Project;

  const imgRes = await db.execute({
    sql: 'SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC',
    args: [project.id],
  });
  project.images = imgRes.rows as unknown as ProjectImage[];

  return toPlain(project);
}

export async function getProjectById(id: string): Promise<Project | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT * FROM projects WHERE id = ? LIMIT 1',
    args: [id],
  });
  if (res.rows.length === 0) return null;
  const project = res.rows[0] as unknown as Project;

  const imgRes = await db.execute({
    sql: 'SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC',
    args: [project.id],
  });
  project.images = imgRes.rows as unknown as ProjectImage[];

  return toPlain(project);
}

export async function createProject(data: Partial<Project>, images?: Partial<ProjectImage>[]): Promise<Project> {
  await ensureDbInitialized();
  const db = getDb();
  const id = data.id || `proj-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO projects (
      id, title, slug, location, neighborhood, category, description, short_description,
      hero_image, budget_min, budget_max, budget_display, timeline, property_type,
      year_completed, featured, published, client_goals, challenges, design_approach,
      construction_notes, final_result, materials, sort_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      data.title || 'Untitled Project',
      data.slug || `project-${Date.now()}`,
      data.location || 'New York, NY',
      data.neighborhood || '',
      data.category || 'Kitchen Remodeling',
      data.description || '',
      data.short_description || '',
      data.hero_image || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
      data.budget_min || 50000,
      data.budget_max || 100000,
      data.budget_display || '$50,000 – $100,000',
      data.timeline || '8–12 weeks',
      data.property_type || 'Residence',
      data.year_completed || new Date().getFullYear(),
      data.featured ? 1 : 0,
      data.published !== undefined ? (data.published ? 1 : 0) : 1,
      data.client_goals || '',
      data.challenges || '',
      data.design_approach || '',
      data.construction_notes || '',
      data.final_result || '',
      data.materials || '[]',
      data.sort_order || 0,
      now,
      now,
    ],
  });

  if (images && images.length > 0) {
    for (const [idx, img] of images.entries()) {
      await db.execute({
        sql: `INSERT INTO project_images (id, project_id, image_url, image_type, caption, sort_order, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          img.id || `img-${Date.now()}-${idx}`,
          id,
          img.image_url || data.hero_image || '',
          img.image_type || 'gallery',
          img.caption || '',
          idx + 1,
          now,
        ],
      });
    }
  }

  return (await getProjectById(id))!;
}

export async function updateProject(id: string, data: Partial<Project>, images?: Partial<ProjectImage>[]): Promise<Project | null> {
  await ensureDbInitialized();
  const db = getDb();
  const current = await getProjectById(id);
  if (!current) return null;

  const now = new Date().toISOString();
  await db.execute({
    sql: `UPDATE projects SET
      title = ?, slug = ?, location = ?, neighborhood = ?, category = ?,
      description = ?, short_description = ?, hero_image = ?,
      budget_min = ?, budget_max = ?, budget_display = ?, timeline = ?,
      property_type = ?, year_completed = ?, featured = ?, published = ?,
      client_goals = ?, challenges = ?, design_approach = ?,
      construction_notes = ?, final_result = ?, materials = ?,
      sort_order = ?, updated_at = ?
      WHERE id = ?`,
    args: [
      data.title ?? current.title,
      data.slug ?? current.slug,
      data.location ?? current.location,
      data.neighborhood ?? current.neighborhood,
      data.category ?? current.category,
      data.description ?? current.description,
      data.short_description ?? current.short_description,
      data.hero_image ?? current.hero_image,
      data.budget_min ?? current.budget_min,
      data.budget_max ?? current.budget_max,
      data.budget_display ?? current.budget_display,
      data.timeline ?? current.timeline,
      data.property_type ?? current.property_type,
      data.year_completed ?? current.year_completed,
      data.featured !== undefined ? (data.featured ? 1 : 0) : current.featured,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      data.client_goals ?? current.client_goals ?? '',
      data.challenges ?? current.challenges ?? '',
      data.design_approach ?? current.design_approach ?? '',
      data.construction_notes ?? current.construction_notes ?? '',
      data.final_result ?? current.final_result ?? '',
      data.materials ?? current.materials ?? '[]',
      data.sort_order ?? current.sort_order,
      now,
      id,
    ],
  });

  if (images !== undefined) {
    // Replace images
    await db.execute({
      sql: 'DELETE FROM project_images WHERE project_id = ?',
      args: [id],
    });
    for (const [idx, img] of images.entries()) {
      await db.execute({
        sql: `INSERT INTO project_images (id, project_id, image_url, image_type, caption, sort_order, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          img.id || `img-${Date.now()}-${idx}`,
          id,
          img.image_url || '',
          img.image_type || 'gallery',
          img.caption || '',
          img.sort_order ?? idx + 1,
          now,
        ],
      });
    }
  }

  return await getProjectById(id);
}

export async function deleteProject(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM project_images WHERE project_id = ?', args: [id] });
  await db.execute({ sql: 'DELETE FROM projects WHERE id = ?', args: [id] });
  return true;
}

export async function getServices(publishedOnly = true): Promise<Service[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM services';
  if (publishedOnly) {
    sql += ' WHERE published = 1';
  }
  sql += ' ORDER BY sort_order ASC, created_at ASC';
  const res = await db.execute(sql);
  return toPlain(res.rows as unknown as Service[]);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT * FROM services WHERE slug = ? LIMIT 1',
    args: [slug],
  });
  if (res.rows.length === 0) return null;
  return toPlain(res.rows[0] as unknown as Service);
}

export async function getServiceById(id: string): Promise<Service | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT * FROM services WHERE id = ? LIMIT 1',
    args: [id],
  });
  if (res.rows.length === 0) return null;
  return toPlain(res.rows[0] as unknown as Service);
}

export async function createService(data: Partial<Service>): Promise<Service> {
  await ensureDbInitialized();
  const db = getDb();
  const id = data.id || `serv-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO services (
      id, name, slug, short_description, full_description, hero_image, benefits,
      scope_items, materials_summary, process_steps, faq_items, sort_order, published, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      data.name || 'New Service',
      data.slug || `service-${Date.now()}`,
      data.short_description || '',
      data.full_description || '',
      data.hero_image || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
      data.benefits || '[]',
      data.scope_items || '[]',
      data.materials_summary || '',
      data.process_steps || '[]',
      data.faq_items || '[]',
      data.sort_order || 0,
      data.published !== undefined ? (data.published ? 1 : 0) : 1,
      now,
      now,
    ],
  });

  return (await getServiceById(id))!;
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  await ensureDbInitialized();
  const db = getDb();
  const current = await getServiceById(id);
  if (!current) return null;

  const now = new Date().toISOString();
  await db.execute({
    sql: `UPDATE services SET
      name = ?, slug = ?, short_description = ?, full_description = ?,
      hero_image = ?, benefits = ?, scope_items = ?, materials_summary = ?,
      process_steps = ?, faq_items = ?, sort_order = ?, published = ?, updated_at = ?
      WHERE id = ?`,
    args: [
      data.name ?? current.name,
      data.slug ?? current.slug,
      data.short_description ?? current.short_description,
      data.full_description ?? current.full_description,
      data.hero_image ?? current.hero_image,
      data.benefits ?? current.benefits,
      data.scope_items ?? current.scope_items,
      data.materials_summary ?? current.materials_summary,
      data.process_steps ?? current.process_steps,
      data.faq_items ?? current.faq_items ?? '[]',
      data.sort_order ?? current.sort_order,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      now,
      id,
    ],
  });

  return await getServiceById(id);
}

export async function deleteService(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM services WHERE id = ?', args: [id] });
  return true;
}

export async function getTestimonials(publishedOnly = true, featuredOnly = false): Promise<Testimonial[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM testimonials WHERE 1=1';
  if (publishedOnly) sql += ' AND published = 1';
  if (featuredOnly) sql += ' AND featured = 1';
  sql += ' ORDER BY created_at DESC';
  const res = await db.execute(sql);
  return toPlain(res.rows as unknown as Testimonial[]);
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
  await ensureDbInitialized();
  const db = getDb();
  const id = data.id || `test-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO testimonials (id, name, location, project_type, rating, quote, image_url, featured, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      data.name || 'Anonymous Client',
      data.location || 'New York, NY',
      data.project_type || 'Home Remodel',
      data.rating || 5,
      data.quote || '',
      data.image_url || '',
      data.featured ? 1 : 0,
      data.published !== undefined ? (data.published ? 1 : 0) : 1,
      now,
      now,
    ],
  });

  const res = await db.execute({ sql: 'SELECT * FROM testimonials WHERE id = ?', args: [id] });
  return toPlain(res.rows[0] as unknown as Testimonial);
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({ sql: 'SELECT * FROM testimonials WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  const current = res.rows[0] as unknown as Testimonial;
  const now = new Date().toISOString();

  await db.execute({
    sql: `UPDATE testimonials SET name = ?, location = ?, project_type = ?, rating = ?, quote = ?, image_url = ?, featured = ?, published = ?, updated_at = ? WHERE id = ?`,
    args: [
      data.name ?? current.name,
      data.location ?? current.location,
      data.project_type ?? current.project_type,
      data.rating ?? current.rating,
      data.quote ?? current.quote,
      data.image_url ?? current.image_url ?? '',
      data.featured !== undefined ? (data.featured ? 1 : 0) : current.featured,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      now,
      id,
    ],
  });

  const updatedRes = await db.execute({ sql: 'SELECT * FROM testimonials WHERE id = ?', args: [id] });
  return toPlain(updatedRes.rows[0] as unknown as Testimonial);
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM testimonials WHERE id = ?', args: [id] });
  return true;
}

export async function getFAQs(publishedOnly = true, category?: string): Promise<FAQ[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM faqs WHERE 1=1';
  const args: (string | number)[] = [];
  if (publishedOnly) sql += ' AND published = 1';
  if (category && category !== 'All') {
    sql += ' AND category = ?';
    args.push(category);
  }
  sql += ' ORDER BY sort_order ASC, created_at ASC';
  const res = await db.execute({ sql, args });
  return toPlain(res.rows as unknown as FAQ[]);
}

export async function createFAQ(data: Partial<FAQ>): Promise<FAQ> {
  await ensureDbInitialized();
  const db = getDb();
  const id = data.id || `faq-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO faqs (id, question, answer, category, sort_order, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      data.question || 'New Question',
      data.answer || '',
      data.category || 'General',
      data.sort_order || 0,
      data.published !== undefined ? (data.published ? 1 : 0) : 1,
      now,
      now,
    ],
  });

  const res = await db.execute({ sql: 'SELECT * FROM faqs WHERE id = ?', args: [id] });
  return toPlain(res.rows[0] as unknown as FAQ);
}

export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({ sql: 'SELECT * FROM faqs WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  const current = res.rows[0] as unknown as FAQ;
  const now = new Date().toISOString();

  await db.execute({
    sql: `UPDATE faqs SET question = ?, answer = ?, category = ?, sort_order = ?, published = ?, updated_at = ? WHERE id = ?`,
    args: [
      data.question ?? current.question,
      data.answer ?? current.answer,
      data.category ?? current.category,
      data.sort_order ?? current.sort_order,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      now,
      id,
    ],
  });

  const updatedRes = await db.execute({ sql: 'SELECT * FROM faqs WHERE id = ?', args: [id] });
  return toPlain(updatedRes.rows[0] as unknown as FAQ);
}

export async function deleteFAQ(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM faqs WHERE id = ?', args: [id] });
  return true;
}

export async function getServiceAreas(publishedOnly = true): Promise<ServiceArea[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM service_areas';
  if (publishedOnly) sql += ' WHERE published = 1';
  sql += ' ORDER BY sort_order ASC';
  const res = await db.execute(sql);
  return toPlain(res.rows as unknown as ServiceArea[]);
}

export async function updateServiceArea(id: string, data: Partial<ServiceArea>): Promise<ServiceArea | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({ sql: 'SELECT * FROM service_areas WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  const current = res.rows[0] as unknown as ServiceArea;
  const now = new Date().toISOString();

  await db.execute({
    sql: `UPDATE service_areas SET name = ?, state_region = ?, description = ?, neighborhoods = ?, image_url = ?, sort_order = ?, published = ?, updated_at = ? WHERE id = ?`,
    args: [
      data.name ?? current.name,
      data.state_region ?? current.state_region,
      data.description ?? current.description,
      data.neighborhoods ?? current.neighborhoods,
      data.image_url ?? current.image_url,
      data.sort_order ?? current.sort_order,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      now,
      id,
    ],
  });

  const updatedRes = await db.execute({ sql: 'SELECT * FROM service_areas WHERE id = ?', args: [id] });
  return toPlain(updatedRes.rows[0] as unknown as ServiceArea);
}

export async function createServiceArea(data: Partial<ServiceArea>): Promise<ServiceArea> {
  await ensureDbInitialized();
  const db = getDb();
  const id = data.id || `area-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO service_areas (id, name, state_region, description, neighborhoods, image_url, sort_order, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      data.name || 'New Borough',
      data.state_region || 'New York, NY',
      data.description || '',
      data.neighborhoods || '[]',
      data.image_url || 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
      data.sort_order || 0,
      data.published !== undefined ? (data.published ? 1 : 0) : 1,
      now,
      now,
    ],
  });

  const res = await db.execute({ sql: 'SELECT * FROM service_areas WHERE id = ?', args: [id] });
  return toPlain(res.rows[0] as unknown as ServiceArea);
}

export async function deleteServiceArea(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM service_areas WHERE id = ?', args: [id] });
  return true;
}

export async function getProcessSteps(publishedOnly = true): Promise<ProcessStep[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM process_steps';
  if (publishedOnly) sql += ' WHERE published = 1';
  sql += ' ORDER BY step_number ASC, sort_order ASC';
  const res = await db.execute(sql);
  return toPlain(res.rows as unknown as ProcessStep[]);
}

export async function updateProcessStep(id: string, data: Partial<ProcessStep>): Promise<ProcessStep | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({ sql: 'SELECT * FROM process_steps WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  const current = res.rows[0] as unknown as ProcessStep;
  const now = new Date().toISOString();

  await db.execute({
    sql: `UPDATE process_steps SET title = ?, subtitle = ?, description = ?, deliverables = ?, image_url = ?, sort_order = ?, published = ?, updated_at = ? WHERE id = ?`,
    args: [
      data.title ?? current.title,
      data.subtitle ?? current.subtitle,
      data.description ?? current.description,
      data.deliverables ?? current.deliverables,
      data.image_url ?? current.image_url,
      data.sort_order ?? current.sort_order,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      now,
      id,
    ],
  });

  const updatedRes = await db.execute({ sql: 'SELECT * FROM process_steps WHERE id = ?', args: [id] });
  return toPlain(updatedRes.rows[0] as unknown as ProcessStep);
}

export async function getTeamMembers(publishedOnly = true): Promise<TeamMember[]> {
  await ensureDbInitialized();
  const db = getDb();
  let sql = 'SELECT * FROM team_members';
  if (publishedOnly) sql += ' WHERE published = 1';
  sql += ' ORDER BY sort_order ASC';
  const res = await db.execute(sql);
  return toPlain(res.rows as unknown as TeamMember[]);
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({ sql: 'SELECT * FROM team_members WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  const current = res.rows[0] as unknown as TeamMember;
  const now = new Date().toISOString();

  await db.execute({
    sql: `UPDATE team_members SET name = ?, role = ?, bio = ?, image_url = ?, sort_order = ?, published = ?, updated_at = ? WHERE id = ?`,
    args: [
      data.name ?? current.name,
      data.role ?? current.role,
      data.bio ?? current.bio,
      data.image_url ?? current.image_url,
      data.sort_order ?? current.sort_order,
      data.published !== undefined ? (data.published ? 1 : 0) : current.published,
      now,
      id,
    ],
  });

  const updatedRes = await db.execute({ sql: 'SELECT * FROM team_members WHERE id = ?', args: [id] });
  return toPlain(updatedRes.rows[0] as unknown as TeamMember);
}

// -------------------------------------------------------------
// LEADS & MESSAGES (SECURE / ADMIN-ONLY READ)
// -------------------------------------------------------------

export async function createConsultationRequest(data: {
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
}): Promise<ConsultationRequest> {
  await ensureDbInitialized();
  const db = getDb();
  const id = `lead-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO consultation_requests (
      id, name, email, phone, zip_code, project_type, property_type, budget, timeline,
      project_details, address, preferred_contact_method, status, internal_notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', '', ?, ?)`,
    args: [
      id,
      data.name,
      data.email,
      data.phone,
      data.zip_code,
      data.project_type,
      data.property_type,
      data.budget,
      data.timeline,
      data.project_details,
      data.address || '',
      data.preferred_contact_method || 'Email',
      now,
      now,
    ],
  });

  const res = await db.execute({ sql: 'SELECT * FROM consultation_requests WHERE id = ?', args: [id] });
  return toPlain(res.rows[0] as unknown as ConsultationRequest);
}

export async function getConsultationRequests(): Promise<ConsultationRequest[]> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute('SELECT * FROM consultation_requests ORDER BY created_at DESC');
  return toPlain(res.rows as unknown as ConsultationRequest[]);
}

export async function updateConsultationRequestStatus(
  id: string,
  status: string,
  internal_notes?: string
): Promise<ConsultationRequest | null> {
  await ensureDbInitialized();
  const db = getDb();
  const now = new Date().toISOString();

  if (internal_notes !== undefined) {
    await db.execute({
      sql: 'UPDATE consultation_requests SET status = ?, internal_notes = ?, updated_at = ? WHERE id = ?',
      args: [status, internal_notes, now, id],
    });
  } else {
    await db.execute({
      sql: 'UPDATE consultation_requests SET status = ?, updated_at = ? WHERE id = ?',
      args: [status, now, id],
    });
  }

  const res = await db.execute({ sql: 'SELECT * FROM consultation_requests WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  return toPlain(res.rows[0] as unknown as ConsultationRequest);
}

export async function deleteConsultationRequest(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM consultation_requests WHERE id = ?', args: [id] });
  return true;
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<ContactMessage> {
  await ensureDbInitialized();
  const db = getDb();
  const id = `msg-${Date.now()}`;
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO contact_messages (id, name, email, phone, message, status, internal_notes, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, 'New', '', ?, ?)`,
    args: [id, data.name, data.email, data.phone || '', data.message, now, now],
  });

  const res = await db.execute({ sql: 'SELECT * FROM contact_messages WHERE id = ?', args: [id] });
  return toPlain(res.rows[0] as unknown as ContactMessage);
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute('SELECT * FROM contact_messages ORDER BY created_at DESC');
  return toPlain(res.rows as unknown as ContactMessage[]);
}

export async function updateContactMessageStatus(
  id: string,
  status: string,
  internal_notes?: string
): Promise<ContactMessage | null> {
  await ensureDbInitialized();
  const db = getDb();
  const now = new Date().toISOString();

  if (internal_notes !== undefined) {
    await db.execute({
      sql: 'UPDATE contact_messages SET status = ?, internal_notes = ?, updated_at = ? WHERE id = ?',
      args: [status, internal_notes, now, id],
    });
  } else {
    await db.execute({
      sql: 'UPDATE contact_messages SET status = ?, updated_at = ? WHERE id = ?',
      args: [status, now, id],
    });
  }

  const res = await db.execute({ sql: 'SELECT * FROM contact_messages WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  return toPlain(res.rows[0] as unknown as ContactMessage);
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM contact_messages WHERE id = ?', args: [id] });
  return true;
}

// -------------------------------------------------------------
// ADMIN USERS & AUDIT LOGS
// -------------------------------------------------------------

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT * FROM admin_users WHERE email = ? AND is_active = 1 LIMIT 1',
    args: [email.toLowerCase().trim()],
  });
  if (res.rows.length === 0) return null;
  return toPlain(res.rows[0] as unknown as AdminUser);
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute('SELECT id, email, full_name, role, is_active, created_at, updated_at FROM admin_users ORDER BY created_at ASC');
  return toPlain(res.rows as unknown as AdminUser[]);
}

export async function createAdminUser(data: {
  email: string;
  password: string;
  full_name: string;
  role: 'Super Admin' | 'Content Manager' | 'Project Manager' | 'Sales' | 'Editor' | 'Viewer';
}): Promise<AdminUser> {
  await ensureDbInitialized();
  const db = getDb();
  const id = `usr-${Date.now()}`;
  const now = new Date().toISOString();
  const password_hash = await bcrypt.hash(data.password, 10);

  await db.execute({
    sql: `INSERT INTO admin_users (id, email, password_hash, full_name, role, is_active, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, 1, ?, ?)`,
    args: [id, data.email.toLowerCase().trim(), password_hash, data.full_name, data.role, now, now],
  });

  const res = await db.execute({
    sql: 'SELECT id, email, full_name, role, is_active, created_at, updated_at FROM admin_users WHERE id = ?',
    args: [id],
  });
  return toPlain(res.rows[0] as unknown as AdminUser);
}

export async function updateAdminUser(id: string, data: Partial<AdminUser> & { new_password?: string }): Promise<AdminUser | null> {
  await ensureDbInitialized();
  const db = getDb();
  const now = new Date().toISOString();

  if (data.new_password) {
    const hash = await bcrypt.hash(data.new_password, 10);
    await db.execute({
      sql: 'UPDATE admin_users SET password_hash = ?, updated_at = ? WHERE id = ?',
      args: [hash, now, id],
    });
  }

  if (data.full_name || data.role || data.is_active !== undefined) {
    const currentRes = await db.execute({ sql: 'SELECT * FROM admin_users WHERE id = ?', args: [id] });
    if (currentRes.rows.length === 0) return null;
    const current = currentRes.rows[0] as unknown as AdminUser;

    await db.execute({
      sql: 'UPDATE admin_users SET full_name = ?, role = ?, is_active = ?, updated_at = ? WHERE id = ?',
      args: [
        data.full_name ?? current.full_name,
        data.role ?? current.role,
        data.is_active !== undefined ? (data.is_active ? 1 : 0) : current.is_active,
        now,
        id,
      ],
    });
  }

  const res = await db.execute({
    sql: 'SELECT id, email, full_name, role, is_active, created_at, updated_at FROM admin_users WHERE id = ?',
    args: [id],
  });
  return toPlain(res.rows[0] as unknown as AdminUser);
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM admin_users WHERE id = ?', args: [id] });
  return true;
}

export async function addAuditLog(
  admin_user: string,
  action: string,
  entity: string,
  entity_id?: string,
  details?: string
): Promise<void> {
  await ensureDbInitialized();
  const db = getDb();
  const id = `audit-${Date.now()}`;
  await db.execute({
    sql: `INSERT INTO audit_logs (id, admin_user, action, entity, entity_id, details, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [id, admin_user, action, entity, entity_id || '', details || '', new Date().toISOString()],
  });
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100');
  return toPlain(res.rows as unknown as AuditLog[]);
}

export async function getMediaItems(): Promise<MediaItem[]> {
  await ensureDbInitialized();
  const db = getDb();
  const res = await db.execute('SELECT * FROM media_items ORDER BY created_at DESC');
  return toPlain(res.rows as unknown as MediaItem[]);
}

export async function addMediaItem(item: Partial<MediaItem>): Promise<MediaItem> {
  await ensureDbInitialized();
  const db = getDb();
  const id = item.id || `med-${Date.now()}`;
  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO media_items (id, name, file_url, file_size, mime_type, category, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [id, item.name || 'image', item.file_url || '', item.file_size || 0, item.mime_type || 'image/jpeg', item.category || 'general', now],
  });
  const res = await db.execute({ sql: 'SELECT * FROM media_items WHERE id = ?', args: [id] });
  return toPlain(res.rows[0] as unknown as MediaItem);
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  await ensureDbInitialized();
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM media_items WHERE id = ?', args: [id] });
  return true;
}

export async function getDashboardStats() {
  await ensureDbInitialized();
  const db = getDb();

  const totalProjectsRes = await db.execute('SELECT COUNT(*) as count FROM projects');
  const publishedProjectsRes = await db.execute('SELECT COUNT(*) as count FROM projects WHERE published = 1');
  const totalLeadsRes = await db.execute('SELECT COUNT(*) as count FROM consultation_requests');
  const newLeadsRes = await db.execute("SELECT COUNT(*) as count FROM consultation_requests WHERE status = 'New'");
  const totalMessagesRes = await db.execute('SELECT COUNT(*) as count FROM contact_messages');
  const newMessagesRes = await db.execute("SELECT COUNT(*) as count FROM contact_messages WHERE status = 'New'");
  const testimonialsRes = await db.execute('SELECT COUNT(*) as count FROM testimonials WHERE published = 1');
  const servicesRes = await db.execute('SELECT COUNT(*) as count FROM services WHERE published = 1');
  const faqsRes = await db.execute('SELECT COUNT(*) as count FROM faqs WHERE published = 1');

  const recentLeadsRes = await db.execute('SELECT * FROM consultation_requests ORDER BY created_at DESC LIMIT 5');
  const recentMessagesRes = await db.execute('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5');

  return toPlain({
    totalProjects: Number(totalProjectsRes.rows[0].count),
    publishedProjects: Number(publishedProjectsRes.rows[0].count),
    totalLeads: Number(totalLeadsRes.rows[0].count),
    newLeads: Number(newLeadsRes.rows[0].count),
    totalMessages: Number(totalMessagesRes.rows[0].count),
    newMessages: Number(newMessagesRes.rows[0].count),
    testimonialsCount: Number(testimonialsRes.rows[0].count),
    servicesCount: Number(servicesRes.rows[0].count),
    faqsCount: Number(faqsRes.rows[0].count),
    recentLeads: recentLeadsRes.rows as unknown as ConsultationRequest[],
    recentMessages: recentMessagesRes.rows as unknown as ContactMessage[],
  });
}
