const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
const ts=require(ROOT+'/node_modules/typescript');
const {createRequire}=require('module'); const native=createRequire(ROOT+'/package.json');

class NR extends Response {static json(data,opts){return new NR(JSON.stringify(data),{...opts,headers:{'content-type':'application/json'}})}}
function load(file,mocks={},root=ROOT,cache={}){
 file=path.resolve(root,file);if(cache[file])return cache[file].exports;
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const mod={exports:{}};cache[file]=mod;
 const req=(id)=>{if(id in mocks)return mocks[id];if(id==='next/server')return{NextResponse:NR};if(id.startsWith('@/')||id.startsWith('.')){let f=id.startsWith('@/')?path.join(root,id.slice(2)):path.resolve(path.dirname(file),id);if(!path.extname(f))f+='.ts';return load(f,mocks,root,cache);}return native(id)};
 vm.runInNewContext('(function(require,module,exports,__filename,__dirname){'+code+'\n})',{Response,Request,Headers,Buffer,URL,AbortSignal,process,console:{log(){},warn(){},error(){}},setTimeout,clearTimeout})(req,mod,mod.exports,file,path.dirname(file));return mod.exports;
}

module.exports={load};
