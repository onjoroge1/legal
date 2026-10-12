const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
test('one canonical origin strips trailing slash and rejects query/token URLs, hosts and fragments',()=>{
 const {canonicalUrl}=load('lib/site-origin.mjs');assert.equal(canonicalUrl('/documents/'),'https://www.legallawdocs.com/documents');assert.equal(canonicalUrl('/'),'https://www.legallawdocs.com');
 for(const path of ['//evil.invalid','https://evil.invalid','/preview?token=private','/x#fragment','/x\\y'])assert.throws(()=>canonicalUrl(path));
});
test('preview indexing remains disabled even with an enabled flag; unapproved content never becomes indexable',()=>{
 const {pageMetadata,jsonLd}=load('lib/site-metadata.ts');process.env.ENABLE_SEARCH_INDEXING='true';process.env.VERCEL_ENV='preview';assert.equal(pageMetadata('/',{title:'Home'}).robots.index,false);
 process.env.VERCEL_ENV='production';assert.equal(pageMetadata('/',{title:'Home'}).robots.index,true);assert.equal(pageMetadata('/documents/business/nda',{title:'Draft'},false).robots.index,false);
 const meta=pageMetadata('/about',{title:'About',openGraph:{url:'https://wrong.invalid'}});assert.equal(meta.openGraph.url,'https://www.legallawdocs.com/about');assert.equal(meta.alternates.canonical,meta.openGraph.url);assert.doesNotMatch(jsonLd({text:'</script><script>alert(1)</script>'}),/</);
 delete process.env.ENABLE_SEARCH_INDEXING;delete process.env.VERCEL_ENV;
});
test('sitemap excludes auth, utility and unreviewed inventory; lastmod is evidence based and assets are crawlable',()=>{
 process.env.ENABLE_SEARCH_INDEXING='true';process.env.VERCEL_ENV='production';const sitemap=load('app/sitemap.ts').default;const entries=sitemap();assert.equal(entries.length,7);assert.equal(new Set(entries.map(x=>x.url)).size,entries.length);
 for(const entry of entries)assert.doesNotMatch(entry.url,/login|signup|generate|preview|checkout|download|lawyers|\/blog\/|\/documents\//);
 assert.equal(entries.find(e=>e.url.endsWith('/contact')).lastModified.toISOString(),'2026-10-12T00:00:00.000Z');assert.equal(entries.find(e=>e.url.endsWith('/about')).lastModified,undefined);
 const robots=load('app/robots.ts').default();assert.equal(robots.rules[0].disallow.includes('/_next/'),false);assert.equal(robots.rules[0].disallow.some(x=>x.includes('generate')),false);
 process.env.VERCEL_ENV='preview';assert.equal(sitemap().length,0);delete process.env.ENABLE_SEARCH_INDEXING;delete process.env.VERCEL_ENV;
});
test('canonical redirect preserves path and utility headers apply independently of robots.txt',async()=>{
 const config=(await import('../next.config.mjs')).default;const redirects=await config.redirects();const host=redirects.find(r=>r.has);assert.equal(host.has[0].value,'legallawdocs.com');assert.equal(host.destination,'https://www.legallawdocs.com/:path*');
 const headers=await config.headers();for(const route of ['/login','/signup','/api/:path*','/dashboard/:path*','/admin/:path*','/documents/:category/:slug/preview'])assert.ok(headers.find(h=>h.source===route).headers.some(h=>h.key==='X-Robots-Tag'&&h.value.includes('noindex')));
});
