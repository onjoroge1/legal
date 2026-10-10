const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
const token='synthetic-mcp-token-with-more-than-32-characters';
function setup(){
 process.env.ENABLE_OPERATIONS_MCP='true';process.env.OPERATIONS_MCP_ORIGIN='https://example.invalid';process.env.OPERATIONS_MCP_TOKEN=token;
 const count={count:async()=>0};const prisma={stripeEvent:count,checkoutOrder:count,deliveryOutbox:count,verifiedFact:count,requestLease:count,requestBudget:{findUnique:async()=>null}};
 return load('app/api/mcp/route.ts',{'./prisma':{prisma},'@/lib/request-budget':{reserveRequest:async()=>{}}});
}
const request=(body,authorization=`Bearer ${token}`,extra={})=>new Request('https://example.invalid/api/mcp',{method:'POST',headers:{authorization,'content-type':'application/json',accept:'application/json, text/event-stream',...extra},body:JSON.stringify(body)});
test('real MCP transport negotiates initialize, lists only aggregate tools, calls tools and rejects mutations',async()=>{
 const route=setup();let id=0;const rpc=async(method,params)=>{const response=await route.POST(request({jsonrpc:'2.0',id:++id,method,params}));assert.equal(response.status,200);return response.json()};
 const initialized=await rpc('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'fixture',version:'1.0'}});assert.equal(initialized.result.serverInfo.name,'legallawdocs-operations');
 const listed=await rpc('tools/list',{});assert.equal(listed.result.tools.length,5);
 for(const tool of listed.result.tools){assert.equal(tool.annotations.readOnlyHint,true);const result=await rpc('tools/call',{name:tool.name,arguments:{}});assert.notEqual(result.result.isError,true);assert.doesNotMatch(JSON.stringify(result),/email|contentHash|guestHash|stripeCustomerId|sk_test|Bearer/)}
 const mutate=await rpc('tools/call',{name:'refund_payment',arguments:{}});assert.ok(mutate.error||mutate.result?.isError);
 const injected=await rpc('tools/call',{name:'get_release_status',arguments:{query:'SELECT * FROM User'}});assert.ok(injected.error||injected.result?.isError);
});
test('MCP authenticates before dispatch, rejects foreign origins, oversized requests and disabled configuration',async()=>{
 const route=setup();assert.equal((await route.POST(request({},'Bearer wrong'))).status,401);
 assert.equal((await route.POST(request({},`Bearer ${token}`,{origin:'https://foreign.invalid'}))).status,403);
 assert.equal((await route.POST(request({padding:'x'.repeat(9000)}))).status,413);
 delete process.env.OPERATIONS_MCP_TOKEN;assert.equal((await route.POST(request({}))).status,401);
 process.env.ENABLE_OPERATIONS_MCP='false';assert.equal((await route.POST(request({}))).status,503);
});
test('official MCP client completes transport lifecycle against the route',async()=>{
 const {Client}=require('@modelcontextprotocol/sdk/client/index.js');const {StreamableHTTPClientTransport}=require('@modelcontextprotocol/sdk/client/streamableHttp.js');const route=setup();
 const client=new Client({name:'official-fixture',version:'1.0.0'});
 const transport=new StreamableHTTPClientTransport(new URL('https://example.invalid/api/mcp'),{requestInit:{headers:{Authorization:`Bearer ${token}`}},fetch:async(url,init)=>{const req=new Request(url,init);return route[req.method](req)}});
 try{await client.connect(transport);assert.equal((await client.listTools()).tools.length,5);assert.notEqual((await client.callTool({name:'get_payment_health',arguments:{}})).isError,true)}finally{await client.close()}
});
