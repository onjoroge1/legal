import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
import {intentRedirects} from '../lib/intent-redirects.mjs'
const base=new URL(process.env.BASE_URL||'http://127.0.0.1:3000');if(!['127.0.0.1','localhost'].includes(base.hostname))throw Error('Local crawl only')
const roots=['/','/documents','/blog','/about','/help','/contact','/review-status'];const queue=[...roots],visited=new Map(),links=[]
const privatePath=/^\/(?:api|dashboard|admin|sign)(?:\/|$)/
while(queue.length){const path=queue.shift();if(visited.has(path)||privatePath.test(path))continue;if(visited.size>150)throw Error('Unexpected crawl expansion');const response=await fetch(new URL(path,base),{redirect:'manual',signal:AbortSignal.timeout(30000)});const html=await response.text();visited.set(path,{status:response.status,html});assert.equal(response.status,200,`Internal page ${path}`)
 for(const [,raw] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){const href=raw.replaceAll('&amp;','&');if(!href.startsWith('/')||href.startsWith('//'))continue;const url=new URL(href,base);if(privatePath.test(url.pathname))continue;links.push({from:path,to:url.pathname,fragment:url.hash});if(!visited.has(url.pathname))queue.push(url.pathname)}
}
for(const link of links){assert.ok(visited.has(link.to),`Missing ${link.to}`);if(link.fragment){const id=decodeURIComponent(link.fragment.slice(1));assert.ok(visited.get(link.to).html.includes(`id="${id}"`),`Missing anchor ${link.to}#${id}`)}}
for(const [source,target] of intentRedirects){const response=await fetch(new URL(source,base),{redirect:'manual'});assert.equal(response.status,308);const location=new URL(response.headers.get('location'),base);assert.equal(location.pathname,target);const final=await fetch(new URL(target,base),{redirect:'manual'});assert.equal(final.status,200)}
const sitemap=await(await fetch(new URL('/sitemap.xml',base))).text();for(const [,url]of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))assert.ok(visited.has(new URL(url).pathname),`Sitemap orphan: ${url}`)
mkdirSync('test-results',{recursive:true});writeFileSync('test-results/discovery.json',JSON.stringify({pages:[...visited].map(([path,v])=>({path,status:v.status})),links:links.length,intentRedirects:intentRedirects.length},null,2));console.log(`Discovery crawl passed: ${visited.size} public pages, ${links.length} internal links and ${intentRedirects.length} intent redirects`)
