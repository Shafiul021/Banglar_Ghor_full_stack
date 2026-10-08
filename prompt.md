Build a Complete Production-Ready Full-Stack Website for Banlgar Ghor Remodeling

Build a complete, production-ready, full-stack website for Banlgar Ghor Remodeling, a premium residential remodeling company serving New York, NY and surrounding areas.

The website must feel like a high-end NYC architecture and interior-design studio, not a generic AI-generated contractor website.

1. Overall Design Direction

Create a sophisticated, editorial, luxury architecture/interior-design aesthetic.

Visual Style
Premium residential architecture
Luxury interior design
Editorial architectural photography
Warm minimalism
Sophisticated but approachable
Clean layouts with generous whitespace
Strong visual hierarchy
Cinematic project photography
Subtle micro-interactions
Refined transitions
No excessive gradients
No excessive rounded cards
No generic SaaS dashboard appearance
No "AI-generated website" look
Avoid excessive glassmorphism
Avoid cartoon illustrations
Avoid stock-photo-looking contractor imagery
Color Palette

Use a warm neutral palette:

Warm white / ivory
Soft beige
Sand
Natural stone
Charcoal
Deep black
Muted taupe
Optional subtle brass/bronze accent

The interface should primarily use white, warm neutrals and charcoal.

Typography

Use elegant typography combining:

A sophisticated serif/display font for major headings
A clean modern sans-serif for body text, navigation, buttons and UI

Typography should resemble a premium architecture/interior-design publication.

2. Technology Requirements

Build this as a real full-stack application.

Preferred stack:

Next.js
React
TypeScript
Tailwind CSS
Supabase
PostgreSQL
Supabase Storage
Server-side/API routes where appropriate
Modern form validation
Responsive mobile-first architecture

If Supabase is unavailable in the environment, use the platform's most appropriate production database/backend instead.

Do NOT build a static mockup.

The application must have:

Real database persistence
Real form submission
Real validation
Real CRUD-ready architecture
Real image storage architecture
Loading states
Error states
Success states
Secure server-side operations
Proper environment variable handling
SEO
Accessible UI
Responsive layouts
3. Company
Company Name

Banlgar Ghor Remodeling

Positioning

Premium residential remodeling and renovation company serving New York City and surrounding areas.

Suggested positioning:

Thoughtful renovations. Exceptional craftsmanship. Homes designed around the way you live.

Use realistic but clearly replaceable company content.

Structure all company information so it can easily be changed later through configuration/database records.

Do NOT hard-code company information throughout the application.

Create a centralized company configuration/data layer for:

Company name
Phone
Email
Address
Business hours
Social media
Service areas
License information
Insurance information
Financing information
Awards
Certifications
4. Required Pages

Create all of the following routes:

Main Pages
/
/services
/projects
/about
/process
/reviews
/service-areas
/financing
/faq
/contact
/consultation
Service Pages
/services/kitchen-remodeling
/services/bathroom-remodeling
/services/basement-finishing
/services/whole-home-renovation
/services/home-additions
/services/custom-renovations
Project Pages

Use dynamic routing:

/projects/[slug]

Each project should have its own detailed page.

5. Global Navigation

Create a polished responsive navigation bar.

Desktop:

Logo
Services
Projects
About
Our Process
Service Areas
Financing
FAQ
Contact
Primary CTA: Request a Free Consultation

On smaller screens:

Hamburger menu
Smooth mobile navigation drawer
Clearly visible CTA

Navbar should:

Become slightly more compact while scrolling
Have subtle background/transparency behavior
Maintain excellent contrast
Work over hero images
Transition elegantly between transparent and solid states
6. Global CTA

Use this primary CTA throughout the site:

Request a Free Consultation

Secondary CTA:

Explore Our Projects

Other useful CTA labels:

Start Your Project
View Project
Learn More
Discuss Your Renovation
Get a Project Estimate
See Our Work

Never create buttons that do nothing.

Every CTA must either:

Navigate somewhere
Open a valid interaction
Submit a real form
Trigger an appropriate action
7. Homepage

Create a cinematic luxury homepage.

Hero

Use a full-width architectural interior image.

Hero content:

Eyebrow

NEW YORK RESIDENTIAL REMODELING

Heading

