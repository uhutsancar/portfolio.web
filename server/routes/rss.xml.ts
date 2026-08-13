import { queryCollection } from '@nuxt/content/server'

function escape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://uhutsancar.com'

  const posts = await queryCollection(event, 'blog')
    .order('date', 'DESC')
    .all()

  const items = posts.map(post => `  <item>
    <title>${escape(post.title)}</title>
    <link>${baseUrl}${post.path}</link>
    <guid isPermaLink="true">${baseUrl}${post.path}</guid>
    <description>${escape(post.description)}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>`)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Uhut Sancar — Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Frontend, backend ve mobil tarafında geliştirirken karşılaştığım problemler ve çözümleri üzerine notlarım.</description>
  <language>tr</language>
  <lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
</channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  return xml
})
