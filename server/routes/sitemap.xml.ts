export default defineEventHandler(async (event) => {
  const baseUrl = 'https://portfolio-web-ruddy-eight.vercel.app'

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/projects', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  ]

  // Fetch dynamic blog posts
  const storage = useStorage('content:source:content')
  const blogKeys = (await storage.getKeys()).filter(k => k.startsWith('blog:'))

  const blogRoutes = blogKeys.map((key) => {
    const slug = key.replace('blog:', '').replace('.md', '')
    return {
      path: `/blog/${slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    }
  })

  const allRoutes = [...staticRoutes, ...blogRoutes]

  const now = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  return xml
})
