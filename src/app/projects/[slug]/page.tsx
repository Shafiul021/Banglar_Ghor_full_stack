import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { ArrowRight, MapPin, Calendar, Clock, DollarSign, Home, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.short_description || project.description,
    openGraph: {
      title: `${project.title} | Banlgar Ghor Remodeling`,
      description: project.short_description || project.description,
      images: [{ url: project.hero_image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Parse materials
  let materialsList: { category: string; detail: string }[] = [];
  try {
    materialsList = JSON.parse(project.materials || '[]');
  } catch {
    materialsList = [];
  }

  // Find before and after images for the slider
  const beforeImageObj = project.images?.find((img) => img.image_type === 'before');
  const afterImageObj = project.images?.find((img) => img.image_type === 'after');

  // If no dedicated before image, use project hero or fallback
  const beforeImage = beforeImageObj?.image_url;
  const afterImage = afterImageObj?.image_url || project.hero_image;

  // Filter gallery images
  const galleryImages =
    project.images?.filter(
      (img) => img.image_type === 'gallery' || img.image_type === 'detail'
    ) || [];

  // 3 Related Projects
  const allProjects = await getProjects({ publishedOnly: true });
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Full-Bleed Cinematic Hero */}
        <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end bg-[#1C1B1A] pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.hero_image}
              alt={`${project.title} - ${project.category}`}
              className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.05]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-black/30 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Breadcrumbs
              light={true}
              items={[
                { label: 'Projects', href: '/projects' },
                { label: project.title },
              ]}
            />

            <div className="max-w-4xl mt-4">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[#FAF8F5] text-[11px] uppercase tracking-[0.2em] font-medium border border-white/15">
                  {project.category}
                </span>
                <span className="text-[#C9A979] text-xs uppercase tracking-widest font-medium">
                  {project.neighborhood ? `${project.neighborhood}, ${project.location}` : project.location}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial-heading font-medium text-white tracking-tight leading-[1.08] mb-6">
                {project.title}
              </h1>

              <p className="text-base sm:text-xl font-light text-[#EAE4DA] leading-relaxed max-w-3xl">
                {project.short_description}
              </p>
            </div>
          </div>
        </section>

        {/* Project Information Metadata Bar */}
        <section className="bg-white border-b border-[#1C1B1A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-xs uppercase tracking-wider">
              <div>
                <span className="text-[#8C867F] block mb-1 font-medium">Location</span>
                <span className="text-[#1F1E1D] font-semibold">{project.neighborhood || project.location}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block mb-1 font-medium">Project Scope</span>
                <span className="text-[#1F1E1D] font-semibold">{project.category}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block mb-1 font-medium">Property Type</span>
                <span className="text-[#1F1E1D] font-semibold">{project.property_type}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block mb-1 font-medium">Approx. Investment</span>
                <span className="text-[#1F1E1D] font-semibold">{project.budget_display}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block mb-1 font-medium">Timeline</span>
                <span className="text-[#1F1E1D] font-semibold">{project.timeline}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block mb-1 font-medium">Year Completed</span>
                <span className="text-[#1F1E1D] font-semibold">{project.year_completed}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Narrative Case Study */}
        <section className="py-20 sm:py-28 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overview & Story */}
            <div className="mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-3">
                Architectural Narrative
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D] mb-6">
                The Project Story
              </h2>
              <p className="text-base sm:text-lg font-light text-[#5C5854] leading-relaxed mb-10">
                {project.description}
              </p>
            </div>

            {/* Narrative Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {project.client_goals && (
                <div className="p-8 bg-white border border-[#1C1B1A]/8">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9E7D4C] mb-3">
                    Client Goals & Vision
                  </h3>
                  <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                    {project.client_goals}
                  </p>
                </div>
              )}

              {project.challenges && (
                <div className="p-8 bg-white border border-[#1C1B1A]/8">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9E7D4C] mb-3">
                    Existing Conditions & Challenges
                  </h3>
                  <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.design_approach && (
                <div className="p-8 bg-white border border-[#1C1B1A]/8">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9E7D4C] mb-3">
                    Design & Material Approach
                  </h3>
                  <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                    {project.design_approach}
                  </p>
                </div>
              )}

              {project.construction_notes && (
                <div className="p-8 bg-white border border-[#1C1B1A]/8">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9E7D4C] mb-3">
                    Master Construction Notes
                  </h3>
                  <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                    {project.construction_notes}
                  </p>
                </div>
              )}
            </div>

            {/* Final Outcome */}
            {project.final_result && (
              <div className="p-8 sm:p-10 bg-[#1C1B1A] text-white">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-2">
                  The Result
                </span>
                <p className="text-base sm:text-lg font-light text-[#DCD7CE] leading-relaxed italic">
                  &ldquo;{project.final_result}&rdquo;
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Before & After Slider */}
        {beforeImage && (
          <section className="py-20 sm:py-28 bg-white border-y border-[#1C1B1A]/8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Transformation
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Interactive Before & After
                </h2>
                <p className="text-sm font-light text-[#5C5854] mt-3">
                  Slide horizontally or use keyboard arrows to inspect the renovation transformation.
                </p>
              </div>

              <div className="max-w-4xl mx-auto shadow-2xl">
                <BeforeAfterSlider
                  beforeImage={beforeImage}
                  afterImage={afterImage}
                  beforeAlt={`${project.title} - Before Renovation`}
                  afterAlt={`${project.title} - After Renovation`}
                />
              </div>
            </div>
          </section>
        )}

        {/* Curated Materials & Fixtures Specification */}
        {materialsList.length > 0 && (
          <section className="py-20 sm:py-28 bg-[#FAF8F5]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Materiality & Details
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Curated Material Palette
                </h2>
                <p className="text-sm font-light text-[#5C5854] mt-2">
                  Every fixture, stone slab, and timber element specified for this residence.
                </p>
              </div>

              <div className="bg-white border border-[#1C1B1A]/8 divide-y divide-[#1C1B1A]/8">
                {materialsList.map((mat, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] w-48 flex-shrink-0">
                      {mat.category}
                    </span>
                    <span className="text-sm font-light text-[#5C5854]">
                      {mat.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Editorial Image Gallery */}
        {galleryImages.length > 0 && (
          <section className="py-20 sm:py-28 bg-white border-t border-[#1C1B1A]/8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Architectural Gallery
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Spaces & Joinery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-[16/11] overflow-hidden bg-[#EAE4DA] border border-[#1C1B1A]/8"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt={img.caption || `${project.title} detail`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {img.caption && (
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-light">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Projects */}
        <section className="py-24 bg-[#FAF8F5] border-t border-[#1C1B1A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Explore More
                </span>
                <h2 className="text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Related Case Studies
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors"
              >
                View Full Portfolio →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
              Consultation
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Have a similar residence in mind?
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Schedule an architectural discovery session to explore what is possible for your New York residence.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <span>Request a Free Consultation</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
