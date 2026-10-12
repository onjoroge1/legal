import assert from 'node:assert/strict'
import {request as httpRequest} from 'node:http'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=new URL(process.env.BASE_URL||'http://127.0.0.1:3000')
if(!['127.0.0.1','localhost'].includes(base.hostname))throw Error('Local rendered checks only')
const results=[]
async function page(path){const r=await fetch(new URL(path,base),{redirect:'manual',signal:AbortSignal.timeout(30000)});const html=await r.text();results.push({path,status:r.status});return{r,html}}
const root=await page('/');assert.equal(root.r.status,200);assert.match(root.html,/<link rel="canonical" href="https:\/\/www\.legallawdocs\.com"/)
const sitemap=await page('/sitemap.xml');assert.equal(sitemap.r.status,200)
for(const [,url] of sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)){const parsed=new URL(url);assert.equal(parsed.origin,'https://www.legallawdocs.com');const {r,html}=await page(parsed.pathname);assert.equal(r.status,200);assert.ok(html.includes(`rel="canonical" href="${url}"`));assert.doesNotMatch(html,/<meta name="robots" content="[^"]*noindex/)}
for(const path of ['/login','/signup','/documents/business/non-disclosure-agreement','/documents/business/non-disclosure-agreement/generate','/review-status']){const {r,html}=await page(path);assert.equal(r.status,200);if(path!='/review-status')assert.ok(r.headers.get('x-robots-tag')?.includes('noindex')||/<meta name="robots" content="[^"]*noindex/.test(html))}
const card=await fetch(new URL('/share-card.png',base));assert.equal(card.status,200);assert.match(card.headers.get('content-type'),/image\/png/)
const robots=await page('/robots.txt');assert.doesNotMatch(robots.html,/Disallow: \/_next\//)
const alias=await new Promise((resolve,reject)=>{const request=httpRequest({hostname:base.hostname,port:base.port,path:'/contact?example=1',headers:{Host:'legallawdocs.com'}},response=>{response.resume();resolve(response)});request.on('error',reject);request.end()});assert.equal(alias.statusCode,308);assert.equal(alias.headers.location,'https://www.legallawdocs.com/contact?example=1')
mkdirSync('test-results',{recursive:true});writeFileSync('test-results/seo-rendered.json',JSON.stringify({results},null,2));console.log(`Rendered SEO passed: ${results.length} pages, metadata/directives, share image and canonical host redirect`)