Spaces Designed for the Way You Live.

Supporting Text

Banlgar Ghor Remodeling transforms New York homes through thoughtful design, meticulous craftsmanship, and a renovation process built around your vision.

Buttons:

Request a Free Consultation

Explore Our Projects

Include subtle image movement/parallax if performance allows.

8. Homepage Sections

Include:

Introduction

Short premium brand statement.

Featured Projects

Display 3–6 major projects.

Each project card should include:

Large image
Project name
Neighborhood/location
Category
Short description
View Project link

Use elegant image-hover interactions.

Services

Six major services:

Kitchen Remodeling
Bathroom Remodeling
Basement Finishing
Whole-Home Renovation
Home Additions
Custom Renovations
Why Banlgar Ghor

Include:

Design-focused approach
Experienced craftsmanship
Transparent communication
Detailed project planning
Licensed & insured
Quality materials
Respect for the client's home
Process Preview

Show:

Consultation
Planning & Design
Proposal
Construction
Final Walkthrough
Testimonials

Premium testimonial layout.

Trust Section

Include realistic placeholder trust indicators:

Licensed & Insured
Experienced Craftsmanship
Design-Led Renovations
Quality Materials
Dedicated Project Management

Do not fabricate official awards or licenses. If placeholders are used, clearly structure them so they can be replaced with verified credentials.

Service Areas

Show NYC and surrounding areas.

Final CTA

Large editorial CTA:

Ready to Transform Your Home?

Button:

Request a Free Consultation

9. Services

Create a premium services landing page.

Each service gets:

Hero image
Service description
Benefits
Typical scope
Materials
Process
FAQ
Related projects
CTA
10. Kitchen Remodeling

Create detailed content around:

Custom cabinetry
Countertops
Islands
Lighting
Flooring
Backsplashes
Appliance integration
Storage
Layout optimization
Plumbing/electrical updates

Position it as design + construction rather than simply "installing a new kitchen."

11. Bathroom Remodeling

Include:

Primary bathrooms
Guest bathrooms
Powder rooms
Custom tile
Walk-in showers
Freestanding tubs
Vanities
Lighting
Fixtures
Heated flooring
Waterproofing
12. Basement Finishing

Include:

Recreation rooms
Home offices
Guest suites
Media rooms
Fitness spaces
Storage
Lighting
Flooring
Insulation
Moisture considerations
13. Whole-Home Renovation

Explain complete renovation management.

Include:

Layout redesign
Structural updates
Kitchens
Bathrooms
Flooring
Lighting
Electrical
Plumbing
Millwork
Painting
Interior finishes
14. Home Additions

Include:

Rear additions
Side additions
Second-story additions
Primary-suite additions
Kitchen expansions
Family rooms
Structural integration
Planning/permitting coordination

Do not make specific legal/permitting claims unless they are presented as general informational content.

15. Custom Renovations

For unusual or highly personalized projects.

Include:

Custom millwork
Interior reconfiguration
Historic-home updates
Luxury finish packages
Built-ins
Specialty spaces
Design-build coordination
16. Projects Gallery

Create a visually impressive project gallery.

Include:

Masonry/grid layouts
Large featured projects
Category filters
Search if appropriate
Smooth filtering
Image hover effects

Filters:

All
Kitchens
Bathrooms
Whole Home
Basements
Additions
Custom

Project cards should display:

Project image
Name
Location
Category
Short description
Optional budget range
View Project
17. Project Database

Create a real projects database table.

Suggested fields:

id
title
slug
location
neighborhood
category
description
short_description
hero_image
budget_min
budget_max
timeline
property_type
year_completed
featured
status
created_at
updated_at

Create a separate project images table:

project_images
----------------
id
project_id
image_url
image_type
caption
sort_order
created_at

image_type can support:

hero
gallery
before
after
detail
18. Project Detail Pages

Each project page should feel like an architecture portfolio case study.

Include:

Hero

Large cinematic image.

Project Information
Location
Project Type
Property Type
Budget
Timeline
Completion Year
Project Story

Detailed narrative describing:

Client goals
Existing challenges
Design approach
Construction
Final result
Materials

Display:

Flooring
Cabinetry
Countertops
Tile
Fixtures
Hardware
Lighting
Paint/finishes
Gallery

