const P='athanasia:v1:',SCHEMA=2,VERSION='0.1.0';
export function save(key,data){try{localStorage.setItem(P+key,JSON.stringify({schema:SCHEMA,version:VERSION,data}));return true}catch(e){return false}}
export function load(key,migrate=x=>x){let raw;try{raw=localStorage.getItem(P+key)}catch(e){return null}if(!raw)return null;
try{const o=JSON.parse(raw);return migrate(o.data,o.schema)}catch(e){try{localStorage.setItem(P+key+':backup',raw);localStorage.removeItem(P+key)}catch(_){}return null}}
let t;export const autosave=(key,get)=>{clearTimeout(t);t=setTimeout(()=>save(key,get()),300)};
export const hasSave=k=>{try{return!!localStorage.getItem(P+k)}catch(e){return false}};
