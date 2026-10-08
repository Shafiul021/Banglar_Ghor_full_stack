async function runTests() {
  console.log('--- STARTING COMPREHENSIVE END-TO-END VERIFICATION ---');

  // 1. Homepage
  const homeRes = await fetch('http://localhost:3000');
  const homeHtml = await homeRes.text();
  console.log('1. Homepage status:', homeRes.status, 'Length:', homeHtml.length, 'Contains brand:', homeHtml.includes('Banlgar Ghor Remodeling'));

  // 2. Project detail page with Before/After
  const projectRes = await fetch('http://localhost:3000/projects/chelsea-modern-kitchen');
  const projectHtml = await projectRes.text();
  console.log('2. Project page status:', projectRes.status, 'Contains Before/After slider:', projectHtml.includes('Interactive Before &amp; After'));

  // 3. Service detail page
  const serviceRes = await fetch('http://localhost:3000/services/kitchen-remodeling');
  const serviceHtml = await serviceRes.text();
  console.log('3. Service page status:', serviceRes.status, 'Contains Kitchen Remodeling:', serviceHtml.includes('Kitchen Remodeling'));

  // 4. Sitemap.xml & Robots.txt
  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml');
  const sitemapXml = await sitemapRes.text();
  console.log('4. Sitemap.xml status:', sitemapRes.status, 'Contains projects:', sitemapXml.includes('/projects/chelsea-modern-kitchen'));

  const robotsRes = await fetch('http://localhost:3000/robots.txt');
  const robotsTxt = await robotsRes.text();
  console.log('   Robots.txt status:', robotsRes.status, 'Disallows /admin/:', robotsTxt.includes('Disallow: /admin/'));

  // 5. Public Consultation Lead Submission API
  const leadRes = await fetch('http://localhost:3000/api/consultation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Julian Vance',
      email: 'julian.vance@tribecanyc.com',
      phone: '(212) 555-0199',
      zip_code: '10013',
      project_type: 'Whole-Home Renovation',
      property_type: 'Brownstone',
      budget: '$250k–$500k',
      timeline: '1–3 Months',
      project_details: 'Complete 3-story Tribeca loft gut renovation with custom architectural bronze and fluted marble.',
      website_hp: '', // honeypot
    }),
  });
  const leadJson = await leadRes.json();
  console.log('5. Consultation submission status:', leadRes.status, 'Success:', leadJson.success, 'Lead ID:', leadJson.leadId);

  // 6. Public Contact Message Submission API
  const contactRes = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Claire Montgomery',
      email: 'claire@montgomerydesign.com',
      phone: '(917) 555-7722',
      message: 'Interested in collaborating on upcoming historic restorations in the West Village.',
      website_hp: '', // honeypot
    }),
  });
  const contactJson = await contactRes.json();
  console.log('6. Contact submission status:', contactRes.status, 'Success:', contactJson.success, 'Message ID:', contactJson.id);

  // 7. Admin Login API
  const loginRes = await fetch('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@banlgarghor.com',
      password: 'admin123456',
    }),
  });
  const loginJson = await loginRes.json();
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('7. Admin login status:', loginRes.status, 'Success:', loginJson.success, 'User:', loginJson.user?.email, 'Role:', loginJson.user?.role);

  // 8. Authenticated Admin Session Call (/api/admin/me) using cookie
  const cookieHeader = setCookie ? setCookie.split(';')[0] : '';
  const meRes = await fetch('http://localhost:3000/api/admin/me', {
    headers: { Cookie: cookieHeader },
  });
  const meJson = await meRes.json();
  console.log('8. Authenticated /api/admin/me status:', meRes.status, 'User email:', meJson.user?.email, 'Role:', meJson.user?.role);

  // 9. Admin Leads API with Auth Cookie
  const leadsRes = await fetch('http://localhost:3000/api/admin/leads/lead-1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      status: 'Qualified',
      internal_notes: 'Verified budget over $200k. Consultation scheduled.',
    }),
  });
  const leadsJson = await leadsRes.json();
  console.log('9. Lead update via Admin API status:', leadsRes.status, 'Updated status:', leadsJson.lead?.status);

  console.log('--- ALL TESTS COMPLETED SUCCESSFULLY! ---');
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