Large editorial gallery.

Before / After

Create an interactive before/after comparison slider.

The slider must work on:

Desktop
Tablet
Mobile

Use real stored before/after image records.

Related Projects

Show 3 related projects.

CTA

Have a similar project in mind?

Request a Free Consultation

19. Realistic Project Data

Seed the database with realistic placeholder projects such as:

Chelsea Modern Kitchen

Location:
Chelsea, Manhattan

Category:
Kitchen Remodeling

Budget:
$95,000–$135,000

Timeline:
12 weeks

Park Slope Brownstone Renovation

Location:
Brooklyn

Category:
Whole-Home Renovation

Budget:
$280,000–$420,000

Timeline:
8 months

Upper West Side Primary Bath

Location:
Upper West Side, Manhattan

Category:
Bathroom Remodeling

Budget:
$55,000–$85,000

Timeline:
8 weeks

Astoria Family Basement

Location:
Astoria, Queens

Category:
Basement Finishing

Budget:
$90,000–$140,000

Timeline:
14 weeks

Westchester Modern Addition

Location:
Westchester County

Category:
Home Addition

Budget:
$350,000–$550,000

Timeline:
9–12 months

Clearly mark seeded information as replaceable business content in the underlying data structure.

20. Before/After Slider

Create a reusable component:

BeforeAfterSlider

Features:

Drag handle
Mouse support
Touch support
Keyboard accessibility
Responsive sizing
Labels "Before" and "After"
Smooth interaction
Proper image loading
No layout shift
21. About Page

Create an editorial company story.

Sections:

Company introduction
Philosophy
Craftsmanship
Design approach
Project management
Commitment to clients
Licensed & insured messaging
CTA

Use team/member records so people can later be managed through the backend.

22. Our Process

Create an elegant step-by-step experience.

Step 1 — Consultation

Understand goals, property and budget.

Step 2 — Planning & Design

Develop concepts, materials and project scope.

Step 3 — Proposal

Provide detailed project scope and pricing.

Step 4 — Pre-Construction

Coordinate scheduling, selections and preparation.

Step 5 — Construction

Professional construction and project management.

Step 6 — Final Walkthrough

Review completed work and finalize the project.

Include visual timeline/scroll animation.

23. Reviews Page

Create testimonials section.

Database table:

testimonials
-------------
id
name
location
project_type
rating
quote
image_url
featured
created_at
updated_at

Display:

Client name
Location
Project type
Rating
Testimonial
Optional image

Do not falsely attribute testimonials to real people. Seed clearly replaceable placeholder testimonials.

24. Service Areas

Create a dedicated service-area page.

Primary areas:

Manhattan
Brooklyn
Queens
Bronx
Staten Island
Westchester
Nearby surrounding communities

Create reusable service-area cards.

Avoid claiming exact coverage for locations unless configured in the database.

Include:

Don't see your neighborhood?

Contact us to discuss your project.

25. Financing Page

Create a premium financing information page.

Explain:

Financing may help distribute project costs
Financing options depend on eligibility and provider terms
Clients should review terms carefully

Do not invent interest rates, lenders, approvals or financial guarantees.

Use configurable financing provider/content fields.

CTA:

Discuss Your Project

26. FAQ

Create searchable/filterable FAQ.

Database:

faqs
----
id
question
answer
category
sort_order
published
created_at
updated_at

Categories:

General
Process
Pricing
Design
Construction
Timeline
Financing

Questions should cover:

How does the consultation work?
How much does remodeling cost?
How long does a renovation take?
Do you handle design?
Do you manage permits?
Can I live in the home during renovation?
How are project changes handled?
What areas do you serve?
Do you offer financing?
How do I get started?

Use accessible accordion components.

27. Contact Page

Create a premium contact page.

Include:

Phone
Email
Service areas
Business hours
Contact form
Map/location area if appropriate

Form:

Name
Email
Phone
Message

All submissions must persist to the backend.

28. Consultation / Quote Form

This is one of the most important components.

Create a multi-step or elegantly structured consultation form.

Required fields:

Personal Information
Full Name
Email
Phone
ZIP Code
Project
Project Type
Property Type
Estimated Budget
Preferred Timeline
Project Details

Project Type options:

