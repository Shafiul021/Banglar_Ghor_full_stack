async function testAdmin() {
  console.log('Testing Admin Login and Pages...');
  const loginRes = await fetch('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@banlgarghor.com', password: 'admin123456' }),
  });
  const cookie = loginRes.headers.get('set-cookie')?.split(';')[0];
  console.log('Admin login status:', loginRes.status, 'Cookie present:', !!cookie);

  const pages = [
    '/admin',
    '/admin/projects',
    '/admin/projects/proj-1/edit',
    '/admin/services',
    '/admin/leads',
    '/admin/messages',
    '/admin/testimonials',
    '/admin/faqs',
    '/admin/service-areas',
    '/admin/company',
    '/admin/media',
    '/admin/users',
    '/admin/audit-logs',
  ];

  for (const page of pages) {
    const res = await fetch('http://localhost:3000' + page, {
      headers: { Cookie: cookie || '' },
    });
    console.log(page, '-> status:', res.status);
    if (res.status !== 200) {
      console.error('Failed page:', page, 'status:', res.status);
      process.exit(1);
    }
  }

  console.log('All admin pages loaded with status 200!');
}

testAdmin().catch(console.error);