Kitchen Remodeling
Bathroom Remodeling
Basement Finishing
Whole-Home Renovation
Home Addition
Custom Renovation
Other

Property Type:

Condo
Co-op
Townhouse
Brownstone
Single-Family Home
Multi-Family Home
Other

Budget options:

Under $50k
$50k–$100k
$100k–$250k
$250k–$500k
$500k+
Not Sure Yet

Timeline:

ASAP
1–3 Months
3–6 Months
6–12 Months
12+ Months
Just Exploring

Project Details:

Large textarea.

Optional:

Address
Preferred contact method
File/photo uploads
29. Leads Database

Create:

consultation_requests
---------------------
id
name
email
phone
zip_code
project_type
property_type
budget
timeline
project_details
address
preferred_contact_method
status
created_at
updated_at

Status options:

New
Contacted
Qualified
Consultation Scheduled
Proposal Sent
Won
Lost
Archived

Forms must actually save submissions.

30. Contact Messages

Create:

contact_messages
----------------
id
name
email
phone
message
status
created_at
updated_at

Status:

New
Read
Responded
Archived
31. Backend Security

Use secure backend architecture.

Important:

Never expose service-role keys to the browser
Use environment variables
Validate all input server-side
Sanitize data where appropriate
Use Supabase Row Level Security
Public users can submit forms
Public users cannot read leads
Public users cannot modify projects
Public users cannot modify testimonials
Public users cannot modify FAQs
Admin operations require authentication/authorization
32. Admin-Ready Architecture

Even if a full admin UI is not required initially, structure the backend so an admin dashboard can easily be added.

CRUD-ready entities:

Projects
Project Images
Services
Testimonials
FAQs
Service Areas
Consultation Requests
Contact Messages
Company Information

Admin functionality should eventually support:

Create
Read
Update
Delete
Publish/unpublish
Featured/unfeatured
Reorder
33. Image Storage

Use Supabase Storage or the selected backend storage system.

Organize images logically:

/projects/
    /project-slug/
        hero
        gallery
        before
        after

/services/
    kitchen
    bathroom
    basement
    additions

/team/

/site/

Store image URLs in the database.

Do not hard-code image URLs throughout components.

34. Image Architecture

Create reusable image components.

Requirements:

Responsive images
Lazy loading where appropriate
Priority loading for hero images
Proper aspect ratios
alt text
Blur/placeholder support if available
Prevent cumulative layout shift
Optimized image formats
Mobile-friendly image sizes

Use high-quality architectural/interior imagery.

If remote placeholder imagery is necessary during development, isolate those URLs inside seed/configuration data so they can easily be replaced.

35. SEO

Implement SEO on every page.

Include:

Unique title
Meta description
Canonical URL
Open Graph metadata
Twitter/X metadata
Structured data where appropriate
Sitemap
Robots configuration
Semantic HTML

Example homepage title:

Banlgar Ghor Remodeling | Premium Home Remodeling in New York

Example description:

Banlgar Ghor Remodeling creates thoughtfully designed kitchens, bathrooms, additions and whole-home renovations throughout New York City and surrounding areas.

Implement LocalBusiness/Contractor-related structured data only with accurate company information.

Do not invent license numbers or credentials.

36. Accessibility

Meet modern accessibility standards.

Include:

Semantic HTML
Proper heading hierarchy
Keyboard navigation
Visible focus states
ARIA labels where needed
Accessible forms
Accessible error messages
Accessible modal/menu behavior
Good color contrast
Reduced-motion support
Keyboard-operable sliders
37. Responsive Design

Mobile-first.

Test layouts for:

320px
375px
390px
414px
768px
1024px
1280px
1440px+

Desktop should feel spacious and architectural.

Mobile should feel intentionally designed, not simply compressed desktop content.

38. Animations

Use subtle animations only.

Examples:

Fade-up reveals
Image scale on hover
Navigation transitions
Smooth menu animation
Project gallery transitions
Before/after slider movement
Scroll-triggered section reveals

Avoid:

Excessive bouncing
Excessive parallax
Distracting effects
Slow page transitions
Animation that harms accessibility

Respect:

prefers-reduced-motion
39. Breadcrumbs

Create reusable breadcrumbs.

Example:

Home → Services → Kitchen Remodeling

Project:

Home → Projects → Chelsea Modern Kitchen

Ensure breadcrumbs are responsive and accessible.

40. Loading States

Every async operation must have a loading state.

Examples:

Project loading skeleton
Gallery skeleton
Form submission state
Image loading state
FAQ loading
Backend request state

Do not leave users staring at blank screens.

41. Error Handling

Create polished error states.

Examples:

Form Error

We couldn't submit your request. Please check your information and try again.

Server Error

Something went wrong on our end. Please try again in a moment.

Missing Project

We couldn't find that project.

Include a button:

Back to Projects

42. Form Success

After successful consultation submission:

Display a premium confirmation:

Thank You

Your consultation request has been received. A member of the Banlgar Ghor Remodeling team will review your project details and get in touch with you shortly.

Button:

Return Home

Do not pretend an appointment has been scheduled unless an actual scheduling system exists.

43. Anti-Spam

Protect public forms.

Implement appropriate protections such as:

Server-side validation
Rate limiting where supported
Honeypot field
CAPTCHA/Turnstile if available
Input length restrictions

Do not make the form frustrating for legitimate users.

44. Database Timestamps

All relevant database tables should have:

created_at
updated_at

Use database/server-generated timestamps rather than trusting client timestamps.

45. Reusable Components

Create reusable components such as:

Navbar
MobileMenu
Footer
Hero
SectionHeading
CTAButton
ProjectCard
ProjectGrid
ServiceCard
TestimonialCard
FAQAccordion
Breadcrumbs
BeforeAfterSlider
ImageGallery
ConsultationForm
ContactForm
LoadingSkeleton
ErrorState
SuccessMessage
ServiceAreaCard
TrustBadge
ProcessTimeline

Avoid duplicating components between pages.

46. Content Architecture

Do not scatter text throughout components.

Use structured data/content wherever practical.

Create centralized content/configuration for:

Company information
Services
Service areas
Navigation
Social links
Contact information
Project categories
FAQs
Trust information

Database-driven content should be preferred for content that will eventually be managed by an admin.

47. Performance

Optimize for production.

Requirements:

Image optimization
Code splitting
Lazy loading
Efficient database queries
Avoid unnecessary client-side JavaScript
Server-render content where appropriate
Cache appropriate content
Avoid layout shifts
Optimize fonts
Avoid enormous JavaScript bundles

Target excellent Core Web Vitals.

48. Security

Follow production security practices.

Never:

Expose secrets
Expose Supabase service keys
Trust client-side validation alone
Allow anonymous database reads of private leads
Allow anonymous modification of CMS content

Use:

Environment variables
Server-side validation
RLS
Authentication for admin operations
Secure storage policies
Proper authorization
49. Footer

Create a premium footer containing:

Company

Banlgar Ghor Remodeling

Navigation
Services
Projects
About
Process
Reviews
Service Areas
Financing
FAQ
Contact
Services
Kitchen Remodeling
Bathroom Remodeling
Basement Finishing
Whole-Home Renovation
Home Additions
Custom Renovations
Contact

Phone
Email
Service Area

Legal
Privacy Policy
Terms
Accessibility
CTA

Request a Free Consultation

50. Privacy / Legal

Create basic pages/placeholders for:

Privacy Policy
Terms of Use
Accessibility

Do not invent legal claims or compliance certifications.

Structure these pages so actual legal text can later be inserted.

51. UX Requirements

The entire website should feel like a premium service experience.

Users should always understand:

What Banlgar Ghor Remodeling does
Where they work
Why they are different
What projects they specialize in
What the process looks like
What projects cost approximately
How to contact them
How to request a consultation

Make the consultation CTA highly visible without becoming annoying.

52. Design Details

Use architectural editorial patterns such as:

Large typography
Full-bleed photography
Asymmetrical layouts
Large image blocks
Editorial project descriptions
Thin borders
Small uppercase labels
Generous spacing
Subtle hover states
Numbered process sections
Large pull quotes
Minimal iconography

Use visual hierarchy rather than excessive UI decoration.

53. Project Card Design

Project cards should feel like architecture portfolio cards.

Example:

[ LARGE PROJECT IMAGE ]

CHELSEA, MANHATTAN
KITCHEN REMODELING

Chelsea Modern Kitchen

A refined kitchen renovation balancing
warm natural materials with contemporary
functionality.

View Project →

Hover:

Slight image zoom
Subtle overlay
Arrow movement
54. Final Homepage CTA

End the homepage with a large cinematic section.

Heading:

Let's Build a Home You'll Love Coming Back To.

Text:

Tell us what you're envisioning, and let's explore what's possible.

Button:

Request a Free Consultation

Secondary:

Explore Our Work

55. Seed Data

Populate the database with enough realistic development data to make the application look complete.

Include:

6+ projects
6 services
8+ FAQs
5+ testimonials
6+ service areas
3+ featured projects

All seed content should be clearly structured for easy replacement.

Do not falsely imply that seeded testimonials, awards, certifications or credentials are real.

56. Production Environment

Create:

.env.example

with required variables such as:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

Only use the service-role key on the server.

Document setup requirements.

57. Database Migration

Create the complete SQL schema/migrations for:

projects
project_images
services
testimonials
faqs
service_areas
consultation_requests
contact_messages
company_settings
team_members

Add:

Primary keys
Foreign keys
Indexes
Timestamps
Appropriate constraints
RLS policies
Storage policies
58. Supabase RLS Concept

Public visitors should be able to read published public content such as:

Published projects
Published services
Published testimonials
Published FAQs
Published service areas

Public visitors may:

Submit consultation requests
Submit contact messages

Public visitors must NOT:

Read consultation requests
Read contact messages
Modify projects
Modify services
Modify testimonials
Modify FAQs
Modify company settings

Authenticated administrators should have controlled CRUD access.

59. Final Quality Requirement

Before considering the project complete, verify:

Navigation
Every navigation link works
Mobile menu works
CTA buttons work
Pages
Every required page exists
Dynamic project pages work
Service pages work
Breadcrumbs work
Forms
Validation works
Error states work
Success states work
Submissions persist to database
Database
Tables exist
Relationships work
RLS is configured
Timestamps work
Images
Images load correctly
Images have alt text
Before/after slider works
Gallery works
Responsive

Check mobile, tablet and desktop layouts.

Accessibility

Keyboard navigation and form accessibility must work.

SEO

Verify page metadata, sitemap and structured data.

Performance

Optimize images, fonts, rendering and JavaScript.

60. Most Important Instruction

Do NOT create a fake visual prototype.

Build the actual functioning application.

Do NOT use:

Fake form submissions
Fake database calls
Fake buttons
Fake CRUD
Placeholder API functions that don't work
Hard-coded project pages when dynamic database records should be used

Everything that looks interactive should actually function.

If a backend integration cannot be completed because credentials are unavailable, implement the complete integration architecture, database migrations, environment variables, validation, API/server actions and clear setup instructions rather than pretending the feature works.

FINAL DESIGN GOAL

The finished website should feel comparable to a premium NYC architecture, interior-design, or high-end residential construction studio website.

It should communicate:

Luxury + Craftsmanship + Trust + Design + Professionalism

The first impression should be:

"This is an established premium remodeling company."

—not:

"This is an AI-generated contractor template."

Prioritize photography, typography, spacing, composition, editorial layouts and restrained interaction design over excessive decorative UI.

The website must be visually impressive, but also genuinely functional, maintainable, secure, SEO-friendly, accessible and production-ready.


# ADMIN CMS / WEBSITE CONTENT MANAGEMENT SYSTEM

The Banlgar Ghor Remodeling website MUST include a fully functional authenticated Admin Dashboard/CMS.

The purpose of the CMS is to allow authorized administrators to manage the website's content without modifying source code.

The public website should be database-driven wherever practical so that changes made in the Admin Dashboard automatically appear on the public website.

---

## ADMIN DASHBOARD

Create a protected route such as:

`/admin`

Require authentication before accessing any admin functionality.

Unauthorized users must be redirected to the login page.

Do not expose administrative functionality to public website visitors.

---

# ADMIN DASHBOARD SECTIONS

Create the following sections:

### Dashboard

Display:

* Total Projects
* Published Projects
* Consultation Requests
* New Contact Messages
* Testimonials
* Services
* FAQs
* Recent Leads
* Recent Messages

Provide quick-action buttons such as:

* Add Project
* Add Service
* Add FAQ
* Add Testimonial
* View Leads

---

# PROJECT MANAGEMENT

Admin can:

* Create projects
* Edit projects
* Delete projects
* Publish/unpublish projects
* Feature/unfeature projects
* Change project ordering
* Upload project images
* Upload before images
* Upload after images
* Replace images
* Delete images
* Reorder gallery images

Project fields:

* Title
* Slug
* Location
* Neighborhood
* Category
* Short Description
* Full Description
* Budget
* Timeline
* Property Type
* Completion Year
* Materials
* Design Approach
* Featured
* Published
* Hero Image

Changes must immediately update the corresponding public project page.

---

# SERVICE MANAGEMENT

Admin can manage:

* Kitchen Remodeling
* Bathroom Remodeling
* Basement Finishing
* Whole-Home Renovation
* Home Additions
* Custom Renovations

Admin can:

* Create services
* Edit services
* Delete services
* Publish/unpublish services
* Change service ordering
* Upload service images

Editable fields:

* Service name
* Slug
* Description
* Hero image
* Benefits
* Features
* Process
* FAQs
* SEO title
* SEO description

---

# HOMEPAGE MANAGEMENT

Create a CMS interface for managing homepage content.

Admin can edit:

### Hero

* Eyebrow
* Heading
* Description
* Primary CTA
* Secondary CTA
* Hero image

### Featured Projects

Admin can select which projects appear on the homepage and control their order.

### Services

Admin can select/reorder services.

### Why Banlgar Ghor

Admin can edit:

* Heading
* Description
* Benefits
* Images

### Process Preview

Admin can edit process steps.

### Testimonials

Admin can select featured testimonials.

### Final CTA

Admin can edit:

* Heading
* Description
* Button text

---

# TESTIMONIAL MANAGEMENT

Admin can:

* Add testimonial
* Edit testimonial
* Delete testimonial
* Publish/unpublish
* Feature/unfeature
* Reorder testimonials
* Upload client image if applicable

Fields:

* Client name
* Location
* Project type
* Rating
* Quote
* Image
* Featured
* Published

---

# FAQ MANAGEMENT

Admin can:

* Add FAQ
* Edit FAQ
* Delete FAQ
* Publish/unpublish
* Change category
* Reorder FAQs

Fields:

* Question
* Answer
* Category
* Sort order
* Published

---

# SERVICE AREA MANAGEMENT

Admin can:

* Add service area
* Edit service area
* Delete service area
* Publish/unpublish
* Reorder areas

Fields:

* Area name
* State/region
* Description
* Image
* Published

---

# ABOUT PAGE MANAGEMENT

Allow administrators to edit:

* Company story
* Mission
* Values
* Philosophy
* Craftsmanship content
* Team members
* Team member images
* Team member descriptions
* About page hero image
* SEO metadata

---

# PROCESS MANAGEMENT

Allow administrators to edit the renovation process.

Each process step should support:

* Step number
* Title
* Description
* Image
* Icon
* Sort order
* Published

Admin can reorder steps.

---

# FINANCING CONTENT

Admin can manage:

* Financing introduction
* Financing explanation
* Available financing information
* Important disclaimers
* FAQs
* CTA
* SEO metadata

Do not hard-code financial information.

---

# COMPANY SETTINGS

Create a centralized Company Settings section.

Admin can edit:

* Company name
* Logo
* Phone
* Email
* Address
* Business hours
* Service area
* Social media links
* License information
* Insurance messaging
* Footer description
* Copyright text

Do not require developers to modify source code for these changes.

---

# NAVIGATION MANAGEMENT

Allow authorized administrators to manage:

* Main navigation items
* Navigation labels
* Navigation URLs
* Ordering
* Visibility
* CTA label
* CTA destination

Do not allow administrators to create invalid or dangerous URLs without appropriate validation.

---

# FOOTER MANAGEMENT

Admin can edit:

* Footer description
* Navigation links
* Service links
* Contact information
* Social links
* Legal links
* CTA

---

# SEO MANAGEMENT

Every major page should have editable SEO fields.

Allow administrators to edit:

* SEO title
* Meta description
* Canonical URL
* Open Graph title
* Open Graph description
* Open Graph image
* Social sharing image

Allow page-level SEO management for:

* Home
* Services
* Projects
* About
* Process
* Reviews
* Service Areas
* Financing
* FAQ
* Contact
* Consultation
* Individual services
* Individual projects

---

# MEDIA LIBRARY

Create an admin Media Library.

Admin can:

* Upload images
* Browse images
* Search images
* Delete images
* Replace images
* View image metadata
* Copy image URL
* Assign images to projects/services/pages

Use Supabase Storage or the configured backend storage.

Organize files using folders/categories such as:

```text
/projects
/services
/pages
/team
/site
```

Images should be optimized where possible.

---

# CONSULTATION LEADS

Create a protected lead-management interface.

Admin can view:

* Name
* Email
* Phone
* ZIP code
* Project type
* Property type
* Budget
* Timeline
* Project details
* Submission date
* Status

Lead statuses:

* New
* Contacted
* Qualified
* Consultation Scheduled
* Proposal Sent
* Won
* Lost
* Archived

Admin should be able to:

* Open lead
* Change status
* Add internal notes
* Delete/archive lead

Never expose leads to unauthenticated users.

---

# CONTACT MESSAGES

Admin can view:

* Name
* Email
* Phone
* Message
* Date
* Status

Statuses:

* New
* Read
* Responded
* Archived

Allow admins to update the status.

---

# ROLE-BASED ADMIN ACCESS

Implement role-based access control.

Roles should include at minimum:

### Super Admin

Full access to everything.

### Content Manager

Can manage:

* Projects
* Services
* FAQs
* Testimonials
* Pages
* Service Areas
* Media

Cannot manage users or security settings.

### Project Manager

Can manage:

* Projects
* Project images
* Consultation requests

### Sales

Can manage:

* Consultation requests
* Contact messages

### Editor

Can manage approved website content but not administrative/security settings.

### Viewer

Read-only access.

---

# USER MANAGEMENT

Super Admin can:

* Create admin users
* Edit admin users
* Disable admin users
* Assign roles
* Reset passwords
* Manage permissions

Do not store plaintext passwords.

Use the authentication provider's secure password-management system.

---

# DATABASE

Create appropriate database tables for the CMS.

At minimum:

```text
admin_users
admin_roles
admin_permissions
role_permissions

company_settings
pages
navigation_items
projects
project_images
services
service_features
testimonials
faqs
service_areas
process_steps
team_members
media
consultation_requests
contact_messages
```

All appropriate tables should include:

```text
id
created_at
updated_at
```

---

# CONTENT PUBLISHING

Where appropriate, support:

* Draft
* Published
* Archived

Administrators should be able to preview content before publishing.

Unpublished content must NOT appear on the public website.

---

# AUDIT LOG

Create an audit log for important administrative actions.

Track:

* Admin user
* Action
* Entity
* Entity ID
* Timestamp

Examples:

```text
Created Project
Updated Project
Deleted Project
Published Service
Updated FAQ
Changed Company Settings
Changed Lead Status
```

Do not store sensitive credentials or passwords in audit logs.

---

# ADMIN UI DESIGN

The Admin Dashboard should have a different interface from the public website.

Use a clean professional CMS/dashboard design.

Include:

* Sidebar navigation
* Top header
* Breadcrumbs
* Tables
* Search
* Filters
* Pagination
* Forms
* Modals where appropriate
* Confirmation dialogs
* Toast notifications
* Loading states
* Error states
* Empty states

Make the admin dashboard responsive enough for tablet/mobile use.

---

# IMPORTANT

The CMS must be FUNCTIONAL.

Do not create a visual-only admin dashboard.

When an administrator changes:

> "Kitchen Remodeling" → "Luxury Kitchen Remodeling"

the public website must actually display:

> "Luxury Kitchen Remodeling"

after the content is saved/published.

When an administrator uploads a new project image, the actual public project page must use that image.

When an administrator creates a new FAQ, it must appear on the public FAQ page after publication.

When an administrator unpublishes a project, it must disappear from the public project listing.

All CMS operations must persist to the database.

Use proper server-side authorization and database security.

The final result should allow a non-technical Banlgar Ghor Remodeling administrator to operate and maintain the majority of the website without needing a developer.
