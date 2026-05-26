const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Landing-CkGgUc4l.js","assets/vendor-ui-Dafw4UX-.js","assets/vendor-react-BsOwQ6W2.js","assets/vendor-supabase-Bph4_7u1.js","assets/vendor-charts-BYC1fNlF.js","assets/Plans-BJl40nSX.js","assets/Install-omgnLm1Y.js","assets/Dashboard-BkCGfFNx.js","assets/Layout-CDg2pknD.js","assets/dateUtils-CJJXCCqQ.js","assets/EmptyState-BxP3gys3.js","assets/useCreditCardInvoice-lSosGp1E.js","assets/TransacoesImproved-C9E-DDt6.js","assets/textarea-CWS27Ny6.js","assets/select-Cdn3OWdO.js","assets/dialog-G47InFp7.js","assets/table-BRlB3e0f.js","assets/currency-input-Bj3whe8X.js","assets/vendor-export-Cip9Npmu.js","assets/ContasImproved-CfYghLfH.js","assets/alert-dialog-C4FEwU9z.js","assets/tabs-DHND9v5Q.js","assets/currency-input-fixed-CJwrvZPA.js","assets/progress-CSkrA2O6.js","assets/differenceInCalendarDays-BV5Kr9EH.js","assets/endOfMonth-BenAIIda.js","assets/format-DIpy1Ntx.js","assets/addMonths-B9tE-aft.js","assets/getDaysInMonth-BuYC73J3.js","assets/Investimentos-CPAbHZR0.js","assets/GoalsImproved-ShAT5svr.js","assets/formatters-DfsmHH6G.js","assets/RelatoriosImproved-CD8wxkCj.js","assets/SettingsImproved-whKH00N8.js","assets/useQuery-CwCYT01l.js","assets/useMutation-B4Q5PZoW.js","assets/CategoryManagement-_U4uoxk3.js","assets/cpfFormatter-89UV5fNZ.js","assets/NotFound-BM1QIDtm.js","assets/WhatsAppConnection-BKEqWWSc.js","assets/Categorias-kMHvFSiU.js","assets/Contacts-D9EQKUC6.js","assets/Social-CFDvrBH2.js","assets/Boletos-CrDbY-4O.js","assets/AboutUs-fFcxLBhJ.js","assets/TermsOfService-uhmddr9W.js","assets/PrivacyPolicy-CBtyY5PX.js","assets/Contact-BtASj60v.js","assets/Orcamento-WChQqxcH.js"])))=>i.map(i=>d[i]);
var zC=Object.defineProperty;var Tx=t=>{throw TypeError(t)};var HC=(t,a,o)=>a in t?zC(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o;var $r=(t,a,o)=>HC(t,typeof a!="symbol"?a+"":a,o),Yg=(t,a,o)=>a.has(t)||Tx("Cannot "+o);var g=(t,a,o)=>(Yg(t,a,"read from private field"),o?o.call(t):a.get(t)),K=(t,a,o)=>a.has(t)?Tx("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,o),E=(t,a,o,r)=>(Yg(t,a,"write to private field"),r?r.call(t,o):a.set(t,o),o),me=(t,a,o)=>(Yg(t,a,"access private method"),o);var Qr=(t,a,o,r)=>({set _(c){E(t,a,c,o)},get _(){return g(t,a,r)}});import{j as n,c as Ug,a as uw,u as $e,B as VC,P as fe,b as px,d as qo,e as _,f as So,V as kw,R as RC,g as Mw,h as DC,i as mw,C as vw,k as TC,l as FC,T as BC,S as EC,m as fw,n as gw,o as xw,A as OC,I as UC,p as NC,q as _C,r as GC,F as ZC,D as WC,s as XC,t as KC,v as $C,w as QC,x as JC,y as YC,z as Fx,E as eb,G as tb}from"./vendor-ui-Dafw4UX-.js";import{a as ww,r as d,R as S,b as ab,u as Lw,N as Cw,B as ob,f as rb,h as ie}from"./vendor-react-BsOwQ6W2.js";import{c as nb,_ as le}from"./vendor-supabase-Bph4_7u1.js";import{c as bw}from"./vendor-charts-BYC1fNlF.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))r(c);new MutationObserver(c=>{for(const i of c)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(c){const i={};return c.integrity&&(i.integrity=c.integrity),c.referrerPolicy&&(i.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?i.credentials="include":c.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(c){if(c.ep)return;c.ep=!0;const i=o(c);fetch(c.href,i)}})();var Iw,Bx=ww;Iw=Bx.createRoot,Bx.hydrateRoot;var Ng=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},_g=typeof window>"u"||"Deno"in globalThis;function Re(){}function cb(t,a){return typeof t=="function"?t(a):t}function ib(t){return typeof t=="number"&&t>=0&&t!==1/0}function db(t,a){return Math.max(t+(a||0)-Date.now(),0)}function nx(t,a){return typeof t=="function"?t(a):t}function sb(t,a){return typeof t=="function"?t(a):t}function Ex(t,a){const{type:o="all",exact:r,fetchStatus:c,predicate:i,queryKey:l,stale:h}=t;if(l){if(r){if(a.queryHash!==ux(l,a.options))return!1}else if(!Br(a.queryKey,l))return!1}if(o!=="all"){const y=a.isActive();if(o==="active"&&!y||o==="inactive"&&y)return!1}return!(typeof h=="boolean"&&a.isStale()!==h||c&&c!==a.state.fetchStatus||i&&!i(a))}function Ox(t,a){const{exact:o,status:r,predicate:c,mutationKey:i}=t;if(i){if(!a.options.mutationKey)return!1;if(o){if(Fr(a.options.mutationKey)!==Fr(i))return!1}else if(!Br(a.options.mutationKey,i))return!1}return!(r&&a.state.status!==r||c&&!c(a))}function ux(t,a){return((a==null?void 0:a.queryKeyHashFn)||Fr)(t)}function Fr(t){return JSON.stringify(t,(a,o)=>cx(o)?Object.keys(o).sort().reduce((r,c)=>(r[c]=o[c],r),{}):o)}function Br(t,a){return t===a?!0:typeof t!=typeof a?!1:t&&a&&typeof t=="object"&&typeof a=="object"?Object.keys(a).every(o=>Br(t[o],a[o])):!1}function Sw(t,a){if(t===a)return t;const o=Ux(t)&&Ux(a);if(o||cx(t)&&cx(a)){const r=o?t:Object.keys(t),c=r.length,i=o?a:Object.keys(a),l=i.length,h=o?[]:{},y=new Set(r);let p=0;for(let M=0;M<l;M++){const k=o?M:i[M];(!o&&y.has(k)||o)&&t[k]===void 0&&a[k]===void 0?(h[k]=void 0,p++):(h[k]=Sw(t[k],a[k]),h[k]===t[k]&&t[k]!==void 0&&p++)}return c===l&&p===c?t:h}return a}function RA(t,a){if(!a||Object.keys(t).length!==Object.keys(a).length)return!1;for(const o in t)if(t[o]!==a[o])return!1;return!0}function Ux(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function cx(t){if(!Nx(t))return!1;const a=t.constructor;if(a===void 0)return!0;const o=a.prototype;return!(!Nx(o)||!o.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(t)!==Object.prototype)}function Nx(t){return Object.prototype.toString.call(t)==="[object Object]"}function hb(t){return new Promise(a=>{setTimeout(a,t)})}function lb(t,a,o){return typeof o.structuralSharing=="function"?o.structuralSharing(t,a):o.structuralSharing!==!1?Sw(t,a):a}function yb(t,a,o=0){const r=[...t,a];return o&&r.length>o?r.slice(1):r}function pb(t,a,o=0){const r=[a,...t];return o&&r.length>o?r.slice(0,-1):r}var kx=Symbol();function qw(t,a){return!t.queryFn&&(a!=null&&a.initialPromise)?()=>a.initialPromise:!t.queryFn||t.queryFn===kx?()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)):t.queryFn}function DA(t,a){return typeof t=="function"?t(...a):!!t}var N2,c1,fo,cw,ub=(cw=class extends Ng{constructor(){super();K(this,N2);K(this,c1);K(this,fo);E(this,fo,a=>{if(!_g&&window.addEventListener){const o=()=>a();return window.addEventListener("visibilitychange",o,!1),()=>{window.removeEventListener("visibilitychange",o)}}})}onSubscribe(){g(this,c1)||this.setEventListener(g(this,fo))}onUnsubscribe(){var a;this.hasListeners()||((a=g(this,c1))==null||a.call(this),E(this,c1,void 0))}setEventListener(a){var o;E(this,fo,a),(o=g(this,c1))==null||o.call(this),E(this,c1,a(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(a){g(this,N2)!==a&&(E(this,N2,a),this.onFocus())}onFocus(){const a=this.isFocused();this.listeners.forEach(o=>{o(a)})}isFocused(){var a;return typeof g(this,N2)=="boolean"?g(this,N2):((a=globalThis.document)==null?void 0:a.visibilityState)!=="hidden"}},N2=new WeakMap,c1=new WeakMap,fo=new WeakMap,cw),Aw=new ub,go,i1,xo,iw,kb=(iw=class extends Ng{constructor(){super();K(this,go,!0);K(this,i1);K(this,xo);E(this,xo,a=>{if(!_g&&window.addEventListener){const o=()=>a(!0),r=()=>a(!1);return window.addEventListener("online",o,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",o),window.removeEventListener("offline",r)}}})}onSubscribe(){g(this,i1)||this.setEventListener(g(this,xo))}onUnsubscribe(){var a;this.hasListeners()||((a=g(this,i1))==null||a.call(this),E(this,i1,void 0))}setEventListener(a){var o;E(this,xo,a),(o=g(this,i1))==null||o.call(this),E(this,i1,a(this.setOnline.bind(this)))}setOnline(a){g(this,go)!==a&&(E(this,go,a),this.listeners.forEach(r=>{r(a)}))}isOnline(){return g(this,go)}},go=new WeakMap,i1=new WeakMap,xo=new WeakMap,iw),Bg=new kb;function Mb(){let t,a;const o=new Promise((c,i)=>{t=c,a=i});o.status="pending",o.catch(()=>{});function r(c){Object.assign(o,c),delete o.resolve,delete o.reject}return o.resolve=c=>{r({status:"fulfilled",value:c}),t(c)},o.reject=c=>{r({status:"rejected",reason:c}),a(c)},o}function mb(t){return Math.min(1e3*2**t,3e4)}function jw(t){return(t??"online")==="online"?Bg.isOnline():!0}var Pw=class extends Error{constructor(t){super("CancelledError"),this.revert=t==null?void 0:t.revert,this.silent=t==null?void 0:t.silent}};function ex(t){return t instanceof Pw}function zw(t){let a=!1,o=0,r=!1,c;const i=Mb(),l=m=>{var v;r||(u(new Pw(m)),(v=t.abort)==null||v.call(t))},h=()=>{a=!0},y=()=>{a=!1},p=()=>Aw.isFocused()&&(t.networkMode==="always"||Bg.isOnline())&&t.canRun(),M=()=>jw(t.networkMode)&&t.canRun(),k=m=>{var v;r||(r=!0,(v=t.onSuccess)==null||v.call(t,m),c==null||c(),i.resolve(m))},u=m=>{var v;r||(r=!0,(v=t.onError)==null||v.call(t,m),c==null||c(),i.reject(m))},s=()=>new Promise(m=>{var v;c=C=>{(r||p())&&m(C)},(v=t.onPause)==null||v.call(t)}).then(()=>{var m;c=void 0,r||(m=t.onContinue)==null||m.call(t)}),w=()=>{if(r)return;let m;const v=o===0?t.initialPromise:void 0;try{m=v??t.fn()}catch(C){m=Promise.reject(C)}Promise.resolve(m).then(k).catch(C=>{var V;if(r)return;const b=t.retry??(_g?0:3),A=t.retryDelay??mb,z=typeof A=="function"?A(o,C):A,T=b===!0||typeof b=="number"&&o<b||typeof b=="function"&&b(o,C);if(a||!T){u(C);return}o++,(V=t.onFail)==null||V.call(t,o,C),hb(z).then(()=>p()?void 0:s()).then(()=>{a?u(C):w()})})};return{promise:i,cancel:l,continue:()=>(c==null||c(),i),cancelRetry:h,continueRetry:y,canStart:M,start:()=>(M()?w():s().then(w),i)}}var vb=t=>setTimeout(t,0);function fb(){let t=[],a=0,o=h=>{h()},r=h=>{h()},c=vb;const i=h=>{a?t.push(h):c(()=>{o(h)})},l=()=>{const h=t;t=[],h.length&&c(()=>{r(()=>{h.forEach(y=>{o(y)})})})};return{batch:h=>{let y;a++;try{y=h()}finally{a--,a||l()}return y},batchCalls:h=>(...y)=>{i(()=>{h(...y)})},schedule:i,setNotifyFunction:h=>{o=h},setBatchNotifyFunction:h=>{r=h},setScheduler:h=>{c=h}}}var xe=fb(),_2,dw,Hw=(dw=class{constructor(){K(this,_2)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),ib(this.gcTime)&&E(this,_2,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(_g?1/0:5*60*1e3))}clearGcTimeout(){g(this,_2)&&(clearTimeout(g(this,_2)),E(this,_2,void 0))}},_2=new WeakMap,dw),wo,G2,Ae,Z2,ve,Nr,W2,De,Ge,sw,gb=(sw=class extends Hw{constructor(a){super();K(this,De);K(this,wo);K(this,G2);K(this,Ae);K(this,Z2);K(this,ve);K(this,Nr);K(this,W2);E(this,W2,!1),E(this,Nr,a.defaultOptions),this.setOptions(a.options),this.observers=[],E(this,Z2,a.client),E(this,Ae,g(this,Z2).getQueryCache()),this.queryKey=a.queryKey,this.queryHash=a.queryHash,E(this,wo,wb(this.options)),this.state=a.state??g(this,wo),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var a;return(a=g(this,ve))==null?void 0:a.promise}setOptions(a){this.options={...g(this,Nr),...a},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&g(this,Ae).remove(this)}setData(a,o){const r=lb(this.state.data,a,this.options);return me(this,De,Ge).call(this,{data:r,type:"success",dataUpdatedAt:o==null?void 0:o.updatedAt,manual:o==null?void 0:o.manual}),r}setState(a,o){me(this,De,Ge).call(this,{type:"setState",state:a,setStateOptions:o})}cancel(a){var r,c;const o=(r=g(this,ve))==null?void 0:r.promise;return(c=g(this,ve))==null||c.cancel(a),o?o.then(Re).catch(Re):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(g(this,wo))}isActive(){return this.observers.some(a=>sb(a.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===kx||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(a=>nx(a.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(a=>a.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(a=0){return this.state.data===void 0?!0:a==="static"?!1:this.state.isInvalidated?!0:!db(this.state.dataUpdatedAt,a)}onFocus(){var o;const a=this.observers.find(r=>r.shouldFetchOnWindowFocus());a==null||a.refetch({cancelRefetch:!1}),(o=g(this,ve))==null||o.continue()}onOnline(){var o;const a=this.observers.find(r=>r.shouldFetchOnReconnect());a==null||a.refetch({cancelRefetch:!1}),(o=g(this,ve))==null||o.continue()}addObserver(a){this.observers.includes(a)||(this.observers.push(a),this.clearGcTimeout(),g(this,Ae).notify({type:"observerAdded",query:this,observer:a}))}removeObserver(a){this.observers.includes(a)&&(this.observers=this.observers.filter(o=>o!==a),this.observers.length||(g(this,ve)&&(g(this,W2)?g(this,ve).cancel({revert:!0}):g(this,ve).cancelRetry()),this.scheduleGc()),g(this,Ae).notify({type:"observerRemoved",query:this,observer:a}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||me(this,De,Ge).call(this,{type:"invalidate"})}fetch(a,o){var p,M,k;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(o!=null&&o.cancelRefetch))this.cancel({silent:!0});else if(g(this,ve))return g(this,ve).continueRetry(),g(this,ve).promise}if(a&&this.setOptions(a),!this.options.queryFn){const u=this.observers.find(s=>s.options.queryFn);u&&this.setOptions(u.options)}const r=new AbortController,c=u=>{Object.defineProperty(u,"signal",{enumerable:!0,get:()=>(E(this,W2,!0),r.signal)})},i=()=>{const u=qw(this.options,o),w=(()=>{const m={client:g(this,Z2),queryKey:this.queryKey,meta:this.meta};return c(m),m})();return E(this,W2,!1),this.options.persister?this.options.persister(u,w,this):u(w)},h=(()=>{const u={fetchOptions:o,options:this.options,queryKey:this.queryKey,client:g(this,Z2),state:this.state,fetchFn:i};return c(u),u})();(p=this.options.behavior)==null||p.onFetch(h,this),E(this,G2,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((M=h.fetchOptions)==null?void 0:M.meta))&&me(this,De,Ge).call(this,{type:"fetch",meta:(k=h.fetchOptions)==null?void 0:k.meta});const y=u=>{var s,w,m,v;ex(u)&&u.silent||me(this,De,Ge).call(this,{type:"error",error:u}),ex(u)||((w=(s=g(this,Ae).config).onError)==null||w.call(s,u,this),(v=(m=g(this,Ae).config).onSettled)==null||v.call(m,this.state.data,u,this)),this.scheduleGc()};return E(this,ve,zw({initialPromise:o==null?void 0:o.initialPromise,fn:h.fetchFn,abort:r.abort.bind(r),onSuccess:u=>{var s,w,m,v;if(u===void 0){y(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(u)}catch(C){y(C);return}(w=(s=g(this,Ae).config).onSuccess)==null||w.call(s,u,this),(v=(m=g(this,Ae).config).onSettled)==null||v.call(m,u,this.state.error,this),this.scheduleGc()},onError:y,onFail:(u,s)=>{me(this,De,Ge).call(this,{type:"failed",failureCount:u,error:s})},onPause:()=>{me(this,De,Ge).call(this,{type:"pause"})},onContinue:()=>{me(this,De,Ge).call(this,{type:"continue"})},retry:h.options.retry,retryDelay:h.options.retryDelay,networkMode:h.options.networkMode,canRun:()=>!0})),g(this,ve).start()}},wo=new WeakMap,G2=new WeakMap,Ae=new WeakMap,Z2=new WeakMap,ve=new WeakMap,Nr=new WeakMap,W2=new WeakMap,De=new WeakSet,Ge=function(a){const o=r=>{switch(a.type){case"failed":return{...r,fetchFailureCount:a.failureCount,fetchFailureReason:a.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...xb(r.data,this.options),fetchMeta:a.meta??null};case"success":return E(this,G2,void 0),{...r,data:a.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:a.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!a.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const c=a.error;return ex(c)&&c.revert&&g(this,G2)?{...g(this,G2),fetchStatus:"idle"}:{...r,error:c,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:c,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...a.state}}};this.state=o(this.state),xe.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),g(this,Ae).notify({query:this,type:"updated",action:a})})},sw);function xb(t,a){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:jw(a.networkMode)?"fetching":"paused",...t===void 0&&{error:null,status:"pending"}}}function wb(t){const a=typeof t.initialData=="function"?t.initialData():t.initialData,o=a!==void 0,r=o?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:a,dataUpdateCount:0,dataUpdatedAt:o?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:o?"success":"pending",fetchStatus:"idle"}}var Ee,hw,Lb=(hw=class extends Ng{constructor(a={}){super();K(this,Ee);this.config=a,E(this,Ee,new Map)}build(a,o,r){const c=o.queryKey,i=o.queryHash??ux(c,o);let l=this.get(i);return l||(l=new gb({client:a,queryKey:c,queryHash:i,options:a.defaultQueryOptions(o),state:r,defaultOptions:a.getQueryDefaults(c)}),this.add(l)),l}add(a){g(this,Ee).has(a.queryHash)||(g(this,Ee).set(a.queryHash,a),this.notify({type:"added",query:a}))}remove(a){const o=g(this,Ee).get(a.queryHash);o&&(a.destroy(),o===a&&g(this,Ee).delete(a.queryHash),this.notify({type:"removed",query:a}))}clear(){xe.batch(()=>{this.getAll().forEach(a=>{this.remove(a)})})}get(a){return g(this,Ee).get(a)}getAll(){return[...g(this,Ee).values()]}find(a){const o={exact:!0,...a};return this.getAll().find(r=>Ex(o,r))}findAll(a={}){const o=this.getAll();return Object.keys(a).length>0?o.filter(r=>Ex(a,r)):o}notify(a){xe.batch(()=>{this.listeners.forEach(o=>{o(a)})})}onFocus(){xe.batch(()=>{this.getAll().forEach(a=>{a.onFocus()})})}onOnline(){xe.batch(()=>{this.getAll().forEach(a=>{a.onOnline()})})}},Ee=new WeakMap,hw),Oe,ge,X2,Ue,o1,lw,Cb=(lw=class extends Hw{constructor(a){super();K(this,Ue);K(this,Oe);K(this,ge);K(this,X2);this.mutationId=a.mutationId,E(this,ge,a.mutationCache),E(this,Oe,[]),this.state=a.state||bb(),this.setOptions(a.options),this.scheduleGc()}setOptions(a){this.options=a,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(a){g(this,Oe).includes(a)||(g(this,Oe).push(a),this.clearGcTimeout(),g(this,ge).notify({type:"observerAdded",mutation:this,observer:a}))}removeObserver(a){E(this,Oe,g(this,Oe).filter(o=>o!==a)),this.scheduleGc(),g(this,ge).notify({type:"observerRemoved",mutation:this,observer:a})}optionalRemove(){g(this,Oe).length||(this.state.status==="pending"?this.scheduleGc():g(this,ge).remove(this))}continue(){var a;return((a=g(this,X2))==null?void 0:a.continue())??this.execute(this.state.variables)}async execute(a){var i,l,h,y,p,M,k,u,s,w,m,v,C,b,A,z,T,V,G,R;const o=()=>{me(this,Ue,o1).call(this,{type:"continue"})};E(this,X2,zw({fn:()=>this.options.mutationFn?this.options.mutationFn(a):Promise.reject(new Error("No mutationFn found")),onFail:(I,D)=>{me(this,Ue,o1).call(this,{type:"failed",failureCount:I,error:D})},onPause:()=>{me(this,Ue,o1).call(this,{type:"pause"})},onContinue:o,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>g(this,ge).canRun(this)}));const r=this.state.status==="pending",c=!g(this,X2).canStart();try{if(r)o();else{me(this,Ue,o1).call(this,{type:"pending",variables:a,isPaused:c}),await((l=(i=g(this,ge).config).onMutate)==null?void 0:l.call(i,a,this));const D=await((y=(h=this.options).onMutate)==null?void 0:y.call(h,a));D!==this.state.context&&me(this,Ue,o1).call(this,{type:"pending",context:D,variables:a,isPaused:c})}const I=await g(this,X2).start();return await((M=(p=g(this,ge).config).onSuccess)==null?void 0:M.call(p,I,a,this.state.context,this)),await((u=(k=this.options).onSuccess)==null?void 0:u.call(k,I,a,this.state.context)),await((w=(s=g(this,ge).config).onSettled)==null?void 0:w.call(s,I,null,this.state.variables,this.state.context,this)),await((v=(m=this.options).onSettled)==null?void 0:v.call(m,I,null,a,this.state.context)),me(this,Ue,o1).call(this,{type:"success",data:I}),I}catch(I){try{throw await((b=(C=g(this,ge).config).onError)==null?void 0:b.call(C,I,a,this.state.context,this)),await((z=(A=this.options).onError)==null?void 0:z.call(A,I,a,this.state.context)),await((V=(T=g(this,ge).config).onSettled)==null?void 0:V.call(T,void 0,I,this.state.variables,this.state.context,this)),await((R=(G=this.options).onSettled)==null?void 0:R.call(G,void 0,I,a,this.state.context)),I}finally{me(this,Ue,o1).call(this,{type:"error",error:I})}}finally{g(this,ge).runNext(this)}}},Oe=new WeakMap,ge=new WeakMap,X2=new WeakMap,Ue=new WeakSet,o1=function(a){const o=r=>{switch(a.type){case"failed":return{...r,failureCount:a.failureCount,failureReason:a.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:a.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:a.isPaused,status:"pending",variables:a.variables,submittedAt:Date.now()};case"success":return{...r,data:a.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:a.error,failureCount:r.failureCount+1,failureReason:a.error,isPaused:!1,status:"error"}}};this.state=o(this.state),xe.batch(()=>{g(this,Oe).forEach(r=>{r.onMutationUpdate(a)}),g(this,ge).notify({mutation:this,type:"updated",action:a})})},lw);function bb(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var Ke,Te,_r,yw,Ib=(yw=class extends Ng{constructor(a={}){super();K(this,Ke);K(this,Te);K(this,_r);this.config=a,E(this,Ke,new Set),E(this,Te,new Map),E(this,_r,0)}build(a,o,r){const c=new Cb({mutationCache:this,mutationId:++Qr(this,_r)._,options:a.defaultMutationOptions(o),state:r});return this.add(c),c}add(a){g(this,Ke).add(a);const o=Jr(a);if(typeof o=="string"){const r=g(this,Te).get(o);r?r.push(a):g(this,Te).set(o,[a])}this.notify({type:"added",mutation:a})}remove(a){if(g(this,Ke).delete(a)){const o=Jr(a);if(typeof o=="string"){const r=g(this,Te).get(o);if(r)if(r.length>1){const c=r.indexOf(a);c!==-1&&r.splice(c,1)}else r[0]===a&&g(this,Te).delete(o)}}this.notify({type:"removed",mutation:a})}canRun(a){const o=Jr(a);if(typeof o=="string"){const r=g(this,Te).get(o),c=r==null?void 0:r.find(i=>i.state.status==="pending");return!c||c===a}else return!0}runNext(a){var r;const o=Jr(a);if(typeof o=="string"){const c=(r=g(this,Te).get(o))==null?void 0:r.find(i=>i!==a&&i.state.isPaused);return(c==null?void 0:c.continue())??Promise.resolve()}else return Promise.resolve()}clear(){xe.batch(()=>{g(this,Ke).forEach(a=>{this.notify({type:"removed",mutation:a})}),g(this,Ke).clear(),g(this,Te).clear()})}getAll(){return Array.from(g(this,Ke))}find(a){const o={exact:!0,...a};return this.getAll().find(r=>Ox(o,r))}findAll(a={}){return this.getAll().filter(o=>Ox(a,o))}notify(a){xe.batch(()=>{this.listeners.forEach(o=>{o(a)})})}resumePausedMutations(){const a=this.getAll().filter(o=>o.state.isPaused);return xe.batch(()=>Promise.all(a.map(o=>o.continue().catch(Re))))}},Ke=new WeakMap,Te=new WeakMap,_r=new WeakMap,yw);function Jr(t){var a;return(a=t.options.scope)==null?void 0:a.id}function _x(t){return{onFetch:(a,o)=>{var M,k,u,s,w;const r=a.options,c=(u=(k=(M=a.fetchOptions)==null?void 0:M.meta)==null?void 0:k.fetchMore)==null?void 0:u.direction,i=((s=a.state.data)==null?void 0:s.pages)||[],l=((w=a.state.data)==null?void 0:w.pageParams)||[];let h={pages:[],pageParams:[]},y=0;const p=async()=>{let m=!1;const v=A=>{Object.defineProperty(A,"signal",{enumerable:!0,get:()=>(a.signal.aborted?m=!0:a.signal.addEventListener("abort",()=>{m=!0}),a.signal)})},C=qw(a.options,a.fetchOptions),b=async(A,z,T)=>{if(m)return Promise.reject();if(z==null&&A.pages.length)return Promise.resolve(A);const G=(()=>{const F={client:a.client,queryKey:a.queryKey,pageParam:z,direction:T?"backward":"forward",meta:a.options.meta};return v(F),F})(),R=await C(G),{maxPages:I}=a.options,D=T?pb:yb;return{pages:D(A.pages,R,I),pageParams:D(A.pageParams,z,I)}};if(c&&i.length){const A=c==="backward",z=A?Sb:Gx,T={pages:i,pageParams:l},V=z(r,T);h=await b(T,V,A)}else{const A=t??i.length;do{const z=y===0?l[0]??r.initialPageParam:Gx(r,h);if(y>0&&z==null)break;h=await b(h,z),y++}while(y<A)}return h};a.options.persister?a.fetchFn=()=>{var m,v;return(v=(m=a.options).persister)==null?void 0:v.call(m,p,{client:a.client,queryKey:a.queryKey,meta:a.options.meta,signal:a.signal},o)}:a.fetchFn=p}}}function Gx(t,{pages:a,pageParams:o}){const r=a.length-1;return a.length>0?t.getNextPageParam(a[r],a,o[r],o):void 0}function Sb(t,{pages:a,pageParams:o}){var r;return a.length>0?(r=t.getPreviousPageParam)==null?void 0:r.call(t,a[0],a,o[0],o):void 0}var se,d1,s1,Lo,Co,h1,bo,Io,pw,qb=(pw=class{constructor(t={}){K(this,se);K(this,d1);K(this,s1);K(this,Lo);K(this,Co);K(this,h1);K(this,bo);K(this,Io);E(this,se,t.queryCache||new Lb),E(this,d1,t.mutationCache||new Ib),E(this,s1,t.defaultOptions||{}),E(this,Lo,new Map),E(this,Co,new Map),E(this,h1,0)}mount(){Qr(this,h1)._++,g(this,h1)===1&&(E(this,bo,Aw.subscribe(async t=>{t&&(await this.resumePausedMutations(),g(this,se).onFocus())})),E(this,Io,Bg.subscribe(async t=>{t&&(await this.resumePausedMutations(),g(this,se).onOnline())})))}unmount(){var t,a;Qr(this,h1)._--,g(this,h1)===0&&((t=g(this,bo))==null||t.call(this),E(this,bo,void 0),(a=g(this,Io))==null||a.call(this),E(this,Io,void 0))}isFetching(t){return g(this,se).findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return g(this,d1).findAll({...t,status:"pending"}).length}getQueryData(t){var o;const a=this.defaultQueryOptions({queryKey:t});return(o=g(this,se).get(a.queryHash))==null?void 0:o.state.data}ensureQueryData(t){const a=this.defaultQueryOptions(t),o=g(this,se).build(this,a),r=o.state.data;return r===void 0?this.fetchQuery(t):(t.revalidateIfStale&&o.isStaleByTime(nx(a.staleTime,o))&&this.prefetchQuery(a),Promise.resolve(r))}getQueriesData(t){return g(this,se).findAll(t).map(({queryKey:a,state:o})=>{const r=o.data;return[a,r]})}setQueryData(t,a,o){const r=this.defaultQueryOptions({queryKey:t}),c=g(this,se).get(r.queryHash),i=c==null?void 0:c.state.data,l=cb(a,i);if(l!==void 0)return g(this,se).build(this,r).setData(l,{...o,manual:!0})}setQueriesData(t,a,o){return xe.batch(()=>g(this,se).findAll(t).map(({queryKey:r})=>[r,this.setQueryData(r,a,o)]))}getQueryState(t){var o;const a=this.defaultQueryOptions({queryKey:t});return(o=g(this,se).get(a.queryHash))==null?void 0:o.state}removeQueries(t){const a=g(this,se);xe.batch(()=>{a.findAll(t).forEach(o=>{a.remove(o)})})}resetQueries(t,a){const o=g(this,se);return xe.batch(()=>(o.findAll(t).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...t},a)))}cancelQueries(t,a={}){const o={revert:!0,...a},r=xe.batch(()=>g(this,se).findAll(t).map(c=>c.cancel(o)));return Promise.all(r).then(Re).catch(Re)}invalidateQueries(t,a={}){return xe.batch(()=>(g(this,se).findAll(t).forEach(o=>{o.invalidate()}),(t==null?void 0:t.refetchType)==="none"?Promise.resolve():this.refetchQueries({...t,type:(t==null?void 0:t.refetchType)??(t==null?void 0:t.type)??"active"},a)))}refetchQueries(t,a={}){const o={...a,cancelRefetch:a.cancelRefetch??!0},r=xe.batch(()=>g(this,se).findAll(t).filter(c=>!c.isDisabled()&&!c.isStatic()).map(c=>{let i=c.fetch(void 0,o);return o.throwOnError||(i=i.catch(Re)),c.state.fetchStatus==="paused"?Promise.resolve():i}));return Promise.all(r).then(Re)}fetchQuery(t){const a=this.defaultQueryOptions(t);a.retry===void 0&&(a.retry=!1);const o=g(this,se).build(this,a);return o.isStaleByTime(nx(a.staleTime,o))?o.fetch(a):Promise.resolve(o.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(Re).catch(Re)}fetchInfiniteQuery(t){return t.behavior=_x(t.pages),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(Re).catch(Re)}ensureInfiniteQueryData(t){return t.behavior=_x(t.pages),this.ensureQueryData(t)}resumePausedMutations(){return Bg.isOnline()?g(this,d1).resumePausedMutations():Promise.resolve()}getQueryCache(){return g(this,se)}getMutationCache(){return g(this,d1)}getDefaultOptions(){return g(this,s1)}setDefaultOptions(t){E(this,s1,t)}setQueryDefaults(t,a){g(this,Lo).set(Fr(t),{queryKey:t,defaultOptions:a})}getQueryDefaults(t){const a=[...g(this,Lo).values()],o={};return a.forEach(r=>{Br(t,r.queryKey)&&Object.assign(o,r.defaultOptions)}),o}setMutationDefaults(t,a){g(this,Co).set(Fr(t),{mutationKey:t,defaultOptions:a})}getMutationDefaults(t){const a=[...g(this,Co).values()],o={};return a.forEach(r=>{Br(t,r.mutationKey)&&Object.assign(o,r.defaultOptions)}),o}defaultQueryOptions(t){if(t._defaulted)return t;const a={...g(this,s1).queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return a.queryHash||(a.queryHash=ux(a.queryKey,a)),a.refetchOnReconnect===void 0&&(a.refetchOnReconnect=a.networkMode!=="always"),a.throwOnError===void 0&&(a.throwOnError=!!a.suspense),!a.networkMode&&a.persister&&(a.networkMode="offlineFirst"),a.queryFn===kx&&(a.enabled=!1),a}defaultMutationOptions(t){return t!=null&&t._defaulted?t:{...g(this,s1).mutations,...(t==null?void 0:t.mutationKey)&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){g(this,se).clear(),g(this,d1).clear()}},se=new WeakMap,d1=new WeakMap,s1=new WeakMap,Lo=new WeakMap,Co=new WeakMap,h1=new WeakMap,bo=new WeakMap,Io=new WeakMap,pw),Vw=d.createContext(void 0),TA=t=>{const a=d.useContext(Vw);if(!a)throw new Error("No QueryClient set, use QueryClientProvider to set one");return a},Ab=({client:t,children:a})=>(d.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),n.jsx(Vw.Provider,{value:t,children:a}));const jb=1,Pb=1e6;let tx=0;function zb(){return tx=(tx+1)%Number.MAX_SAFE_INTEGER,tx.toString()}const ax=new Map,Zx=t=>{if(ax.has(t))return;const a=setTimeout(()=>{ax.delete(t),Ro({type:"REMOVE_TOAST",toastId:t})},Pb);ax.set(t,a)},Hb=(t,a)=>{switch(a.type){case"ADD_TOAST":return{...t,toasts:[a.toast,...t.toasts].slice(0,jb)};case"UPDATE_TOAST":return{...t,toasts:t.toasts.map(o=>o.id===a.toast.id?{...o,...a.toast}:o)};case"DISMISS_TOAST":{const{toastId:o}=a;return o?Zx(o):t.toasts.forEach(r=>{Zx(r.id)}),{...t,toasts:t.toasts.map(r=>r.id===o||o===void 0?{...r,open:!1}:r)}}case"REMOVE_TOAST":return a.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==a.toastId)}}},an=[];let on={toasts:[]};function Ro(t){on=Hb(on,t),an.forEach(a=>{a(on)})}function Vb({...t}){const a=zb(),o=c=>Ro({type:"UPDATE_TOAST",toast:{...c,id:a}}),r=()=>Ro({type:"DISMISS_TOAST",toastId:a});return Ro({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:c=>{c||r()}}}),{id:a,dismiss:r,update:o}}function Mx(){const[t,a]=d.useState(on);return d.useEffect(()=>(an.push(a),()=>{const o=an.indexOf(a);o>-1&&an.splice(o,1)}),[t]),{...t,toast:Vb,dismiss:o=>Ro({type:"DISMISS_TOAST",toastId:o})}}var mx="ToastProvider",[vx,Rb,Db]=uw("Toast"),[Rw]=Ug("Toast",[Db]),[Tb,Gg]=Rw(mx),Dw=t=>{const{__scopeToast:a,label:o="Notification",duration:r=5e3,swipeDirection:c="right",swipeThreshold:i=50,children:l}=t,[h,y]=d.useState(null),[p,M]=d.useState(0),k=d.useRef(!1),u=d.useRef(!1);return o.trim()||console.error(`Invalid prop \`label\` supplied to \`${mx}\`. Expected non-empty \`string\`.`),n.jsx(vx.Provider,{scope:a,children:n.jsx(Tb,{scope:a,label:o,duration:r,swipeDirection:c,swipeThreshold:i,toastCount:p,viewport:h,onViewportChange:y,onToastAdd:d.useCallback(()=>M(s=>s+1),[]),onToastRemove:d.useCallback(()=>M(s=>s-1),[]),isFocusedToastEscapeKeyDownRef:k,isClosePausedRef:u,children:l})})};Dw.displayName=mx;var Tw="ToastViewport",Fb=["F8"],ix="toast.viewportPause",dx="toast.viewportResume",Fw=d.forwardRef((t,a)=>{const{__scopeToast:o,hotkey:r=Fb,label:c="Notifications ({hotkey})",...i}=t,l=Gg(Tw,o),h=Rb(o),y=d.useRef(null),p=d.useRef(null),M=d.useRef(null),k=d.useRef(null),u=$e(a,k,l.onViewportChange),s=r.join("+").replace(/Key/g,"").replace(/Digit/g,""),w=l.toastCount>0;d.useEffect(()=>{const v=C=>{var A;r.length!==0&&r.every(z=>C[z]||C.code===z)&&((A=k.current)==null||A.focus())};return document.addEventListener("keydown",v),()=>document.removeEventListener("keydown",v)},[r]),d.useEffect(()=>{const v=y.current,C=k.current;if(w&&v&&C){const b=()=>{if(!l.isClosePausedRef.current){const V=new CustomEvent(ix);C.dispatchEvent(V),l.isClosePausedRef.current=!0}},A=()=>{if(l.isClosePausedRef.current){const V=new CustomEvent(dx);C.dispatchEvent(V),l.isClosePausedRef.current=!1}},z=V=>{!v.contains(V.relatedTarget)&&A()},T=()=>{v.contains(document.activeElement)||A()};return v.addEventListener("focusin",b),v.addEventListener("focusout",z),v.addEventListener("pointermove",b),v.addEventListener("pointerleave",T),window.addEventListener("blur",b),window.addEventListener("focus",A),()=>{v.removeEventListener("focusin",b),v.removeEventListener("focusout",z),v.removeEventListener("pointermove",b),v.removeEventListener("pointerleave",T),window.removeEventListener("blur",b),window.removeEventListener("focus",A)}}},[w,l.isClosePausedRef]);const m=d.useCallback(({tabbingDirection:v})=>{const b=h().map(A=>{const z=A.ref.current,T=[z,...Qb(z)];return v==="forwards"?T:T.reverse()});return(v==="forwards"?b.reverse():b).flat()},[h]);return d.useEffect(()=>{const v=k.current;if(v){const C=b=>{var T,V,G;const A=b.altKey||b.ctrlKey||b.metaKey;if(b.key==="Tab"&&!A){const R=document.activeElement,I=b.shiftKey;if(b.target===v&&I){(T=p.current)==null||T.focus();return}const j=m({tabbingDirection:I?"backwards":"forwards"}),ye=j.findIndex(H=>H===R);ox(j.slice(ye+1))?b.preventDefault():I?(V=p.current)==null||V.focus():(G=M.current)==null||G.focus()}};return v.addEventListener("keydown",C),()=>v.removeEventListener("keydown",C)}},[h,m]),n.jsxs(VC,{ref:y,role:"region","aria-label":c.replace("{hotkey}",s),tabIndex:-1,style:{pointerEvents:w?void 0:"none"},children:[w&&n.jsx(sx,{ref:p,onFocusFromOutsideViewport:()=>{const v=m({tabbingDirection:"forwards"});ox(v)}}),n.jsx(vx.Slot,{scope:o,children:n.jsx(fe.ol,{tabIndex:-1,...i,ref:u})}),w&&n.jsx(sx,{ref:M,onFocusFromOutsideViewport:()=>{const v=m({tabbingDirection:"backwards"});ox(v)}})]})});Fw.displayName=Tw;var Bw="ToastFocusProxy",sx=d.forwardRef((t,a)=>{const{__scopeToast:o,onFocusFromOutsideViewport:r,...c}=t,i=Gg(Bw,o);return n.jsx(kw,{"aria-hidden":!0,tabIndex:0,...c,ref:a,style:{position:"fixed"},onFocus:l=>{var p;const h=l.relatedTarget;!((p=i.viewport)!=null&&p.contains(h))&&r()}})});sx.displayName=Bw;var Gr="Toast",Bb="toast.swipeStart",Eb="toast.swipeMove",Ob="toast.swipeCancel",Ub="toast.swipeEnd",Ew=d.forwardRef((t,a)=>{const{forceMount:o,open:r,defaultOpen:c,onOpenChange:i,...l}=t,[h,y]=px({prop:r,defaultProp:c??!0,onChange:i,caller:Gr});return n.jsx(qo,{present:o||h,children:n.jsx(Gb,{open:h,...l,ref:a,onClose:()=>y(!1),onPause:So(t.onPause),onResume:So(t.onResume),onSwipeStart:_(t.onSwipeStart,p=>{p.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:_(t.onSwipeMove,p=>{const{x:M,y:k}=p.detail.delta;p.currentTarget.setAttribute("data-swipe","move"),p.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${M}px`),p.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${k}px`)}),onSwipeCancel:_(t.onSwipeCancel,p=>{p.currentTarget.setAttribute("data-swipe","cancel"),p.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),p.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),p.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),p.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:_(t.onSwipeEnd,p=>{const{x:M,y:k}=p.detail.delta;p.currentTarget.setAttribute("data-swipe","end"),p.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),p.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),p.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${M}px`),p.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${k}px`),y(!1)})})})});Ew.displayName=Gr;var[Nb,_b]=Rw(Gr,{onClose(){}}),Gb=d.forwardRef((t,a)=>{const{__scopeToast:o,type:r="foreground",duration:c,open:i,onClose:l,onEscapeKeyDown:h,onPause:y,onResume:p,onSwipeStart:M,onSwipeMove:k,onSwipeCancel:u,onSwipeEnd:s,...w}=t,m=Gg(Gr,o),[v,C]=d.useState(null),b=$e(a,H=>C(H)),A=d.useRef(null),z=d.useRef(null),T=c||m.duration,V=d.useRef(0),G=d.useRef(T),R=d.useRef(0),{onToastAdd:I,onToastRemove:D}=m,F=So(()=>{var ne;(v==null?void 0:v.contains(document.activeElement))&&((ne=m.viewport)==null||ne.focus()),l()}),j=d.useCallback(H=>{!H||H===1/0||(window.clearTimeout(R.current),V.current=new Date().getTime(),R.current=window.setTimeout(F,H))},[F]);d.useEffect(()=>{const H=m.viewport;if(H){const ne=()=>{j(G.current),p==null||p()},J=()=>{const de=new Date().getTime()-V.current;G.current=G.current-de,window.clearTimeout(R.current),y==null||y()};return H.addEventListener(ix,J),H.addEventListener(dx,ne),()=>{H.removeEventListener(ix,J),H.removeEventListener(dx,ne)}}},[m.viewport,T,y,p,j]),d.useEffect(()=>{i&&!m.isClosePausedRef.current&&j(T)},[i,T,m.isClosePausedRef,j]),d.useEffect(()=>(I(),()=>D()),[I,D]);const ye=d.useMemo(()=>v?Ww(v):null,[v]);return m.viewport?n.jsxs(n.Fragment,{children:[ye&&n.jsx(Zb,{__scopeToast:o,role:"status","aria-live":r==="foreground"?"assertive":"polite","aria-atomic":!0,children:ye}),n.jsx(Nb,{scope:o,onClose:F,children:ww.createPortal(n.jsx(vx.ItemSlot,{scope:o,children:n.jsx(RC,{asChild:!0,onEscapeKeyDown:_(h,()=>{m.isFocusedToastEscapeKeyDownRef.current||F(),m.isFocusedToastEscapeKeyDownRef.current=!1}),children:n.jsx(fe.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":i?"open":"closed","data-swipe-direction":m.swipeDirection,...w,ref:b,style:{userSelect:"none",touchAction:"none",...t.style},onKeyDown:_(t.onKeyDown,H=>{H.key==="Escape"&&(h==null||h(H.nativeEvent),H.nativeEvent.defaultPrevented||(m.isFocusedToastEscapeKeyDownRef.current=!0,F()))}),onPointerDown:_(t.onPointerDown,H=>{H.button===0&&(A.current={x:H.clientX,y:H.clientY})}),onPointerMove:_(t.onPointerMove,H=>{if(!A.current)return;const ne=H.clientX-A.current.x,J=H.clientY-A.current.y,de=!!z.current,oe=["left","right"].includes(m.swipeDirection),L=["left","up"].includes(m.swipeDirection)?Math.min:Math.max,X=oe?L(0,ne):0,te=oe?0:L(0,J),U=H.pointerType==="touch"?10:2,Z={x:X,y:te},$={originalEvent:H,delta:Z};de?(z.current=Z,Yr(Eb,k,$,{discrete:!1})):Wx(Z,m.swipeDirection,U)?(z.current=Z,Yr(Bb,M,$,{discrete:!1}),H.target.setPointerCapture(H.pointerId)):(Math.abs(ne)>U||Math.abs(J)>U)&&(A.current=null)}),onPointerUp:_(t.onPointerUp,H=>{const ne=z.current,J=H.target;if(J.hasPointerCapture(H.pointerId)&&J.releasePointerCapture(H.pointerId),z.current=null,A.current=null,ne){const de=H.currentTarget,oe={originalEvent:H,delta:ne};Wx(ne,m.swipeDirection,m.swipeThreshold)?Yr(Ub,s,oe,{discrete:!0}):Yr(Ob,u,oe,{discrete:!0}),de.addEventListener("click",L=>L.preventDefault(),{once:!0})}})})})}),m.viewport)})]}):null}),Zb=t=>{const{__scopeToast:a,children:o,...r}=t,c=Gg(Gr,a),[i,l]=d.useState(!1),[h,y]=d.useState(!1);return Kb(()=>l(!0)),d.useEffect(()=>{const p=window.setTimeout(()=>y(!0),1e3);return()=>window.clearTimeout(p)},[]),h?null:n.jsx(Mw,{asChild:!0,children:n.jsx(kw,{...r,children:i&&n.jsxs(n.Fragment,{children:[c.label," ",o]})})})},Wb="ToastTitle",Ow=d.forwardRef((t,a)=>{const{__scopeToast:o,...r}=t;return n.jsx(fe.div,{...r,ref:a})});Ow.displayName=Wb;var Xb="ToastDescription",Uw=d.forwardRef((t,a)=>{const{__scopeToast:o,...r}=t;return n.jsx(fe.div,{...r,ref:a})});Uw.displayName=Xb;var Nw="ToastAction",_w=d.forwardRef((t,a)=>{const{altText:o,...r}=t;return o.trim()?n.jsx(Zw,{altText:o,asChild:!0,children:n.jsx(fx,{...r,ref:a})}):(console.error(`Invalid prop \`altText\` supplied to \`${Nw}\`. Expected non-empty \`string\`.`),null)});_w.displayName=Nw;var Gw="ToastClose",fx=d.forwardRef((t,a)=>{const{__scopeToast:o,...r}=t,c=_b(Gw,o);return n.jsx(Zw,{asChild:!0,children:n.jsx(fe.button,{type:"button",...r,ref:a,onClick:_(t.onClick,c.onClose)})})});fx.displayName=Gw;var Zw=d.forwardRef((t,a)=>{const{__scopeToast:o,altText:r,...c}=t;return n.jsx(fe.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":r||void 0,...c,ref:a})});function Ww(t){const a=[];return Array.from(t.childNodes).forEach(r=>{if(r.nodeType===r.TEXT_NODE&&r.textContent&&a.push(r.textContent),$b(r)){const c=r.ariaHidden||r.hidden||r.style.display==="none",i=r.dataset.radixToastAnnounceExclude==="";if(!c)if(i){const l=r.dataset.radixToastAnnounceAlt;l&&a.push(l)}else a.push(...Ww(r))}}),a}function Yr(t,a,o,{discrete:r}){const c=o.originalEvent.currentTarget,i=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:o});a&&c.addEventListener(t,a,{once:!0}),r?mw(c,i):c.dispatchEvent(i)}var Wx=(t,a,o=0)=>{const r=Math.abs(t.x),c=Math.abs(t.y),i=r>c;return a==="left"||a==="right"?i&&r>o:!i&&c>o};function Kb(t=()=>{}){const a=So(t);DC(()=>{let o=0,r=0;return o=window.requestAnimationFrame(()=>r=window.requestAnimationFrame(a)),()=>{window.cancelAnimationFrame(o),window.cancelAnimationFrame(r)}},[a])}function $b(t){return t.nodeType===t.ELEMENT_NODE}function Qb(t){const a=[],o=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const c=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||c?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;o.nextNode();)a.push(o.currentNode);return a}function ox(t){const a=document.activeElement;return t.some(o=>o===a?!0:(o.focus(),document.activeElement!==a))}var Jb=Dw,Xw=Fw,Kw=Ew,$w=Ow,Qw=Uw,Jw=_w,Yw=fx;const Xx=t=>typeof t=="boolean"?`${t}`:t===0?"0":t,Kx=bw,Zg=(t,a)=>o=>{var r;if((a==null?void 0:a.variants)==null)return Kx(t,o==null?void 0:o.class,o==null?void 0:o.className);const{variants:c,defaultVariants:i}=a,l=Object.keys(c).map(p=>{const M=o==null?void 0:o[p],k=i==null?void 0:i[p];if(M===null)return null;const u=Xx(M)||Xx(k);return c[p][u]}),h=o&&Object.entries(o).reduce((p,M)=>{let[k,u]=M;return u===void 0||(p[k]=u),p},{}),y=a==null||(r=a.compoundVariants)===null||r===void 0?void 0:r.reduce((p,M)=>{let{class:k,className:u,...s}=M;return Object.entries(s).every(w=>{let[m,v]=w;return Array.isArray(v)?v.includes({...i,...h}[m]):{...i,...h}[m]===v})?[...p,k,u]:p},[]);return Kx(t,l,y,o==null?void 0:o.class,o==null?void 0:o.className)};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yb=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),eL=(...t)=>t.filter((a,o,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===o).join(" ").trim();/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var eI={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tL=d.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:c="",children:i,iconNode:l,...h},y)=>d.createElement("svg",{ref:y,...eI,width:a,height:a,stroke:t,strokeWidth:r?Number(o)*24/Number(a):o,className:eL("lucide",c),...h},[...l.map(([p,M])=>d.createElement(p,M)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e=(t,a)=>{const o=d.forwardRef(({className:r,...c},i)=>d.createElement(tL,{ref:i,iconNode:a,className:eL(`lucide-${Yb(t)}`,r),...c}));return o.displayName=`${t}`,o};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=e("AArrowDown",[["path",{d:"M3.5 13h6",key:"p1my2r"}],["path",{d:"m2 16 4.5-9 4.5 9",key:"ndf0b3"}],["path",{d:"M18 7v9",key:"pknjwm"}],["path",{d:"m14 12 4 4 4-4",key:"buelq4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn=e("AArrowUp",[["path",{d:"M3.5 13h6",key:"p1my2r"}],["path",{d:"m2 16 4.5-9 4.5 9",key:"ndf0b3"}],["path",{d:"M18 16V7",key:"ty0viw"}],["path",{d:"m14 11 4-4 4 4",key:"1pu57t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=e("ALargeSmall",[["path",{d:"M21 14h-5",key:"1vh23k"}],["path",{d:"M16 16v-3.5a2.5 2.5 0 0 1 5 0V16",key:"1wh10o"}],["path",{d:"M4.5 13h6",key:"dfilno"}],["path",{d:"m3 16 4.5-9 4.5 9",key:"2dxa0e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=e("Accessibility",[["circle",{cx:"16",cy:"4",r:"1",key:"1grugj"}],["path",{d:"m18 19 1-7-6 1",key:"r0i19z"}],["path",{d:"m5 8 3-3 5.5 3-2.36 3.5",key:"9ptxx2"}],["path",{d:"M4.24 14.5a5 5 0 0 0 6.88 6",key:"10kmtu"}],["path",{d:"M13.76 17.5a5 5 0 0 0-6.88-6",key:"2qq6rc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=e("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn=e("AirVent",[["path",{d:"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"larmp2"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12",key:"1bo8pg"}],["path",{d:"M6.6 15.6A2 2 0 1 0 10 17v-5",key:"t9h90c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln=e("Airplay",[["path",{d:"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",key:"ns4c3b"}],["path",{d:"m12 15 5 6H7Z",key:"14qnn2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g1=e("AlarmClockCheck",[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}],["path",{d:"m9 13 2 2 4-4",key:"6343dt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x1=e("AlarmClockMinus",[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}],["path",{d:"M9 13h6",key:"1uhe8q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=e("AlarmClockOff",[["path",{d:"M6.87 6.87a8 8 0 1 0 11.26 11.26",key:"3on8tj"}],["path",{d:"M19.9 14.25a8 8 0 0 0-9.15-9.15",key:"15ghsc"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.26 18.67 4 21",key:"yzmioq"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M4 4 2 6",key:"1ycko6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w1=e("AlarmClockPlus",[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}],["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pn=e("AlarmClock",[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M12 9v4l2 2",key:"1c63tq"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=e("AlarmSmoke",[["path",{d:"M11 21c0-2.5 2-2.5 2-5",key:"1sicvv"}],["path",{d:"M16 21c0-2.5 2-2.5 2-5",key:"1o3eny"}],["path",{d:"m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8",key:"1bvca4"}],["path",{d:"M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z",key:"x3qr1j"}],["path",{d:"M6 21c0-2.5 2-2.5 2-5",key:"i3w1gp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=e("Album",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["polyline",{points:"11 3 11 11 14 8 17 11 17 3",key:"1wcwz3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mn=e("AlignCenterHorizontal",[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4",key:"11f1s0"}],["path",{d:"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4",key:"t14dx9"}],["path",{d:"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1",key:"1w07xs"}],["path",{d:"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1",key:"1apec2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=e("AlignCenterVertical",[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4",key:"14d6g8"}],["path",{d:"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4",key:"1e2lrw"}],["path",{d:"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1",key:"1fkdwx"}],["path",{d:"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1",key:"1euafb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vn=e("AlignCenter",[["path",{d:"M17 12H7",key:"16if0g"}],["path",{d:"M19 18H5",key:"18s9l3"}],["path",{d:"M21 6H3",key:"1jwq7v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn=e("AlignEndHorizontal",[["rect",{width:"6",height:"16",x:"4",y:"2",rx:"2",key:"z5wdxg"}],["rect",{width:"6",height:"9",x:"14",y:"9",rx:"2",key:"um7a8w"}],["path",{d:"M22 22H2",key:"19qnx5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gn=e("AlignEndVertical",[["rect",{width:"16",height:"6",x:"2",y:"4",rx:"2",key:"10wcwx"}],["rect",{width:"9",height:"6",x:"9",y:"14",rx:"2",key:"4p5bwg"}],["path",{d:"M22 22V2",key:"12ipfv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=e("AlignHorizontalDistributeCenter",[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2",key:"1wwnby"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2",key:"1fe6j6"}],["path",{d:"M17 22v-5",key:"4b6g73"}],["path",{d:"M17 7V2",key:"hnrr36"}],["path",{d:"M7 22v-3",key:"1r4jpn"}],["path",{d:"M7 5V2",key:"liy1u9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wn=e("AlignHorizontalDistributeEnd",[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2",key:"1wwnby"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2",key:"1fe6j6"}],["path",{d:"M10 2v20",key:"uyc634"}],["path",{d:"M20 2v20",key:"1tx262"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ln=e("AlignHorizontalDistributeStart",[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2",key:"1wwnby"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2",key:"1fe6j6"}],["path",{d:"M4 2v20",key:"gtpd5x"}],["path",{d:"M14 2v20",key:"tg6bpw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=e("AlignHorizontalJustifyCenter",[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2",key:"dy24zr"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2",key:"13zkjt"}],["path",{d:"M12 2v20",key:"t6zp3m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bn=e("AlignHorizontalJustifyEnd",[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2",key:"dy24zr"}],["rect",{width:"6",height:"10",x:"12",y:"7",rx:"2",key:"1ht384"}],["path",{d:"M22 2v20",key:"40qfg1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const In=e("AlignHorizontalJustifyStart",[["rect",{width:"6",height:"14",x:"6",y:"5",rx:"2",key:"hsirpf"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2",key:"13zkjt"}],["path",{d:"M2 2v20",key:"1ivd8o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=e("AlignHorizontalSpaceAround",[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2",key:"yn7j0q"}],["path",{d:"M4 22V2",key:"tsjzd3"}],["path",{d:"M20 22V2",key:"1bnhr8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qn=e("AlignHorizontalSpaceBetween",[["rect",{width:"6",height:"14",x:"3",y:"5",rx:"2",key:"j77dae"}],["rect",{width:"6",height:"10",x:"15",y:"7",rx:"2",key:"bq30hj"}],["path",{d:"M3 2v20",key:"1d2pfg"}],["path",{d:"M21 2v20",key:"p059bm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const An=e("AlignJustify",[["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 18h18",key:"1h113x"}],["path",{d:"M3 6h18",key:"d0wm0j"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jn=e("AlignLeft",[["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 18H3",key:"1amg6g"}],["path",{d:"M21 6H3",key:"1jwq7v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pn=e("AlignRight",[["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M21 18H7",key:"1ygte8"}],["path",{d:"M21 6H3",key:"1jwq7v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zn=e("AlignStartHorizontal",[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2",key:"1n4dg1"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2",key:"17khns"}],["path",{d:"M22 2H2",key:"fhrpnj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hn=e("AlignStartVertical",[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2",key:"lpm2y7"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2",key:"rdj6ps"}],["path",{d:"M2 2v20",key:"1ivd8o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vn=e("AlignVerticalDistributeCenter",[["path",{d:"M22 17h-3",key:"1lwga1"}],["path",{d:"M22 7h-5",key:"o2endc"}],["path",{d:"M5 17H2",key:"1gx9xc"}],["path",{d:"M7 7H2",key:"6bq26l"}],["rect",{x:"5",y:"14",width:"14",height:"6",rx:"2",key:"1qrzuf"}],["rect",{x:"7",y:"4",width:"10",height:"6",rx:"2",key:"we8e9z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rn=e("AlignVerticalDistributeEnd",[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2",key:"jmoj9s"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2",key:"aza5on"}],["path",{d:"M2 20h20",key:"owomy5"}],["path",{d:"M2 10h20",key:"1ir3d8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dn=e("AlignVerticalDistributeStart",[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2",key:"jmoj9s"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2",key:"aza5on"}],["path",{d:"M2 14h20",key:"myj16y"}],["path",{d:"M2 4h20",key:"mda7wb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tn=e("AlignVerticalJustifyCenter",[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2",key:"1i8z2d"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2",key:"ypihtt"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fn=e("AlignVerticalJustifyEnd",[["rect",{width:"14",height:"6",x:"5",y:"12",rx:"2",key:"4l4tp2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2",key:"ypihtt"}],["path",{d:"M2 22h20",key:"272qi7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bn=e("AlignVerticalJustifyStart",[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2",key:"1i8z2d"}],["rect",{width:"10",height:"6",x:"7",y:"6",rx:"2",key:"13squh"}],["path",{d:"M2 2h20",key:"1ennik"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const En=e("AlignVerticalSpaceAround",[["rect",{width:"10",height:"6",x:"7",y:"9",rx:"2",key:"b1zbii"}],["path",{d:"M22 20H2",key:"1p1f7z"}],["path",{d:"M22 4H2",key:"1b7qnq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const On=e("AlignVerticalSpaceBetween",[["rect",{width:"14",height:"6",x:"5",y:"15",rx:"2",key:"1w91an"}],["rect",{width:"10",height:"6",x:"7",y:"3",rx:"2",key:"17wqzy"}],["path",{d:"M2 21h20",key:"1nyx9w"}],["path",{d:"M2 3h20",key:"91anmk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Un=e("Ambulance",[["path",{d:"M10 10H6",key:"1bsnug"}],["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",key:"lrkjwd"}],["path",{d:"M8 8v4",key:"1fwk8c"}],["path",{d:"M9 18h6",key:"x1upvd"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=e("Ampersand",[["path",{d:"M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",key:"1o9ehi"}],["path",{d:"M16 12h3",key:"4uvgyw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n=e("Ampersands",[["path",{d:"M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",key:"12lh1k"}],["path",{d:"M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",key:"173c68"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gn=e("Amphora",[["path",{d:"M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8",key:"1h8rid"}],["path",{d:"M10 5H8a2 2 0 0 0 0 4h.68",key:"3ezsi6"}],["path",{d:"M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8",key:"yt6q09"}],["path",{d:"M14 5h2a2 2 0 0 1 0 4h-.68",key:"8f95yk"}],["path",{d:"M18 22H6",key:"mg6kv4"}],["path",{d:"M9 2h6",key:"1jrp98"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zn=e("Anchor",[["path",{d:"M12 22V8",key:"qkxhtm"}],["path",{d:"M5 12H2a10 10 0 0 0 20 0h-3",key:"1hv3nh"}],["circle",{cx:"12",cy:"5",r:"3",key:"rqqgnr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wn=e("Angry",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2",key:"epbg0q"}],["path",{d:"M7.5 8 10 9",key:"olxxln"}],["path",{d:"m14 9 2.5-1",key:"1j6cij"}],["path",{d:"M9 10h.01",key:"qbtxuw"}],["path",{d:"M15 10h.01",key:"1qmjsl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xn=e("Annoyed",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 15h8",key:"45n4r"}],["path",{d:"M8 9h2",key:"1g203m"}],["path",{d:"M14 9h2",key:"116p9w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kn=e("Antenna",[["path",{d:"M2 12 7 2",key:"117k30"}],["path",{d:"m7 12 5-10",key:"1tvx22"}],["path",{d:"m12 12 5-10",key:"ev1o1a"}],["path",{d:"m17 12 5-10",key:"1e4ti3"}],["path",{d:"M4.5 7h15",key:"vlsxkz"}],["path",{d:"M12 16v6",key:"c8a4gj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $n=e("Anvil",[["path",{d:"M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4",key:"1hjpb6"}],["path",{d:"M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z",key:"1qn45f"}],["path",{d:"M9 12v5",key:"3anwtq"}],["path",{d:"M15 12v5",key:"5xh3zn"}],["path",{d:"M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1",key:"1fi4x8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qn=e("Aperture",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jn=e("AppWindowMac",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M14 8h.01",key:"1primd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yn=e("AppWindow",[["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}],["path",{d:"M10 4v4",key:"pp8u80"}],["path",{d:"M2 8h20",key:"d11cs7"}],["path",{d:"M6 4v4",key:"1svtjw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=e("Apple",[["path",{d:"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z",key:"3s7exb"}],["path",{d:"M10 2c1 .5 2 2 2 5",key:"fcco2y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=e("ArchiveRestore",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h2",key:"tvwodi"}],["path",{d:"M20 8v11a2 2 0 0 1-2 2h-2",key:"1gkqxj"}],["path",{d:"m9 15 3-3 3 3",key:"1pd0qc"}],["path",{d:"M12 12v9",key:"192myk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=e("ArchiveX",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"m9.5 17 5-5",key:"nakeu6"}],["path",{d:"m9.5 12 5 5",key:"1hccrj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=e("Archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=e("Armchair",[["path",{d:"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3",key:"irtipd"}],["path",{d:"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",key:"1qyhux"}],["path",{d:"M5 18v2",key:"ppbyun"}],["path",{d:"M19 18v2",key:"gy7782"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=e("ArrowBigDownDash",[["path",{d:"M15 5H9",key:"1tp3ed"}],["path",{d:"M15 9v3h4l-7 7-7-7h4V9z",key:"ncdc4b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=e("ArrowBigDown",[["path",{d:"M15 6v6h4l-7 7-7-7h4V6h6z",key:"1thax2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=e("ArrowBigLeftDash",[["path",{d:"M19 15V9",key:"1hci5f"}],["path",{d:"M15 15h-3v4l-7-7 7-7v4h3v6z",key:"16tjna"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=e("ArrowBigLeft",[["path",{d:"M18 15h-6v4l-7-7 7-7v4h6v6z",key:"lbrdak"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=e("ArrowBigRightDash",[["path",{d:"M5 9v6",key:"158jrl"}],["path",{d:"M9 9h3V5l7 7-7 7v-4H9V9z",key:"1sg2xn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=e("ArrowBigRight",[["path",{d:"M6 9h6V5l7 7-7 7v-4H6V9z",key:"7fvt9c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0=e("ArrowBigUpDash",[["path",{d:"M9 19h6",key:"456am0"}],["path",{d:"M9 15v-3H5l7-7 7 7h-4v3H9z",key:"1r2uve"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=e("ArrowBigUp",[["path",{d:"M9 18v-6H5l7-7 7 7h-4v6H9z",key:"1x06kx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0=e("ArrowDown01",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2",key:"1bwicg"}],["path",{d:"M17 20v-6h-2",key:"1qp1so"}],["path",{d:"M15 20h4",key:"1j968p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=e("ArrowDown10",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"M17 10V4h-2",key:"zcsr5x"}],["path",{d:"M15 10h4",key:"id2lce"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2",key:"33xykx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L1=e("ArrowDownAZ",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"M20 8h-5",key:"1vsyxs"}],["path",{d:"M15 10V6.5a2.5 2.5 0 0 1 5 0V10",key:"ag13bf"}],["path",{d:"M15 14h5l-5 6h5",key:"ur5jdg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=e("ArrowDownFromLine",[["path",{d:"M19 3H5",key:"1236rx"}],["path",{d:"M12 21V7",key:"gj6g52"}],["path",{d:"m6 15 6 6 6-6",key:"h15q88"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k0=e("ArrowDownLeft",[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M0=e("ArrowDownNarrowWide",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"M11 4h4",key:"6d7r33"}],["path",{d:"M11 8h7",key:"djye34"}],["path",{d:"M11 12h10",key:"1438ji"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m0=e("ArrowDownRight",[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=e("ArrowDownToDot",[["path",{d:"M12 2v14",key:"jyx4ut"}],["path",{d:"m19 9-7 7-7-7",key:"1oe3oy"}],["circle",{cx:"12",cy:"21",r:"1",key:"o0uj5v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=e("ArrowDownToLine",[["path",{d:"M12 17V3",key:"1cwfxf"}],["path",{d:"m6 11 6 6 6-6",key:"12ii2o"}],["path",{d:"M19 21H5",key:"150jfl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=e("ArrowDownUp",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"m21 8-4-4-4 4",key:"1c9v7m"}],["path",{d:"M17 4v16",key:"7dpous"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C1=e("ArrowDownWideNarrow",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"M11 4h10",key:"1w87gc"}],["path",{d:"M11 8h7",key:"djye34"}],["path",{d:"M11 12h4",key:"q8tih4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b1=e("ArrowDownZA",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 4v16",key:"1glfcx"}],["path",{d:"M15 4h5l-5 6h5",key:"8asdl1"}],["path",{d:"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20",key:"r6l5cz"}],["path",{d:"M20 18h-5",key:"18j1r2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=e("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w0=e("ArrowLeftFromLine",[["path",{d:"m9 6-6 6 6 6",key:"7v63n9"}],["path",{d:"M3 12h14",key:"13k4hi"}],["path",{d:"M21 19V5",key:"b4bplr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L0=e("ArrowLeftRight",[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C0=e("ArrowLeftToLine",[["path",{d:"M3 19V5",key:"rwsyhb"}],["path",{d:"m13 6-6 6 6 6",key:"1yhaz7"}],["path",{d:"M7 12h14",key:"uoisry"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0=e("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I0=e("ArrowRightFromLine",[["path",{d:"M3 5v14",key:"1nt18q"}],["path",{d:"M21 12H7",key:"13ipq5"}],["path",{d:"m15 18 6-6-6-6",key:"6tx3qv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S0=e("ArrowRightLeft",[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q0=e("ArrowRightToLine",[["path",{d:"M17 12H3",key:"8awo09"}],["path",{d:"m11 18 6-6-6-6",key:"8c2y43"}],["path",{d:"M21 5v14",key:"nzette"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A0=e("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j0=e("ArrowUp01",[["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2",key:"1bwicg"}],["path",{d:"M17 20v-6h-2",key:"1qp1so"}],["path",{d:"M15 20h4",key:"1j968p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P0=e("ArrowUp10",[["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}],["path",{d:"M17 10V4h-2",key:"zcsr5x"}],["path",{d:"M15 10h4",key:"id2lce"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2",key:"33xykx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I1=e("ArrowUpAZ",[["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}],["path",{d:"M20 8h-5",key:"1vsyxs"}],["path",{d:"M15 10V6.5a2.5 2.5 0 0 1 5 0V10",key:"ag13bf"}],["path",{d:"M15 14h5l-5 6h5",key:"ur5jdg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z0=e("ArrowUpDown",[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H0=e("ArrowUpFromDot",[["path",{d:"m5 9 7-7 7 7",key:"1hw5ic"}],["path",{d:"M12 16V2",key:"ywoabb"}],["circle",{cx:"12",cy:"21",r:"1",key:"o0uj5v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V0=e("ArrowUpFromLine",[["path",{d:"m18 9-6-6-6 6",key:"kcunyi"}],["path",{d:"M12 3v14",key:"7cf3v8"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R0=e("ArrowUpLeft",[["path",{d:"M7 17V7h10",key:"11bw93"}],["path",{d:"M17 17 7 7",key:"2786uv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S1=e("ArrowUpNarrowWide",[["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}],["path",{d:"M11 12h4",key:"q8tih4"}],["path",{d:"M11 16h7",key:"uosisv"}],["path",{d:"M11 20h10",key:"jvxblo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D0=e("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0=e("ArrowUpToLine",[["path",{d:"M5 3h14",key:"7usisc"}],["path",{d:"m18 13-6-6-6 6",key:"1kf1n9"}],["path",{d:"M12 7v14",key:"1akyts"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F0=e("ArrowUpWideNarrow",[["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}],["path",{d:"M11 12h10",key:"1438ji"}],["path",{d:"M11 16h7",key:"uosisv"}],["path",{d:"M11 20h4",key:"1krc32"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q1=e("ArrowUpZA",[["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}],["path",{d:"M15 4h5l-5 6h5",key:"8asdl1"}],["path",{d:"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20",key:"r6l5cz"}],["path",{d:"M20 18h-5",key:"18j1r2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B0=e("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E0=e("ArrowsUpFromLine",[["path",{d:"m4 6 3-3 3 3",key:"9aidw8"}],["path",{d:"M7 17V3",key:"19qxw1"}],["path",{d:"m14 6 3-3 3 3",key:"6iy689"}],["path",{d:"M17 17V3",key:"o0fmgi"}],["path",{d:"M4 21h16",key:"1h09gz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O0=e("Asterisk",[["path",{d:"M12 6v12",key:"1vza4d"}],["path",{d:"M17.196 9 6.804 15",key:"1ah31z"}],["path",{d:"m6.804 9 10.392 6",key:"1b6pxd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=e("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U0=e("Atom",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",key:"1l2ple"}],["path",{d:"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",key:"1wam0m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N0=e("AudioLines",[["path",{d:"M2 10v3",key:"1fnikh"}],["path",{d:"M6 6v11",key:"11sgs0"}],["path",{d:"M10 3v18",key:"yhl04a"}],["path",{d:"M14 8v7",key:"3a1oy3"}],["path",{d:"M18 5v13",key:"123xd1"}],["path",{d:"M22 10v3",key:"154ddg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _0=e("AudioWaveform",[["path",{d:"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",key:"57tc96"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G0=e("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z0=e("Axe",[["path",{d:"m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9",key:"csbz4o"}],["path",{d:"M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z",key:"113wfo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A1=e("Axis3d",[["path",{d:"M4 4v16h16",key:"1s015l"}],["path",{d:"m4 20 7-7",key:"17qe9y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W0=e("Baby",[["path",{d:"M9 12h.01",key:"157uk2"}],["path",{d:"M15 12h.01",key:"1k8ypt"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",key:"1u7htd"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",key:"5yv0yz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X0=e("Backpack",[["path",{d:"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",key:"1ol0lm"}],["path",{d:"M8 10h8",key:"c7uz4u"}],["path",{d:"M8 18h8",key:"1no2b1"}],["path",{d:"M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6",key:"1fr6do"}],["path",{d:"M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",key:"donm21"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K0=e("BadgeAlert",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $0=e("BadgeCent",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M12 7v10",key:"jspqdw"}],["path",{d:"M15.4 10a4 4 0 1 0 0 4",key:"2eqtx8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j1=e("BadgeCheck",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q0=e("BadgeDollarSign",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 18V6",key:"zqpxq5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J0=e("BadgeEuro",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M7 12h5",key:"gblrwe"}],["path",{d:"M15 9.4a4 4 0 1 0 0 5.2",key:"1makmb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y0=e("BadgeHelp",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["line",{x1:"12",x2:"12.01",y1:"17",y2:"17",key:"io3f8k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ec=e("BadgeIndianRupee",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M8 8h8",key:"1bis0t"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m13 17-5-1h1a4 4 0 0 0 0-8",key:"nu2bwa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tc=e("BadgeInfo",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["line",{x1:"12",x2:"12",y1:"16",y2:"12",key:"1y1yb1"}],["line",{x1:"12",x2:"12.01",y1:"8",y2:"8",key:"110wyk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ac=e("BadgeJapaneseYen",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 8 3 3v7",key:"17yadx"}],["path",{d:"m12 11 3-3",key:"p4cfq1"}],["path",{d:"M9 12h6",key:"1c52cq"}],["path",{d:"M9 16h6",key:"8wimt3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oc=e("BadgeMinus",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rc=e("BadgePercent",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 15h.01",key:"lqbp3k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nc=e("BadgePlus",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["line",{x1:"12",x2:"12",y1:"8",y2:"16",key:"10p56q"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cc=e("BadgePoundSterling",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M8 12h4",key:"qz6y1c"}],["path",{d:"M10 16V9.5a2.5 2.5 0 0 1 5 0",key:"3mlbjk"}],["path",{d:"M8 16h7",key:"sbedsn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ic=e("BadgeRussianRuble",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M9 16h5",key:"1syiyw"}],["path",{d:"M9 12h5a2 2 0 1 0 0-4h-3v9",key:"1ge9c1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dc=e("BadgeSwissFranc",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M11 17V8h4",key:"1bfq6y"}],["path",{d:"M11 12h3",key:"2eqnfz"}],["path",{d:"M9 16h4",key:"1skf3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sc=e("BadgeX",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15",key:"f7djnv"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15",key:"1shsy8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hc=e("Badge",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lc=e("BaggageClaim",[["path",{d:"M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2",key:"4irg2o"}],["path",{d:"M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10",key:"14fcyx"}],["rect",{width:"13",height:"8",x:"8",y:"6",rx:"1",key:"o6oiis"}],["circle",{cx:"18",cy:"20",r:"2",key:"t9985n"}],["circle",{cx:"9",cy:"20",r:"2",key:"e5v82j"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=e("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pc=e("Banana",[["path",{d:"M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5",key:"1cscit"}],["path",{d:"M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",key:"1y1nbv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=e("Bandage",[["path",{d:"M10 10.01h.01",key:"1e9xi7"}],["path",{d:"M10 14.01h.01",key:"ac23bv"}],["path",{d:"M14 10.01h.01",key:"2wfrvf"}],["path",{d:"M14 14.01h.01",key:"8tw8yn"}],["path",{d:"M18 6v11.5",key:"dkbidh"}],["path",{d:"M6 6v12",key:"vkc79e"}],["rect",{x:"2",y:"6",width:"20",height:"12",rx:"2",key:"1wpnh2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kc=e("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mc=e("Barcode",[["path",{d:"M3 5v14",key:"1nt18q"}],["path",{d:"M8 5v14",key:"1ybrkv"}],["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"M17 5v14",key:"ycjyhj"}],["path",{d:"M21 5v14",key:"nzette"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc=e("Baseline",[["path",{d:"M4 20h16",key:"14thso"}],["path",{d:"m6 16 6-12 6 12",key:"1b4byz"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=e("Bath",[["path",{d:"M10 4 8 6",key:"1rru8s"}],["path",{d:"M17 19v2",key:"ts1sot"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M7 19v2",key:"12npes"}],["path",{d:"M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",key:"14ym8i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fc=e("BatteryCharging",[["path",{d:"M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2",key:"1sdynx"}],["path",{d:"M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1",key:"1gkd3k"}],["path",{d:"m11 7-3 5h4l-3 5",key:"b4a64w"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13",key:"4dh1rd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gc=e("BatteryFull",[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2",key:"1w10f2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13",key:"4dh1rd"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13",key:"1wd6dw"}],["line",{x1:"10",x2:"10",y1:"11",y2:"13",key:"haxvl5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"13",key:"c6fn6x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xc=e("BatteryLow",[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2",key:"1w10f2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13",key:"4dh1rd"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13",key:"1wd6dw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=e("BatteryMedium",[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2",key:"1w10f2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13",key:"4dh1rd"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13",key:"1wd6dw"}],["line",{x1:"10",x2:"10",y1:"11",y2:"13",key:"haxvl5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lc=e("BatteryWarning",[["path",{d:"M10 17h.01",key:"nbq80n"}],["path",{d:"M10 7v6",key:"nne03l"}],["path",{d:"M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2",key:"1x5o8m"}],["path",{d:"M22 11v2",key:"1wo06k"}],["path",{d:"M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"1mdjgh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cc=e("Battery",[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2",key:"1w10f2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13",key:"4dh1rd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bc=e("Beaker",[["path",{d:"M4.5 3h15",key:"c7n0jr"}],["path",{d:"M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3",key:"m1uhx7"}],["path",{d:"M6 14h12",key:"4cwo0f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=e("BeanOff",[["path",{d:"M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1",key:"bq3udt"}],["path",{d:"M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66",key:"17ccse"}],["path",{d:"M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04",key:"18zqgq"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sc=e("Bean",[["path",{d:"M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z",key:"1tvzk7"}],["path",{d:"M5.341 10.62a4 4 0 1 0 5.279-5.28",key:"2cyri2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qc=e("BedDouble",[["path",{d:"M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8",key:"1k78r4"}],["path",{d:"M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4",key:"fb3tl2"}],["path",{d:"M12 4v6",key:"1dcgq2"}],["path",{d:"M2 18h20",key:"ajqnye"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ac=e("BedSingle",[["path",{d:"M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8",key:"1wm6mi"}],["path",{d:"M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4",key:"4k93s5"}],["path",{d:"M3 18h18",key:"1h113x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jc=e("Bed",[["path",{d:"M2 4v16",key:"vw9hq8"}],["path",{d:"M2 8h18a2 2 0 0 1 2 2v10",key:"1dgv2r"}],["path",{d:"M2 17h20",key:"18nfp3"}],["path",{d:"M6 8v9",key:"1yriud"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pc=e("Beef",[["circle",{cx:"12.5",cy:"8.5",r:"2.5",key:"9738u8"}],["path",{d:"M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z",key:"o0f6za"}],["path",{d:"m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",key:"k7p6i0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zc=e("BeerOff",[["path",{d:"M13 13v5",key:"igwfh0"}],["path",{d:"M17 11.47V8",key:"16yw0g"}],["path",{d:"M17 11h1a3 3 0 0 1 2.745 4.211",key:"1xbt65"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3",key:"c55o3e"}],["path",{d:"M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268",key:"1ydug7"}],["path",{d:"M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12",key:"q81o7q"}],["path",{d:"M9 14.6V18",key:"20ek98"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hc=e("Beer",[["path",{d:"M17 11h1a3 3 0 0 1 0 6h-1",key:"1yp76v"}],["path",{d:"M9 12v6",key:"1u1cab"}],["path",{d:"M13 12v6",key:"1sugkk"}],["path",{d:"M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z",key:"1510fo"}],["path",{d:"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",key:"19jb7n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vc=e("BellDot",[["path",{d:"M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3",key:"xcehk"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["circle",{cx:"18",cy:"8",r:"3",key:"1g0gzu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rc=e("BellElectric",[["path",{d:"M18.8 4A6.3 8.7 0 0 1 20 9",key:"xve1fh"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["circle",{cx:"9",cy:"9",r:"7",key:"p2h5vp"}],["rect",{width:"10",height:"6",x:"4",y:"16",rx:"2",key:"17f3te"}],["path",{d:"M14 19c3 0 4.6-1.6 4.6-1.6",key:"n7odp6"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dc=e("BellMinus",[["path",{d:"M18.4 12c.8 3.8 2.6 5 2.6 5H3s3-2 3-9c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2",key:"eck70s"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"M15 8h6",key:"8ybuxh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=e("BellOff",[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5",key:"o7mx20"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7",key:"16f1lm"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fc=e("BellPlus",[["path",{d:"M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7",key:"guizqy"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"M15 8h6",key:"8ybuxh"}],["path",{d:"M18 5v6",key:"g5ayrv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bc=e("BellRing",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"M4 2C2.8 3.7 2 5.7 2 8",key:"tap9e0"}],["path",{d:"M22 8c0-2.3-.8-4.3-2-6",key:"5bb3ad"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fo=e("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P1=e("BetweenHorizontalEnd",[["rect",{width:"13",height:"7",x:"3",y:"3",rx:"1",key:"11xb64"}],["path",{d:"m22 15-3-3 3-3",key:"26chmm"}],["rect",{width:"13",height:"7",x:"3",y:"14",rx:"1",key:"k6ky7n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z1=e("BetweenHorizontalStart",[["rect",{width:"13",height:"7",x:"8",y:"3",rx:"1",key:"pkso9a"}],["path",{d:"m2 9 3 3-3 3",key:"1agib5"}],["rect",{width:"13",height:"7",x:"8",y:"14",rx:"1",key:"1q5fc1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=e("BetweenVerticalEnd",[["rect",{width:"7",height:"13",x:"3",y:"3",rx:"1",key:"1fdu0f"}],["path",{d:"m9 22 3-3 3 3",key:"17z65a"}],["rect",{width:"7",height:"13",x:"14",y:"3",rx:"1",key:"1squn4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oc=e("BetweenVerticalStart",[["rect",{width:"7",height:"13",x:"3",y:"8",rx:"1",key:"1fjrkv"}],["path",{d:"m15 2-3 3-3-3",key:"1uh6eb"}],["rect",{width:"7",height:"13",x:"14",y:"8",rx:"1",key:"w3fjg8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uc=e("BicepsFlexed",[["path",{d:"M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1",key:"1pmlyh"}],["path",{d:"M15 14a5 5 0 0 0-7.584 2",key:"5rb254"}],["path",{d:"M9.964 6.825C8.019 7.977 9.5 13 8 15",key:"kbvsx9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nc=e("Bike",[["circle",{cx:"18.5",cy:"17.5",r:"3.5",key:"15x4ox"}],["circle",{cx:"5.5",cy:"17.5",r:"3.5",key:"1noe27"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["path",{d:"M12 17.5V14l-3-3 4-3 2 3h2",key:"1npguv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=e("Binary",[["rect",{x:"14",y:"14",width:"4",height:"6",rx:"2",key:"p02svl"}],["rect",{x:"6",y:"4",width:"4",height:"6",rx:"2",key:"xm4xkj"}],["path",{d:"M6 20h4",key:"1i6q5t"}],["path",{d:"M14 10h4",key:"ru81e7"}],["path",{d:"M6 14h2v6",key:"16z9wg"}],["path",{d:"M14 4h2v6",key:"1idq9u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gc=e("Binoculars",[["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3",key:"3apit1"}],["path",{d:"M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z",key:"rhpgnw"}],["path",{d:"M 22 16 L 2 16",key:"14lkq7"}],["path",{d:"M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z",key:"104b3k"}],["path",{d:"M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3",key:"14fczp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zc=e("Biohazard",[["circle",{cx:"12",cy:"11.9",r:"2",key:"e8h31w"}],["path",{d:"M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6",key:"17bolr"}],["path",{d:"m8.9 10.1 1.4.8",key:"15ezny"}],["path",{d:"M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5",key:"wtwa5u"}],["path",{d:"m15.1 10.1-1.4.8",key:"1r0b28"}],["path",{d:"M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2",key:"m7qszh"}],["path",{d:"M12 13.9v1.6",key:"zfyyim"}],["path",{d:"M13.5 5.4c-1-.2-2-.2-3 0",key:"1bi9q0"}],["path",{d:"M17 16.4c.7-.7 1.2-1.6 1.5-2.5",key:"1rhjqw"}],["path",{d:"M5.5 13.9c.3.9.8 1.8 1.5 2.5",key:"8gsud3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wc=e("Bird",[["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20",key:"oj1oa8"}],["path",{d:"m20 7 2 .5-2 .5",key:"12nv4d"}],["path",{d:"M10 18v3",key:"1yea0a"}],["path",{d:"M14 17.75V21",key:"1pymcb"}],["path",{d:"M7 18a6 6 0 0 0 3.84-10.61",key:"1npnn0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=e("Bitcoin",[["path",{d:"M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",key:"yr8idg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kc=e("Blend",[["circle",{cx:"9",cy:"9",r:"7",key:"p2h5vp"}],["circle",{cx:"15",cy:"15",r:"7",key:"19ennj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $c=e("Blinds",[["path",{d:"M3 3h18",key:"o7r712"}],["path",{d:"M20 7H8",key:"gd2fo2"}],["path",{d:"M20 11H8",key:"1ynp89"}],["path",{d:"M10 19h10",key:"19hjk5"}],["path",{d:"M8 15h12",key:"1yqzne"}],["path",{d:"M4 3v14",key:"fggqzn"}],["circle",{cx:"4",cy:"19",r:"2",key:"p3m9r0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qc=e("Blocks",[["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["path",{d:"M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3",key:"1fpvtg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=e("BluetoothConnected",[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17",key:"1q5490"}],["line",{x1:"18",x2:"21",y1:"12",y2:"12",key:"1rsjjs"}],["line",{x1:"3",x2:"6",y1:"12",y2:"12",key:"11yl8c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yc=e("BluetoothOff",[["path",{d:"m17 17-5 5V12l-5 5",key:"v5aci6"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M14.5 9.5 17 7l-5-5v4.5",key:"1kddfz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ei=e("BluetoothSearching",[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17",key:"1q5490"}],["path",{d:"M20.83 14.83a4 4 0 0 0 0-5.66",key:"k8tn1j"}],["path",{d:"M18 12h.01",key:"yjnet6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ti=e("Bluetooth",[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17",key:"1q5490"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ai=e("Bold",[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",key:"mg9rjx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oi=e("Bolt",[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ri=e("Bomb",[["circle",{cx:"11",cy:"13",r:"9",key:"hd149"}],["path",{d:"M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95",key:"jp4j1b"}],["path",{d:"m22 2-1.5 1.5",key:"ay92ug"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ni=e("Bone",[["path",{d:"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",key:"w610uw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ci=e("BookA",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m8 13 4-7 4 7",key:"4rari8"}],["path",{d:"M9.1 11h5.7",key:"1gkovt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ii=e("BookAudio",[["path",{d:"M12 6v7",key:"1f6ttz"}],["path",{d:"M16 8v3",key:"gejaml"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"M8 8v3",key:"1qzp49"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const di=e("BookCheck",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m9 9.5 2 2 4-4",key:"1dth82"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const si=e("BookCopy",[["path",{d:"M2 16V4a2 2 0 0 1 2-2h11",key:"spzkk5"}],["path",{d:"M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12",key:"1wz07i"}],["path",{d:"M5 14H4a2 2 0 1 0 0 4h1",key:"16gqf9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H1=e("BookDashed",[["path",{d:"M12 17h2",key:"13u4lk"}],["path",{d:"M12 22h2",key:"kn7ki6"}],["path",{d:"M12 2h2",key:"cvn524"}],["path",{d:"M18 22h1a1 1 0 0 0 1-1",key:"w6gbqz"}],["path",{d:"M18 2h1a1 1 0 0 1 1 1v1",key:"1vpra5"}],["path",{d:"M20 15v2h-2",key:"fph276"}],["path",{d:"M20 8v3",key:"deu0bs"}],["path",{d:"M4 11V9",key:"v3xsx8"}],["path",{d:"M4 19.5V15",key:"6gr39e"}],["path",{d:"M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8",key:"wywhs9"}],["path",{d:"M8 22H6.5a1 1 0 0 1 0-5H8",key:"1cu73q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hi=e("BookDown",[["path",{d:"M12 13V7",key:"h0r20n"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m9 10 3 3 3-3",key:"zt5b4y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const li=e("BookHeadphones",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"M8 12v-2a4 4 0 0 1 8 0v2",key:"1vsqkj"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yi=e("BookHeart",[["path",{d:"M16 8.2A2.22 2.22 0 0 0 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9A2.22 2.22 0 0 0 8 8.2c0 .6.3 1.2.7 1.6A226.652 226.652 0 0 0 12 13a404 404 0 0 0 3.3-3.1 2.413 2.413 0 0 0 .7-1.7",key:"1t75a8"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=e("BookImage",[["path",{d:"m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17",key:"q6ojf0"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["circle",{cx:"10",cy:"8",r:"2",key:"2qkj4p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ui=e("BookKey",[["path",{d:"m19 3 1 1",key:"ze14oc"}],["path",{d:"m20 2-4.5 4.5",key:"1sppr8"}],["path",{d:"M20 8v13a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"1ocbpn"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H14",key:"1gfsgw"}],["circle",{cx:"14",cy:"8",r:"2",key:"u49eql"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ki=e("BookLock",[["path",{d:"M18 6V4a2 2 0 1 0-4 0v2",key:"1aquzs"}],["path",{d:"M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"1rkj32"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10",key:"18wgow"}],["rect",{x:"12",y:"6",width:"8",height:"5",rx:"1",key:"73l30o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=e("BookMarked",[["path",{d:"M10 2v8l3-3 3 3V2",key:"sqw3rj"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mi=e("BookMinus",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"M9 10h6",key:"9gxzsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=e("BookOpenCheck",[["path",{d:"M12 21V7",key:"gj6g52"}],["path",{d:"m16 12 2 2 4-4",key:"mdajum"}],["path",{d:"M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",key:"8arnkb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fi=e("BookOpenText",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M16 12h2",key:"7q9ll5"}],["path",{d:"M16 8h2",key:"msurwy"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}],["path",{d:"M6 12h2",key:"32wvfc"}],["path",{d:"M6 8h2",key:"30oboj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gi=e("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xi=e("BookPlus",[["path",{d:"M12 7v6",key:"lw1j43"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"M9 10h6",key:"9gxzsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wi=e("BookText",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"M8 11h8",key:"vwpz6n"}],["path",{d:"M8 7h6",key:"1f0q6e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Li=e("BookType",[["path",{d:"M10 13h4",key:"ytezjc"}],["path",{d:"M12 6v7",key:"1f6ttz"}],["path",{d:"M16 8V6H8v2",key:"x8j6u4"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ci=e("BookUp2",[["path",{d:"M12 13V7",key:"h0r20n"}],["path",{d:"M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"161d7n"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2",key:"1lorq7"}],["path",{d:"m9 10 3-3 3 3",key:"11gsxs"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bi=e("BookUp",[["path",{d:"M12 13V7",key:"h0r20n"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m9 10 3-3 3 3",key:"11gsxs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ii=e("BookUser",[["path",{d:"M15 13a3 3 0 1 0-6 0",key:"10j68g"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Si=e("BookX",[["path",{d:"m14.5 7-5 5",key:"dy991v"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m9.5 7 5 5",key:"s45iea"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=e("Book",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qi=e("BookmarkCheck",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z",key:"169p4p"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ai=e("BookmarkMinus",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10",key:"1gty7f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ji=e("BookmarkPlus",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}],["line",{x1:"12",x2:"12",y1:"7",y2:"13",key:"1cppfj"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10",key:"1gty7f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=e("BookmarkX",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z",key:"169p4p"}],["path",{d:"m14.5 7.5-5 5",key:"3lb6iw"}],["path",{d:"m9.5 7.5 5 5",key:"ko136h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bo=e("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zi=e("BoomBox",[["path",{d:"M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4",key:"vvzvr1"}],["path",{d:"M8 8v1",key:"xcqmfk"}],["path",{d:"M12 8v1",key:"1rj8u4"}],["path",{d:"M16 8v1",key:"1q12zr"}],["rect",{width:"20",height:"12",x:"2",y:"9",rx:"2",key:"igpb89"}],["circle",{cx:"8",cy:"15",r:"2",key:"fa4a8s"}],["circle",{cx:"16",cy:"15",r:"2",key:"14c3ya"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hi=e("BotMessageSquare",[["path",{d:"M12 6V2H8",key:"1155em"}],["path",{d:"m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z",key:"w2lp3e"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M9 11v2",key:"1ueba0"}],["path",{d:"M15 11v2",key:"i11awn"}],["path",{d:"M20 12h2",key:"1q8mjw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vi=e("BotOff",[["path",{d:"M13.67 8H18a2 2 0 0 1 2 2v4.33",key:"7az073"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M22 22 2 2",key:"1r8tn9"}],["path",{d:"M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586",key:"s09a7a"}],["path",{d:"M9 13v2",key:"rq6x2g"}],["path",{d:"M9.67 4H12v2.33",key:"110xot"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ri=e("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=e("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ti=e("Boxes",[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",key:"lc1i9w"}],["path",{d:"m7 16.5-4.74-2.85",key:"1o9zyk"}],["path",{d:"m7 16.5 5-3",key:"va8pkn"}],["path",{d:"M7 16.5v5.17",key:"jnp8gn"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",key:"8zsnat"}],["path",{d:"m17 16.5-5-3",key:"8arw3v"}],["path",{d:"m17 16.5 4.74-2.85",key:"8rfmw"}],["path",{d:"M17 16.5v5.17",key:"k6z78m"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",key:"1xygjf"}],["path",{d:"M12 8 7.26 5.15",key:"1vbdud"}],["path",{d:"m12 8 4.74-2.85",key:"3rx089"}],["path",{d:"M12 13.5V8",key:"1io7kd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V1=e("Braces",[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",key:"ezmyqa"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",key:"e1hn23"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=e("Brackets",[["path",{d:"M16 3h3v18h-3",key:"1yor1f"}],["path",{d:"M8 21H5V3h3",key:"1qrfwo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bi=e("BrainCircuit",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ei=e("BrainCog",[["path",{d:"M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.028-.13.306-.13.335 0a3.2 3.2 0 0 0 .163.546 4 4 0 0 0 7.636-2.106 4 4 0 0 0 .556-6.588 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5",key:"1kgmhc"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"m15.7 10.4-.9.4",key:"ayzo6p"}],["path",{d:"m9.2 13.2-.9.4",key:"1uzb3g"}],["path",{d:"m13.6 15.7-.4-.9",key:"11ifqf"}],["path",{d:"m10.8 9.2-.4-.9",key:"1pmk2v"}],["path",{d:"m15.7 13.5-.9-.4",key:"7ng02m"}],["path",{d:"m9.2 10.9-.9-.4",key:"1x66zd"}],["path",{d:"m10.5 15.7.4-.9",key:"3js94g"}],["path",{d:"m13.1 9.2.4-.9",key:"18n7mc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oi=e("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ui=e("BrickWall",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 9v6",key:"199k2o"}],["path",{d:"M16 15v6",key:"8rj2es"}],["path",{d:"M16 3v6",key:"1j6rpj"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M8 15v6",key:"1stoo3"}],["path",{d:"M8 3v6",key:"vlvjmk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ni=e("BriefcaseBusiness",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _i=e("BriefcaseConveyorBelt",[["path",{d:"M10 20v2",key:"1n8e1g"}],["path",{d:"M14 20v2",key:"1lq872"}],["path",{d:"M18 20v2",key:"10uadw"}],["path",{d:"M21 20H3",key:"kdqkdp"}],["path",{d:"M6 20v2",key:"a9bc87"}],["path",{d:"M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12",key:"17n9tx"}],["rect",{x:"4",y:"6",width:"16",height:"10",rx:"2",key:"1097i5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=e("BriefcaseMedical",[["path",{d:"M12 11v4",key:"a6ujw6"}],["path",{d:"M14 13h-4",key:"1pl8zg"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M18 6v14",key:"1mu4gy"}],["path",{d:"M6 6v14",key:"1s15cj"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=e("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=e("BringToFront",[["rect",{x:"8",y:"8",width:"8",height:"8",rx:"2",key:"yj20xf"}],["path",{d:"M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2",key:"1ltk23"}],["path",{d:"M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2",key:"1q24h9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=e("Brush",[["path",{d:"m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08",key:"1styjt"}],["path",{d:"M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z",key:"z0l1mu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xi=e("BugOff",[["path",{d:"M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2",key:"vl8zik"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M22 13h-4v-2a4 4 0 0 0-4-4h-1.3",key:"1ou0bd"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13",key:"1njkjs"}],["path",{d:"M12 20v-8",key:"i3yub9"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ki=e("BugPlay",[["path",{d:"M12.765 21.522a.5.5 0 0 1-.765-.424v-8.196a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z",key:"17shqo"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M18 11a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4.5",key:"1tjixy"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $i=e("Bug",[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qi=e("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ji=e("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yi=e("BusFront",[["path",{d:"M4 6 2 7",key:"1mqr15"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"m22 7-2-1",key:"1umjhc"}],["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2",key:"1wxw4b"}],["path",{d:"M4 11h16",key:"mpoxn0"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M16 15h.01",key:"rnfrdf"}],["path",{d:"M6 19v2",key:"1loha6"}],["path",{d:"M18 21v-2",key:"sqyl04"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ed=e("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const td=e("CableCar",[["path",{d:"M10 3h.01",key:"lbucoy"}],["path",{d:"M14 2h.01",key:"1k8aa1"}],["path",{d:"m2 9 20-5",key:"1kz0j5"}],["path",{d:"M12 12V6.5",key:"1vbrij"}],["rect",{width:"16",height:"10",x:"4",y:"12",rx:"3",key:"if91er"}],["path",{d:"M9 12v5",key:"3anwtq"}],["path",{d:"M15 12v5",key:"5xh3zn"}],["path",{d:"M4 17h16",key:"g4d7ey"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ad=e("Cable",[["path",{d:"M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1",key:"10bnsj"}],["path",{d:"M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9",key:"1eqmu1"}],["path",{d:"M21 21v-2h-4",key:"14zm7j"}],["path",{d:"M3 5h4V3",key:"z442eg"}],["path",{d:"M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3",key:"ebdjd7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const od=e("CakeSlice",[["circle",{cx:"9",cy:"7",r:"2",key:"1305pl"}],["path",{d:"M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6",key:"xle13f"}],["path",{d:"M16 13H3",key:"1wpj08"}],["path",{d:"M16 17H3",key:"3lvfcd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rd=e("Cake",[["path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8",key:"1w3rig"}],["path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1",key:"n2jgmb"}],["path",{d:"M2 21h20",key:"1nyx9w"}],["path",{d:"M7 8v3",key:"1qtyvj"}],["path",{d:"M12 8v3",key:"hwp4zt"}],["path",{d:"M17 8v3",key:"1i6e5u"}],["path",{d:"M7 4h.01",key:"1bh4kh"}],["path",{d:"M12 4h.01",key:"1ujb9j"}],["path",{d:"M17 4h.01",key:"1upcoc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nd=e("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cd=e("Calendar1",[["path",{d:"M11 14h1v4",key:"fy54vd"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}],["rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",key:"12vinp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const id=e("CalendarArrowDown",[["path",{d:"m14 18 4 4 4-4",key:"1waygx"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M18 14v8",key:"irew45"}],["path",{d:"M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343",key:"bse4f3"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dd=e("CalendarArrowUp",[["path",{d:"m14 18 4-4 4 4",key:"ftkppy"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M18 22v-8",key:"su0gjh"}],["path",{d:"M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9",key:"1exg90"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sd=e("CalendarCheck2",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",key:"bce9hv"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m16 20 2 2 4-4",key:"13tcca"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hd=e("CalendarCheck",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ld=e("CalendarClock",[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M17.5 17.5 16 16.3V14",key:"akvzfd"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=e("CalendarCog",[["path",{d:"m15.2 16.9-.9-.4",key:"1r0w5f"}],["path",{d:"m15.2 19.1-.9.4",key:"j188fs"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"m16.9 15.2-.4-.9",key:"699xu"}],["path",{d:"m16.9 20.8-.4.9",key:"dfjc4z"}],["path",{d:"m19.5 14.3-.4.9",key:"1eb35c"}],["path",{d:"m19.5 21.7-.4-.9",key:"1tonu5"}],["path",{d:"M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",key:"11kmuh"}],["path",{d:"m21.7 16.5-.9.4",key:"1knoei"}],["path",{d:"m21.7 19.5-.9-.4",key:"q4dx6b"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pd=e("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ud=e("CalendarFold",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z",key:"kg77oy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M15 22v-4a2 2 0 0 1 2-2h4",key:"1gnbqr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=e("CalendarHeart",[["path",{d:"M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7",key:"136lmk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z",key:"1t7hil"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Md=e("CalendarMinus2",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M10 16h4",key:"17e571"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const md=e("CalendarMinus",[["path",{d:"M16 19h6",key:"xwg31i"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",key:"1scpom"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd=e("CalendarOff",[["path",{d:"M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18",key:"16swn3"}],["path",{d:"M21 15.5V6a2 2 0 0 0-2-2H9.5",key:"yhw86o"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M3 10h7",key:"1wap6i"}],["path",{d:"M21 10h-5.5",key:"quycpq"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fd=e("CalendarPlus2",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M10 16h4",key:"17e571"}],["path",{d:"M12 14v4",key:"1thi36"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gd=e("CalendarPlus",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",key:"3spt84"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M16 19h6",key:"xwg31i"}],["path",{d:"M19 16v6",key:"tddt3s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=e("CalendarRange",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M17 14h-6",key:"bkmgh3"}],["path",{d:"M13 18H7",key:"bb0bb7"}],["path",{d:"M7 14h.01",key:"1qa3f1"}],["path",{d:"M17 18h.01",key:"1bdyru"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=e("CalendarSearch",[["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25",key:"1jrsq6"}],["path",{d:"m22 22-1.875-1.875",key:"13zax7"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 2v4",key:"1cmpym"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ld=e("CalendarSync",[["path",{d:"M11 10v4h4",key:"172dkj"}],["path",{d:"m11 14 1.535-1.605a5 5 0 0 1 8 1.5",key:"vu0qm5"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"m21 18-1.535 1.605a5 5 0 0 1-8-1.5",key:"1qgeyt"}],["path",{d:"M21 22v-4h-4",key:"hrummi"}],["path",{d:"M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3",key:"mctw84"}],["path",{d:"M3 10h4",key:"1el30a"}],["path",{d:"M8 2v4",key:"1cmpym"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=e("CalendarX2",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",key:"3spt84"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m17 22 5-5",key:"1k6ppv"}],["path",{d:"m17 17 5 5",key:"p7ous7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=e("CalendarX",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m14 14-4 4",key:"rymu2i"}],["path",{d:"m10 14 4 4",key:"3sz06r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eo=e("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Id=e("CameraOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16",key:"qmtpty"}],["path",{d:"M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5",key:"1ufyfc"}],["path",{d:"M14.121 15.121A3 3 0 1 1 9.88 10.88",key:"11zox6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=e("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=e("CandyCane",[["path",{d:"M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z",key:"isaq8g"}],["path",{d:"M17.75 7 15 2.1",key:"12x7e8"}],["path",{d:"M10.9 4.8 13 9",key:"100a87"}],["path",{d:"m7.9 9.7 2 4.4",key:"ntfhaj"}],["path",{d:"M4.9 14.7 7 18.9",key:"1x43jy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qd=e("CandyOff",[["path",{d:"m8.5 8.5-1 1a4.95 4.95 0 0 0 7 7l1-1",key:"1ff4ui"}],["path",{d:"M11.843 6.187A4.947 4.947 0 0 1 16.5 7.5a4.947 4.947 0 0 1 1.313 4.657",key:"1sbrv4"}],["path",{d:"M14 16.5V14",key:"1maf8j"}],["path",{d:"M14 6.5v1.843",key:"1a6u6t"}],["path",{d:"M10 10v7.5",key:"80pj65"}],["path",{d:"m16 7 1-5 1.367.683A3 3 0 0 0 19.708 3H21v1.292a3 3 0 0 0 .317 1.341L22 7l-5 1",key:"11a9mt"}],["path",{d:"m8 17-1 5-1.367-.683A3 3 0 0 0 4.292 21H3v-1.292a3 3 0 0 0-.317-1.341L2 17l5-1",key:"3mjmon"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ad=e("Candy",[["path",{d:"m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z",key:"ue6khb"}],["path",{d:"M14 6.5v10",key:"5xnk7c"}],["path",{d:"M10 7.5v10",key:"1uew51"}],["path",{d:"m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1",key:"b9cp6k"}],["path",{d:"m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1",key:"5lney8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=e("Cannabis",[["path",{d:"M12 22v-4",key:"1utk9m"}],["path",{d:"M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",key:"1mezod"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=e("CaptionsOff",[["path",{d:"M10.5 5H19a2 2 0 0 1 2 2v8.5",key:"jqtk4d"}],["path",{d:"M17 11h-.5",key:"1961ue"}],["path",{d:"M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2",key:"1keqsi"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M7 11h4",key:"1o1z6v"}],["path",{d:"M7 15h2.5",key:"1ina1g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R1=e("Captions",[["rect",{width:"18",height:"14",x:"3",y:"5",rx:"2",ry:"2",key:"12ruh7"}],["path",{d:"M7 15h4M15 15h2M7 11h2M13 11h4",key:"1ueiar"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zd=e("CarFront",[["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",key:"1imjwt"}],["path",{d:"M7 14h.01",key:"1qa3f1"}],["path",{d:"M17 14h.01",key:"7oqj8z"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2",key:"a7itu8"}],["path",{d:"M5 18v2",key:"ppbyun"}],["path",{d:"M19 18v2",key:"gy7782"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd=e("CarTaxiFront",[["path",{d:"M10 2h4",key:"n1abiw"}],["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",key:"1imjwt"}],["path",{d:"M7 14h.01",key:"1qa3f1"}],["path",{d:"M17 14h.01",key:"7oqj8z"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2",key:"a7itu8"}],["path",{d:"M5 18v2",key:"ppbyun"}],["path",{d:"M19 18v2",key:"gy7782"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=e("Car",[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vd=e("Caravan",[["path",{d:"M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2",key:"19jm3t"}],["path",{d:"M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2",key:"13hakp"}],["path",{d:"M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9",key:"1crci8"}],["circle",{cx:"8",cy:"19",r:"2",key:"t8fc5s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=e("Carrot",[["path",{d:"M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46",key:"rfqxbe"}],["path",{d:"M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z",key:"6b25w4"}],["path",{d:"M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z",key:"fn65lo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dd=e("CaseLower",[["circle",{cx:"7",cy:"12",r:"3",key:"12clwm"}],["path",{d:"M10 9v6",key:"17i7lo"}],["circle",{cx:"17",cy:"12",r:"3",key:"gl7c2s"}],["path",{d:"M14 7v8",key:"dl84cr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Td=e("CaseSensitive",[["path",{d:"m3 15 4-8 4 8",key:"1vwr6u"}],["path",{d:"M4 13h6",key:"1r9ots"}],["circle",{cx:"18",cy:"12",r:"3",key:"1kchzo"}],["path",{d:"M21 9v6",key:"anns31"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fd=e("CaseUpper",[["path",{d:"m3 15 4-8 4 8",key:"1vwr6u"}],["path",{d:"M4 13h6",key:"1r9ots"}],["path",{d:"M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4",key:"1sqfas"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=e("CassetteTape",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["circle",{cx:"8",cy:"10",r:"2",key:"1xl4ub"}],["path",{d:"M8 12h8",key:"1wcyev"}],["circle",{cx:"16",cy:"10",r:"2",key:"r14t7q"}],["path",{d:"m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3",key:"l01ucn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ed=e("Cast",[["path",{d:"M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6",key:"3zrzxg"}],["path",{d:"M2 12a9 9 0 0 1 8 8",key:"g6cvee"}],["path",{d:"M2 16a5 5 0 0 1 4 4",key:"1y1dii"}],["line",{x1:"2",x2:"2.01",y1:"20",y2:"20",key:"xu2jvo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Od=e("Castle",[["path",{d:"M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z",key:"109fe4"}],["path",{d:"M18 11V4H6v7",key:"mon5oj"}],["path",{d:"M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4",key:"1k4jtn"}],["path",{d:"M22 11V9",key:"3zbp94"}],["path",{d:"M2 11V9",key:"1x5rnq"}],["path",{d:"M6 4V2",key:"1rsq15"}],["path",{d:"M18 4V2",key:"1jsdo1"}],["path",{d:"M10 4V2",key:"75d9ly"}],["path",{d:"M14 4V2",key:"8nj3z6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ud=e("Cat",[["path",{d:"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",key:"x6xyqk"}],["path",{d:"M8 14v.5",key:"1nzgdb"}],["path",{d:"M16 14v.5",key:"1lajdz"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z",key:"12kq1m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nd=e("Cctv",[["path",{d:"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97",key:"ir91b5"}],["path",{d:"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z",key:"jlp8i1"}],["path",{d:"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15",key:"19bib8"}],["path",{d:"M2 21v-4",key:"l40lih"}],["path",{d:"M7 9h.01",key:"19b3jx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D1=e("ChartArea",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",key:"q0gr47"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T1=e("ChartBarBig",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["rect",{x:"7",y:"13",width:"9",height:"4",rx:"1",key:"1iip1u"}],["rect",{x:"7",y:"5",width:"12",height:"4",rx:"1",key:"1anskk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=e("ChartBarDecreasing",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 11h8",key:"1feolt"}],["path",{d:"M7 16h3",key:"ur6vzw"}],["path",{d:"M7 6h12",key:"sz5b0d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gd=e("ChartBarIncreasing",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 11h8",key:"1feolt"}],["path",{d:"M7 16h12",key:"wsnu98"}],["path",{d:"M7 6h3",key:"w9rmul"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zd=e("ChartBarStacked",[["path",{d:"M11 13v4",key:"vyy2rb"}],["path",{d:"M15 5v4",key:"1gx88a"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["rect",{x:"7",y:"13",width:"9",height:"4",rx:"1",key:"1iip1u"}],["rect",{x:"7",y:"5",width:"12",height:"4",rx:"1",key:"1anskk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F1=e("ChartBar",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 16h8",key:"srdodz"}],["path",{d:"M7 11h12",key:"127s9w"}],["path",{d:"M7 6h3",key:"w9rmul"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B1=e("ChartCandlestick",[["path",{d:"M9 5v4",key:"14uxtq"}],["rect",{width:"4",height:"6",x:"7",y:"9",rx:"1",key:"f4fvz0"}],["path",{d:"M9 15v2",key:"r5rk32"}],["path",{d:"M17 3v2",key:"1l2re6"}],["rect",{width:"4",height:"8",x:"15",y:"5",rx:"1",key:"z38je5"}],["path",{d:"M17 13v3",key:"5l0wba"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E1=e("ChartColumnBig",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["rect",{x:"15",y:"5",width:"4",height:"12",rx:"1",key:"q8uenq"}],["rect",{x:"7",y:"8",width:"4",height:"9",rx:"1",key:"sr5ea"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wd=e("ChartColumnDecreasing",[["path",{d:"M13 17V9",key:"1fwyjl"}],["path",{d:"M18 17v-3",key:"1sqioe"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M8 17V5",key:"1wzmnc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O1=e("ChartColumnIncreasing",[["path",{d:"M13 17V9",key:"1fwyjl"}],["path",{d:"M18 17V5",key:"sfb6ij"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xd=e("ChartColumnStacked",[["path",{d:"M11 13H7",key:"t0o9gq"}],["path",{d:"M19 9h-4",key:"rera1j"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["rect",{x:"15",y:"5",width:"4",height:"12",rx:"1",key:"q8uenq"}],["rect",{x:"7",y:"8",width:"4",height:"9",rx:"1",key:"sr5ea"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U1=e("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=e("ChartGantt",[["path",{d:"M10 6h8",key:"zvc2xc"}],["path",{d:"M12 16h6",key:"yi5mkt"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M8 11h7",key:"wz2hg0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N1=e("ChartLine",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"m19 9-5 5-4-4-3 3",key:"2osh9i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=e("ChartNetwork",[["path",{d:"m13.11 7.664 1.78 2.672",key:"go2gg9"}],["path",{d:"m14.162 12.788-3.324 1.424",key:"11x848"}],["path",{d:"m20 4-6.06 1.515",key:"1wxxh7"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["circle",{cx:"12",cy:"6",r:"2",key:"1jj5th"}],["circle",{cx:"16",cy:"12",r:"2",key:"4ma0v8"}],["circle",{cx:"9",cy:"15",r:"2",key:"lf2ghp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qd=e("ChartNoAxesColumnDecreasing",[["path",{d:"M12 20V10",key:"g8npz5"}],["path",{d:"M18 20v-4",key:"8uic4z"}],["path",{d:"M6 20V4",key:"1w1bmo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _1=e("ChartNoAxesColumnIncreasing",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G1=e("ChartNoAxesColumn",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jd=e("ChartNoAxesCombined",[["path",{d:"M12 16v5",key:"zza2cw"}],["path",{d:"M16 14v7",key:"1g90b9"}],["path",{d:"M20 10v11",key:"1iqoj0"}],["path",{d:"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",key:"1fw8x9"}],["path",{d:"M4 18v3",key:"1yp0dc"}],["path",{d:"M8 14v7",key:"n3cwzv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z1=e("ChartNoAxesGantt",[["path",{d:"M8 6h10",key:"9lnwnk"}],["path",{d:"M6 12h9",key:"1g9pqf"}],["path",{d:"M11 18h7",key:"c8dzvl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W1=e("ChartPie",[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X1=e("ChartScatter",[["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}],["circle",{cx:"18.5",cy:"5.5",r:".5",fill:"currentColor",key:"lysivs"}],["circle",{cx:"11.5",cy:"11.5",r:".5",fill:"currentColor",key:"byv1b8"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor",key:"nkw3mc"}],["circle",{cx:"17.5",cy:"14.5",r:".5",fill:"currentColor",key:"1gjh6j"}],["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yd=e("ChartSpline",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7",key:"lw07rv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=e("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=e("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=e("ChefHat",[["path",{d:"M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",key:"1qvrer"}],["path",{d:"M6 17h12",key:"1jwigz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=e("Cherry",[["path",{d:"M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z",key:"cvxqlc"}],["path",{d:"M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z",key:"1ostrc"}],["path",{d:"M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12",key:"hqx58h"}],["path",{d:"M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z",key:"eykp1o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const os=e("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=e("ChevronFirst",[["path",{d:"m17 18-6-6 6-6",key:"1yerx2"}],["path",{d:"M7 6v12",key:"1p53r6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=e("ChevronLast",[["path",{d:"m7 18 6-6-6-6",key:"lwmzdw"}],["path",{d:"M17 6v12",key:"1o0aio"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=e("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uo=e("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=e("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=e("ChevronsDownUp",[["path",{d:"m7 20 5-5 5 5",key:"13a0gw"}],["path",{d:"m7 4 5 5 5-5",key:"1kwcof"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=e("ChevronsDown",[["path",{d:"m7 6 5 5 5-5",key:"1lc07p"}],["path",{d:"m7 13 5 5 5-5",key:"1d48rs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=e("ChevronsLeftRightEllipsis",[["path",{d:"m18 8 4 4-4 4",key:"1ak13k"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 12h.01",key:"1l6xoz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=e("ChevronsLeftRight",[["path",{d:"m9 7-5 5 5 5",key:"j5w590"}],["path",{d:"m15 7 5 5-5 5",key:"1bl6da"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=e("ChevronsLeft",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=e("ChevronsRightLeft",[["path",{d:"m20 17-5-5 5-5",key:"30x0n2"}],["path",{d:"m4 17 5-5-5-5",key:"16spf4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=e("ChevronsRight",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=e("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=e("ChevronsUp",[["path",{d:"m17 11-5-5-5 5",key:"e8nh98"}],["path",{d:"m17 18-5-5-5 5",key:"2avn1x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=e("Chrome",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["line",{x1:"21.17",x2:"12",y1:"8",y2:"8",key:"a0cw5f"}],["line",{x1:"3.95",x2:"8.54",y1:"6.06",y2:"14",key:"1kftof"}],["line",{x1:"10.88",x2:"15.46",y1:"21.94",y2:"14",key:"1ymyh8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=e("Church",[["path",{d:"M10 9h4",key:"u4k05v"}],["path",{d:"M12 7v5",key:"ma6bk"}],["path",{d:"M14 22v-4a2 2 0 0 0-4 0v4",key:"1pdhuj"}],["path",{d:"M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22",key:"1rkokr"}],["path",{d:"m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7",key:"1w6esw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=e("CigaretteOff",[["path",{d:"M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13",key:"1gdiyg"}],["path",{d:"M18 8c0-2.5-2-2.5-2-5",key:"1il607"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866",key:"166zjj"}],["path",{d:"M22 8c0-2.5-2-2.5-2-5",key:"1gah44"}],["path",{d:"M7 12v4",key:"jqww69"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gs=e("Cigarette",[["path",{d:"M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14",key:"1mb5g1"}],["path",{d:"M18 8c0-2.5-2-2.5-2-5",key:"1il607"}],["path",{d:"M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"1yl5r7"}],["path",{d:"M22 8c0-2.5-2-2.5-2-5",key:"1gah44"}],["path",{d:"M7 12v4",key:"jqww69"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K1=e("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $1=e("CircleArrowDown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"m8 12 4 4 4-4",key:"k98ssh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q1=e("CircleArrowLeft",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 12H8",key:"1fr5h0"}],["path",{d:"m12 8-4 4 4 4",key:"15vm53"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J1=e("CircleArrowOutDownLeft",[["path",{d:"M2 12a10 10 0 1 1 10 10",key:"1yn6ov"}],["path",{d:"m2 22 10-10",key:"28ilpk"}],["path",{d:"M8 22H2v-6",key:"sulq54"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y1=e("CircleArrowOutDownRight",[["path",{d:"M12 22a10 10 0 1 1 10-10",key:"130bv5"}],["path",{d:"M22 22 12 12",key:"131aw7"}],["path",{d:"M22 16v6h-6",key:"1gvm70"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=e("CircleArrowOutUpLeft",[["path",{d:"M2 8V2h6",key:"hiwtdz"}],["path",{d:"m2 2 10 10",key:"1oh8rs"}],["path",{d:"M12 2A10 10 0 1 1 2 12",key:"rrk4fa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=e("CircleArrowOutUpRight",[["path",{d:"M22 12A10 10 0 1 1 12 2",key:"1fm58d"}],["path",{d:"M22 2 12 12",key:"yg2myt"}],["path",{d:"M16 2h6v6",key:"zan5cs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=e("CircleArrowRight",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m12 16 4-4-4-4",key:"1i9zcv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=e("CircleArrowUp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 12-4-4-4 4",key:"177agl"}],["path",{d:"M12 16V8",key:"1sbj14"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=e("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=e("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=e("CircleChevronDown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 10-4 4-4-4",key:"894hmk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=e("CircleChevronLeft",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14 16-4-4 4-4",key:"ojs7w8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=e("CircleChevronRight",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m10 8 4 4-4 4",key:"1wy4r4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=e("CircleChevronUp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m8 14 4-4 4 4",key:"fy2ptz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=e("CircleDashed",[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0",key:"5ilxe3"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0",key:"11zvb9"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7",key:"1iw5b2"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8",key:"c0bmvh"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69",key:"1ruxm7"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8",key:"qkgqxc"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69",key:"1mcia2"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7",key:"1fvljs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=e("CircleDivide",[["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}],["line",{x1:"12",x2:"12",y1:"16",y2:"16",key:"aqc6ln"}],["line",{x1:"12",x2:"12",y1:"8",y2:"8",key:"1mkcni"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=e("CircleDollarSign",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 18V6",key:"zqpxq5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=e("CircleDotDashed",[["path",{d:"M10.1 2.18a9.93 9.93 0 0 1 3.8 0",key:"1qdqn0"}],["path",{d:"M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7",key:"1bq7p6"}],["path",{d:"M21.82 10.1a9.93 9.93 0 0 1 0 3.8",key:"1rlaqf"}],["path",{d:"M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69",key:"1xk03u"}],["path",{d:"M13.9 21.82a9.94 9.94 0 0 1-3.8 0",key:"l7re25"}],["path",{d:"M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7",key:"1v18p6"}],["path",{d:"M2.18 13.9a9.93 9.93 0 0 1 0-3.8",key:"xdo6bj"}],["path",{d:"M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69",key:"1jjmaz"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cs=e("CircleDot",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=e("CircleEllipsis",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M17 12h.01",key:"1m0b6t"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M7 12h.01",key:"eqddd0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=e("CircleEqual",[["path",{d:"M7 10h10",key:"1101jm"}],["path",{d:"M7 14h10",key:"1mhdw3"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=e("CircleFadingArrowUp",[["path",{d:"M12 2a10 10 0 0 1 7.38 16.75",key:"175t95"}],["path",{d:"m16 12-4-4-4 4",key:"177agl"}],["path",{d:"M12 16V8",key:"1sbj14"}],["path",{d:"M2.5 8.875a10 10 0 0 0-.5 3",key:"1vce0s"}],["path",{d:"M2.83 16a10 10 0 0 0 2.43 3.4",key:"o3fkw4"}],["path",{d:"M4.636 5.235a10 10 0 0 1 .891-.857",key:"1szpfk"}],["path",{d:"M8.644 21.42a10 10 0 0 0 7.631-.38",key:"9yhvd4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qs=e("CircleFadingPlus",[["path",{d:"M12 2a10 10 0 0 1 7.38 16.75",key:"175t95"}],["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"M16 12H8",key:"1fr5h0"}],["path",{d:"M2.5 8.875a10 10 0 0 0-.5 3",key:"1vce0s"}],["path",{d:"M2.83 16a10 10 0 0 0 2.43 3.4",key:"o3fkw4"}],["path",{d:"M4.636 5.235a10 10 0 0 1 .891-.857",key:"1szpfk"}],["path",{d:"M8.644 21.42a10 10 0 0 0 7.631-.38",key:"9yhvd4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=e("CircleGauge",[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7",key:"1e0p6d"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M13.4 10.6 19 5",key:"1kr7tw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=e("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=e("CircleMinus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=e("CircleOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.35 2.69A10 10 0 0 1 21.3 15.65",key:"1pfsoa"}],["path",{d:"M19.08 19.08A10 10 0 1 1 4.92 4.92",key:"1ablyi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=e("CircleParkingOff",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m5 5 14 14",key:"11anup"}],["path",{d:"M13 13a3 3 0 1 0 0-6H9v2",key:"uoagbd"}],["path",{d:"M9 17v-2.34",key:"a9qo08"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=e("CircleParking",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9 17V7h4a3 3 0 0 1 0 6H9",key:"1dfk2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=e("CirclePause",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9",key:"c1nkhi"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9",key:"h65svq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=e("CirclePercent",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 15h.01",key:"lqbp3k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=e("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=e("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=e("CirclePower",[["path",{d:"M12 7v4",key:"xawao1"}],["path",{d:"M7.998 9.003a5 5 0 1 0 8-.005",key:"1pek45"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=e("CircleSlash2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M22 2 2 22",key:"y4kqgn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=e("CircleSlash",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"9",x2:"15",y1:"15",y2:"9",key:"1dfufj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=e("CircleStop",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1",key:"1ssd4o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=e("CircleUserRound",[["path",{d:"M18 20a6 6 0 0 0-12 0",key:"1qehca"}],["circle",{cx:"12",cy:"10",r:"4",key:"1h16sb"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=e("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=e("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=e("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=e("CircuitBoard",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M11 9h4a2 2 0 0 0 2-2V3",key:"1ve2rv"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"M7 21v-4a2 2 0 0 1 2-2h4",key:"1fwkro"}],["circle",{cx:"15",cy:"15",r:"2",key:"3i40o0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=e("Citrus",[["path",{d:"M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z",key:"4ite01"}],["path",{d:"M19.65 15.66A8 8 0 0 1 8.35 4.34",key:"1gxipu"}],["path",{d:"m14 10-5.5 5.5",key:"92pfem"}],["path",{d:"M14 17.85V10H6.15",key:"xqmtsk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs=e("Clapperboard",[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",key:"1tn4o7"}],["path",{d:"m6.2 5.3 3.1 3.9",key:"iuk76l"}],["path",{d:"m12.4 3.4 3.1 4",key:"6hsd6n"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",key:"ltgou9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=e("ClipboardCheck",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=e("ClipboardCopy",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",key:"4jdomd"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v4",key:"3hqy98"}],["path",{d:"M21 14H11",key:"1bme5i"}],["path",{d:"m15 10-4 4 4 4",key:"5dvupr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=e("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ts=e("ClipboardMinus",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M9 14h6",key:"159ibu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=e("ClipboardPaste",[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z",key:"1pp7kr"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",key:"2ik1ml"}],["path",{d:"m17 10 4 4-4 4",key:"vp2hj1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=e("ClipboardPenLine",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",key:"1oijnt"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5",key:"1but9f"}],["path",{d:"M16 4h2a2 2 0 0 1 1.73 1",key:"1p8n7l"}],["path",{d:"M8 18h1",key:"13wk12"}],["path",{d:"M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"2t3380"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=e("ClipboardPen",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",key:"1oijnt"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5",key:"cereej"}],["path",{d:"M4 13.5V6a2 2 0 0 1 2-2h2",key:"5ua5vh"}],["path",{d:"M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1y4qbx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=e("ClipboardPlus",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M9 14h6",key:"159ibu"}],["path",{d:"M12 17v-6",key:"1y8rbf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=e("ClipboardType",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M9 12v-1h6v1",key:"iehl6m"}],["path",{d:"M11 17h2",key:"12w5me"}],["path",{d:"M12 11v6",key:"1bwqyc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=e("ClipboardX",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m15 11-6 6",key:"1toa9n"}],["path",{d:"m9 11 6 6",key:"wlibny"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=e("Clipboard",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ns=e("Clock1",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 14.5 8",key:"12zbmj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=e("Clock10",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 8 10",key:"atfzqc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=e("Clock11",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 9.5 8",key:"l5bg6f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zs=e("Clock12",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12",key:"1fub01"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=e("Clock2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 10",key:"1g230d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=e("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ks=e("Clock4",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=e("Clock5",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 14.5 16",key:"1pcbox"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=e("Clock6",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 12 16.5",key:"hb2qv6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=e("Clock7",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 9.5 16",key:"ka3394"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ys=e("Clock8",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 8 14",key:"tmc9b4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eh=e("Clock9",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 7.5 12",key:"1k60p0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const th=e("ClockAlert",[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["path",{d:"M16 21.16a10 10 0 1 1 5-13.516",key:"cxo92l"}],["path",{d:"M20 11.5v6",key:"2ei3xq"}],["path",{d:"M20 21.5h.01",key:"1r2dzp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ah=e("ClockArrowDown",[["path",{d:"M12.338 21.994A10 10 0 1 1 21.925 13.227",key:"1i7shu"}],["path",{d:"M12 6v6l2 1",key:"19cm8n"}],["path",{d:"m14 18 4 4 4-4",key:"1waygx"}],["path",{d:"M18 14v8",key:"irew45"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oh=e("ClockArrowUp",[["path",{d:"M13.228 21.925A10 10 0 1 1 21.994 12.338",key:"1fzlyi"}],["path",{d:"M12 6v6l1.562.781",key:"1ujuk9"}],["path",{d:"m14 18 4-4 4 4",key:"ftkppy"}],["path",{d:"M18 22v-8",key:"su0gjh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l1=e("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rh=e("CloudAlert",[["path",{d:"M12 12v4",key:"tww15h"}],["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708",key:"xsb5ju"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nh=e("CloudCog",[["circle",{cx:"12",cy:"17",r:"3",key:"1spfwm"}],["path",{d:"M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",key:"zaobp"}],["path",{d:"m15.7 18.4-.9-.3",key:"4qxpbn"}],["path",{d:"m9.2 15.9-.9-.3",key:"17q7o2"}],["path",{d:"m10.6 20.7.3-.9",key:"1pf4s2"}],["path",{d:"m13.1 14.2.3-.9",key:"1mnuqm"}],["path",{d:"m13.6 20.7-.4-1",key:"1jpd1m"}],["path",{d:"m10.8 14.3-.4-1",key:"17ugyy"}],["path",{d:"m8.3 18.6 1-.4",key:"s42vdx"}],["path",{d:"m14.7 15.8 1-.4",key:"2wizun"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=e("CloudDownload",[["path",{d:"M12 13v8l-4-4",key:"1f5nwf"}],["path",{d:"m12 21 4-4",key:"1lfcce"}],["path",{d:"M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",key:"ui1hmy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ch=e("CloudDrizzle",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M8 19v1",key:"1dk2by"}],["path",{d:"M8 14v1",key:"84yxot"}],["path",{d:"M16 19v1",key:"v220m7"}],["path",{d:"M16 14v1",key:"g12gj6"}],["path",{d:"M12 21v1",key:"q8vafk"}],["path",{d:"M12 16v1",key:"1mx6rx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ih=e("CloudFog",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 17H7",key:"pygtm1"}],["path",{d:"M17 21H9",key:"1u2q02"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dh=e("CloudHail",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v2",key:"a1is7l"}],["path",{d:"M8 14v2",key:"1e9m6t"}],["path",{d:"M16 20h.01",key:"xwek51"}],["path",{d:"M8 20h.01",key:"1vjney"}],["path",{d:"M12 16v2",key:"z66u1j"}],["path",{d:"M12 22h.01",key:"1urd7a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sh=e("CloudLightning",[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973",key:"1cez44"}],["path",{d:"m13 12-3 5h4l-3 5",key:"1t22er"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hh=e("CloudMoonRain",[["path",{d:"M10.188 8.5A6 6 0 0 1 16 4a1 1 0 0 0 6 6 6 6 0 0 1-3 5.197",key:"erj67n"}],["path",{d:"M11 20v2",key:"174qtz"}],["path",{d:"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24",key:"1qmrp3"}],["path",{d:"M7 19v2",key:"12npes"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lh=e("CloudMoon",[["path",{d:"M10.188 8.5A6 6 0 0 1 16 4a1 1 0 0 0 6 6 6 6 0 0 1-3 5.197",key:"erj67n"}],["path",{d:"M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z",key:"p44pc9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yh=e("CloudOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193",key:"yfwify"}],["path",{d:"M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07",key:"jlfiyv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ph=e("CloudRainWind",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m9.2 22 3-7",key:"sb5f6j"}],["path",{d:"m9 13-3 7",key:"500co5"}],["path",{d:"m17 13-3 7",key:"8t2fiy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uh=e("CloudRain",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kh=e("CloudSnow",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M8 19h.01",key:"puxtts"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M12 21h.01",key:"h35vbk"}],["path",{d:"M16 15h.01",key:"rnfrdf"}],["path",{d:"M16 19h.01",key:"1vcnzz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mh=e("CloudSunRain",[["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128",key:"dpwdj0"}],["path",{d:"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24",key:"1qmrp3"}],["path",{d:"M11 20v2",key:"174qtz"}],["path",{d:"M7 19v2",key:"12npes"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mh=e("CloudSun",[["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128",key:"dpwdj0"}],["path",{d:"M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",key:"s09mg5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=e("CloudUpload",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vh=e("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fh=e("Cloudy",[["path",{d:"M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"gqqjvc"}],["path",{d:"M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5",key:"1p2s76"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gh=e("Clover",[["path",{d:"M16.17 7.83 2 22",key:"t58vo8"}],["path",{d:"M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12",key:"17k36q"}],["path",{d:"m7.83 7.83 8.34 8.34",key:"1d7sxk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xh=e("Club",[["path",{d:"M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",key:"27yuqz"}],["path",{d:"M12 17.66L12 22",key:"ogfahf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=e("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wh=e("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lh=e("Codepen",[["polygon",{points:"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2",key:"srzb37"}],["line",{x1:"12",x2:"12",y1:"22",y2:"15.5",key:"1t73f2"}],["polyline",{points:"22 8.5 12 15.5 2 8.5",key:"ajlxae"}],["polyline",{points:"2 15.5 12 8.5 22 15.5",key:"susrui"}],["line",{x1:"12",x2:"12",y1:"2",y2:"8.5",key:"2cldga"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ch=e("Codesandbox",[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["polyline",{points:"7.5 4.21 12 6.81 16.5 4.21",key:"fabo96"}],["polyline",{points:"7.5 19.79 7.5 14.6 3 12",key:"z377f1"}],["polyline",{points:"21 12 16.5 14.6 16.5 19.79",key:"9nrev1"}],["polyline",{points:"3.27 6.96 12 12.01 20.73 6.96",key:"1180pa"}],["line",{x1:"12",x2:"12",y1:"22.08",y2:"12",key:"3z3uq6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=e("Coffee",[["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M14 2v2",key:"6buw04"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",key:"pwadti"}],["path",{d:"M6 2v2",key:"colzsn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bh=e("Cog",[["path",{d:"M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",key:"sobvz5"}],["path",{d:"M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",key:"11i496"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 22v-2",key:"1osdcq"}],["path",{d:"m17 20.66-1-1.73",key:"eq3orb"}],["path",{d:"M11 10.27 7 3.34",key:"16pf9h"}],["path",{d:"m20.66 17-1.73-1",key:"sg0v6f"}],["path",{d:"m3.34 7 1.73 1",key:"1ulond"}],["path",{d:"M14 12h8",key:"4f43i9"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"m20.66 7-1.73 1",key:"1ow05n"}],["path",{d:"m3.34 17 1.73-1",key:"nuk764"}],["path",{d:"m17 3.34-1 1.73",key:"2wel8s"}],["path",{d:"m11 13.73-4 6.93",key:"794ttg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=e("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=e("Columns2",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 3v18",key:"108xh3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=e("Columns3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ih=e("Columns4",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7.5 3v18",key:"w0wo6v"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M16.5 3v18",key:"10tjh1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sh=e("Combine",[["path",{d:"M10 18H5a3 3 0 0 1-3-3v-1",key:"ru65g8"}],["path",{d:"M14 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2",key:"e30een"}],["path",{d:"M20 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2",key:"2ahx8o"}],["path",{d:"m7 21 3-3-3-3",key:"127cv2"}],["rect",{x:"14",y:"14",width:"8",height:"8",rx:"2",key:"1b0bso"}],["rect",{x:"2",y:"2",width:"8",height:"8",rx:"2",key:"1x09vl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qh=e("Command",[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ah=e("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jh=e("Component",[["path",{d:"M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",key:"1uwlt4"}],["path",{d:"M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",key:"10291m"}],["path",{d:"M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",key:"1tqoq1"}],["path",{d:"M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",key:"1x6lto"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ph=e("Computer",[["rect",{width:"14",height:"8",x:"5",y:"2",rx:"2",key:"wc9tft"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",key:"w68u3i"}],["path",{d:"M6 18h2",key:"rwmk9e"}],["path",{d:"M12 18h6",key:"aqd8w3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zh=e("ConciergeBell",[["path",{d:"M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z",key:"1pvr1r"}],["path",{d:"M20 16a8 8 0 1 0-16 0",key:"1pa543"}],["path",{d:"M12 4v4",key:"1bq03y"}],["path",{d:"M10 4h4",key:"1xpv9s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hh=e("Cone",[["path",{d:"m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98",key:"53pte7"}],["ellipse",{cx:"12",cy:"19",rx:"9",ry:"3",key:"1ji25f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vh=e("Construction",[["rect",{x:"2",y:"6",width:"20",height:"8",rx:"1",key:"1estib"}],["path",{d:"M17 14v7",key:"7m2elx"}],["path",{d:"M7 14v7",key:"1cm7wv"}],["path",{d:"M17 3v3",key:"1v4jwn"}],["path",{d:"M7 3v3",key:"7o6guu"}],["path",{d:"M10 14 2.3 6.3",key:"1023jk"}],["path",{d:"m14 6 7.7 7.7",key:"1s8pl2"}],["path",{d:"m8 6 8 8",key:"hl96qh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=e("ContactRound",[["path",{d:"M16 2v2",key:"scm5qe"}],["path",{d:"M17.915 22a6 6 0 0 0-12 0",key:"suqz9p"}],["path",{d:"M8 2v2",key:"pbkmx"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",key:"12vinp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rh=e("Contact",[["path",{d:"M16 2v2",key:"scm5qe"}],["path",{d:"M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",key:"1waht3"}],["path",{d:"M8 2v2",key:"pbkmx"}],["circle",{cx:"12",cy:"11",r:"3",key:"itu57m"}],["rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",key:"12vinp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dh=e("Container",[["path",{d:"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",key:"1t2lqe"}],["path",{d:"M10 21.9V14L2.1 9.1",key:"o7czzq"}],["path",{d:"m10 14 11.9-6.9",key:"zm5e20"}],["path",{d:"M14 19.8v-8.1",key:"159ecu"}],["path",{d:"M18 17.5V9.4",key:"11uown"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Th=e("Contrast",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z",key:"j4l70d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fh=e("Cookie",[["path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5",key:"laymnq"}],["path",{d:"M8.5 8.5v.01",key:"ue8clq"}],["path",{d:"M16 15.5v.01",key:"14dtrp"}],["path",{d:"M12 12v.01",key:"u5ubse"}],["path",{d:"M11 17v.01",key:"1hyl5a"}],["path",{d:"M7 14v.01",key:"uct60s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bh=e("CookingPot",[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",key:"u0tga0"}],["path",{d:"m4 8 16-4",key:"16g0ng"}],["path",{d:"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",key:"12cejc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eh=e("CopyCheck",[["path",{d:"m12 15 2 2 4-4",key:"2c609p"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oh=e("CopyMinus",[["line",{x1:"12",x2:"18",y1:"15",y2:"15",key:"1nscbv"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uh=e("CopyPlus",[["line",{x1:"15",x2:"15",y1:"12",y2:"18",key:"1p7wdc"}],["line",{x1:"12",x2:"18",y1:"15",y2:"15",key:"1nscbv"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nh=e("CopySlash",[["line",{x1:"12",x2:"18",y1:"18",y2:"12",key:"ebkxgr"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _h=e("CopyX",[["line",{x1:"12",x2:"18",y1:"12",y2:"18",key:"1rg63v"}],["line",{x1:"12",x2:"18",y1:"18",y2:"12",key:"ebkxgr"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Go=e("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gh=e("Copyleft",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.17 14.83a4 4 0 1 0 0-5.66",key:"1sveal"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zh=e("Copyright",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M14.83 14.83a4 4 0 1 1 0-5.66",key:"1i56pz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wh=e("CornerDownLeft",[["polyline",{points:"9 10 4 15 9 20",key:"r3jprv"}],["path",{d:"M20 4v7a4 4 0 0 1-4 4H4",key:"6o5b7l"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xh=e("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kh=e("CornerLeftDown",[["polyline",{points:"14 15 9 20 4 15",key:"nkc4i"}],["path",{d:"M20 4h-7a4 4 0 0 0-4 4v12",key:"nbpdq2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $h=e("CornerLeftUp",[["polyline",{points:"14 9 9 4 4 9",key:"m9oyvo"}],["path",{d:"M20 20h-7a4 4 0 0 1-4-4V4",key:"1blwi3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qh=e("CornerRightDown",[["polyline",{points:"10 15 15 20 20 15",key:"axus6l"}],["path",{d:"M4 4h7a4 4 0 0 1 4 4v12",key:"wcbgct"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jh=e("CornerRightUp",[["polyline",{points:"10 9 15 4 20 9",key:"1lr6px"}],["path",{d:"M4 20h7a4 4 0 0 0 4-4V4",key:"1plgdj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yh=e("CornerUpLeft",[["polyline",{points:"9 14 4 9 9 4",key:"881910"}],["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4",key:"1nkjon"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const el=e("CornerUpRight",[["polyline",{points:"15 14 20 9 15 4",key:"1tbx3s"}],["path",{d:"M4 20v-7a4 4 0 0 1 4-4h12",key:"1lu4f8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=e("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const al=e("CreativeCommons",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",key:"1ss3eq"}],["path",{d:"M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",key:"1od56t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ol=e("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rl=e("Croissant",[["path",{d:"m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z",key:"1ozxlb"}],["path",{d:"m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83",key:"ffuyb5"}],["path",{d:"M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4",key:"osnpzi"}],["path",{d:"m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2",key:"1vubaw"}],["path",{d:"M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5",key:"wxr772"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nl=e("Crop",[["path",{d:"M6 2v14a2 2 0 0 0 2 2h14",key:"ron5a4"}],["path",{d:"M18 22V8a2 2 0 0 0-2-2H2",key:"7s9ehn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cl=e("Cross",[["path",{d:"M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",key:"1xbrqy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const il=e("Crosshair",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=e("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dl=e("Cuboid",[["path",{d:"m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z",key:"1u2ovd"}],["path",{d:"M10 22v-8L2.25 9.15",key:"11pn4q"}],["path",{d:"m10 14 11.77-6.87",key:"1kt1wh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sl=e("CupSoda",[["path",{d:"m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8",key:"8166m8"}],["path",{d:"M5 8h14",key:"pcz4l3"}],["path",{d:"M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0",key:"yjz344"}],["path",{d:"m12 8 1-6h2",key:"3ybfa4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hl=e("Currency",[["circle",{cx:"12",cy:"12",r:"8",key:"46899m"}],["line",{x1:"3",x2:"6",y1:"3",y2:"6",key:"1jkytn"}],["line",{x1:"21",x2:"18",y1:"3",y2:"6",key:"14zfjt"}],["line",{x1:"3",x2:"6",y1:"21",y2:"18",key:"iusuec"}],["line",{x1:"21",x2:"18",y1:"21",y2:"18",key:"yj2dd7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ll=e("Cylinder",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5v14a9 3 0 0 0 18 0V5",key:"aqi0yr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yl=e("Dam",[["path",{d:"M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"157kva"}],["path",{d:"M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"d7q6m6"}],["path",{d:"M2 10h4",key:"l0bgd4"}],["path",{d:"M2 14h4",key:"1gsvsf"}],["path",{d:"M2 18h4",key:"1bu2t1"}],["path",{d:"M2 6h4",key:"aawbzj"}],["path",{d:"M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z",key:"pr6s65"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pl=e("DatabaseBackup",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69",key:"1ui2ym"}],["path",{d:"M21 9.3V5",key:"6k6cib"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88",key:"i62tjy"}],["path",{d:"M12 12v4h4",key:"1bxaet"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",key:"1f4ei9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ul=e("DatabaseZap",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84",key:"14ibmq"}],["path",{d:"M21 5V8",key:"1marbg"}],["path",{d:"M21 12L18 17H22L19 22",key:"zafso"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87",key:"1y4wr8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kl=e("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ml=e("Delete",[["path",{d:"M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",key:"1yo7s0"}],["path",{d:"m12 9 6 6",key:"anjzzh"}],["path",{d:"m18 9-6 6",key:"1fp51s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=e("Dessert",[["circle",{cx:"12",cy:"4",r:"2",key:"muu5ef"}],["path",{d:"M10.2 3.2C5.5 4 2 8.1 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0c0-4.9-3.5-9-8.2-9.8",key:"lfo06j"}],["path",{d:"M3.2 14.8a9 9 0 0 0 17.6 0",key:"12xarc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vl=e("Diameter",[["circle",{cx:"19",cy:"19",r:"2",key:"17f5cg"}],["circle",{cx:"5",cy:"5",r:"2",key:"1gwv83"}],["path",{d:"M6.48 3.66a10 10 0 0 1 13.86 13.86",key:"xr8kdq"}],["path",{d:"m6.41 6.41 11.18 11.18",key:"uhpjw7"}],["path",{d:"M3.66 6.48a10 10 0 0 0 13.86 13.86",key:"cldpwv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=e("DiamondMinus",[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",key:"1ey20j"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=e("DiamondPercent",[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z",key:"1tpxz2"}],["path",{d:"M9.2 9.2h.01",key:"1b7bvt"}],["path",{d:"m14.5 9.5-5 5",key:"17q4r4"}],["path",{d:"M14.7 14.8h.01",key:"17nsh4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=e("DiamondPlus",[["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",key:"1ey20j"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zo=e("Diamond",[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",key:"1f1r0c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xl=e("Dice1",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wl=e("Dice2",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M15 9h.01",key:"x1ddxp"}],["path",{d:"M9 15h.01",key:"fzyn71"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ll=e("Dice3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cl=e("Dice4",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M8 8h.01",key:"1e4136"}],["path",{d:"M8 16h.01",key:"18s6g9"}],["path",{d:"M16 16h.01",key:"1f9h7w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=e("Dice5",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M8 8h.01",key:"1e4136"}],["path",{d:"M8 16h.01",key:"18s6g9"}],["path",{d:"M16 16h.01",key:"1f9h7w"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Il=e("Dice6",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M16 16h.01",key:"1f9h7w"}],["path",{d:"M8 8h.01",key:"1e4136"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sl=e("Dices",[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2",key:"6agr2n"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6",key:"1o487t"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M10 14h.01",key:"ssrbsk"}],["path",{d:"M15 6h.01",key:"cblpky"}],["path",{d:"M18 9h.01",key:"2061c0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ql=e("Diff",[["path",{d:"M12 3v14",key:"7cf3v8"}],["path",{d:"M5 10h14",key:"elsbfy"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Al=e("Disc2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jl=e("Disc3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M6 12c0-1.7.7-3.2 1.8-4.2",key:"oqkarx"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M18 12c0 1.7-.7 3.2-1.8 4.2",key:"1eah9h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pl=e("DiscAlbum",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["circle",{cx:"12",cy:"12",r:"5",key:"nd82uf"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zl=e("Disc",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=e("Divide",[["circle",{cx:"12",cy:"6",r:"1",key:"1bh7o1"}],["line",{x1:"5",x2:"19",y1:"12",y2:"12",key:"13b5wn"}],["circle",{cx:"12",cy:"18",r:"1",key:"lqb9t5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vl=e("DnaOff",[["path",{d:"M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8",key:"1bivrr"}],["path",{d:"m17 6-2.891-2.891",key:"xu6p2f"}],["path",{d:"M2 15c3.333-3 6.667-3 10-3",key:"nxix30"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"m20 9 .891.891",key:"3xwk7g"}],["path",{d:"M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1",key:"18cutr"}],["path",{d:"M3.109 14.109 4 15",key:"q76aoh"}],["path",{d:"m6.5 12.5 1 1",key:"cs35ky"}],["path",{d:"m7 18 2.891 2.891",key:"1sisit"}],["path",{d:"M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16",key:"rlvei3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rl=e("Dna",[["path",{d:"m10 16 1.5 1.5",key:"11lckj"}],["path",{d:"m14 8-1.5-1.5",key:"1ohn8i"}],["path",{d:"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993",key:"80uv8i"}],["path",{d:"m16.5 10.5 1 1",key:"696xn5"}],["path",{d:"m17 6-2.891-2.891",key:"xu6p2f"}],["path",{d:"M2 15c6.667-6 13.333 0 20-6",key:"1pyr53"}],["path",{d:"m20 9 .891.891",key:"3xwk7g"}],["path",{d:"M3.109 14.109 4 15",key:"q76aoh"}],["path",{d:"m6.5 12.5 1 1",key:"cs35ky"}],["path",{d:"m7 18 2.891 2.891",key:"1sisit"}],["path",{d:"M9 22c1.798-1.998 2.518-3.995 2.807-5.993",key:"q3hbxp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dl=e("Dock",[["path",{d:"M2 8h20",key:"d11cs7"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M6 16h12",key:"u522kt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=e("Dog",[["path",{d:"M11.25 16.25h1.5L12 17z",key:"w7jh35"}],["path",{d:"M16 14v.5",key:"1lajdz"}],["path",{d:"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",key:"u7s9ue"}],["path",{d:"M8 14v.5",key:"1nzgdb"}],["path",{d:"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",key:"v8hric"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wo=e("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fl=e("Donut",[["path",{d:"M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3",key:"19sr3x"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bl=e("DoorClosed",[["path",{d:"M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14",key:"36qu9e"}],["path",{d:"M2 20h20",key:"owomy5"}],["path",{d:"M14 12v.01",key:"xfcn54"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const El=e("DoorOpen",[["path",{d:"M13 4h3a2 2 0 0 1 2 2v14",key:"hrm0s9"}],["path",{d:"M2 20h3",key:"1gaodv"}],["path",{d:"M13 20h9",key:"s90cdi"}],["path",{d:"M10 12v.01",key:"vx6srw"}],["path",{d:"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z",key:"199qr4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ol=e("Dot",[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xo=e("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ul=e("DraftingCompass",[["path",{d:"m12.99 6.74 1.93 3.44",key:"iwagvd"}],["path",{d:"M19.136 12a10 10 0 0 1-14.271 0",key:"ppmlo4"}],["path",{d:"m21 21-2.16-3.84",key:"vylbct"}],["path",{d:"m3 21 8.02-14.26",key:"1ssaw4"}],["circle",{cx:"12",cy:"5",r:"2",key:"f1ur92"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nl=e("Drama",[["path",{d:"M10 11h.01",key:"d2at3l"}],["path",{d:"M14 6h.01",key:"k028ub"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6.5 13.1h.01",key:"1748ia"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",key:"172yzv"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0",key:"1obv0w"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",key:"rqjl8i"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",key:"1mr6wy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _l=e("Dribbble",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94",key:"hpej1"}],["path",{d:"M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32",key:"1tr44o"}],["path",{d:"M8.56 2.75c4.37 6 6 9.42 8 17.72",key:"kbh691"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gl=e("Drill",[["path",{d:"M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z",key:"ioqxb1"}],["path",{d:"M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8",key:"1rs59n"}],["path",{d:"M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3",key:"105ega"}],["path",{d:"M18 6h4",key:"66u95g"}],["path",{d:"m5 10-2 8",key:"xt2lic"}],["path",{d:"m7 18 2-8",key:"1bzku2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zl=e("Droplet",[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wl=e("Droplets",[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xl=e("Drum",[["path",{d:"m2 2 8 8",key:"1v6059"}],["path",{d:"m22 2-8 8",key:"173r8a"}],["ellipse",{cx:"12",cy:"9",rx:"10",ry:"5",key:"liohsx"}],["path",{d:"M7 13.4v7.9",key:"1yi6u9"}],["path",{d:"M12 14v8",key:"1tn2tj"}],["path",{d:"M17 13.4v7.9",key:"eqz2v3"}],["path",{d:"M2 9v8a10 5 0 0 0 20 0V9",key:"1750ul"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kl=e("Drumstick",[["path",{d:"M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23",key:"1dtqwm"}],["path",{d:"m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59",key:"1oq1fw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $l=e("Dumbbell",[["path",{d:"M14.4 14.4 9.6 9.6",key:"ic80wn"}],["path",{d:"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z",key:"nnl7wr"}],["path",{d:"m21.5 21.5-1.4-1.4",key:"1f1ice"}],["path",{d:"M3.9 3.9 2.5 2.5",key:"1evmna"}],["path",{d:"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z",key:"yhosts"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ql=e("EarOff",[["path",{d:"M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46",key:"1qngmn"}],["path",{d:"M6 8.5c0-.75.13-1.47.36-2.14",key:"b06bma"}],["path",{d:"M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76",key:"g10hsz"}],["path",{d:"M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18",key:"ygzou7"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jl=e("Ear",[["path",{d:"M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0",key:"1dfaln"}],["path",{d:"M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4",key:"1qnva7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yl=e("EarthLock",[["path",{d:"M7 3.34V5a3 3 0 0 0 3 3",key:"w732o8"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"f02343"}],["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M12 2a10 10 0 1 0 9.54 13",key:"zjsr6q"}],["path",{d:"M20 6V4a2 2 0 1 0-4 0v2",key:"1of5e8"}],["rect",{width:"8",height:"5",x:"14",y:"6",rx:"1",key:"1fmf51"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=e("Earth",[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",key:"1tzkfa"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"14pb5j"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ey=e("Eclipse",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a7 7 0 1 0 10 10",key:"1yuj32"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ty=e("EggFried",[["circle",{cx:"11.5",cy:"12.5",r:"3.5",key:"1cl1mi"}],["path",{d:"M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",key:"165ef9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ay=e("EggOff",[["path",{d:"M6.399 6.399C5.362 8.157 4.65 10.189 4.5 12c-.37 4.43 1.27 9.95 7.5 10 3.256-.026 5.259-1.547 6.375-3.625",key:"6et380"}],["path",{d:"M19.532 13.875A14.07 14.07 0 0 0 19.5 12c-.36-4.34-3.95-9.96-7.5-10-1.04.012-2.082.502-3.046 1.297",key:"gcdc3f"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oy=e("Egg",[["path",{d:"M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z",key:"1c39pg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=e("EllipsisVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=e("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ry=e("EqualApproximately",[["path",{d:"M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0",key:"yrdkhy"}],["path",{d:"M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0",key:"gzkvyz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny=e("EqualNot",[["line",{x1:"5",x2:"19",y1:"9",y2:"9",key:"1nwqeh"}],["line",{x1:"5",x2:"19",y1:"15",y2:"15",key:"g8yjpy"}],["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ko=e("Equal",[["line",{x1:"5",x2:"19",y1:"9",y2:"9",key:"1nwqeh"}],["line",{x1:"5",x2:"19",y1:"15",y2:"15",key:"g8yjpy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cy=e("Eraser",[["path",{d:"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",key:"182aya"}],["path",{d:"M22 21H7",key:"t4ddhn"}],["path",{d:"m5 11 9 9",key:"1mo9qw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy=e("EthernetPort",[["path",{d:"m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z",key:"rbahqx"}],["path",{d:"M6 8v1",key:"1636ez"}],["path",{d:"M10 8v1",key:"1talb4"}],["path",{d:"M14 8v1",key:"1rsfgr"}],["path",{d:"M18 8v1",key:"gnkwox"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=e("Euro",[["path",{d:"M4 10h12",key:"1y6xl8"}],["path",{d:"M4 14h9",key:"1loblj"}],["path",{d:"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",key:"1j6lzo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dy=e("Expand",[["path",{d:"m21 21-6-6m6 6v-4.8m0 4.8h-4.8",key:"1c15vz"}],["path",{d:"M3 16.2V21m0 0h4.8M3 21l6-6",key:"1fsnz2"}],["path",{d:"M21 7.8V3m0 0h-4.8M21 3l-6 6",key:"hawz9i"}],["path",{d:"M3 7.8V3m0 0h4.8M3 3l6 6",key:"u9ee12"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sy=e("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hy=e("EyeClosed",[["path",{d:"m15 18-.722-3.25",key:"1j64jw"}],["path",{d:"M2 8a10.645 10.645 0 0 0 20 0",key:"1e7gxb"}],["path",{d:"m20 15-1.726-2.05",key:"1cnuld"}],["path",{d:"m4 15 1.726-2.05",key:"1dsqqd"}],["path",{d:"m9 18 .722-3.25",key:"ypw2yx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2=e("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2=e("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ly=e("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yy=e("Factory",[["path",{d:"M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"159hny"}],["path",{d:"M17 18h1",key:"uldtlt"}],["path",{d:"M12 18h1",key:"s9uhes"}],["path",{d:"M7 18h1",key:"1neino"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const py=e("Fan",[["path",{d:"M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",key:"484a7f"}],["path",{d:"M12 12v.01",key:"u5ubse"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uy=e("FastForward",[["polygon",{points:"13 19 22 12 13 5 13 19",key:"587y9g"}],["polygon",{points:"2 19 11 12 2 5 2 19",key:"3pweh0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=e("Feather",[["path",{d:"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",key:"18jl4k"}],["path",{d:"M16 8 2 22",key:"vp34q"}],["path",{d:"M17.5 15H9",key:"1oz8nu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const My=e("Fence",[["path",{d:"M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",key:"1n2rgs"}],["path",{d:"M6 8h4",key:"utf9t1"}],["path",{d:"M6 18h4",key:"12yh4b"}],["path",{d:"m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",key:"3ha7mj"}],["path",{d:"M14 8h4",key:"1r8wg2"}],["path",{d:"M14 18h4",key:"1t3kbu"}],["path",{d:"m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",key:"dfd4e2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const my=e("FerrisWheel",[["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m6.8 15-3.5 2",key:"hjy98k"}],["path",{d:"m20.7 7-3.5 2",key:"f08gto"}],["path",{d:"M6.8 9 3.3 7",key:"1aevh4"}],["path",{d:"m20.7 17-3.5-2",key:"1liqo3"}],["path",{d:"m9 22 3-8 3 8",key:"wees03"}],["path",{d:"M8 22h8",key:"rmew8v"}],["path",{d:"M18 18.7a9 9 0 1 0-12 0",key:"dhzg4g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vy=e("Figma",[["path",{d:"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z",key:"1340ok"}],["path",{d:"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z",key:"1hz3m3"}],["path",{d:"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z",key:"1oz8n2"}],["path",{d:"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z",key:"1ff65i"}],["path",{d:"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z",key:"pdip6e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=e("FileArchive",[["path",{d:"M10 12v-1",key:"v7bkov"}],["path",{d:"M10 18v-2",key:"1cjy8d"}],["path",{d:"M10 7V6",key:"dljcrl"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01",key:"gkbcor"}],["circle",{cx:"10",cy:"20",r:"2",key:"1xzdoj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gy=e("FileAudio2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2",key:"17k7jt"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"3",cy:"17",r:"1",key:"vo6nti"}],["path",{d:"M2 17v-3a4 4 0 0 1 8 0v3",key:"1ggdre"}],["circle",{cx:"9",cy:"17",r:"1",key:"bc1fq4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xy=e("FileAudio",[["path",{d:"M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"rslqgf"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",key:"9f7x3i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=e("FileAxis3d",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m8 18 4-4",key:"12zab0"}],["path",{d:"M8 10v8h8",key:"tlaukw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wy=e("FileBadge2",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m14 12.5 1 5.5-3-1-3 1 1-5.5",key:"14xlky"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ly=e("FileBadge",[["path",{d:"M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"12ixgl"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",key:"u0c8gj"}],["path",{d:"M7 16.5 8 22l-3-1-3 1 1-5.5",key:"5gm2nr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cy=e("FileBox",[["path",{d:"M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"16lz6z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01Z",key:"99pj1s"}],["path",{d:"M7 17v5",key:"1yj1jh"}],["path",{d:"M11.7 14.2 7 17l-4.7-2.8",key:"1yk8tc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=e("FileChartColumnIncreasing",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 18v-2",key:"qcmpov"}],["path",{d:"M12 18v-4",key:"q1q25u"}],["path",{d:"M16 18v-6",key:"15y0np"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=e("FileChartColumn",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 18v-1",key:"zg0ygc"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"M16 18v-3",key:"j5jt4h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=e("FileChartLine",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m16 13-3.5 3.5-2-2L8 17",key:"zz7yod"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=e("FileChartPie",[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5",key:"13ddob"}],["path",{d:"M4.017 11.512a6 6 0 1 0 8.466 8.475",key:"s6vs5t"}],["path",{d:"M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z",key:"1dl6s6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by=e("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iy=e("FileCheck",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sy=e("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=e("FileCode2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m5 12-3 3 3 3",key:"oke12k"}],["path",{d:"m9 18 3-3-3-3",key:"112psh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ay=e("FileCode",[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=e("FileCog",[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3.2 12.9-.9-.4",key:"1i3dj5"}],["path",{d:"m3.2 15.1-.9.4",key:"1fvgj0"}],["path",{d:"M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5",key:"1yo3oz"}],["path",{d:"m4.9 11.2-.4-.9",key:"otmhb9"}],["path",{d:"m4.9 16.8-.4.9",key:"1b8z07"}],["path",{d:"m7.5 10.3-.4.9",key:"11k65u"}],["path",{d:"m7.5 17.7-.4-.9",key:"431x55"}],["path",{d:"m9.7 12.5-.9.4",key:"87sjan"}],["path",{d:"m9.7 15.5-.9-.4",key:"khqm91"}],["circle",{cx:"6",cy:"14",r:"3",key:"a1xfv6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jy=e("FileDiff",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M9 10h6",key:"9gxzsh"}],["path",{d:"M12 13V7",key:"h0r20n"}],["path",{d:"M9 17h6",key:"r8uit2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Py=e("FileDigit",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["rect",{width:"4",height:"6",x:"2",y:"12",rx:"2",key:"jm304g"}],["path",{d:"M10 12h2v6",key:"12zw74"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zy=e("FileDown",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hy=e("FileHeart",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2",key:"17k7jt"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z",key:"1c1fso"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vy=e("FileImage",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"10",cy:"12",r:"2",key:"737tya"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",key:"wt3hpn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ry=e("FileInput",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M2 15h10",key:"jfw4w8"}],["path",{d:"m9 18 3-3-3-3",key:"112psh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dy=e("FileJson2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"fq0c9t"}],["path",{d:"M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"4gibmv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ty=e("FileJson",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fy=e("FileKey2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v6",key:"rc0qvx"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"4",cy:"16",r:"2",key:"1ehqvc"}],["path",{d:"m10 10-4.5 4.5",key:"7fwrp6"}],["path",{d:"m9 11 1 1",key:"wa6s5q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const By=e("FileKey",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["circle",{cx:"10",cy:"16",r:"2",key:"4ckbqe"}],["path",{d:"m16 10-4.5 4.5",key:"7p3ebg"}],["path",{d:"m15 11 1 1",key:"1bsyx3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey=e("FileLock2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1",key:"jmtmu2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["rect",{width:"8",height:"5",x:"2",y:"13",rx:"1",key:"10y5wo"}],["path",{d:"M8 13v-2a2 2 0 1 0-4 0v2",key:"1pdxzg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oy=e("FileLock",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["rect",{width:"8",height:"6",x:"8",y:"12",rx:"1",key:"3yr8at"}],["path",{d:"M10 12v-2a2 2 0 1 1 4 0v2",key:"j4i8d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uy=e("FileMinus2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M3 15h6",key:"4e2qda"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ny=e("FileMinus",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M9 15h6",key:"cctwl0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _y=e("FileMusic",[["path",{d:"M10.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v8.4",key:"1d3kfm"}],["path",{d:"M8 18v-7.7L16 9v7",key:"1oie6o"}],["circle",{cx:"14",cy:"16",r:"2",key:"1bzzi3"}],["circle",{cx:"6",cy:"18",r:"2",key:"1fncim"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gy=e("FileOutput",[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2",key:"1vk7w2"}],["path",{d:"M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6",key:"1jink5"}],["path",{d:"m5 11-3 3",key:"1dgrs4"}],["path",{d:"m5 17-3-3h10",key:"1mvvaf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=e("FilePenLine",[["path",{d:"m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",key:"142zxg"}],["path",{d:"M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"2t3380"}],["path",{d:"M8 18h1",key:"13wk12"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=e("FilePen",[["path",{d:"M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5",key:"1couwa"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1y4qbx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zy=e("FilePlus2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M3 15h6",key:"4e2qda"}],["path",{d:"M6 12v6",key:"1u72j0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wy=e("FilePlus",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M9 15h6",key:"cctwl0"}],["path",{d:"M12 18v-6",key:"17g6i2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xy=e("FileQuestion",[["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ky=e("FileScan",[["path",{d:"M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4",key:"1rdf37"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M16 14a2 2 0 0 0-2 2",key:"ceaadl"}],["path",{d:"M20 14a2 2 0 0 1 2 2",key:"1ny6zw"}],["path",{d:"M20 22a2 2 0 0 0 2-2",key:"1l9q4k"}],["path",{d:"M16 22a2 2 0 0 1-2-2",key:"1wqh5n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $y=e("FileSearch2",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"11.5",cy:"14.5",r:"2.5",key:"1bq0ko"}],["path",{d:"M13.3 16.3 15 18",key:"2quom7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qy=e("FileSearch",[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"ms7g94"}],["path",{d:"m9 18-1.5-1.5",key:"1j6qii"}],["circle",{cx:"5",cy:"14",r:"3",key:"ufru5t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=e("FileSliders",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M10 11v2",key:"1s651w"}],["path",{d:"M8 17h8",key:"wh5c61"}],["path",{d:"M14 16v2",key:"12fp5e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yy=e("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ep=e("FileStack",[["path",{d:"M21 7h-3a2 2 0 0 1-2-2V2",key:"9rb54x"}],["path",{d:"M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z",key:"1059l0"}],["path",{d:"M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15",key:"16874u"}],["path",{d:"M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11",key:"k2ox98"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tp=e("FileSymlink",[["path",{d:"m10 18 3-3-3-3",key:"18f6ys"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",key:"50q2rw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ap=e("FileTerminal",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m8 16 2-2-2-2",key:"10vzyd"}],["path",{d:"M12 18h4",key:"1wd2n7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const op=e("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=e("FileType2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M2 13v-1h6v1",key:"1dh9dg"}],["path",{d:"M5 12v6",key:"150t9c"}],["path",{d:"M4 18h2",key:"1xrofg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=e("FileType",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M9 13v-1h6v1",key:"1bb014"}],["path",{d:"M12 12v6",key:"3ahymv"}],["path",{d:"M11 18h2",key:"12mj7e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=e("FileUp",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 12v6",key:"3ahymv"}],["path",{d:"m15 15-3-3-3 3",key:"15xj92"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ip=e("FileUser",[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 18a3 3 0 1 0-6 0",key:"16awa0"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}],["circle",{cx:"12",cy:"13",r:"2",key:"1c1ljs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=e("FileVideo2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["rect",{width:"8",height:"6",x:"2",y:"12",rx:"1",key:"1a6c1e"}],["path",{d:"m10 15.5 4 2.5v-6l-4 2.5",key:"t7cp39"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sp=e("FileVideo",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=e("FileVolume2",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M11.5 13.5a2.5 2.5 0 0 1 0 3",key:"1fccat"}],["path",{d:"M15 12a5 5 0 0 1 0 6",key:"ps46cm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=e("FileVolume",[["path",{d:"M11 11a5 5 0 0 1 0 6",key:"193qb2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M4 6.765V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-.93-.23",key:"ifyjnl"}],["path",{d:"M7 10.51a.5.5 0 0 0-.826-.38l-1.893 1.628A1 1 0 0 1 3.63 12H2.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.129a1 1 0 0 1 .652.242l1.893 1.63a.5.5 0 0 0 .826-.38z",key:"mk8rxu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=e("FileWarning",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=e("FileX2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m8 12.5-5 5",key:"b853mi"}],["path",{d:"m3 12.5 5 5",key:"1qls4r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=e("FileX",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m14.5 12.5-5 5",key:"b62r18"}],["path",{d:"m9.5 12.5 5 5",key:"1rk7el"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=e("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mp=e("Files",[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2",key:"x099mo"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z",key:"18t6ie"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8",key:"1nja0z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=e("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=e("FilterX",[["path",{d:"M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055",key:"1fi1da"}],["path",{d:"m22 3-5 5",key:"12jva0"}],["path",{d:"m17 3 5 5",key:"k36vhe"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=e("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=e("Fingerprint",[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",key:"1nerag"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88",key:"o46ks0"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02",key:"ptglia"}],["path",{d:"M2 12a10 10 0 0 1 18-6",key:"ydlgp0"}],["path",{d:"M2 16h.01",key:"1gqxmh"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6",key:"drycrb"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",key:"1tidbn"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2",key:"13wd9y"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2",key:"1fr1j5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=e("FireExtinguisher",[["path",{d:"M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5",key:"sqyvz"}],["path",{d:"M9 18h8",key:"i7pszb"}],["path",{d:"M18 3h-3",key:"7idoqj"}],["path",{d:"M11 3a6 6 0 0 0-6 6v11",key:"1v5je3"}],["path",{d:"M5 13h4",key:"svpcxo"}],["path",{d:"M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z",key:"vsjego"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=e("FishOff",[["path",{d:"M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058",key:"1j1hse"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618",key:"1q46z8"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20",key:"1407gh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lp=e("FishSymbol",[["path",{d:"M2 16s9-15 20-4C11 23 2 8 2 8",key:"h4oh4o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=e("Fish",[["path",{d:"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",key:"15baut"}],["path",{d:"M18 12v.5",key:"18hhni"}],["path",{d:"M16 17.93a9.77 9.77 0 0 1 0-11.86",key:"16dt7o"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",key:"l9di03"}],["path",{d:"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",key:"1kjonw"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",key:"1zlm23"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=e("FlagOff",[["path",{d:"M8 2c3 0 5 2 8 2s4-1 4-1v11",key:"9rwyz9"}],["path",{d:"M4 22V4",key:"1plyxx"}],["path",{d:"M4 15s1-1 4-1 5 2 8 2",key:"1myooe"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ip=e("FlagTriangleLeft",[["path",{d:"M17 22V2L7 7l10 5",key:"1rmf0r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=e("FlagTriangleRight",[["path",{d:"M7 22V2l10 5-10 5",key:"17n18y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qo=e("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qp=e("FlameKindling",[["path",{d:"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",key:"1ir223"}],["path",{d:"m5 22 14-4",key:"1brv4h"}],["path",{d:"m5 18 14 4",key:"lgyyje"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ap=e("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jp=e("FlashlightOff",[["path",{d:"M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4",key:"1r120k"}],["path",{d:"M7 2h11v4c0 2-2 2-2 4v1",key:"dz1920"}],["line",{x1:"11",x2:"18",y1:"6",y2:"6",key:"bi1vpe"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pp=e("Flashlight",[["path",{d:"M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z",key:"1orkel"}],["line",{x1:"6",x2:"18",y1:"6",y2:"6",key:"1z11jq"}],["line",{x1:"12",x2:"12",y1:"12",y2:"12",key:"1f4yc1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=e("FlaskConicalOff",[["path",{d:"M10 10 4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-1.272-2.542",key:"59ek9y"}],["path",{d:"M10 2v2.343",key:"15t272"}],["path",{d:"M14 2v6.343",key:"sxr80q"}],["path",{d:"M8.5 2h7",key:"csnxdl"}],["path",{d:"M7 16h9",key:"t5njau"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=e("FlaskConical",[["path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2",key:"pzvekw"}],["path",{d:"M8.5 2h7",key:"csnxdl"}],["path",{d:"M7 16h10",key:"wp8him"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=e("FlaskRound",[["path",{d:"M10 2v7.31",key:"5d1hyh"}],["path",{d:"M14 9.3V1.99",key:"14k4l0"}],["path",{d:"M8.5 2h7",key:"csnxdl"}],["path",{d:"M14 9.3a6.5 6.5 0 1 1-4 0",key:"1r8fvy"}],["path",{d:"M5.52 16h12.96",key:"46hh1i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rp=e("FlipHorizontal2",[["path",{d:"m3 7 5 5-5 5V7",key:"couhi7"}],["path",{d:"m21 7-5 5 5 5V7",key:"6ouia7"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=e("FlipHorizontal",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",key:"1i73f7"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",key:"saxlbk"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=e("FlipVertical2",[["path",{d:"m17 3-5 5-5-5h10",key:"1ftt6x"}],["path",{d:"m17 21-5-5-5 5h10",key:"1m0wmu"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=e("FlipVertical",[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",key:"14bfxa"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",key:"14rx03"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=e("Flower2",[["path",{d:"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",key:"3pnvol"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M12 10v12",key:"6ubwww"}],["path",{d:"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z",key:"9hd38g"}],["path",{d:"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z",key:"ufn41s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=e("Flower",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5",key:"14wa3c"}],["path",{d:"M12 7.5V9",key:"1oy5b0"}],["path",{d:"M7.5 12H9",key:"eltsq1"}],["path",{d:"M16.5 12H15",key:"vk5kw4"}],["path",{d:"M12 16.5V15",key:"k7eayi"}],["path",{d:"m8 8 1.88 1.88",key:"nxy4qf"}],["path",{d:"M14.12 9.88 16 8",key:"1lst6k"}],["path",{d:"m8 16 1.88-1.88",key:"h2eex1"}],["path",{d:"M14.12 14.12 16 16",key:"uqkrx3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Op=e("Focus",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=e("FoldHorizontal",[["path",{d:"M2 12h6",key:"1wqiqv"}],["path",{d:"M22 12h-6",key:"1eg9hc"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m19 9-3 3 3 3",key:"12ol22"}],["path",{d:"m5 15 3-3-3-3",key:"1kdhjc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Np=e("FoldVertical",[["path",{d:"M12 22v-6",key:"6o8u61"}],["path",{d:"M12 8V2",key:"1wkif3"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}],["path",{d:"m15 19-3-3-3 3",key:"e37ymu"}],["path",{d:"m15 5-3 3-3-3",key:"19d6lf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _p=e("FolderArchive",[["circle",{cx:"15",cy:"19",r:"2",key:"u2pros"}],["path",{d:"M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1",key:"1jj40k"}],["path",{d:"M15 11v-1",key:"cntcp"}],["path",{d:"M15 17v-2",key:"1279jj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=e("FolderCheck",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"m9 13 2 2 4-4",key:"6343dt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zp=e("FolderClock",[["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}],["path",{d:"M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2",key:"1urifu"}],["path",{d:"M16 14v2l1 1",key:"xth2jh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=e("FolderClosed",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M2 10h20",key:"1ir3d8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=e("FolderCode",[["path",{d:"M10 10.5 8 13l2 2.5",key:"m4t9c1"}],["path",{d:"m14 10.5 2 2.5-2 2.5",key:"14w2eb"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",key:"1u1bxd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=e("FolderCog",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["path",{d:"M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3",key:"1k8050"}],["path",{d:"m21.7 19.4-.9-.3",key:"1qgwi9"}],["path",{d:"m15.2 16.9-.9-.3",key:"1t7mvx"}],["path",{d:"m16.6 21.7.3-.9",key:"1j67ps"}],["path",{d:"m19.1 15.2.3-.9",key:"18r7jp"}],["path",{d:"m19.6 21.7-.4-1",key:"z2vh2"}],["path",{d:"m16.8 15.3-.4-1",key:"1ei7r6"}],["path",{d:"m14.3 19.6 1-.4",key:"11sv9r"}],["path",{d:"m20.7 16.8 1-.4",key:"19m87a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=e("FolderDot",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["circle",{cx:"12",cy:"13",r:"1",key:"49l61u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=e("FolderDown",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"m15 13-3 3-3-3",key:"6j2sf0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=e("FolderGit2",[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",key:"1w6njk"}],["circle",{cx:"13",cy:"12",r:"2",key:"1j92g6"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8",key:"pkpw2h"}],["circle",{cx:"20",cy:"19",r:"2",key:"1obnsp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=e("FolderGit",[["circle",{cx:"12",cy:"13",r:"2",key:"1c1ljs"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M14 13h3",key:"1dgedf"}],["path",{d:"M7 13h3",key:"1pygq7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=e("FolderHeart",[["path",{d:"M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.5",key:"6hud8k"}],["path",{d:"M13.9 17.45c-1.2-1.2-1.14-2.8-.2-3.73a2.43 2.43 0 0 1 3.44 0l.36.34.34-.34a2.43 2.43 0 0 1 3.45-.01c.95.95 1 2.53-.2 3.74L17.5 21Z",key:"wpff58"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=e("FolderInput",[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",key:"fm4g5t"}],["path",{d:"M2 13h10",key:"pgb2dq"}],["path",{d:"m9 16 3-3-3-3",key:"6m91ic"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tu=e("FolderKanban",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=e("FolderKey",[["circle",{cx:"16",cy:"20",r:"2",key:"1vifvg"}],["path",{d:"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2",key:"3hgo9p"}],["path",{d:"m22 14-4.5 4.5",key:"1ef6z8"}],["path",{d:"m21 15 1 1",key:"1ejcpy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ou=e("FolderLock",[["rect",{width:"8",height:"5",x:"14",y:"17",rx:"1",key:"19aais"}],["path",{d:"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",key:"1w6v7t"}],["path",{d:"M20 17v-2a2 2 0 1 0-4 0v2",key:"pwaxnr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ru=e("FolderMinus",[["path",{d:"M9 13h6",key:"1uhe8q"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nu=e("FolderOpenDot",[["path",{d:"m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2",key:"1nmvlm"}],["circle",{cx:"14",cy:"15",r:"1",key:"1gm4qj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cu=e("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=e("FolderOutput",[["path",{d:"M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5",key:"1yk7aj"}],["path",{d:"M2 13h10",key:"pgb2dq"}],["path",{d:"m5 10-3 3 3 3",key:"1r8ie0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=e("FolderPen",[["path",{d:"M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5",key:"a8xqs0"}],["path",{d:"M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1saktj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const du=e("FolderPlus",[["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=e("FolderRoot",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["circle",{cx:"12",cy:"13",r:"2",key:"1c1ljs"}],["path",{d:"M12 15v5",key:"11xva1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hu=e("FolderSearch2",[["circle",{cx:"11.5",cy:"12.5",r:"2.5",key:"1ea5ju"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M13.3 14.3 15 16",key:"1y4v1n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=e("FolderSearch",[["path",{d:"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",key:"1bw5m7"}],["path",{d:"m21 21-1.9-1.9",key:"1g2n9r"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yu=e("FolderSymlink",[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",key:"x1c07l"}],["path",{d:"m8 16 3-3-3-3",key:"rlqrt1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pu=e("FolderSync",[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",key:"1dkoa9"}],["path",{d:"M12 10v4h4",key:"1czhmt"}],["path",{d:"m12 14 1.535-1.605a5 5 0 0 1 8 1.5",key:"lvuxfi"}],["path",{d:"M22 22v-4h-4",key:"1ewp4q"}],["path",{d:"m22 18-1.535 1.605a5 5 0 0 1-8-1.5",key:"14ync0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uu=e("FolderTree",[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"hod4my"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"w4yl2u"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3",key:"f2jnh7"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3",key:"k8epm1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ku=e("FolderUp",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"m9 13 3-3 3 3",key:"1pxg3c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mu=e("FolderX",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"m9.5 10.5 5 5",key:"ra9qjz"}],["path",{d:"m14.5 10.5-5 5",key:"l2rkpq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=e("Folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mu=e("Folders",[["path",{d:"M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z",key:"4u7rpt"}],["path",{d:"M2 8v11a2 2 0 0 0 2 2h14",key:"1eicx1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vu=e("Footprints",[["path",{d:"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",key:"1dudjm"}],["path",{d:"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",key:"l2t8xc"}],["path",{d:"M16 17h4",key:"1dejxt"}],["path",{d:"M4 13h4",key:"1bwh8b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fu=e("Forklift",[["path",{d:"M12 12H5a2 2 0 0 0-2 2v5",key:"7zsz91"}],["circle",{cx:"13",cy:"19",r:"2",key:"wjnkru"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5",key:"13bk1p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gu=e("Forward",[["polyline",{points:"15 17 20 12 15 7",key:"1w3sku"}],["path",{d:"M4 18v-2a4 4 0 0 1 4-4h12",key:"jmiej9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xu=e("Frame",[["line",{x1:"22",x2:"2",y1:"6",y2:"6",key:"15w7dq"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18",key:"1ip48p"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22",key:"a2lnyx"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22",key:"8vb6jd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wu=e("Framer",[["path",{d:"M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7",key:"1a2nng"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lu=e("Frown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2",key:"epbg0q"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jo=e("Fuel",[["line",{x1:"3",x2:"15",y1:"22",y2:"22",key:"xegly4"}],["line",{x1:"4",x2:"14",y1:"9",y2:"9",key:"xcnuvu"}],["path",{d:"M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18",key:"16j0yd"}],["path",{d:"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5",key:"7cu91f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cu=e("Fullscreen",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["rect",{width:"10",height:"8",x:"7",y:"8",rx:"1",key:"vys8me"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bu=e("GalleryHorizontalEnd",[["path",{d:"M2 7v10",key:"a2pl2d"}],["path",{d:"M6 5v14",key:"1kq3d7"}],["rect",{width:"12",height:"18",x:"10",y:"3",rx:"2",key:"13i7bc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iu=e("GalleryHorizontal",[["path",{d:"M2 3v18",key:"pzttux"}],["rect",{width:"12",height:"18",x:"6",y:"3",rx:"2",key:"btr8bg"}],["path",{d:"M22 3v18",key:"6jf3v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Su=e("GalleryThumbnails",[["rect",{width:"18",height:"14",x:"3",y:"3",rx:"2",key:"74y24f"}],["path",{d:"M4 21h1",key:"16zlid"}],["path",{d:"M9 21h1",key:"15o7lz"}],["path",{d:"M14 21h1",key:"v9vybs"}],["path",{d:"M19 21h1",key:"edywat"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qu=e("GalleryVerticalEnd",[["path",{d:"M7 2h10",key:"nczekb"}],["path",{d:"M5 6h14",key:"u2x4p"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2",key:"l0tzu3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Au=e("GalleryVertical",[["path",{d:"M3 2h18",key:"15qxfx"}],["rect",{width:"18",height:"12",x:"3",y:"6",rx:"2",key:"1439r6"}],["path",{d:"M3 22h18",key:"8prr45"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ju=e("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=e("Gamepad",[["line",{x1:"6",x2:"10",y1:"12",y2:"12",key:"161bw2"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"15",x2:"15.01",y1:"13",y2:"13",key:"dqpgro"}],["line",{x1:"18",x2:"18.01",y1:"11",y2:"11",key:"meh2c"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pu=e("Gauge",[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zu=e("Gavel",[["path",{d:"m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8",key:"15492f"}],["path",{d:"m16 16 6-6",key:"vzrcl6"}],["path",{d:"m8 8 6-6",key:"18bi4p"}],["path",{d:"m9 7 8 8",key:"5jnvq1"}],["path",{d:"m21 11-8-8",key:"z4y7zo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hu=e("Gem",[["path",{d:"M6 3h12l4 6-10 13L2 9Z",key:"1pcd5k"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6",key:"1fcu3u"}],["path",{d:"M2 9h20",key:"16fsjt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vu=e("Ghost",[["path",{d:"M9 10h.01",key:"qbtxuw"}],["path",{d:"M15 10h.01",key:"1qmjsl"}],["path",{d:"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",key:"uwwb07"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yo=e("Gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ru=e("GitBranchPlus",[["path",{d:"M6 3v12",key:"qpgusn"}],["path",{d:"M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",key:"1d02ji"}],["path",{d:"M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",key:"chk6ph"}],["path",{d:"M15 6a9 9 0 0 0-9 9",key:"or332x"}],["path",{d:"M18 15v6",key:"9wciyi"}],["path",{d:"M21 18h-6",key:"139f0c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Du=e("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=e("GitCommitHorizontal",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["line",{x1:"3",x2:"9",y1:"12",y2:"12",key:"1dyftd"}],["line",{x1:"15",x2:"21",y1:"12",y2:"12",key:"oup4p8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tu=e("GitCommitVertical",[["path",{d:"M12 3v6",key:"1holv5"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M12 15v6",key:"a9ows0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fu=e("GitCompareArrows",[["circle",{cx:"5",cy:"6",r:"3",key:"1qnov2"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7",key:"1yj91y"}],["path",{d:"m15 9-3-3 3-3",key:"1lwv8l"}],["circle",{cx:"19",cy:"18",r:"3",key:"1qljk2"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9",key:"16sdep"}],["path",{d:"m9 15 3 3-3 3",key:"1m3kbl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bu=e("GitCompare",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7",key:"1yeb86"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9",key:"19pyzm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eu=e("GitFork",[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ou=e("GitGraph",[["circle",{cx:"5",cy:"6",r:"3",key:"1qnov2"}],["path",{d:"M5 9v6",key:"158jrl"}],["circle",{cx:"5",cy:"18",r:"3",key:"104gr9"}],["path",{d:"M12 3v18",key:"108xh3"}],["circle",{cx:"19",cy:"6",r:"3",key:"108a5v"}],["path",{d:"M16 15.7A9 9 0 0 0 19 9",key:"1e3vqb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uu=e("GitMerge",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M6 21V9a9 9 0 0 0 9 9",key:"7kw0sc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nu=e("GitPullRequestArrow",[["circle",{cx:"5",cy:"6",r:"3",key:"1qnov2"}],["path",{d:"M5 9v12",key:"ih889a"}],["circle",{cx:"19",cy:"18",r:"3",key:"1qljk2"}],["path",{d:"m15 9-3-3 3-3",key:"1lwv8l"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7",key:"1yj91y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _u=e("GitPullRequestClosed",[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M6 9v12",key:"1sc30k"}],["path",{d:"m21 3-6 6",key:"16nqsk"}],["path",{d:"m21 9-6-6",key:"9j17rh"}],["path",{d:"M18 11.5V15",key:"65xf6f"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gu=e("GitPullRequestCreateArrow",[["circle",{cx:"5",cy:"6",r:"3",key:"1qnov2"}],["path",{d:"M5 9v12",key:"ih889a"}],["path",{d:"m15 9-3-3 3-3",key:"1lwv8l"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v3",key:"1rbwk6"}],["path",{d:"M19 15v6",key:"10aioa"}],["path",{d:"M22 18h-6",key:"1d5gi5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zu=e("GitPullRequestCreate",[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M6 9v12",key:"1sc30k"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v3",key:"1jb6z3"}],["path",{d:"M18 15v6",key:"9wciyi"}],["path",{d:"M21 18h-6",key:"139f0c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wu=e("GitPullRequestDraft",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M18 6V5",key:"1oao2s"}],["path",{d:"M18 11v-1",key:"11c8tz"}],["line",{x1:"6",x2:"6",y1:"9",y2:"21",key:"rroup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xu=e("GitPullRequest",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7",key:"1yeb86"}],["line",{x1:"6",x2:"6",y1:"9",y2:"21",key:"rroup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ku=e("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $u=e("Gitlab",[["path",{d:"m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z",key:"148pdi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qu=e("GlassWater",[["path",{d:"M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z",key:"p55z4y"}],["path",{d:"M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0",key:"mjntcy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ju=e("Glasses",[["circle",{cx:"6",cy:"15",r:"4",key:"vux9w4"}],["circle",{cx:"18",cy:"15",r:"4",key:"18o8ve"}],["path",{d:"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2",key:"1ag4bs"}],["path",{d:"M2.5 13 5 7c.7-1.3 1.4-2 3-2",key:"1hm1gs"}],["path",{d:"M21.5 13 19 7c-.7-1.3-1.5-2-3-2",key:"1r31ai"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yu=e("GlobeLock",[["path",{d:"M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",key:"qkt0x6"}],["path",{d:"M2 12h8.5",key:"ovaggd"}],["path",{d:"M20 6V4a2 2 0 1 0-4 0v2",key:"1of5e8"}],["rect",{width:"8",height:"5",x:"14",y:"6",rx:"1",key:"1fmf51"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const er=e("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e4=e("Goal",[["path",{d:"M12 13V2l8 4-8 4",key:"5wlwwj"}],["path",{d:"M20.561 10.222a9 9 0 1 1-12.55-5.29",key:"1c0wjv"}],["path",{d:"M8.002 9.997a5 5 0 1 0 8.9 2.02",key:"gb1g7m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t4=e("Grab",[["path",{d:"M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4",key:"edstyy"}],["path",{d:"M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",key:"19wdwo"}],["path",{d:"M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5",key:"1lugqo"}],["path",{d:"M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2",key:"1hbeus"}],["path",{d:"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0",key:"1etffm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tr=e("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a4=e("Grape",[["path",{d:"M22 5V2l-5.89 5.89",key:"1eenpo"}],["circle",{cx:"16.6",cy:"15.89",r:"3",key:"xjtalx"}],["circle",{cx:"8.11",cy:"7.4",r:"3",key:"u2fv6i"}],["circle",{cx:"12.35",cy:"11.65",r:"3",key:"i6i8g7"}],["circle",{cx:"13.91",cy:"5.85",r:"3",key:"6ye0dv"}],["circle",{cx:"18.15",cy:"10.09",r:"3",key:"snx9no"}],["circle",{cx:"6.56",cy:"13.2",r:"3",key:"17x4xg"}],["circle",{cx:"10.8",cy:"17.44",r:"3",key:"1hogw9"}],["circle",{cx:"5",cy:"19",r:"3",key:"1sn6vo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o4=e("Grid2x2Check",[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",key:"11za1p"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=e("Grid2x2Plus",[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",key:"11za1p"}],["path",{d:"M16 19h6",key:"xwg31i"}],["path",{d:"M19 22v-6",key:"qhmiwi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r4=e("Grid2x2X",[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",key:"11za1p"}],["path",{d:"m16 16 5 5",key:"8tpb07"}],["path",{d:"m16 21 5-5",key:"193jll"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=e("Grid2x2",[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 12h18",key:"1i2n21"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=e("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n4=e("GripHorizontal",[["circle",{cx:"12",cy:"9",r:"1",key:"124mty"}],["circle",{cx:"19",cy:"9",r:"1",key:"1ruzo2"}],["circle",{cx:"5",cy:"9",r:"1",key:"1a8b28"}],["circle",{cx:"12",cy:"15",r:"1",key:"1e56xg"}],["circle",{cx:"19",cy:"15",r:"1",key:"1a92ep"}],["circle",{cx:"5",cy:"15",r:"1",key:"5r1jwy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c4=e("GripVertical",[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i4=e("Grip",[["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"19",cy:"5",r:"1",key:"w8mnmm"}],["circle",{cx:"5",cy:"5",r:"1",key:"lttvr7"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}],["circle",{cx:"19",cy:"19",r:"1",key:"shf9b7"}],["circle",{cx:"5",cy:"19",r:"1",key:"bfqh0e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d4=e("Group",[["path",{d:"M3 7V5c0-1.1.9-2 2-2h2",key:"adw53z"}],["path",{d:"M17 3h2c1.1 0 2 .9 2 2v2",key:"an4l38"}],["path",{d:"M21 17v2c0 1.1-.9 2-2 2h-2",key:"144t0e"}],["path",{d:"M7 21H5c-1.1 0-2-.9-2-2v-2",key:"rtnfgi"}],["rect",{width:"7",height:"5",x:"7",y:"7",rx:"1",key:"1eyiv7"}],["rect",{width:"7",height:"5",x:"10",y:"12",rx:"1",key:"1qlmkx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s4=e("Guitar",[["path",{d:"m11.9 12.1 4.514-4.514",key:"109xqo"}],["path",{d:"M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z",key:"txyc8t"}],["path",{d:"m6 16 2 2",key:"16qmzd"}],["path",{d:"M8.2 9.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4 2 2 0 0 0 1.8-1.2z",key:"1u8q3z"}],["circle",{cx:"11.5",cy:"12.5",r:".5",fill:"currentColor",key:"16onso"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h4=e("Ham",[["path",{d:"M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856",key:"1k1t7q"}],["path",{d:"M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",key:"153t1g"}],["path",{d:"M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",key:"gzrt0n"}],["path",{d:"m8.5 16.5-1-1",key:"otr954"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=e("Hammer",[["path",{d:"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9",key:"eefl8a"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"b7pghm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l4=e("HandCoins",[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y4=e("HandHeart",[["path",{d:"M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16",key:"1ifwr1"}],["path",{d:"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"17abbs"}],["path",{d:"m2 15 6 6",key:"10dquu"}],["path",{d:"M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z",key:"1h3036"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=e("HandHelping",[["path",{d:"M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14",key:"1j4xps"}],["path",{d:"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"uospg8"}],["path",{d:"m2 13 6 6",key:"16e5sb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p4=e("HandMetal",[["path",{d:"M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4",key:"wc6myp"}],["path",{d:"M14 11V9a2 2 0 1 0-4 0v2",key:"94qvcw"}],["path",{d:"M10 10.5V5a2 2 0 1 0-4 0v9",key:"m1ah89"}],["path",{d:"m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",key:"t1skq1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u4=e("HandPlatter",[["path",{d:"M12 3V2",key:"ar7q03"}],["path",{d:"m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5",key:"n2g93r"}],["path",{d:"M2 14h12a2 2 0 0 1 0 4h-2",key:"1o2jem"}],["path",{d:"M4 10h16",key:"img6z1"}],["path",{d:"M5 10a7 7 0 0 1 14 0",key:"1ega1o"}],["path",{d:"M5 14v6a1 1 0 0 1-1 1H2",key:"1hescx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k4=e("Hand",[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",key:"1fvzgz"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",key:"1kc0my"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",key:"10h0bg"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M4=e("Handshake",[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m4=e("HardDriveDownload",[["path",{d:"M12 2v8",key:"1q4o3n"}],["path",{d:"m16 6-4 4-4-4",key:"6wukr"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",key:"w68u3i"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M10 18h.01",key:"h775k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v4=e("HardDriveUpload",[["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M12 2v8",key:"1q4o3n"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",key:"w68u3i"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M10 18h.01",key:"h775k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f4=e("HardDrive",[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g4=e("HardHat",[["path",{d:"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5",key:"1p9q5i"}],["path",{d:"M14 6a6 6 0 0 1 6 6v3",key:"1hnv84"}],["path",{d:"M4 15v-3a6 6 0 0 1 6-6",key:"9ciidu"}],["rect",{x:"2",y:"15",width:"20",height:"4",rx:"1",key:"g3x8cw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=e("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x4=e("Haze",[["path",{d:"m5.2 6.2 1.4 1.4",key:"17imol"}],["path",{d:"M2 13h2",key:"13gyu8"}],["path",{d:"M20 13h2",key:"16rner"}],["path",{d:"m17.4 7.6 1.4-1.4",key:"t4xlah"}],["path",{d:"M22 17H2",key:"1gtaj3"}],["path",{d:"M22 21H2",key:"1gy6en"}],["path",{d:"M16 13a4 4 0 0 0-8 0",key:"1dyczq"}],["path",{d:"M12 5V2.5",key:"1vytko"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w4=e("HdmiPort",[["path",{d:"M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z",key:"2128wb"}],["path",{d:"M7.5 12h9",key:"1t0ckc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L4=e("Heading1",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"m17 12 3-2v8",key:"1hhhft"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C4=e("Heading2",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",key:"9jr5yi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b4=e("Heading3",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2",key:"68ncm8"}],["path",{d:"M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2",key:"1ejuhz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I4=e("Heading4",[["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M17 10v3a1 1 0 0 0 1 1h3",key:"tj5zdr"}],["path",{d:"M21 10v8",key:"1kdml4"}],["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S4=e("Heading5",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M17 13v-3h4",key:"1nvgqp"}],["path",{d:"M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17",key:"2nebdn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q4=e("Heading6",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["circle",{cx:"19",cy:"16",r:"2",key:"15mx69"}],["path",{d:"M20 10c-2 2-3 3.5-3 6",key:"f35dl0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A4=e("Heading",[["path",{d:"M6 12h12",key:"8npq4p"}],["path",{d:"M6 20V4",key:"1w1bmo"}],["path",{d:"M18 20V4",key:"o2hl4u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j4=e("HeadphoneOff",[["path",{d:"M21 14h-1.343",key:"1jdnxi"}],["path",{d:"M9.128 3.47A9 9 0 0 1 21 12v3.343",key:"6kipu2"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3",key:"9x50f4"}],["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364",key:"1bkxnm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P4=e("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z4=e("Headset",[["path",{d:"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",key:"12oyoe"}],["path",{d:"M21 16v2a4 4 0 0 1-4 4h-5",key:"1x7m43"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H4=e("HeartCrack",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"m12 13-1-1 2-2-3-3 2-2",key:"xjdxli"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V4=e("HeartHandshake",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66",key:"4oyue0"}],["path",{d:"m18 15-2-2",key:"60u0ii"}],["path",{d:"m15 18-2-2",key:"6p76be"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R4=e("HeartOff",[["line",{x1:"2",y1:"2",x2:"22",y2:"22",key:"1w4vcy"}],["path",{d:"M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35",key:"3mpagl"}],["path",{d:"M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17",key:"1gh3v3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D4=e("HeartPulse",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"1uw2ng"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=e("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T4=e("Heater",[["path",{d:"M11 8c2-3-2-3 0-6",key:"1ldv5m"}],["path",{d:"M15.5 8c2-3-2-3 0-6",key:"1otqoz"}],["path",{d:"M6 10h.01",key:"1lbq93"}],["path",{d:"M6 14h.01",key:"zudwn7"}],["path",{d:"M10 16v-4",key:"1c25yv"}],["path",{d:"M14 16v-4",key:"1dkbt8"}],["path",{d:"M18 16v-4",key:"1yg9me"}],["path",{d:"M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3",key:"1ubg90"}],["path",{d:"M5 20v2",key:"1abpe8"}],["path",{d:"M19 20v2",key:"kqn6ft"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rr=e("Hexagon",[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F4=e("Highlighter",[["path",{d:"m9 11-6 6v3h9l3-3",key:"1a3l36"}],["path",{d:"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",key:"14a9rk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B4=e("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E4=e("HopOff",[["path",{d:"M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27",key:"qyzcap"}],["path",{d:"M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28",key:"y078lb"}],["path",{d:"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26",key:"1utre3"}],["path",{d:"M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25",key:"17o9hm"}],["path",{d:"M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75",key:"1d1n4p"}],["path",{d:"M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24",key:"9uv3tt"}],["path",{d:"M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28",key:"1292wz"}],["path",{d:"M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05",key:"7ozu9p"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O4=e("Hop",[["path",{d:"M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18",key:"18lxf1"}],["path",{d:"M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88",key:"vtfxrw"}],["path",{d:"M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36",key:"13hl71"}],["path",{d:"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87",key:"1sl8oj"}],["path",{d:"M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08",key:"19c6kt"}],["path",{d:"M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57",key:"85ghs3"}],["path",{d:"M4.93 4.93 3 3a.7.7 0 0 1 0-1",key:"x087yj"}],["path",{d:"M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15",key:"11xdqo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U4=e("Hospital",[["path",{d:"M12 6v4",key:"16clxf"}],["path",{d:"M14 14h-4",key:"esezmu"}],["path",{d:"M14 18h-4",key:"16mqa2"}],["path",{d:"M14 8h-4",key:"z8ypaz"}],["path",{d:"M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",key:"b1k337"}],["path",{d:"M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18",key:"16g51d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N4=e("Hotel",[["path",{d:"M10 22v-6.57",key:"1wmca3"}],["path",{d:"M12 11h.01",key:"z322tv"}],["path",{d:"M12 7h.01",key:"1ivr5q"}],["path",{d:"M14 15.43V22",key:"1q2vjd"}],["path",{d:"M15 16a5 5 0 0 0-6 0",key:"o9wqvi"}],["path",{d:"M16 11h.01",key:"xkw8gn"}],["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 7h.01",key:"1vti4s"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _4=e("Hourglass",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G4=e("HousePlug",[["path",{d:"M10 12V8.964",key:"1vll13"}],["path",{d:"M14 12V8.964",key:"1x3qvg"}],["path",{d:"M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z",key:"ppykja"}],["path",{d:"M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",key:"1gvg2z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z4=e("HousePlus",[["path",{d:"M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354",key:"5phn05"}],["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M15 6h6",key:"1jlkvy"}],["path",{d:"M18 3v6",key:"x1uolp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=e("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=e("IceCreamBowl",[["path",{d:"M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0",key:"1uxfcu"}],["path",{d:"M12.14 11a3.5 3.5 0 1 1 6.71 0",key:"4k3m1s"}],["path",{d:"M15.5 6.5a3.5 3.5 0 1 0-7 0",key:"zmuahr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=e("IceCreamCone",[["path",{d:"m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11",key:"1v6356"}],["path",{d:"M17 7A5 5 0 0 0 7 7",key:"151p3v"}],["path",{d:"M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4",key:"1sdaij"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W4=e("IdCard",[["path",{d:"M16 10h2",key:"8sgtl7"}],["path",{d:"M16 14h2",key:"epxaof"}],["path",{d:"M6.17 15a3 3 0 0 1 5.66 0",key:"n6f512"}],["circle",{cx:"9",cy:"11",r:"2",key:"yxgjnd"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2",key:"qneu4z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X4=e("ImageDown",[["path",{d:"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",key:"9csbqa"}],["path",{d:"m14 19 3 3v-5.5",key:"9ldu5r"}],["path",{d:"m17 22 3-3",key:"1nkfve"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K4=e("ImageMinus",[["path",{d:"M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",key:"m87ecr"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5",key:"ez7e4s"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $4=e("ImageOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83",key:"1bzlo9"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21",key:"1q0aeu"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15",key:"5mozeu"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",key:"mmje98"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q4=e("ImagePlay",[["path",{d:"m11 16-5 5",key:"j5f7ct"}],["path",{d:"M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5",key:"7s81lt"}],["path",{d:"M15.765 22a.5.5 0 0 1-.765-.424V13.38a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z",key:"1omb6s"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J4=e("ImagePlus",[["path",{d:"M16 5h6",key:"1vod17"}],["path",{d:"M19 2v6",key:"4bpg5p"}],["path",{d:"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",key:"1ue2ih"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y4=e("ImageUp",[["path",{d:"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",key:"9csbqa"}],["path",{d:"m14 19.5 3-3 3 3",key:"9vmjn0"}],["path",{d:"M17 22v-5.5",key:"1aa6fl"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ek=e("ImageUpscale",[["path",{d:"M16 3h5v5",key:"1806ms"}],["path",{d:"M17 21h2a2 2 0 0 0 2-2",key:"130fy9"}],["path",{d:"M21 12v3",key:"1wzk3p"}],["path",{d:"m21 3-5 5",key:"1g5oa7"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2",key:"kk3yz1"}],["path",{d:"m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19",key:"fyekpt"}],["path",{d:"M9 3h3",key:"d52fa"}],["rect",{x:"3",y:"11",width:"10",height:"10",rx:"1",key:"1wpmix"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tk=e("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ak=e("Images",[["path",{d:"M18 22H4a2 2 0 0 1-2-2V6",key:"pblm9e"}],["path",{d:"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18",key:"nf6bnh"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["rect",{width:"16",height:"16",x:"6",y:"2",rx:"2",key:"12espp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ok=e("Import",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m8 11 4 4 4-4",key:"1dohi6"}],["path",{d:"M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",key:"1ywtjm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rk=e("Inbox",[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=e("IndentDecrease",[["path",{d:"M21 12H11",key:"wd7e0v"}],["path",{d:"M21 18H11",key:"4wu86t"}],["path",{d:"M21 6H11",key:"6dy1d6"}],["path",{d:"m7 8-4 4 4 4",key:"o5hrat"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=e("IndentIncrease",[["path",{d:"M21 12H11",key:"wd7e0v"}],["path",{d:"M21 18H11",key:"4wu86t"}],["path",{d:"M21 6H11",key:"6dy1d6"}],["path",{d:"m3 8 4 4-4 4",key:"1a3j6y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nk=e("IndianRupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ck=e("Infinity",[["path",{d:"M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z",key:"1z0uae"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ik=e("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dk=e("InspectionPanel",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 7h.01",key:"7u93v4"}],["path",{d:"M17 7h.01",key:"14a9sn"}],["path",{d:"M7 17h.01",key:"19xn7k"}],["path",{d:"M17 17h.01",key:"1sd3ek"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sk=e("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hk=e("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lk=e("IterationCcw",[["path",{d:"M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8",key:"4znkd0"}],["polyline",{points:"16 14 20 18 16 22",key:"11njsm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yk=e("IterationCw",[["path",{d:"M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4",key:"tuf4su"}],["polyline",{points:"8 22 4 18 8 14",key:"evkj9s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pk=e("JapaneseYen",[["path",{d:"M12 9.5V21m0-11.5L6 3m6 6.5L18 3",key:"2ej80x"}],["path",{d:"M6 15h12",key:"1hwgt5"}],["path",{d:"M6 11h12",key:"wf4gp6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uk=e("Joystick",[["path",{d:"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",key:"jg2n2t"}],["path",{d:"M6 15v-2",key:"gd6mvg"}],["path",{d:"M12 15V9",key:"8c7uyn"}],["circle",{cx:"12",cy:"6",r:"3",key:"1gm2ql"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kk=e("Kanban",[["path",{d:"M6 5v11",key:"mdvv1e"}],["path",{d:"M12 5v6",key:"14ar3b"}],["path",{d:"M18 5v14",key:"7ji314"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mk=e("KeyRound",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mk=e("KeySquare",[["path",{d:"M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z",key:"165ttr"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814",key:"1ubxi2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=e("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vk=e("KeyboardMusic",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M6 8h4",key:"utf9t1"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M6 12v4",key:"dy92yo"}],["path",{d:"M10 12v4",key:"1fxnav"}],["path",{d:"M14 12v4",key:"1hft58"}],["path",{d:"M18 12v4",key:"tjjnbz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fk=e("KeyboardOff",[["path",{d:"M 20 4 A2 2 0 0 1 22 6",key:"1g1fkt"}],["path",{d:"M 22 6 L 22 16.41",key:"1qjg3w"}],["path",{d:"M 7 16 L 16 16",key:"n0yqwb"}],["path",{d:"M 9.69 4 L 20 4",key:"kbpcgx"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",key:"s23sx2"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M8 12h.01",key:"czm47f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gk=e("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xk=e("LampCeiling",[["path",{d:"M12 2v5",key:"nd4vlx"}],["path",{d:"M6 7h12l4 9H2l4-9Z",key:"123d64"}],["path",{d:"M9.17 16a3 3 0 1 0 5.66 0",key:"1061mw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wk=e("LampDesk",[["path",{d:"m14 5-3 3 2 7 8-8-7-2Z",key:"1b0msb"}],["path",{d:"m14 5-3 3-3-3 3-3 3 3Z",key:"1uemms"}],["path",{d:"M9.5 6.5 4 12l3 6",key:"1bx08v"}],["path",{d:"M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z",key:"wap775"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lk=e("LampFloor",[["path",{d:"M9 2h6l3 7H6l3-7Z",key:"wcx6mj"}],["path",{d:"M12 9v13",key:"3n1su1"}],["path",{d:"M9 22h6",key:"1rlq3v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ck=e("LampWallDown",[["path",{d:"M11 13h6l3 7H8l3-7Z",key:"9n3qlo"}],["path",{d:"M14 13V8a2 2 0 0 0-2-2H8",key:"1hu4hb"}],["path",{d:"M4 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4v6Z",key:"s053bc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bk=e("LampWallUp",[["path",{d:"M11 4h6l3 7H8l3-7Z",key:"11x1ee"}],["path",{d:"M14 11v5a2 2 0 0 1-2 2H8",key:"eutp5o"}],["path",{d:"M4 15h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6Z",key:"1iuthr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ik=e("Lamp",[["path",{d:"M8 2h8l4 10H4L8 2Z",key:"9dma5w"}],["path",{d:"M12 12v6",key:"3ahymv"}],["path",{d:"M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z",key:"mwf4oh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sk=e("LandPlot",[["path",{d:"m12 8 6-3-6-3v10",key:"mvpnpy"}],["path",{d:"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12",key:"ek95tt"}],["path",{d:"m6.49 12.85 11.02 6.3",key:"1kt42w"}],["path",{d:"M17.51 12.85 6.5 19.15",key:"v55bdg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qk=e("Landmark",[["line",{x1:"3",x2:"21",y1:"22",y2:"22",key:"j8o0r"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11",key:"10tf0k"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11",key:"54lgf6"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11",key:"380y"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11",key:"1kevvc"}],["polygon",{points:"12 2 20 7 4 7",key:"jkujk7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ak=e("Languages",[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jk=e("LaptopMinimalCheck",[["path",{d:"M2 20h20",key:"owomy5"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}],["rect",{x:"3",y:"4",width:"18",height:"12",rx:"2",key:"8ur36m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=e("LaptopMinimal",[["rect",{width:"18",height:"12",x:"3",y:"4",rx:"2",ry:"2",key:"1qhy41"}],["line",{x1:"2",x2:"22",y1:"20",y2:"20",key:"ni3hll"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=e("Laptop",[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",key:"tarvll"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pk=e("LassoSelect",[["path",{d:"M7 22a5 5 0 0 1-2-4",key:"umushi"}],["path",{d:"M7 16.93c.96.43 1.96.74 2.99.91",key:"ybbtv3"}],["path",{d:"M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2",key:"gt5e1w"}],["path",{d:"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",key:"bq3ynw"}],["path",{d:"M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z",key:"72q637"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zk=e("Lasso",[["path",{d:"M7 22a5 5 0 0 1-2-4",key:"umushi"}],["path",{d:"M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8a12 12 0 0 1-5-1",key:"146dds"}],["path",{d:"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",key:"bq3ynw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hk=e("Laugh",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",key:"b2q4dd"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vk=e("Layers2",[["path",{d:"m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12",key:"1cuww1"}],["path",{d:"M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z",key:"pdlvxu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rk=e("Layers3",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59",key:"1e5n1m"}],["path",{d:"m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59",key:"1iwflc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dk=e("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tk=e("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fk=e("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bk=e("LayoutList",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}],["path",{d:"M14 4h7",key:"3xa0d5"}],["path",{d:"M14 9h7",key:"1icrd9"}],["path",{d:"M14 15h7",key:"1mj8o2"}],["path",{d:"M14 20h7",key:"11slyb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ek=e("LayoutPanelLeft",[["rect",{width:"7",height:"18",x:"3",y:"3",rx:"1",key:"2obqm"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ok=e("LayoutPanelTop",[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uk=e("LayoutTemplate",[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1",key:"jqznyg"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1",key:"q5h2i8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nk=e("Leaf",[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",key:"nnexq3"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",key:"mt58a7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _k=e("LeafyGreen",[["path",{d:"M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22",key:"1134nt"}],["path",{d:"M2 22 17 7",key:"1q7jp2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gk=e("Lectern",[["path",{d:"M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3",key:"13jjxg"}],["path",{d:"M18 6V3a1 1 0 0 0-1-1h-3",key:"1550fe"}],["rect",{width:"8",height:"12",x:"8",y:"10",rx:"1",key:"qmu8b6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zk=e("LetterText",[["path",{d:"M15 12h6",key:"upa0zy"}],["path",{d:"M15 6h6",key:"1jlkvy"}],["path",{d:"m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13",key:"blevx4"}],["path",{d:"M3 18h18",key:"1h113x"}],["path",{d:"M4 11h6",key:"olkgv1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wk=e("LibraryBig",[["rect",{width:"8",height:"18",x:"3",y:"3",rx:"1",key:"oynpb5"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",key:"1qboyk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xk=e("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kk=e("LifeBuoy",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.93 4.93 4.24 4.24",key:"1ymg45"}],["path",{d:"m14.83 9.17 4.24-4.24",key:"1cb5xl"}],["path",{d:"m14.83 14.83 4.24 4.24",key:"q42g0n"}],["path",{d:"m9.17 14.83-4.24 4.24",key:"bqpfvv"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $k=e("Ligature",[["path",{d:"M8 20V8c0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2",key:"1rtphz"}],["path",{d:"M6 12h4",key:"a4o3ry"}],["path",{d:"M14 12h2v8",key:"c1fccl"}],["path",{d:"M6 20h4",key:"1i6q5t"}],["path",{d:"M14 20h4",key:"lzx1xo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qk=e("LightbulbOff",[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",key:"1fkcox"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",key:"10m8kw"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jk=e("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yk=e("Link2Off",[["path",{d:"M9 17H7A5 5 0 0 1 7 7",key:"10o201"}],["path",{d:"M15 7h2a5 5 0 0 1 4 8",key:"1d3206"}],["line",{x1:"8",x2:"12",y1:"12",y2:"12",key:"rvw6j4"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e5=e("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t5=e("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a5=e("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o5=e("ListCheck",[["path",{d:"M11 18H3",key:"n3j2dh"}],["path",{d:"m15 18 2 2 4-4",key:"1szwhi"}],["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 6H3",key:"1wxfjs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r5=e("ListChecks",[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n5=e("ListCollapse",[["path",{d:"m3 10 2.5-2.5L3 5",key:"i6eama"}],["path",{d:"m3 19 2.5-2.5L3 14",key:"w2gmor"}],["path",{d:"M10 6h11",key:"c7qv1k"}],["path",{d:"M10 12h11",key:"6m4ad9"}],["path",{d:"M10 18h11",key:"11hvi2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c5=e("ListEnd",[["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M10 18H3",key:"13769t"}],["path",{d:"M21 6v10a2 2 0 0 1-2 2h-5",key:"ilrcs8"}],["path",{d:"m16 16-2 2 2 2",key:"kkc6pm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i5=e("ListFilter",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M7 12h10",key:"b7w52i"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d5=e("ListMinus",[["path",{d:"M11 12H3",key:"51ecnj"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M21 12h-6",key:"bt1uis"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s5=e("ListMusic",[["path",{d:"M21 15V6",key:"h1cx4g"}],["path",{d:"M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",key:"8saifv"}],["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h5=e("ListOrdered",[["path",{d:"M10 12h11",key:"6m4ad9"}],["path",{d:"M10 18h11",key:"11hvi2"}],["path",{d:"M10 6h11",key:"c7qv1k"}],["path",{d:"M4 10h2",key:"16xx2s"}],["path",{d:"M4 6h1v4",key:"cnovpq"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",key:"m9a95d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l5=e("ListPlus",[["path",{d:"M11 12H3",key:"51ecnj"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M18 9v6",key:"1twb98"}],["path",{d:"M21 12h-6",key:"bt1uis"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y5=e("ListRestart",[["path",{d:"M21 6H3",key:"1jwq7v"}],["path",{d:"M7 12H3",key:"13ou7f"}],["path",{d:"M7 18H3",key:"1sijw9"}],["path",{d:"M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",key:"qth677"}],["path",{d:"M11 10v4h4",key:"172dkj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p5=e("ListStart",[["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M10 6H3",key:"lf8lx7"}],["path",{d:"M21 18V8a2 2 0 0 0-2-2h-5",key:"1hghli"}],["path",{d:"m16 8-2-2 2-2",key:"160uvd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u5=e("ListTodo",[["rect",{x:"3",y:"5",width:"6",height:"6",rx:"1",key:"1defrl"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k5=e("ListTree",[["path",{d:"M21 12h-8",key:"1bmf0i"}],["path",{d:"M21 6H8",key:"1pqkrb"}],["path",{d:"M21 18h-8",key:"1tm79t"}],["path",{d:"M3 6v4c0 1.1.9 2 2 2h3",key:"1ywdgy"}],["path",{d:"M3 10v6c0 1.1.9 2 2 2h3",key:"2wc746"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M5=e("ListVideo",[["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}],["path",{d:"m16 12 5 3-5 3v-6Z",key:"zpskkp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m5=e("ListX",[["path",{d:"M11 12H3",key:"51ecnj"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"m19 10-4 4",key:"1tz659"}],["path",{d:"m15 10 4 4",key:"1n7nei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v5=e("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=e("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f5=e("LoaderPinwheel",[["path",{d:"M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0",key:"1lzz15"}],["path",{d:"M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6",key:"1gnrpi"}],["path",{d:"M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6",key:"u9yy5q"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g5=e("Loader",[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x5=e("LocateFixed",[["line",{x1:"2",x2:"5",y1:"12",y2:"12",key:"bvdh0s"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12",key:"1tbv5k"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5",key:"11lu5j"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}],["circle",{cx:"12",cy:"12",r:"7",key:"fim9np"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w5=e("LocateOff",[["line",{x1:"2",x2:"5",y1:"12",y2:"12",key:"bvdh0s"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12",key:"1tbv5k"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5",key:"11lu5j"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}],["path",{d:"M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11",key:"1oh7ia"}],["path",{d:"M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29",key:"3qdecy"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L5=e("Locate",[["line",{x1:"2",x2:"5",y1:"12",y2:"12",key:"bvdh0s"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12",key:"1tbv5k"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5",key:"11lu5j"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}],["circle",{cx:"12",cy:"12",r:"7",key:"fim9np"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=e("LockKeyholeOpen",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2",key:"l0tzu3"}],["path",{d:"M7 10V7a5 5 0 0 1 9.33-2.5",key:"car5b7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C5=e("LockKeyhole",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2",key:"6s8ecr"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3",key:"1pqi11"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r1=e("LockOpen",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ko=e("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b5=e("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I5=e("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S5=e("Logs",[["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M3 12h1",key:"lp3yf2"}],["path",{d:"M3 18h1",key:"1eiwyy"}],["path",{d:"M3 6h1",key:"rgxa97"}],["path",{d:"M8 12h1",key:"1con00"}],["path",{d:"M8 18h1",key:"13wk12"}],["path",{d:"M8 6h1",key:"tn6mkg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q5=e("Lollipop",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}],["path",{d:"M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0",key:"107gwy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A5=e("Luggage",[["path",{d:"M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2",key:"1m57jg"}],["path",{d:"M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14",key:"1l99gc"}],["path",{d:"M10 20h4",key:"ni2waw"}],["circle",{cx:"16",cy:"20",r:"2",key:"1vifvg"}],["circle",{cx:"8",cy:"20",r:"2",key:"ckkr5m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j5=e("Magnet",[["path",{d:"m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15",key:"1i3lhw"}],["path",{d:"m5 8 4 4",key:"j6kj7e"}],["path",{d:"m12 15 4 4",key:"lnac28"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P5=e("MailCheck",[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",key:"12jkf8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z5=e("MailMinus",[["path",{d:"M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",key:"fuxbkv"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"M16 19h6",key:"xwg31i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H5=e("MailOpen",[["path",{d:"M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",key:"1jhwl8"}],["path",{d:"m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10",key:"1qfld7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V5=e("MailPlus",[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",key:"12jkf8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"M19 16v6",key:"tddt3s"}],["path",{d:"M16 19h6",key:"xwg31i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R5=e("MailQuestion",[["path",{d:"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5",key:"e61zoh"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",key:"7z9rxb"}],["path",{d:"M20 22v.01",key:"12bgn6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D5=e("MailSearch",[["path",{d:"M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5",key:"w80f2v"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",key:"8lzu5m"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["path",{d:"m22 22-1.5-1.5",key:"1x83k4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T5=e("MailWarning",[["path",{d:"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5",key:"e61zoh"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"M20 14v4",key:"1hm744"}],["path",{d:"M20 22v.01",key:"12bgn6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F5=e("MailX",[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9",key:"1j9vog"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"m17 17 4 4",key:"1b3523"}],["path",{d:"m21 17-4 4",key:"uinynz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=e("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B5=e("Mailbox",[["path",{d:"M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z",key:"1lbycx"}],["polyline",{points:"15,9 18,9 18,11",key:"1pm9c0"}],["path",{d:"M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2",key:"15i455"}],["line",{x1:"6",x2:"7",y1:"10",y2:"10",key:"1e2scm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E5=e("Mails",[["rect",{width:"16",height:"13",x:"6",y:"4",rx:"2",key:"1drq3f"}],["path",{d:"m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7",key:"xn252p"}],["path",{d:"M2 8v11c0 1.1.9 2 2 2h14",key:"n13cji"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O5=e("MapPinCheckInside",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U5=e("MapPinCheck",[["path",{d:"M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728",key:"1dq61d"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"m16 18 2 2 4-4",key:"1mkfmb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N5=e("MapPinHouse",[["path",{d:"M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z",key:"1p1rcz"}],["path",{d:"M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2",key:"mcbcs9"}],["path",{d:"M18 22v-3",key:"1t1ugv"}],["circle",{cx:"10",cy:"10",r:"3",key:"1ns7v1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _5=e("MapPinMinusInside",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["path",{d:"M9 10h6",key:"9gxzsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G5=e("MapPinMinus",[["path",{d:"M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",key:"11uxia"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M16 18h6",key:"987eiv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z5=e("MapPinOff",[["path",{d:"M12.75 7.09a3 3 0 0 1 2.16 2.16",key:"1d4wjd"}],["path",{d:"M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568",key:"12yil7"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533",key:"lhrkcz"}],["path",{d:"M9.13 9.13a3 3 0 0 0 3.74 3.74",key:"13wojd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W5=e("MapPinPlusInside",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["path",{d:"M12 7v6",key:"lw1j43"}],["path",{d:"M9 10h6",key:"9gxzsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X5=e("MapPinPlus",[["path",{d:"M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",key:"fcdtly"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M16 18h6",key:"987eiv"}],["path",{d:"M19 15v6",key:"10aioa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K5=e("MapPinXInside",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["path",{d:"m14.5 7.5-5 5",key:"3lb6iw"}],["path",{d:"m9.5 7.5 5 5",key:"ko136h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $5=e("MapPinX",[["path",{d:"M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077",key:"y0ewhp"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"m21.5 15.5-5 5",key:"11iqnx"}],["path",{d:"m21.5 20.5-5-5",key:"1bylgx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=e("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q5=e("MapPinned",[["path",{d:"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",key:"11u0oz"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",key:"q8zwxj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J5=e("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y5=e("Martini",[["path",{d:"M8 22h8",key:"rmew8v"}],["path",{d:"M12 11v11",key:"ur9y6a"}],["path",{d:"m19 3-7 8-7-8Z",key:"1sgpiw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e3=e("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t3=e("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a3=e("Medal",[["path",{d:"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",key:"143lza"}],["path",{d:"M11 12 5.12 2.2",key:"qhuxz6"}],["path",{d:"m13 12 5.88-9.8",key:"hbye0f"}],["path",{d:"M8 7h8",key:"i86dvs"}],["circle",{cx:"12",cy:"17",r:"5",key:"qbz8iq"}],["path",{d:"M12 18v-2h-.5",key:"fawc4q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o3=e("MegaphoneOff",[["path",{d:"M9.26 9.26 3 11v3l14.14 3.14",key:"3429n"}],["path",{d:"M21 15.34V6l-7.31 2.03",key:"4o1dh8"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r3=e("Megaphone",[["path",{d:"m3 11 18-5v12L3 14v-3z",key:"n962bs"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n3=e("Meh",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"8",x2:"16",y1:"15",y2:"15",key:"1xb1d9"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c3=e("MemoryStick",[["path",{d:"M6 19v-3",key:"1nvgqn"}],["path",{d:"M10 19v-3",key:"iu8nkm"}],["path",{d:"M14 19v-3",key:"kcehxu"}],["path",{d:"M18 19v-3",key:"1vh91z"}],["path",{d:"M8 11V9",key:"63erz4"}],["path",{d:"M16 11V9",key:"fru6f3"}],["path",{d:"M12 11V9",key:"ha00sb"}],["path",{d:"M2 15h20",key:"16ne18"}],["path",{d:"M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z",key:"lhddv3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i3=e("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d3=e("Merge",[["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}],["path",{d:"M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22",key:"1hyw0i"}],["path",{d:"m20 22-5-5",key:"1m27yz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s3=e("MessageCircleCode",[["path",{d:"M10 9.5 8 12l2 2.5",key:"3mjy60"}],["path",{d:"m14 9.5 2 2.5-2 2.5",key:"1bir2l"}],["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22z",key:"k85zhp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h3=e("MessageCircleDashed",[["path",{d:"M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1",key:"16ll65"}],["path",{d:"M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1",key:"1nq77a"}],["path",{d:"M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5",key:"1sf7wn"}],["path",{d:"M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1",key:"x1hs5g"}],["path",{d:"M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1",key:"19m18z"}],["path",{d:"M3.5 17.5 2 22l4.5-1.5",key:"1f36qi"}],["path",{d:"M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5",key:"1vz3ju"}],["path",{d:"M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1",key:"19f9do"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l3=e("MessageCircleHeart",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7",key:"43lnbm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y3=e("MessageCircleMore",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 12h.01",key:"1l6xoz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p3=e("MessageCircleOff",[["path",{d:"M20.5 14.9A9 9 0 0 0 9.1 3.5",key:"1iebmn"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7",key:"1ov8ce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u3=e("MessageCirclePlus",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k3=e("MessageCircleQuestion",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M3=e("MessageCircleReply",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}],["path",{d:"M7 12h7a2 2 0 0 1 2 2v1",key:"1gheu4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m3=e("MessageCircleWarning",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v3=e("MessageCircleX",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dr=e("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f3=e("MessageSquareCode",[["path",{d:"M10 7.5 8 10l2 2.5",key:"xb17xw"}],["path",{d:"m14 7.5 2 2.5-2 2.5",key:"5rap1v"}],["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g3=e("MessageSquareDashed",[["path",{d:"M10 17H7l-4 4v-7",key:"1r71xu"}],["path",{d:"M14 17h1",key:"nufu4t"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M21 14v1a2 2 0 0 1-2 2",key:"29akq3"}],["path",{d:"M21 9v1",key:"mxsmne"}],["path",{d:"M3 9v1",key:"1r0deq"}],["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M9 3h1",key:"1yesri"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x3=e("MessageSquareDiff",[["path",{d:"m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2",key:"1xuzuj"}],["path",{d:"M9 10h6",key:"9gxzsh"}],["path",{d:"M12 7v6",key:"lw1j43"}],["path",{d:"M9 17h6",key:"r8uit2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w3=e("MessageSquareDot",[["path",{d:"M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7",key:"uodpkb"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L3=e("MessageSquareHeart",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8",key:"1blaws"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C3=e("MessageSquareLock",[["path",{d:"M19 15v-2a2 2 0 1 0-4 0v2",key:"h3d1vz"}],["path",{d:"M9 17H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3.5",key:"xsnnhn"}],["rect",{x:"13",y:"15",width:"8",height:"5",rx:"1",key:"1ccwuk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b3=e("MessageSquareMore",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M16 10h.01",key:"1m94wz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I3=e("MessageSquareOff",[["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10",key:"pwpm4a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S3=e("MessageSquarePlus",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M12 7v6",key:"lw1j43"}],["path",{d:"M9 10h6",key:"9gxzsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q3=e("MessageSquareQuote",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M8 12a2 2 0 0 0 2-2V8H8",key:"1jfesj"}],["path",{d:"M14 12a2 2 0 0 0 2-2V8h-2",key:"1dq9mh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A3=e("MessageSquareReply",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"m10 7-3 3 3 3",key:"1eugdv"}],["path",{d:"M17 13v-1a2 2 0 0 0-2-2H7",key:"ernfh3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j3=e("MessageSquareShare",[["path",{d:"M21 12v3a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h7",key:"tqtdkg"}],["path",{d:"M16 3h5v5",key:"1806ms"}],["path",{d:"m16 8 5-5",key:"15mbrl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P3=e("MessageSquareText",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M13 8H7",key:"14i4kc"}],["path",{d:"M17 12H7",key:"16if0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z3=e("MessageSquareWarning",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M12 7v2",key:"stiyo7"}],["path",{d:"M12 13h.01",key:"y0uutt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H3=e("MessageSquareX",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"m14.5 7.5-5 5",key:"3lb6iw"}],["path",{d:"m9.5 7.5 5 5",key:"ko136h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V3=e("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R3=e("MessagesSquare",[["path",{d:"M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z",key:"p1xzt8"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",key:"1cx29u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D3=e("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=e("MicVocal",[["path",{d:"m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",key:"80a601"}],["path",{d:"M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",key:"j0ngtp"}],["circle",{cx:"16",cy:"7",r:"5",key:"d08jfb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T3=e("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F3=e("Microchip",[["path",{d:"M18 12h2",key:"quuxs7"}],["path",{d:"M18 16h2",key:"zsn3lv"}],["path",{d:"M18 20h2",key:"9x5y9y"}],["path",{d:"M18 4h2",key:"1luxfb"}],["path",{d:"M18 8h2",key:"nxqzg"}],["path",{d:"M4 12h2",key:"1ltxp0"}],["path",{d:"M4 16h2",key:"8a5zha"}],["path",{d:"M4 20h2",key:"27dk57"}],["path",{d:"M4 4h2",key:"10groj"}],["path",{d:"M4 8h2",key:"18vq6w"}],["path",{d:"M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-1.5c-.276 0-.494.227-.562.495a2 2 0 0 1-3.876 0C9.994 2.227 9.776 2 9.5 2z",key:"1681fp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B3=e("Microscope",[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E3=e("Microwave",[["rect",{width:"20",height:"15",x:"2",y:"4",rx:"2",key:"2no95f"}],["rect",{width:"8",height:"7",x:"6",y:"8",rx:"1",key:"zh9wx"}],["path",{d:"M18 8v7",key:"o5zi4n"}],["path",{d:"M6 19v2",key:"1loha6"}],["path",{d:"M18 19v2",key:"1dawf0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O3=e("Milestone",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M12 3v3",key:"1n5kay"}],["path",{d:"M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z",key:"1btarq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U3=e("MilkOff",[["path",{d:"M8 2h8",key:"1ssgc1"}],["path",{d:"M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3",key:"y0ejgx"}],["path",{d:"M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435",key:"iaxqsy"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N3=e("Milk",[["path",{d:"M8 2h8",key:"1ssgc1"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",key:"qtp12x"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",key:"ygeh44"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _3=e("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G3=e("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=e("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z3=e("MonitorCheck",[["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W3=e("MonitorCog",[["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m15.2 4.9-.9-.4",key:"12wd2u"}],["path",{d:"m15.2 7.1-.9.4",key:"1r2vl7"}],["path",{d:"m16.9 3.2-.4-.9",key:"3zbo91"}],["path",{d:"m16.9 8.8-.4.9",key:"1qr2dn"}],["path",{d:"m19.5 2.3-.4.9",key:"1rjrkq"}],["path",{d:"m19.5 9.7-.4-.9",key:"heryx5"}],["path",{d:"m21.7 4.5-.9.4",key:"17fqt1"}],["path",{d:"m21.7 7.5-.9-.4",key:"14zyni"}],["path",{d:"M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",key:"1tnzv8"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X3=e("MonitorDot",[["circle",{cx:"19",cy:"6",r:"3",key:"108a5v"}],["path",{d:"M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",key:"1fet9y"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K3=e("MonitorDown",[["path",{d:"M12 13V7",key:"h0r20n"}],["path",{d:"m15 10-3 3-3-3",key:"lzhmyn"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $3=e("MonitorOff",[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",key:"k0q8oc"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9",key:"cp1ac0"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q3=e("MonitorPause",[["path",{d:"M10 13V7",key:"1u13u9"}],["path",{d:"M14 13V7",key:"1vj9om"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J3=e("MonitorPlay",[["path",{d:"M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z",key:"1pctta"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",key:"x3v2xh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y3=e("MonitorSmartphone",[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8",key:"10dyio"}],["path",{d:"M10 19v-3.96 3.15",key:"1irgej"}],["path",{d:"M7 19h5",key:"qswx4l"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2",key:"1egngj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e6=e("MonitorSpeaker",[["path",{d:"M5.5 20H8",key:"1k40s5"}],["path",{d:"M17 9h.01",key:"1j24nn"}],["rect",{width:"10",height:"16",x:"12",y:"4",rx:"2",key:"ixliua"}],["path",{d:"M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4",key:"1mp6e1"}],["circle",{cx:"17",cy:"15",r:"1",key:"tqvash"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t6=e("MonitorStop",[["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",key:"x3v2xh"}],["rect",{x:"9",y:"7",width:"6",height:"6",rx:"1",key:"5m2oou"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a6=e("MonitorUp",[["path",{d:"m9 10 3-3 3 3",key:"11gsxs"}],["path",{d:"M12 13V7",key:"h0r20n"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o6=e("MonitorX",[["path",{d:"m14.5 12.5-5-5",key:"1jahn5"}],["path",{d:"m9.5 12.5 5-5",key:"1k2t7b"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r6=e("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n6=e("MoonStar",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9",key:"4ay0iu"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hr=e("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c6=e("MountainSnow",[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z",key:"otkl63"}],["path",{d:"M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19",key:"1pvmmp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i6=e("Mountain",[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z",key:"otkl63"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d6=e("MouseOff",[["path",{d:"M12 6v.343",key:"1gyhex"}],["path",{d:"M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218",key:"ukzz01"}],["path",{d:"M19 13.343V9A7 7 0 0 0 8.56 2.902",key:"104jy9"}],["path",{d:"M22 22 2 2",key:"1r8tn9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s6=e("MousePointer2",[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h6=e("MousePointerBan",[["path",{d:"M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z",key:"11pp1i"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}],["path",{d:"m11.8 11.8 8.4 8.4",key:"oogvdj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l6=e("MousePointerClick",[["path",{d:"M14 4.1 12 6",key:"ita8i4"}],["path",{d:"m5.1 8-2.9-.8",key:"1go3kf"}],["path",{d:"m6 12-1.9 2",key:"mnht97"}],["path",{d:"M7.2 2.2 8 5.1",key:"1cfko1"}],["path",{d:"M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",key:"s0h3yz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y6=e("MousePointer",[["path",{d:"M12.586 12.586 19 19",key:"ea5xo7"}],["path",{d:"M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",key:"277e5u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p6=e("Mouse",[["rect",{x:"5",y:"2",width:"14",height:"20",rx:"7",key:"11ol66"}],["path",{d:"M12 6v4",key:"16clxf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=e("Move3d",[["path",{d:"M5 3v16h16",key:"1mqmf9"}],["path",{d:"m5 19 6-6",key:"jh6hbb"}],["path",{d:"m2 6 3-3 3 3",key:"tkyvxa"}],["path",{d:"m18 16 3 3-3 3",key:"1d4glt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u6=e("MoveDiagonal2",[["path",{d:"M19 13v6h-6",key:"1hxl6d"}],["path",{d:"M5 11V5h6",key:"12e2xe"}],["path",{d:"m5 5 14 14",key:"11anup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k6=e("MoveDiagonal",[["path",{d:"M11 19H5v-6",key:"8awifj"}],["path",{d:"M13 5h6v6",key:"7voy1q"}],["path",{d:"M19 5 5 19",key:"wwaj1z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M6=e("MoveDownLeft",[["path",{d:"M11 19H5V13",key:"1akmht"}],["path",{d:"M19 5L5 19",key:"72u4yj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m6=e("MoveDownRight",[["path",{d:"M19 13V19H13",key:"10vkzq"}],["path",{d:"M5 5L19 19",key:"5zm2fv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v6=e("MoveDown",[["path",{d:"M8 18L12 22L16 18",key:"cskvfv"}],["path",{d:"M12 2V22",key:"r89rzk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f6=e("MoveHorizontal",[["path",{d:"m18 8 4 4-4 4",key:"1ak13k"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g6=e("MoveLeft",[["path",{d:"M6 8L2 12L6 16",key:"kyvwex"}],["path",{d:"M2 12H22",key:"1m8cig"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x6=e("MoveRight",[["path",{d:"M18 8L22 12L18 16",key:"1r0oui"}],["path",{d:"M2 12H22",key:"1m8cig"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w6=e("MoveUpLeft",[["path",{d:"M5 11V5H11",key:"3q78g9"}],["path",{d:"M5 5L19 19",key:"5zm2fv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L6=e("MoveUpRight",[["path",{d:"M13 5H19V11",key:"1n1gyv"}],["path",{d:"M19 5L5 19",key:"72u4yj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C6=e("MoveUp",[["path",{d:"M8 6L12 2L16 6",key:"1yvkyx"}],["path",{d:"M12 2V22",key:"r89rzk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b6=e("MoveVertical",[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m8 18 4 4 4-4",key:"bh5tu3"}],["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I6=e("Move",[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S6=e("Music2",[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q6=e("Music3",[["circle",{cx:"12",cy:"18",r:"4",key:"m3r9ws"}],["path",{d:"M16 18V2",key:"40x2m5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A6=e("Music4",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["path",{d:"m9 9 12-2",key:"1e64n2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=e("Music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j6=e("Navigation2Off",[["path",{d:"M9.31 9.31 5 21l7-4 7 4-1.17-3.17",key:"qoq2o2"}],["path",{d:"M14.53 8.88 12 2l-1.17 3.17",key:"k3sjzy"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P6=e("Navigation2",[["polygon",{points:"12 2 19 21 12 17 5 21 12 2",key:"x8c0qg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z6=e("NavigationOff",[["path",{d:"M8.43 8.43 3 11l8 2 2 8 2.57-5.43",key:"1vdtb7"}],["path",{d:"M17.39 11.73 22 2l-9.73 4.61",key:"tya3r6"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H6=e("Navigation",[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V6=e("Network",[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R6=e("Newspaper",[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",key:"7pis2x"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M10 6h8v4h-8V6Z",key:"smlsk5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D6=e("Nfc",[["path",{d:"M6 8.32a7.43 7.43 0 0 1 0 7.36",key:"9iaqei"}],["path",{d:"M9.46 6.21a11.76 11.76 0 0 1 0 11.58",key:"1yha7l"}],["path",{d:"M12.91 4.1a15.91 15.91 0 0 1 .01 15.8",key:"4iu2gk"}],["path",{d:"M16.37 2a20.16 20.16 0 0 1 0 20",key:"sap9u2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T6=e("NotebookPen",[["path",{d:"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4",key:"re6nr2"}],["path",{d:"M2 6h4",key:"aawbzj"}],["path",{d:"M2 10h4",key:"l0bgd4"}],["path",{d:"M2 14h4",key:"1gsvsf"}],["path",{d:"M2 18h4",key:"1bu2t1"}],["path",{d:"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"pqwjuv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F6=e("NotebookTabs",[["path",{d:"M2 6h4",key:"aawbzj"}],["path",{d:"M2 10h4",key:"l0bgd4"}],["path",{d:"M2 14h4",key:"1gsvsf"}],["path",{d:"M2 18h4",key:"1bu2t1"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["path",{d:"M15 2v20",key:"dcj49h"}],["path",{d:"M15 7h5",key:"1xj5lc"}],["path",{d:"M15 12h5",key:"w5shd9"}],["path",{d:"M15 17h5",key:"1qaofu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B6=e("NotebookText",[["path",{d:"M2 6h4",key:"aawbzj"}],["path",{d:"M2 10h4",key:"l0bgd4"}],["path",{d:"M2 14h4",key:"1gsvsf"}],["path",{d:"M2 18h4",key:"1bu2t1"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["path",{d:"M9.5 8h5",key:"11mslq"}],["path",{d:"M9.5 12H16",key:"ktog6x"}],["path",{d:"M9.5 16H14",key:"p1seyn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E6=e("Notebook",[["path",{d:"M2 6h4",key:"aawbzj"}],["path",{d:"M2 10h4",key:"l0bgd4"}],["path",{d:"M2 14h4",key:"1gsvsf"}],["path",{d:"M2 18h4",key:"1bu2t1"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["path",{d:"M16 2v20",key:"rotuqe"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O6=e("NotepadTextDashed",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v2",key:"j91f56"}],["path",{d:"M20 12v2",key:"w8o0tu"}],["path",{d:"M20 18v2a2 2 0 0 1-2 2h-1",key:"1c9ggx"}],["path",{d:"M13 22h-2",key:"191ugt"}],["path",{d:"M7 22H6a2 2 0 0 1-2-2v-2",key:"1rt9px"}],["path",{d:"M4 14v-2",key:"1v0sqh"}],["path",{d:"M4 8V6a2 2 0 0 1 2-2h2",key:"1mwabg"}],["path",{d:"M8 10h6",key:"3oa6kw"}],["path",{d:"M8 14h8",key:"1fgep2"}],["path",{d:"M8 18h5",key:"17enja"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U6=e("NotepadText",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"16",height:"18",x:"4",y:"4",rx:"2",key:"1u9h20"}],["path",{d:"M8 10h6",key:"3oa6kw"}],["path",{d:"M8 14h8",key:"1fgep2"}],["path",{d:"M8 18h5",key:"17enja"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N6=e("NutOff",[["path",{d:"M12 4V2",key:"1k5q1u"}],["path",{d:"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939",key:"1xcvy9"}],["path",{d:"M19 10v3.343",key:"163tfc"}],["path",{d:"M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192",key:"17914v"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _6=e("Nut",[["path",{d:"M12 4V2",key:"1k5q1u"}],["path",{d:"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",key:"1tgyif"}],["path",{d:"M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",key:"tnsqj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=e("OctagonAlert",[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G6=e("OctagonMinus",[["path",{d:"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",key:"2d38gg"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=e("OctagonPause",[["path",{d:"M10 15V9",key:"1lckn7"}],["path",{d:"M14 15V9",key:"1muqhk"}],["path",{d:"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",key:"2d38gg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=e("OctagonX",[["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",key:"2d38gg"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z6=e("Octagon",[["path",{d:"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",key:"2d38gg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W6=e("Omega",[["path",{d:"M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21",key:"1x94xo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X6=e("Option",[["path",{d:"M3 3h6l6 18h6",key:"ph9rgk"}],["path",{d:"M14 3h7",key:"16f0ms"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K6=e("Orbit",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416",key:"eohfx2"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416",key:"19pvbm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $6=e("Origami",[["path",{d:"M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025",key:"1bx4vc"}],["path",{d:"m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009",key:"1h3km6"}],["path",{d:"m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027",key:"1hj4wg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q6=e("Package2",[["path",{d:"M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z",key:"1ront0"}],["path",{d:"m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9",key:"19h2x1"}],["path",{d:"M12 3v6",key:"1holv5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J6=e("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y6=e("PackageMinus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e8=e("PackageOpen",[["path",{d:"M12 22v-9",key:"x3hkom"}],["path",{d:"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",key:"2ntwy6"}],["path",{d:"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",key:"1pmm1c"}],["path",{d:"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",key:"12ttoo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t8=e("PackagePlus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M19 13v6",key:"85cyf1"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a8=e("PackageSearch",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5",key:"b5zd12"}],["path",{d:"M20.27 17.27 22 19",key:"1l4muz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o8=e("PackageX",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["path",{d:"m17 13 5 5m-5 0 5-5",key:"im3w4b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r8=e("Package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["path",{d:"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",key:"yx3hmr"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n8=e("PaintBucket",[["path",{d:"m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z",key:"irua1i"}],["path",{d:"m5 2 5 5",key:"1lls2c"}],["path",{d:"M2 13h15",key:"1hkzvu"}],["path",{d:"M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z",key:"xk76lq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c8=e("PaintRoller",[["rect",{width:"16",height:"6",x:"2",y:"2",rx:"2",key:"jcyz7m"}],["path",{d:"M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",key:"1b9h7c"}],["rect",{width:"4",height:"6",x:"8",y:"16",rx:"1",key:"d6e7yl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=e("PaintbrushVertical",[["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M14 2v4",key:"qmzblu"}],["path",{d:"M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z",key:"ycvu00"}],["path",{d:"M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",key:"iw4wnp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i8=e("Paintbrush",[["path",{d:"m14.622 17.897-10.68-2.913",key:"vj2p1u"}],["path",{d:"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",key:"18tc5c"}],["path",{d:"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",key:"ytzfxy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d8=e("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s8=e("PanelBottomClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"m15 8-3 3-3-3",key:"1oxy1z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=e("PanelBottomDashed",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M14 15h1",key:"171nev"}],["path",{d:"M19 15h2",key:"1vnucp"}],["path",{d:"M3 15h2",key:"8bym0q"}],["path",{d:"M9 15h1",key:"1tg3ks"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h8=e("PanelBottomOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"m9 10 3-3 3 3",key:"11gsxs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l8=e("PanelBottom",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 15h18",key:"5xshup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=e("PanelLeftClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya=e("PanelLeftDashed",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 14v1",key:"askpd8"}],["path",{d:"M9 19v2",key:"16tejx"}],["path",{d:"M9 3v2",key:"1noubl"}],["path",{d:"M9 9v1",key:"19ebxg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=e("PanelLeftOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=e("PanelLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y8=e("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka=e("PanelRightDashed",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 14v1",key:"ilsfch"}],["path",{d:"M15 19v2",key:"1fst2f"}],["path",{d:"M15 3v2",key:"z204g4"}],["path",{d:"M15 9v1",key:"z2a8b1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p8=e("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u8=e("PanelRight",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k8=e("PanelTopClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"m9 16 3-3 3 3",key:"1idcnm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ma=e("PanelTopDashed",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M14 9h1",key:"l0svgy"}],["path",{d:"M19 9h2",key:"te2zfg"}],["path",{d:"M3 9h2",key:"1h4ldw"}],["path",{d:"M9 9h1",key:"15jzuz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M8=e("PanelTopOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"m15 14-3 3-3-3",key:"g215vf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m8=e("PanelTop",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v8=e("PanelsLeftBottom",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M9 15h12",key:"5ijen5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f8=e("PanelsRightBottom",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 15h12",key:"1wkqb3"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=e("PanelsTopLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=e("Paperclip",[["path",{d:"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",key:"1u3ebp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g8=e("Parentheses",[["path",{d:"M8 21s-4-3-4-9 4-9 4-9",key:"uto9ud"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9",key:"4w2vsq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x8=e("ParkingMeter",[["path",{d:"M11 15h2",key:"199qp6"}],["path",{d:"M12 12v3",key:"158kv8"}],["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",key:"1jofit"}],["path",{d:"M9 9a3 3 0 1 1 6 0",key:"jdoeu8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w8=e("PartyPopper",[["path",{d:"M5.8 11.3 2 22l10.7-3.79",key:"gwxi1d"}],["path",{d:"M4 3h.01",key:"1vcuye"}],["path",{d:"M22 8h.01",key:"1mrtc2"}],["path",{d:"M15 2h.01",key:"1cjtqr"}],["path",{d:"M22 20h.01",key:"1mrys2"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",key:"hbicv8"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",key:"1i94pl"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",key:"1cofks"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",key:"4kbmks"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L8=e("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C8=e("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b8=e("PcCase",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",key:"1uq1d7"}],["path",{d:"M15 14h.01",key:"1kp3bh"}],["path",{d:"M9 6h6",key:"dgm16u"}],["path",{d:"M9 10h6",key:"9gxzsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va=e("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I8=e("PenOff",[["path",{d:"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",key:"bjo8r8"}],["path",{d:"m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353",key:"16h5ne"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S8=e("PenTool",[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",key:"nt11vn"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",key:"15qc1e"}],["path",{d:"m2.3 2.3 7.286 7.286",key:"1wuzzi"}],["circle",{cx:"11",cy:"11",r:"2",key:"xmgehs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=e("Pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q8=e("PencilLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}],["path",{d:"m15 5 3 3",key:"1w25hb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A8=e("PencilOff",[["path",{d:"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",key:"bjo8r8"}],["path",{d:"m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353",key:"16h5ne"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j8=e("PencilRuler",[["path",{d:"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13",key:"orapub"}],["path",{d:"m8 6 2-2",key:"115y1s"}],["path",{d:"m18 16 2-2",key:"ee94s4"}],["path",{d:"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",key:"cfq27r"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P8=e("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z8=e("Pentagon",[["path",{d:"M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",key:"2hea0t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pr=e("Percent",[["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5",key:"4mh3h7"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5",key:"1mdrzq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H8=e("PersonStanding",[["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["path",{d:"m9 20 3-6 3 6",key:"se2kox"}],["path",{d:"m6 8 6 2 6-2",key:"4o3us4"}],["path",{d:"M12 10v4",key:"1kjpxc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V8=e("PhilippinePeso",[["path",{d:"M20 11H4",key:"6ut86h"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7",key:"1ana5r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R8=e("PhoneCall",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}],["path",{d:"M14.05 2a9 9 0 0 1 8 7.94",key:"vmijpz"}],["path",{d:"M14.05 6A5 5 0 0 1 18 10",key:"13nbpp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D8=e("PhoneForwarded",[["polyline",{points:"18 2 22 6 18 10",key:"6vjanh"}],["line",{x1:"14",x2:"22",y1:"6",y2:"6",key:"1jsywh"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T8=e("PhoneIncoming",[["polyline",{points:"16 2 16 8 22 8",key:"1ygljm"}],["line",{x1:"22",x2:"16",y1:"2",y2:"8",key:"1xzwqn"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F8=e("PhoneMissed",[["line",{x1:"22",x2:"16",y1:"2",y2:"8",key:"1xzwqn"}],["line",{x1:"16",x2:"22",y1:"2",y2:"8",key:"13zxdn"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B8=e("PhoneOff",[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",key:"z86iuo"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22",key:"11kh81"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E8=e("PhoneOutgoing",[["polyline",{points:"22 8 22 2 16 2",key:"1g204g"}],["line",{x1:"16",x2:"22",y1:"8",y2:"2",key:"1ggias"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=e("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O8=e("Pi",[["line",{x1:"9",x2:"9",y1:"4",y2:"20",key:"ovs5a5"}],["path",{d:"M4 7c0-1.7 1.3-3 3-3h13",key:"10pag4"}],["path",{d:"M18 20c-1.7 0-3-1.3-3-3V4",key:"1gaosr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U8=e("Piano",[["path",{d:"M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8",key:"lag0yf"}],["path",{d:"M2 14h20",key:"myj16y"}],["path",{d:"M6 14v4",key:"9ng0ue"}],["path",{d:"M10 14v4",key:"1v8uk5"}],["path",{d:"M14 14v4",key:"1tqops"}],["path",{d:"M18 14v4",key:"18uqwm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N8=e("Pickaxe",[["path",{d:"M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912",key:"we99rg"}],["path",{d:"M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393",key:"1w6hck"}],["path",{d:"M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z",key:"15hgfx"}],["path",{d:"M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319",key:"452b4h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _8=e("PictureInPicture2",[["path",{d:"M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",key:"daa4of"}],["rect",{width:"10",height:"7",x:"12",y:"13",rx:"2",key:"1nb8gs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G8=e("PictureInPicture",[["path",{d:"M8 4.5v5H3m-1-6 6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3",key:"bcd8fb"}],["rect",{width:"10",height:"7",x:"12",y:"13.5",ry:"2",key:"136fx3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=e("PiggyBank",[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",key:"1ivx2i"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1",key:"nm575m"}],["path",{d:"M16 11h.01",key:"xkw8gn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z8=e("PilcrowLeft",[["path",{d:"M14 3v11",key:"mlfb7b"}],["path",{d:"M14 9h-3a3 3 0 0 1 0-6h9",key:"1ulc19"}],["path",{d:"M18 3v11",key:"1phi0r"}],["path",{d:"M22 18H2l4-4",key:"yt65j9"}],["path",{d:"m6 22-4-4",key:"6jgyf5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W8=e("PilcrowRight",[["path",{d:"M10 3v11",key:"o3l5kj"}],["path",{d:"M10 9H7a1 1 0 0 1 0-6h8",key:"1wb1nc"}],["path",{d:"M14 3v11",key:"mlfb7b"}],["path",{d:"m18 14 4 4H2",key:"4r8io1"}],["path",{d:"m22 18-4 4",key:"1hjjrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X8=e("Pilcrow",[["path",{d:"M13 4v16",key:"8vvj80"}],["path",{d:"M17 4v16",key:"7dpous"}],["path",{d:"M19 4H9.5a4.5 4.5 0 0 0 0 9H13",key:"sh4n9v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K8=e("PillBottle",[["path",{d:"M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4",key:"17ldeb"}],["path",{d:"M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7",key:"nc37y6"}],["rect",{width:"16",height:"5",x:"4",y:"2",rx:"1",key:"3jeezo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $8=e("Pill",[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",key:"wa1lgi"}],["path",{d:"m8.5 8.5 7 7",key:"rvfmvr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q8=e("PinOff",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89",key:"znwnzq"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",key:"c9qhm2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J8=e("Pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y8=e("Pipette",[["path",{d:"m2 22 1-1h3l9-9",key:"1sre89"}],["path",{d:"M3 21v-3l9-9",key:"hpe2y6"}],["path",{d:"m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z",key:"196du1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mr=e("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e7=e("PlaneLanding",[["path",{d:"M2 22h20",key:"272qi7"}],["path",{d:"M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",key:"1ma21e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t7=e("PlaneTakeoff",[["path",{d:"M2 22h20",key:"272qi7"}],["path",{d:"M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",key:"fkigj9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=e("Plane",[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a7=e("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o7=e("Plug2",[["path",{d:"M9 2v6",key:"17ngun"}],["path",{d:"M15 2v6",key:"s7yy2p"}],["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M5 8h14",key:"pcz4l3"}],["path",{d:"M6 11V8h12v3a6 6 0 1 1-12 0Z",key:"wtfw2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=e("PlugZap",[["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",key:"goz73y"}],["path",{d:"m2 22 3-3",key:"19mgm9"}],["path",{d:"M7.5 13.5 10 11",key:"7xgeeb"}],["path",{d:"M10.5 16.5 13 14",key:"10btkg"}],["path",{d:"m18 3-4 4h6l-4 4",key:"16psg9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r7=e("Plug",[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M9 8V2",key:"14iosj"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",key:"osxo6l"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=e("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n7=e("PocketKnife",[["path",{d:"M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2",key:"19w3oe"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z",key:"6fykxj"}],["path",{d:"M18 11.66V22a4 4 0 0 0 4-4V6",key:"1utzek"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c7=e("Pocket",[["path",{d:"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z",key:"1mz881"}],["polyline",{points:"8 10 12 14 16 10",key:"w4mbv5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i7=e("Podcast",[["path",{d:"M16.85 18.58a9 9 0 1 0-9.7 0",key:"d71mpg"}],["path",{d:"M8 14a5 5 0 1 1 8 0",key:"fc81rn"}],["circle",{cx:"12",cy:"11",r:"1",key:"1gvufo"}],["path",{d:"M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z",key:"za5kbj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d7=e("PointerOff",[["path",{d:"M10 4.5V4a2 2 0 0 0-2.41-1.957",key:"jsi14n"}],["path",{d:"M13.9 8.4a2 2 0 0 0-1.26-1.295",key:"hirc7f"}],["path",{d:"M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158",key:"1jxb2e"}],["path",{d:"m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343",key:"10r7hm"}],["path",{d:"M6 6v8",key:"tv5xkp"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s7=e("Pointer",[["path",{d:"M22 14a8 8 0 0 1-8 8",key:"56vcr3"}],["path",{d:"M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2",key:"1agjmk"}],["path",{d:"M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1",key:"wdbh2u"}],["path",{d:"M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10",key:"1ibuk9"}],["path",{d:"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"g6ys72"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h7=e("Popcorn",[["path",{d:"M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4",key:"10td1f"}],["path",{d:"M10 22 9 8",key:"yjptiv"}],["path",{d:"m14 22 1-14",key:"8jwc8b"}],["path",{d:"M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",key:"1qo33t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l7=e("Popsicle",[["path",{d:"M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z",key:"1o68ps"}],["path",{d:"m22 22-5.5-5.5",key:"17o70y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y7=e("PoundSterling",[["path",{d:"M18 7c0-5.333-8-5.333-8 0",key:"1prm2n"}],["path",{d:"M10 7v14",key:"18tmcs"}],["path",{d:"M6 21h12",key:"4dkmi1"}],["path",{d:"M6 13h10",key:"ybwr4a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p7=e("PowerOff",[["path",{d:"M18.36 6.64A9 9 0 0 1 20.77 15",key:"dxknvb"}],["path",{d:"M6.16 6.16a9 9 0 1 0 12.68 12.68",key:"1x7qb5"}],["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u7=e("Power",[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k7=e("Presentation",[["path",{d:"M2 3h20",key:"91anmk"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",key:"2k9sn8"}],["path",{d:"m7 21 5-5 5 5",key:"bip4we"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M7=e("PrinterCheck",[["path",{d:"M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5",key:"qeb09x"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2",key:"1md90i"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m7=e("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v7=e("Projector",[["path",{d:"M5 7 3 5",key:"1yys58"}],["path",{d:"M9 6V3",key:"1ptz9u"}],["path",{d:"m13 7 2-2",key:"1w3vmq"}],["circle",{cx:"9",cy:"13",r:"3",key:"1mma13"}],["path",{d:"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",key:"2frwzc"}],["path",{d:"M16 16h2",key:"dnq2od"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f7=e("Proportions",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M12 9v11",key:"1fnkrn"}],["path",{d:"M2 9h13a2 2 0 0 1 2 2v9",key:"11z3ex"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g7=e("Puzzle",[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x7=e("Pyramid",[["path",{d:"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z",key:"aenxs0"}],["path",{d:"M12 2v20",key:"t6zp3m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w7=e("QrCode",[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L7=e("Quote",[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C7=e("Rabbit",[["path",{d:"M13 16a3 3 0 0 1 2.24 5",key:"1epib5"}],["path",{d:"M18 12h.01",key:"yjnet6"}],["path",{d:"M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3",key:"ue9ozu"}],["path",{d:"M20 8.54V4a2 2 0 1 0-4 0v3",key:"49iql8"}],["path",{d:"M7.612 12.524a3 3 0 1 0-1.6 4.3",key:"1e33i0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b7=e("Radar",[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34",key:"z3du51"}],["path",{d:"M4 6h.01",key:"oypzma"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35",key:"qzzz0"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67",key:"1yjesh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67",key:"1u2y91"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"m13.41 10.59 5.66-5.66",key:"mhq4k0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I7=e("Radiation",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z",key:"wy49g3"}],["path",{d:"M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z",key:"vklnvr"}],["path",{d:"M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z",key:"wkdf1o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S7=e("Radical",[["path",{d:"M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21",key:"1mqj8i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q7=e("RadioReceiver",[["path",{d:"M5 16v2",key:"g5qcv5"}],["path",{d:"M19 16v2",key:"1gbaio"}],["rect",{width:"20",height:"8",x:"2",y:"8",rx:"2",key:"vjsjur"}],["path",{d:"M18 12h.01",key:"yjnet6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A7=e("RadioTower",[["path",{d:"M4.9 16.1C1 12.2 1 5.8 4.9 1.9",key:"s0qx1y"}],["path",{d:"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5",key:"1idnkw"}],["circle",{cx:"12",cy:"9",r:"2",key:"1092wv"}],["path",{d:"M16.2 4.8c2 2 2.26 5.11.8 7.47",key:"ojru2q"}],["path",{d:"M19.1 1.9a9.96 9.96 0 0 1 0 14.1",key:"rhi7fg"}],["path",{d:"M9.5 18h5",key:"mfy3pd"}],["path",{d:"m8 22 4-11 4 11",key:"25yftu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j7=e("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P7=e("Radius",[["path",{d:"M20.34 17.52a10 10 0 1 0-2.82 2.82",key:"fydyku"}],["circle",{cx:"19",cy:"19",r:"2",key:"17f5cg"}],["path",{d:"m13.41 13.41 4.18 4.18",key:"1gqbwc"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z7=e("RailSymbol",[["path",{d:"M5 15h14",key:"m0yey3"}],["path",{d:"M5 9h14",key:"7tsvo6"}],["path",{d:"m14 20-5-5 6-6-5-5",key:"1jo42i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H7=e("Rainbow",[["path",{d:"M22 17a10 10 0 0 0-20 0",key:"ozegv"}],["path",{d:"M6 17a6 6 0 0 1 12 0",key:"5giftw"}],["path",{d:"M10 17a2 2 0 0 1 4 0",key:"gnsikk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V7=e("Rat",[["path",{d:"M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7c0 2.2 1.8 4 4 4",key:"1wq71c"}],["path",{d:"M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3",key:"1crdmb"}],["path",{d:"M13.2 18a3 3 0 0 0-2.2-5",key:"1ol3lk"}],["path",{d:"M13 22H4a2 2 0 0 1 0-4h12",key:"bt3f23"}],["path",{d:"M16 9h.01",key:"1bdo4e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R7=e("Ratio",[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2",key:"1oxtiu"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D7=e("ReceiptCent",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M12 6.5v11",key:"ecfhkf"}],["path",{d:"M15 9.4a4 4 0 1 0 0 5.2",key:"1makmb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T7=e("ReceiptEuro",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M8 12h5",key:"1g6qi8"}],["path",{d:"M16 9.5a4 4 0 1 0 0 5.2",key:"b2px4r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F7=e("ReceiptIndianRupee",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M8 7h8",key:"i86dvs"}],["path",{d:"M12 17.5 8 15h1a4 4 0 0 0 0-8",key:"grpkl4"}],["path",{d:"M8 11h8",key:"vwpz6n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B7=e("ReceiptJapaneseYen",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"m12 10 3-3",key:"1mc12w"}],["path",{d:"m9 7 3 3v7.5",key:"39i0xv"}],["path",{d:"M9 11h6",key:"1fldmi"}],["path",{d:"M9 15h6",key:"cctwl0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E7=e("ReceiptPoundSterling",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M8 13h5",key:"1k9z8w"}],["path",{d:"M10 17V9.5a2.5 2.5 0 0 1 5 0",key:"1dzgp0"}],["path",{d:"M8 17h7",key:"8mjdqu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O7=e("ReceiptRussianRuble",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M8 15h5",key:"vxg57a"}],["path",{d:"M8 11h5a2 2 0 1 0 0-4h-3v10",key:"1usi5u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U7=e("ReceiptSwissFranc",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M10 17V7h5",key:"k7jq18"}],["path",{d:"M10 11h4",key:"1i0mka"}],["path",{d:"M8 15h5",key:"vxg57a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N7=e("ReceiptText",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M14 8H8",key:"1l3xfs"}],["path",{d:"M16 12H8",key:"1fr5h0"}],["path",{d:"M13 16H8",key:"wsln4y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _7=e("Receipt",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=e("RectangleEllipsis",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M17 12h.01",key:"1m0b6t"}],["path",{d:"M7 12h.01",key:"eqddd0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G7=e("RectangleHorizontal",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z7=e("RectangleVertical",[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2",key:"1oxtiu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W7=e("Recycle",[["path",{d:"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",key:"x6z5xu"}],["path",{d:"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",key:"1x4zh5"}],["path",{d:"m14 16-3 3 3 3",key:"f6jyew"}],["path",{d:"M8.293 13.596 7.196 9.5 3.1 10.598",key:"wf1obh"}],["path",{d:"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",key:"9tzpgr"}],["path",{d:"m13.378 9.633 4.096 1.098 1.097-4.096",key:"1oe83g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X7=e("Redo2",[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K7=e("RedoDot",[["circle",{cx:"12",cy:"17",r:"1",key:"1ixnty"}],["path",{d:"M21 7v6h-6",key:"3ptur4"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",key:"1kgawr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $7=e("Redo",[["path",{d:"M21 7v6h-6",key:"3ptur4"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",key:"1kgawr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q7=e("RefreshCcwDot",[["path",{d:"M3 2v6h6",key:"18ldww"}],["path",{d:"M21 12A9 9 0 0 0 6 5.3L3 8",key:"1pbrqz"}],["path",{d:"M21 22v-6h-6",key:"usdfbe"}],["path",{d:"M3 12a9 9 0 0 0 15 6.7l3-2.7",key:"1hosoe"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J7=e("RefreshCcw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y7=e("RefreshCwOff",[["path",{d:"M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47",key:"1krf6h"}],["path",{d:"M8 16H3v5",key:"1cv678"}],["path",{d:"M3 12C3 9.51 4 7.26 5.64 5.64",key:"ruvoct"}],["path",{d:"m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64",key:"19q130"}],["path",{d:"M21 12c0 1-.16 1.97-.47 2.87",key:"4w8emr"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M22 22 2 2",key:"1r8tn9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=e("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eM=e("Refrigerator",[["path",{d:"M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z",key:"fpq118"}],["path",{d:"M5 10h14",key:"elsbfy"}],["path",{d:"M15 7v6",key:"1nx30x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tM=e("Regex",[["path",{d:"M17 3v10",key:"15fgeh"}],["path",{d:"m12.67 5.5 8.66 5",key:"1gpheq"}],["path",{d:"m12.67 10.5 8.66-5",key:"1dkfa6"}],["path",{d:"M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z",key:"swwfx4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aM=e("RemoveFormatting",[["path",{d:"M4 7V4h16v3",key:"9msm58"}],["path",{d:"M5 20h6",key:"1h6pxn"}],["path",{d:"M13 4 8 20",key:"kqq6aj"}],["path",{d:"m15 15 5 5",key:"me55sn"}],["path",{d:"m20 15-5 5",key:"11p7ol"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oM=e("Repeat1",[["path",{d:"m17 2 4 4-4 4",key:"nntrym"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14",key:"84bu3i"}],["path",{d:"m7 22-4-4 4-4",key:"1wqhfi"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3",key:"1rx37r"}],["path",{d:"M11 10h1v4",key:"70cz1p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rM=e("Repeat2",[["path",{d:"m2 9 3-3 3 3",key:"1ltn5i"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6",key:"1r6tfw"}],["path",{d:"m22 15-3 3-3-3",key:"4rnwn2"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10",key:"2f72bc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nM=e("Repeat",[["path",{d:"m17 2 4 4-4 4",key:"nntrym"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14",key:"84bu3i"}],["path",{d:"m7 22-4-4 4-4",key:"1wqhfi"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3",key:"1rx37r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cM=e("ReplaceAll",[["path",{d:"M14 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2",key:"1yyzbs"}],["path",{d:"M14 4a2 2 0 0 1 2-2",key:"1w2hp7"}],["path",{d:"M16 10a2 2 0 0 1-2-2",key:"shjach"}],["path",{d:"M20 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2",key:"zfj4xr"}],["path",{d:"M20 2a2 2 0 0 1 2 2",key:"188mtx"}],["path",{d:"M22 8a2 2 0 0 1-2 2",key:"ddf4tu"}],["path",{d:"m3 7 3 3 3-3",key:"x25e72"}],["path",{d:"M6 10V5a 3 3 0 0 1 3-3h1",key:"1ageje"}],["rect",{x:"2",y:"14",width:"8",height:"8",rx:"2",key:"4rksxw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iM=e("Replace",[["path",{d:"M14 4a2 2 0 0 1 2-2",key:"1w2hp7"}],["path",{d:"M16 10a2 2 0 0 1-2-2",key:"shjach"}],["path",{d:"M20 2a2 2 0 0 1 2 2",key:"188mtx"}],["path",{d:"M22 8a2 2 0 0 1-2 2",key:"ddf4tu"}],["path",{d:"m3 7 3 3 3-3",key:"x25e72"}],["path",{d:"M6 10V5a3 3 0 0 1 3-3h1",key:"3y3t5z"}],["rect",{x:"2",y:"14",width:"8",height:"8",rx:"2",key:"4rksxw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dM=e("ReplyAll",[["polyline",{points:"7 17 2 12 7 7",key:"t83bqg"}],["polyline",{points:"12 17 7 12 12 7",key:"1g4ajm"}],["path",{d:"M22 18v-2a4 4 0 0 0-4-4H7",key:"1fcyog"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sM=e("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hM=e("Rewind",[["polygon",{points:"11 19 2 12 11 5 11 19",key:"14yba5"}],["polygon",{points:"22 19 13 12 22 5 22 19",key:"1pi1cj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lM=e("Ribbon",[["path",{d:"M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22",key:"1rnhq3"}],["path",{d:"m12 18 2.57-3.5",key:"116vt7"}],["path",{d:"M6.243 9.016a7 7 0 0 1 11.507-.009",key:"10dq0b"}],["path",{d:"M9.35 14.53 12 11.22",key:"tdsyp2"}],["path",{d:"M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",key:"nmifey"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yM=e("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pM=e("RockingChair",[["polyline",{points:"3.5 2 6.5 12.5 18 12.5",key:"y3iy52"}],["line",{x1:"9.5",x2:"5.5",y1:"12.5",y2:"20",key:"19vg5i"}],["line",{x1:"15",x2:"18.5",y1:"12.5",y2:"20",key:"1inpmv"}],["path",{d:"M2.75 18a13 13 0 0 0 18.5 0",key:"1nquas"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uM=e("RollerCoaster",[["path",{d:"M6 19V5",key:"1r845m"}],["path",{d:"M10 19V6.8",key:"9j2tfs"}],["path",{d:"M14 19v-7.8",key:"10s8qv"}],["path",{d:"M18 5v4",key:"1tajlv"}],["path",{d:"M18 19v-6",key:"ielfq3"}],["path",{d:"M22 19V9",key:"158nzp"}],["path",{d:"M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65",key:"1930oh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xa=e("Rotate3d",[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2",key:"10n0gc"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814",key:"16shm9"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",key:"1lxi77"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kM=e("RotateCcwSquare",[["path",{d:"M20 9V7a2 2 0 0 0-2-2h-6",key:"19z8uc"}],["path",{d:"m15 2-3 3 3 3",key:"177bxs"}],["path",{d:"M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2",key:"d36hnl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MM=e("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mM=e("RotateCwSquare",[["path",{d:"M12 5H6a2 2 0 0 0-2 2v3",key:"l96uqu"}],["path",{d:"m9 8 3-3-3-3",key:"1gzgc3"}],["path",{d:"M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",key:"1w2k5h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vM=e("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fM=e("RouteOff",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5c.4 0 .9-.1 1.3-.2",key:"1effex"}],["path",{d:"M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12",key:"k9y2ds"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M21 15.3a3.5 3.5 0 0 0-3.3-3.3",key:"11nlu2"}],["path",{d:"M15 5h-4.3",key:"6537je"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gM=e("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xM=e("Router",[["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",key:"w68u3i"}],["path",{d:"M6.01 18H6",key:"19vcac"}],["path",{d:"M10.01 18H10",key:"uamcmx"}],["path",{d:"M15 10v4",key:"qjz1xs"}],["path",{d:"M17.84 7.17a4 4 0 0 0-5.66 0",key:"1rif40"}],["path",{d:"M20.66 4.34a8 8 0 0 0-11.31 0",key:"6a5xfq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=e("Rows2",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 12h18",key:"1i2n21"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const La=e("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wM=e("Rows4",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 7.5H3",key:"1hm9pq"}],["path",{d:"M21 12H3",key:"2avoz0"}],["path",{d:"M21 16.5H3",key:"n7jzkj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LM=e("Rss",[["path",{d:"M4 11a9 9 0 0 1 9 9",key:"pv89mb"}],["path",{d:"M4 4a16 16 0 0 1 16 16",key:"k0647b"}],["circle",{cx:"5",cy:"19",r:"1",key:"bfqh0e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CM=e("Ruler",[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",key:"icamh8"}],["path",{d:"m14.5 12.5 2-2",key:"inckbg"}],["path",{d:"m11.5 9.5 2-2",key:"fmmyf7"}],["path",{d:"m8.5 6.5 2-2",key:"vc6u1g"}],["path",{d:"m17.5 15.5 2-2",key:"wo5hmg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bM=e("RussianRuble",[["path",{d:"M6 11h8a4 4 0 0 0 0-8H9v18",key:"18ai8t"}],["path",{d:"M6 15h8",key:"1y8f6l"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IM=e("Sailboat",[["path",{d:"M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z",key:"1404fh"}],["path",{d:"M21 14 10 2 3 14h18Z",key:"1nzg7v"}],["path",{d:"M10 2v16",key:"1labyt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SM=e("Salad",[["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z",key:"4rw317"}],["path",{d:"M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1",key:"10xrj0"}],["path",{d:"m13 12 4-4",key:"1hckqy"}],["path",{d:"M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2",key:"1p4srx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qM=e("Sandwich",[["path",{d:"m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777",key:"f1wd0e"}],["path",{d:"M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25",key:"1pfu07"}],["path",{d:"M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9",key:"1oq9qw"}],["path",{d:"m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2",key:"1fnwu5"}],["rect",{width:"20",height:"4",x:"2",y:"11",rx:"1",key:"itshg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AM=e("SatelliteDish",[["path",{d:"M4 10a7.31 7.31 0 0 0 10 10Z",key:"1fzpp3"}],["path",{d:"m9 15 3-3",key:"88sc13"}],["path",{d:"M17 13a6 6 0 0 0-6-6",key:"15cc6u"}],["path",{d:"M21 13A10 10 0 0 0 11 3",key:"11nf8s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jM=e("Satellite",[["path",{d:"M13 7 9 3 5 7l4 4",key:"vyckw6"}],["path",{d:"m17 11 4 4-4 4-4-4",key:"rchckc"}],["path",{d:"m8 12 4 4 6-6-4-4Z",key:"1sshf7"}],["path",{d:"m16 8 3-3",key:"x428zp"}],["path",{d:"M9 21a6 6 0 0 0-6-6",key:"1iajcf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PM=e("SaveAll",[["path",{d:"M10 2v3a1 1 0 0 0 1 1h5",key:"1xspal"}],["path",{d:"M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6",key:"1ra60u"}],["path",{d:"M18 22H4a2 2 0 0 1-2-2V6",key:"pblm9e"}],["path",{d:"M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z",key:"1yve0x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zM=e("SaveOff",[["path",{d:"M13 13H8a1 1 0 0 0-1 1v7",key:"h8g396"}],["path",{d:"M14 8h1",key:"1lfen6"}],["path",{d:"M17 21v-4",key:"1yknxs"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41",key:"1t4vdl"}],["path",{d:"M29.5 11.5s5 5 4 5",key:"zzn4i6"}],["path",{d:"M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15",key:"24cby9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HM=e("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=e("Scale3d",[["path",{d:"M5 7v11a1 1 0 0 0 1 1h11",key:"13dt1j"}],["path",{d:"M5.293 18.707 11 13",key:"ezgbsx"}],["circle",{cx:"19",cy:"19",r:"2",key:"17f5cg"}],["circle",{cx:"5",cy:"5",r:"2",key:"1gwv83"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VM=e("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RM=e("Scaling",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M14 15H9v-5",key:"pi4jk9"}],["path",{d:"M16 3h5v5",key:"1806ms"}],["path",{d:"M21 3 9 15",key:"15kdhq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DM=e("ScanBarcode",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M8 7v10",key:"23sfjj"}],["path",{d:"M12 7v10",key:"jspqdw"}],["path",{d:"M17 7v10",key:"578dap"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TM=e("ScanEye",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",key:"11ak4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FM=e("ScanFace",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 9h.01",key:"x1ddxp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BM=e("ScanLine",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M7 12h10",key:"b7w52i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EM=e("ScanQrCode",[["path",{d:"M17 12v4a1 1 0 0 1-1 1h-4",key:"uk4fdo"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M17 8V7",key:"q2g9wo"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M7 17h.01",key:"19xn7k"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["rect",{x:"7",y:"7",width:"5",height:"5",rx:"1",key:"m9kyts"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OM=e("ScanSearch",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"m16 16-1.9-1.9",key:"1dq9hf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UM=e("ScanText",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M7 8h8",key:"1jbsf9"}],["path",{d:"M7 12h10",key:"b7w52i"}],["path",{d:"M7 16h6",key:"1vyc9m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NM=e("Scan",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _M=e("School",[["path",{d:"M14 22v-4a2 2 0 1 0-4 0v4",key:"hhkicm"}],["path",{d:"m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10",key:"1xqip1"}],["path",{d:"M18 5v17",key:"1sw6gf"}],["path",{d:"m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6",key:"9d2mlk"}],["path",{d:"M6 5v17",key:"1xfsm0"}],["circle",{cx:"12",cy:"9",r:"2",key:"1092wv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GM=e("ScissorsLineDashed",[["path",{d:"M5.42 9.42 8 12",key:"12pkuq"}],["circle",{cx:"4",cy:"8",r:"2",key:"107mxr"}],["path",{d:"m14 6-8.58 8.58",key:"gvzu5l"}],["circle",{cx:"4",cy:"16",r:"2",key:"1ehqvc"}],["path",{d:"M10.8 14.8 14 18",key:"ax7m9r"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=e("Scissors",[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M8.12 8.12 12 12",key:"1alkpv"}],["path",{d:"M20 4 8.12 15.88",key:"xgtan2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M14.8 14.8 20 20",key:"ptml3r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZM=e("ScreenShareOff",[["path",{d:"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3",key:"i8wdob"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m22 3-5 5",key:"12jva0"}],["path",{d:"m17 3 5 5",key:"k36vhe"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WM=e("ScreenShare",[["path",{d:"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3",key:"i8wdob"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m17 8 5-5",key:"fqif7o"}],["path",{d:"M17 3h5v5",key:"1o3tu8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XM=e("ScrollText",[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KM=e("Scroll",[["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $M=e("SearchCheck",[["path",{d:"m8 11 2 2 4-4",key:"1sed1v"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QM=e("SearchCode",[["path",{d:"m13 13.5 2-2.5-2-2.5",key:"1rvxrh"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}],["path",{d:"M9 8.5 7 11l2 2.5",key:"6ffwbx"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JM=e("SearchSlash",[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YM=e("SearchX",[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const em=e("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tm=e("Section",[["path",{d:"M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0",key:"vqan6v"}],["path",{d:"M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0",key:"wdjd8o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=e("SendHorizontal",[["path",{d:"M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",key:"117uat"}],["path",{d:"M6 12h16",key:"s4cdu5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const am=e("SendToBack",[["rect",{x:"14",y:"14",width:"8",height:"8",rx:"2",key:"1b0bso"}],["rect",{x:"2",y:"2",width:"8",height:"8",rx:"2",key:"1x09vl"}],["path",{d:"M7 14v1a2 2 0 0 0 2 2h1",key:"pao6x6"}],["path",{d:"M14 7h1a2 2 0 0 1 2 2v1",key:"19tdru"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=e("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rm=e("SeparatorHorizontal",[["line",{x1:"3",x2:"21",y1:"12",y2:"12",key:"10d38w"}],["polyline",{points:"8 8 12 4 16 8",key:"zo8t4w"}],["polyline",{points:"16 16 12 20 8 16",key:"1oyrid"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nm=e("SeparatorVertical",[["line",{x1:"12",x2:"12",y1:"3",y2:"21",key:"1efggb"}],["polyline",{points:"8 8 4 12 8 16",key:"bnfmv4"}],["polyline",{points:"16 16 20 12 16 8",key:"u90052"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cm=e("ServerCog",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5",key:"tn8das"}],["path",{d:"M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5",key:"1g2pve"}],["path",{d:"M6 6h.01",key:"1utrut"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"m15.7 13.4-.9-.3",key:"1jwmzr"}],["path",{d:"m9.2 10.9-.9-.3",key:"qapnim"}],["path",{d:"m10.6 15.7.3-.9",key:"quwk0k"}],["path",{d:"m13.6 15.7-.4-1",key:"cb9xp7"}],["path",{d:"m10.8 9.3-.4-1",key:"1uaiz5"}],["path",{d:"m8.3 13.6 1-.4",key:"s6srou"}],["path",{d:"m14.7 10.8 1-.4",key:"4d31cq"}],["path",{d:"m13.4 8.3-.3.9",key:"1bm987"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=e("ServerCrash",[["path",{d:"M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",key:"4b9dqc"}],["path",{d:"M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",key:"22nnkd"}],["path",{d:"M6 6h.01",key:"1utrut"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"m13 6-4 6h6l-4 6",key:"14hqih"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dm=e("ServerOff",[["path",{d:"M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5",key:"bt2siv"}],["path",{d:"M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z",key:"1hjrv1"}],["path",{d:"M22 17v-1a2 2 0 0 0-2-2h-1",key:"1iynyr"}],["path",{d:"M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z",key:"161ggg"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=e("Server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hm=e("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=e("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lm=e("Shapes",[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",key:"1bo67w"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1",key:"1bkyp8"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",key:"w3z12y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ym=e("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=e("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pm=e("Sheet",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["line",{x1:"3",x2:"21",y1:"9",y2:"9",key:"1vqk6q"}],["line",{x1:"3",x2:"21",y1:"15",y2:"15",key:"o2sbyz"}],["line",{x1:"9",x2:"9",y1:"9",y2:"21",key:"1ib60c"}],["line",{x1:"15",x2:"15",y1:"9",y2:"21",key:"1n26ft"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const um=e("Shell",[["path",{d:"M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",key:"1cn552"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const km=e("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mm=e("ShieldBan",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m4.243 5.21 14.39 12.472",key:"1c9a7c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mm=e("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vm=e("ShieldEllipsis",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 12h.01",key:"1l6xoz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fm=e("ShieldHalf",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 22V2",key:"zs6s6o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gm=e("ShieldMinus",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9 12h6",key:"1c52cq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xm=e("ShieldOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",key:"1jlk70"}],["path",{d:"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",key:"18rp1v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wm=e("ShieldPlus",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9 12h6",key:"1c52cq"}],["path",{d:"M12 9v6",key:"199k2o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lm=e("ShieldQuestion",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=e("ShieldX",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m14.5 9.5-5 5",key:"17q4r4"}],["path",{d:"m9.5 9.5 5 5",key:"18nt4w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=e("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cm=e("ShipWheel",[["circle",{cx:"12",cy:"12",r:"8",key:"46899m"}],["path",{d:"M12 2v7.5",key:"1e5rl5"}],["path",{d:"m19 5-5.23 5.23",key:"1ezxxf"}],["path",{d:"M22 12h-7.5",key:"le1719"}],["path",{d:"m19 19-5.23-5.23",key:"p3fmgn"}],["path",{d:"M12 14.5V22",key:"dgcmos"}],["path",{d:"M10.23 13.77 5 19",key:"qwopd4"}],["path",{d:"M9.5 12H2",key:"r7bup8"}],["path",{d:"M10.23 10.23 5 5",key:"k2y7lj"}],["circle",{cx:"12",cy:"12",r:"2.5",key:"ix0uyj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bm=e("Ship",[["path",{d:"M12 10.189V14",key:"1p8cqu"}],["path",{d:"M12 2v3",key:"qbqxhf"}],["path",{d:"M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6",key:"qpkstq"}],["path",{d:"M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",key:"7tigtc"}],["path",{d:"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"1924j5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cr=e("Shirt",[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Im=e("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sm=e("ShoppingBasket",[["path",{d:"m15 11-1 9",key:"5wnq3a"}],["path",{d:"m19 11-4-7",key:"cnml18"}],["path",{d:"M2 11h20",key:"3eubbj"}],["path",{d:"m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4",key:"yiazzp"}],["path",{d:"M4.5 15.5h15",key:"13mye1"}],["path",{d:"m5 11 4-7",key:"116ra9"}],["path",{d:"m9 11 1 9",key:"1ojof7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=e("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qm=e("Shovel",[["path",{d:"M2 22v-5l5-5 5 5-5 5z",key:"1fh25c"}],["path",{d:"M9.5 14.5 16 8",key:"1smz5x"}],["path",{d:"m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2",key:"1q8uv5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Am=e("ShowerHead",[["path",{d:"m4 4 2.5 2.5",key:"uv2vmf"}],["path",{d:"M13.5 6.5a4.95 4.95 0 0 0-7 7",key:"frdkwv"}],["path",{d:"M15 5 5 15",key:"1ag8rq"}],["path",{d:"M14 17v.01",key:"eokfpp"}],["path",{d:"M10 16v.01",key:"14uyyl"}],["path",{d:"M13 13v.01",key:"1v1k97"}],["path",{d:"M16 10v.01",key:"5169yg"}],["path",{d:"M11 20v.01",key:"cj92p8"}],["path",{d:"M17 14v.01",key:"11cswd"}],["path",{d:"M20 11v.01",key:"19e0od"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jm=e("Shrink",[["path",{d:"m15 15 6 6m-6-6v4.8m0-4.8h4.8",key:"17vawe"}],["path",{d:"M9 19.8V15m0 0H4.2M9 15l-6 6",key:"chjx8e"}],["path",{d:"M15 4.2V9m0 0h4.8M15 9l6-6",key:"lav6yq"}],["path",{d:"M9 4.2V9m0 0H4.2M9 9 3 3",key:"1pxi2q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pm=e("Shrub",[["path",{d:"M12 22v-7l-2-2",key:"eqv9mc"}],["path",{d:"M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0Z",key:"ubcgy"}],["path",{d:"m14 14-2 2",key:"847xa2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zm=e("Shuffle",[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hm=e("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vm=e("SignalHigh",[["path",{d:"M2 20h.01",key:"4haj6o"}],["path",{d:"M7 20v-4",key:"j294jx"}],["path",{d:"M12 20v-8",key:"i3yub9"}],["path",{d:"M17 20V8",key:"1tkaf5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rm=e("SignalLow",[["path",{d:"M2 20h.01",key:"4haj6o"}],["path",{d:"M7 20v-4",key:"j294jx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dm=e("SignalMedium",[["path",{d:"M2 20h.01",key:"4haj6o"}],["path",{d:"M7 20v-4",key:"j294jx"}],["path",{d:"M12 20v-8",key:"i3yub9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tm=e("SignalZero",[["path",{d:"M2 20h.01",key:"4haj6o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fm=e("Signal",[["path",{d:"M2 20h.01",key:"4haj6o"}],["path",{d:"M7 20v-4",key:"j294jx"}],["path",{d:"M12 20v-8",key:"i3yub9"}],["path",{d:"M17 20V8",key:"1tkaf5"}],["path",{d:"M22 4v16",key:"sih9yq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bm=e("Signature",[["path",{d:"m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284",key:"y32ogt"}],["path",{d:"M3 21h18",key:"itz85i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Em=e("SignpostBig",[["path",{d:"M10 9H4L2 7l2-2h6",key:"1hq7x2"}],["path",{d:"M14 5h6l2 2-2 2h-6",key:"bv62ej"}],["path",{d:"M10 22V4a2 2 0 1 1 4 0v18",key:"eqpcf2"}],["path",{d:"M8 22h8",key:"rmew8v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Om=e("Signpost",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M12 3v3",key:"1n5kay"}],["path",{d:"M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z",key:"gqqp9m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Um=e("Siren",[["path",{d:"M7 18v-6a5 5 0 1 1 10 0v6",key:"pcx96s"}],["path",{d:"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",key:"1b4s83"}],["path",{d:"M21 12h1",key:"jtio3y"}],["path",{d:"M18.5 4.5 18 5",key:"g5sp9y"}],["path",{d:"M2 12h1",key:"1uaihz"}],["path",{d:"M12 2v1",key:"11qlp1"}],["path",{d:"m4.929 4.929.707.707",key:"1i51kw"}],["path",{d:"M12 12v6",key:"3ahymv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nm=e("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _m=e("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gm=e("Skull",[["path",{d:"m12.5 17-.5-1-.5 1h1z",key:"3me087"}],["path",{d:"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",key:"1o5pge"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zm=e("Slack",[["rect",{width:"3",height:"8",x:"13",y:"2",rx:"1.5",key:"diqz80"}],["path",{d:"M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5",key:"183iwg"}],["rect",{width:"3",height:"8",x:"8",y:"14",rx:"1.5",key:"hqg7r1"}],["path",{d:"M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5",key:"76g71w"}],["rect",{width:"8",height:"3",x:"14",y:"13",rx:"1.5",key:"1kmz0a"}],["path",{d:"M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5",key:"jc4sz0"}],["rect",{width:"8",height:"3",x:"2",y:"8",rx:"1.5",key:"1omvl4"}],["path",{d:"M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5",key:"16f3cl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wm=e("Slash",[["path",{d:"M22 2 2 22",key:"y4kqgn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xm=e("Slice",[["path",{d:"M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14",key:"1sllp5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Km=e("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa=e("SlidersVertical",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $m=e("SmartphoneCharging",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12.667 8 10 12h4l-2.667 4",key:"h9lk2d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qm=e("SmartphoneNfc",[["rect",{width:"7",height:"12",x:"2",y:"6",rx:"1",key:"5nje8w"}],["path",{d:"M13 8.32a7.43 7.43 0 0 1 0 7.36",key:"1g306n"}],["path",{d:"M16.46 6.21a11.76 11.76 0 0 1 0 11.58",key:"uqvjvo"}],["path",{d:"M19.91 4.1a15.91 15.91 0 0 1 .01 15.8",key:"ujntz3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=e("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jm=e("SmilePlus",[["path",{d:"M22 11v1a10 10 0 1 1-9-10",key:"ew0xw9"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}],["path",{d:"M16 5h6",key:"1vod17"}],["path",{d:"M19 2v6",key:"4bpg5p"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ym=e("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e9=e("Snail",[["path",{d:"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0",key:"hneq2s"}],["circle",{cx:"10",cy:"13",r:"8",key:"194lz3"}],["path",{d:"M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6",key:"ixqyt7"}],["path",{d:"M18 3 19.1 5.2",key:"9tjm43"}],["path",{d:"M22 3 20.9 5.2",key:"j3odrs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t9=e("Snowflake",[["line",{x1:"2",x2:"22",y1:"12",y2:"12",key:"1dnqot"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"m20 16-4-4 4-4",key:"rquw4f"}],["path",{d:"m4 8 4 4-4 4",key:"12s3z9"}],["path",{d:"m16 4-4 4-4-4",key:"1tumq1"}],["path",{d:"m8 20 4-4 4 4",key:"9p200w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a9=e("Sofa",[["path",{d:"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3",key:"1dgpiv"}],["path",{d:"M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",key:"xacw8m"}],["path",{d:"M4 18v2",key:"jwo5n2"}],["path",{d:"M20 18v2",key:"1ar1qi"}],["path",{d:"M12 4v9",key:"oqhhn3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o9=e("Soup",[["path",{d:"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z",key:"4rw317"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M19.5 12 22 6",key:"shfsr5"}],["path",{d:"M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62",key:"rpc6vp"}],["path",{d:"M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62",key:"1lf63m"}],["path",{d:"M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62",key:"97tijn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r9=e("Space",[["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",key:"lt2kga"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n9=e("Spade",[["path",{d:"M5 9c-1.5 1.5-3 3.2-3 5.5A5.5 5.5 0 0 0 7.5 20c1.8 0 3-.5 4.5-2 1.5 1.5 2.7 2 4.5 2a5.5 5.5 0 0 0 5.5-5.5c0-2.3-1.5-4-3-5.5l-7-7-7 7Z",key:"40bo9n"}],["path",{d:"M12 18v4",key:"jadmvz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c9=e("Sparkle",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa=e("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i9=e("Speaker",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["circle",{cx:"12",cy:"14",r:"4",key:"1jruaj"}],["path",{d:"M12 14h.01",key:"1etili"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d9=e("Speech",[["path",{d:"M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20",key:"11atix"}],["path",{d:"M19.8 17.8a7.5 7.5 0 0 0 .003-10.603",key:"yol142"}],["path",{d:"M17 15a3.5 3.5 0 0 0-.025-4.975",key:"ssbmkc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s9=e("SpellCheck2",[["path",{d:"m6 16 6-12 6 12",key:"1b4byz"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1",key:"8mdmtu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h9=e("SpellCheck",[["path",{d:"m6 16 6-12 6 12",key:"1b4byz"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m16 20 2 2 4-4",key:"13tcca"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l9=e("Spline",[["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M5 17A12 12 0 0 1 17 5",key:"1okkup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y9=e("Split",[["path",{d:"M16 3h5v5",key:"1806ms"}],["path",{d:"M8 3H3v5",key:"15dfkv"}],["path",{d:"M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3",key:"1qrqzj"}],["path",{d:"m15 9 6-6",key:"ko1vev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p9=e("SprayCan",[["path",{d:"M3 3h.01",key:"159qn6"}],["path",{d:"M7 5h.01",key:"1hq22a"}],["path",{d:"M11 7h.01",key:"1osv80"}],["path",{d:"M3 7h.01",key:"1xzrh3"}],["path",{d:"M7 9h.01",key:"19b3jx"}],["path",{d:"M3 11h.01",key:"1eifu7"}],["rect",{width:"4",height:"4",x:"15",y:"5",key:"mri9e4"}],["path",{d:"m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2",key:"aib6hk"}],["path",{d:"m13 14 8-2",key:"1d7bmk"}],["path",{d:"m13 19 8-2",key:"1y2vml"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u9=e("Sprout",[["path",{d:"M7 20h10",key:"e6iznv"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10",key:"161w41"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",key:"9gtqwd"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",key:"bkxnd2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aa=e("SquareActivity",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M17 12h-2l-2 5-2-10-2 5H7",key:"15hlnc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=e("SquareArrowDownLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m16 8-8 8",key:"166keh"}],["path",{d:"M16 16H8V8",key:"1w2ppm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=e("SquareArrowDownRight",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m8 8 8 8",key:"1imecy"}],["path",{d:"M16 8v8H8",key:"1lbpgo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za=e("SquareArrowDown",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"m8 12 4 4 4-4",key:"k98ssh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ha=e("SquareArrowLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m12 8-4 4 4 4",key:"15vm53"}],["path",{d:"M16 12H8",key:"1fr5h0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Va=e("SquareArrowOutDownLeft",[["path",{d:"M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6",key:"14qz4y"}],["path",{d:"m3 21 9-9",key:"1jfql5"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=e("SquareArrowOutDownRight",[["path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",key:"14rsvq"}],["path",{d:"m21 21-9-9",key:"1et2py"}],["path",{d:"M21 15v6h-6",key:"1jko0i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Da=e("SquareArrowOutUpLeft",[["path",{d:"M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6",key:"14mv1t"}],["path",{d:"m3 3 9 9",key:"rks13r"}],["path",{d:"M3 9V3h6",key:"ira0h2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=e("SquareArrowOutUpRight",[["path",{d:"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6",key:"y09zxi"}],["path",{d:"m21 3-9 9",key:"mpx6sq"}],["path",{d:"M15 3h6v6",key:"1q9fwt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fa=e("SquareArrowRight",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m12 16 4-4-4-4",key:"1i9zcv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba=e("SquareArrowUpLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 16V8h8",key:"19xb1h"}],["path",{d:"M16 16 8 8",key:"1qdy8n"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=e("SquareArrowUpRight",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 8h8v8",key:"b65dnt"}],["path",{d:"m8 16 8-8",key:"13b9ih"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oa=e("SquareArrowUp",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m16 12-4-4-4 4",key:"177agl"}],["path",{d:"M12 16V8",key:"1sbj14"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua=e("SquareAsterisk",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"m8.5 14 7-4",key:"12hpby"}],["path",{d:"m8.5 10 7 4",key:"wwy2dy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na=e("SquareBottomDashedScissors",[["path",{d:"M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2",key:"1vzg26"}],["path",{d:"M10 22H8",key:"euku7a"}],["path",{d:"M16 22h-2",key:"18d249"}],["circle",{cx:"8",cy:"8",r:"2",key:"14cg06"}],["path",{d:"M9.414 9.414 12 12",key:"qz4lzr"}],["path",{d:"M14.8 14.8 18 18",key:"11flf1"}],["circle",{cx:"8",cy:"16",r:"2",key:"1acxsx"}],["path",{d:"m18 6-8.586 8.586",key:"11kzk1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=e("SquareChartGantt",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 8h7",key:"kbo1nt"}],["path",{d:"M8 12h6",key:"ikassy"}],["path",{d:"M11 16h5",key:"oq65wt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=e("SquareCheckBig",[["path",{d:"M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5",key:"1uzm8b"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ga=e("SquareCheck",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Za=e("SquareChevronDown",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m16 10-4 4-4-4",key:"894hmk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa=e("SquareChevronLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m14 16-4-4 4-4",key:"ojs7w8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xa=e("SquareChevronRight",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m10 8 4 4-4 4",key:"1wy4r4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ka=e("SquareChevronUp",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m8 14 4-4 4 4",key:"fy2ptz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a=e("SquareCode",[["path",{d:"M10 9.5 8 12l2 2.5",key:"3mjy60"}],["path",{d:"m14 9.5 2 2.5-2 2.5",key:"1bir2l"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k9=e("SquareDashedBottomCode",[["path",{d:"M10 9.5 8 12l2 2.5",key:"3mjy60"}],["path",{d:"M14 21h1",key:"v9vybs"}],["path",{d:"m14 9.5 2 2.5-2 2.5",key:"1bir2l"}],["path",{d:"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2",key:"as5y1o"}],["path",{d:"M9 21h1",key:"15o7lz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M9=e("SquareDashedBottom",[["path",{d:"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2",key:"as5y1o"}],["path",{d:"M9 21h1",key:"15o7lz"}],["path",{d:"M14 21h1",key:"v9vybs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=e("SquareDashedKanban",[["path",{d:"M8 7v7",key:"1x2jlm"}],["path",{d:"M12 7v4",key:"xawao1"}],["path",{d:"M16 7v9",key:"1hp2iy"}],["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M9 3h1",key:"1yesri"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M21 9v1",key:"mxsmne"}],["path",{d:"M21 14v1",key:"169vum"}],["path",{d:"M21 19a2 2 0 0 1-2 2",key:"1j7049"}],["path",{d:"M14 21h1",key:"v9vybs"}],["path",{d:"M9 21h1",key:"15o7lz"}],["path",{d:"M5 21a2 2 0 0 1-2-2",key:"sbafld"}],["path",{d:"M3 14v1",key:"vnatye"}],["path",{d:"M3 9v1",key:"1r0deq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ja=e("SquareDashedMousePointer",[["path",{d:"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",key:"xwnzip"}],["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M5 21a2 2 0 0 1-2-2",key:"sbafld"}],["path",{d:"M9 3h1",key:"1yesri"}],["path",{d:"M9 21h2",key:"1qve2z"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M3 9v1",key:"1r0deq"}],["path",{d:"M21 9v2",key:"p14lih"}],["path",{d:"M3 14v1",key:"vnatye"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ya=e("SquareDashed",[["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M21 19a2 2 0 0 1-2 2",key:"1j7049"}],["path",{d:"M5 21a2 2 0 0 1-2-2",key:"sbafld"}],["path",{d:"M9 3h1",key:"1yesri"}],["path",{d:"M9 21h1",key:"15o7lz"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M14 21h1",key:"v9vybs"}],["path",{d:"M3 9v1",key:"1r0deq"}],["path",{d:"M21 9v1",key:"mxsmne"}],["path",{d:"M3 14v1",key:"vnatye"}],["path",{d:"M21 14v1",key:"169vum"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e2=e("SquareDivide",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}],["line",{x1:"12",x2:"12",y1:"16",y2:"16",key:"aqc6ln"}],["line",{x1:"12",x2:"12",y1:"8",y2:"8",key:"1mkcni"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=e("SquareDot",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a2=e("SquareEqual",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 10h10",key:"1101jm"}],["path",{d:"M7 14h10",key:"1mhdw3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o2=e("SquareFunction",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3",key:"m1af9g"}],["path",{d:"M9 11.2h5.7",key:"3zgcl2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r2=e("SquareKanban",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 7v7",key:"1x2jlm"}],["path",{d:"M12 7v4",key:"xawao1"}],["path",{d:"M16 7v9",key:"1hp2iy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=e("SquareLibrary",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 7v10",key:"d5nglc"}],["path",{d:"M11 7v10",key:"pptsnr"}],["path",{d:"m15 7 2 10",key:"1m7qm5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c2=e("SquareM",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 16V8l4 4 4-4v8",key:"141u4e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i2=e("SquareMenu",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 8h10",key:"1jw688"}],["path",{d:"M7 12h10",key:"b7w52i"}],["path",{d:"M7 16h10",key:"wp8him"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d2=e("SquareMinus",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s2=e("SquareMousePointer",[["path",{d:"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",key:"xwnzip"}],["path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",key:"14rsvq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=e("SquareParkingOff",[["path",{d:"M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41",key:"9l1ft6"}],["path",{d:"M3 8.7V19a2 2 0 0 0 2 2h10.3",key:"17knke"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M13 13a3 3 0 1 0 0-6H9v2",key:"uoagbd"}],["path",{d:"M9 17v-2.3",key:"1jxgo2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=e("SquareParking",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 17V7h4a3 3 0 0 1 0 6H9",key:"1dfk2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=e("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y2=e("SquarePercent",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 15h.01",key:"lqbp3k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p2=e("SquarePi",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 7h10",key:"udp07y"}],["path",{d:"M10 7v10",key:"i1d9ee"}],["path",{d:"M16 17a2 2 0 0 1-2-2V7",key:"ftwdc7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=e("SquarePilcrow",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 12H9.5a2.5 2.5 0 0 1 0-5H17",key:"1l9586"}],["path",{d:"M12 7v10",key:"jspqdw"}],["path",{d:"M16 7v10",key:"lavkr4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k2=e("SquarePlay",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m9 8 6 4-6 4Z",key:"f1r3lt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M2=e("SquarePlus",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m2=e("SquarePower",[["path",{d:"M12 7v4",key:"xawao1"}],["path",{d:"M7.998 9.003a5 5 0 1 0 8-.005",key:"1pek45"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m9=e("SquareRadical",[["path",{d:"M7 12h2l2 5 2-10h4",key:"1fxv6h"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v2=e("SquareScissors",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"2",key:"1btzen"}],["circle",{cx:"8",cy:"8",r:"2",key:"14cg06"}],["path",{d:"M9.414 9.414 12 12",key:"qz4lzr"}],["path",{d:"M14.8 14.8 18 18",key:"11flf1"}],["circle",{cx:"8",cy:"16",r:"2",key:"1acxsx"}],["path",{d:"m18 6-8.586 8.586",key:"11kzk1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f2=e("SquareSigma",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M16 8.9V7H8l4 5-4 5h8v-1.9",key:"9nih0i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=e("SquareSlash",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["line",{x1:"9",x2:"15",y1:"15",y2:"9",key:"1dfufj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x2=e("SquareSplitHorizontal",[["path",{d:"M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3",key:"lubmu8"}],["path",{d:"M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3",key:"1ag34g"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w2=e("SquareSplitVertical",[["path",{d:"M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3",key:"1pi83i"}],["path",{d:"M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3",key:"ido5k7"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v9=e("SquareSquare",[["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f9=e("SquareStack",[["path",{d:"M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2",key:"4i38lg"}],["path",{d:"M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2",key:"mlte4a"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2",key:"1fa9i4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L2=e("SquareTerminal",[["path",{d:"m7 11 2-2-2-2",key:"1lz0vl"}],["path",{d:"M11 13h4",key:"1p7l4v"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C2=e("SquareUserRound",[["path",{d:"M18 21a6 6 0 0 0-12 0",key:"kaz2du"}],["circle",{cx:"12",cy:"11",r:"4",key:"1gt34v"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b2=e("SquareUser",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",key:"1m6ac2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I2=e("SquareX",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ir=e("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g9=e("Squircle",[["path",{d:"M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9",key:"garfkc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x9=e("Squirrel",[["path",{d:"M15.236 22a3 3 0 0 0-2.2-5",key:"21bitc"}],["path",{d:"M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4",key:"oh0fg0"}],["path",{d:"M18 13h.01",key:"9veqaj"}],["path",{d:"M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",key:"980v8a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w9=e("Stamp",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z",key:"1sy9ra"}],["path",{d:"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13",key:"cnxgux"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L9=e("StarHalf",[["path",{d:"M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",key:"2ksp49"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C9=e("StarOff",[["path",{d:"M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43",key:"16m0ql"}],["path",{d:"M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91",key:"1vt8nq"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=e("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b9=e("StepBack",[["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["polygon",{points:"14,20 4,12 14,4",key:"ypakod"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I9=e("StepForward",[["line",{x1:"6",x2:"6",y1:"4",y2:"20",key:"fy8qot"}],["polygon",{points:"10,4 20,12 10,20",key:"1mc1pf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S9=e("Stethoscope",[["path",{d:"M11 2v2",key:"1539x4"}],["path",{d:"M5 2v2",key:"1yf1q8"}],["path",{d:"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",key:"rb5t3r"}],["path",{d:"M8 15a6 6 0 0 0 12 0v-3",key:"x18d4x"}],["circle",{cx:"20",cy:"10",r:"2",key:"ts1r5v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q9=e("Sticker",[["path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z",key:"1wis1t"}],["path",{d:"M14 3v4a2 2 0 0 0 2 2h4",key:"36rjfy"}],["path",{d:"M8 13h.01",key:"1sbv64"}],["path",{d:"M16 13h.01",key:"wip0gl"}],["path",{d:"M10 16s.8 1 2 1c1.3 0 2-1 2-1",key:"1vvgv3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A9=e("StickyNote",[["path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",key:"qazsjp"}],["path",{d:"M15 3v4a2 2 0 0 0 2 2h4",key:"40519r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j9=e("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",key:"6c3vgh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P9=e("StretchHorizontal",[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2",key:"qdearl"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2",key:"1xrn6j"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z9=e("StretchVertical",[["rect",{width:"6",height:"20",x:"4",y:"2",rx:"2",key:"19qu7m"}],["rect",{width:"6",height:"20",x:"14",y:"2",rx:"2",key:"24v0nk"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H9=e("Strikethrough",[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4",key:"43sutm"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6",key:"nlfj13"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V9=e("Subscript",[["path",{d:"m4 5 8 8",key:"1eunvl"}],["path",{d:"m12 5-8 8",key:"1ah0jp"}],["path",{d:"M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",key:"e8ta8j"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R9=e("SunDim",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 4h.01",key:"1ujb9j"}],["path",{d:"M20 12h.01",key:"1ykeid"}],["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M4 12h.01",key:"158zrr"}],["path",{d:"M17.657 6.343h.01",key:"31pqzk"}],["path",{d:"M17.657 17.657h.01",key:"jehnf4"}],["path",{d:"M6.343 17.657h.01",key:"gdk6ow"}],["path",{d:"M6.343 6.343h.01",key:"1uurf0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D9=e("SunMedium",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 3v1",key:"1asbbs"}],["path",{d:"M12 20v1",key:"1wcdkc"}],["path",{d:"M3 12h1",key:"lp3yf2"}],["path",{d:"M20 12h1",key:"1vloll"}],["path",{d:"m18.364 5.636-.707.707",key:"1hakh0"}],["path",{d:"m6.343 17.657-.707.707",key:"18m9nf"}],["path",{d:"m5.636 5.636.707.707",key:"1xv1c5"}],["path",{d:"m17.657 17.657.707.707",key:"vl76zb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T9=e("SunMoon",[["path",{d:"M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4",key:"1fu5g2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.9 4.9 1.4 1.4",key:"b9915j"}],["path",{d:"m17.7 17.7 1.4 1.4",key:"qc3ed3"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.3 17.7-1.4 1.4",key:"5gca6"}],["path",{d:"m19.1 4.9-1.4 1.4",key:"wpu9u6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F9=e("SunSnow",[["path",{d:"M10 9a3 3 0 1 0 0 6",key:"6zmtdl"}],["path",{d:"M2 12h1",key:"1uaihz"}],["path",{d:"M14 21V3",key:"1llu3z"}],["path",{d:"M10 4V3",key:"pkzwkn"}],["path",{d:"M10 21v-1",key:"1u8rkd"}],["path",{d:"m3.64 18.36.7-.7",key:"105rm9"}],["path",{d:"m4.34 6.34-.7-.7",key:"d3unjp"}],["path",{d:"M14 12h8",key:"4f43i9"}],["path",{d:"m17 4-3 3",key:"15jcng"}],["path",{d:"m14 17 3 3",key:"6tlq38"}],["path",{d:"m21 15-3-3 3-3",key:"1nlnje"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=e("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B9=e("Sunrise",[["path",{d:"M12 2v8",key:"1q4o3n"}],["path",{d:"m4.93 10.93 1.41 1.41",key:"2a7f42"}],["path",{d:"M2 18h2",key:"j10viu"}],["path",{d:"M20 18h2",key:"wocana"}],["path",{d:"m19.07 10.93-1.41 1.41",key:"15zs5n"}],["path",{d:"M22 22H2",key:"19qnx5"}],["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}],["path",{d:"M16 18a4 4 0 0 0-8 0",key:"1lzouq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E9=e("Sunset",[["path",{d:"M12 10V2",key:"16sf7g"}],["path",{d:"m4.93 10.93 1.41 1.41",key:"2a7f42"}],["path",{d:"M2 18h2",key:"j10viu"}],["path",{d:"M20 18h2",key:"wocana"}],["path",{d:"m19.07 10.93-1.41 1.41",key:"15zs5n"}],["path",{d:"M22 22H2",key:"19qnx5"}],["path",{d:"m16 6-4 4-4-4",key:"6wukr"}],["path",{d:"M16 18a4 4 0 0 0-8 0",key:"1lzouq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O9=e("Superscript",[["path",{d:"m4 19 8-8",key:"hr47gm"}],["path",{d:"m12 19-8-8",key:"1dhhmo"}],["path",{d:"M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",key:"1dfcux"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U9=e("SwatchBook",[["path",{d:"M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z",key:"1ldrpk"}],["path",{d:"M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7",key:"11i5po"}],["path",{d:"M 7 17h.01",key:"1euzgo"}],["path",{d:"m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",key:"o2gii7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N9=e("SwissFranc",[["path",{d:"M10 21V3h8",key:"br2l0g"}],["path",{d:"M6 16h9",key:"2py0wn"}],["path",{d:"M10 9.5h7",key:"13dmhz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _9=e("SwitchCamera",[["path",{d:"M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5",key:"mtk2lu"}],["path",{d:"M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5",key:"120jsl"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"m18 22-3-3 3-3",key:"kgdoj7"}],["path",{d:"m6 2 3 3-3 3",key:"1fnbkv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G9=e("Sword",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z9=e("Swords",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5",key:"hbey2j"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18",key:"1hf58s"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20",key:"pidxm4"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21",key:"1pehsh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W9=e("Syringe",[["path",{d:"m18 2 4 4",key:"22kx64"}],["path",{d:"m17 7 3-3",key:"1w1zoj"}],["path",{d:"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5",key:"1exhtz"}],["path",{d:"m9 11 4 4",key:"rovt3i"}],["path",{d:"m5 19-3 3",key:"59f2uf"}],["path",{d:"m14 4 6 6",key:"yqp9t2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X9=e("Table2",[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",key:"gugj83"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K9=e("TableCellsMerge",[["path",{d:"M12 21v-6",key:"lihzve"}],["path",{d:"M12 9V3",key:"da5inc"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M3 9h18",key:"1pudct"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $9=e("TableCellsSplit",[["path",{d:"M12 15V9",key:"8c7uyn"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M3 9h18",key:"1pudct"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q9=e("TableColumnsSplit",[["path",{d:"M14 14v2",key:"w2a1xv"}],["path",{d:"M14 20v2",key:"1lq872"}],["path",{d:"M14 2v2",key:"6buw04"}],["path",{d:"M14 8v2",key:"i67w9a"}],["path",{d:"M2 15h8",key:"82wtch"}],["path",{d:"M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2",key:"up0l64"}],["path",{d:"M2 9h8",key:"yelfik"}],["path",{d:"M22 15h-4",key:"1es58f"}],["path",{d:"M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2",key:"pdjoqf"}],["path",{d:"M22 9h-4",key:"1luja7"}],["path",{d:"M5 3v18",key:"14hmio"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J9=e("TableOfContents",[["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M21 12h.01",key:"msek7k"}],["path",{d:"M21 18h.01",key:"1e8rq1"}],["path",{d:"M21 6h.01",key:"1koanj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y9=e("TableProperties",[["path",{d:"M15 3v18",key:"14nvp0"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ev=e("TableRowsSplit",[["path",{d:"M14 10h2",key:"1lstlu"}],["path",{d:"M15 22v-8",key:"1fwwgm"}],["path",{d:"M15 2v4",key:"1044rn"}],["path",{d:"M2 10h2",key:"1r8dkt"}],["path",{d:"M20 10h2",key:"1ug425"}],["path",{d:"M3 19h18",key:"awlh7x"}],["path",{d:"M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6",key:"ibqhof"}],["path",{d:"M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2",key:"1uenja"}],["path",{d:"M8 10h2",key:"66od0"}],["path",{d:"M9 22v-8",key:"fmnu31"}],["path",{d:"M9 2v4",key:"j1yeou"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tv=e("Table",[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const av=e("TabletSmartphone",[["rect",{width:"10",height:"14",x:"3",y:"8",rx:"2",key:"1vrsiq"}],["path",{d:"M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4",key:"1j4zmg"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ov=e("Tablet",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rv=e("Tablets",[["circle",{cx:"7",cy:"7",r:"5",key:"x29byf"}],["circle",{cx:"17",cy:"17",r:"5",key:"1op1d2"}],["path",{d:"M12 17h10",key:"ls21zv"}],["path",{d:"m3.46 10.54 7.08-7.08",key:"1rehiu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ar=e("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nv=e("Tags",[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19",key:"1cbfv1"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",key:"135mg7"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor",key:"5pm5xn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cv=e("Tally1",[["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iv=e("Tally2",[["path",{d:"M4 4v16",key:"6qkkli"}],["path",{d:"M9 4v16",key:"81ygyz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dv=e("Tally3",[["path",{d:"M4 4v16",key:"6qkkli"}],["path",{d:"M9 4v16",key:"81ygyz"}],["path",{d:"M14 4v16",key:"12vmem"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sv=e("Tally4",[["path",{d:"M4 4v16",key:"6qkkli"}],["path",{d:"M9 4v16",key:"81ygyz"}],["path",{d:"M14 4v16",key:"12vmem"}],["path",{d:"M19 4v16",key:"8ij5ei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hv=e("Tally5",[["path",{d:"M4 4v16",key:"6qkkli"}],["path",{d:"M9 4v16",key:"81ygyz"}],["path",{d:"M14 4v16",key:"12vmem"}],["path",{d:"M19 4v16",key:"8ij5ei"}],["path",{d:"M22 6 2 18",key:"h9moai"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lv=e("Tangent",[["circle",{cx:"17",cy:"4",r:"2",key:"y5j2s2"}],["path",{d:"M15.59 5.41 5.41 15.59",key:"l0vprr"}],["circle",{cx:"4",cy:"17",r:"2",key:"9p4efm"}],["path",{d:"M12 22s-4-9-1.5-11.5S22 12 22 12",key:"1twk4o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=e("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pv=e("Telescope",[["path",{d:"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44",key:"k4qptu"}],["path",{d:"m13.56 11.747 4.332-.924",key:"19l80z"}],["path",{d:"m16 21-3.105-6.21",key:"7oh9d"}],["path",{d:"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z",key:"m7xp4m"}],["path",{d:"m6.158 8.633 1.114 4.456",key:"74o979"}],["path",{d:"m8 21 3.105-6.21",key:"1fvxut"}],["circle",{cx:"12",cy:"13",r:"2",key:"1c1ljs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uv=e("TentTree",[["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}],["path",{d:"m14 5 3-3 3 3",key:"1sorif"}],["path",{d:"m14 10 3-3 3 3",key:"1jyi9h"}],["path",{d:"M17 14V2",key:"8ymqnk"}],["path",{d:"M17 14H7l-5 8h20Z",key:"13ar7p"}],["path",{d:"M8 14v8",key:"1ghmqk"}],["path",{d:"m9 14 5 8",key:"13pgi6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kv=e("Tent",[["path",{d:"M3.5 21 14 3",key:"1szst5"}],["path",{d:"M20.5 21 10 3",key:"1310c3"}],["path",{d:"M15.5 21 12 15l-3.5 6",key:"1ddtfw"}],["path",{d:"M2 21h20",key:"1nyx9w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mv=e("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S2=e("TestTubeDiagonal",[["path",{d:"M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3",key:"1ub6xw"}],["path",{d:"m16 2 6 6",key:"1gw87d"}],["path",{d:"M12 16H4",key:"1cjfip"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=e("TestTube",[["path",{d:"M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2",key:"125lnx"}],["path",{d:"M8.5 2h7",key:"csnxdl"}],["path",{d:"M14.5 16h-5",key:"1ox875"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vv=e("TestTubes",[["path",{d:"M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2",key:"1hjrqt"}],["path",{d:"M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2",key:"16lc8n"}],["path",{d:"M3 2h7",key:"7s29d5"}],["path",{d:"M14 2h7",key:"7sicin"}],["path",{d:"M9 16H4",key:"1bfye3"}],["path",{d:"M20 16h-5",key:"ddnjpe"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fv=e("TextCursorInput",[["path",{d:"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1",key:"18xjzo"}],["path",{d:"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5",key:"fj48gi"}],["path",{d:"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1",key:"1n9rhb"}],["path",{d:"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7",key:"13ksps"}],["path",{d:"M9 7v10",key:"1vc8ob"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=e("TextCursor",[["path",{d:"M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1",key:"uvaxm9"}],["path",{d:"M7 22h1a4 4 0 0 0 4-4v-1",key:"11xy8d"}],["path",{d:"M7 2h1a4 4 0 0 1 4 4v1",key:"1uw06m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xv=e("TextQuote",[["path",{d:"M17 6H3",key:"16j9eg"}],["path",{d:"M21 12H8",key:"scolzb"}],["path",{d:"M21 18H8",key:"1wfozv"}],["path",{d:"M3 12v6",key:"fv4c87"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=e("TextSearch",[["path",{d:"M21 6H3",key:"1jwq7v"}],["path",{d:"M10 12H3",key:"1ulcyk"}],["path",{d:"M10 18H3",key:"13769t"}],["circle",{cx:"17",cy:"15",r:"3",key:"1upz2a"}],["path",{d:"m21 19-1.9-1.9",key:"dwi7p8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=e("TextSelect",[["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M21 19a2 2 0 0 1-2 2",key:"1j7049"}],["path",{d:"M5 21a2 2 0 0 1-2-2",key:"sbafld"}],["path",{d:"M9 3h1",key:"1yesri"}],["path",{d:"M9 21h1",key:"15o7lz"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M14 21h1",key:"v9vybs"}],["path",{d:"M3 9v1",key:"1r0deq"}],["path",{d:"M21 9v1",key:"mxsmne"}],["path",{d:"M3 14v1",key:"vnatye"}],["path",{d:"M21 14v1",key:"169vum"}],["line",{x1:"7",x2:"15",y1:"8",y2:"8",key:"1758g8"}],["line",{x1:"7",x2:"17",y1:"12",y2:"12",key:"197423"}],["line",{x1:"7",x2:"13",y1:"16",y2:"16",key:"37cgm6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lv=e("Text",[["path",{d:"M17 6.1H3",key:"wptmhv"}],["path",{d:"M21 12.1H3",key:"1j38uz"}],["path",{d:"M15.1 18H3",key:"1nb16a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=e("Theater",[["path",{d:"M2 10s3-3 3-8",key:"3xiif0"}],["path",{d:"M22 10s-3-3-3-8",key:"ioaa5q"}],["path",{d:"M10 2c0 4.4-3.6 8-8 8",key:"16fkpi"}],["path",{d:"M14 2c0 4.4 3.6 8 8 8",key:"b9eulq"}],["path",{d:"M2 10s2 2 2 5",key:"1au1lb"}],["path",{d:"M22 10s-2 2-2 5",key:"qi2y5e"}],["path",{d:"M8 15h8",key:"45n4r"}],["path",{d:"M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1",key:"1vsc2m"}],["path",{d:"M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1",key:"hrha4u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=e("ThermometerSnowflake",[["path",{d:"M2 12h10",key:"19562f"}],["path",{d:"M9 4v16",key:"81ygyz"}],["path",{d:"m3 9 3 3-3 3",key:"1sas0l"}],["path",{d:"M12 6 9 9 6 6",key:"pfrgxu"}],["path",{d:"m6 18 3-3 1.5 1.5",key:"1e277p"}],["path",{d:"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"iof6y5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iv=e("ThermometerSun",[["path",{d:"M12 9a4 4 0 0 0-2 7.5",key:"1jvsq6"}],["path",{d:"M12 3v2",key:"1w22ol"}],["path",{d:"m6.6 18.4-1.4 1.4",key:"w2yidj"}],["path",{d:"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"iof6y5"}],["path",{d:"M4 13H2",key:"118le4"}],["path",{d:"M6.34 7.34 4.93 5.93",key:"1brd51"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=e("Thermometer",[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"17jzev"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qv=e("ThumbsDown",[["path",{d:"M17 14V2",key:"8ymqnk"}],["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",key:"m61m77"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Av=e("ThumbsUp",[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jv=e("TicketCheck",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pv=e("TicketMinus",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M9 12h6",key:"1c52cq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zv=e("TicketPercent",[["path",{d:"M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"1l48ns"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M15 15h.01",key:"lqbp3k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hv=e("TicketPlus",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M9 12h6",key:"1c52cq"}],["path",{d:"M12 9v6",key:"199k2o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vv=e("TicketSlash",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"m9.5 14.5 5-5",key:"qviqfa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=e("TicketX",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"m9.5 14.5 5-5",key:"qviqfa"}],["path",{d:"m9.5 9.5 5 5",key:"18nt4w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=e("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tv=e("TicketsPlane",[["path",{d:"M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12",key:"16muxl"}],["path",{d:"m12 13.5 3.75.5",key:"1i9qhk"}],["path",{d:"m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8",key:"12lg5p"}],["path",{d:"M6 10V8",key:"1y41hn"}],["path",{d:"M6 14v1",key:"cao2tf"}],["path",{d:"M6 19v2",key:"1loha6"}],["rect",{x:"2",y:"8",width:"20",height:"13",rx:"2",key:"p3bz5l"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fv=e("Tickets",[["path",{d:"m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8",key:"12lg5p"}],["path",{d:"M6 10V8",key:"1y41hn"}],["path",{d:"M6 14v1",key:"cao2tf"}],["path",{d:"M6 19v2",key:"1loha6"}],["rect",{x:"2",y:"8",width:"20",height:"13",rx:"2",key:"p3bz5l"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bv=e("TimerOff",[["path",{d:"M10 2h4",key:"n1abiw"}],["path",{d:"M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7",key:"10he05"}],["path",{d:"M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2",key:"15f7sh"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M12 12v-2",key:"fwoke6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ev=e("TimerReset",[["path",{d:"M10 2h4",key:"n1abiw"}],["path",{d:"M12 14v-4",key:"1evpnu"}],["path",{d:"M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6",key:"1ts96g"}],["path",{d:"M9 17H4v5",key:"8t5av"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ov=e("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uv=e("ToggleLeft",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"8",cy:"12",r:"2",key:"1nvbw3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=e("ToggleRight",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"16",cy:"12",r:"2",key:"4ma0v8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _v=e("Toilet",[["path",{d:"M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18",key:"kc4kqr"}],["path",{d:"M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8",key:"1tqs57"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gv=e("Tornado",[["path",{d:"M21 4H3",key:"1hwok0"}],["path",{d:"M18 8H6",key:"41n648"}],["path",{d:"M19 12H9",key:"1g4lpz"}],["path",{d:"M16 16h-6",key:"1j5d54"}],["path",{d:"M11 20H9",key:"39obr8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zv=e("Torus",[["ellipse",{cx:"12",cy:"11",rx:"3",ry:"2",key:"1b2qxu"}],["ellipse",{cx:"12",cy:"12.5",rx:"10",ry:"8.5",key:"h8emeu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wv=e("TouchpadOff",[["path",{d:"M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16",key:"lnt0bk"}],["path",{d:"M2 14h12",key:"d8icqz"}],["path",{d:"M22 14h-2",key:"jrx26d"}],["path",{d:"M12 20v-6",key:"1rm09r"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M22 16V6a2 2 0 0 0-2-2H10",key:"11y8e4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xv=e("Touchpad",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M2 14h20",key:"myj16y"}],["path",{d:"M12 20v-6",key:"1rm09r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kv=e("TowerControl",[["path",{d:"M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z",key:"1pledb"}],["path",{d:"M8 13v9",key:"hmv0ci"}],["path",{d:"M16 22v-9",key:"ylnf1u"}],["path",{d:"m9 6 1 7",key:"dpdgam"}],["path",{d:"m15 6-1 7",key:"ls7zgu"}],["path",{d:"M12 6V2",key:"1pj48d"}],["path",{d:"M13 2h-2",key:"mj6ths"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $v=e("ToyBrick",[["rect",{width:"18",height:"12",x:"3",y:"8",rx:"1",key:"158fvp"}],["path",{d:"M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3",key:"s0042v"}],["path",{d:"M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3",key:"9wmeh2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qv=e("Tractor",[["path",{d:"m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20",key:"she1j9"}],["path",{d:"M16 18h-5",key:"bq60fd"}],["path",{d:"M18 5a1 1 0 0 0-1 1v5.573",key:"1kv8ia"}],["path",{d:"M3 4h8.129a1 1 0 0 1 .99.863L13 11.246",key:"1q1ert"}],["path",{d:"M4 11V4",key:"9ft8pt"}],["path",{d:"M7 15h.01",key:"k5ht0j"}],["path",{d:"M8 10.1V4",key:"1jgyzo"}],["circle",{cx:"18",cy:"18",r:"2",key:"1emm8v"}],["circle",{cx:"7",cy:"15",r:"5",key:"ddtuc"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jv=e("TrafficCone",[["path",{d:"M9.3 6.2a4.55 4.55 0 0 0 5.4 0",key:"flyxqv"}],["path",{d:"M7.9 10.7c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3",key:"1nlxxg"}],["path",{d:"M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6 0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5Z",key:"vz7x1l"}],["path",{d:"m7.5 12.2-4.7 2.7c-.5.3-.8.7-.8 1.1s.3.8.8 1.1l7.6 4.5c.9.5 2.1.5 3 0l7.6-4.5c.7-.3 1-.7 1-1.1s-.3-.8-.8-1.1l-4.7-2.8",key:"1xfzlw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yv=e("TrainFrontTunnel",[["path",{d:"M2 22V12a10 10 0 1 1 20 0v10",key:"o0fyp0"}],["path",{d:"M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8",key:"m8q3n9"}],["path",{d:"M10 15h.01",key:"44in9x"}],["path",{d:"M14 15h.01",key:"5mohn5"}],["path",{d:"M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z",key:"hckbmu"}],["path",{d:"m9 19-2 3",key:"iij7hm"}],["path",{d:"m15 19 2 3",key:"npx8sa"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ef=e("TrainFront",[["path",{d:"M8 3.1V7a4 4 0 0 0 8 0V3.1",key:"1v71zp"}],["path",{d:"m9 15-1-1",key:"1yrq24"}],["path",{d:"m15 15 1-1",key:"1t0d6s"}],["path",{d:"M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z",key:"1p0hjs"}],["path",{d:"m8 19-2 3",key:"13i0xs"}],["path",{d:"m16 19 2 3",key:"xo31yx"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tf=e("TrainTrack",[["path",{d:"M2 17 17 2",key:"18b09t"}],["path",{d:"m2 14 8 8",key:"1gv9hu"}],["path",{d:"m5 11 8 8",key:"189pqp"}],["path",{d:"m8 8 8 8",key:"1imecy"}],["path",{d:"m11 5 8 8",key:"ummqn6"}],["path",{d:"m14 2 8 8",key:"1vk7dn"}],["path",{d:"M7 22 22 7",key:"15mb1i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A2=e("TramFront",[["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2",key:"1wxw4b"}],["path",{d:"M4 11h16",key:"mpoxn0"}],["path",{d:"M12 3v8",key:"1h2ygw"}],["path",{d:"m8 19-2 3",key:"13i0xs"}],["path",{d:"m18 22-2-3",key:"1p0ohu"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M16 15h.01",key:"rnfrdf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=e("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=e("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rf=e("TreeDeciduous",[["path",{d:"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z",key:"oadzkq"}],["path",{d:"M12 19v3",key:"npa21l"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2=e("TreePalm",[["path",{d:"M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4",key:"foxbe7"}],["path",{d:"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3",key:"18arnh"}],["path",{d:"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35",key:"ywahnh"}],["path",{d:"M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14",key:"ft0feo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nf=e("TreePine",[["path",{d:"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",key:"cpyugq"}],["path",{d:"M12 22v-3",key:"kmzjlo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=e("Trees",[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z",key:"1l6gj6"}],["path",{d:"M7 16v6",key:"1a82de"}],["path",{d:"M13 19v3",key:"13sx9i"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",key:"1sj9kv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=e("Trello",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["rect",{width:"3",height:"9",x:"7",y:"7",key:"14n3xi"}],["rect",{width:"3",height:"5",x:"14",y:"7",key:"s4azjd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=e("TrendingDown",[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7",key:"1r2t7k"}],["polyline",{points:"16 17 22 17 22 11",key:"11uiuu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=e("TrendingUpDown",[["path",{d:"M14.828 14.828 21 21",key:"ar5fw7"}],["path",{d:"M21 16v5h-5",key:"1ck2sf"}],["path",{d:"m21 3-9 9-4-4-6 6",key:"1h02xo"}],["path",{d:"M21 8V3h-5",key:"1qoq8a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=e("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=e("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=e("TriangleRight",[["path",{d:"M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z",key:"183wce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=e("Triangle",[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"14u9p9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=e("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=e("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=e("Turtle",[["path",{d:"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z",key:"1lbbv7"}],["path",{d:"M4.82 7.9 8 10",key:"m9wose"}],["path",{d:"M15.18 7.9 12 10",key:"p8dp2u"}],["path",{d:"M16.93 10H20a2 2 0 0 1 0 4H2",key:"12nsm7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=e("TvMinimalPlay",[["path",{d:"M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z",key:"1pctta"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2=e("TvMinimal",[["path",{d:"M7 21h10",key:"1b0cd5"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=e("Tv",[["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",ry:"2",key:"10ag99"}],["polyline",{points:"17 2 12 7 7 2",key:"11pgbg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=e("Twitch",[["path",{d:"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7",key:"c0yzno"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=e("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=e("TypeOutline",[["path",{d:"M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z",key:"1reda3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=e("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=e("UmbrellaOff",[["path",{d:"M12 2v1",key:"11qlp1"}],["path",{d:"M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575",key:"eki10q"}],["path",{d:"M17.5 12H22A10 10 0 0 0 9.004 3.455",key:"n2ayka"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=e("Umbrella",[["path",{d:"M22 12a10.06 10.06 1 0 0-20 0Z",key:"1teyop"}],["path",{d:"M12 12v8a2 2 0 0 0 4 0",key:"ulpmoc"}],["path",{d:"M12 2v1",key:"11qlp1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=e("Underline",[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4",key:"9kb039"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20",key:"nun2al"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=e("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=e("UndoDot",[["path",{d:"M21 17a9 9 0 0 0-15-6.7L3 13",key:"8mp6z9"}],["path",{d:"M3 7v6h6",key:"1v2h90"}],["circle",{cx:"12",cy:"17",r:"1",key:"1ixnty"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=e("Undo",[["path",{d:"M3 7v6h6",key:"1v2h90"}],["path",{d:"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",key:"1r6uu6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=e("UnfoldHorizontal",[["path",{d:"M16 12h6",key:"15xry1"}],["path",{d:"M8 12H2",key:"1jqql6"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m19 15 3-3-3-3",key:"wjy7rq"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qf=e("UnfoldVertical",[["path",{d:"M12 22v-6",key:"6o8u61"}],["path",{d:"M12 8V2",key:"1wkif3"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m15 5-3-3-3 3",key:"itvq4r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=e("Ungroup",[["rect",{width:"8",height:"6",x:"5",y:"4",rx:"1",key:"nzclkv"}],["rect",{width:"8",height:"6",x:"11",y:"14",rx:"1",key:"4tytwb"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=e("University",[["circle",{cx:"12",cy:"10",r:"1",key:"1gnqs8"}],["path",{d:"M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2",key:"1qj5sn"}],["path",{d:"M6 17v.01",key:"roodi6"}],["path",{d:"M6 13v.01",key:"67c122"}],["path",{d:"M18 17v.01",key:"12ktxm"}],["path",{d:"M18 13v.01",key:"tn1rt1"}],["path",{d:"M14 22v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5",key:"11g7fi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=e("Unlink2",[["path",{d:"M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2",key:"1re2ne"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=e("Unlink",[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",key:"yqzxt4"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",key:"4qinb0"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5",key:"1041cp"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8",key:"14m1p5"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22",key:"rzdirn"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16",key:"ox905f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=e("Unplug",[["path",{d:"m19 5 3-3",key:"yk6iyv"}],["path",{d:"m2 22 3-3",key:"19mgm9"}],["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",key:"goz73y"}],["path",{d:"M7.5 13.5 10 11",key:"7xgeeb"}],["path",{d:"M10.5 16.5 13 14",key:"10btkg"}],["path",{d:"m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",key:"1snsnr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pr=e("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=e("Usb",[["circle",{cx:"10",cy:"7",r:"1",key:"dypaad"}],["circle",{cx:"4",cy:"20",r:"1",key:"22iqad"}],["path",{d:"M4.7 19.3 19 5",key:"1enqfc"}],["path",{d:"m21 3-3 1 2 2Z",key:"d3ov82"}],["path",{d:"M9.26 7.68 5 12l2 5",key:"1esawj"}],["path",{d:"m10 14 5 2 3.5-3.5",key:"v8oal5"}],["path",{d:"m18 12 1-1 1 1-1 1Z",key:"1bh22v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=e("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=e("UserCog",[["circle",{cx:"18",cy:"15",r:"3",key:"gjjjvw"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M10 15H6a4 4 0 0 0-4 4v2",key:"1nfge6"}],["path",{d:"m21.7 16.4-.9-.3",key:"12j9ji"}],["path",{d:"m15.2 13.9-.9-.3",key:"1fdjdi"}],["path",{d:"m16.6 18.7.3-.9",key:"heedtr"}],["path",{d:"m19.1 12.2.3-.9",key:"1af3ki"}],["path",{d:"m19.6 18.7-.4-1",key:"1x9vze"}],["path",{d:"m16.8 12.3-.4-1",key:"vqeiwj"}],["path",{d:"m14.3 16.6 1-.4",key:"1qlj63"}],["path",{d:"m20.7 13.8 1-.4",key:"1v5t8k"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=e("UserMinus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=e("UserPen",[["path",{d:"M11.5 15H7a4 4 0 0 0-4 4v2",key:"15lzij"}],["path",{d:"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1817ys"}],["circle",{cx:"10",cy:"7",r:"4",key:"e45bow"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=e("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2=e("UserRoundCheck",[["path",{d:"M2 21a8 8 0 0 1 13.292-6",key:"bjp14o"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=e("UserRoundCog",[["path",{d:"M2 21a8 8 0 0 1 10.434-7.62",key:"1yezr2"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["path",{d:"m19.5 14.3-.4.9",key:"1eb35c"}],["path",{d:"m16.9 20.8-.4.9",key:"dfjc4z"}],["path",{d:"m21.7 19.5-.9-.4",key:"q4dx6b"}],["path",{d:"m15.2 16.9-.9-.4",key:"1r0w5f"}],["path",{d:"m21.7 16.5-.9.4",key:"1knoei"}],["path",{d:"m15.2 19.1-.9.4",key:"j188fs"}],["path",{d:"m19.5 21.7-.4-.9",key:"1tonu5"}],["path",{d:"m16.9 15.2-.4-.9",key:"699xu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R2=e("UserRoundMinus",[["path",{d:"M2 21a8 8 0 0 1 13.292-6",key:"bjp14o"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 19h-6",key:"vcuq98"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=e("UserRoundPen",[["path",{d:"M2 21a8 8 0 0 1 10.821-7.487",key:"1c8h7z"}],["path",{d:"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1817ys"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D2=e("UserRoundPlus",[["path",{d:"M2 21a8 8 0 0 1 13.292-6",key:"bjp14o"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M19 16v6",key:"tddt3s"}],["path",{d:"M22 19h-6",key:"vcuq98"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=e("UserRoundSearch",[["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M2 21a8 8 0 0 1 10.434-7.62",key:"1yezr2"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["path",{d:"m22 22-1.9-1.9",key:"1e5ubv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T2=e("UserRoundX",[["path",{d:"M2 21a8 8 0 0 1 11.873-7",key:"74fkxq"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"m17 17 5 5",key:"p7ous7"}],["path",{d:"m22 17-5 5",key:"gqnmv0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=e("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=e("UserSearch",[["circle",{cx:"10",cy:"7",r:"4",key:"e45bow"}],["path",{d:"M10.3 15H7a4 4 0 0 0-4 4v2",key:"3bnktk"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["path",{d:"m21 21-1.9-1.9",key:"1g2n9r"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=e("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=e("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=e("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=e("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E2=e("UtensilsCrossed",[["path",{d:"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8",key:"n7qcjb"}],["path",{d:"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7",key:"d0u48b"}],["path",{d:"m2.1 21.8 6.4-6.3",key:"yn04lh"}],["path",{d:"m19 5-7 7",key:"194lzd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=e("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=e("UtilityPole",[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"M2 5h20",key:"1fs1ex"}],["path",{d:"M3 3v2",key:"9imdir"}],["path",{d:"M7 3v2",key:"n0os7"}],["path",{d:"M17 3v2",key:"1l2re6"}],["path",{d:"M21 3v2",key:"1duuac"}],["path",{d:"m19 5-7 7-7-7",key:"133zxf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=e("Variable",[["path",{d:"M8 21s-4-3-4-9 4-9 4-9",key:"uto9ud"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9",key:"4w2vsq"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15",key:"f7djnv"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15",key:"1shsy8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=e("Vault",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}],["path",{d:"m7.9 7.9 2.7 2.7",key:"hpeyl3"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}],["path",{d:"m13.4 10.6 2.7-2.7",key:"264c1n"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor",key:"nkw3mc"}],["path",{d:"m7.9 16.1 2.7-2.7",key:"p81g5e"}],["circle",{cx:"16.5",cy:"16.5",r:".5",fill:"currentColor",key:"fubopw"}],["path",{d:"m13.4 13.4 2.7 2.7",key:"abhel3"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zf=e("Vegan",[["path",{d:"M16 8q6 0 6-6-6 0-6 6",key:"qsyyc4"}],["path",{d:"M17.41 3.59a10 10 0 1 0 3 3",key:"41m9h7"}],["path",{d:"M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14",key:"qiv7li"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=e("VenetianMask",[["path",{d:"M18 11c-1.5 0-2.5.5-3 2",key:"1fod00"}],["path",{d:"M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",key:"d70hit"}],["path",{d:"M6 11c1.5 0 2.5.5 3 2",key:"136fht"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=e("VibrateOff",[["path",{d:"m2 8 2 2-2 2 2 2-2 2",key:"sv1b1"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2",key:"101i4y"}],["path",{d:"M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2",key:"1hbad5"}],["path",{d:"M16 10.34V6c0-.55-.45-1-1-1h-4.34",key:"1x5tf0"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kf=e("Vibrate",[["path",{d:"m2 8 2 2-2 2 2 2-2 2",key:"sv1b1"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2",key:"101i4y"}],["rect",{width:"8",height:"14",x:"8",y:"5",rx:"1",key:"1oyrl4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=e("VideoOff",[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196",key:"w8jjjt"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",key:"1xawa7"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=e("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=e("Videotape",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M2 8h20",key:"d11cs7"}],["circle",{cx:"8",cy:"14",r:"2",key:"1k2qr5"}],["path",{d:"M8 12h8",key:"1wcyev"}],["circle",{cx:"16",cy:"14",r:"2",key:"14k7lr"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jf=e("View",[["path",{d:"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2",key:"mrq65r"}],["path",{d:"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2",key:"be3xqs"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",key:"11ak4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=e("Voicemail",[["circle",{cx:"6",cy:"12",r:"4",key:"1ehtga"}],["circle",{cx:"18",cy:"12",r:"4",key:"4vafl8"}],["line",{x1:"6",x2:"18",y1:"16",y2:"16",key:"pmt8us"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg=e("Volleyball",[["path",{d:"M11.1 7.1a16.55 16.55 0 0 1 10.9 4",key:"2880wi"}],["path",{d:"M12 12a12.6 12.6 0 0 1-8.7 5",key:"113sja"}],["path",{d:"M16.8 13.6a16.55 16.55 0 0 1-9 7.5",key:"1qmsgl"}],["path",{d:"M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10",key:"1bmeqp"}],["path",{d:"M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5",key:"iekzv9"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg=e("Volume1",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ag=e("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og=e("VolumeOff",[["path",{d:"M16 9a5 5 0 0 1 .95 2.293",key:"1fgyg8"}],["path",{d:"M19.364 5.636a9 9 0 0 1 1.889 9.96",key:"l3zxae"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11",key:"1gbwow"}],["path",{d:"M9.828 4.172A.686.686 0 0 1 11 4.657v.686",key:"s2je0y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=e("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng=e("Volume",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cg=e("Vote",[["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}],["path",{d:"M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z",key:"1ezoue"}],["path",{d:"M22 19H2",key:"nuriw5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig=e("WalletCards",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2",key:"4125el"}],["path",{d:"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",key:"1dpki6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2=e("WalletMinimal",[["path",{d:"M17 14h.01",key:"7oqj8z"}],["path",{d:"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",key:"u1rqew"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dg=e("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sg=e("Wallpaper",[["circle",{cx:"8",cy:"9",r:"2",key:"gjzl9d"}],["path",{d:"m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2",key:"69xh40"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2=e("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg=e("Wand",[["path",{d:"M15 4V2",key:"z1p9b7"}],["path",{d:"M15 16v-2",key:"px0unx"}],["path",{d:"M8 9h2",key:"1g203m"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M17.8 11.8 19 13",key:"yihg8r"}],["path",{d:"M15 9h.01",key:"x1ddxp"}],["path",{d:"M17.8 6.2 19 5",key:"fd4us0"}],["path",{d:"m3 21 9-9",key:"1jfql5"}],["path",{d:"M12.2 6.2 11 5",key:"i3da3b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lg=e("Warehouse",[["path",{d:"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z",key:"gksnxg"}],["path",{d:"M6 18h12",key:"9pbo8z"}],["path",{d:"M6 14h12",key:"4cwo0f"}],["rect",{width:"12",height:"12",x:"6",y:"10",key:"apd30q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg=e("WashingMachine",[["path",{d:"M3 6h3",key:"155dbl"}],["path",{d:"M17 6h.01",key:"e2y6kg"}],["rect",{width:"18",height:"20",x:"3",y:"2",rx:"2",key:"od3kk9"}],["circle",{cx:"12",cy:"13",r:"5",key:"nlbqau"}],["path",{d:"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5",key:"17lach"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=e("Watch",[["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["polyline",{points:"12 10 12 12 13 13",key:"19dquz"}],["path",{d:"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05",key:"18k57s"}],["path",{d:"m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05",key:"16ny36"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug=e("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kg=e("Waypoints",[["circle",{cx:"12",cy:"4.5",r:"2.5",key:"r5ysbb"}],["path",{d:"m10.2 6.3-3.9 3.9",key:"1nzqf6"}],["circle",{cx:"4.5",cy:"12",r:"2.5",key:"jydg6v"}],["path",{d:"M7 12h10",key:"b7w52i"}],["circle",{cx:"19.5",cy:"12",r:"2.5",key:"1piiel"}],["path",{d:"m13.8 17.7 3.9-3.9",key:"1wyg1y"}],["circle",{cx:"12",cy:"19.5",r:"2.5",key:"13o1pw"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mg=e("Webcam",[["circle",{cx:"12",cy:"10",r:"8",key:"1gshiw"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 22h10",key:"10w4w3"}],["path",{d:"M12 22v-4",key:"1utk9m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=e("WebhookOff",[["path",{d:"M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15",key:"1tvl6x"}],["path",{d:"M9 3.4a4 4 0 0 1 6.52.66",key:"q04jfq"}],["path",{d:"m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05",key:"azowf0"}],["path",{d:"M20.3 20.3a4 4 0 0 1-2.3.7",key:"5joiws"}],["path",{d:"M18.6 13a4 4 0 0 1 3.357 3.414",key:"cangb8"}],["path",{d:"m12 6 .6 1",key:"tpjl1n"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vg=e("Webhook",[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",key:"q3hayz"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06",key:"1go1hn"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8",key:"qlwsc0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fg=e("Weight",[["circle",{cx:"12",cy:"5",r:"3",key:"rqqgnr"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",key:"56o5sh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=e("WheatOff",[["path",{d:"m2 22 10-10",key:"28ilpk"}],["path",{d:"m16 8-1.17 1.17",key:"1qqm82"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",key:"1rdhi6"}],["path",{d:"m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97",key:"4wz8re"}],["path",{d:"M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62",key:"rves66"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z",key:"19rau1"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",key:"tc8ph9"}],["path",{d:"m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98",key:"ak46r"}],["path",{d:"M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28",key:"1tw520"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xg=e("Wheat",[["path",{d:"M2 22 16 8",key:"60hf96"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",key:"1rdhi6"}],["path",{d:"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",key:"1sdzmb"}],["path",{d:"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",key:"eoatbi"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z",key:"19rau1"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",key:"tc8ph9"}],["path",{d:"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",key:"2m8kc5"}],["path",{d:"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",key:"vex3ng"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wg=e("WholeWord",[["circle",{cx:"7",cy:"12",r:"3",key:"12clwm"}],["path",{d:"M10 9v6",key:"17i7lo"}],["circle",{cx:"17",cy:"12",r:"3",key:"gl7c2s"}],["path",{d:"M14 7v8",key:"dl84cr"}],["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",key:"lt2kga"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lg=e("WifiHigh",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cg=e("WifiLow",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bg=e("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ig=e("WifiZero",[["path",{d:"M12 20h.01",key:"zekei9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=e("Wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sg=e("WindArrowDown",[["path",{d:"M10 2v8",key:"d4bbey"}],["path",{d:"M12.8 21.6A2 2 0 1 0 14 18H2",key:"19kp1d"}],["path",{d:"M17.5 10a2.5 2.5 0 1 1 2 4H2",key:"19kpjc"}],["path",{d:"m6 6 4 4 4-4",key:"k13n16"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg=e("Wind",[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ag=e("WineOff",[["path",{d:"M8 22h8",key:"rmew8v"}],["path",{d:"M7 10h3m7 0h-1.343",key:"v48bem"}],["path",{d:"M12 15v7",key:"t2xh3l"}],["path",{d:"M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198",key:"1ymjlu"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jg=e("Wine",[["path",{d:"M8 22h8",key:"rmew8v"}],["path",{d:"M7 10h10",key:"1101jm"}],["path",{d:"M12 15v7",key:"t2xh3l"}],["path",{d:"M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z",key:"10ffi3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pg=e("Workflow",[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zg=e("Worm",[["path",{d:"m19 12-1.5 3",key:"9bcu4o"}],["path",{d:"M19.63 18.81 22 20",key:"121v98"}],["path",{d:"M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",key:"1tij6q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hg=e("WrapText",[["line",{x1:"3",x2:"21",y1:"6",y2:"6",key:"4m8b97"}],["path",{d:"M3 12h15a3 3 0 1 1 0 6h-4",key:"1cl7v7"}],["polyline",{points:"16 16 14 18 16 20",key:"1jznyi"}],["line",{x1:"3",x2:"10",y1:"18",y2:"18",key:"1h33wv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=e("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2=e("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=e("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rg=e("ZapOff",[["path",{d:"M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317",key:"193nxd"}],["path",{d:"M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773",key:"27a7lr"}],["path",{d:"M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",key:"1e0qe9"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tr=e("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dg=e("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tg=e("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tI=Object.freeze(Object.defineProperty({__proto__:null,AArrowDown:rn,AArrowUp:nn,ALargeSmall:cn,Accessibility:dn,Activity:sn,AirVent:hn,Airplay:ln,AlarmClock:pn,AlarmClockCheck:g1,AlarmClockMinus:x1,AlarmClockOff:yn,AlarmClockPlus:w1,AlarmSmoke:un,Album:kn,AlignCenter:vn,AlignCenterHorizontal:Mn,AlignCenterVertical:mn,AlignEndHorizontal:fn,AlignEndVertical:gn,AlignHorizontalDistributeCenter:xn,AlignHorizontalDistributeEnd:wn,AlignHorizontalDistributeStart:Ln,AlignHorizontalJustifyCenter:Cn,AlignHorizontalJustifyEnd:bn,AlignHorizontalJustifyStart:In,AlignHorizontalSpaceAround:Sn,AlignHorizontalSpaceBetween:qn,AlignJustify:An,AlignLeft:jn,AlignRight:Pn,AlignStartHorizontal:zn,AlignStartVertical:Hn,AlignVerticalDistributeCenter:Vn,AlignVerticalDistributeEnd:Rn,AlignVerticalDistributeStart:Dn,AlignVerticalJustifyCenter:Tn,AlignVerticalJustifyEnd:Fn,AlignVerticalJustifyStart:Bn,AlignVerticalSpaceAround:En,AlignVerticalSpaceBetween:On,Ambulance:Un,Ampersand:Nn,Ampersands:_n,Amphora:Gn,Anchor:Zn,Angry:Wn,Annoyed:Xn,Antenna:Kn,Anvil:$n,Aperture:Qn,AppWindow:Yn,AppWindowMac:Jn,Apple:e0,Archive:Do,ArchiveRestore:t0,ArchiveX:a0,Armchair:o0,ArrowBigDown:n0,ArrowBigDownDash:r0,ArrowBigLeft:i0,ArrowBigLeftDash:c0,ArrowBigRight:s0,ArrowBigRightDash:d0,ArrowBigUp:l0,ArrowBigUpDash:h0,ArrowDown:x0,ArrowDown01:y0,ArrowDown10:p0,ArrowDownAZ:L1,ArrowDownFromLine:u0,ArrowDownLeft:k0,ArrowDownNarrowWide:M0,ArrowDownRight:m0,ArrowDownToDot:v0,ArrowDownToLine:f0,ArrowDownUp:g0,ArrowDownWideNarrow:C1,ArrowDownZA:b1,ArrowLeft:b0,ArrowLeftFromLine:w0,ArrowLeftRight:L0,ArrowLeftToLine:C0,ArrowRight:A0,ArrowRightFromLine:I0,ArrowRightLeft:S0,ArrowRightToLine:q0,ArrowUp:B0,ArrowUp01:j0,ArrowUp10:P0,ArrowUpAZ:I1,ArrowUpDown:z0,ArrowUpFromDot:H0,ArrowUpFromLine:V0,ArrowUpLeft:R0,ArrowUpNarrowWide:S1,ArrowUpRight:D0,ArrowUpToLine:T0,ArrowUpWideNarrow:F0,ArrowUpZA:q1,ArrowsUpFromLine:E0,Asterisk:O0,AtSign:To,Atom:U0,AudioLines:N0,AudioWaveform:_0,Award:G0,Axe:Z0,Axis3d:A1,Baby:W0,Backpack:X0,Badge:hc,BadgeAlert:K0,BadgeCent:$0,BadgeCheck:j1,BadgeDollarSign:Q0,BadgeEuro:J0,BadgeHelp:Y0,BadgeIndianRupee:ec,BadgeInfo:tc,BadgeJapaneseYen:ac,BadgeMinus:oc,BadgePercent:rc,BadgePlus:nc,BadgePoundSterling:cc,BadgeRussianRuble:ic,BadgeSwissFranc:dc,BadgeX:sc,BaggageClaim:lc,Ban:yc,Banana:pc,Bandage:uc,Banknote:kc,Barcode:Mc,Baseline:mc,Bath:vc,Battery:Cc,BatteryCharging:fc,BatteryFull:gc,BatteryLow:xc,BatteryMedium:wc,BatteryWarning:Lc,Beaker:bc,Bean:Sc,BeanOff:Ic,Bed:jc,BedDouble:qc,BedSingle:Ac,Beef:Pc,Beer:Hc,BeerOff:zc,Bell:Fo,BellDot:Vc,BellElectric:Rc,BellMinus:Dc,BellOff:Tc,BellPlus:Fc,BellRing:Bc,BetweenHorizontalEnd:P1,BetweenHorizontalStart:z1,BetweenVerticalEnd:Ec,BetweenVerticalStart:Oc,BicepsFlexed:Uc,Bike:Nc,Binary:_c,Binoculars:Gc,Biohazard:Zc,Bird:Wc,Bitcoin:Xc,Blend:Kc,Blinds:$c,Blocks:Qc,Bluetooth:ti,BluetoothConnected:Jc,BluetoothOff:Yc,BluetoothSearching:ei,Bold:ai,Bolt:oi,Bomb:ri,Bone:ni,Book:no,BookA:ci,BookAudio:ii,BookCheck:di,BookCopy:si,BookDashed:H1,BookDown:hi,BookHeadphones:li,BookHeart:yi,BookImage:pi,BookKey:ui,BookLock:ki,BookMarked:Mi,BookMinus:mi,BookOpen:gi,BookOpenCheck:vi,BookOpenText:fi,BookPlus:xi,BookText:wi,BookType:Li,BookUp:bi,BookUp2:Ci,BookUser:Ii,BookX:Si,Bookmark:Bo,BookmarkCheck:qi,BookmarkMinus:Ai,BookmarkPlus:ji,BookmarkX:Pi,BoomBox:zi,Bot:Ri,BotMessageSquare:Hi,BotOff:Vi,Box:Di,Boxes:Ti,Braces:V1,Brackets:Fi,Brain:Oi,BrainCircuit:Bi,BrainCog:Ei,BrickWall:Ui,Briefcase:co,BriefcaseBusiness:Ni,BriefcaseConveyorBelt:_i,BriefcaseMedical:Gi,BringToFront:Zi,Brush:Wi,Bug:$i,BugOff:Xi,BugPlay:Ki,Building:Ji,Building2:Qi,Bus:ed,BusFront:Yi,Cable:ad,CableCar:td,Cake:rd,CakeSlice:od,Calculator:nd,Calendar:Eo,Calendar1:cd,CalendarArrowDown:id,CalendarArrowUp:dd,CalendarCheck:hd,CalendarCheck2:sd,CalendarClock:ld,CalendarCog:yd,CalendarDays:pd,CalendarFold:ud,CalendarHeart:kd,CalendarMinus:md,CalendarMinus2:Md,CalendarOff:vd,CalendarPlus:gd,CalendarPlus2:fd,CalendarRange:xd,CalendarSearch:wd,CalendarSync:Ld,CalendarX:bd,CalendarX2:Cd,Camera:Oo,CameraOff:Id,Candy:Ad,CandyCane:Sd,CandyOff:qd,Cannabis:jd,Captions:R1,CaptionsOff:Pd,Car:io,CarFront:zd,CarTaxiFront:Hd,Caravan:Vd,Carrot:Rd,CaseLower:Dd,CaseSensitive:Td,CaseUpper:Fd,CassetteTape:Bd,Cast:Ed,Castle:Od,Cat:Ud,Cctv:Nd,ChartArea:D1,ChartBar:F1,ChartBarBig:T1,ChartBarDecreasing:_d,ChartBarIncreasing:Gd,ChartBarStacked:Zd,ChartCandlestick:B1,ChartColumn:U1,ChartColumnBig:E1,ChartColumnDecreasing:Wd,ChartColumnIncreasing:O1,ChartColumnStacked:Xd,ChartGantt:Kd,ChartLine:N1,ChartNetwork:$d,ChartNoAxesColumn:G1,ChartNoAxesColumnDecreasing:Qd,ChartNoAxesColumnIncreasing:_1,ChartNoAxesCombined:Jd,ChartNoAxesGantt:Z1,ChartPie:W1,ChartScatter:X1,ChartSpline:Yd,Check:so,CheckCheck:es,ChefHat:ts,Cherry:as,ChevronDown:os,ChevronFirst:rs,ChevronLast:ns,ChevronLeft:cs,ChevronRight:Uo,ChevronUp:is,ChevronsDown:ss,ChevronsDownUp:ds,ChevronsLeft:ys,ChevronsLeftRight:ls,ChevronsLeftRightEllipsis:hs,ChevronsRight:us,ChevronsRightLeft:ps,ChevronsUp:Ms,ChevronsUpDown:ks,Chrome:ms,Church:vs,Cigarette:gs,CigaretteOff:fs,Circle:ho,CircleAlert:K1,CircleArrowDown:$1,CircleArrowLeft:Q1,CircleArrowOutDownLeft:J1,CircleArrowOutDownRight:Y1,CircleArrowOutUpLeft:et,CircleArrowOutUpRight:tt,CircleArrowRight:at,CircleArrowUp:ot,CircleCheck:nt,CircleCheckBig:rt,CircleChevronDown:ct,CircleChevronLeft:it,CircleChevronRight:dt,CircleChevronUp:st,CircleDashed:xs,CircleDivide:ht,CircleDollarSign:ws,CircleDot:Cs,CircleDotDashed:Ls,CircleEllipsis:bs,CircleEqual:Is,CircleFadingArrowUp:Ss,CircleFadingPlus:qs,CircleGauge:lt,CircleHelp:yt,CircleMinus:pt,CircleOff:As,CircleParking:kt,CircleParkingOff:ut,CirclePause:Mt,CirclePercent:mt,CirclePlay:vt,CirclePlus:ft,CirclePower:gt,CircleSlash:js,CircleSlash2:xt,CircleStop:wt,CircleUser:Ct,CircleUserRound:Lt,CircleX:bt,CircuitBoard:Ps,Citrus:zs,Clapperboard:Hs,Clipboard:Us,ClipboardCheck:Vs,ClipboardCopy:Rs,ClipboardList:Ds,ClipboardMinus:Ts,ClipboardPaste:Fs,ClipboardPen:St,ClipboardPenLine:It,ClipboardPlus:Bs,ClipboardType:Es,ClipboardX:Os,Clock:l1,Clock1:Ns,Clock10:_s,Clock11:Gs,Clock12:Zs,Clock2:Ws,Clock3:Xs,Clock4:Ks,Clock5:$s,Clock6:Qs,Clock7:Js,Clock8:Ys,Clock9:eh,ClockAlert:th,ClockArrowDown:ah,ClockArrowUp:oh,Cloud:vh,CloudAlert:rh,CloudCog:nh,CloudDownload:qt,CloudDrizzle:ch,CloudFog:ih,CloudHail:dh,CloudLightning:sh,CloudMoon:lh,CloudMoonRain:hh,CloudOff:yh,CloudRain:uh,CloudRainWind:ph,CloudSnow:kh,CloudSun:mh,CloudSunRain:Mh,CloudUpload:At,Cloudy:fh,Clover:gh,Club:xh,Code:wh,CodeXml:jt,Codepen:Lh,Codesandbox:Ch,Coffee:No,Cog:bh,Coins:_o,Columns2:Pt,Columns3:zt,Columns4:Ih,Combine:Sh,Command:qh,Compass:Ah,Component:jh,Computer:Ph,ConciergeBell:zh,Cone:Hh,Construction:Vh,Contact:Rh,ContactRound:Ht,Container:Dh,Contrast:Th,Cookie:Fh,CookingPot:Bh,Copy:Go,CopyCheck:Eh,CopyMinus:Oh,CopyPlus:Uh,CopySlash:Nh,CopyX:_h,Copyleft:Gh,Copyright:Zh,CornerDownLeft:Wh,CornerDownRight:Xh,CornerLeftDown:Kh,CornerLeftUp:$h,CornerRightDown:Qh,CornerRightUp:Jh,CornerUpLeft:Yh,CornerUpRight:el,Cpu:tl,CreativeCommons:al,CreditCard:ol,Croissant:rl,Crop:nl,Cross:cl,Crosshair:il,Crown:lo,Cuboid:dl,CupSoda:sl,Currency:hl,Cylinder:ll,Dam:yl,Database:kl,DatabaseBackup:pl,DatabaseZap:ul,Delete:Ml,Dessert:ml,Diameter:vl,Diamond:Zo,DiamondMinus:fl,DiamondPercent:Vt,DiamondPlus:gl,Dice1:xl,Dice2:wl,Dice3:Ll,Dice4:Cl,Dice5:bl,Dice6:Il,Dices:Sl,Diff:ql,Disc:zl,Disc2:Al,Disc3:jl,DiscAlbum:Pl,Divide:Hl,Dna:Rl,DnaOff:Vl,Dock:Dl,Dog:Tl,DollarSign:Wo,Donut:Fl,DoorClosed:Bl,DoorOpen:El,Dot:Ol,Download:Xo,DraftingCompass:Ul,Drama:Nl,Dribbble:_l,Drill:Gl,Droplet:Zl,Droplets:Wl,Drum:Xl,Drumstick:Kl,Dumbbell:$l,Ear:Jl,EarOff:Ql,Earth:Rt,EarthLock:Yl,Eclipse:ey,Egg:oy,EggFried:ty,EggOff:ay,Ellipsis:Tt,EllipsisVertical:Dt,Equal:Ko,EqualApproximately:ry,EqualNot:ny,Eraser:cy,EthernetPort:iy,Euro:$o,Expand:dy,ExternalLink:sy,Eye:$2,EyeClosed:hy,EyeOff:K2,Facebook:ly,Factory:yy,Fan:py,FastForward:uy,Feather:ky,Fence:My,FerrisWheel:my,Figma:vy,File:kp,FileArchive:fy,FileAudio:xy,FileAudio2:gy,FileAxis3d:Ft,FileBadge:Ly,FileBadge2:wy,FileBox:Cy,FileChartColumn:Et,FileChartColumnIncreasing:Bt,FileChartLine:Ot,FileChartPie:Ut,FileCheck:Iy,FileCheck2:by,FileClock:Sy,FileCode:Ay,FileCode2:qy,FileCog:Nt,FileDiff:jy,FileDigit:Py,FileDown:zy,FileHeart:Hy,FileImage:Vy,FileInput:Ry,FileJson:Ty,FileJson2:Dy,FileKey:By,FileKey2:Fy,FileLock:Oy,FileLock2:Ey,FileMinus:Ny,FileMinus2:Uy,FileMusic:_y,FileOutput:Gy,FilePen:Gt,FilePenLine:_t,FilePlus:Wy,FilePlus2:Zy,FileQuestion:Xy,FileScan:Ky,FileSearch:Qy,FileSearch2:$y,FileSliders:Jy,FileSpreadsheet:Yy,FileStack:ep,FileSymlink:tp,FileTerminal:ap,FileText:op,FileType:np,FileType2:rp,FileUp:cp,FileUser:ip,FileVideo:sp,FileVideo2:dp,FileVolume:lp,FileVolume2:hp,FileWarning:yp,FileX:up,FileX2:pp,Files:Mp,Film:mp,Filter:fp,FilterX:vp,Fingerprint:gp,FireExtinguisher:xp,Fish:Cp,FishOff:wp,FishSymbol:Lp,Flag:Qo,FlagOff:bp,FlagTriangleLeft:Ip,FlagTriangleRight:Sp,Flame:Ap,FlameKindling:qp,Flashlight:Pp,FlashlightOff:jp,FlaskConical:Hp,FlaskConicalOff:zp,FlaskRound:Vp,FlipHorizontal:Dp,FlipHorizontal2:Rp,FlipVertical:Fp,FlipVertical2:Tp,Flower:Ep,Flower2:Bp,Focus:Op,FoldHorizontal:Up,FoldVertical:Np,Folder:y1,FolderArchive:_p,FolderCheck:Gp,FolderClock:Zp,FolderClosed:Wp,FolderCode:Xp,FolderCog:Zt,FolderDot:Kp,FolderDown:$p,FolderGit:Jp,FolderGit2:Qp,FolderHeart:Yp,FolderInput:eu,FolderKanban:tu,FolderKey:au,FolderLock:ou,FolderMinus:ru,FolderOpen:cu,FolderOpenDot:nu,FolderOutput:iu,FolderPen:Wt,FolderPlus:du,FolderRoot:su,FolderSearch:lu,FolderSearch2:hu,FolderSymlink:yu,FolderSync:pu,FolderTree:uu,FolderUp:ku,FolderX:Mu,Folders:mu,Footprints:vu,Forklift:fu,Forward:gu,Frame:xu,Framer:wu,Frown:Lu,Fuel:Jo,Fullscreen:Cu,GalleryHorizontal:Iu,GalleryHorizontalEnd:bu,GalleryThumbnails:Su,GalleryVertical:Au,GalleryVerticalEnd:qu,Gamepad:yo,Gamepad2:ju,Gauge:Pu,Gavel:zu,Gem:Hu,Ghost:Vu,Gift:Yo,GitBranch:Du,GitBranchPlus:Ru,GitCommitHorizontal:Xt,GitCommitVertical:Tu,GitCompare:Bu,GitCompareArrows:Fu,GitFork:Eu,GitGraph:Ou,GitMerge:Uu,GitPullRequest:Xu,GitPullRequestArrow:Nu,GitPullRequestClosed:_u,GitPullRequestCreate:Zu,GitPullRequestCreateArrow:Gu,GitPullRequestDraft:Wu,Github:Ku,Gitlab:$u,GlassWater:Qu,Glasses:Ju,Globe:er,GlobeLock:Yu,Goal:e4,Grab:t4,GraduationCap:tr,Grape:a4,Grid2x2:$t,Grid2x2Check:o4,Grid2x2Plus:Kt,Grid2x2X:r4,Grid3x3:Fe,Grip:i4,GripHorizontal:n4,GripVertical:c4,Group:d4,Guitar:s4,Ham:h4,Hammer:ar,Hand:k4,HandCoins:l4,HandHeart:y4,HandHelping:Qt,HandMetal:p4,HandPlatter:u4,Handshake:M4,HardDrive:f4,HardDriveDownload:m4,HardDriveUpload:v4,HardHat:g4,Hash:or,Haze:x4,HdmiPort:w4,Heading:A4,Heading1:L4,Heading2:C4,Heading3:b4,Heading4:I4,Heading5:S4,Heading6:q4,HeadphoneOff:j4,Headphones:P4,Headset:z4,Heart:po,HeartCrack:H4,HeartHandshake:V4,HeartOff:R4,HeartPulse:D4,Heater:T4,Hexagon:rr,Highlighter:F4,History:B4,Hop:O4,HopOff:E4,Hospital:U4,Hotel:N4,Hourglass:_4,House:Ne,HousePlug:G4,HousePlus:Z4,IceCreamBowl:Jt,IceCreamCone:Yt,IdCard:W4,Image:tk,ImageDown:X4,ImageMinus:K4,ImageOff:$4,ImagePlay:Q4,ImagePlus:J4,ImageUp:Y4,ImageUpscale:ek,Images:ak,Import:ok,Inbox:rk,IndentDecrease:ea,IndentIncrease:ta,IndianRupee:nk,Infinity:ck,Info:ik,InspectionPanel:dk,Instagram:sk,Italic:hk,IterationCcw:lk,IterationCw:yk,JapaneseYen:pk,Joystick:uk,Kanban:kk,Key:nr,KeyRound:Mk,KeySquare:mk,Keyboard:gk,KeyboardMusic:vk,KeyboardOff:fk,Lamp:Ik,LampCeiling:xk,LampDesk:wk,LampFloor:Lk,LampWallDown:Ck,LampWallUp:bk,LandPlot:Sk,Landmark:qk,Languages:Ak,Laptop:uo,LaptopMinimal:aa,LaptopMinimalCheck:jk,Lasso:zk,LassoSelect:Pk,Laugh:Hk,Layers:Dk,Layers2:Vk,Layers3:Rk,LayoutDashboard:Tk,LayoutGrid:Fk,LayoutList:Bk,LayoutPanelLeft:Ek,LayoutPanelTop:Ok,LayoutTemplate:Uk,Leaf:Nk,LeafyGreen:_k,Lectern:Gk,LetterText:Zk,Library:Xk,LibraryBig:Wk,LifeBuoy:Kk,Ligature:$k,Lightbulb:Jk,LightbulbOff:Qk,Link:t5,Link2:e5,Link2Off:Yk,Linkedin:a5,List:v5,ListCheck:o5,ListChecks:r5,ListCollapse:n5,ListEnd:c5,ListFilter:i5,ListMinus:d5,ListMusic:s5,ListOrdered:h5,ListPlus:l5,ListRestart:y5,ListStart:p5,ListTodo:u5,ListTree:k5,ListVideo:M5,ListX:m5,Loader:g5,LoaderCircle:Ze,LoaderPinwheel:f5,Locate:L5,LocateFixed:x5,LocateOff:w5,Lock:ko,LockKeyhole:C5,LockKeyholeOpen:oa,LockOpen:r1,LogIn:b5,LogOut:I5,Logs:S5,Lollipop:q5,Luggage:A5,Magnet:j5,Mail:cr,MailCheck:P5,MailMinus:z5,MailOpen:H5,MailPlus:V5,MailQuestion:R5,MailSearch:D5,MailWarning:T5,MailX:F5,Mailbox:B5,Mails:E5,Map:J5,MapPin:ir,MapPinCheck:U5,MapPinCheckInside:O5,MapPinHouse:N5,MapPinMinus:G5,MapPinMinusInside:_5,MapPinOff:Z5,MapPinPlus:X5,MapPinPlusInside:W5,MapPinX:$5,MapPinXInside:K5,MapPinned:Q5,Martini:Y5,Maximize:t3,Maximize2:e3,Medal:a3,Megaphone:r3,MegaphoneOff:o3,Meh:n3,MemoryStick:c3,Menu:i3,Merge:d3,MessageCircle:dr,MessageCircleCode:s3,MessageCircleDashed:h3,MessageCircleHeart:l3,MessageCircleMore:y3,MessageCircleOff:p3,MessageCirclePlus:u3,MessageCircleQuestion:k3,MessageCircleReply:M3,MessageCircleWarning:m3,MessageCircleX:v3,MessageSquare:V3,MessageSquareCode:f3,MessageSquareDashed:g3,MessageSquareDiff:x3,MessageSquareDot:w3,MessageSquareHeart:L3,MessageSquareLock:C3,MessageSquareMore:b3,MessageSquareOff:I3,MessageSquarePlus:S3,MessageSquareQuote:q3,MessageSquareReply:A3,MessageSquareShare:j3,MessageSquareText:P3,MessageSquareWarning:z3,MessageSquareX:H3,MessagesSquare:R3,Mic:T3,MicOff:D3,MicVocal:ra,Microchip:F3,Microscope:B3,Microwave:E3,Milestone:O3,Milk:N3,MilkOff:U3,Minimize:G3,Minimize2:_3,Minus:sr,Monitor:r6,MonitorCheck:Z3,MonitorCog:W3,MonitorDot:X3,MonitorDown:K3,MonitorOff:$3,MonitorPause:Q3,MonitorPlay:J3,MonitorSmartphone:Y3,MonitorSpeaker:e6,MonitorStop:t6,MonitorUp:a6,MonitorX:o6,Moon:hr,MoonStar:n6,Mountain:i6,MountainSnow:c6,Mouse:p6,MouseOff:d6,MousePointer:y6,MousePointer2:s6,MousePointerBan:h6,MousePointerClick:l6,Move:I6,Move3d:na,MoveDiagonal:k6,MoveDiagonal2:u6,MoveDown:v6,MoveDownLeft:M6,MoveDownRight:m6,MoveHorizontal:f6,MoveLeft:g6,MoveRight:x6,MoveUp:C6,MoveUpLeft:w6,MoveUpRight:L6,MoveVertical:b6,Music:lr,Music2:S6,Music3:q6,Music4:A6,Navigation:H6,Navigation2:P6,Navigation2Off:j6,NavigationOff:z6,Network:V6,Newspaper:R6,Nfc:D6,Notebook:E6,NotebookPen:T6,NotebookTabs:F6,NotebookText:B6,NotepadText:U6,NotepadTextDashed:O6,Nut:_6,NutOff:N6,Octagon:Z6,OctagonAlert:ca,OctagonMinus:G6,OctagonPause:ia,OctagonX:da,Omega:W6,Option:X6,Orbit:K6,Origami:$6,Package:r8,Package2:Q6,PackageCheck:J6,PackageMinus:Y6,PackageOpen:e8,PackagePlus:t8,PackageSearch:a8,PackageX:o8,PaintBucket:n8,PaintRoller:c8,Paintbrush:i8,PaintbrushVertical:sa,Palette:d8,PanelBottom:l8,PanelBottomClose:s8,PanelBottomDashed:ha,PanelBottomOpen:h8,PanelLeft:ua,PanelLeftClose:la,PanelLeftDashed:ya,PanelLeftOpen:pa,PanelRight:u8,PanelRightClose:y8,PanelRightDashed:ka,PanelRightOpen:p8,PanelTop:m8,PanelTopClose:k8,PanelTopDashed:Ma,PanelTopOpen:M8,PanelsLeftBottom:v8,PanelsRightBottom:f8,PanelsTopLeft:ma,Paperclip:yr,Parentheses:g8,ParkingMeter:x8,PartyPopper:w8,Pause:L8,PawPrint:C8,PcCase:b8,Pen:n1,PenLine:va,PenOff:I8,PenTool:S8,Pencil:P8,PencilLine:q8,PencilOff:A8,PencilRuler:j8,Pentagon:z8,Percent:pr,PersonStanding:H8,PhilippinePeso:V8,Phone:ur,PhoneCall:R8,PhoneForwarded:D8,PhoneIncoming:T8,PhoneMissed:F8,PhoneOff:B8,PhoneOutgoing:E8,Pi:O8,Piano:U8,Pickaxe:N8,PictureInPicture:G8,PictureInPicture2:_8,PiggyBank:kr,Pilcrow:X8,PilcrowLeft:Z8,PilcrowRight:W8,Pill:$8,PillBottle:K8,Pin:J8,PinOff:Q8,Pipette:Y8,Pizza:Mr,Plane:mr,PlaneLanding:e7,PlaneTakeoff:t7,Play:a7,Plug:r7,Plug2:o7,PlugZap:fa,Plus:vr,Pocket:c7,PocketKnife:n7,Podcast:i7,Pointer:s7,PointerOff:d7,Popcorn:h7,Popsicle:l7,PoundSterling:y7,Power:u7,PowerOff:p7,Presentation:k7,Printer:m7,PrinterCheck:M7,Projector:v7,Proportions:f7,Puzzle:g7,Pyramid:x7,QrCode:w7,Quote:L7,Rabbit:C7,Radar:b7,Radiation:I7,Radical:S7,Radio:j7,RadioReceiver:q7,RadioTower:A7,Radius:P7,RailSymbol:z7,Rainbow:H7,Rat:V7,Ratio:R7,Receipt:_7,ReceiptCent:D7,ReceiptEuro:T7,ReceiptIndianRupee:F7,ReceiptJapaneseYen:B7,ReceiptPoundSterling:E7,ReceiptRussianRuble:O7,ReceiptSwissFranc:U7,ReceiptText:N7,RectangleEllipsis:ga,RectangleHorizontal:G7,RectangleVertical:Z7,Recycle:W7,Redo:$7,Redo2:X7,RedoDot:K7,RefreshCcw:J7,RefreshCcwDot:Q7,RefreshCw:fr,RefreshCwOff:Y7,Refrigerator:eM,Regex:tM,RemoveFormatting:aM,Repeat:nM,Repeat1:oM,Repeat2:rM,Replace:iM,ReplaceAll:cM,Reply:sM,ReplyAll:dM,Rewind:hM,Ribbon:lM,Rocket:yM,RockingChair:pM,RollerCoaster:uM,Rotate3d:xa,RotateCcw:MM,RotateCcwSquare:kM,RotateCw:vM,RotateCwSquare:mM,Route:gM,RouteOff:fM,Router:xM,Rows2:wa,Rows3:La,Rows4:wM,Rss:LM,Ruler:CM,RussianRuble:bM,Sailboat:IM,Salad:SM,Sandwich:qM,Satellite:jM,SatelliteDish:AM,Save:HM,SaveAll:PM,SaveOff:zM,Scale:VM,Scale3d:Ca,Scaling:RM,Scan:NM,ScanBarcode:DM,ScanEye:TM,ScanFace:FM,ScanLine:BM,ScanQrCode:EM,ScanSearch:OM,ScanText:UM,School:_M,Scissors:gr,ScissorsLineDashed:GM,ScreenShare:WM,ScreenShareOff:ZM,Scroll:KM,ScrollText:XM,Search:em,SearchCheck:$M,SearchCode:QM,SearchSlash:JM,SearchX:YM,Section:tm,Send:om,SendHorizontal:ba,SendToBack:am,SeparatorHorizontal:rm,SeparatorVertical:nm,Server:sm,ServerCog:cm,ServerCrash:im,ServerOff:dm,Settings:xr,Settings2:hm,Shapes:lm,Share:wr,Share2:ym,Sheet:pm,Shell:um,Shield:Lr,ShieldAlert:km,ShieldBan:Mm,ShieldCheck:mm,ShieldEllipsis:vm,ShieldHalf:fm,ShieldMinus:gm,ShieldOff:xm,ShieldPlus:wm,ShieldQuestion:Lm,ShieldX:Ia,Ship:bm,ShipWheel:Cm,Shirt:Cr,ShoppingBag:Im,ShoppingBasket:Sm,ShoppingCart:br,Shovel:qm,ShowerHead:Am,Shrink:jm,Shrub:Pm,Shuffle:zm,Sigma:Hm,Signal:Fm,SignalHigh:Vm,SignalLow:Rm,SignalMedium:Dm,SignalZero:Tm,Signature:Bm,Signpost:Om,SignpostBig:Em,Siren:Um,SkipBack:Nm,SkipForward:_m,Skull:Gm,Slack:Zm,Slash:Wm,Slice:Xm,SlidersHorizontal:Km,SlidersVertical:Sa,Smartphone:Mo,SmartphoneCharging:$m,SmartphoneNfc:Qm,Smile:Ym,SmilePlus:Jm,Snail:e9,Snowflake:t9,Sofa:a9,Soup:o9,Space:r9,Spade:n9,Sparkle:c9,Sparkles:qa,Speaker:i9,Speech:d9,SpellCheck:h9,SpellCheck2:s9,Spline:l9,Split:y9,SprayCan:p9,Sprout:u9,Square:Ir,SquareActivity:Aa,SquareArrowDown:za,SquareArrowDownLeft:ja,SquareArrowDownRight:Pa,SquareArrowLeft:Ha,SquareArrowOutDownLeft:Va,SquareArrowOutDownRight:Ra,SquareArrowOutUpLeft:Da,SquareArrowOutUpRight:Ta,SquareArrowRight:Fa,SquareArrowUp:Oa,SquareArrowUpLeft:Ba,SquareArrowUpRight:Ea,SquareAsterisk:Ua,SquareBottomDashedScissors:Na,SquareChartGantt:Be,SquareCheck:Ga,SquareCheckBig:_a,SquareChevronDown:Za,SquareChevronLeft:Wa,SquareChevronRight:Xa,SquareChevronUp:Ka,SquareCode:$a,SquareDashed:Ya,SquareDashedBottom:M9,SquareDashedBottomCode:k9,SquareDashedKanban:Qa,SquareDashedMousePointer:Ja,SquareDivide:e2,SquareDot:t2,SquareEqual:a2,SquareFunction:o2,SquareKanban:r2,SquareLibrary:n2,SquareM:c2,SquareMenu:i2,SquareMinus:d2,SquareMousePointer:s2,SquareParking:l2,SquareParkingOff:h2,SquarePen:Se,SquarePercent:y2,SquarePi:p2,SquarePilcrow:u2,SquarePlay:k2,SquarePlus:M2,SquarePower:m2,SquareRadical:m9,SquareScissors:v2,SquareSigma:f2,SquareSlash:g2,SquareSplitHorizontal:x2,SquareSplitVertical:w2,SquareSquare:v9,SquareStack:f9,SquareTerminal:L2,SquareUser:b2,SquareUserRound:C2,SquareX:I2,Squircle:g9,Squirrel:x9,Stamp:w9,Star:Sr,StarHalf:L9,StarOff:C9,StepBack:b9,StepForward:I9,Stethoscope:S9,Sticker:q9,StickyNote:A9,Store:j9,StretchHorizontal:P9,StretchVertical:z9,Strikethrough:H9,Subscript:V9,Sun:qr,SunDim:R9,SunMedium:D9,SunMoon:T9,SunSnow:F9,Sunrise:B9,Sunset:E9,Superscript:O9,SwatchBook:U9,SwissFranc:N9,SwitchCamera:_9,Sword:G9,Swords:Z9,Syringe:W9,Table:tv,Table2:X9,TableCellsMerge:K9,TableCellsSplit:$9,TableColumnsSplit:Q9,TableOfContents:J9,TableProperties:Y9,TableRowsSplit:ev,Tablet:ov,TabletSmartphone:av,Tablets:rv,Tag:Ar,Tags:nv,Tally1:cv,Tally2:iv,Tally3:dv,Tally4:sv,Tally5:hv,Tangent:lv,Target:yv,Telescope:pv,Tent:kv,TentTree:uv,Terminal:Mv,TestTube:mv,TestTubeDiagonal:S2,TestTubes:vv,Text:Lv,TextCursor:gv,TextCursorInput:fv,TextQuote:xv,TextSearch:wv,TextSelect:q2,Theater:Cv,Thermometer:Sv,ThermometerSnowflake:bv,ThermometerSun:Iv,ThumbsDown:qv,ThumbsUp:Av,Ticket:Dv,TicketCheck:jv,TicketMinus:Pv,TicketPercent:zv,TicketPlus:Hv,TicketSlash:Vv,TicketX:Rv,Tickets:Fv,TicketsPlane:Tv,Timer:Ov,TimerOff:Bv,TimerReset:Ev,ToggleLeft:Uv,ToggleRight:Nv,Toilet:_v,Tornado:Gv,Torus:Zv,Touchpad:Xv,TouchpadOff:Wv,TowerControl:Kv,ToyBrick:$v,Tractor:Qv,TrafficCone:Jv,TrainFront:ef,TrainFrontTunnel:Yv,TrainTrack:tf,TramFront:A2,Trash:of,Trash2:af,TreeDeciduous:rf,TreePalm:j2,TreePine:nf,Trees:cf,Trello:df,TrendingDown:sf,TrendingUp:mo,TrendingUpDown:hf,Triangle:jr,TriangleAlert:We,TriangleRight:lf,Trophy:yf,Truck:pf,Turtle:uf,Tv:Mf,TvMinimal:P2,TvMinimalPlay:kf,Twitch:mf,Twitter:vf,Type:gf,TypeOutline:ff,Umbrella:wf,UmbrellaOff:xf,Underline:Lf,Undo:If,Undo2:Cf,UndoDot:bf,UnfoldHorizontal:Sf,UnfoldVertical:qf,Ungroup:Af,University:z2,Unlink:Pf,Unlink2:jf,Unplug:zf,Upload:Pr,Usb:Hf,User:zr,UserCheck:Vf,UserCog:Rf,UserMinus:Df,UserPen:Tf,UserPlus:Ff,UserRound:F2,UserRoundCheck:H2,UserRoundCog:V2,UserRoundMinus:R2,UserRoundPen:Bf,UserRoundPlus:D2,UserRoundSearch:Ef,UserRoundX:T2,UserSearch:Of,UserX:Uf,Users:Hr,UsersRound:B2,Utensils:Xe,UtensilsCrossed:E2,UtilityPole:Nf,Variable:_f,Vault:Gf,Vegan:Zf,VenetianMask:Wf,Vibrate:Kf,VibrateOff:Xf,Video:Vr,VideoOff:$f,Videotape:Qf,View:Jf,Voicemail:Yf,Volleyball:eg,Volume:ng,Volume1:tg,Volume2:ag,VolumeOff:og,VolumeX:rg,Vote:cg,Wallet:dg,WalletCards:ig,WalletMinimal:O2,Wallpaper:sg,Wand:hg,WandSparkles:U2,Warehouse:lg,WashingMachine:yg,Watch:pg,Waves:ug,Waypoints:kg,Webcam:Mg,Webhook:vg,WebhookOff:mg,Weight:fg,Wheat:xg,WheatOff:gg,WholeWord:wg,Wifi:Rr,WifiHigh:Lg,WifiLow:Cg,WifiOff:bg,WifiZero:Ig,Wind:qg,WindArrowDown:Sg,Wine:jg,WineOff:Ag,Workflow:Pg,Worm:zg,WrapText:Hg,Wrench:Dr,X:Q2,Youtube:Vg,Zap:Tr,ZapOff:Rg,ZoomIn:Dg,ZoomOut:Tg},Symbol.toStringTag,{value:"Module"}));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=Object.freeze(Object.defineProperty({__proto__:null,AArrowDown:rn,AArrowDownIcon:rn,AArrowUp:nn,AArrowUpIcon:nn,ALargeSmall:cn,ALargeSmallIcon:cn,Accessibility:dn,AccessibilityIcon:dn,Activity:sn,ActivityIcon:sn,ActivitySquare:Aa,ActivitySquareIcon:Aa,AirVent:hn,AirVentIcon:hn,Airplay:ln,AirplayIcon:ln,AlarmCheck:g1,AlarmCheckIcon:g1,AlarmClock:pn,AlarmClockCheck:g1,AlarmClockCheckIcon:g1,AlarmClockIcon:pn,AlarmClockMinus:x1,AlarmClockMinusIcon:x1,AlarmClockOff:yn,AlarmClockOffIcon:yn,AlarmClockPlus:w1,AlarmClockPlusIcon:w1,AlarmMinus:x1,AlarmMinusIcon:x1,AlarmPlus:w1,AlarmPlusIcon:w1,AlarmSmoke:un,AlarmSmokeIcon:un,Album:kn,AlbumIcon:kn,AlertCircle:K1,AlertCircleIcon:K1,AlertOctagon:ca,AlertOctagonIcon:ca,AlertTriangle:We,AlertTriangleIcon:We,AlignCenter:vn,AlignCenterHorizontal:Mn,AlignCenterHorizontalIcon:Mn,AlignCenterIcon:vn,AlignCenterVertical:mn,AlignCenterVerticalIcon:mn,AlignEndHorizontal:fn,AlignEndHorizontalIcon:fn,AlignEndVertical:gn,AlignEndVerticalIcon:gn,AlignHorizontalDistributeCenter:xn,AlignHorizontalDistributeCenterIcon:xn,AlignHorizontalDistributeEnd:wn,AlignHorizontalDistributeEndIcon:wn,AlignHorizontalDistributeStart:Ln,AlignHorizontalDistributeStartIcon:Ln,AlignHorizontalJustifyCenter:Cn,AlignHorizontalJustifyCenterIcon:Cn,AlignHorizontalJustifyEnd:bn,AlignHorizontalJustifyEndIcon:bn,AlignHorizontalJustifyStart:In,AlignHorizontalJustifyStartIcon:In,AlignHorizontalSpaceAround:Sn,AlignHorizontalSpaceAroundIcon:Sn,AlignHorizontalSpaceBetween:qn,AlignHorizontalSpaceBetweenIcon:qn,AlignJustify:An,AlignJustifyIcon:An,AlignLeft:jn,AlignLeftIcon:jn,AlignRight:Pn,AlignRightIcon:Pn,AlignStartHorizontal:zn,AlignStartHorizontalIcon:zn,AlignStartVertical:Hn,AlignStartVerticalIcon:Hn,AlignVerticalDistributeCenter:Vn,AlignVerticalDistributeCenterIcon:Vn,AlignVerticalDistributeEnd:Rn,AlignVerticalDistributeEndIcon:Rn,AlignVerticalDistributeStart:Dn,AlignVerticalDistributeStartIcon:Dn,AlignVerticalJustifyCenter:Tn,AlignVerticalJustifyCenterIcon:Tn,AlignVerticalJustifyEnd:Fn,AlignVerticalJustifyEndIcon:Fn,AlignVerticalJustifyStart:Bn,AlignVerticalJustifyStartIcon:Bn,AlignVerticalSpaceAround:En,AlignVerticalSpaceAroundIcon:En,AlignVerticalSpaceBetween:On,AlignVerticalSpaceBetweenIcon:On,Ambulance:Un,AmbulanceIcon:Un,Ampersand:Nn,AmpersandIcon:Nn,Ampersands:_n,AmpersandsIcon:_n,Amphora:Gn,AmphoraIcon:Gn,Anchor:Zn,AnchorIcon:Zn,Angry:Wn,AngryIcon:Wn,Annoyed:Xn,AnnoyedIcon:Xn,Antenna:Kn,AntennaIcon:Kn,Anvil:$n,AnvilIcon:$n,Aperture:Qn,ApertureIcon:Qn,AppWindow:Yn,AppWindowIcon:Yn,AppWindowMac:Jn,AppWindowMacIcon:Jn,Apple:e0,AppleIcon:e0,Archive:Do,ArchiveIcon:Do,ArchiveRestore:t0,ArchiveRestoreIcon:t0,ArchiveX:a0,ArchiveXIcon:a0,AreaChart:D1,AreaChartIcon:D1,Armchair:o0,ArmchairIcon:o0,ArrowBigDown:n0,ArrowBigDownDash:r0,ArrowBigDownDashIcon:r0,ArrowBigDownIcon:n0,ArrowBigLeft:i0,ArrowBigLeftDash:c0,ArrowBigLeftDashIcon:c0,ArrowBigLeftIcon:i0,ArrowBigRight:s0,ArrowBigRightDash:d0,ArrowBigRightDashIcon:d0,ArrowBigRightIcon:s0,ArrowBigUp:l0,ArrowBigUpDash:h0,ArrowBigUpDashIcon:h0,ArrowBigUpIcon:l0,ArrowDown:x0,ArrowDown01:y0,ArrowDown01Icon:y0,ArrowDown10:p0,ArrowDown10Icon:p0,ArrowDownAZ:L1,ArrowDownAZIcon:L1,ArrowDownAz:L1,ArrowDownAzIcon:L1,ArrowDownCircle:$1,ArrowDownCircleIcon:$1,ArrowDownFromLine:u0,ArrowDownFromLineIcon:u0,ArrowDownIcon:x0,ArrowDownLeft:k0,ArrowDownLeftFromCircle:J1,ArrowDownLeftFromCircleIcon:J1,ArrowDownLeftFromSquare:Va,ArrowDownLeftFromSquareIcon:Va,ArrowDownLeftIcon:k0,ArrowDownLeftSquare:ja,ArrowDownLeftSquareIcon:ja,ArrowDownNarrowWide:M0,ArrowDownNarrowWideIcon:M0,ArrowDownRight:m0,ArrowDownRightFromCircle:Y1,ArrowDownRightFromCircleIcon:Y1,ArrowDownRightFromSquare:Ra,ArrowDownRightFromSquareIcon:Ra,ArrowDownRightIcon:m0,ArrowDownRightSquare:Pa,ArrowDownRightSquareIcon:Pa,ArrowDownSquare:za,ArrowDownSquareIcon:za,ArrowDownToDot:v0,ArrowDownToDotIcon:v0,ArrowDownToLine:f0,ArrowDownToLineIcon:f0,ArrowDownUp:g0,ArrowDownUpIcon:g0,ArrowDownWideNarrow:C1,ArrowDownWideNarrowIcon:C1,ArrowDownZA:b1,ArrowDownZAIcon:b1,ArrowDownZa:b1,ArrowDownZaIcon:b1,ArrowLeft:b0,ArrowLeftCircle:Q1,ArrowLeftCircleIcon:Q1,ArrowLeftFromLine:w0,ArrowLeftFromLineIcon:w0,ArrowLeftIcon:b0,ArrowLeftRight:L0,ArrowLeftRightIcon:L0,ArrowLeftSquare:Ha,ArrowLeftSquareIcon:Ha,ArrowLeftToLine:C0,ArrowLeftToLineIcon:C0,ArrowRight:A0,ArrowRightCircle:at,ArrowRightCircleIcon:at,ArrowRightFromLine:I0,ArrowRightFromLineIcon:I0,ArrowRightIcon:A0,ArrowRightLeft:S0,ArrowRightLeftIcon:S0,ArrowRightSquare:Fa,ArrowRightSquareIcon:Fa,ArrowRightToLine:q0,ArrowRightToLineIcon:q0,ArrowUp:B0,ArrowUp01:j0,ArrowUp01Icon:j0,ArrowUp10:P0,ArrowUp10Icon:P0,ArrowUpAZ:I1,ArrowUpAZIcon:I1,ArrowUpAz:I1,ArrowUpAzIcon:I1,ArrowUpCircle:ot,ArrowUpCircleIcon:ot,ArrowUpDown:z0,ArrowUpDownIcon:z0,ArrowUpFromDot:H0,ArrowUpFromDotIcon:H0,ArrowUpFromLine:V0,ArrowUpFromLineIcon:V0,ArrowUpIcon:B0,ArrowUpLeft:R0,ArrowUpLeftFromCircle:et,ArrowUpLeftFromCircleIcon:et,ArrowUpLeftFromSquare:Da,ArrowUpLeftFromSquareIcon:Da,ArrowUpLeftIcon:R0,ArrowUpLeftSquare:Ba,ArrowUpLeftSquareIcon:Ba,ArrowUpNarrowWide:S1,ArrowUpNarrowWideIcon:S1,ArrowUpRight:D0,ArrowUpRightFromCircle:tt,ArrowUpRightFromCircleIcon:tt,ArrowUpRightFromSquare:Ta,ArrowUpRightFromSquareIcon:Ta,ArrowUpRightIcon:D0,ArrowUpRightSquare:Ea,ArrowUpRightSquareIcon:Ea,ArrowUpSquare:Oa,ArrowUpSquareIcon:Oa,ArrowUpToLine:T0,ArrowUpToLineIcon:T0,ArrowUpWideNarrow:F0,ArrowUpWideNarrowIcon:F0,ArrowUpZA:q1,ArrowUpZAIcon:q1,ArrowUpZa:q1,ArrowUpZaIcon:q1,ArrowsUpFromLine:E0,ArrowsUpFromLineIcon:E0,Asterisk:O0,AsteriskIcon:O0,AsteriskSquare:Ua,AsteriskSquareIcon:Ua,AtSign:To,AtSignIcon:To,Atom:U0,AtomIcon:U0,AudioLines:N0,AudioLinesIcon:N0,AudioWaveform:_0,AudioWaveformIcon:_0,Award:G0,AwardIcon:G0,Axe:Z0,AxeIcon:Z0,Axis3D:A1,Axis3DIcon:A1,Axis3d:A1,Axis3dIcon:A1,Baby:W0,BabyIcon:W0,Backpack:X0,BackpackIcon:X0,Badge:hc,BadgeAlert:K0,BadgeAlertIcon:K0,BadgeCent:$0,BadgeCentIcon:$0,BadgeCheck:j1,BadgeCheckIcon:j1,BadgeDollarSign:Q0,BadgeDollarSignIcon:Q0,BadgeEuro:J0,BadgeEuroIcon:J0,BadgeHelp:Y0,BadgeHelpIcon:Y0,BadgeIcon:hc,BadgeIndianRupee:ec,BadgeIndianRupeeIcon:ec,BadgeInfo:tc,BadgeInfoIcon:tc,BadgeJapaneseYen:ac,BadgeJapaneseYenIcon:ac,BadgeMinus:oc,BadgeMinusIcon:oc,BadgePercent:rc,BadgePercentIcon:rc,BadgePlus:nc,BadgePlusIcon:nc,BadgePoundSterling:cc,BadgePoundSterlingIcon:cc,BadgeRussianRuble:ic,BadgeRussianRubleIcon:ic,BadgeSwissFranc:dc,BadgeSwissFrancIcon:dc,BadgeX:sc,BadgeXIcon:sc,BaggageClaim:lc,BaggageClaimIcon:lc,Ban:yc,BanIcon:yc,Banana:pc,BananaIcon:pc,Bandage:uc,BandageIcon:uc,Banknote:kc,BanknoteIcon:kc,BarChart:_1,BarChart2:G1,BarChart2Icon:G1,BarChart3:U1,BarChart3Icon:U1,BarChart4:O1,BarChart4Icon:O1,BarChartBig:E1,BarChartBigIcon:E1,BarChartHorizontal:F1,BarChartHorizontalBig:T1,BarChartHorizontalBigIcon:T1,BarChartHorizontalIcon:F1,BarChartIcon:_1,Barcode:Mc,BarcodeIcon:Mc,Baseline:mc,BaselineIcon:mc,Bath:vc,BathIcon:vc,Battery:Cc,BatteryCharging:fc,BatteryChargingIcon:fc,BatteryFull:gc,BatteryFullIcon:gc,BatteryIcon:Cc,BatteryLow:xc,BatteryLowIcon:xc,BatteryMedium:wc,BatteryMediumIcon:wc,BatteryWarning:Lc,BatteryWarningIcon:Lc,Beaker:bc,BeakerIcon:bc,Bean:Sc,BeanIcon:Sc,BeanOff:Ic,BeanOffIcon:Ic,Bed:jc,BedDouble:qc,BedDoubleIcon:qc,BedIcon:jc,BedSingle:Ac,BedSingleIcon:Ac,Beef:Pc,BeefIcon:Pc,Beer:Hc,BeerIcon:Hc,BeerOff:zc,BeerOffIcon:zc,Bell:Fo,BellDot:Vc,BellDotIcon:Vc,BellElectric:Rc,BellElectricIcon:Rc,BellIcon:Fo,BellMinus:Dc,BellMinusIcon:Dc,BellOff:Tc,BellOffIcon:Tc,BellPlus:Fc,BellPlusIcon:Fc,BellRing:Bc,BellRingIcon:Bc,BetweenHorizonalEnd:P1,BetweenHorizonalEndIcon:P1,BetweenHorizonalStart:z1,BetweenHorizonalStartIcon:z1,BetweenHorizontalEnd:P1,BetweenHorizontalEndIcon:P1,BetweenHorizontalStart:z1,BetweenHorizontalStartIcon:z1,BetweenVerticalEnd:Ec,BetweenVerticalEndIcon:Ec,BetweenVerticalStart:Oc,BetweenVerticalStartIcon:Oc,BicepsFlexed:Uc,BicepsFlexedIcon:Uc,Bike:Nc,BikeIcon:Nc,Binary:_c,BinaryIcon:_c,Binoculars:Gc,BinocularsIcon:Gc,Biohazard:Zc,BiohazardIcon:Zc,Bird:Wc,BirdIcon:Wc,Bitcoin:Xc,BitcoinIcon:Xc,Blend:Kc,BlendIcon:Kc,Blinds:$c,BlindsIcon:$c,Blocks:Qc,BlocksIcon:Qc,Bluetooth:ti,BluetoothConnected:Jc,BluetoothConnectedIcon:Jc,BluetoothIcon:ti,BluetoothOff:Yc,BluetoothOffIcon:Yc,BluetoothSearching:ei,BluetoothSearchingIcon:ei,Bold:ai,BoldIcon:ai,Bolt:oi,BoltIcon:oi,Bomb:ri,BombIcon:ri,Bone:ni,BoneIcon:ni,Book:no,BookA:ci,BookAIcon:ci,BookAudio:ii,BookAudioIcon:ii,BookCheck:di,BookCheckIcon:di,BookCopy:si,BookCopyIcon:si,BookDashed:H1,BookDashedIcon:H1,BookDown:hi,BookDownIcon:hi,BookHeadphones:li,BookHeadphonesIcon:li,BookHeart:yi,BookHeartIcon:yi,BookIcon:no,BookImage:pi,BookImageIcon:pi,BookKey:ui,BookKeyIcon:ui,BookLock:ki,BookLockIcon:ki,BookMarked:Mi,BookMarkedIcon:Mi,BookMinus:mi,BookMinusIcon:mi,BookOpen:gi,BookOpenCheck:vi,BookOpenCheckIcon:vi,BookOpenIcon:gi,BookOpenText:fi,BookOpenTextIcon:fi,BookPlus:xi,BookPlusIcon:xi,BookTemplate:H1,BookTemplateIcon:H1,BookText:wi,BookTextIcon:wi,BookType:Li,BookTypeIcon:Li,BookUp:bi,BookUp2:Ci,BookUp2Icon:Ci,BookUpIcon:bi,BookUser:Ii,BookUserIcon:Ii,BookX:Si,BookXIcon:Si,Bookmark:Bo,BookmarkCheck:qi,BookmarkCheckIcon:qi,BookmarkIcon:Bo,BookmarkMinus:Ai,BookmarkMinusIcon:Ai,BookmarkPlus:ji,BookmarkPlusIcon:ji,BookmarkX:Pi,BookmarkXIcon:Pi,BoomBox:zi,BoomBoxIcon:zi,Bot:Ri,BotIcon:Ri,BotMessageSquare:Hi,BotMessageSquareIcon:Hi,BotOff:Vi,BotOffIcon:Vi,Box:Di,BoxIcon:Di,BoxSelect:Ya,BoxSelectIcon:Ya,Boxes:Ti,BoxesIcon:Ti,Braces:V1,BracesIcon:V1,Brackets:Fi,BracketsIcon:Fi,Brain:Oi,BrainCircuit:Bi,BrainCircuitIcon:Bi,BrainCog:Ei,BrainCogIcon:Ei,BrainIcon:Oi,BrickWall:Ui,BrickWallIcon:Ui,Briefcase:co,BriefcaseBusiness:Ni,BriefcaseBusinessIcon:Ni,BriefcaseConveyorBelt:_i,BriefcaseConveyorBeltIcon:_i,BriefcaseIcon:co,BriefcaseMedical:Gi,BriefcaseMedicalIcon:Gi,BringToFront:Zi,BringToFrontIcon:Zi,Brush:Wi,BrushIcon:Wi,Bug:$i,BugIcon:$i,BugOff:Xi,BugOffIcon:Xi,BugPlay:Ki,BugPlayIcon:Ki,Building:Ji,Building2:Qi,Building2Icon:Qi,BuildingIcon:Ji,Bus:ed,BusFront:Yi,BusFrontIcon:Yi,BusIcon:ed,Cable:ad,CableCar:td,CableCarIcon:td,CableIcon:ad,Cake:rd,CakeIcon:rd,CakeSlice:od,CakeSliceIcon:od,Calculator:nd,CalculatorIcon:nd,Calendar:Eo,Calendar1:cd,Calendar1Icon:cd,CalendarArrowDown:id,CalendarArrowDownIcon:id,CalendarArrowUp:dd,CalendarArrowUpIcon:dd,CalendarCheck:hd,CalendarCheck2:sd,CalendarCheck2Icon:sd,CalendarCheckIcon:hd,CalendarClock:ld,CalendarClockIcon:ld,CalendarCog:yd,CalendarCogIcon:yd,CalendarDays:pd,CalendarDaysIcon:pd,CalendarFold:ud,CalendarFoldIcon:ud,CalendarHeart:kd,CalendarHeartIcon:kd,CalendarIcon:Eo,CalendarMinus:md,CalendarMinus2:Md,CalendarMinus2Icon:Md,CalendarMinusIcon:md,CalendarOff:vd,CalendarOffIcon:vd,CalendarPlus:gd,CalendarPlus2:fd,CalendarPlus2Icon:fd,CalendarPlusIcon:gd,CalendarRange:xd,CalendarRangeIcon:xd,CalendarSearch:wd,CalendarSearchIcon:wd,CalendarSync:Ld,CalendarSyncIcon:Ld,CalendarX:bd,CalendarX2:Cd,CalendarX2Icon:Cd,CalendarXIcon:bd,Camera:Oo,CameraIcon:Oo,CameraOff:Id,CameraOffIcon:Id,CandlestickChart:B1,CandlestickChartIcon:B1,Candy:Ad,CandyCane:Sd,CandyCaneIcon:Sd,CandyIcon:Ad,CandyOff:qd,CandyOffIcon:qd,Cannabis:jd,CannabisIcon:jd,Captions:R1,CaptionsIcon:R1,CaptionsOff:Pd,CaptionsOffIcon:Pd,Car:io,CarFront:zd,CarFrontIcon:zd,CarIcon:io,CarTaxiFront:Hd,CarTaxiFrontIcon:Hd,Caravan:Vd,CaravanIcon:Vd,Carrot:Rd,CarrotIcon:Rd,CaseLower:Dd,CaseLowerIcon:Dd,CaseSensitive:Td,CaseSensitiveIcon:Td,CaseUpper:Fd,CaseUpperIcon:Fd,CassetteTape:Bd,CassetteTapeIcon:Bd,Cast:Ed,CastIcon:Ed,Castle:Od,CastleIcon:Od,Cat:Ud,CatIcon:Ud,Cctv:Nd,CctvIcon:Nd,ChartArea:D1,ChartAreaIcon:D1,ChartBar:F1,ChartBarBig:T1,ChartBarBigIcon:T1,ChartBarDecreasing:_d,ChartBarDecreasingIcon:_d,ChartBarIcon:F1,ChartBarIncreasing:Gd,ChartBarIncreasingIcon:Gd,ChartBarStacked:Zd,ChartBarStackedIcon:Zd,ChartCandlestick:B1,ChartCandlestickIcon:B1,ChartColumn:U1,ChartColumnBig:E1,ChartColumnBigIcon:E1,ChartColumnDecreasing:Wd,ChartColumnDecreasingIcon:Wd,ChartColumnIcon:U1,ChartColumnIncreasing:O1,ChartColumnIncreasingIcon:O1,ChartColumnStacked:Xd,ChartColumnStackedIcon:Xd,ChartGantt:Kd,ChartGanttIcon:Kd,ChartLine:N1,ChartLineIcon:N1,ChartNetwork:$d,ChartNetworkIcon:$d,ChartNoAxesColumn:G1,ChartNoAxesColumnDecreasing:Qd,ChartNoAxesColumnDecreasingIcon:Qd,ChartNoAxesColumnIcon:G1,ChartNoAxesColumnIncreasing:_1,ChartNoAxesColumnIncreasingIcon:_1,ChartNoAxesCombined:Jd,ChartNoAxesCombinedIcon:Jd,ChartNoAxesGantt:Z1,ChartNoAxesGanttIcon:Z1,ChartPie:W1,ChartPieIcon:W1,ChartScatter:X1,ChartScatterIcon:X1,ChartSpline:Yd,ChartSplineIcon:Yd,Check:so,CheckCheck:es,CheckCheckIcon:es,CheckCircle:rt,CheckCircle2:nt,CheckCircle2Icon:nt,CheckCircleIcon:rt,CheckIcon:so,CheckSquare:_a,CheckSquare2:Ga,CheckSquare2Icon:Ga,CheckSquareIcon:_a,ChefHat:ts,ChefHatIcon:ts,Cherry:as,CherryIcon:as,ChevronDown:os,ChevronDownCircle:ct,ChevronDownCircleIcon:ct,ChevronDownIcon:os,ChevronDownSquare:Za,ChevronDownSquareIcon:Za,ChevronFirst:rs,ChevronFirstIcon:rs,ChevronLast:ns,ChevronLastIcon:ns,ChevronLeft:cs,ChevronLeftCircle:it,ChevronLeftCircleIcon:it,ChevronLeftIcon:cs,ChevronLeftSquare:Wa,ChevronLeftSquareIcon:Wa,ChevronRight:Uo,ChevronRightCircle:dt,ChevronRightCircleIcon:dt,ChevronRightIcon:Uo,ChevronRightSquare:Xa,ChevronRightSquareIcon:Xa,ChevronUp:is,ChevronUpCircle:st,ChevronUpCircleIcon:st,ChevronUpIcon:is,ChevronUpSquare:Ka,ChevronUpSquareIcon:Ka,ChevronsDown:ss,ChevronsDownIcon:ss,ChevronsDownUp:ds,ChevronsDownUpIcon:ds,ChevronsLeft:ys,ChevronsLeftIcon:ys,ChevronsLeftRight:ls,ChevronsLeftRightEllipsis:hs,ChevronsLeftRightEllipsisIcon:hs,ChevronsLeftRightIcon:ls,ChevronsRight:us,ChevronsRightIcon:us,ChevronsRightLeft:ps,ChevronsRightLeftIcon:ps,ChevronsUp:Ms,ChevronsUpDown:ks,ChevronsUpDownIcon:ks,ChevronsUpIcon:Ms,Chrome:ms,ChromeIcon:ms,Church:vs,ChurchIcon:vs,Cigarette:gs,CigaretteIcon:gs,CigaretteOff:fs,CigaretteOffIcon:fs,Circle:ho,CircleAlert:K1,CircleAlertIcon:K1,CircleArrowDown:$1,CircleArrowDownIcon:$1,CircleArrowLeft:Q1,CircleArrowLeftIcon:Q1,CircleArrowOutDownLeft:J1,CircleArrowOutDownLeftIcon:J1,CircleArrowOutDownRight:Y1,CircleArrowOutDownRightIcon:Y1,CircleArrowOutUpLeft:et,CircleArrowOutUpLeftIcon:et,CircleArrowOutUpRight:tt,CircleArrowOutUpRightIcon:tt,CircleArrowRight:at,CircleArrowRightIcon:at,CircleArrowUp:ot,CircleArrowUpIcon:ot,CircleCheck:nt,CircleCheckBig:rt,CircleCheckBigIcon:rt,CircleCheckIcon:nt,CircleChevronDown:ct,CircleChevronDownIcon:ct,CircleChevronLeft:it,CircleChevronLeftIcon:it,CircleChevronRight:dt,CircleChevronRightIcon:dt,CircleChevronUp:st,CircleChevronUpIcon:st,CircleDashed:xs,CircleDashedIcon:xs,CircleDivide:ht,CircleDivideIcon:ht,CircleDollarSign:ws,CircleDollarSignIcon:ws,CircleDot:Cs,CircleDotDashed:Ls,CircleDotDashedIcon:Ls,CircleDotIcon:Cs,CircleEllipsis:bs,CircleEllipsisIcon:bs,CircleEqual:Is,CircleEqualIcon:Is,CircleFadingArrowUp:Ss,CircleFadingArrowUpIcon:Ss,CircleFadingPlus:qs,CircleFadingPlusIcon:qs,CircleGauge:lt,CircleGaugeIcon:lt,CircleHelp:yt,CircleHelpIcon:yt,CircleIcon:ho,CircleMinus:pt,CircleMinusIcon:pt,CircleOff:As,CircleOffIcon:As,CircleParking:kt,CircleParkingIcon:kt,CircleParkingOff:ut,CircleParkingOffIcon:ut,CirclePause:Mt,CirclePauseIcon:Mt,CirclePercent:mt,CirclePercentIcon:mt,CirclePlay:vt,CirclePlayIcon:vt,CirclePlus:ft,CirclePlusIcon:ft,CirclePower:gt,CirclePowerIcon:gt,CircleSlash:js,CircleSlash2:xt,CircleSlash2Icon:xt,CircleSlashIcon:js,CircleSlashed:xt,CircleSlashedIcon:xt,CircleStop:wt,CircleStopIcon:wt,CircleUser:Ct,CircleUserIcon:Ct,CircleUserRound:Lt,CircleUserRoundIcon:Lt,CircleX:bt,CircleXIcon:bt,CircuitBoard:Ps,CircuitBoardIcon:Ps,Citrus:zs,CitrusIcon:zs,Clapperboard:Hs,ClapperboardIcon:Hs,Clipboard:Us,ClipboardCheck:Vs,ClipboardCheckIcon:Vs,ClipboardCopy:Rs,ClipboardCopyIcon:Rs,ClipboardEdit:St,ClipboardEditIcon:St,ClipboardIcon:Us,ClipboardList:Ds,ClipboardListIcon:Ds,ClipboardMinus:Ts,ClipboardMinusIcon:Ts,ClipboardPaste:Fs,ClipboardPasteIcon:Fs,ClipboardPen:St,ClipboardPenIcon:St,ClipboardPenLine:It,ClipboardPenLineIcon:It,ClipboardPlus:Bs,ClipboardPlusIcon:Bs,ClipboardSignature:It,ClipboardSignatureIcon:It,ClipboardType:Es,ClipboardTypeIcon:Es,ClipboardX:Os,ClipboardXIcon:Os,Clock:l1,Clock1:Ns,Clock10:_s,Clock10Icon:_s,Clock11:Gs,Clock11Icon:Gs,Clock12:Zs,Clock12Icon:Zs,Clock1Icon:Ns,Clock2:Ws,Clock2Icon:Ws,Clock3:Xs,Clock3Icon:Xs,Clock4:Ks,Clock4Icon:Ks,Clock5:$s,Clock5Icon:$s,Clock6:Qs,Clock6Icon:Qs,Clock7:Js,Clock7Icon:Js,Clock8:Ys,Clock8Icon:Ys,Clock9:eh,Clock9Icon:eh,ClockAlert:th,ClockAlertIcon:th,ClockArrowDown:ah,ClockArrowDownIcon:ah,ClockArrowUp:oh,ClockArrowUpIcon:oh,ClockIcon:l1,Cloud:vh,CloudAlert:rh,CloudAlertIcon:rh,CloudCog:nh,CloudCogIcon:nh,CloudDownload:qt,CloudDownloadIcon:qt,CloudDrizzle:ch,CloudDrizzleIcon:ch,CloudFog:ih,CloudFogIcon:ih,CloudHail:dh,CloudHailIcon:dh,CloudIcon:vh,CloudLightning:sh,CloudLightningIcon:sh,CloudMoon:lh,CloudMoonIcon:lh,CloudMoonRain:hh,CloudMoonRainIcon:hh,CloudOff:yh,CloudOffIcon:yh,CloudRain:uh,CloudRainIcon:uh,CloudRainWind:ph,CloudRainWindIcon:ph,CloudSnow:kh,CloudSnowIcon:kh,CloudSun:mh,CloudSunIcon:mh,CloudSunRain:Mh,CloudSunRainIcon:Mh,CloudUpload:At,CloudUploadIcon:At,Cloudy:fh,CloudyIcon:fh,Clover:gh,CloverIcon:gh,Club:xh,ClubIcon:xh,Code:wh,Code2:jt,Code2Icon:jt,CodeIcon:wh,CodeSquare:$a,CodeSquareIcon:$a,CodeXml:jt,CodeXmlIcon:jt,Codepen:Lh,CodepenIcon:Lh,Codesandbox:Ch,CodesandboxIcon:Ch,Coffee:No,CoffeeIcon:No,Cog:bh,CogIcon:bh,Coins:_o,CoinsIcon:_o,Columns:Pt,Columns2:Pt,Columns2Icon:Pt,Columns3:zt,Columns3Icon:zt,Columns4:Ih,Columns4Icon:Ih,ColumnsIcon:Pt,Combine:Sh,CombineIcon:Sh,Command:qh,CommandIcon:qh,Compass:Ah,CompassIcon:Ah,Component:jh,ComponentIcon:jh,Computer:Ph,ComputerIcon:Ph,ConciergeBell:zh,ConciergeBellIcon:zh,Cone:Hh,ConeIcon:Hh,Construction:Vh,ConstructionIcon:Vh,Contact:Rh,Contact2:Ht,Contact2Icon:Ht,ContactIcon:Rh,ContactRound:Ht,ContactRoundIcon:Ht,Container:Dh,ContainerIcon:Dh,Contrast:Th,ContrastIcon:Th,Cookie:Fh,CookieIcon:Fh,CookingPot:Bh,CookingPotIcon:Bh,Copy:Go,CopyCheck:Eh,CopyCheckIcon:Eh,CopyIcon:Go,CopyMinus:Oh,CopyMinusIcon:Oh,CopyPlus:Uh,CopyPlusIcon:Uh,CopySlash:Nh,CopySlashIcon:Nh,CopyX:_h,CopyXIcon:_h,Copyleft:Gh,CopyleftIcon:Gh,Copyright:Zh,CopyrightIcon:Zh,CornerDownLeft:Wh,CornerDownLeftIcon:Wh,CornerDownRight:Xh,CornerDownRightIcon:Xh,CornerLeftDown:Kh,CornerLeftDownIcon:Kh,CornerLeftUp:$h,CornerLeftUpIcon:$h,CornerRightDown:Qh,CornerRightDownIcon:Qh,CornerRightUp:Jh,CornerRightUpIcon:Jh,CornerUpLeft:Yh,CornerUpLeftIcon:Yh,CornerUpRight:el,CornerUpRightIcon:el,Cpu:tl,CpuIcon:tl,CreativeCommons:al,CreativeCommonsIcon:al,CreditCard:ol,CreditCardIcon:ol,Croissant:rl,CroissantIcon:rl,Crop:nl,CropIcon:nl,Cross:cl,CrossIcon:cl,Crosshair:il,CrosshairIcon:il,Crown:lo,CrownIcon:lo,Cuboid:dl,CuboidIcon:dl,CupSoda:sl,CupSodaIcon:sl,CurlyBraces:V1,CurlyBracesIcon:V1,Currency:hl,CurrencyIcon:hl,Cylinder:ll,CylinderIcon:ll,Dam:yl,DamIcon:yl,Database:kl,DatabaseBackup:pl,DatabaseBackupIcon:pl,DatabaseIcon:kl,DatabaseZap:ul,DatabaseZapIcon:ul,Delete:Ml,DeleteIcon:Ml,Dessert:ml,DessertIcon:ml,Diameter:vl,DiameterIcon:vl,Diamond:Zo,DiamondIcon:Zo,DiamondMinus:fl,DiamondMinusIcon:fl,DiamondPercent:Vt,DiamondPercentIcon:Vt,DiamondPlus:gl,DiamondPlusIcon:gl,Dice1:xl,Dice1Icon:xl,Dice2:wl,Dice2Icon:wl,Dice3:Ll,Dice3Icon:Ll,Dice4:Cl,Dice4Icon:Cl,Dice5:bl,Dice5Icon:bl,Dice6:Il,Dice6Icon:Il,Dices:Sl,DicesIcon:Sl,Diff:ql,DiffIcon:ql,Disc:zl,Disc2:Al,Disc2Icon:Al,Disc3:jl,Disc3Icon:jl,DiscAlbum:Pl,DiscAlbumIcon:Pl,DiscIcon:zl,Divide:Hl,DivideCircle:ht,DivideCircleIcon:ht,DivideIcon:Hl,DivideSquare:e2,DivideSquareIcon:e2,Dna:Rl,DnaIcon:Rl,DnaOff:Vl,DnaOffIcon:Vl,Dock:Dl,DockIcon:Dl,Dog:Tl,DogIcon:Tl,DollarSign:Wo,DollarSignIcon:Wo,Donut:Fl,DonutIcon:Fl,DoorClosed:Bl,DoorClosedIcon:Bl,DoorOpen:El,DoorOpenIcon:El,Dot:Ol,DotIcon:Ol,DotSquare:t2,DotSquareIcon:t2,Download:Xo,DownloadCloud:qt,DownloadCloudIcon:qt,DownloadIcon:Xo,DraftingCompass:Ul,DraftingCompassIcon:Ul,Drama:Nl,DramaIcon:Nl,Dribbble:_l,DribbbleIcon:_l,Drill:Gl,DrillIcon:Gl,Droplet:Zl,DropletIcon:Zl,Droplets:Wl,DropletsIcon:Wl,Drum:Xl,DrumIcon:Xl,Drumstick:Kl,DrumstickIcon:Kl,Dumbbell:$l,DumbbellIcon:$l,Ear:Jl,EarIcon:Jl,EarOff:Ql,EarOffIcon:Ql,Earth:Rt,EarthIcon:Rt,EarthLock:Yl,EarthLockIcon:Yl,Eclipse:ey,EclipseIcon:ey,Edit:Se,Edit2:n1,Edit2Icon:n1,Edit3:va,Edit3Icon:va,EditIcon:Se,Egg:oy,EggFried:ty,EggFriedIcon:ty,EggIcon:oy,EggOff:ay,EggOffIcon:ay,Ellipsis:Tt,EllipsisIcon:Tt,EllipsisVertical:Dt,EllipsisVerticalIcon:Dt,Equal:Ko,EqualApproximately:ry,EqualApproximatelyIcon:ry,EqualIcon:Ko,EqualNot:ny,EqualNotIcon:ny,EqualSquare:a2,EqualSquareIcon:a2,Eraser:cy,EraserIcon:cy,EthernetPort:iy,EthernetPortIcon:iy,Euro:$o,EuroIcon:$o,Expand:dy,ExpandIcon:dy,ExternalLink:sy,ExternalLinkIcon:sy,Eye:$2,EyeClosed:hy,EyeClosedIcon:hy,EyeIcon:$2,EyeOff:K2,EyeOffIcon:K2,Facebook:ly,FacebookIcon:ly,Factory:yy,FactoryIcon:yy,Fan:py,FanIcon:py,FastForward:uy,FastForwardIcon:uy,Feather:ky,FeatherIcon:ky,Fence:My,FenceIcon:My,FerrisWheel:my,FerrisWheelIcon:my,Figma:vy,FigmaIcon:vy,File:kp,FileArchive:fy,FileArchiveIcon:fy,FileAudio:xy,FileAudio2:gy,FileAudio2Icon:gy,FileAudioIcon:xy,FileAxis3D:Ft,FileAxis3DIcon:Ft,FileAxis3d:Ft,FileAxis3dIcon:Ft,FileBadge:Ly,FileBadge2:wy,FileBadge2Icon:wy,FileBadgeIcon:Ly,FileBarChart:Bt,FileBarChart2:Et,FileBarChart2Icon:Et,FileBarChartIcon:Bt,FileBox:Cy,FileBoxIcon:Cy,FileChartColumn:Et,FileChartColumnIcon:Et,FileChartColumnIncreasing:Bt,FileChartColumnIncreasingIcon:Bt,FileChartLine:Ot,FileChartLineIcon:Ot,FileChartPie:Ut,FileChartPieIcon:Ut,FileCheck:Iy,FileCheck2:by,FileCheck2Icon:by,FileCheckIcon:Iy,FileClock:Sy,FileClockIcon:Sy,FileCode:Ay,FileCode2:qy,FileCode2Icon:qy,FileCodeIcon:Ay,FileCog:Nt,FileCog2:Nt,FileCog2Icon:Nt,FileCogIcon:Nt,FileDiff:jy,FileDiffIcon:jy,FileDigit:Py,FileDigitIcon:Py,FileDown:zy,FileDownIcon:zy,FileEdit:Gt,FileEditIcon:Gt,FileHeart:Hy,FileHeartIcon:Hy,FileIcon:kp,FileImage:Vy,FileImageIcon:Vy,FileInput:Ry,FileInputIcon:Ry,FileJson:Ty,FileJson2:Dy,FileJson2Icon:Dy,FileJsonIcon:Ty,FileKey:By,FileKey2:Fy,FileKey2Icon:Fy,FileKeyIcon:By,FileLineChart:Ot,FileLineChartIcon:Ot,FileLock:Oy,FileLock2:Ey,FileLock2Icon:Ey,FileLockIcon:Oy,FileMinus:Ny,FileMinus2:Uy,FileMinus2Icon:Uy,FileMinusIcon:Ny,FileMusic:_y,FileMusicIcon:_y,FileOutput:Gy,FileOutputIcon:Gy,FilePen:Gt,FilePenIcon:Gt,FilePenLine:_t,FilePenLineIcon:_t,FilePieChart:Ut,FilePieChartIcon:Ut,FilePlus:Wy,FilePlus2:Zy,FilePlus2Icon:Zy,FilePlusIcon:Wy,FileQuestion:Xy,FileQuestionIcon:Xy,FileScan:Ky,FileScanIcon:Ky,FileSearch:Qy,FileSearch2:$y,FileSearch2Icon:$y,FileSearchIcon:Qy,FileSignature:_t,FileSignatureIcon:_t,FileSliders:Jy,FileSlidersIcon:Jy,FileSpreadsheet:Yy,FileSpreadsheetIcon:Yy,FileStack:ep,FileStackIcon:ep,FileSymlink:tp,FileSymlinkIcon:tp,FileTerminal:ap,FileTerminalIcon:ap,FileText:op,FileTextIcon:op,FileType:np,FileType2:rp,FileType2Icon:rp,FileTypeIcon:np,FileUp:cp,FileUpIcon:cp,FileUser:ip,FileUserIcon:ip,FileVideo:sp,FileVideo2:dp,FileVideo2Icon:dp,FileVideoIcon:sp,FileVolume:lp,FileVolume2:hp,FileVolume2Icon:hp,FileVolumeIcon:lp,FileWarning:yp,FileWarningIcon:yp,FileX:up,FileX2:pp,FileX2Icon:pp,FileXIcon:up,Files:Mp,FilesIcon:Mp,Film:mp,FilmIcon:mp,Filter:fp,FilterIcon:fp,FilterX:vp,FilterXIcon:vp,Fingerprint:gp,FingerprintIcon:gp,FireExtinguisher:xp,FireExtinguisherIcon:xp,Fish:Cp,FishIcon:Cp,FishOff:wp,FishOffIcon:wp,FishSymbol:Lp,FishSymbolIcon:Lp,Flag:Qo,FlagIcon:Qo,FlagOff:bp,FlagOffIcon:bp,FlagTriangleLeft:Ip,FlagTriangleLeftIcon:Ip,FlagTriangleRight:Sp,FlagTriangleRightIcon:Sp,Flame:Ap,FlameIcon:Ap,FlameKindling:qp,FlameKindlingIcon:qp,Flashlight:Pp,FlashlightIcon:Pp,FlashlightOff:jp,FlashlightOffIcon:jp,FlaskConical:Hp,FlaskConicalIcon:Hp,FlaskConicalOff:zp,FlaskConicalOffIcon:zp,FlaskRound:Vp,FlaskRoundIcon:Vp,FlipHorizontal:Dp,FlipHorizontal2:Rp,FlipHorizontal2Icon:Rp,FlipHorizontalIcon:Dp,FlipVertical:Fp,FlipVertical2:Tp,FlipVertical2Icon:Tp,FlipVerticalIcon:Fp,Flower:Ep,Flower2:Bp,Flower2Icon:Bp,FlowerIcon:Ep,Focus:Op,FocusIcon:Op,FoldHorizontal:Up,FoldHorizontalIcon:Up,FoldVertical:Np,FoldVerticalIcon:Np,Folder:y1,FolderArchive:_p,FolderArchiveIcon:_p,FolderCheck:Gp,FolderCheckIcon:Gp,FolderClock:Zp,FolderClockIcon:Zp,FolderClosed:Wp,FolderClosedIcon:Wp,FolderCode:Xp,FolderCodeIcon:Xp,FolderCog:Zt,FolderCog2:Zt,FolderCog2Icon:Zt,FolderCogIcon:Zt,FolderDot:Kp,FolderDotIcon:Kp,FolderDown:$p,FolderDownIcon:$p,FolderEdit:Wt,FolderEditIcon:Wt,FolderGit:Jp,FolderGit2:Qp,FolderGit2Icon:Qp,FolderGitIcon:Jp,FolderHeart:Yp,FolderHeartIcon:Yp,FolderIcon:y1,FolderInput:eu,FolderInputIcon:eu,FolderKanban:tu,FolderKanbanIcon:tu,FolderKey:au,FolderKeyIcon:au,FolderLock:ou,FolderLockIcon:ou,FolderMinus:ru,FolderMinusIcon:ru,FolderOpen:cu,FolderOpenDot:nu,FolderOpenDotIcon:nu,FolderOpenIcon:cu,FolderOutput:iu,FolderOutputIcon:iu,FolderPen:Wt,FolderPenIcon:Wt,FolderPlus:du,FolderPlusIcon:du,FolderRoot:su,FolderRootIcon:su,FolderSearch:lu,FolderSearch2:hu,FolderSearch2Icon:hu,FolderSearchIcon:lu,FolderSymlink:yu,FolderSymlinkIcon:yu,FolderSync:pu,FolderSyncIcon:pu,FolderTree:uu,FolderTreeIcon:uu,FolderUp:ku,FolderUpIcon:ku,FolderX:Mu,FolderXIcon:Mu,Folders:mu,FoldersIcon:mu,Footprints:vu,FootprintsIcon:vu,ForkKnife:Xe,ForkKnifeCrossed:E2,ForkKnifeCrossedIcon:E2,ForkKnifeIcon:Xe,Forklift:fu,ForkliftIcon:fu,FormInput:ga,FormInputIcon:ga,Forward:gu,ForwardIcon:gu,Frame:xu,FrameIcon:xu,Framer:wu,FramerIcon:wu,Frown:Lu,FrownIcon:Lu,Fuel:Jo,FuelIcon:Jo,Fullscreen:Cu,FullscreenIcon:Cu,FunctionSquare:o2,FunctionSquareIcon:o2,GalleryHorizontal:Iu,GalleryHorizontalEnd:bu,GalleryHorizontalEndIcon:bu,GalleryHorizontalIcon:Iu,GalleryThumbnails:Su,GalleryThumbnailsIcon:Su,GalleryVertical:Au,GalleryVerticalEnd:qu,GalleryVerticalEndIcon:qu,GalleryVerticalIcon:Au,Gamepad:yo,Gamepad2:ju,Gamepad2Icon:ju,GamepadIcon:yo,GanttChart:Z1,GanttChartIcon:Z1,GanttChartSquare:Be,GanttChartSquareIcon:Be,Gauge:Pu,GaugeCircle:lt,GaugeCircleIcon:lt,GaugeIcon:Pu,Gavel:zu,GavelIcon:zu,Gem:Hu,GemIcon:Hu,Ghost:Vu,GhostIcon:Vu,Gift:Yo,GiftIcon:Yo,GitBranch:Du,GitBranchIcon:Du,GitBranchPlus:Ru,GitBranchPlusIcon:Ru,GitCommit:Xt,GitCommitHorizontal:Xt,GitCommitHorizontalIcon:Xt,GitCommitIcon:Xt,GitCommitVertical:Tu,GitCommitVerticalIcon:Tu,GitCompare:Bu,GitCompareArrows:Fu,GitCompareArrowsIcon:Fu,GitCompareIcon:Bu,GitFork:Eu,GitForkIcon:Eu,GitGraph:Ou,GitGraphIcon:Ou,GitMerge:Uu,GitMergeIcon:Uu,GitPullRequest:Xu,GitPullRequestArrow:Nu,GitPullRequestArrowIcon:Nu,GitPullRequestClosed:_u,GitPullRequestClosedIcon:_u,GitPullRequestCreate:Zu,GitPullRequestCreateArrow:Gu,GitPullRequestCreateArrowIcon:Gu,GitPullRequestCreateIcon:Zu,GitPullRequestDraft:Wu,GitPullRequestDraftIcon:Wu,GitPullRequestIcon:Xu,Github:Ku,GithubIcon:Ku,Gitlab:$u,GitlabIcon:$u,GlassWater:Qu,GlassWaterIcon:Qu,Glasses:Ju,GlassesIcon:Ju,Globe:er,Globe2:Rt,Globe2Icon:Rt,GlobeIcon:er,GlobeLock:Yu,GlobeLockIcon:Yu,Goal:e4,GoalIcon:e4,Grab:t4,GrabIcon:t4,GraduationCap:tr,GraduationCapIcon:tr,Grape:a4,GrapeIcon:a4,Grid:Fe,Grid2X2:$t,Grid2X2Icon:$t,Grid2X2Plus:Kt,Grid2X2PlusIcon:Kt,Grid2x2:$t,Grid2x2Check:o4,Grid2x2CheckIcon:o4,Grid2x2Icon:$t,Grid2x2Plus:Kt,Grid2x2PlusIcon:Kt,Grid2x2X:r4,Grid2x2XIcon:r4,Grid3X3:Fe,Grid3X3Icon:Fe,Grid3x3:Fe,Grid3x3Icon:Fe,GridIcon:Fe,Grip:i4,GripHorizontal:n4,GripHorizontalIcon:n4,GripIcon:i4,GripVertical:c4,GripVerticalIcon:c4,Group:d4,GroupIcon:d4,Guitar:s4,GuitarIcon:s4,Ham:h4,HamIcon:h4,Hammer:ar,HammerIcon:ar,Hand:k4,HandCoins:l4,HandCoinsIcon:l4,HandHeart:y4,HandHeartIcon:y4,HandHelping:Qt,HandHelpingIcon:Qt,HandIcon:k4,HandMetal:p4,HandMetalIcon:p4,HandPlatter:u4,HandPlatterIcon:u4,Handshake:M4,HandshakeIcon:M4,HardDrive:f4,HardDriveDownload:m4,HardDriveDownloadIcon:m4,HardDriveIcon:f4,HardDriveUpload:v4,HardDriveUploadIcon:v4,HardHat:g4,HardHatIcon:g4,Hash:or,HashIcon:or,Haze:x4,HazeIcon:x4,HdmiPort:w4,HdmiPortIcon:w4,Heading:A4,Heading1:L4,Heading1Icon:L4,Heading2:C4,Heading2Icon:C4,Heading3:b4,Heading3Icon:b4,Heading4:I4,Heading4Icon:I4,Heading5:S4,Heading5Icon:S4,Heading6:q4,Heading6Icon:q4,HeadingIcon:A4,HeadphoneOff:j4,HeadphoneOffIcon:j4,Headphones:P4,HeadphonesIcon:P4,Headset:z4,HeadsetIcon:z4,Heart:po,HeartCrack:H4,HeartCrackIcon:H4,HeartHandshake:V4,HeartHandshakeIcon:V4,HeartIcon:po,HeartOff:R4,HeartOffIcon:R4,HeartPulse:D4,HeartPulseIcon:D4,Heater:T4,HeaterIcon:T4,HelpCircle:yt,HelpCircleIcon:yt,HelpingHand:Qt,HelpingHandIcon:Qt,Hexagon:rr,HexagonIcon:rr,Highlighter:F4,HighlighterIcon:F4,History:B4,HistoryIcon:B4,Home:Ne,HomeIcon:Ne,Hop:O4,HopIcon:O4,HopOff:E4,HopOffIcon:E4,Hospital:U4,HospitalIcon:U4,Hotel:N4,HotelIcon:N4,Hourglass:_4,HourglassIcon:_4,House:Ne,HouseIcon:Ne,HousePlug:G4,HousePlugIcon:G4,HousePlus:Z4,HousePlusIcon:Z4,IceCream:Yt,IceCream2:Jt,IceCream2Icon:Jt,IceCreamBowl:Jt,IceCreamBowlIcon:Jt,IceCreamCone:Yt,IceCreamConeIcon:Yt,IceCreamIcon:Yt,Icon:tL,IdCard:W4,IdCardIcon:W4,Image:tk,ImageDown:X4,ImageDownIcon:X4,ImageIcon:tk,ImageMinus:K4,ImageMinusIcon:K4,ImageOff:$4,ImageOffIcon:$4,ImagePlay:Q4,ImagePlayIcon:Q4,ImagePlus:J4,ImagePlusIcon:J4,ImageUp:Y4,ImageUpIcon:Y4,ImageUpscale:ek,ImageUpscaleIcon:ek,Images:ak,ImagesIcon:ak,Import:ok,ImportIcon:ok,Inbox:rk,InboxIcon:rk,Indent:ta,IndentDecrease:ea,IndentDecreaseIcon:ea,IndentIcon:ta,IndentIncrease:ta,IndentIncreaseIcon:ta,IndianRupee:nk,IndianRupeeIcon:nk,Infinity:ck,InfinityIcon:ck,Info:ik,InfoIcon:ik,Inspect:s2,InspectIcon:s2,InspectionPanel:dk,InspectionPanelIcon:dk,Instagram:sk,InstagramIcon:sk,Italic:hk,ItalicIcon:hk,IterationCcw:lk,IterationCcwIcon:lk,IterationCw:yk,IterationCwIcon:yk,JapaneseYen:pk,JapaneseYenIcon:pk,Joystick:uk,JoystickIcon:uk,Kanban:kk,KanbanIcon:kk,KanbanSquare:r2,KanbanSquareDashed:Qa,KanbanSquareDashedIcon:Qa,KanbanSquareIcon:r2,Key:nr,KeyIcon:nr,KeyRound:Mk,KeyRoundIcon:Mk,KeySquare:mk,KeySquareIcon:mk,Keyboard:gk,KeyboardIcon:gk,KeyboardMusic:vk,KeyboardMusicIcon:vk,KeyboardOff:fk,KeyboardOffIcon:fk,Lamp:Ik,LampCeiling:xk,LampCeilingIcon:xk,LampDesk:wk,LampDeskIcon:wk,LampFloor:Lk,LampFloorIcon:Lk,LampIcon:Ik,LampWallDown:Ck,LampWallDownIcon:Ck,LampWallUp:bk,LampWallUpIcon:bk,LandPlot:Sk,LandPlotIcon:Sk,Landmark:qk,LandmarkIcon:qk,Languages:Ak,LanguagesIcon:Ak,Laptop:uo,Laptop2:aa,Laptop2Icon:aa,LaptopIcon:uo,LaptopMinimal:aa,LaptopMinimalCheck:jk,LaptopMinimalCheckIcon:jk,LaptopMinimalIcon:aa,Lasso:zk,LassoIcon:zk,LassoSelect:Pk,LassoSelectIcon:Pk,Laugh:Hk,LaughIcon:Hk,Layers:Dk,Layers2:Vk,Layers2Icon:Vk,Layers3:Rk,Layers3Icon:Rk,LayersIcon:Dk,Layout:ma,LayoutDashboard:Tk,LayoutDashboardIcon:Tk,LayoutGrid:Fk,LayoutGridIcon:Fk,LayoutIcon:ma,LayoutList:Bk,LayoutListIcon:Bk,LayoutPanelLeft:Ek,LayoutPanelLeftIcon:Ek,LayoutPanelTop:Ok,LayoutPanelTopIcon:Ok,LayoutTemplate:Uk,LayoutTemplateIcon:Uk,Leaf:Nk,LeafIcon:Nk,LeafyGreen:_k,LeafyGreenIcon:_k,Lectern:Gk,LecternIcon:Gk,LetterText:Zk,LetterTextIcon:Zk,Library:Xk,LibraryBig:Wk,LibraryBigIcon:Wk,LibraryIcon:Xk,LibrarySquare:n2,LibrarySquareIcon:n2,LifeBuoy:Kk,LifeBuoyIcon:Kk,Ligature:$k,LigatureIcon:$k,Lightbulb:Jk,LightbulbIcon:Jk,LightbulbOff:Qk,LightbulbOffIcon:Qk,LineChart:N1,LineChartIcon:N1,Link:t5,Link2:e5,Link2Icon:e5,Link2Off:Yk,Link2OffIcon:Yk,LinkIcon:t5,Linkedin:a5,LinkedinIcon:a5,List:v5,ListCheck:o5,ListCheckIcon:o5,ListChecks:r5,ListChecksIcon:r5,ListCollapse:n5,ListCollapseIcon:n5,ListEnd:c5,ListEndIcon:c5,ListFilter:i5,ListFilterIcon:i5,ListIcon:v5,ListMinus:d5,ListMinusIcon:d5,ListMusic:s5,ListMusicIcon:s5,ListOrdered:h5,ListOrderedIcon:h5,ListPlus:l5,ListPlusIcon:l5,ListRestart:y5,ListRestartIcon:y5,ListStart:p5,ListStartIcon:p5,ListTodo:u5,ListTodoIcon:u5,ListTree:k5,ListTreeIcon:k5,ListVideo:M5,ListVideoIcon:M5,ListX:m5,ListXIcon:m5,Loader:g5,Loader2:Ze,Loader2Icon:Ze,LoaderCircle:Ze,LoaderCircleIcon:Ze,LoaderIcon:g5,LoaderPinwheel:f5,LoaderPinwheelIcon:f5,Locate:L5,LocateFixed:x5,LocateFixedIcon:x5,LocateIcon:L5,LocateOff:w5,LocateOffIcon:w5,Lock:ko,LockIcon:ko,LockKeyhole:C5,LockKeyholeIcon:C5,LockKeyholeOpen:oa,LockKeyholeOpenIcon:oa,LockOpen:r1,LockOpenIcon:r1,LogIn:b5,LogInIcon:b5,LogOut:I5,LogOutIcon:I5,Logs:S5,LogsIcon:S5,Lollipop:q5,LollipopIcon:q5,LucideAArrowDown:rn,LucideAArrowUp:nn,LucideALargeSmall:cn,LucideAccessibility:dn,LucideActivity:sn,LucideActivitySquare:Aa,LucideAirVent:hn,LucideAirplay:ln,LucideAlarmCheck:g1,LucideAlarmClock:pn,LucideAlarmClockCheck:g1,LucideAlarmClockMinus:x1,LucideAlarmClockOff:yn,LucideAlarmClockPlus:w1,LucideAlarmMinus:x1,LucideAlarmPlus:w1,LucideAlarmSmoke:un,LucideAlbum:kn,LucideAlertCircle:K1,LucideAlertOctagon:ca,LucideAlertTriangle:We,LucideAlignCenter:vn,LucideAlignCenterHorizontal:Mn,LucideAlignCenterVertical:mn,LucideAlignEndHorizontal:fn,LucideAlignEndVertical:gn,LucideAlignHorizontalDistributeCenter:xn,LucideAlignHorizontalDistributeEnd:wn,LucideAlignHorizontalDistributeStart:Ln,LucideAlignHorizontalJustifyCenter:Cn,LucideAlignHorizontalJustifyEnd:bn,LucideAlignHorizontalJustifyStart:In,LucideAlignHorizontalSpaceAround:Sn,LucideAlignHorizontalSpaceBetween:qn,LucideAlignJustify:An,LucideAlignLeft:jn,LucideAlignRight:Pn,LucideAlignStartHorizontal:zn,LucideAlignStartVertical:Hn,LucideAlignVerticalDistributeCenter:Vn,LucideAlignVerticalDistributeEnd:Rn,LucideAlignVerticalDistributeStart:Dn,LucideAlignVerticalJustifyCenter:Tn,LucideAlignVerticalJustifyEnd:Fn,LucideAlignVerticalJustifyStart:Bn,LucideAlignVerticalSpaceAround:En,LucideAlignVerticalSpaceBetween:On,LucideAmbulance:Un,LucideAmpersand:Nn,LucideAmpersands:_n,LucideAmphora:Gn,LucideAnchor:Zn,LucideAngry:Wn,LucideAnnoyed:Xn,LucideAntenna:Kn,LucideAnvil:$n,LucideAperture:Qn,LucideAppWindow:Yn,LucideAppWindowMac:Jn,LucideApple:e0,LucideArchive:Do,LucideArchiveRestore:t0,LucideArchiveX:a0,LucideAreaChart:D1,LucideArmchair:o0,LucideArrowBigDown:n0,LucideArrowBigDownDash:r0,LucideArrowBigLeft:i0,LucideArrowBigLeftDash:c0,LucideArrowBigRight:s0,LucideArrowBigRightDash:d0,LucideArrowBigUp:l0,LucideArrowBigUpDash:h0,LucideArrowDown:x0,LucideArrowDown01:y0,LucideArrowDown10:p0,LucideArrowDownAZ:L1,LucideArrowDownAz:L1,LucideArrowDownCircle:$1,LucideArrowDownFromLine:u0,LucideArrowDownLeft:k0,LucideArrowDownLeftFromCircle:J1,LucideArrowDownLeftFromSquare:Va,LucideArrowDownLeftSquare:ja,LucideArrowDownNarrowWide:M0,LucideArrowDownRight:m0,LucideArrowDownRightFromCircle:Y1,LucideArrowDownRightFromSquare:Ra,LucideArrowDownRightSquare:Pa,LucideArrowDownSquare:za,LucideArrowDownToDot:v0,LucideArrowDownToLine:f0,LucideArrowDownUp:g0,LucideArrowDownWideNarrow:C1,LucideArrowDownZA:b1,LucideArrowDownZa:b1,LucideArrowLeft:b0,LucideArrowLeftCircle:Q1,LucideArrowLeftFromLine:w0,LucideArrowLeftRight:L0,LucideArrowLeftSquare:Ha,LucideArrowLeftToLine:C0,LucideArrowRight:A0,LucideArrowRightCircle:at,LucideArrowRightFromLine:I0,LucideArrowRightLeft:S0,LucideArrowRightSquare:Fa,LucideArrowRightToLine:q0,LucideArrowUp:B0,LucideArrowUp01:j0,LucideArrowUp10:P0,LucideArrowUpAZ:I1,LucideArrowUpAz:I1,LucideArrowUpCircle:ot,LucideArrowUpDown:z0,LucideArrowUpFromDot:H0,LucideArrowUpFromLine:V0,LucideArrowUpLeft:R0,LucideArrowUpLeftFromCircle:et,LucideArrowUpLeftFromSquare:Da,LucideArrowUpLeftSquare:Ba,LucideArrowUpNarrowWide:S1,LucideArrowUpRight:D0,LucideArrowUpRightFromCircle:tt,LucideArrowUpRightFromSquare:Ta,LucideArrowUpRightSquare:Ea,LucideArrowUpSquare:Oa,LucideArrowUpToLine:T0,LucideArrowUpWideNarrow:F0,LucideArrowUpZA:q1,LucideArrowUpZa:q1,LucideArrowsUpFromLine:E0,LucideAsterisk:O0,LucideAsteriskSquare:Ua,LucideAtSign:To,LucideAtom:U0,LucideAudioLines:N0,LucideAudioWaveform:_0,LucideAward:G0,LucideAxe:Z0,LucideAxis3D:A1,LucideAxis3d:A1,LucideBaby:W0,LucideBackpack:X0,LucideBadge:hc,LucideBadgeAlert:K0,LucideBadgeCent:$0,LucideBadgeCheck:j1,LucideBadgeDollarSign:Q0,LucideBadgeEuro:J0,LucideBadgeHelp:Y0,LucideBadgeIndianRupee:ec,LucideBadgeInfo:tc,LucideBadgeJapaneseYen:ac,LucideBadgeMinus:oc,LucideBadgePercent:rc,LucideBadgePlus:nc,LucideBadgePoundSterling:cc,LucideBadgeRussianRuble:ic,LucideBadgeSwissFranc:dc,LucideBadgeX:sc,LucideBaggageClaim:lc,LucideBan:yc,LucideBanana:pc,LucideBandage:uc,LucideBanknote:kc,LucideBarChart:_1,LucideBarChart2:G1,LucideBarChart3:U1,LucideBarChart4:O1,LucideBarChartBig:E1,LucideBarChartHorizontal:F1,LucideBarChartHorizontalBig:T1,LucideBarcode:Mc,LucideBaseline:mc,LucideBath:vc,LucideBattery:Cc,LucideBatteryCharging:fc,LucideBatteryFull:gc,LucideBatteryLow:xc,LucideBatteryMedium:wc,LucideBatteryWarning:Lc,LucideBeaker:bc,LucideBean:Sc,LucideBeanOff:Ic,LucideBed:jc,LucideBedDouble:qc,LucideBedSingle:Ac,LucideBeef:Pc,LucideBeer:Hc,LucideBeerOff:zc,LucideBell:Fo,LucideBellDot:Vc,LucideBellElectric:Rc,LucideBellMinus:Dc,LucideBellOff:Tc,LucideBellPlus:Fc,LucideBellRing:Bc,LucideBetweenHorizonalEnd:P1,LucideBetweenHorizonalStart:z1,LucideBetweenHorizontalEnd:P1,LucideBetweenHorizontalStart:z1,LucideBetweenVerticalEnd:Ec,LucideBetweenVerticalStart:Oc,LucideBicepsFlexed:Uc,LucideBike:Nc,LucideBinary:_c,LucideBinoculars:Gc,LucideBiohazard:Zc,LucideBird:Wc,LucideBitcoin:Xc,LucideBlend:Kc,LucideBlinds:$c,LucideBlocks:Qc,LucideBluetooth:ti,LucideBluetoothConnected:Jc,LucideBluetoothOff:Yc,LucideBluetoothSearching:ei,LucideBold:ai,LucideBolt:oi,LucideBomb:ri,LucideBone:ni,LucideBook:no,LucideBookA:ci,LucideBookAudio:ii,LucideBookCheck:di,LucideBookCopy:si,LucideBookDashed:H1,LucideBookDown:hi,LucideBookHeadphones:li,LucideBookHeart:yi,LucideBookImage:pi,LucideBookKey:ui,LucideBookLock:ki,LucideBookMarked:Mi,LucideBookMinus:mi,LucideBookOpen:gi,LucideBookOpenCheck:vi,LucideBookOpenText:fi,LucideBookPlus:xi,LucideBookTemplate:H1,LucideBookText:wi,LucideBookType:Li,LucideBookUp:bi,LucideBookUp2:Ci,LucideBookUser:Ii,LucideBookX:Si,LucideBookmark:Bo,LucideBookmarkCheck:qi,LucideBookmarkMinus:Ai,LucideBookmarkPlus:ji,LucideBookmarkX:Pi,LucideBoomBox:zi,LucideBot:Ri,LucideBotMessageSquare:Hi,LucideBotOff:Vi,LucideBox:Di,LucideBoxSelect:Ya,LucideBoxes:Ti,LucideBraces:V1,LucideBrackets:Fi,LucideBrain:Oi,LucideBrainCircuit:Bi,LucideBrainCog:Ei,LucideBrickWall:Ui,LucideBriefcase:co,LucideBriefcaseBusiness:Ni,LucideBriefcaseConveyorBelt:_i,LucideBriefcaseMedical:Gi,LucideBringToFront:Zi,LucideBrush:Wi,LucideBug:$i,LucideBugOff:Xi,LucideBugPlay:Ki,LucideBuilding:Ji,LucideBuilding2:Qi,LucideBus:ed,LucideBusFront:Yi,LucideCable:ad,LucideCableCar:td,LucideCake:rd,LucideCakeSlice:od,LucideCalculator:nd,LucideCalendar:Eo,LucideCalendar1:cd,LucideCalendarArrowDown:id,LucideCalendarArrowUp:dd,LucideCalendarCheck:hd,LucideCalendarCheck2:sd,LucideCalendarClock:ld,LucideCalendarCog:yd,LucideCalendarDays:pd,LucideCalendarFold:ud,LucideCalendarHeart:kd,LucideCalendarMinus:md,LucideCalendarMinus2:Md,LucideCalendarOff:vd,LucideCalendarPlus:gd,LucideCalendarPlus2:fd,LucideCalendarRange:xd,LucideCalendarSearch:wd,LucideCalendarSync:Ld,LucideCalendarX:bd,LucideCalendarX2:Cd,LucideCamera:Oo,LucideCameraOff:Id,LucideCandlestickChart:B1,LucideCandy:Ad,LucideCandyCane:Sd,LucideCandyOff:qd,LucideCannabis:jd,LucideCaptions:R1,LucideCaptionsOff:Pd,LucideCar:io,LucideCarFront:zd,LucideCarTaxiFront:Hd,LucideCaravan:Vd,LucideCarrot:Rd,LucideCaseLower:Dd,LucideCaseSensitive:Td,LucideCaseUpper:Fd,LucideCassetteTape:Bd,LucideCast:Ed,LucideCastle:Od,LucideCat:Ud,LucideCctv:Nd,LucideChartArea:D1,LucideChartBar:F1,LucideChartBarBig:T1,LucideChartBarDecreasing:_d,LucideChartBarIncreasing:Gd,LucideChartBarStacked:Zd,LucideChartCandlestick:B1,LucideChartColumn:U1,LucideChartColumnBig:E1,LucideChartColumnDecreasing:Wd,LucideChartColumnIncreasing:O1,LucideChartColumnStacked:Xd,LucideChartGantt:Kd,LucideChartLine:N1,LucideChartNetwork:$d,LucideChartNoAxesColumn:G1,LucideChartNoAxesColumnDecreasing:Qd,LucideChartNoAxesColumnIncreasing:_1,LucideChartNoAxesCombined:Jd,LucideChartNoAxesGantt:Z1,LucideChartPie:W1,LucideChartScatter:X1,LucideChartSpline:Yd,LucideCheck:so,LucideCheckCheck:es,LucideCheckCircle:rt,LucideCheckCircle2:nt,LucideCheckSquare:_a,LucideCheckSquare2:Ga,LucideChefHat:ts,LucideCherry:as,LucideChevronDown:os,LucideChevronDownCircle:ct,LucideChevronDownSquare:Za,LucideChevronFirst:rs,LucideChevronLast:ns,LucideChevronLeft:cs,LucideChevronLeftCircle:it,LucideChevronLeftSquare:Wa,LucideChevronRight:Uo,LucideChevronRightCircle:dt,LucideChevronRightSquare:Xa,LucideChevronUp:is,LucideChevronUpCircle:st,LucideChevronUpSquare:Ka,LucideChevronsDown:ss,LucideChevronsDownUp:ds,LucideChevronsLeft:ys,LucideChevronsLeftRight:ls,LucideChevronsLeftRightEllipsis:hs,LucideChevronsRight:us,LucideChevronsRightLeft:ps,LucideChevronsUp:Ms,LucideChevronsUpDown:ks,LucideChrome:ms,LucideChurch:vs,LucideCigarette:gs,LucideCigaretteOff:fs,LucideCircle:ho,LucideCircleAlert:K1,LucideCircleArrowDown:$1,LucideCircleArrowLeft:Q1,LucideCircleArrowOutDownLeft:J1,LucideCircleArrowOutDownRight:Y1,LucideCircleArrowOutUpLeft:et,LucideCircleArrowOutUpRight:tt,LucideCircleArrowRight:at,LucideCircleArrowUp:ot,LucideCircleCheck:nt,LucideCircleCheckBig:rt,LucideCircleChevronDown:ct,LucideCircleChevronLeft:it,LucideCircleChevronRight:dt,LucideCircleChevronUp:st,LucideCircleDashed:xs,LucideCircleDivide:ht,LucideCircleDollarSign:ws,LucideCircleDot:Cs,LucideCircleDotDashed:Ls,LucideCircleEllipsis:bs,LucideCircleEqual:Is,LucideCircleFadingArrowUp:Ss,LucideCircleFadingPlus:qs,LucideCircleGauge:lt,LucideCircleHelp:yt,LucideCircleMinus:pt,LucideCircleOff:As,LucideCircleParking:kt,LucideCircleParkingOff:ut,LucideCirclePause:Mt,LucideCirclePercent:mt,LucideCirclePlay:vt,LucideCirclePlus:ft,LucideCirclePower:gt,LucideCircleSlash:js,LucideCircleSlash2:xt,LucideCircleSlashed:xt,LucideCircleStop:wt,LucideCircleUser:Ct,LucideCircleUserRound:Lt,LucideCircleX:bt,LucideCircuitBoard:Ps,LucideCitrus:zs,LucideClapperboard:Hs,LucideClipboard:Us,LucideClipboardCheck:Vs,LucideClipboardCopy:Rs,LucideClipboardEdit:St,LucideClipboardList:Ds,LucideClipboardMinus:Ts,LucideClipboardPaste:Fs,LucideClipboardPen:St,LucideClipboardPenLine:It,LucideClipboardPlus:Bs,LucideClipboardSignature:It,LucideClipboardType:Es,LucideClipboardX:Os,LucideClock:l1,LucideClock1:Ns,LucideClock10:_s,LucideClock11:Gs,LucideClock12:Zs,LucideClock2:Ws,LucideClock3:Xs,LucideClock4:Ks,LucideClock5:$s,LucideClock6:Qs,LucideClock7:Js,LucideClock8:Ys,LucideClock9:eh,LucideClockAlert:th,LucideClockArrowDown:ah,LucideClockArrowUp:oh,LucideCloud:vh,LucideCloudAlert:rh,LucideCloudCog:nh,LucideCloudDownload:qt,LucideCloudDrizzle:ch,LucideCloudFog:ih,LucideCloudHail:dh,LucideCloudLightning:sh,LucideCloudMoon:lh,LucideCloudMoonRain:hh,LucideCloudOff:yh,LucideCloudRain:uh,LucideCloudRainWind:ph,LucideCloudSnow:kh,LucideCloudSun:mh,LucideCloudSunRain:Mh,LucideCloudUpload:At,LucideCloudy:fh,LucideClover:gh,LucideClub:xh,LucideCode:wh,LucideCode2:jt,LucideCodeSquare:$a,LucideCodeXml:jt,LucideCodepen:Lh,LucideCodesandbox:Ch,LucideCoffee:No,LucideCog:bh,LucideCoins:_o,LucideColumns:Pt,LucideColumns2:Pt,LucideColumns3:zt,LucideColumns4:Ih,LucideCombine:Sh,LucideCommand:qh,LucideCompass:Ah,LucideComponent:jh,LucideComputer:Ph,LucideConciergeBell:zh,LucideCone:Hh,LucideConstruction:Vh,LucideContact:Rh,LucideContact2:Ht,LucideContactRound:Ht,LucideContainer:Dh,LucideContrast:Th,LucideCookie:Fh,LucideCookingPot:Bh,LucideCopy:Go,LucideCopyCheck:Eh,LucideCopyMinus:Oh,LucideCopyPlus:Uh,LucideCopySlash:Nh,LucideCopyX:_h,LucideCopyleft:Gh,LucideCopyright:Zh,LucideCornerDownLeft:Wh,LucideCornerDownRight:Xh,LucideCornerLeftDown:Kh,LucideCornerLeftUp:$h,LucideCornerRightDown:Qh,LucideCornerRightUp:Jh,LucideCornerUpLeft:Yh,LucideCornerUpRight:el,LucideCpu:tl,LucideCreativeCommons:al,LucideCreditCard:ol,LucideCroissant:rl,LucideCrop:nl,LucideCross:cl,LucideCrosshair:il,LucideCrown:lo,LucideCuboid:dl,LucideCupSoda:sl,LucideCurlyBraces:V1,LucideCurrency:hl,LucideCylinder:ll,LucideDam:yl,LucideDatabase:kl,LucideDatabaseBackup:pl,LucideDatabaseZap:ul,LucideDelete:Ml,LucideDessert:ml,LucideDiameter:vl,LucideDiamond:Zo,LucideDiamondMinus:fl,LucideDiamondPercent:Vt,LucideDiamondPlus:gl,LucideDice1:xl,LucideDice2:wl,LucideDice3:Ll,LucideDice4:Cl,LucideDice5:bl,LucideDice6:Il,LucideDices:Sl,LucideDiff:ql,LucideDisc:zl,LucideDisc2:Al,LucideDisc3:jl,LucideDiscAlbum:Pl,LucideDivide:Hl,LucideDivideCircle:ht,LucideDivideSquare:e2,LucideDna:Rl,LucideDnaOff:Vl,LucideDock:Dl,LucideDog:Tl,LucideDollarSign:Wo,LucideDonut:Fl,LucideDoorClosed:Bl,LucideDoorOpen:El,LucideDot:Ol,LucideDotSquare:t2,LucideDownload:Xo,LucideDownloadCloud:qt,LucideDraftingCompass:Ul,LucideDrama:Nl,LucideDribbble:_l,LucideDrill:Gl,LucideDroplet:Zl,LucideDroplets:Wl,LucideDrum:Xl,LucideDrumstick:Kl,LucideDumbbell:$l,LucideEar:Jl,LucideEarOff:Ql,LucideEarth:Rt,LucideEarthLock:Yl,LucideEclipse:ey,LucideEdit:Se,LucideEdit2:n1,LucideEdit3:va,LucideEgg:oy,LucideEggFried:ty,LucideEggOff:ay,LucideEllipsis:Tt,LucideEllipsisVertical:Dt,LucideEqual:Ko,LucideEqualApproximately:ry,LucideEqualNot:ny,LucideEqualSquare:a2,LucideEraser:cy,LucideEthernetPort:iy,LucideEuro:$o,LucideExpand:dy,LucideExternalLink:sy,LucideEye:$2,LucideEyeClosed:hy,LucideEyeOff:K2,LucideFacebook:ly,LucideFactory:yy,LucideFan:py,LucideFastForward:uy,LucideFeather:ky,LucideFence:My,LucideFerrisWheel:my,LucideFigma:vy,LucideFile:kp,LucideFileArchive:fy,LucideFileAudio:xy,LucideFileAudio2:gy,LucideFileAxis3D:Ft,LucideFileAxis3d:Ft,LucideFileBadge:Ly,LucideFileBadge2:wy,LucideFileBarChart:Bt,LucideFileBarChart2:Et,LucideFileBox:Cy,LucideFileChartColumn:Et,LucideFileChartColumnIncreasing:Bt,LucideFileChartLine:Ot,LucideFileChartPie:Ut,LucideFileCheck:Iy,LucideFileCheck2:by,LucideFileClock:Sy,LucideFileCode:Ay,LucideFileCode2:qy,LucideFileCog:Nt,LucideFileCog2:Nt,LucideFileDiff:jy,LucideFileDigit:Py,LucideFileDown:zy,LucideFileEdit:Gt,LucideFileHeart:Hy,LucideFileImage:Vy,LucideFileInput:Ry,LucideFileJson:Ty,LucideFileJson2:Dy,LucideFileKey:By,LucideFileKey2:Fy,LucideFileLineChart:Ot,LucideFileLock:Oy,LucideFileLock2:Ey,LucideFileMinus:Ny,LucideFileMinus2:Uy,LucideFileMusic:_y,LucideFileOutput:Gy,LucideFilePen:Gt,LucideFilePenLine:_t,LucideFilePieChart:Ut,LucideFilePlus:Wy,LucideFilePlus2:Zy,LucideFileQuestion:Xy,LucideFileScan:Ky,LucideFileSearch:Qy,LucideFileSearch2:$y,LucideFileSignature:_t,LucideFileSliders:Jy,LucideFileSpreadsheet:Yy,LucideFileStack:ep,LucideFileSymlink:tp,LucideFileTerminal:ap,LucideFileText:op,LucideFileType:np,LucideFileType2:rp,LucideFileUp:cp,LucideFileUser:ip,LucideFileVideo:sp,LucideFileVideo2:dp,LucideFileVolume:lp,LucideFileVolume2:hp,LucideFileWarning:yp,LucideFileX:up,LucideFileX2:pp,LucideFiles:Mp,LucideFilm:mp,LucideFilter:fp,LucideFilterX:vp,LucideFingerprint:gp,LucideFireExtinguisher:xp,LucideFish:Cp,LucideFishOff:wp,LucideFishSymbol:Lp,LucideFlag:Qo,LucideFlagOff:bp,LucideFlagTriangleLeft:Ip,LucideFlagTriangleRight:Sp,LucideFlame:Ap,LucideFlameKindling:qp,LucideFlashlight:Pp,LucideFlashlightOff:jp,LucideFlaskConical:Hp,LucideFlaskConicalOff:zp,LucideFlaskRound:Vp,LucideFlipHorizontal:Dp,LucideFlipHorizontal2:Rp,LucideFlipVertical:Fp,LucideFlipVertical2:Tp,LucideFlower:Ep,LucideFlower2:Bp,LucideFocus:Op,LucideFoldHorizontal:Up,LucideFoldVertical:Np,LucideFolder:y1,LucideFolderArchive:_p,LucideFolderCheck:Gp,LucideFolderClock:Zp,LucideFolderClosed:Wp,LucideFolderCode:Xp,LucideFolderCog:Zt,LucideFolderCog2:Zt,LucideFolderDot:Kp,LucideFolderDown:$p,LucideFolderEdit:Wt,LucideFolderGit:Jp,LucideFolderGit2:Qp,LucideFolderHeart:Yp,LucideFolderInput:eu,LucideFolderKanban:tu,LucideFolderKey:au,LucideFolderLock:ou,LucideFolderMinus:ru,LucideFolderOpen:cu,LucideFolderOpenDot:nu,LucideFolderOutput:iu,LucideFolderPen:Wt,LucideFolderPlus:du,LucideFolderRoot:su,LucideFolderSearch:lu,LucideFolderSearch2:hu,LucideFolderSymlink:yu,LucideFolderSync:pu,LucideFolderTree:uu,LucideFolderUp:ku,LucideFolderX:Mu,LucideFolders:mu,LucideFootprints:vu,LucideForkKnife:Xe,LucideForkKnifeCrossed:E2,LucideForklift:fu,LucideFormInput:ga,LucideForward:gu,LucideFrame:xu,LucideFramer:wu,LucideFrown:Lu,LucideFuel:Jo,LucideFullscreen:Cu,LucideFunctionSquare:o2,LucideGalleryHorizontal:Iu,LucideGalleryHorizontalEnd:bu,LucideGalleryThumbnails:Su,LucideGalleryVertical:Au,LucideGalleryVerticalEnd:qu,LucideGamepad:yo,LucideGamepad2:ju,LucideGanttChart:Z1,LucideGanttChartSquare:Be,LucideGauge:Pu,LucideGaugeCircle:lt,LucideGavel:zu,LucideGem:Hu,LucideGhost:Vu,LucideGift:Yo,LucideGitBranch:Du,LucideGitBranchPlus:Ru,LucideGitCommit:Xt,LucideGitCommitHorizontal:Xt,LucideGitCommitVertical:Tu,LucideGitCompare:Bu,LucideGitCompareArrows:Fu,LucideGitFork:Eu,LucideGitGraph:Ou,LucideGitMerge:Uu,LucideGitPullRequest:Xu,LucideGitPullRequestArrow:Nu,LucideGitPullRequestClosed:_u,LucideGitPullRequestCreate:Zu,LucideGitPullRequestCreateArrow:Gu,LucideGitPullRequestDraft:Wu,LucideGithub:Ku,LucideGitlab:$u,LucideGlassWater:Qu,LucideGlasses:Ju,LucideGlobe:er,LucideGlobe2:Rt,LucideGlobeLock:Yu,LucideGoal:e4,LucideGrab:t4,LucideGraduationCap:tr,LucideGrape:a4,LucideGrid:Fe,LucideGrid2X2:$t,LucideGrid2X2Plus:Kt,LucideGrid2x2:$t,LucideGrid2x2Check:o4,LucideGrid2x2Plus:Kt,LucideGrid2x2X:r4,LucideGrid3X3:Fe,LucideGrid3x3:Fe,LucideGrip:i4,LucideGripHorizontal:n4,LucideGripVertical:c4,LucideGroup:d4,LucideGuitar:s4,LucideHam:h4,LucideHammer:ar,LucideHand:k4,LucideHandCoins:l4,LucideHandHeart:y4,LucideHandHelping:Qt,LucideHandMetal:p4,LucideHandPlatter:u4,LucideHandshake:M4,LucideHardDrive:f4,LucideHardDriveDownload:m4,LucideHardDriveUpload:v4,LucideHardHat:g4,LucideHash:or,LucideHaze:x4,LucideHdmiPort:w4,LucideHeading:A4,LucideHeading1:L4,LucideHeading2:C4,LucideHeading3:b4,LucideHeading4:I4,LucideHeading5:S4,LucideHeading6:q4,LucideHeadphoneOff:j4,LucideHeadphones:P4,LucideHeadset:z4,LucideHeart:po,LucideHeartCrack:H4,LucideHeartHandshake:V4,LucideHeartOff:R4,LucideHeartPulse:D4,LucideHeater:T4,LucideHelpCircle:yt,LucideHelpingHand:Qt,LucideHexagon:rr,LucideHighlighter:F4,LucideHistory:B4,LucideHome:Ne,LucideHop:O4,LucideHopOff:E4,LucideHospital:U4,LucideHotel:N4,LucideHourglass:_4,LucideHouse:Ne,LucideHousePlug:G4,LucideHousePlus:Z4,LucideIceCream:Yt,LucideIceCream2:Jt,LucideIceCreamBowl:Jt,LucideIceCreamCone:Yt,LucideIdCard:W4,LucideImage:tk,LucideImageDown:X4,LucideImageMinus:K4,LucideImageOff:$4,LucideImagePlay:Q4,LucideImagePlus:J4,LucideImageUp:Y4,LucideImageUpscale:ek,LucideImages:ak,LucideImport:ok,LucideInbox:rk,LucideIndent:ta,LucideIndentDecrease:ea,LucideIndentIncrease:ta,LucideIndianRupee:nk,LucideInfinity:ck,LucideInfo:ik,LucideInspect:s2,LucideInspectionPanel:dk,LucideInstagram:sk,LucideItalic:hk,LucideIterationCcw:lk,LucideIterationCw:yk,LucideJapaneseYen:pk,LucideJoystick:uk,LucideKanban:kk,LucideKanbanSquare:r2,LucideKanbanSquareDashed:Qa,LucideKey:nr,LucideKeyRound:Mk,LucideKeySquare:mk,LucideKeyboard:gk,LucideKeyboardMusic:vk,LucideKeyboardOff:fk,LucideLamp:Ik,LucideLampCeiling:xk,LucideLampDesk:wk,LucideLampFloor:Lk,LucideLampWallDown:Ck,LucideLampWallUp:bk,LucideLandPlot:Sk,LucideLandmark:qk,LucideLanguages:Ak,LucideLaptop:uo,LucideLaptop2:aa,LucideLaptopMinimal:aa,LucideLaptopMinimalCheck:jk,LucideLasso:zk,LucideLassoSelect:Pk,LucideLaugh:Hk,LucideLayers:Dk,LucideLayers2:Vk,LucideLayers3:Rk,LucideLayout:ma,LucideLayoutDashboard:Tk,LucideLayoutGrid:Fk,LucideLayoutList:Bk,LucideLayoutPanelLeft:Ek,LucideLayoutPanelTop:Ok,LucideLayoutTemplate:Uk,LucideLeaf:Nk,LucideLeafyGreen:_k,LucideLectern:Gk,LucideLetterText:Zk,LucideLibrary:Xk,LucideLibraryBig:Wk,LucideLibrarySquare:n2,LucideLifeBuoy:Kk,LucideLigature:$k,LucideLightbulb:Jk,LucideLightbulbOff:Qk,LucideLineChart:N1,LucideLink:t5,LucideLink2:e5,LucideLink2Off:Yk,LucideLinkedin:a5,LucideList:v5,LucideListCheck:o5,LucideListChecks:r5,LucideListCollapse:n5,LucideListEnd:c5,LucideListFilter:i5,LucideListMinus:d5,LucideListMusic:s5,LucideListOrdered:h5,LucideListPlus:l5,LucideListRestart:y5,LucideListStart:p5,LucideListTodo:u5,LucideListTree:k5,LucideListVideo:M5,LucideListX:m5,LucideLoader:g5,LucideLoader2:Ze,LucideLoaderCircle:Ze,LucideLoaderPinwheel:f5,LucideLocate:L5,LucideLocateFixed:x5,LucideLocateOff:w5,LucideLock:ko,LucideLockKeyhole:C5,LucideLockKeyholeOpen:oa,LucideLockOpen:r1,LucideLogIn:b5,LucideLogOut:I5,LucideLogs:S5,LucideLollipop:q5,LucideLuggage:A5,LucideMSquare:c2,LucideMagnet:j5,LucideMail:cr,LucideMailCheck:P5,LucideMailMinus:z5,LucideMailOpen:H5,LucideMailPlus:V5,LucideMailQuestion:R5,LucideMailSearch:D5,LucideMailWarning:T5,LucideMailX:F5,LucideMailbox:B5,LucideMails:E5,LucideMap:J5,LucideMapPin:ir,LucideMapPinCheck:U5,LucideMapPinCheckInside:O5,LucideMapPinHouse:N5,LucideMapPinMinus:G5,LucideMapPinMinusInside:_5,LucideMapPinOff:Z5,LucideMapPinPlus:X5,LucideMapPinPlusInside:W5,LucideMapPinX:$5,LucideMapPinXInside:K5,LucideMapPinned:Q5,LucideMartini:Y5,LucideMaximize:t3,LucideMaximize2:e3,LucideMedal:a3,LucideMegaphone:r3,LucideMegaphoneOff:o3,LucideMeh:n3,LucideMemoryStick:c3,LucideMenu:i3,LucideMenuSquare:i2,LucideMerge:d3,LucideMessageCircle:dr,LucideMessageCircleCode:s3,LucideMessageCircleDashed:h3,LucideMessageCircleHeart:l3,LucideMessageCircleMore:y3,LucideMessageCircleOff:p3,LucideMessageCirclePlus:u3,LucideMessageCircleQuestion:k3,LucideMessageCircleReply:M3,LucideMessageCircleWarning:m3,LucideMessageCircleX:v3,LucideMessageSquare:V3,LucideMessageSquareCode:f3,LucideMessageSquareDashed:g3,LucideMessageSquareDiff:x3,LucideMessageSquareDot:w3,LucideMessageSquareHeart:L3,LucideMessageSquareLock:C3,LucideMessageSquareMore:b3,LucideMessageSquareOff:I3,LucideMessageSquarePlus:S3,LucideMessageSquareQuote:q3,LucideMessageSquareReply:A3,LucideMessageSquareShare:j3,LucideMessageSquareText:P3,LucideMessageSquareWarning:z3,LucideMessageSquareX:H3,LucideMessagesSquare:R3,LucideMic:T3,LucideMic2:ra,LucideMicOff:D3,LucideMicVocal:ra,LucideMicrochip:F3,LucideMicroscope:B3,LucideMicrowave:E3,LucideMilestone:O3,LucideMilk:N3,LucideMilkOff:U3,LucideMinimize:G3,LucideMinimize2:_3,LucideMinus:sr,LucideMinusCircle:pt,LucideMinusSquare:d2,LucideMonitor:r6,LucideMonitorCheck:Z3,LucideMonitorCog:W3,LucideMonitorDot:X3,LucideMonitorDown:K3,LucideMonitorOff:$3,LucideMonitorPause:Q3,LucideMonitorPlay:J3,LucideMonitorSmartphone:Y3,LucideMonitorSpeaker:e6,LucideMonitorStop:t6,LucideMonitorUp:a6,LucideMonitorX:o6,LucideMoon:hr,LucideMoonStar:n6,LucideMoreHorizontal:Tt,LucideMoreVertical:Dt,LucideMountain:i6,LucideMountainSnow:c6,LucideMouse:p6,LucideMouseOff:d6,LucideMousePointer:y6,LucideMousePointer2:s6,LucideMousePointerBan:h6,LucideMousePointerClick:l6,LucideMousePointerSquareDashed:Ja,LucideMove:I6,LucideMove3D:na,LucideMove3d:na,LucideMoveDiagonal:k6,LucideMoveDiagonal2:u6,LucideMoveDown:v6,LucideMoveDownLeft:M6,LucideMoveDownRight:m6,LucideMoveHorizontal:f6,LucideMoveLeft:g6,LucideMoveRight:x6,LucideMoveUp:C6,LucideMoveUpLeft:w6,LucideMoveUpRight:L6,LucideMoveVertical:b6,LucideMusic:lr,LucideMusic2:S6,LucideMusic3:q6,LucideMusic4:A6,LucideNavigation:H6,LucideNavigation2:P6,LucideNavigation2Off:j6,LucideNavigationOff:z6,LucideNetwork:V6,LucideNewspaper:R6,LucideNfc:D6,LucideNotebook:E6,LucideNotebookPen:T6,LucideNotebookTabs:F6,LucideNotebookText:B6,LucideNotepadText:U6,LucideNotepadTextDashed:O6,LucideNut:_6,LucideNutOff:N6,LucideOctagon:Z6,LucideOctagonAlert:ca,LucideOctagonMinus:G6,LucideOctagonPause:ia,LucideOctagonX:da,LucideOmega:W6,LucideOption:X6,LucideOrbit:K6,LucideOrigami:$6,LucideOutdent:ea,LucidePackage:r8,LucidePackage2:Q6,LucidePackageCheck:J6,LucidePackageMinus:Y6,LucidePackageOpen:e8,LucidePackagePlus:t8,LucidePackageSearch:a8,LucidePackageX:o8,LucidePaintBucket:n8,LucidePaintRoller:c8,LucidePaintbrush:i8,LucidePaintbrush2:sa,LucidePaintbrushVertical:sa,LucidePalette:d8,LucidePalmtree:j2,LucidePanelBottom:l8,LucidePanelBottomClose:s8,LucidePanelBottomDashed:ha,LucidePanelBottomInactive:ha,LucidePanelBottomOpen:h8,LucidePanelLeft:ua,LucidePanelLeftClose:la,LucidePanelLeftDashed:ya,LucidePanelLeftInactive:ya,LucidePanelLeftOpen:pa,LucidePanelRight:u8,LucidePanelRightClose:y8,LucidePanelRightDashed:ka,LucidePanelRightInactive:ka,LucidePanelRightOpen:p8,LucidePanelTop:m8,LucidePanelTopClose:k8,LucidePanelTopDashed:Ma,LucidePanelTopInactive:Ma,LucidePanelTopOpen:M8,LucidePanelsLeftBottom:v8,LucidePanelsLeftRight:zt,LucidePanelsRightBottom:f8,LucidePanelsTopBottom:La,LucidePanelsTopLeft:ma,LucidePaperclip:yr,LucideParentheses:g8,LucideParkingCircle:kt,LucideParkingCircleOff:ut,LucideParkingMeter:x8,LucideParkingSquare:l2,LucideParkingSquareOff:h2,LucidePartyPopper:w8,LucidePause:L8,LucidePauseCircle:Mt,LucidePauseOctagon:ia,LucidePawPrint:C8,LucidePcCase:b8,LucidePen:n1,LucidePenBox:Se,LucidePenLine:va,LucidePenOff:I8,LucidePenSquare:Se,LucidePenTool:S8,LucidePencil:P8,LucidePencilLine:q8,LucidePencilOff:A8,LucidePencilRuler:j8,LucidePentagon:z8,LucidePercent:pr,LucidePercentCircle:mt,LucidePercentDiamond:Vt,LucidePercentSquare:y2,LucidePersonStanding:H8,LucidePhilippinePeso:V8,LucidePhone:ur,LucidePhoneCall:R8,LucidePhoneForwarded:D8,LucidePhoneIncoming:T8,LucidePhoneMissed:F8,LucidePhoneOff:B8,LucidePhoneOutgoing:E8,LucidePi:O8,LucidePiSquare:p2,LucidePiano:U8,LucidePickaxe:N8,LucidePictureInPicture:G8,LucidePictureInPicture2:_8,LucidePieChart:W1,LucidePiggyBank:kr,LucidePilcrow:X8,LucidePilcrowLeft:Z8,LucidePilcrowRight:W8,LucidePilcrowSquare:u2,LucidePill:$8,LucidePillBottle:K8,LucidePin:J8,LucidePinOff:Q8,LucidePipette:Y8,LucidePizza:Mr,LucidePlane:mr,LucidePlaneLanding:e7,LucidePlaneTakeoff:t7,LucidePlay:a7,LucidePlayCircle:vt,LucidePlaySquare:k2,LucidePlug:r7,LucidePlug2:o7,LucidePlugZap:fa,LucidePlugZap2:fa,LucidePlus:vr,LucidePlusCircle:ft,LucidePlusSquare:M2,LucidePocket:c7,LucidePocketKnife:n7,LucidePodcast:i7,LucidePointer:s7,LucidePointerOff:d7,LucidePopcorn:h7,LucidePopsicle:l7,LucidePoundSterling:y7,LucidePower:u7,LucidePowerCircle:gt,LucidePowerOff:p7,LucidePowerSquare:m2,LucidePresentation:k7,LucidePrinter:m7,LucidePrinterCheck:M7,LucideProjector:v7,LucideProportions:f7,LucidePuzzle:g7,LucidePyramid:x7,LucideQrCode:w7,LucideQuote:L7,LucideRabbit:C7,LucideRadar:b7,LucideRadiation:I7,LucideRadical:S7,LucideRadio:j7,LucideRadioReceiver:q7,LucideRadioTower:A7,LucideRadius:P7,LucideRailSymbol:z7,LucideRainbow:H7,LucideRat:V7,LucideRatio:R7,LucideReceipt:_7,LucideReceiptCent:D7,LucideReceiptEuro:T7,LucideReceiptIndianRupee:F7,LucideReceiptJapaneseYen:B7,LucideReceiptPoundSterling:E7,LucideReceiptRussianRuble:O7,LucideReceiptSwissFranc:U7,LucideReceiptText:N7,LucideRectangleEllipsis:ga,LucideRectangleHorizontal:G7,LucideRectangleVertical:Z7,LucideRecycle:W7,LucideRedo:$7,LucideRedo2:X7,LucideRedoDot:K7,LucideRefreshCcw:J7,LucideRefreshCcwDot:Q7,LucideRefreshCw:fr,LucideRefreshCwOff:Y7,LucideRefrigerator:eM,LucideRegex:tM,LucideRemoveFormatting:aM,LucideRepeat:nM,LucideRepeat1:oM,LucideRepeat2:rM,LucideReplace:iM,LucideReplaceAll:cM,LucideReply:sM,LucideReplyAll:dM,LucideRewind:hM,LucideRibbon:lM,LucideRocket:yM,LucideRockingChair:pM,LucideRollerCoaster:uM,LucideRotate3D:xa,LucideRotate3d:xa,LucideRotateCcw:MM,LucideRotateCcwSquare:kM,LucideRotateCw:vM,LucideRotateCwSquare:mM,LucideRoute:gM,LucideRouteOff:fM,LucideRouter:xM,LucideRows:wa,LucideRows2:wa,LucideRows3:La,LucideRows4:wM,LucideRss:LM,LucideRuler:CM,LucideRussianRuble:bM,LucideSailboat:IM,LucideSalad:SM,LucideSandwich:qM,LucideSatellite:jM,LucideSatelliteDish:AM,LucideSave:HM,LucideSaveAll:PM,LucideSaveOff:zM,LucideScale:VM,LucideScale3D:Ca,LucideScale3d:Ca,LucideScaling:RM,LucideScan:NM,LucideScanBarcode:DM,LucideScanEye:TM,LucideScanFace:FM,LucideScanLine:BM,LucideScanQrCode:EM,LucideScanSearch:OM,LucideScanText:UM,LucideScatterChart:X1,LucideSchool:_M,LucideSchool2:z2,LucideScissors:gr,LucideScissorsLineDashed:GM,LucideScissorsSquare:v2,LucideScissorsSquareDashedBottom:Na,LucideScreenShare:WM,LucideScreenShareOff:ZM,LucideScroll:KM,LucideScrollText:XM,LucideSearch:em,LucideSearchCheck:$M,LucideSearchCode:QM,LucideSearchSlash:JM,LucideSearchX:YM,LucideSection:tm,LucideSend:om,LucideSendHorizonal:ba,LucideSendHorizontal:ba,LucideSendToBack:am,LucideSeparatorHorizontal:rm,LucideSeparatorVertical:nm,LucideServer:sm,LucideServerCog:cm,LucideServerCrash:im,LucideServerOff:dm,LucideSettings:xr,LucideSettings2:hm,LucideShapes:lm,LucideShare:wr,LucideShare2:ym,LucideSheet:pm,LucideShell:um,LucideShield:Lr,LucideShieldAlert:km,LucideShieldBan:Mm,LucideShieldCheck:mm,LucideShieldClose:Ia,LucideShieldEllipsis:vm,LucideShieldHalf:fm,LucideShieldMinus:gm,LucideShieldOff:xm,LucideShieldPlus:wm,LucideShieldQuestion:Lm,LucideShieldX:Ia,LucideShip:bm,LucideShipWheel:Cm,LucideShirt:Cr,LucideShoppingBag:Im,LucideShoppingBasket:Sm,LucideShoppingCart:br,LucideShovel:qm,LucideShowerHead:Am,LucideShrink:jm,LucideShrub:Pm,LucideShuffle:zm,LucideSidebar:ua,LucideSidebarClose:la,LucideSidebarOpen:pa,LucideSigma:Hm,LucideSigmaSquare:f2,LucideSignal:Fm,LucideSignalHigh:Vm,LucideSignalLow:Rm,LucideSignalMedium:Dm,LucideSignalZero:Tm,LucideSignature:Bm,LucideSignpost:Om,LucideSignpostBig:Em,LucideSiren:Um,LucideSkipBack:Nm,LucideSkipForward:_m,LucideSkull:Gm,LucideSlack:Zm,LucideSlash:Wm,LucideSlashSquare:g2,LucideSlice:Xm,LucideSliders:Sa,LucideSlidersHorizontal:Km,LucideSlidersVertical:Sa,LucideSmartphone:Mo,LucideSmartphoneCharging:$m,LucideSmartphoneNfc:Qm,LucideSmile:Ym,LucideSmilePlus:Jm,LucideSnail:e9,LucideSnowflake:t9,LucideSofa:a9,LucideSortAsc:S1,LucideSortDesc:C1,LucideSoup:o9,LucideSpace:r9,LucideSpade:n9,LucideSparkle:c9,LucideSparkles:qa,LucideSpeaker:i9,LucideSpeech:d9,LucideSpellCheck:h9,LucideSpellCheck2:s9,LucideSpline:l9,LucideSplit:y9,LucideSplitSquareHorizontal:x2,LucideSplitSquareVertical:w2,LucideSprayCan:p9,LucideSprout:u9,LucideSquare:Ir,LucideSquareActivity:Aa,LucideSquareArrowDown:za,LucideSquareArrowDownLeft:ja,LucideSquareArrowDownRight:Pa,LucideSquareArrowLeft:Ha,LucideSquareArrowOutDownLeft:Va,LucideSquareArrowOutDownRight:Ra,LucideSquareArrowOutUpLeft:Da,LucideSquareArrowOutUpRight:Ta,LucideSquareArrowRight:Fa,LucideSquareArrowUp:Oa,LucideSquareArrowUpLeft:Ba,LucideSquareArrowUpRight:Ea,LucideSquareAsterisk:Ua,LucideSquareBottomDashedScissors:Na,LucideSquareChartGantt:Be,LucideSquareCheck:Ga,LucideSquareCheckBig:_a,LucideSquareChevronDown:Za,LucideSquareChevronLeft:Wa,LucideSquareChevronRight:Xa,LucideSquareChevronUp:Ka,LucideSquareCode:$a,LucideSquareDashed:Ya,LucideSquareDashedBottom:M9,LucideSquareDashedBottomCode:k9,LucideSquareDashedKanban:Qa,LucideSquareDashedMousePointer:Ja,LucideSquareDivide:e2,LucideSquareDot:t2,LucideSquareEqual:a2,LucideSquareFunction:o2,LucideSquareGanttChart:Be,LucideSquareKanban:r2,LucideSquareLibrary:n2,LucideSquareM:c2,LucideSquareMenu:i2,LucideSquareMinus:d2,LucideSquareMousePointer:s2,LucideSquareParking:l2,LucideSquareParkingOff:h2,LucideSquarePen:Se,LucideSquarePercent:y2,LucideSquarePi:p2,LucideSquarePilcrow:u2,LucideSquarePlay:k2,LucideSquarePlus:M2,LucideSquarePower:m2,LucideSquareRadical:m9,LucideSquareScissors:v2,LucideSquareSigma:f2,LucideSquareSlash:g2,LucideSquareSplitHorizontal:x2,LucideSquareSplitVertical:w2,LucideSquareSquare:v9,LucideSquareStack:f9,LucideSquareTerminal:L2,LucideSquareUser:b2,LucideSquareUserRound:C2,LucideSquareX:I2,LucideSquircle:g9,LucideSquirrel:x9,LucideStamp:w9,LucideStar:Sr,LucideStarHalf:L9,LucideStarOff:C9,LucideStars:qa,LucideStepBack:b9,LucideStepForward:I9,LucideStethoscope:S9,LucideSticker:q9,LucideStickyNote:A9,LucideStopCircle:wt,LucideStore:j9,LucideStretchHorizontal:P9,LucideStretchVertical:z9,LucideStrikethrough:H9,LucideSubscript:V9,LucideSubtitles:R1,LucideSun:qr,LucideSunDim:R9,LucideSunMedium:D9,LucideSunMoon:T9,LucideSunSnow:F9,LucideSunrise:B9,LucideSunset:E9,LucideSuperscript:O9,LucideSwatchBook:U9,LucideSwissFranc:N9,LucideSwitchCamera:_9,LucideSword:G9,LucideSwords:Z9,LucideSyringe:W9,LucideTable:tv,LucideTable2:X9,LucideTableCellsMerge:K9,LucideTableCellsSplit:$9,LucideTableColumnsSplit:Q9,LucideTableOfContents:J9,LucideTableProperties:Y9,LucideTableRowsSplit:ev,LucideTablet:ov,LucideTabletSmartphone:av,LucideTablets:rv,LucideTag:Ar,LucideTags:nv,LucideTally1:cv,LucideTally2:iv,LucideTally3:dv,LucideTally4:sv,LucideTally5:hv,LucideTangent:lv,LucideTarget:yv,LucideTelescope:pv,LucideTent:kv,LucideTentTree:uv,LucideTerminal:Mv,LucideTerminalSquare:L2,LucideTestTube:mv,LucideTestTube2:S2,LucideTestTubeDiagonal:S2,LucideTestTubes:vv,LucideText:Lv,LucideTextCursor:gv,LucideTextCursorInput:fv,LucideTextQuote:xv,LucideTextSearch:wv,LucideTextSelect:q2,LucideTextSelection:q2,LucideTheater:Cv,LucideThermometer:Sv,LucideThermometerSnowflake:bv,LucideThermometerSun:Iv,LucideThumbsDown:qv,LucideThumbsUp:Av,LucideTicket:Dv,LucideTicketCheck:jv,LucideTicketMinus:Pv,LucideTicketPercent:zv,LucideTicketPlus:Hv,LucideTicketSlash:Vv,LucideTicketX:Rv,LucideTickets:Fv,LucideTicketsPlane:Tv,LucideTimer:Ov,LucideTimerOff:Bv,LucideTimerReset:Ev,LucideToggleLeft:Uv,LucideToggleRight:Nv,LucideToilet:_v,LucideTornado:Gv,LucideTorus:Zv,LucideTouchpad:Xv,LucideTouchpadOff:Wv,LucideTowerControl:Kv,LucideToyBrick:$v,LucideTractor:Qv,LucideTrafficCone:Jv,LucideTrain:A2,LucideTrainFront:ef,LucideTrainFrontTunnel:Yv,LucideTrainTrack:tf,LucideTramFront:A2,LucideTrash:of,LucideTrash2:af,LucideTreeDeciduous:rf,LucideTreePalm:j2,LucideTreePine:nf,LucideTrees:cf,LucideTrello:df,LucideTrendingDown:sf,LucideTrendingUp:mo,LucideTrendingUpDown:hf,LucideTriangle:jr,LucideTriangleAlert:We,LucideTriangleRight:lf,LucideTrophy:yf,LucideTruck:pf,LucideTurtle:uf,LucideTv:Mf,LucideTv2:P2,LucideTvMinimal:P2,LucideTvMinimalPlay:kf,LucideTwitch:mf,LucideTwitter:vf,LucideType:gf,LucideTypeOutline:ff,LucideUmbrella:wf,LucideUmbrellaOff:xf,LucideUnderline:Lf,LucideUndo:If,LucideUndo2:Cf,LucideUndoDot:bf,LucideUnfoldHorizontal:Sf,LucideUnfoldVertical:qf,LucideUngroup:Af,LucideUniversity:z2,LucideUnlink:Pf,LucideUnlink2:jf,LucideUnlock:r1,LucideUnlockKeyhole:oa,LucideUnplug:zf,LucideUpload:Pr,LucideUploadCloud:At,LucideUsb:Hf,LucideUser:zr,LucideUser2:F2,LucideUserCheck:Vf,LucideUserCheck2:H2,LucideUserCircle:Ct,LucideUserCircle2:Lt,LucideUserCog:Rf,LucideUserCog2:V2,LucideUserMinus:Df,LucideUserMinus2:R2,LucideUserPen:Tf,LucideUserPlus:Ff,LucideUserPlus2:D2,LucideUserRound:F2,LucideUserRoundCheck:H2,LucideUserRoundCog:V2,LucideUserRoundMinus:R2,LucideUserRoundPen:Bf,LucideUserRoundPlus:D2,LucideUserRoundSearch:Ef,LucideUserRoundX:T2,LucideUserSearch:Of,LucideUserSquare:b2,LucideUserSquare2:C2,LucideUserX:Uf,LucideUserX2:T2,LucideUsers:Hr,LucideUsers2:B2,LucideUsersRound:B2,LucideUtensils:Xe,LucideUtensilsCrossed:E2,LucideUtilityPole:Nf,LucideVariable:_f,LucideVault:Gf,LucideVegan:Zf,LucideVenetianMask:Wf,LucideVerified:j1,LucideVibrate:Kf,LucideVibrateOff:Xf,LucideVideo:Vr,LucideVideoOff:$f,LucideVideotape:Qf,LucideView:Jf,LucideVoicemail:Yf,LucideVolleyball:eg,LucideVolume:ng,LucideVolume1:tg,LucideVolume2:ag,LucideVolumeOff:og,LucideVolumeX:rg,LucideVote:cg,LucideWallet:dg,LucideWallet2:O2,LucideWalletCards:ig,LucideWalletMinimal:O2,LucideWallpaper:sg,LucideWand:hg,LucideWand2:U2,LucideWandSparkles:U2,LucideWarehouse:lg,LucideWashingMachine:yg,LucideWatch:pg,LucideWaves:ug,LucideWaypoints:kg,LucideWebcam:Mg,LucideWebhook:vg,LucideWebhookOff:mg,LucideWeight:fg,LucideWheat:xg,LucideWheatOff:gg,LucideWholeWord:wg,LucideWifi:Rr,LucideWifiHigh:Lg,LucideWifiLow:Cg,LucideWifiOff:bg,LucideWifiZero:Ig,LucideWind:qg,LucideWindArrowDown:Sg,LucideWine:jg,LucideWineOff:Ag,LucideWorkflow:Pg,LucideWorm:zg,LucideWrapText:Hg,LucideWrench:Dr,LucideX:Q2,LucideXCircle:bt,LucideXOctagon:da,LucideXSquare:I2,LucideYoutube:Vg,LucideZap:Tr,LucideZapOff:Rg,LucideZoomIn:Dg,LucideZoomOut:Tg,Luggage:A5,LuggageIcon:A5,MSquare:c2,MSquareIcon:c2,Magnet:j5,MagnetIcon:j5,Mail:cr,MailCheck:P5,MailCheckIcon:P5,MailIcon:cr,MailMinus:z5,MailMinusIcon:z5,MailOpen:H5,MailOpenIcon:H5,MailPlus:V5,MailPlusIcon:V5,MailQuestion:R5,MailQuestionIcon:R5,MailSearch:D5,MailSearchIcon:D5,MailWarning:T5,MailWarningIcon:T5,MailX:F5,MailXIcon:F5,Mailbox:B5,MailboxIcon:B5,Mails:E5,MailsIcon:E5,Map:J5,MapIcon:J5,MapPin:ir,MapPinCheck:U5,MapPinCheckIcon:U5,MapPinCheckInside:O5,MapPinCheckInsideIcon:O5,MapPinHouse:N5,MapPinHouseIcon:N5,MapPinIcon:ir,MapPinMinus:G5,MapPinMinusIcon:G5,MapPinMinusInside:_5,MapPinMinusInsideIcon:_5,MapPinOff:Z5,MapPinOffIcon:Z5,MapPinPlus:X5,MapPinPlusIcon:X5,MapPinPlusInside:W5,MapPinPlusInsideIcon:W5,MapPinX:$5,MapPinXIcon:$5,MapPinXInside:K5,MapPinXInsideIcon:K5,MapPinned:Q5,MapPinnedIcon:Q5,Martini:Y5,MartiniIcon:Y5,Maximize:t3,Maximize2:e3,Maximize2Icon:e3,MaximizeIcon:t3,Medal:a3,MedalIcon:a3,Megaphone:r3,MegaphoneIcon:r3,MegaphoneOff:o3,MegaphoneOffIcon:o3,Meh:n3,MehIcon:n3,MemoryStick:c3,MemoryStickIcon:c3,Menu:i3,MenuIcon:i3,MenuSquare:i2,MenuSquareIcon:i2,Merge:d3,MergeIcon:d3,MessageCircle:dr,MessageCircleCode:s3,MessageCircleCodeIcon:s3,MessageCircleDashed:h3,MessageCircleDashedIcon:h3,MessageCircleHeart:l3,MessageCircleHeartIcon:l3,MessageCircleIcon:dr,MessageCircleMore:y3,MessageCircleMoreIcon:y3,MessageCircleOff:p3,MessageCircleOffIcon:p3,MessageCirclePlus:u3,MessageCirclePlusIcon:u3,MessageCircleQuestion:k3,MessageCircleQuestionIcon:k3,MessageCircleReply:M3,MessageCircleReplyIcon:M3,MessageCircleWarning:m3,MessageCircleWarningIcon:m3,MessageCircleX:v3,MessageCircleXIcon:v3,MessageSquare:V3,MessageSquareCode:f3,MessageSquareCodeIcon:f3,MessageSquareDashed:g3,MessageSquareDashedIcon:g3,MessageSquareDiff:x3,MessageSquareDiffIcon:x3,MessageSquareDot:w3,MessageSquareDotIcon:w3,MessageSquareHeart:L3,MessageSquareHeartIcon:L3,MessageSquareIcon:V3,MessageSquareLock:C3,MessageSquareLockIcon:C3,MessageSquareMore:b3,MessageSquareMoreIcon:b3,MessageSquareOff:I3,MessageSquareOffIcon:I3,MessageSquarePlus:S3,MessageSquarePlusIcon:S3,MessageSquareQuote:q3,MessageSquareQuoteIcon:q3,MessageSquareReply:A3,MessageSquareReplyIcon:A3,MessageSquareShare:j3,MessageSquareShareIcon:j3,MessageSquareText:P3,MessageSquareTextIcon:P3,MessageSquareWarning:z3,MessageSquareWarningIcon:z3,MessageSquareX:H3,MessageSquareXIcon:H3,MessagesSquare:R3,MessagesSquareIcon:R3,Mic:T3,Mic2:ra,Mic2Icon:ra,MicIcon:T3,MicOff:D3,MicOffIcon:D3,MicVocal:ra,MicVocalIcon:ra,Microchip:F3,MicrochipIcon:F3,Microscope:B3,MicroscopeIcon:B3,Microwave:E3,MicrowaveIcon:E3,Milestone:O3,MilestoneIcon:O3,Milk:N3,MilkIcon:N3,MilkOff:U3,MilkOffIcon:U3,Minimize:G3,Minimize2:_3,Minimize2Icon:_3,MinimizeIcon:G3,Minus:sr,MinusCircle:pt,MinusCircleIcon:pt,MinusIcon:sr,MinusSquare:d2,MinusSquareIcon:d2,Monitor:r6,MonitorCheck:Z3,MonitorCheckIcon:Z3,MonitorCog:W3,MonitorCogIcon:W3,MonitorDot:X3,MonitorDotIcon:X3,MonitorDown:K3,MonitorDownIcon:K3,MonitorIcon:r6,MonitorOff:$3,MonitorOffIcon:$3,MonitorPause:Q3,MonitorPauseIcon:Q3,MonitorPlay:J3,MonitorPlayIcon:J3,MonitorSmartphone:Y3,MonitorSmartphoneIcon:Y3,MonitorSpeaker:e6,MonitorSpeakerIcon:e6,MonitorStop:t6,MonitorStopIcon:t6,MonitorUp:a6,MonitorUpIcon:a6,MonitorX:o6,MonitorXIcon:o6,Moon:hr,MoonIcon:hr,MoonStar:n6,MoonStarIcon:n6,MoreHorizontal:Tt,MoreHorizontalIcon:Tt,MoreVertical:Dt,MoreVerticalIcon:Dt,Mountain:i6,MountainIcon:i6,MountainSnow:c6,MountainSnowIcon:c6,Mouse:p6,MouseIcon:p6,MouseOff:d6,MouseOffIcon:d6,MousePointer:y6,MousePointer2:s6,MousePointer2Icon:s6,MousePointerBan:h6,MousePointerBanIcon:h6,MousePointerClick:l6,MousePointerClickIcon:l6,MousePointerIcon:y6,MousePointerSquareDashed:Ja,MousePointerSquareDashedIcon:Ja,Move:I6,Move3D:na,Move3DIcon:na,Move3d:na,Move3dIcon:na,MoveDiagonal:k6,MoveDiagonal2:u6,MoveDiagonal2Icon:u6,MoveDiagonalIcon:k6,MoveDown:v6,MoveDownIcon:v6,MoveDownLeft:M6,MoveDownLeftIcon:M6,MoveDownRight:m6,MoveDownRightIcon:m6,MoveHorizontal:f6,MoveHorizontalIcon:f6,MoveIcon:I6,MoveLeft:g6,MoveLeftIcon:g6,MoveRight:x6,MoveRightIcon:x6,MoveUp:C6,MoveUpIcon:C6,MoveUpLeft:w6,MoveUpLeftIcon:w6,MoveUpRight:L6,MoveUpRightIcon:L6,MoveVertical:b6,MoveVerticalIcon:b6,Music:lr,Music2:S6,Music2Icon:S6,Music3:q6,Music3Icon:q6,Music4:A6,Music4Icon:A6,MusicIcon:lr,Navigation:H6,Navigation2:P6,Navigation2Icon:P6,Navigation2Off:j6,Navigation2OffIcon:j6,NavigationIcon:H6,NavigationOff:z6,NavigationOffIcon:z6,Network:V6,NetworkIcon:V6,Newspaper:R6,NewspaperIcon:R6,Nfc:D6,NfcIcon:D6,Notebook:E6,NotebookIcon:E6,NotebookPen:T6,NotebookPenIcon:T6,NotebookTabs:F6,NotebookTabsIcon:F6,NotebookText:B6,NotebookTextIcon:B6,NotepadText:U6,NotepadTextDashed:O6,NotepadTextDashedIcon:O6,NotepadTextIcon:U6,Nut:_6,NutIcon:_6,NutOff:N6,NutOffIcon:N6,Octagon:Z6,OctagonAlert:ca,OctagonAlertIcon:ca,OctagonIcon:Z6,OctagonMinus:G6,OctagonMinusIcon:G6,OctagonPause:ia,OctagonPauseIcon:ia,OctagonX:da,OctagonXIcon:da,Omega:W6,OmegaIcon:W6,Option:X6,OptionIcon:X6,Orbit:K6,OrbitIcon:K6,Origami:$6,OrigamiIcon:$6,Outdent:ea,OutdentIcon:ea,Package:r8,Package2:Q6,Package2Icon:Q6,PackageCheck:J6,PackageCheckIcon:J6,PackageIcon:r8,PackageMinus:Y6,PackageMinusIcon:Y6,PackageOpen:e8,PackageOpenIcon:e8,PackagePlus:t8,PackagePlusIcon:t8,PackageSearch:a8,PackageSearchIcon:a8,PackageX:o8,PackageXIcon:o8,PaintBucket:n8,PaintBucketIcon:n8,PaintRoller:c8,PaintRollerIcon:c8,Paintbrush:i8,Paintbrush2:sa,Paintbrush2Icon:sa,PaintbrushIcon:i8,PaintbrushVertical:sa,PaintbrushVerticalIcon:sa,Palette:d8,PaletteIcon:d8,Palmtree:j2,PalmtreeIcon:j2,PanelBottom:l8,PanelBottomClose:s8,PanelBottomCloseIcon:s8,PanelBottomDashed:ha,PanelBottomDashedIcon:ha,PanelBottomIcon:l8,PanelBottomInactive:ha,PanelBottomInactiveIcon:ha,PanelBottomOpen:h8,PanelBottomOpenIcon:h8,PanelLeft:ua,PanelLeftClose:la,PanelLeftCloseIcon:la,PanelLeftDashed:ya,PanelLeftDashedIcon:ya,PanelLeftIcon:ua,PanelLeftInactive:ya,PanelLeftInactiveIcon:ya,PanelLeftOpen:pa,PanelLeftOpenIcon:pa,PanelRight:u8,PanelRightClose:y8,PanelRightCloseIcon:y8,PanelRightDashed:ka,PanelRightDashedIcon:ka,PanelRightIcon:u8,PanelRightInactive:ka,PanelRightInactiveIcon:ka,PanelRightOpen:p8,PanelRightOpenIcon:p8,PanelTop:m8,PanelTopClose:k8,PanelTopCloseIcon:k8,PanelTopDashed:Ma,PanelTopDashedIcon:Ma,PanelTopIcon:m8,PanelTopInactive:Ma,PanelTopInactiveIcon:Ma,PanelTopOpen:M8,PanelTopOpenIcon:M8,PanelsLeftBottom:v8,PanelsLeftBottomIcon:v8,PanelsLeftRight:zt,PanelsLeftRightIcon:zt,PanelsRightBottom:f8,PanelsRightBottomIcon:f8,PanelsTopBottom:La,PanelsTopBottomIcon:La,PanelsTopLeft:ma,PanelsTopLeftIcon:ma,Paperclip:yr,PaperclipIcon:yr,Parentheses:g8,ParenthesesIcon:g8,ParkingCircle:kt,ParkingCircleIcon:kt,ParkingCircleOff:ut,ParkingCircleOffIcon:ut,ParkingMeter:x8,ParkingMeterIcon:x8,ParkingSquare:l2,ParkingSquareIcon:l2,ParkingSquareOff:h2,ParkingSquareOffIcon:h2,PartyPopper:w8,PartyPopperIcon:w8,Pause:L8,PauseCircle:Mt,PauseCircleIcon:Mt,PauseIcon:L8,PauseOctagon:ia,PauseOctagonIcon:ia,PawPrint:C8,PawPrintIcon:C8,PcCase:b8,PcCaseIcon:b8,Pen:n1,PenBox:Se,PenBoxIcon:Se,PenIcon:n1,PenLine:va,PenLineIcon:va,PenOff:I8,PenOffIcon:I8,PenSquare:Se,PenSquareIcon:Se,PenTool:S8,PenToolIcon:S8,Pencil:P8,PencilIcon:P8,PencilLine:q8,PencilLineIcon:q8,PencilOff:A8,PencilOffIcon:A8,PencilRuler:j8,PencilRulerIcon:j8,Pentagon:z8,PentagonIcon:z8,Percent:pr,PercentCircle:mt,PercentCircleIcon:mt,PercentDiamond:Vt,PercentDiamondIcon:Vt,PercentIcon:pr,PercentSquare:y2,PercentSquareIcon:y2,PersonStanding:H8,PersonStandingIcon:H8,PhilippinePeso:V8,PhilippinePesoIcon:V8,Phone:ur,PhoneCall:R8,PhoneCallIcon:R8,PhoneForwarded:D8,PhoneForwardedIcon:D8,PhoneIcon:ur,PhoneIncoming:T8,PhoneIncomingIcon:T8,PhoneMissed:F8,PhoneMissedIcon:F8,PhoneOff:B8,PhoneOffIcon:B8,PhoneOutgoing:E8,PhoneOutgoingIcon:E8,Pi:O8,PiIcon:O8,PiSquare:p2,PiSquareIcon:p2,Piano:U8,PianoIcon:U8,Pickaxe:N8,PickaxeIcon:N8,PictureInPicture:G8,PictureInPicture2:_8,PictureInPicture2Icon:_8,PictureInPictureIcon:G8,PieChart:W1,PieChartIcon:W1,PiggyBank:kr,PiggyBankIcon:kr,Pilcrow:X8,PilcrowIcon:X8,PilcrowLeft:Z8,PilcrowLeftIcon:Z8,PilcrowRight:W8,PilcrowRightIcon:W8,PilcrowSquare:u2,PilcrowSquareIcon:u2,Pill:$8,PillBottle:K8,PillBottleIcon:K8,PillIcon:$8,Pin:J8,PinIcon:J8,PinOff:Q8,PinOffIcon:Q8,Pipette:Y8,PipetteIcon:Y8,Pizza:Mr,PizzaIcon:Mr,Plane:mr,PlaneIcon:mr,PlaneLanding:e7,PlaneLandingIcon:e7,PlaneTakeoff:t7,PlaneTakeoffIcon:t7,Play:a7,PlayCircle:vt,PlayCircleIcon:vt,PlayIcon:a7,PlaySquare:k2,PlaySquareIcon:k2,Plug:r7,Plug2:o7,Plug2Icon:o7,PlugIcon:r7,PlugZap:fa,PlugZap2:fa,PlugZap2Icon:fa,PlugZapIcon:fa,Plus:vr,PlusCircle:ft,PlusCircleIcon:ft,PlusIcon:vr,PlusSquare:M2,PlusSquareIcon:M2,Pocket:c7,PocketIcon:c7,PocketKnife:n7,PocketKnifeIcon:n7,Podcast:i7,PodcastIcon:i7,Pointer:s7,PointerIcon:s7,PointerOff:d7,PointerOffIcon:d7,Popcorn:h7,PopcornIcon:h7,Popsicle:l7,PopsicleIcon:l7,PoundSterling:y7,PoundSterlingIcon:y7,Power:u7,PowerCircle:gt,PowerCircleIcon:gt,PowerIcon:u7,PowerOff:p7,PowerOffIcon:p7,PowerSquare:m2,PowerSquareIcon:m2,Presentation:k7,PresentationIcon:k7,Printer:m7,PrinterCheck:M7,PrinterCheckIcon:M7,PrinterIcon:m7,Projector:v7,ProjectorIcon:v7,Proportions:f7,ProportionsIcon:f7,Puzzle:g7,PuzzleIcon:g7,Pyramid:x7,PyramidIcon:x7,QrCode:w7,QrCodeIcon:w7,Quote:L7,QuoteIcon:L7,Rabbit:C7,RabbitIcon:C7,Radar:b7,RadarIcon:b7,Radiation:I7,RadiationIcon:I7,Radical:S7,RadicalIcon:S7,Radio:j7,RadioIcon:j7,RadioReceiver:q7,RadioReceiverIcon:q7,RadioTower:A7,RadioTowerIcon:A7,Radius:P7,RadiusIcon:P7,RailSymbol:z7,RailSymbolIcon:z7,Rainbow:H7,RainbowIcon:H7,Rat:V7,RatIcon:V7,Ratio:R7,RatioIcon:R7,Receipt:_7,ReceiptCent:D7,ReceiptCentIcon:D7,ReceiptEuro:T7,ReceiptEuroIcon:T7,ReceiptIcon:_7,ReceiptIndianRupee:F7,ReceiptIndianRupeeIcon:F7,ReceiptJapaneseYen:B7,ReceiptJapaneseYenIcon:B7,ReceiptPoundSterling:E7,ReceiptPoundSterlingIcon:E7,ReceiptRussianRuble:O7,ReceiptRussianRubleIcon:O7,ReceiptSwissFranc:U7,ReceiptSwissFrancIcon:U7,ReceiptText:N7,ReceiptTextIcon:N7,RectangleEllipsis:ga,RectangleEllipsisIcon:ga,RectangleHorizontal:G7,RectangleHorizontalIcon:G7,RectangleVertical:Z7,RectangleVerticalIcon:Z7,Recycle:W7,RecycleIcon:W7,Redo:$7,Redo2:X7,Redo2Icon:X7,RedoDot:K7,RedoDotIcon:K7,RedoIcon:$7,RefreshCcw:J7,RefreshCcwDot:Q7,RefreshCcwDotIcon:Q7,RefreshCcwIcon:J7,RefreshCw:fr,RefreshCwIcon:fr,RefreshCwOff:Y7,RefreshCwOffIcon:Y7,Refrigerator:eM,RefrigeratorIcon:eM,Regex:tM,RegexIcon:tM,RemoveFormatting:aM,RemoveFormattingIcon:aM,Repeat:nM,Repeat1:oM,Repeat1Icon:oM,Repeat2:rM,Repeat2Icon:rM,RepeatIcon:nM,Replace:iM,ReplaceAll:cM,ReplaceAllIcon:cM,ReplaceIcon:iM,Reply:sM,ReplyAll:dM,ReplyAllIcon:dM,ReplyIcon:sM,Rewind:hM,RewindIcon:hM,Ribbon:lM,RibbonIcon:lM,Rocket:yM,RocketIcon:yM,RockingChair:pM,RockingChairIcon:pM,RollerCoaster:uM,RollerCoasterIcon:uM,Rotate3D:xa,Rotate3DIcon:xa,Rotate3d:xa,Rotate3dIcon:xa,RotateCcw:MM,RotateCcwIcon:MM,RotateCcwSquare:kM,RotateCcwSquareIcon:kM,RotateCw:vM,RotateCwIcon:vM,RotateCwSquare:mM,RotateCwSquareIcon:mM,Route:gM,RouteIcon:gM,RouteOff:fM,RouteOffIcon:fM,Router:xM,RouterIcon:xM,Rows:wa,Rows2:wa,Rows2Icon:wa,Rows3:La,Rows3Icon:La,Rows4:wM,Rows4Icon:wM,RowsIcon:wa,Rss:LM,RssIcon:LM,Ruler:CM,RulerIcon:CM,RussianRuble:bM,RussianRubleIcon:bM,Sailboat:IM,SailboatIcon:IM,Salad:SM,SaladIcon:SM,Sandwich:qM,SandwichIcon:qM,Satellite:jM,SatelliteDish:AM,SatelliteDishIcon:AM,SatelliteIcon:jM,Save:HM,SaveAll:PM,SaveAllIcon:PM,SaveIcon:HM,SaveOff:zM,SaveOffIcon:zM,Scale:VM,Scale3D:Ca,Scale3DIcon:Ca,Scale3d:Ca,Scale3dIcon:Ca,ScaleIcon:VM,Scaling:RM,ScalingIcon:RM,Scan:NM,ScanBarcode:DM,ScanBarcodeIcon:DM,ScanEye:TM,ScanEyeIcon:TM,ScanFace:FM,ScanFaceIcon:FM,ScanIcon:NM,ScanLine:BM,ScanLineIcon:BM,ScanQrCode:EM,ScanQrCodeIcon:EM,ScanSearch:OM,ScanSearchIcon:OM,ScanText:UM,ScanTextIcon:UM,ScatterChart:X1,ScatterChartIcon:X1,School:_M,School2:z2,School2Icon:z2,SchoolIcon:_M,Scissors:gr,ScissorsIcon:gr,ScissorsLineDashed:GM,ScissorsLineDashedIcon:GM,ScissorsSquare:v2,ScissorsSquareDashedBottom:Na,ScissorsSquareDashedBottomIcon:Na,ScissorsSquareIcon:v2,ScreenShare:WM,ScreenShareIcon:WM,ScreenShareOff:ZM,ScreenShareOffIcon:ZM,Scroll:KM,ScrollIcon:KM,ScrollText:XM,ScrollTextIcon:XM,Search:em,SearchCheck:$M,SearchCheckIcon:$M,SearchCode:QM,SearchCodeIcon:QM,SearchIcon:em,SearchSlash:JM,SearchSlashIcon:JM,SearchX:YM,SearchXIcon:YM,Section:tm,SectionIcon:tm,Send:om,SendHorizonal:ba,SendHorizonalIcon:ba,SendHorizontal:ba,SendHorizontalIcon:ba,SendIcon:om,SendToBack:am,SendToBackIcon:am,SeparatorHorizontal:rm,SeparatorHorizontalIcon:rm,SeparatorVertical:nm,SeparatorVerticalIcon:nm,Server:sm,ServerCog:cm,ServerCogIcon:cm,ServerCrash:im,ServerCrashIcon:im,ServerIcon:sm,ServerOff:dm,ServerOffIcon:dm,Settings:xr,Settings2:hm,Settings2Icon:hm,SettingsIcon:xr,Shapes:lm,ShapesIcon:lm,Share:wr,Share2:ym,Share2Icon:ym,ShareIcon:wr,Sheet:pm,SheetIcon:pm,Shell:um,ShellIcon:um,Shield:Lr,ShieldAlert:km,ShieldAlertIcon:km,ShieldBan:Mm,ShieldBanIcon:Mm,ShieldCheck:mm,ShieldCheckIcon:mm,ShieldClose:Ia,ShieldCloseIcon:Ia,ShieldEllipsis:vm,ShieldEllipsisIcon:vm,ShieldHalf:fm,ShieldHalfIcon:fm,ShieldIcon:Lr,ShieldMinus:gm,ShieldMinusIcon:gm,ShieldOff:xm,ShieldOffIcon:xm,ShieldPlus:wm,ShieldPlusIcon:wm,ShieldQuestion:Lm,ShieldQuestionIcon:Lm,ShieldX:Ia,ShieldXIcon:Ia,Ship:bm,ShipIcon:bm,ShipWheel:Cm,ShipWheelIcon:Cm,Shirt:Cr,ShirtIcon:Cr,ShoppingBag:Im,ShoppingBagIcon:Im,ShoppingBasket:Sm,ShoppingBasketIcon:Sm,ShoppingCart:br,ShoppingCartIcon:br,Shovel:qm,ShovelIcon:qm,ShowerHead:Am,ShowerHeadIcon:Am,Shrink:jm,ShrinkIcon:jm,Shrub:Pm,ShrubIcon:Pm,Shuffle:zm,ShuffleIcon:zm,Sidebar:ua,SidebarClose:la,SidebarCloseIcon:la,SidebarIcon:ua,SidebarOpen:pa,SidebarOpenIcon:pa,Sigma:Hm,SigmaIcon:Hm,SigmaSquare:f2,SigmaSquareIcon:f2,Signal:Fm,SignalHigh:Vm,SignalHighIcon:Vm,SignalIcon:Fm,SignalLow:Rm,SignalLowIcon:Rm,SignalMedium:Dm,SignalMediumIcon:Dm,SignalZero:Tm,SignalZeroIcon:Tm,Signature:Bm,SignatureIcon:Bm,Signpost:Om,SignpostBig:Em,SignpostBigIcon:Em,SignpostIcon:Om,Siren:Um,SirenIcon:Um,SkipBack:Nm,SkipBackIcon:Nm,SkipForward:_m,SkipForwardIcon:_m,Skull:Gm,SkullIcon:Gm,Slack:Zm,SlackIcon:Zm,Slash:Wm,SlashIcon:Wm,SlashSquare:g2,SlashSquareIcon:g2,Slice:Xm,SliceIcon:Xm,Sliders:Sa,SlidersHorizontal:Km,SlidersHorizontalIcon:Km,SlidersIcon:Sa,SlidersVertical:Sa,SlidersVerticalIcon:Sa,Smartphone:Mo,SmartphoneCharging:$m,SmartphoneChargingIcon:$m,SmartphoneIcon:Mo,SmartphoneNfc:Qm,SmartphoneNfcIcon:Qm,Smile:Ym,SmileIcon:Ym,SmilePlus:Jm,SmilePlusIcon:Jm,Snail:e9,SnailIcon:e9,Snowflake:t9,SnowflakeIcon:t9,Sofa:a9,SofaIcon:a9,SortAsc:S1,SortAscIcon:S1,SortDesc:C1,SortDescIcon:C1,Soup:o9,SoupIcon:o9,Space:r9,SpaceIcon:r9,Spade:n9,SpadeIcon:n9,Sparkle:c9,SparkleIcon:c9,Sparkles:qa,SparklesIcon:qa,Speaker:i9,SpeakerIcon:i9,Speech:d9,SpeechIcon:d9,SpellCheck:h9,SpellCheck2:s9,SpellCheck2Icon:s9,SpellCheckIcon:h9,Spline:l9,SplineIcon:l9,Split:y9,SplitIcon:y9,SplitSquareHorizontal:x2,SplitSquareHorizontalIcon:x2,SplitSquareVertical:w2,SplitSquareVerticalIcon:w2,SprayCan:p9,SprayCanIcon:p9,Sprout:u9,SproutIcon:u9,Square:Ir,SquareActivity:Aa,SquareActivityIcon:Aa,SquareArrowDown:za,SquareArrowDownIcon:za,SquareArrowDownLeft:ja,SquareArrowDownLeftIcon:ja,SquareArrowDownRight:Pa,SquareArrowDownRightIcon:Pa,SquareArrowLeft:Ha,SquareArrowLeftIcon:Ha,SquareArrowOutDownLeft:Va,SquareArrowOutDownLeftIcon:Va,SquareArrowOutDownRight:Ra,SquareArrowOutDownRightIcon:Ra,SquareArrowOutUpLeft:Da,SquareArrowOutUpLeftIcon:Da,SquareArrowOutUpRight:Ta,SquareArrowOutUpRightIcon:Ta,SquareArrowRight:Fa,SquareArrowRightIcon:Fa,SquareArrowUp:Oa,SquareArrowUpIcon:Oa,SquareArrowUpLeft:Ba,SquareArrowUpLeftIcon:Ba,SquareArrowUpRight:Ea,SquareArrowUpRightIcon:Ea,SquareAsterisk:Ua,SquareAsteriskIcon:Ua,SquareBottomDashedScissors:Na,SquareBottomDashedScissorsIcon:Na,SquareChartGantt:Be,SquareChartGanttIcon:Be,SquareCheck:Ga,SquareCheckBig:_a,SquareCheckBigIcon:_a,SquareCheckIcon:Ga,SquareChevronDown:Za,SquareChevronDownIcon:Za,SquareChevronLeft:Wa,SquareChevronLeftIcon:Wa,SquareChevronRight:Xa,SquareChevronRightIcon:Xa,SquareChevronUp:Ka,SquareChevronUpIcon:Ka,SquareCode:$a,SquareCodeIcon:$a,SquareDashed:Ya,SquareDashedBottom:M9,SquareDashedBottomCode:k9,SquareDashedBottomCodeIcon:k9,SquareDashedBottomIcon:M9,SquareDashedIcon:Ya,SquareDashedKanban:Qa,SquareDashedKanbanIcon:Qa,SquareDashedMousePointer:Ja,SquareDashedMousePointerIcon:Ja,SquareDivide:e2,SquareDivideIcon:e2,SquareDot:t2,SquareDotIcon:t2,SquareEqual:a2,SquareEqualIcon:a2,SquareFunction:o2,SquareFunctionIcon:o2,SquareGanttChart:Be,SquareGanttChartIcon:Be,SquareIcon:Ir,SquareKanban:r2,SquareKanbanIcon:r2,SquareLibrary:n2,SquareLibraryIcon:n2,SquareM:c2,SquareMIcon:c2,SquareMenu:i2,SquareMenuIcon:i2,SquareMinus:d2,SquareMinusIcon:d2,SquareMousePointer:s2,SquareMousePointerIcon:s2,SquareParking:l2,SquareParkingIcon:l2,SquareParkingOff:h2,SquareParkingOffIcon:h2,SquarePen:Se,SquarePenIcon:Se,SquarePercent:y2,SquarePercentIcon:y2,SquarePi:p2,SquarePiIcon:p2,SquarePilcrow:u2,SquarePilcrowIcon:u2,SquarePlay:k2,SquarePlayIcon:k2,SquarePlus:M2,SquarePlusIcon:M2,SquarePower:m2,SquarePowerIcon:m2,SquareRadical:m9,SquareRadicalIcon:m9,SquareScissors:v2,SquareScissorsIcon:v2,SquareSigma:f2,SquareSigmaIcon:f2,SquareSlash:g2,SquareSlashIcon:g2,SquareSplitHorizontal:x2,SquareSplitHorizontalIcon:x2,SquareSplitVertical:w2,SquareSplitVerticalIcon:w2,SquareSquare:v9,SquareSquareIcon:v9,SquareStack:f9,SquareStackIcon:f9,SquareTerminal:L2,SquareTerminalIcon:L2,SquareUser:b2,SquareUserIcon:b2,SquareUserRound:C2,SquareUserRoundIcon:C2,SquareX:I2,SquareXIcon:I2,Squircle:g9,SquircleIcon:g9,Squirrel:x9,SquirrelIcon:x9,Stamp:w9,StampIcon:w9,Star:Sr,StarHalf:L9,StarHalfIcon:L9,StarIcon:Sr,StarOff:C9,StarOffIcon:C9,Stars:qa,StarsIcon:qa,StepBack:b9,StepBackIcon:b9,StepForward:I9,StepForwardIcon:I9,Stethoscope:S9,StethoscopeIcon:S9,Sticker:q9,StickerIcon:q9,StickyNote:A9,StickyNoteIcon:A9,StopCircle:wt,StopCircleIcon:wt,Store:j9,StoreIcon:j9,StretchHorizontal:P9,StretchHorizontalIcon:P9,StretchVertical:z9,StretchVerticalIcon:z9,Strikethrough:H9,StrikethroughIcon:H9,Subscript:V9,SubscriptIcon:V9,Subtitles:R1,SubtitlesIcon:R1,Sun:qr,SunDim:R9,SunDimIcon:R9,SunIcon:qr,SunMedium:D9,SunMediumIcon:D9,SunMoon:T9,SunMoonIcon:T9,SunSnow:F9,SunSnowIcon:F9,Sunrise:B9,SunriseIcon:B9,Sunset:E9,SunsetIcon:E9,Superscript:O9,SuperscriptIcon:O9,SwatchBook:U9,SwatchBookIcon:U9,SwissFranc:N9,SwissFrancIcon:N9,SwitchCamera:_9,SwitchCameraIcon:_9,Sword:G9,SwordIcon:G9,Swords:Z9,SwordsIcon:Z9,Syringe:W9,SyringeIcon:W9,Table:tv,Table2:X9,Table2Icon:X9,TableCellsMerge:K9,TableCellsMergeIcon:K9,TableCellsSplit:$9,TableCellsSplitIcon:$9,TableColumnsSplit:Q9,TableColumnsSplitIcon:Q9,TableIcon:tv,TableOfContents:J9,TableOfContentsIcon:J9,TableProperties:Y9,TablePropertiesIcon:Y9,TableRowsSplit:ev,TableRowsSplitIcon:ev,Tablet:ov,TabletIcon:ov,TabletSmartphone:av,TabletSmartphoneIcon:av,Tablets:rv,TabletsIcon:rv,Tag:Ar,TagIcon:Ar,Tags:nv,TagsIcon:nv,Tally1:cv,Tally1Icon:cv,Tally2:iv,Tally2Icon:iv,Tally3:dv,Tally3Icon:dv,Tally4:sv,Tally4Icon:sv,Tally5:hv,Tally5Icon:hv,Tangent:lv,TangentIcon:lv,Target:yv,TargetIcon:yv,Telescope:pv,TelescopeIcon:pv,Tent:kv,TentIcon:kv,TentTree:uv,TentTreeIcon:uv,Terminal:Mv,TerminalIcon:Mv,TerminalSquare:L2,TerminalSquareIcon:L2,TestTube:mv,TestTube2:S2,TestTube2Icon:S2,TestTubeDiagonal:S2,TestTubeDiagonalIcon:S2,TestTubeIcon:mv,TestTubes:vv,TestTubesIcon:vv,Text:Lv,TextCursor:gv,TextCursorIcon:gv,TextCursorInput:fv,TextCursorInputIcon:fv,TextIcon:Lv,TextQuote:xv,TextQuoteIcon:xv,TextSearch:wv,TextSearchIcon:wv,TextSelect:q2,TextSelectIcon:q2,TextSelection:q2,TextSelectionIcon:q2,Theater:Cv,TheaterIcon:Cv,Thermometer:Sv,ThermometerIcon:Sv,ThermometerSnowflake:bv,ThermometerSnowflakeIcon:bv,ThermometerSun:Iv,ThermometerSunIcon:Iv,ThumbsDown:qv,ThumbsDownIcon:qv,ThumbsUp:Av,ThumbsUpIcon:Av,Ticket:Dv,TicketCheck:jv,TicketCheckIcon:jv,TicketIcon:Dv,TicketMinus:Pv,TicketMinusIcon:Pv,TicketPercent:zv,TicketPercentIcon:zv,TicketPlus:Hv,TicketPlusIcon:Hv,TicketSlash:Vv,TicketSlashIcon:Vv,TicketX:Rv,TicketXIcon:Rv,Tickets:Fv,TicketsIcon:Fv,TicketsPlane:Tv,TicketsPlaneIcon:Tv,Timer:Ov,TimerIcon:Ov,TimerOff:Bv,TimerOffIcon:Bv,TimerReset:Ev,TimerResetIcon:Ev,ToggleLeft:Uv,ToggleLeftIcon:Uv,ToggleRight:Nv,ToggleRightIcon:Nv,Toilet:_v,ToiletIcon:_v,Tornado:Gv,TornadoIcon:Gv,Torus:Zv,TorusIcon:Zv,Touchpad:Xv,TouchpadIcon:Xv,TouchpadOff:Wv,TouchpadOffIcon:Wv,TowerControl:Kv,TowerControlIcon:Kv,ToyBrick:$v,ToyBrickIcon:$v,Tractor:Qv,TractorIcon:Qv,TrafficCone:Jv,TrafficConeIcon:Jv,Train:A2,TrainFront:ef,TrainFrontIcon:ef,TrainFrontTunnel:Yv,TrainFrontTunnelIcon:Yv,TrainIcon:A2,TrainTrack:tf,TrainTrackIcon:tf,TramFront:A2,TramFrontIcon:A2,Trash:of,Trash2:af,Trash2Icon:af,TrashIcon:of,TreeDeciduous:rf,TreeDeciduousIcon:rf,TreePalm:j2,TreePalmIcon:j2,TreePine:nf,TreePineIcon:nf,Trees:cf,TreesIcon:cf,Trello:df,TrelloIcon:df,TrendingDown:sf,TrendingDownIcon:sf,TrendingUp:mo,TrendingUpDown:hf,TrendingUpDownIcon:hf,TrendingUpIcon:mo,Triangle:jr,TriangleAlert:We,TriangleAlertIcon:We,TriangleIcon:jr,TriangleRight:lf,TriangleRightIcon:lf,Trophy:yf,TrophyIcon:yf,Truck:pf,TruckIcon:pf,Turtle:uf,TurtleIcon:uf,Tv:Mf,Tv2:P2,Tv2Icon:P2,TvIcon:Mf,TvMinimal:P2,TvMinimalIcon:P2,TvMinimalPlay:kf,TvMinimalPlayIcon:kf,Twitch:mf,TwitchIcon:mf,Twitter:vf,TwitterIcon:vf,Type:gf,TypeIcon:gf,TypeOutline:ff,TypeOutlineIcon:ff,Umbrella:wf,UmbrellaIcon:wf,UmbrellaOff:xf,UmbrellaOffIcon:xf,Underline:Lf,UnderlineIcon:Lf,Undo:If,Undo2:Cf,Undo2Icon:Cf,UndoDot:bf,UndoDotIcon:bf,UndoIcon:If,UnfoldHorizontal:Sf,UnfoldHorizontalIcon:Sf,UnfoldVertical:qf,UnfoldVerticalIcon:qf,Ungroup:Af,UngroupIcon:Af,University:z2,UniversityIcon:z2,Unlink:Pf,Unlink2:jf,Unlink2Icon:jf,UnlinkIcon:Pf,Unlock:r1,UnlockIcon:r1,UnlockKeyhole:oa,UnlockKeyholeIcon:oa,Unplug:zf,UnplugIcon:zf,Upload:Pr,UploadCloud:At,UploadCloudIcon:At,UploadIcon:Pr,Usb:Hf,UsbIcon:Hf,User:zr,User2:F2,User2Icon:F2,UserCheck:Vf,UserCheck2:H2,UserCheck2Icon:H2,UserCheckIcon:Vf,UserCircle:Ct,UserCircle2:Lt,UserCircle2Icon:Lt,UserCircleIcon:Ct,UserCog:Rf,UserCog2:V2,UserCog2Icon:V2,UserCogIcon:Rf,UserIcon:zr,UserMinus:Df,UserMinus2:R2,UserMinus2Icon:R2,UserMinusIcon:Df,UserPen:Tf,UserPenIcon:Tf,UserPlus:Ff,UserPlus2:D2,UserPlus2Icon:D2,UserPlusIcon:Ff,UserRound:F2,UserRoundCheck:H2,UserRoundCheckIcon:H2,UserRoundCog:V2,UserRoundCogIcon:V2,UserRoundIcon:F2,UserRoundMinus:R2,UserRoundMinusIcon:R2,UserRoundPen:Bf,UserRoundPenIcon:Bf,UserRoundPlus:D2,UserRoundPlusIcon:D2,UserRoundSearch:Ef,UserRoundSearchIcon:Ef,UserRoundX:T2,UserRoundXIcon:T2,UserSearch:Of,UserSearchIcon:Of,UserSquare:b2,UserSquare2:C2,UserSquare2Icon:C2,UserSquareIcon:b2,UserX:Uf,UserX2:T2,UserX2Icon:T2,UserXIcon:Uf,Users:Hr,Users2:B2,Users2Icon:B2,UsersIcon:Hr,UsersRound:B2,UsersRoundIcon:B2,Utensils:Xe,UtensilsCrossed:E2,UtensilsCrossedIcon:E2,UtensilsIcon:Xe,UtilityPole:Nf,UtilityPoleIcon:Nf,Variable:_f,VariableIcon:_f,Vault:Gf,VaultIcon:Gf,Vegan:Zf,VeganIcon:Zf,VenetianMask:Wf,VenetianMaskIcon:Wf,Verified:j1,VerifiedIcon:j1,Vibrate:Kf,VibrateIcon:Kf,VibrateOff:Xf,VibrateOffIcon:Xf,Video:Vr,VideoIcon:Vr,VideoOff:$f,VideoOffIcon:$f,Videotape:Qf,VideotapeIcon:Qf,View:Jf,ViewIcon:Jf,Voicemail:Yf,VoicemailIcon:Yf,Volleyball:eg,VolleyballIcon:eg,Volume:ng,Volume1:tg,Volume1Icon:tg,Volume2:ag,Volume2Icon:ag,VolumeIcon:ng,VolumeOff:og,VolumeOffIcon:og,VolumeX:rg,VolumeXIcon:rg,Vote:cg,VoteIcon:cg,Wallet:dg,Wallet2:O2,Wallet2Icon:O2,WalletCards:ig,WalletCardsIcon:ig,WalletIcon:dg,WalletMinimal:O2,WalletMinimalIcon:O2,Wallpaper:sg,WallpaperIcon:sg,Wand:hg,Wand2:U2,Wand2Icon:U2,WandIcon:hg,WandSparkles:U2,WandSparklesIcon:U2,Warehouse:lg,WarehouseIcon:lg,WashingMachine:yg,WashingMachineIcon:yg,Watch:pg,WatchIcon:pg,Waves:ug,WavesIcon:ug,Waypoints:kg,WaypointsIcon:kg,Webcam:Mg,WebcamIcon:Mg,Webhook:vg,WebhookIcon:vg,WebhookOff:mg,WebhookOffIcon:mg,Weight:fg,WeightIcon:fg,Wheat:xg,WheatIcon:xg,WheatOff:gg,WheatOffIcon:gg,WholeWord:wg,WholeWordIcon:wg,Wifi:Rr,WifiHigh:Lg,WifiHighIcon:Lg,WifiIcon:Rr,WifiLow:Cg,WifiLowIcon:Cg,WifiOff:bg,WifiOffIcon:bg,WifiZero:Ig,WifiZeroIcon:Ig,Wind:qg,WindArrowDown:Sg,WindArrowDownIcon:Sg,WindIcon:qg,Wine:jg,WineIcon:jg,WineOff:Ag,WineOffIcon:Ag,Workflow:Pg,WorkflowIcon:Pg,Worm:zg,WormIcon:zg,WrapText:Hg,WrapTextIcon:Hg,Wrench:Dr,WrenchIcon:Dr,X:Q2,XCircle:bt,XCircleIcon:bt,XIcon:Q2,XOctagon:da,XOctagonIcon:da,XSquare:I2,XSquareIcon:I2,Youtube:Vg,YoutubeIcon:Vg,Zap:Tr,ZapIcon:Tr,ZapOff:Rg,ZapOffIcon:Rg,ZoomIn:Dg,ZoomInIcon:Dg,ZoomOut:Tg,ZoomOutIcon:Tg,createLucideIcon:e,icons:tI},Symbol.toStringTag,{value:"Module"})),gx="-",aI=t=>{const a=rI(t),{conflictingClassGroups:o,conflictingClassGroupModifiers:r}=t;return{getClassGroupId:l=>{const h=l.split(gx);return h[0]===""&&h.length!==1&&h.shift(),aL(h,a)||oI(l)},getConflictingClassGroupIds:(l,h)=>{const y=o[l]||[];return h&&r[l]?[...y,...r[l]]:y}}},aL=(t,a)=>{var l;if(t.length===0)return a.classGroupId;const o=t[0],r=a.nextPart.get(o),c=r?aL(t.slice(1),r):void 0;if(c)return c;if(a.validators.length===0)return;const i=t.join(gx);return(l=a.validators.find(({validator:h})=>h(i)))==null?void 0:l.classGroupId},Qx=/^\[(.+)\]$/,oI=t=>{if(Qx.test(t)){const a=Qx.exec(t)[1],o=a==null?void 0:a.substring(0,a.indexOf(":"));if(o)return"arbitrary.."+o}},rI=t=>{const{theme:a,prefix:o}=t,r={nextPart:new Map,validators:[]};return cI(Object.entries(t.classGroups),o).forEach(([i,l])=>{hx(l,r,i,a)}),r},hx=(t,a,o,r)=>{t.forEach(c=>{if(typeof c=="string"){const i=c===""?a:Jx(a,c);i.classGroupId=o;return}if(typeof c=="function"){if(nI(c)){hx(c(r),a,o,r);return}a.validators.push({validator:c,classGroupId:o});return}Object.entries(c).forEach(([i,l])=>{hx(l,Jx(a,i),o,r)})})},Jx=(t,a)=>{let o=t;return a.split(gx).forEach(r=>{o.nextPart.has(r)||o.nextPart.set(r,{nextPart:new Map,validators:[]}),o=o.nextPart.get(r)}),o},nI=t=>t.isThemeGetter,cI=(t,a)=>a?t.map(([o,r])=>{const c=r.map(i=>typeof i=="string"?a+i:typeof i=="object"?Object.fromEntries(Object.entries(i).map(([l,h])=>[a+l,h])):i);return[o,c]}):t,iI=t=>{if(t<1)return{get:()=>{},set:()=>{}};let a=0,o=new Map,r=new Map;const c=(i,l)=>{o.set(i,l),a++,a>t&&(a=0,r=o,o=new Map)};return{get(i){let l=o.get(i);if(l!==void 0)return l;if((l=r.get(i))!==void 0)return c(i,l),l},set(i,l){o.has(i)?o.set(i,l):c(i,l)}}},oL="!",dI=t=>{const{separator:a,experimentalParseClassName:o}=t,r=a.length===1,c=a[0],i=a.length,l=h=>{const y=[];let p=0,M=0,k;for(let v=0;v<h.length;v++){let C=h[v];if(p===0){if(C===c&&(r||h.slice(v,v+i)===a)){y.push(h.slice(M,v)),M=v+i;continue}if(C==="/"){k=v;continue}}C==="["?p++:C==="]"&&p--}const u=y.length===0?h:h.substring(M),s=u.startsWith(oL),w=s?u.substring(1):u,m=k&&k>M?k-M:void 0;return{modifiers:y,hasImportantModifier:s,baseClassName:w,maybePostfixModifierPosition:m}};return o?h=>o({className:h,parseClassName:l}):l},sI=t=>{if(t.length<=1)return t;const a=[];let o=[];return t.forEach(r=>{r[0]==="["?(a.push(...o.sort(),r),o=[]):o.push(r)}),a.push(...o.sort()),a},hI=t=>({cache:iI(t.cacheSize),parseClassName:dI(t),...aI(t)}),lI=/\s+/,yI=(t,a)=>{const{parseClassName:o,getClassGroupId:r,getConflictingClassGroupIds:c}=a,i=[],l=t.trim().split(lI);let h="";for(let y=l.length-1;y>=0;y-=1){const p=l[y],{modifiers:M,hasImportantModifier:k,baseClassName:u,maybePostfixModifierPosition:s}=o(p);let w=!!s,m=r(w?u.substring(0,s):u);if(!m){if(!w){h=p+(h.length>0?" "+h:h);continue}if(m=r(u),!m){h=p+(h.length>0?" "+h:h);continue}w=!1}const v=sI(M).join(":"),C=k?v+oL:v,b=C+m;if(i.includes(b))continue;i.push(b);const A=c(m,w);for(let z=0;z<A.length;++z){const T=A[z];i.push(C+T)}h=p+(h.length>0?" "+h:h)}return h};function pI(){let t=0,a,o,r="";for(;t<arguments.length;)(a=arguments[t++])&&(o=rL(a))&&(r&&(r+=" "),r+=o);return r}const rL=t=>{if(typeof t=="string")return t;let a,o="";for(let r=0;r<t.length;r++)t[r]&&(a=rL(t[r]))&&(o&&(o+=" "),o+=a);return o};function uI(t,...a){let o,r,c,i=l;function l(y){const p=a.reduce((M,k)=>k(M),t());return o=hI(p),r=o.cache.get,c=o.cache.set,i=h,h(y)}function h(y){const p=r(y);if(p)return p;const M=yI(y,o);return c(y,M),M}return function(){return i(pI.apply(null,arguments))}}const re=t=>{const a=o=>o[t]||[];return a.isThemeGetter=!0,a},nL=/^\[(?:([a-z-]+):)?(.+)\]$/i,kI=/^\d+\/\d+$/,MI=new Set(["px","full","screen"]),mI=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,vI=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,fI=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,gI=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,xI=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,_e=t=>vo(t)||MI.has(t)||kI.test(t),t1=t=>Ao(t,"length",AI),vo=t=>!!t&&!Number.isNaN(Number(t)),rx=t=>Ao(t,"number",vo),Po=t=>!!t&&Number.isInteger(Number(t)),wI=t=>t.endsWith("%")&&vo(t.slice(0,-1)),N=t=>nL.test(t),a1=t=>mI.test(t),LI=new Set(["length","size","percentage"]),CI=t=>Ao(t,LI,cL),bI=t=>Ao(t,"position",cL),II=new Set(["image","url"]),SI=t=>Ao(t,II,PI),qI=t=>Ao(t,"",jI),zo=()=>!0,Ao=(t,a,o)=>{const r=nL.exec(t);return r?r[1]?typeof a=="string"?r[1]===a:a.has(r[1]):o(r[2]):!1},AI=t=>vI.test(t)&&!fI.test(t),cL=()=>!1,jI=t=>gI.test(t),PI=t=>xI.test(t),zI=()=>{const t=re("colors"),a=re("spacing"),o=re("blur"),r=re("brightness"),c=re("borderColor"),i=re("borderRadius"),l=re("borderSpacing"),h=re("borderWidth"),y=re("contrast"),p=re("grayscale"),M=re("hueRotate"),k=re("invert"),u=re("gap"),s=re("gradientColorStops"),w=re("gradientColorStopPositions"),m=re("inset"),v=re("margin"),C=re("opacity"),b=re("padding"),A=re("saturate"),z=re("scale"),T=re("sepia"),V=re("skew"),G=re("space"),R=re("translate"),I=()=>["auto","contain","none"],D=()=>["auto","hidden","clip","visible","scroll"],F=()=>["auto",N,a],j=()=>[N,a],ye=()=>["",_e,t1],H=()=>["auto",vo,N],ne=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],J=()=>["solid","dashed","dotted","double","none"],de=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],oe=()=>["start","end","center","between","around","evenly","stretch"],L=()=>["","0",N],X=()=>["auto","avoid","all","avoid-page","page","left","right","column"],te=()=>[vo,N];return{cacheSize:500,separator:":",theme:{colors:[zo],spacing:[_e,t1],blur:["none","",a1,N],brightness:te(),borderColor:[t],borderRadius:["none","","full",a1,N],borderSpacing:j(),borderWidth:ye(),contrast:te(),grayscale:L(),hueRotate:te(),invert:L(),gap:j(),gradientColorStops:[t],gradientColorStopPositions:[wI,t1],inset:F(),margin:F(),opacity:te(),padding:j(),saturate:te(),scale:te(),sepia:L(),skew:te(),space:j(),translate:j()},classGroups:{aspect:[{aspect:["auto","square","video",N]}],container:["container"],columns:[{columns:[a1]}],"break-after":[{"break-after":X()}],"break-before":[{"break-before":X()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...ne(),N]}],overflow:[{overflow:D()}],"overflow-x":[{"overflow-x":D()}],"overflow-y":[{"overflow-y":D()}],overscroll:[{overscroll:I()}],"overscroll-x":[{"overscroll-x":I()}],"overscroll-y":[{"overscroll-y":I()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[m]}],"inset-x":[{"inset-x":[m]}],"inset-y":[{"inset-y":[m]}],start:[{start:[m]}],end:[{end:[m]}],top:[{top:[m]}],right:[{right:[m]}],bottom:[{bottom:[m]}],left:[{left:[m]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Po,N]}],basis:[{basis:F()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",N]}],grow:[{grow:L()}],shrink:[{shrink:L()}],order:[{order:["first","last","none",Po,N]}],"grid-cols":[{"grid-cols":[zo]}],"col-start-end":[{col:["auto",{span:["full",Po,N]},N]}],"col-start":[{"col-start":H()}],"col-end":[{"col-end":H()}],"grid-rows":[{"grid-rows":[zo]}],"row-start-end":[{row:["auto",{span:[Po,N]},N]}],"row-start":[{"row-start":H()}],"row-end":[{"row-end":H()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",N]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",N]}],gap:[{gap:[u]}],"gap-x":[{"gap-x":[u]}],"gap-y":[{"gap-y":[u]}],"justify-content":[{justify:["normal",...oe()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...oe(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...oe(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[b]}],px:[{px:[b]}],py:[{py:[b]}],ps:[{ps:[b]}],pe:[{pe:[b]}],pt:[{pt:[b]}],pr:[{pr:[b]}],pb:[{pb:[b]}],pl:[{pl:[b]}],m:[{m:[v]}],mx:[{mx:[v]}],my:[{my:[v]}],ms:[{ms:[v]}],me:[{me:[v]}],mt:[{mt:[v]}],mr:[{mr:[v]}],mb:[{mb:[v]}],ml:[{ml:[v]}],"space-x":[{"space-x":[G]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[G]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",N,a]}],"min-w":[{"min-w":[N,a,"min","max","fit"]}],"max-w":[{"max-w":[N,a,"none","full","min","max","fit","prose",{screen:[a1]},a1]}],h:[{h:[N,a,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[N,a,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[N,a,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[N,a,"auto","min","max","fit"]}],"font-size":[{text:["base",a1,t1]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",rx]}],"font-family":[{font:[zo]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",N]}],"line-clamp":[{"line-clamp":["none",vo,rx]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",_e,N]}],"list-image":[{"list-image":["none",N]}],"list-style-type":[{list:["none","disc","decimal",N]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[t]}],"placeholder-opacity":[{"placeholder-opacity":[C]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[t]}],"text-opacity":[{"text-opacity":[C]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...J(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",_e,t1]}],"underline-offset":[{"underline-offset":["auto",_e,N]}],"text-decoration-color":[{decoration:[t]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:j()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",N]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",N]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[C]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...ne(),bI]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",CI]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},SI]}],"bg-color":[{bg:[t]}],"gradient-from-pos":[{from:[w]}],"gradient-via-pos":[{via:[w]}],"gradient-to-pos":[{to:[w]}],"gradient-from":[{from:[s]}],"gradient-via":[{via:[s]}],"gradient-to":[{to:[s]}],rounded:[{rounded:[i]}],"rounded-s":[{"rounded-s":[i]}],"rounded-e":[{"rounded-e":[i]}],"rounded-t":[{"rounded-t":[i]}],"rounded-r":[{"rounded-r":[i]}],"rounded-b":[{"rounded-b":[i]}],"rounded-l":[{"rounded-l":[i]}],"rounded-ss":[{"rounded-ss":[i]}],"rounded-se":[{"rounded-se":[i]}],"rounded-ee":[{"rounded-ee":[i]}],"rounded-es":[{"rounded-es":[i]}],"rounded-tl":[{"rounded-tl":[i]}],"rounded-tr":[{"rounded-tr":[i]}],"rounded-br":[{"rounded-br":[i]}],"rounded-bl":[{"rounded-bl":[i]}],"border-w":[{border:[h]}],"border-w-x":[{"border-x":[h]}],"border-w-y":[{"border-y":[h]}],"border-w-s":[{"border-s":[h]}],"border-w-e":[{"border-e":[h]}],"border-w-t":[{"border-t":[h]}],"border-w-r":[{"border-r":[h]}],"border-w-b":[{"border-b":[h]}],"border-w-l":[{"border-l":[h]}],"border-opacity":[{"border-opacity":[C]}],"border-style":[{border:[...J(),"hidden"]}],"divide-x":[{"divide-x":[h]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[h]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[C]}],"divide-style":[{divide:J()}],"border-color":[{border:[c]}],"border-color-x":[{"border-x":[c]}],"border-color-y":[{"border-y":[c]}],"border-color-s":[{"border-s":[c]}],"border-color-e":[{"border-e":[c]}],"border-color-t":[{"border-t":[c]}],"border-color-r":[{"border-r":[c]}],"border-color-b":[{"border-b":[c]}],"border-color-l":[{"border-l":[c]}],"divide-color":[{divide:[c]}],"outline-style":[{outline:["",...J()]}],"outline-offset":[{"outline-offset":[_e,N]}],"outline-w":[{outline:[_e,t1]}],"outline-color":[{outline:[t]}],"ring-w":[{ring:ye()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[t]}],"ring-opacity":[{"ring-opacity":[C]}],"ring-offset-w":[{"ring-offset":[_e,t1]}],"ring-offset-color":[{"ring-offset":[t]}],shadow:[{shadow:["","inner","none",a1,qI]}],"shadow-color":[{shadow:[zo]}],opacity:[{opacity:[C]}],"mix-blend":[{"mix-blend":[...de(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":de()}],filter:[{filter:["","none"]}],blur:[{blur:[o]}],brightness:[{brightness:[r]}],contrast:[{contrast:[y]}],"drop-shadow":[{"drop-shadow":["","none",a1,N]}],grayscale:[{grayscale:[p]}],"hue-rotate":[{"hue-rotate":[M]}],invert:[{invert:[k]}],saturate:[{saturate:[A]}],sepia:[{sepia:[T]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[o]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[y]}],"backdrop-grayscale":[{"backdrop-grayscale":[p]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[M]}],"backdrop-invert":[{"backdrop-invert":[k]}],"backdrop-opacity":[{"backdrop-opacity":[C]}],"backdrop-saturate":[{"backdrop-saturate":[A]}],"backdrop-sepia":[{"backdrop-sepia":[T]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",N]}],duration:[{duration:te()}],ease:[{ease:["linear","in","out","in-out",N]}],delay:[{delay:te()}],animate:[{animate:["none","spin","ping","pulse","bounce",N]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[z]}],"scale-x":[{"scale-x":[z]}],"scale-y":[{"scale-y":[z]}],rotate:[{rotate:[Po,N]}],"translate-x":[{"translate-x":[R]}],"translate-y":[{"translate-y":[R]}],"skew-x":[{"skew-x":[V]}],"skew-y":[{"skew-y":[V]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",N]}],accent:[{accent:["auto",t]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",N]}],"caret-color":[{caret:[t]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":j()}],"scroll-mx":[{"scroll-mx":j()}],"scroll-my":[{"scroll-my":j()}],"scroll-ms":[{"scroll-ms":j()}],"scroll-me":[{"scroll-me":j()}],"scroll-mt":[{"scroll-mt":j()}],"scroll-mr":[{"scroll-mr":j()}],"scroll-mb":[{"scroll-mb":j()}],"scroll-ml":[{"scroll-ml":j()}],"scroll-p":[{"scroll-p":j()}],"scroll-px":[{"scroll-px":j()}],"scroll-py":[{"scroll-py":j()}],"scroll-ps":[{"scroll-ps":j()}],"scroll-pe":[{"scroll-pe":j()}],"scroll-pt":[{"scroll-pt":j()}],"scroll-pr":[{"scroll-pr":j()}],"scroll-pb":[{"scroll-pb":j()}],"scroll-pl":[{"scroll-pl":j()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",N]}],fill:[{fill:[t,"none"]}],"stroke-w":[{stroke:[_e,t1,rx]}],stroke:[{stroke:[t,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},HI=uI(zI);function ee(...t){return HI(bw(t))}const VI=Jb,iL=d.forwardRef(({className:t,...a},o)=>n.jsx(Xw,{ref:o,className:ee("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",t),...a}));iL.displayName=Xw.displayName;const RI=Zg("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),dL=d.forwardRef(({className:t,variant:a,...o},r)=>n.jsx(Kw,{ref:r,className:ee(RI({variant:a}),t),...o}));dL.displayName=Kw.displayName;const DI=d.forwardRef(({className:t,...a},o)=>n.jsx(Jw,{ref:o,className:ee("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",t),...a}));DI.displayName=Jw.displayName;const sL=d.forwardRef(({className:t,...a},o)=>n.jsx(Yw,{ref:o,className:ee("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",t),"toast-close":"",...a,children:n.jsx(Q2,{className:"h-4 w-4"})}));sL.displayName=Yw.displayName;const hL=d.forwardRef(({className:t,...a},o)=>n.jsx($w,{ref:o,className:ee("text-sm font-semibold",t),...a}));hL.displayName=$w.displayName;const lL=d.forwardRef(({className:t,...a},o)=>n.jsx(Qw,{ref:o,className:ee("text-sm opacity-90",t),...a}));lL.displayName=Qw.displayName;function TI(){const{toasts:t}=Mx();return n.jsxs(VI,{children:[t.map(function({id:a,title:o,description:r,action:c,...i}){return n.jsxs(dL,{...i,children:[n.jsxs("div",{className:"grid gap-1",children:[o&&n.jsx(hL,{children:o}),r&&n.jsx(lL,{children:r})]}),c,n.jsx(sL,{})]},a)}),n.jsx(iL,{})]})}var Yx=["light","dark"],FI="(prefers-color-scheme: dark)",BI=d.createContext(void 0),EI={setTheme:t=>{},themes:[]},OI=()=>{var t;return(t=d.useContext(BI))!=null?t:EI};d.memo(({forcedTheme:t,storageKey:a,attribute:o,enableSystem:r,enableColorScheme:c,defaultTheme:i,value:l,attrs:h,nonce:y})=>{let p=i==="system",M=o==="class"?`var d=document.documentElement,c=d.classList;${`c.remove(${h.map(w=>`'${w}'`).join(",")})`};`:`var d=document.documentElement,n='${o}',s='setAttribute';`,k=c?Yx.includes(i)&&i?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${i}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",u=(w,m=!1,v=!0)=>{let C=l?l[w]:w,b=m?w+"|| ''":`'${C}'`,A="";return c&&v&&!m&&Yx.includes(w)&&(A+=`d.style.colorScheme = '${w}';`),o==="class"?m||C?A+=`c.add(${b})`:A+="null":C&&(A+=`d[s](n,${b})`),A},s=t?`!function(){${M}${u(t)}}()`:r?`!function(){try{${M}var e=localStorage.getItem('${a}');if('system'===e||(!e&&${p})){var t='${FI}',m=window.matchMedia(t);if(m.media!==t||m.matches){${u("dark")}}else{${u("light")}}}else if(e){${l?`var x=${JSON.stringify(l)};`:""}${u(l?"x[e]":"e",!0)}}${p?"":"else{"+u(i,!1,!1)+"}"}${k}}catch(e){}}()`:`!function(){try{${M}var e=localStorage.getItem('${a}');if(e){${l?`var x=${JSON.stringify(l)};`:""}${u(l?"x[e]":"e",!0)}}else{${u(i,!1,!1)};}${k}}catch(t){}}();`;return d.createElement("script",{nonce:y,dangerouslySetInnerHTML:{__html:s}})});var UI=t=>{switch(t){case"success":return GI;case"info":return WI;case"warning":return ZI;case"error":return XI;default:return null}},NI=Array(12).fill(0),_I=({visible:t,className:a})=>S.createElement("div",{className:["sonner-loading-wrapper",a].filter(Boolean).join(" "),"data-visible":t},S.createElement("div",{className:"sonner-spinner"},NI.map((o,r)=>S.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${r}`})))),GI=S.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},S.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),ZI=S.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},S.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),WI=S.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},S.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),XI=S.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},S.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),KI=S.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},S.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),S.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),$I=()=>{let[t,a]=S.useState(document.hidden);return S.useEffect(()=>{let o=()=>{a(document.hidden)};return document.addEventListener("visibilitychange",o),()=>window.removeEventListener("visibilitychange",o)},[]),t},lx=1,QI=class{constructor(){this.subscribe=t=>(this.subscribers.push(t),()=>{let a=this.subscribers.indexOf(t);this.subscribers.splice(a,1)}),this.publish=t=>{this.subscribers.forEach(a=>a(t))},this.addToast=t=>{this.publish(t),this.toasts=[...this.toasts,t]},this.create=t=>{var a;let{message:o,...r}=t,c=typeof(t==null?void 0:t.id)=="number"||((a=t.id)==null?void 0:a.length)>0?t.id:lx++,i=this.toasts.find(h=>h.id===c),l=t.dismissible===void 0?!0:t.dismissible;return this.dismissedToasts.has(c)&&this.dismissedToasts.delete(c),i?this.toasts=this.toasts.map(h=>h.id===c?(this.publish({...h,...t,id:c,title:o}),{...h,...t,id:c,dismissible:l,title:o}):h):this.addToast({title:o,...r,dismissible:l,id:c}),c},this.dismiss=t=>(this.dismissedToasts.add(t),t||this.toasts.forEach(a=>{this.subscribers.forEach(o=>o({id:a.id,dismiss:!0}))}),this.subscribers.forEach(a=>a({id:t,dismiss:!0})),t),this.message=(t,a)=>this.create({...a,message:t}),this.error=(t,a)=>this.create({...a,message:t,type:"error"}),this.success=(t,a)=>this.create({...a,type:"success",message:t}),this.info=(t,a)=>this.create({...a,type:"info",message:t}),this.warning=(t,a)=>this.create({...a,type:"warning",message:t}),this.loading=(t,a)=>this.create({...a,type:"loading",message:t}),this.promise=(t,a)=>{if(!a)return;let o;a.loading!==void 0&&(o=this.create({...a,promise:t,type:"loading",message:a.loading,description:typeof a.description!="function"?a.description:void 0}));let r=t instanceof Promise?t:t(),c=o!==void 0,i,l=r.then(async y=>{if(i=["resolve",y],S.isValidElement(y))c=!1,this.create({id:o,type:"default",message:y});else if(YI(y)&&!y.ok){c=!1;let p=typeof a.error=="function"?await a.error(`HTTP error! status: ${y.status}`):a.error,M=typeof a.description=="function"?await a.description(`HTTP error! status: ${y.status}`):a.description;this.create({id:o,type:"error",message:p,description:M})}else if(a.success!==void 0){c=!1;let p=typeof a.success=="function"?await a.success(y):a.success,M=typeof a.description=="function"?await a.description(y):a.description;this.create({id:o,type:"success",message:p,description:M})}}).catch(async y=>{if(i=["reject",y],a.error!==void 0){c=!1;let p=typeof a.error=="function"?await a.error(y):a.error,M=typeof a.description=="function"?await a.description(y):a.description;this.create({id:o,type:"error",message:p,description:M})}}).finally(()=>{var y;c&&(this.dismiss(o),o=void 0),(y=a.finally)==null||y.call(a)}),h=()=>new Promise((y,p)=>l.then(()=>i[0]==="reject"?p(i[1]):y(i[1])).catch(p));return typeof o!="string"&&typeof o!="number"?{unwrap:h}:Object.assign(o,{unwrap:h})},this.custom=(t,a)=>{let o=(a==null?void 0:a.id)||lx++;return this.create({jsx:t(o),id:o,...a}),o},this.getActiveToasts=()=>this.toasts.filter(t=>!this.dismissedToasts.has(t.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}},Le=new QI,JI=(t,a)=>{let o=(a==null?void 0:a.id)||lx++;return Le.addToast({title:t,...a,id:o}),o},YI=t=>t&&typeof t=="object"&&"ok"in t&&typeof t.ok=="boolean"&&"status"in t&&typeof t.status=="number",eS=JI,tS=()=>Le.toasts,aS=()=>Le.getActiveToasts(),FA=Object.assign(eS,{success:Le.success,info:Le.info,warning:Le.warning,error:Le.error,custom:Le.custom,message:Le.message,promise:Le.promise,dismiss:Le.dismiss,loading:Le.loading},{getHistory:tS,getToasts:aS});function oS(t,{insertAt:a}={}){if(typeof document>"u")return;let o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",a==="top"&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t))}oS(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);function en(t){return t.label!==void 0}var rS=3,nS="32px",cS="16px",ew=4e3,iS=356,dS=14,sS=20,hS=200;function Ve(...t){return t.filter(Boolean).join(" ")}function lS(t){let[a,o]=t.split("-"),r=[];return a&&r.push(a),o&&r.push(o),r}var yS=t=>{var a,o,r,c,i,l,h,y,p,M,k;let{invert:u,toast:s,unstyled:w,interacting:m,setHeights:v,visibleToasts:C,heights:b,index:A,toasts:z,expanded:T,removeToast:V,defaultRichColors:G,closeButton:R,style:I,cancelButtonStyle:D,actionButtonStyle:F,className:j="",descriptionClassName:ye="",duration:H,position:ne,gap:J,loadingIcon:de,expandByDefault:oe,classNames:L,icons:X,closeButtonAriaLabel:te="Close toast",pauseWhenPageIsHidden:U}=t,[Z,$]=S.useState(null),[pe,be]=S.useState(null),[Q,m1]=S.useState(!1),[ke,Qe]=S.useState(!1),[eo,x]=S.useState(!1),[f,q]=S.useState(!1),[P,W]=S.useState(!1),[ae,Me]=S.useState(0),[wC,Px]=S.useState(0),jo=S.useRef(s.duration||H||ew),zx=S.useRef(null),v1=S.useRef(null),LC=A===0,CC=A+1<=C,qe=s.type,to=s.dismissible!==!1,bC=s.className||"",IC=s.descriptionClassName||"",Kr=S.useMemo(()=>b.findIndex(B=>B.toastId===s.id)||0,[b,s.id]),SC=S.useMemo(()=>{var B;return(B=s.closeButton)!=null?B:R},[s.closeButton,R]),Hx=S.useMemo(()=>s.duration||H||ew,[s.duration,H]),Qg=S.useRef(0),ao=S.useRef(0),Vx=S.useRef(0),oo=S.useRef(null),[qC,AC]=ne.split("-"),Rx=S.useMemo(()=>b.reduce((B,Y,ce)=>ce>=Kr?B:B+Y.height,0),[b,Kr]),Dx=$I(),jC=s.invert||u,Jg=qe==="loading";ao.current=S.useMemo(()=>Kr*J+Rx,[Kr,Rx]),S.useEffect(()=>{jo.current=Hx},[Hx]),S.useEffect(()=>{m1(!0)},[]),S.useEffect(()=>{let B=v1.current;if(B){let Y=B.getBoundingClientRect().height;return Px(Y),v(ce=>[{toastId:s.id,height:Y,position:s.position},...ce]),()=>v(ce=>ce.filter(Pe=>Pe.toastId!==s.id))}},[v,s.id]),S.useLayoutEffect(()=>{if(!Q)return;let B=v1.current,Y=B.style.height;B.style.height="auto";let ce=B.getBoundingClientRect().height;B.style.height=Y,Px(ce),v(Pe=>Pe.find(ze=>ze.toastId===s.id)?Pe.map(ze=>ze.toastId===s.id?{...ze,height:ce}:ze):[{toastId:s.id,height:ce,position:s.position},...Pe])},[Q,s.title,s.description,v,s.id]);let Je=S.useCallback(()=>{Qe(!0),Me(ao.current),v(B=>B.filter(Y=>Y.toastId!==s.id)),setTimeout(()=>{V(s)},hS)},[s,V,v,ao]);S.useEffect(()=>{if(s.promise&&qe==="loading"||s.duration===1/0||s.type==="loading")return;let B;return T||m||U&&Dx?(()=>{if(Vx.current<Qg.current){let Y=new Date().getTime()-Qg.current;jo.current=jo.current-Y}Vx.current=new Date().getTime()})():jo.current!==1/0&&(Qg.current=new Date().getTime(),B=setTimeout(()=>{var Y;(Y=s.onAutoClose)==null||Y.call(s,s),Je()},jo.current)),()=>clearTimeout(B)},[T,m,s,qe,U,Dx,Je]),S.useEffect(()=>{s.delete&&Je()},[Je,s.delete]);function PC(){var B,Y,ce;return X!=null&&X.loading?S.createElement("div",{className:Ve(L==null?void 0:L.loader,(B=s==null?void 0:s.classNames)==null?void 0:B.loader,"sonner-loader"),"data-visible":qe==="loading"},X.loading):de?S.createElement("div",{className:Ve(L==null?void 0:L.loader,(Y=s==null?void 0:s.classNames)==null?void 0:Y.loader,"sonner-loader"),"data-visible":qe==="loading"},de):S.createElement(_I,{className:Ve(L==null?void 0:L.loader,(ce=s==null?void 0:s.classNames)==null?void 0:ce.loader),visible:qe==="loading"})}return S.createElement("li",{tabIndex:0,ref:v1,className:Ve(j,bC,L==null?void 0:L.toast,(a=s==null?void 0:s.classNames)==null?void 0:a.toast,L==null?void 0:L.default,L==null?void 0:L[qe],(o=s==null?void 0:s.classNames)==null?void 0:o[qe]),"data-sonner-toast":"","data-rich-colors":(r=s.richColors)!=null?r:G,"data-styled":!(s.jsx||s.unstyled||w),"data-mounted":Q,"data-promise":!!s.promise,"data-swiped":P,"data-removed":ke,"data-visible":CC,"data-y-position":qC,"data-x-position":AC,"data-index":A,"data-front":LC,"data-swiping":eo,"data-dismissible":to,"data-type":qe,"data-invert":jC,"data-swipe-out":f,"data-swipe-direction":pe,"data-expanded":!!(T||oe&&Q),style:{"--index":A,"--toasts-before":A,"--z-index":z.length-A,"--offset":`${ke?ae:ao.current}px`,"--initial-height":oe?"auto":`${wC}px`,...I,...s.style},onDragEnd:()=>{x(!1),$(null),oo.current=null},onPointerDown:B=>{Jg||!to||(zx.current=new Date,Me(ao.current),B.target.setPointerCapture(B.pointerId),B.target.tagName!=="BUTTON"&&(x(!0),oo.current={x:B.clientX,y:B.clientY}))},onPointerUp:()=>{var B,Y,ce,Pe;if(f||!to)return;oo.current=null;let ze=Number(((B=v1.current)==null?void 0:B.style.getPropertyValue("--swipe-amount-x").replace("px",""))||0),Ye=Number(((Y=v1.current)==null?void 0:Y.style.getPropertyValue("--swipe-amount-y").replace("px",""))||0),f1=new Date().getTime()-((ce=zx.current)==null?void 0:ce.getTime()),He=Z==="x"?ze:Ye,e1=Math.abs(He)/f1;if(Math.abs(He)>=sS||e1>.11){Me(ao.current),(Pe=s.onDismiss)==null||Pe.call(s,s),be(Z==="x"?ze>0?"right":"left":Ye>0?"down":"up"),Je(),q(!0),W(!1);return}x(!1),$(null)},onPointerMove:B=>{var Y,ce,Pe,ze;if(!oo.current||!to||((Y=window.getSelection())==null?void 0:Y.toString().length)>0)return;let Ye=B.clientY-oo.current.y,f1=B.clientX-oo.current.x,He=(ce=t.swipeDirections)!=null?ce:lS(ne);!Z&&(Math.abs(f1)>1||Math.abs(Ye)>1)&&$(Math.abs(f1)>Math.abs(Ye)?"x":"y");let e1={x:0,y:0};Z==="y"?(He.includes("top")||He.includes("bottom"))&&(He.includes("top")&&Ye<0||He.includes("bottom")&&Ye>0)&&(e1.y=Ye):Z==="x"&&(He.includes("left")||He.includes("right"))&&(He.includes("left")&&f1<0||He.includes("right")&&f1>0)&&(e1.x=f1),(Math.abs(e1.x)>0||Math.abs(e1.y)>0)&&W(!0),(Pe=v1.current)==null||Pe.style.setProperty("--swipe-amount-x",`${e1.x}px`),(ze=v1.current)==null||ze.style.setProperty("--swipe-amount-y",`${e1.y}px`)}},SC&&!s.jsx?S.createElement("button",{"aria-label":te,"data-disabled":Jg,"data-close-button":!0,onClick:Jg||!to?()=>{}:()=>{var B;Je(),(B=s.onDismiss)==null||B.call(s,s)},className:Ve(L==null?void 0:L.closeButton,(c=s==null?void 0:s.classNames)==null?void 0:c.closeButton)},(i=X==null?void 0:X.close)!=null?i:KI):null,s.jsx||d.isValidElement(s.title)?s.jsx?s.jsx:typeof s.title=="function"?s.title():s.title:S.createElement(S.Fragment,null,qe||s.icon||s.promise?S.createElement("div",{"data-icon":"",className:Ve(L==null?void 0:L.icon,(l=s==null?void 0:s.classNames)==null?void 0:l.icon)},s.promise||s.type==="loading"&&!s.icon?s.icon||PC():null,s.type!=="loading"?s.icon||(X==null?void 0:X[qe])||UI(qe):null):null,S.createElement("div",{"data-content":"",className:Ve(L==null?void 0:L.content,(h=s==null?void 0:s.classNames)==null?void 0:h.content)},S.createElement("div",{"data-title":"",className:Ve(L==null?void 0:L.title,(y=s==null?void 0:s.classNames)==null?void 0:y.title)},typeof s.title=="function"?s.title():s.title),s.description?S.createElement("div",{"data-description":"",className:Ve(ye,IC,L==null?void 0:L.description,(p=s==null?void 0:s.classNames)==null?void 0:p.description)},typeof s.description=="function"?s.description():s.description):null),d.isValidElement(s.cancel)?s.cancel:s.cancel&&en(s.cancel)?S.createElement("button",{"data-button":!0,"data-cancel":!0,style:s.cancelButtonStyle||D,onClick:B=>{var Y,ce;en(s.cancel)&&to&&((ce=(Y=s.cancel).onClick)==null||ce.call(Y,B),Je())},className:Ve(L==null?void 0:L.cancelButton,(M=s==null?void 0:s.classNames)==null?void 0:M.cancelButton)},s.cancel.label):null,d.isValidElement(s.action)?s.action:s.action&&en(s.action)?S.createElement("button",{"data-button":!0,"data-action":!0,style:s.actionButtonStyle||F,onClick:B=>{var Y,ce;en(s.action)&&((ce=(Y=s.action).onClick)==null||ce.call(Y,B),!B.defaultPrevented&&Je())},className:Ve(L==null?void 0:L.actionButton,(k=s==null?void 0:s.classNames)==null?void 0:k.actionButton)},s.action.label):null))};function tw(){if(typeof window>"u"||typeof document>"u")return"ltr";let t=document.documentElement.getAttribute("dir");return t==="auto"||!t?window.getComputedStyle(document.documentElement).direction:t}function pS(t,a){let o={};return[t,a].forEach((r,c)=>{let i=c===1,l=i?"--mobile-offset":"--offset",h=i?cS:nS;function y(p){["top","right","bottom","left"].forEach(M=>{o[`${l}-${M}`]=typeof p=="number"?`${p}px`:p})}typeof r=="number"||typeof r=="string"?y(r):typeof r=="object"?["top","right","bottom","left"].forEach(p=>{r[p]===void 0?o[`${l}-${p}`]=h:o[`${l}-${p}`]=typeof r[p]=="number"?`${r[p]}px`:r[p]}):y(h)}),o}var uS=d.forwardRef(function(t,a){let{invert:o,position:r="bottom-right",hotkey:c=["altKey","KeyT"],expand:i,closeButton:l,className:h,offset:y,mobileOffset:p,theme:M="light",richColors:k,duration:u,style:s,visibleToasts:w=rS,toastOptions:m,dir:v=tw(),gap:C=dS,loadingIcon:b,icons:A,containerAriaLabel:z="Notifications",pauseWhenPageIsHidden:T}=t,[V,G]=S.useState([]),R=S.useMemo(()=>Array.from(new Set([r].concat(V.filter(U=>U.position).map(U=>U.position)))),[V,r]),[I,D]=S.useState([]),[F,j]=S.useState(!1),[ye,H]=S.useState(!1),[ne,J]=S.useState(M!=="system"?M:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),de=S.useRef(null),oe=c.join("+").replace(/Key/g,"").replace(/Digit/g,""),L=S.useRef(null),X=S.useRef(!1),te=S.useCallback(U=>{G(Z=>{var $;return($=Z.find(pe=>pe.id===U.id))!=null&&$.delete||Le.dismiss(U.id),Z.filter(({id:pe})=>pe!==U.id)})},[]);return S.useEffect(()=>Le.subscribe(U=>{if(U.dismiss){G(Z=>Z.map($=>$.id===U.id?{...$,delete:!0}:$));return}setTimeout(()=>{ab.flushSync(()=>{G(Z=>{let $=Z.findIndex(pe=>pe.id===U.id);return $!==-1?[...Z.slice(0,$),{...Z[$],...U},...Z.slice($+1)]:[U,...Z]})})})}),[]),S.useEffect(()=>{if(M!=="system"){J(M);return}if(M==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?J("dark"):J("light")),typeof window>"u")return;let U=window.matchMedia("(prefers-color-scheme: dark)");try{U.addEventListener("change",({matches:Z})=>{J(Z?"dark":"light")})}catch{U.addListener(({matches:$})=>{try{J($?"dark":"light")}catch(pe){console.error(pe)}})}},[M]),S.useEffect(()=>{V.length<=1&&j(!1)},[V]),S.useEffect(()=>{let U=Z=>{var $,pe;c.every(be=>Z[be]||Z.code===be)&&(j(!0),($=de.current)==null||$.focus()),Z.code==="Escape"&&(document.activeElement===de.current||(pe=de.current)!=null&&pe.contains(document.activeElement))&&j(!1)};return document.addEventListener("keydown",U),()=>document.removeEventListener("keydown",U)},[c]),S.useEffect(()=>{if(de.current)return()=>{L.current&&(L.current.focus({preventScroll:!0}),L.current=null,X.current=!1)}},[de.current]),S.createElement("section",{ref:a,"aria-label":`${z} ${oe}`,tabIndex:-1,"aria-live":"polite","aria-relevant":"additions text","aria-atomic":"false",suppressHydrationWarning:!0},R.map((U,Z)=>{var $;let[pe,be]=U.split("-");return V.length?S.createElement("ol",{key:U,dir:v==="auto"?tw():v,tabIndex:-1,ref:de,className:h,"data-sonner-toaster":!0,"data-theme":ne,"data-y-position":pe,"data-lifted":F&&V.length>1&&!i,"data-x-position":be,style:{"--front-toast-height":`${(($=I[0])==null?void 0:$.height)||0}px`,"--width":`${iS}px`,"--gap":`${C}px`,...s,...pS(y,p)},onBlur:Q=>{X.current&&!Q.currentTarget.contains(Q.relatedTarget)&&(X.current=!1,L.current&&(L.current.focus({preventScroll:!0}),L.current=null))},onFocus:Q=>{Q.target instanceof HTMLElement&&Q.target.dataset.dismissible==="false"||X.current||(X.current=!0,L.current=Q.relatedTarget)},onMouseEnter:()=>j(!0),onMouseMove:()=>j(!0),onMouseLeave:()=>{ye||j(!1)},onDragEnd:()=>j(!1),onPointerDown:Q=>{Q.target instanceof HTMLElement&&Q.target.dataset.dismissible==="false"||H(!0)},onPointerUp:()=>H(!1)},V.filter(Q=>!Q.position&&Z===0||Q.position===U).map((Q,m1)=>{var ke,Qe;return S.createElement(yS,{key:Q.id,icons:A,index:m1,toast:Q,defaultRichColors:k,duration:(ke=m==null?void 0:m.duration)!=null?ke:u,className:m==null?void 0:m.className,descriptionClassName:m==null?void 0:m.descriptionClassName,invert:o,visibleToasts:w,closeButton:(Qe=m==null?void 0:m.closeButton)!=null?Qe:l,interacting:ye,position:U,style:m==null?void 0:m.style,unstyled:m==null?void 0:m.unstyled,classNames:m==null?void 0:m.classNames,cancelButtonStyle:m==null?void 0:m.cancelButtonStyle,actionButtonStyle:m==null?void 0:m.actionButtonStyle,removeToast:te,toasts:V.filter(eo=>eo.position==Q.position),heights:I.filter(eo=>eo.position==Q.position),setHeights:D,expandByDefault:i,gap:C,loadingIcon:b,expanded:F,pauseWhenPageIsHidden:T,swipeDirections:t.swipeDirections})})):null}))});const kS=({...t})=>{const{theme:a="system"}=OI();return n.jsx(uS,{theme:a,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})},MS=TC,BA=FC,EA=BC,mS=d.forwardRef(({className:t,sideOffset:a=4,...o},r)=>n.jsx(vw,{ref:r,sideOffset:a,className:ee("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...o}));mS.displayName=vw.displayName;const vS={theme:"system",setTheme:()=>null},yL=d.createContext(vS);function fS({children:t,defaultTheme:a="system",storageKey:o="vite-ui-theme",...r}){const[c,i]=d.useState(()=>localStorage.getItem(o)||a);d.useEffect(()=>{const h=window.document.documentElement;if(h.classList.remove("light","dark"),c==="system"){const y=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";h.classList.add(y);return}h.classList.add(c)},[c]);const l={theme:c,setTheme:h=>{localStorage.setItem(o,h),i(h)}};return n.jsx(yL.Provider,{...r,value:l,children:t})}const gS=()=>{const t=d.useContext(yL);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t},xS="https://zdaoeuthpztxonytbcww.supabase.co",wS="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYW9ldXRocHp0eG9ueXRiY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQyMzQsImV4cCI6MjA3MDc3MDIzNH0.7ww6j9lgyrQfxOP825gM-1S3M9QboMojamNHJYWe2as",O=nb(xS,wS,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),pL=d.createContext(void 0),Zr=()=>{const t=d.useContext(pL);if(!t)throw new Error("useAuth must be used within an AuthProvider");return t},LS=({children:t})=>{const[a,o]=d.useState(null),[r,c]=d.useState(null),[i,l]=d.useState(null),[h,y]=d.useState([]),[p,M]=d.useState(!0),{toast:k}=Mx(),u=async R=>{try{const{data:I,error:D}=await O.from("profiles").select("*").eq("user_id",R).single();return D?null:I}catch{return null}},s=async R=>{try{const{data:I,error:D}=await O.from("user_roles").select("role").eq("user_id",R);return D?[]:(I||[]).map(F=>F.role)}catch{return[]}},w=async()=>{if(a){const R=await u(a.id),I=await s(a.id);l(R),y(I)}};d.useEffect(()=>{if(sessionStorage.getItem("planix:session-only")){const I=()=>{document.hidden&&(O.auth.signOut(),sessionStorage.removeItem("planix:session-only"))};return window.addEventListener("pagehide",I),()=>window.removeEventListener("pagehide",I)}},[]),d.useEffect(()=>{const{data:{subscription:R}}=O.auth.onAuthStateChange(async(I,D)=>{c(D),o((D==null?void 0:D.user)??null),D!=null&&D.user?setTimeout(async()=>{const F=await u(D.user.id),j=await s(D.user.id);l(F),y(j),M(!1)},0):(l(null),y([]),M(!1))});return O.auth.getSession().then(({data:{session:I}})=>{c(I),o((I==null?void 0:I.user)??null),I!=null&&I.user?setTimeout(async()=>{const D=await u(I.user.id),F=await s(I.user.id);l(D),y(F),M(!1)},0):M(!1)}),()=>R.unsubscribe()},[]);const m=async(R,I,D)=>{try{const F=`${window.location.origin}/`,{error:j}=await O.auth.signUp({email:R,password:I,options:{emailRedirectTo:F,data:{full_name:D}}});return j?(k({title:"Erro no cadastro",description:j.message,variant:"destructive"}),{error:j}):(k({title:"Cadastro realizado!",description:"Verifique seu email para confirmar a conta."}),{error:null})}catch(F){return k({title:"Erro no cadastro",description:F.message,variant:"destructive"}),{error:F}}},v=async(R,I,D=!0)=>{try{const{error:F}=await O.auth.signInWithPassword({email:R,password:I});return!F&&!D?sessionStorage.setItem("planix:session-only","1"):sessionStorage.removeItem("planix:session-only"),F?(k({title:"Erro no login",description:F.message,variant:"destructive"}),{error:F}):(setTimeout(async()=>{try{await O.functions.invoke("check-subscription")}catch(j){console.log("Erro ao verificar assinatura:",j)}},1e3),k({title:"Login realizado com sucesso!",description:"Bem-vindo ao PLANIX"}),{error:null})}catch(F){return k({title:"Erro no login",description:F.message,variant:"destructive"}),{error:F}}},C=async()=>{try{const{error:R}=await O.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${window.location.origin}/`}});return R?(k({title:"Erro no login com Google",description:R.message,variant:"destructive"}),{error:R}):{error:null}}catch(R){return k({title:"Erro no login com Google",description:R.message,variant:"destructive"}),{error:R}}},b=async()=>{try{const{error:R}=await O.auth.signOut();if(R){k({title:"Erro ao sair",description:R.message,variant:"destructive"});return}o(null),c(null),l(null),y([]),k({title:"Logout realizado",description:"Até logo!"})}catch(R){k({title:"Erro ao sair",description:R.message,variant:"destructive"})}},A=i!=null&&i.trial_end?new Date(i.trial_end)<new Date:!1,z=i!=null&&i.subscription_end?new Date(i.subscription_end)>new Date:!1,T=i!=null&&i.subscription_end?new Date(i.subscription_end)<new Date:!0,V=h.includes("admin"),G={user:a,session:r,profile:i,userRoles:h,isAdmin:V,loading:p,signUp:m,signIn:v,signInWithGoogle:C,signOut:b,isTrialExpired:A,hasActiveSubscription:z,isSubscriptionExpired:T,refreshProfile:w};return n.jsx(pL.Provider,{value:G,children:t})},CS=()=>{const{user:t}=Zr(),[a,o]=d.useState([]),[r,c]=d.useState([]),[i,l]=d.useState([]),[h,y]=d.useState([]),[p,M]=d.useState([]),[k,u]=d.useState([]),[s,w]=d.useState([]),[m,v]=d.useState([]),[C,b]=d.useState(!0),A=async()=>{if(t)try{const{data:x,error:f}=await O.from("accounts").select("*").eq("user_id",t.id).eq("is_active",!0).order("created_at",{ascending:!1});if(f)throw f;o(x||[])}catch(x){console.error("Error fetching accounts:",x)}},z=async()=>{if(t)try{const{data:x,error:f}=await O.from("credit_cards").select("*").eq("user_id",t.id).eq("is_active",!0).order("created_at",{ascending:!1});if(f)throw f;c(x||[])}catch(x){console.error("Error fetching credit cards:",x)}},T=async()=>{if(t)try{const{data:x,error:f}=await O.from("categories").select("*").eq("user_id",t.id).order("is_default",{ascending:!1});if(f)throw f;l(x||[])}catch(x){console.error("Error fetching categories:",x)}},V=async()=>{if(t)try{const{data:x,error:f}=await O.from("transactions").select(`
          *,
          category:categories(*),
          account:accounts!account_id(*),
          credit_card:credit_cards(*),
          contact:contacts(*)
        `).eq("user_id",t.id).order("date",{ascending:!1});if(f)throw f;y(x||[])}catch(x){console.error("Error fetching transactions:",x)}},G=async()=>{if(t)try{const{data:x,error:f}=await O.from("investments").select("*").eq("user_id",t.id).order("created_at",{ascending:!1});if(f)throw f;M(x||[])}catch(x){console.error("Error fetching investments:",x)}},R=async()=>{if(t)try{const{data:x,error:f}=await O.from("credit_card_invoices").select("*").eq("user_id",t.id).order("year",{ascending:!1}).order("month",{ascending:!1});if(f){console.error("Error fetching credit card invoices:",f);return}w(x||[])}catch(x){console.error("Error fetching credit card invoices:",x)}},I=async()=>{if(t)try{const{data:x,error:f}=await O.from("goals").select("*").eq("user_id",t.id).order("created_at",{ascending:!1});if(f)throw f;u(x||[])}catch(x){console.error("Error fetching goals:",x)}},D=async()=>{if(t)try{const{data:x,error:f}=await O.from("contacts").select("*").eq("user_id",t.id).order("name");if(f)throw f;v(x||[])}catch(x){console.error("Error fetching contacts:",x)}},F=d.useCallback(async()=>{t&&(b(!0),await Promise.all([A(),z(),T(),V(),G(),I(),R(),D()]),b(!1))},[t==null?void 0:t.id]);d.useEffect(()=>{F()},[F]);const j=async x=>{if(t)try{const{data:f,error:q}=await O.from("accounts").insert([{...x,user_id:t.id,current_balance:x.initial_balance||0}]).select().single();if(q)throw q;return o(P=>[f,...P]),f}catch(f){throw console.error("Error adding account:",f),f}},ye=async(x,f)=>{if(!t)throw new Error("User not authenticated");try{const{data:q,error:P}=await O.from("accounts").update(f).eq("id",x).eq("user_id",t.id).select().single();if(P)throw P;return o(W=>W.map(ae=>ae.id===x?q:ae)),q}catch(q){throw q}},H=async x=>{if(!t)throw new Error("User not authenticated");try{await O.from("transactions").delete().eq("account_id",x).eq("user_id",t.id);const{error:f}=await O.from("accounts").delete().eq("id",x).eq("user_id",t.id);if(f)throw f;o(q=>q.filter(P=>P.id!==x)),await V()}catch(f){throw f}},ne=async x=>{if(t)try{const{data:f,error:q}=await O.from("credit_cards").insert([{...x,user_id:t.id}]).select().single();if(q)throw q;return c(P=>[f,...P]),f}catch(f){throw console.error("Error adding credit card:",f),f}},J=async(x,f)=>{if(!t)throw new Error("User not authenticated");try{const{data:q,error:P}=await O.from("credit_cards").update(f).eq("id",x).eq("user_id",t.id).select().single();if(P)throw P;return c(W=>W.map(ae=>ae.id===x?q:ae)),q}catch(q){throw q}},de=async x=>{if(!t)throw new Error("User not authenticated");try{await O.from("transactions").delete().eq("credit_card_id",x).eq("user_id",t.id);const{error:f}=await O.from("credit_cards").delete().eq("id",x).eq("user_id",t.id);if(f)throw f;c(q=>q.filter(P=>P.id!==x)),await V()}catch(f){throw f}},oe=async x=>{if(t)try{const{data:f,error:q}=await O.from("transactions").insert([{...x,user_id:t.id}]).select(`
          *,
          category:categories(*),
          account:accounts!account_id(*),
          credit_card:credit_cards(*),
          contact:contacts(*)
        `).single();if(q)throw q;if(x.account_id){const P=a.find(W=>W.id===x.account_id);if(P){const W=(P.current_balance||0)+(x.amount||0);await ye(x.account_id,{current_balance:W})}}if(x.credit_card_id){const P=r.find(W=>W.id===x.credit_card_id);if(P){const W=(P.current_balance||0)+Math.abs(x.amount||0);await J(x.credit_card_id,{current_balance:W})}}return y(P=>[f,...P]),f}catch(f){throw console.error("Error adding transaction:",f),f}};return{accounts:a,creditCards:r,categories:i,transactions:h,investments:p,goals:k,creditCardInvoices:s,contacts:m,loading:C,fetchAllData:F,fetchContacts:D,addAccount:j,updateAccount:ye,deleteAccount:H,addCreditCard:ne,updateCreditCard:J,deleteCreditCard:de,addTransaction:oe,updateTransaction:async(x,f)=>{if(!t)throw new Error("User not authenticated");try{const q=h.find(ae=>ae.id===x);if(!q)throw new Error("Transaction not found");const{data:P,error:W}=await O.from("transactions").update({...f,amount:f.type==="expense"&&f.amount?-Math.abs(f.amount):f.amount}).eq("id",x).eq("user_id",t.id).select(`
          *,
          category:categories(*),
          account:accounts!account_id(*),
          credit_card:credit_cards(*),
          contact:contacts(*)
        `).single();if(W)throw W;if(q.account_id){const ae=a.find(Me=>Me.id===q.account_id);if(ae){let Me=(ae.current_balance||0)-(q.amount||0);Me+=P.amount||0,await ye(q.account_id,{current_balance:Me})}}if(q.credit_card_id){const ae=r.find(Me=>Me.id===q.credit_card_id);if(ae){let Me=(ae.current_balance||0)-Math.abs(q.amount||0);Me+=Math.abs(P.amount||0),await J(q.credit_card_id,{current_balance:Me})}}return y(ae=>ae.map(Me=>Me.id===x?P:Me)),P}catch(q){throw console.error("Error updating transaction:",q),q}},deleteTransaction:async x=>{if(!t)throw new Error("User not authenticated");try{const f=h.find(P=>P.id===x),{error:q}=await O.from("transactions").delete().eq("id",x).eq("user_id",t.id);if(q)throw q;if(f!=null&&f.account_id){const P=a.find(W=>W.id===f.account_id);if(P){const W=(P.current_balance||0)-(f.amount||0);await ye(f.account_id,{current_balance:W})}}if(f!=null&&f.credit_card_id){const P=r.find(W=>W.id===f.credit_card_id);if(P){const W=(P.current_balance||0)-Math.abs(f.amount||0);await J(f.credit_card_id,{current_balance:W})}}y(P=>P.filter(W=>W.id!==x))}catch(f){throw console.error("Error deleting transaction:",f),f}},addInvestment:async x=>{if(t)try{const{data:f,error:q}=await O.from("investments").insert([{...x,user_id:t.id}]).select().single();if(q)throw q;return M(P=>[f,...P]),f}catch(f){throw console.error("Error adding investment:",f),f}},updateInvestment:async(x,f)=>{if(!t)throw new Error("User not authenticated");try{const{data:q,error:P}=await O.from("investments").update(f).eq("id",x).eq("user_id",t.id).select().single();if(P)throw P;return M(W=>W.map(ae=>ae.id===x?q:ae)),q}catch(q){throw q}},deleteInvestment:async x=>{if(!t)throw new Error("User not authenticated");try{const{error:f}=await O.from("investments").delete().eq("id",x).eq("user_id",t.id);if(f)throw f;M(q=>q.filter(P=>P.id!==x))}catch(f){throw f}},addGoal:async x=>{if(t)try{const{data:f,error:q}=await O.from("goals").insert([{...x,user_id:t.id}]).select().single();if(q)throw q;return u(P=>[f,...P]),f}catch(f){throw console.error("Error adding goal:",f),f}},updateGoal:async(x,f)=>{if(!t)throw new Error("User not authenticated");try{const{data:q,error:P}=await O.from("goals").update(f).eq("id",x).eq("user_id",t.id).select().single();if(P)throw P;return u(W=>W.map(ae=>ae.id===x?q:ae)),q}catch(q){throw q}},deleteGoal:async x=>{if(!t)throw new Error("User not authenticated");try{const{error:f}=await O.from("goals").delete().eq("id",x).eq("user_id",t.id);if(f)throw f;u(q=>q.filter(P=>P.id!==x))}catch(f){throw f}},addCreditCardInvoice:async x=>{if(!t)throw new Error("User not authenticated");const{data:f,error:q}=await O.from("credit_card_invoices").insert([{...x,user_id:t.id}]).select().single();if(q)throw q;return w(P=>[f,...P]),f},updateCreditCardInvoice:async(x,f)=>{if(!t)throw new Error("User not authenticated");const{data:q,error:P}=await O.from("credit_card_invoices").update(f).eq("id",x).eq("user_id",t.id).select().single();if(P)throw P;return w(W=>W.map(ae=>ae.id===x?q:ae)),q},upsertCreditCardInvoice:async x=>{if(!t)throw new Error("User not authenticated");const{data:f,error:q}=await O.from("credit_card_invoices").upsert([{...x,user_id:t.id}],{onConflict:"credit_card_id,month,year"}).select().single();if(q)throw q;return await R(),f},getOrCreateInvestmentAccount:async()=>{let x=a.find(q=>q.type==="investment"&&q.name==="Investimentos");if(x)return x;if(t){const{data:q}=await O.from("accounts").select("*").eq("user_id",t.id).eq("type","investment").eq("name","Investimentos").maybeSingle();if(q)return x=q,x}const f=await j({name:"Investimentos",type:"investment",initial_balance:0,currency:"BRL",is_active:!0});if(!f)throw new Error("Falha ao criar conta de investimentos");return await F(),f},addTransfer:async x=>{if(!t)return;const f=Math.abs(x.amount);await oe({user_id:t.id,description:x.description,amount:-f,type:"transfer",category_id:null,account_id:x.fromAccountId,credit_card_id:null,date:x.date,currency:"BRL",notes:x.notes,installments:1,installment_number:1,is_installment:!1,investment_metadata:x.investmentMetadata??null}),await oe({user_id:t.id,description:x.description,amount:f,type:"transfer",category_id:null,account_id:x.toAccountId,credit_card_id:null,date:x.date,currency:"BRL",notes:x.notes,installments:1,installment_number:1,is_installment:!1,investment_metadata:x.investmentMetadata??null})}}},bS=d.createContext(void 0),IS=({children:t})=>{const{transactions:a,accounts:o}=CS(),r={transactions:a,accounts:o};return n.jsx(bS.Provider,{value:r,children:t})},uL=d.createContext(void 0),OA=()=>{const t=d.useContext(uL);if(!t)throw new Error("useCurrency must be used within a CurrencyProvider");return t},aw=[{code:"BRL",symbol:"R$",name:"Real Brasileiro",rate:1},{code:"USD",symbol:"$",name:"Dólar Americano",rate:5.2},{code:"EUR",symbol:"€",name:"Euro",rate:5.6},{code:"GBP",symbol:"£",name:"Libra Esterlina",rate:6.5},{code:"JPY",symbol:"¥",name:"Iene Japonês",rate:.035},{code:"CAD",symbol:"C$",name:"Dólar Canadense",rate:3.8},{code:"AUD",symbol:"A$",name:"Dólar Australiano",rate:3.4},{code:"CHF",symbol:"CHF",name:"Franco Suíço",rate:5.8}],SS=({children:t})=>{const[a,o]=d.useState(aw),[r,c]=d.useState(aw[0]);d.useEffect(()=>{const p=localStorage.getItem("selectedCurrency");if(p){const M=JSON.parse(p);c(M)}},[]),d.useEffect(()=>{localStorage.setItem("selectedCurrency",JSON.stringify(r))},[r]);const y={currencies:a,selectedCurrency:r,setSelectedCurrency:c,formatCurrency:(p,M)=>{const k=M&&a.find(w=>w.code===M)||r,u=p<0,s=Math.abs(p).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});return`${u?"− ":""}${k.symbol} ${s}`},convertToBRL:(p,M)=>{const k=a.find(u=>u.code===M);return!k||M==="BRL"?p:p*k.rate},convertFromBRL:(p,M)=>{const k=a.find(u=>u.code===M);return!k||M==="BRL"?p:p/k.rate}};return n.jsx(uL.Provider,{value:y,children:t})},kL=d.createContext(void 0),UA=()=>{const t=d.useContext(kL);if(!t)throw new Error("useCategories must be used within a CategoriesProvider");return t},tn={Home:Ne,Car:io,ShoppingCart:br,Utensils:Xe,GamepadIcon:yo,Shirt:Cr,Heart:po,GraduationCap:tr,Plane:mr,Gift:Yo,Briefcase:co,Coins:_o,PiggyBank:kr,TrendingUp:mo,folder:y1,Folder:y1,Coffee:No,Pizza:Mr,Fuel:Jo,Zap:Tr,Wifi:Rr,Smartphone:Mo,Laptop:uo,Camera:Oo,Music:lr,Video:Vr,Book:no,Pen:n1,Clock:l1,Calendar:Eo,MapPin:ir,Globe:er,Shield:Lr,Key:nr,Lock:ko,Unlock:r1,Eye:$2,EyeOff:K2,Bell:Fo,Mail:cr,Phone:ur,MessageCircle:dr,Users:Hr,User:zr,Settings:xr,Wrench:Dr,Hammer:ar,Scissors:gr,Paperclip:yr,Flag:Qo,Tag:Ar,Bookmark:Bo,Archive:Do,Download:Xo,Upload:Pr,Share:wr,Copy:Go,AtSign:To,Hash:or,Percent:pr,DollarSign:Wo,Euro:$o,Plus:vr,Minus:sr,X:Q2,Equal:Ko,Star:Sr,Circle:ho,Square:Ir,Triangle:jr,Diamond:Zo,Hexagon:rr,home:Ne,car:io,utensils:Xe,heart:po,book:no,"gamepad-2":yo,briefcase:co,laptop:uo,"trending-up":mo},qS=({children:t})=>{const{user:a}=Zr(),[o,r]=d.useState([]),[c,i]=d.useState(!0),l=async()=>{if(!a){r([]),i(!1);return}try{const{data:u,error:s}=await O.from("categories").select("*").eq("user_id",a.id).order("is_default",{ascending:!1}).order("name");if(s)throw s;const w=(u||[]).filter(m=>m.type==="income"||m.type==="expense").map(m=>({id:m.id,name:m.name,type:m.type,icon:m.icon||"Folder",color:m.color||"#6B7280",is_default:m.is_default||!1,user_id:m.user_id}));r(w)}catch(u){console.error("Error fetching categories:",u)}finally{i(!1)}};d.useEffect(()=>{l()},[a]);const k={categories:o,addCategory:async u=>{if(!a)return null;try{const{data:s,error:w}=await O.from("categories").insert([{...u,user_id:a.id,is_default:!1}]).select().single();if(w)throw w;const m={id:s.id,name:s.name,type:s.type,icon:s.icon||"Folder",color:s.color||"#6B7280",is_default:s.is_default||!1,user_id:s.user_id};return r(v=>[...v,m]),m}catch(s){throw console.error("Error adding category:",s),s}},updateCategory:async(u,s)=>{try{const{error:w}=await O.from("categories").update(s).eq("id",u);if(w)throw w;r(m=>m.map(v=>v.id===u?{...v,...s}:v))}catch(w){throw console.error("Error updating category:",w),w}},deleteCategory:async u=>{try{const{error:s}=await O.from("categories").delete().eq("id",u);if(s)throw s;r(w=>w.filter(m=>m.id!==u))}catch(s){throw console.error("Error deleting category:",s),s}},getCategoryIcon:u=>{if(!u)return y1;if(tn[u])return tn[u];const s=u.charAt(0).toUpperCase()+u.slice(1);if(tn[s])return tn[s];const w=$x[u]||$x[s];return w||y1},loading:c,refetch:l};return n.jsx(kL.Provider,{value:k,children:t})},ow="planix-privacy-enabled",ML=d.createContext(void 0),AS=({children:t})=>{const[a,o]=d.useState(()=>{try{return localStorage.getItem(ow)==="true"}catch{return!1}});d.useEffect(()=>{try{localStorage.setItem(ow,String(a))}catch{}},[a]);const r=d.useCallback(()=>{o(i=>!i)},[]),c=d.useCallback(i=>a?"• • • • •":i,[a]);return n.jsx(ML.Provider,{value:{isPrivacyEnabled:a,togglePrivacy:r,hideValue:c},children:t})},NA=()=>{const t=d.useContext(ML);if(!t)throw new Error("usePrivacy must be used within a PrivacyProvider");return t},jS=Zg("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),Ce=d.forwardRef(({className:t,variant:a,size:o,asChild:r=!1,...c},i)=>{const l=r?EC:"button";return n.jsx(l,{className:ee(jS({variant:a,size:o,className:t})),ref:i,...c})});Ce.displayName="Button";const u1=d.forwardRef(({className:t,...a},o)=>n.jsx("div",{ref:o,className:ee("rounded-lg border bg-card text-card-foreground shadow-sm",t),...a}));u1.displayName="Card";const k1=d.forwardRef(({className:t,...a},o)=>n.jsx("div",{ref:o,className:ee("flex flex-col space-y-1.5 p-6",t),...a}));k1.displayName="CardHeader";const Er=d.forwardRef(({className:t,...a},o)=>n.jsx("h3",{ref:o,className:ee("text-2xl font-semibold leading-none tracking-tight",t),...a}));Er.displayName="CardTitle";const xx=d.forwardRef(({className:t,...a},o)=>n.jsx("p",{ref:o,className:ee("text-sm text-muted-foreground",t),...a}));xx.displayName="CardDescription";const M1=d.forwardRef(({className:t,...a},o)=>n.jsx("div",{ref:o,className:ee("p-6 pt-0",t),...a}));M1.displayName="CardContent";const PS=d.forwardRef(({className:t,...a},o)=>n.jsx("div",{ref:o,className:ee("flex items-center p-6 pt-0",t),...a}));PS.displayName="CardFooter";const zS=()=>{const[t,a]=d.useState(null),[o,r]=d.useState(!1);d.useEffect(()=>{if(window.matchMedia("(display-mode: standalone)").matches)return;const l=localStorage.getItem("installPromptDismissed");if(l){const y=parseInt(l);if((Date.now()-y)/(1e3*60*60*24)<7)return}const h=y=>{y.preventDefault(),a(y),setTimeout(()=>r(!0),3e3)};return window.addEventListener("beforeinstallprompt",h),()=>{window.removeEventListener("beforeinstallprompt",h)}},[]);const c=async()=>{if(!t)return;t.prompt();const{outcome:l}=await t.userChoice;l==="accepted"&&(r(!1),a(null))},i=()=>{r(!1),localStorage.setItem("installPromptDismissed",Date.now().toString())};return o?n.jsx("div",{className:"fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96",children:n.jsxs(u1,{className:"shadow-lg border-primary/20",children:[n.jsxs(k1,{className:"pb-3",children:[n.jsxs("div",{className:"flex items-start justify-between",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(Mo,{className:"h-5 w-5 text-primary"}),n.jsx(Er,{className:"text-lg",children:"Instalar Planix"})]}),n.jsx(Ce,{variant:"ghost",size:"icon",className:"h-6 w-6",onClick:i,children:n.jsx(Q2,{className:"h-4 w-4"})})]}),n.jsx(xx,{children:"Adicione à tela inicial para acesso rápido e offline"})]}),n.jsxs(M1,{className:"flex gap-2",children:[n.jsx(Ce,{onClick:c,className:"flex-1",children:"Instalar"}),n.jsx(Ce,{onClick:i,variant:"outline",children:"Agora não"})]})]})}):null};class HS extends d.Component{constructor(){super(...arguments);$r(this,"state",{hasError:!1,error:null});$r(this,"handleReload",()=>{window.location.reload()});$r(this,"handleGoHome",()=>{window.location.href="/dashboard"})}static getDerivedStateFromError(o){return{hasError:!0,error:o}}componentDidCatch(o,r){}render(){return this.state.hasError?this.props.fallback?this.props.fallback:n.jsx("div",{className:"min-h-screen flex items-center justify-center p-6 bg-background",children:n.jsxs("div",{className:"max-w-md w-full text-center space-y-6",children:[n.jsx("div",{className:"mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center",children:n.jsx(We,{className:"w-8 h-8 text-destructive"})}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("h2",{className:"text-xl font-semibold text-foreground",children:"Algo deu errado"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"Ocorreu um erro inesperado. Tente recarregar a página ou voltar ao início."})]}),!1,n.jsxs("div",{className:"flex gap-3 justify-center",children:[n.jsxs("button",{onClick:this.handleReload,className:"inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors",children:[n.jsx(fr,{className:"w-4 h-4"}),"Recarregar"]}),n.jsxs("button",{onClick:this.handleGoHome,className:"inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-colors",children:[n.jsx(Ne,{className:"w-4 h-4"}),"Início"]})]})]})}):this.props.children}}function ue({className:t,...a}){return n.jsx("div",{className:ee("animate-pulse rounded-md bg-muted",t),...a})}function _A(){return n.jsxs("div",{className:"p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 animate-in fade-in duration-300",children:[n.jsxs("div",{className:"flex flex-col gap-3",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsxs("div",{className:"space-y-2",children:[n.jsx(ue,{className:"h-8 w-48"}),n.jsx(ue,{className:"h-4 w-64"})]}),n.jsx(ue,{className:"h-9 w-32"})]}),n.jsx(ue,{className:"h-12 w-full rounded-lg"})]}),n.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",children:Array.from({length:4}).map((t,a)=>n.jsxs(u1,{children:[n.jsxs(k1,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[n.jsx(ue,{className:"h-4 w-24"}),n.jsx(ue,{className:"h-4 w-4 rounded"})]}),n.jsxs(M1,{children:[n.jsx(ue,{className:"h-7 w-32 mb-2"}),n.jsx(ue,{className:"h-3 w-40"})]})]},a))}),n.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:Array.from({length:2}).map((t,a)=>n.jsxs(u1,{children:[n.jsxs(k1,{children:[n.jsx(ue,{className:"h-5 w-40"}),n.jsx(ue,{className:"h-4 w-56"})]}),n.jsx(M1,{className:"h-[250px] flex items-end gap-2 pb-8",children:Array.from({length:6}).map((o,r)=>n.jsx(ue,{className:"flex-1 rounded-t-md",style:{height:`${40+Math.random()*60}%`}},r))})]},a))})]})}function mL(){return n.jsxs("div",{className:"p-3 sm:p-6 space-y-4 animate-in fade-in duration-300",children:[n.jsxs("div",{className:"space-y-2",children:[n.jsx(ue,{className:"h-8 w-48"}),n.jsx(ue,{className:"h-4 w-64"})]}),n.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:6}).map((t,a)=>n.jsxs(u1,{children:[n.jsxs(k1,{children:[n.jsx(ue,{className:"h-5 w-32"}),n.jsx(ue,{className:"h-4 w-48"})]}),n.jsxs(M1,{className:"space-y-3",children:[n.jsx(ue,{className:"h-8 w-full"}),n.jsx(ue,{className:"h-4 w-3/4"}),n.jsx(ue,{className:"h-4 w-1/2"})]})]},a))})]})}const VS=Zg("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function rw({className:t,variant:a,...o}){return n.jsx("div",{className:ee(VS({variant:a}),t),...o})}const Ie=({children:t,requireSubscription:a=!1})=>{const{user:o,profile:r,isAdmin:c,loading:i,isTrialExpired:l,hasActiveSubscription:h}=Zr(),y=Lw();if(i)return n.jsx("div",{className:"min-h-screen flex items-center justify-center",children:n.jsx(Ze,{className:"h-8 w-8 animate-spin"})});if(!o)return n.jsx(Cw,{to:"/auth",replace:!0});if(a&&!c){if(l&&!h)return n.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:n.jsxs(u1,{className:"w-full max-w-md border-destructive/20",children:[n.jsxs(k1,{className:"text-center",children:[n.jsx("div",{className:"mx-auto mb-4 p-3 bg-destructive/10 rounded-full",children:n.jsx(ko,{className:"h-8 w-8 text-destructive"})}),n.jsx(Er,{className:"text-xl",children:"Acesso Restrito"})]}),n.jsxs(M1,{className:"space-y-4 text-center",children:[n.jsx("p",{className:"text-muted-foreground",children:"Esta funcionalidade requer uma assinatura ativa. Seu período de teste gratuito de 15 dias expirou."}),n.jsxs("div",{className:"space-y-2",children:[n.jsxs(rw,{variant:"secondary",className:"w-full justify-center",children:[n.jsx(l1,{className:"h-4 w-4 mr-2"}),"Trial Expirado"]}),n.jsxs("p",{className:"text-xs text-muted-foreground",children:["Data de expiração: ",r!=null&&r.trial_end?new Date(r.trial_end).toLocaleDateString("pt-BR"):"N/A"]})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsxs(Ce,{onClick:()=>y("/plans"),className:"w-full",children:[n.jsx(lo,{className:"h-4 w-4 mr-2"}),"Escolher Plano"]}),n.jsx(Ce,{variant:"outline",onClick:()=>y("/dashboard"),className:"w-full",children:"Voltar ao Dashboard"})]})]})]})});if(!h&&(r!=null&&r.subscription_plan)&&r.subscription_plan!=="basic"&&(r!=null&&r.subscription_end))return n.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:n.jsxs(u1,{className:"w-full max-w-md border-warning/20",children:[n.jsxs(k1,{className:"text-center",children:[n.jsx("div",{className:"mx-auto mb-4 p-3 bg-warning/10 rounded-full",children:n.jsx(We,{className:"h-8 w-8 text-warning"})}),n.jsx(Er,{className:"text-xl",children:"Assinatura Vencida"})]}),n.jsxs(M1,{className:"space-y-4 text-center",children:[n.jsxs("p",{className:"text-muted-foreground",children:["Sua assinatura venceu em ",new Date(r.subscription_end).toLocaleDateString("pt-BR"),". Renove para continuar acessando esta funcionalidade."]}),n.jsx("div",{className:"space-y-2",children:n.jsxs(rw,{variant:"outline",className:"w-full justify-center border-warning text-warning",children:[n.jsx(l1,{className:"h-4 w-4 mr-2"}),"Plano ",r==null?void 0:r.subscription_plan," Vencido"]})}),n.jsxs("div",{className:"space-y-2",children:[n.jsxs(Ce,{onClick:()=>y("/plans"),className:"w-full",children:[n.jsx(lo,{className:"h-4 w-4 mr-2"}),"Renovar Assinatura"]}),n.jsx(Ce,{variant:"outline",onClick:()=>y("/dashboard"),className:"w-full",children:"Voltar ao Dashboard"})]})]})]})});if(!h&&!l){const p=r!=null&&r.trial_end?Math.ceil((new Date(r.trial_end).getTime()-new Date().getTime())/864e5):0;return n.jsxs("div",{className:"min-h-screen",children:[p<=3&&n.jsx("div",{className:"bg-warning/10 border-b border-warning/20 p-4",children:n.jsxs("div",{className:"max-w-screen-xl mx-auto flex items-center justify-between",children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(l1,{className:"h-5 w-5 text-warning"}),n.jsxs("span",{className:"text-sm font-medium",children:["Trial expira em ",p," dias"]})]}),n.jsx(Ce,{size:"sm",onClick:()=>y("/plans"),className:"bg-warning text-warning-foreground hover:bg-warning/90",children:"Escolher Plano"})]})}),t]})}}return n.jsx(n.Fragment,{children:t})},RS=()=>{const t=Lw(),{user:a}=Zr();return d.useEffect(()=>{t(a?"/dashboard":"/landing")},[a,t]),null},Ho=d.forwardRef(({className:t,type:a,...o},r)=>n.jsx("input",{type:a,className:ee("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",t),ref:r,...o}));Ho.displayName="Input";var DS="Label",vL=d.forwardRef((t,a)=>n.jsx(fe.label,{...t,ref:a,onMouseDown:o=>{var c;o.target.closest("button, input, select, textarea")||((c=t.onMouseDown)==null||c.call(t,o),!o.defaultPrevented&&o.detail>1&&o.preventDefault())}}));vL.displayName=DS;var fL=vL;const TS=Zg("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),ro=d.forwardRef(({className:t,...a},o)=>n.jsx(fL,{ref:o,className:ee(TS(),t),...a}));ro.displayName=fL.displayName;var yx=["Enter"," "],FS=["ArrowDown","PageUp","Home"],gL=["ArrowUp","PageDown","End"],BS=[...FS,...gL],ES={ltr:[...yx,"ArrowRight"],rtl:[...yx,"ArrowLeft"]},OS={ltr:["ArrowLeft"],rtl:["ArrowRight"]},Wr="Menu",[Or,US,NS]=uw(Wr),[J2,xL]=Ug(Wr,[NS,fw,gw]),Wg=fw(),wL=gw(),[_S,Y2]=J2(Wr),[GS,Xr]=J2(Wr),LL=t=>{const{__scopeMenu:a,open:o=!1,children:r,dir:c,onOpenChange:i,modal:l=!0}=t,h=Wg(a),[y,p]=d.useState(null),M=d.useRef(!1),k=So(i),u=QC(c);return d.useEffect(()=>{const s=()=>{M.current=!0,document.addEventListener("pointerdown",w,{capture:!0,once:!0}),document.addEventListener("pointermove",w,{capture:!0,once:!0})},w=()=>M.current=!1;return document.addEventListener("keydown",s,{capture:!0}),()=>{document.removeEventListener("keydown",s,{capture:!0}),document.removeEventListener("pointerdown",w,{capture:!0}),document.removeEventListener("pointermove",w,{capture:!0})}},[]),n.jsx(JC,{...h,children:n.jsx(_S,{scope:a,open:o,onOpenChange:k,content:y,onContentChange:p,children:n.jsx(GS,{scope:a,onClose:d.useCallback(()=>k(!1),[k]),isUsingKeyboardRef:M,dir:u,modal:l,children:r})})})};LL.displayName=Wr;var ZS="MenuAnchor",wx=d.forwardRef((t,a)=>{const{__scopeMenu:o,...r}=t,c=Wg(o);return n.jsx(OC,{...c,...r,ref:a})});wx.displayName=ZS;var Lx="MenuPortal",[WS,CL]=J2(Lx,{forceMount:void 0}),bL=t=>{const{__scopeMenu:a,forceMount:o,children:r,container:c}=t,i=Y2(Lx,a);return n.jsx(WS,{scope:a,forceMount:o,children:n.jsx(qo,{present:o||i.open,children:n.jsx(Mw,{asChild:!0,container:c,children:r})})})};bL.displayName=Lx;var je="MenuContent",[XS,Cx]=J2(je),IL=d.forwardRef((t,a)=>{const o=CL(je,t.__scopeMenu),{forceMount:r=o.forceMount,...c}=t,i=Y2(je,t.__scopeMenu),l=Xr(je,t.__scopeMenu);return n.jsx(Or.Provider,{scope:t.__scopeMenu,children:n.jsx(qo,{present:r||i.open,children:n.jsx(Or.Slot,{scope:t.__scopeMenu,children:l.modal?n.jsx(KS,{...c,ref:a}):n.jsx($S,{...c,ref:a})})})})}),KS=d.forwardRef((t,a)=>{const o=Y2(je,t.__scopeMenu),r=d.useRef(null),c=$e(a,r);return d.useEffect(()=>{const i=r.current;if(i)return $C(i)},[]),n.jsx(bx,{...t,ref:c,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:_(t.onFocusOutside,i=>i.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})}),$S=d.forwardRef((t,a)=>{const o=Y2(je,t.__scopeMenu);return n.jsx(bx,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})}),QS=GC("MenuContent.ScrollLock"),bx=d.forwardRef((t,a)=>{const{__scopeMenu:o,loop:r=!1,trapFocus:c,onOpenAutoFocus:i,onCloseAutoFocus:l,disableOutsidePointerEvents:h,onEntryFocus:y,onEscapeKeyDown:p,onPointerDownOutside:M,onFocusOutside:k,onInteractOutside:u,onDismiss:s,disableOutsideScroll:w,...m}=t,v=Y2(je,o),C=Xr(je,o),b=Wg(o),A=wL(o),z=US(o),[T,V]=d.useState(null),G=d.useRef(null),R=$e(a,G,v.onContentChange),I=d.useRef(0),D=d.useRef(""),F=d.useRef(0),j=d.useRef(null),ye=d.useRef("right"),H=d.useRef(0),ne=w?_C:d.Fragment,J=w?{as:QS,allowPinchZoom:!0}:void 0,de=L=>{var Q,m1;const X=D.current+L,te=z().filter(ke=>!ke.disabled),U=document.activeElement,Z=(Q=te.find(ke=>ke.ref.current===U))==null?void 0:Q.textValue,$=te.map(ke=>ke.textValue),pe=sq($,X,Z),be=(m1=te.find(ke=>ke.textValue===pe))==null?void 0:m1.ref.current;(function ke(Qe){D.current=Qe,window.clearTimeout(I.current),Qe!==""&&(I.current=window.setTimeout(()=>ke(""),1e3))})(X),be&&setTimeout(()=>be.focus())};d.useEffect(()=>()=>window.clearTimeout(I.current),[]),NC();const oe=d.useCallback(L=>{var te,U;return ye.current===((te=j.current)==null?void 0:te.side)&&lq(L,(U=j.current)==null?void 0:U.area)},[]);return n.jsx(XS,{scope:o,searchRef:D,onItemEnter:d.useCallback(L=>{oe(L)&&L.preventDefault()},[oe]),onItemLeave:d.useCallback(L=>{var X;oe(L)||((X=G.current)==null||X.focus(),V(null))},[oe]),onTriggerLeave:d.useCallback(L=>{oe(L)&&L.preventDefault()},[oe]),pointerGraceTimerRef:F,onPointerGraceIntentChange:d.useCallback(L=>{j.current=L},[]),children:n.jsx(ne,{...J,children:n.jsx(ZC,{asChild:!0,trapped:c,onMountAutoFocus:_(i,L=>{var X;L.preventDefault(),(X=G.current)==null||X.focus({preventScroll:!0})}),onUnmountAutoFocus:l,children:n.jsx(WC,{asChild:!0,disableOutsidePointerEvents:h,onEscapeKeyDown:p,onPointerDownOutside:M,onFocusOutside:k,onInteractOutside:u,onDismiss:s,children:n.jsx(XC,{asChild:!0,...A,dir:C.dir,orientation:"vertical",loop:r,currentTabStopId:T,onCurrentTabStopIdChange:V,onEntryFocus:_(y,L=>{C.isUsingKeyboardRef.current||L.preventDefault()}),preventScrollOnEntryFocus:!0,children:n.jsx(KC,{role:"menu","aria-orientation":"vertical","data-state":UL(v.open),"data-radix-menu-content":"",dir:C.dir,...b,...m,ref:R,style:{outline:"none",...m.style},onKeyDown:_(m.onKeyDown,L=>{const te=L.target.closest("[data-radix-menu-content]")===L.currentTarget,U=L.ctrlKey||L.altKey||L.metaKey,Z=L.key.length===1;te&&(L.key==="Tab"&&L.preventDefault(),!U&&Z&&de(L.key));const $=G.current;if(L.target!==$||!BS.includes(L.key))return;L.preventDefault();const be=z().filter(Q=>!Q.disabled).map(Q=>Q.ref.current);gL.includes(L.key)&&be.reverse(),iq(be)}),onBlur:_(t.onBlur,L=>{L.currentTarget.contains(L.target)||(window.clearTimeout(I.current),D.current="")}),onPointerMove:_(t.onPointerMove,Ur(L=>{const X=L.target,te=H.current!==L.clientX;if(L.currentTarget.contains(X)&&te){const U=L.clientX>H.current?"right":"left";ye.current=U,H.current=L.clientX}}))})})})})})})});IL.displayName=je;var JS="MenuGroup",Ix=d.forwardRef((t,a)=>{const{__scopeMenu:o,...r}=t;return n.jsx(fe.div,{role:"group",...r,ref:a})});Ix.displayName=JS;var YS="MenuLabel",SL=d.forwardRef((t,a)=>{const{__scopeMenu:o,...r}=t;return n.jsx(fe.div,{...r,ref:a})});SL.displayName=YS;var Eg="MenuItem",nw="menu.itemSelect",Xg=d.forwardRef((t,a)=>{const{disabled:o=!1,onSelect:r,...c}=t,i=d.useRef(null),l=Xr(Eg,t.__scopeMenu),h=Cx(Eg,t.__scopeMenu),y=$e(a,i),p=d.useRef(!1),M=()=>{const k=i.current;if(!o&&k){const u=new CustomEvent(nw,{bubbles:!0,cancelable:!0});k.addEventListener(nw,s=>r==null?void 0:r(s),{once:!0}),mw(k,u),u.defaultPrevented?p.current=!1:l.onClose()}};return n.jsx(qL,{...c,ref:y,disabled:o,onClick:_(t.onClick,M),onPointerDown:k=>{var u;(u=t.onPointerDown)==null||u.call(t,k),p.current=!0},onPointerUp:_(t.onPointerUp,k=>{var u;p.current||(u=k.currentTarget)==null||u.click()}),onKeyDown:_(t.onKeyDown,k=>{const u=h.searchRef.current!=="";o||u&&k.key===" "||yx.includes(k.key)&&(k.currentTarget.click(),k.preventDefault())})})});Xg.displayName=Eg;var qL=d.forwardRef((t,a)=>{const{__scopeMenu:o,disabled:r=!1,textValue:c,...i}=t,l=Cx(Eg,o),h=wL(o),y=d.useRef(null),p=$e(a,y),[M,k]=d.useState(!1),[u,s]=d.useState("");return d.useEffect(()=>{const w=y.current;w&&s((w.textContent??"").trim())},[i.children]),n.jsx(Or.ItemSlot,{scope:o,disabled:r,textValue:c??u,children:n.jsx(UC,{asChild:!0,...h,focusable:!r,children:n.jsx(fe.div,{role:"menuitem","data-highlighted":M?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0,...i,ref:p,onPointerMove:_(t.onPointerMove,Ur(w=>{r?l.onItemLeave(w):(l.onItemEnter(w),w.defaultPrevented||w.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:_(t.onPointerLeave,Ur(w=>l.onItemLeave(w))),onFocus:_(t.onFocus,()=>k(!0)),onBlur:_(t.onBlur,()=>k(!1))})})})}),eq="MenuCheckboxItem",AL=d.forwardRef((t,a)=>{const{checked:o=!1,onCheckedChange:r,...c}=t;return n.jsx(VL,{scope:t.__scopeMenu,checked:o,children:n.jsx(Xg,{role:"menuitemcheckbox","aria-checked":Og(o)?"mixed":o,...c,ref:a,"data-state":qx(o),onSelect:_(c.onSelect,()=>r==null?void 0:r(Og(o)?!0:!o),{checkForDefaultPrevented:!1})})})});AL.displayName=eq;var jL="MenuRadioGroup",[tq,aq]=J2(jL,{value:void 0,onValueChange:()=>{}}),PL=d.forwardRef((t,a)=>{const{value:o,onValueChange:r,...c}=t,i=So(r);return n.jsx(tq,{scope:t.__scopeMenu,value:o,onValueChange:i,children:n.jsx(Ix,{...c,ref:a})})});PL.displayName=jL;var zL="MenuRadioItem",HL=d.forwardRef((t,a)=>{const{value:o,...r}=t,c=aq(zL,t.__scopeMenu),i=o===c.value;return n.jsx(VL,{scope:t.__scopeMenu,checked:i,children:n.jsx(Xg,{role:"menuitemradio","aria-checked":i,...r,ref:a,"data-state":qx(i),onSelect:_(r.onSelect,()=>{var l;return(l=c.onValueChange)==null?void 0:l.call(c,o)},{checkForDefaultPrevented:!1})})})});HL.displayName=zL;var Sx="MenuItemIndicator",[VL,oq]=J2(Sx,{checked:!1}),RL=d.forwardRef((t,a)=>{const{__scopeMenu:o,forceMount:r,...c}=t,i=oq(Sx,o);return n.jsx(qo,{present:r||Og(i.checked)||i.checked===!0,children:n.jsx(fe.span,{...c,ref:a,"data-state":qx(i.checked)})})});RL.displayName=Sx;var rq="MenuSeparator",DL=d.forwardRef((t,a)=>{const{__scopeMenu:o,...r}=t;return n.jsx(fe.div,{role:"separator","aria-orientation":"horizontal",...r,ref:a})});DL.displayName=rq;var nq="MenuArrow",TL=d.forwardRef((t,a)=>{const{__scopeMenu:o,...r}=t,c=Wg(o);return n.jsx(YC,{...c,...r,ref:a})});TL.displayName=nq;var cq="MenuSub",[GA,FL]=J2(cq),Vo="MenuSubTrigger",BL=d.forwardRef((t,a)=>{const o=Y2(Vo,t.__scopeMenu),r=Xr(Vo,t.__scopeMenu),c=FL(Vo,t.__scopeMenu),i=Cx(Vo,t.__scopeMenu),l=d.useRef(null),{pointerGraceTimerRef:h,onPointerGraceIntentChange:y}=i,p={__scopeMenu:t.__scopeMenu},M=d.useCallback(()=>{l.current&&window.clearTimeout(l.current),l.current=null},[]);return d.useEffect(()=>M,[M]),d.useEffect(()=>{const k=h.current;return()=>{window.clearTimeout(k),y(null)}},[h,y]),n.jsx(wx,{asChild:!0,...p,children:n.jsx(qL,{id:c.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":c.contentId,"data-state":UL(o.open),...t,ref:xw(a,c.onTriggerChange),onClick:k=>{var u;(u=t.onClick)==null||u.call(t,k),!(t.disabled||k.defaultPrevented)&&(k.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:_(t.onPointerMove,Ur(k=>{i.onItemEnter(k),!k.defaultPrevented&&!t.disabled&&!o.open&&!l.current&&(i.onPointerGraceIntentChange(null),l.current=window.setTimeout(()=>{o.onOpenChange(!0),M()},100))})),onPointerLeave:_(t.onPointerLeave,Ur(k=>{var s,w;M();const u=(s=o.content)==null?void 0:s.getBoundingClientRect();if(u){const m=(w=o.content)==null?void 0:w.dataset.side,v=m==="right",C=v?-5:5,b=u[v?"left":"right"],A=u[v?"right":"left"];i.onPointerGraceIntentChange({area:[{x:k.clientX+C,y:k.clientY},{x:b,y:u.top},{x:A,y:u.top},{x:A,y:u.bottom},{x:b,y:u.bottom}],side:m}),window.clearTimeout(h.current),h.current=window.setTimeout(()=>i.onPointerGraceIntentChange(null),300)}else{if(i.onTriggerLeave(k),k.defaultPrevented)return;i.onPointerGraceIntentChange(null)}})),onKeyDown:_(t.onKeyDown,k=>{var s;const u=i.searchRef.current!=="";t.disabled||u&&k.key===" "||ES[r.dir].includes(k.key)&&(o.onOpenChange(!0),(s=o.content)==null||s.focus(),k.preventDefault())})})})});BL.displayName=Vo;var EL="MenuSubContent",OL=d.forwardRef((t,a)=>{const o=CL(je,t.__scopeMenu),{forceMount:r=o.forceMount,...c}=t,i=Y2(je,t.__scopeMenu),l=Xr(je,t.__scopeMenu),h=FL(EL,t.__scopeMenu),y=d.useRef(null),p=$e(a,y);return n.jsx(Or.Provider,{scope:t.__scopeMenu,children:n.jsx(qo,{present:r||i.open,children:n.jsx(Or.Slot,{scope:t.__scopeMenu,children:n.jsx(bx,{id:h.contentId,"aria-labelledby":h.triggerId,...c,ref:p,align:"start",side:l.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:M=>{var k;l.isUsingKeyboardRef.current&&((k=y.current)==null||k.focus()),M.preventDefault()},onCloseAutoFocus:M=>M.preventDefault(),onFocusOutside:_(t.onFocusOutside,M=>{M.target!==h.trigger&&i.onOpenChange(!1)}),onEscapeKeyDown:_(t.onEscapeKeyDown,M=>{l.onClose(),M.preventDefault()}),onKeyDown:_(t.onKeyDown,M=>{var s;const k=M.currentTarget.contains(M.target),u=OS[l.dir].includes(M.key);k&&u&&(i.onOpenChange(!1),(s=h.trigger)==null||s.focus(),M.preventDefault())})})})})})});OL.displayName=EL;function UL(t){return t?"open":"closed"}function Og(t){return t==="indeterminate"}function qx(t){return Og(t)?"indeterminate":t?"checked":"unchecked"}function iq(t){const a=document.activeElement;for(const o of t)if(o===a||(o.focus(),document.activeElement!==a))return}function dq(t,a){return t.map((o,r)=>t[(a+r)%t.length])}function sq(t,a,o){const c=a.length>1&&Array.from(a).every(p=>p===a[0])?a[0]:a,i=o?t.indexOf(o):-1;let l=dq(t,Math.max(i,0));c.length===1&&(l=l.filter(p=>p!==o));const y=l.find(p=>p.toLowerCase().startsWith(c.toLowerCase()));return y!==o?y:void 0}function hq(t,a){const{x:o,y:r}=t;let c=!1;for(let i=0,l=a.length-1;i<a.length;l=i++){const h=a[i],y=a[l],p=h.x,M=h.y,k=y.x,u=y.y;M>r!=u>r&&o<(k-p)*(r-M)/(u-M)+p&&(c=!c)}return c}function lq(t,a){if(!a)return!1;const o={x:t.clientX,y:t.clientY};return hq(o,a)}function Ur(t){return a=>a.pointerType==="mouse"?t(a):void 0}var yq=LL,pq=wx,uq=bL,kq=IL,Mq=Ix,mq=SL,vq=Xg,fq=AL,gq=PL,xq=HL,wq=RL,Lq=DL,Cq=TL,bq=BL,Iq=OL,Kg="DropdownMenu",[Sq]=Ug(Kg,[xL]),we=xL(),[qq,NL]=Sq(Kg),_L=t=>{const{__scopeDropdownMenu:a,children:o,dir:r,open:c,defaultOpen:i,onOpenChange:l,modal:h=!0}=t,y=we(a),p=d.useRef(null),[M,k]=px({prop:c,defaultProp:i??!1,onChange:l,caller:Kg});return n.jsx(qq,{scope:a,triggerId:Fx(),triggerRef:p,contentId:Fx(),open:M,onOpenChange:k,onOpenToggle:d.useCallback(()=>k(u=>!u),[k]),modal:h,children:n.jsx(yq,{...y,open:M,onOpenChange:k,dir:r,modal:h,children:o})})};_L.displayName=Kg;var GL="DropdownMenuTrigger",ZL=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,disabled:r=!1,...c}=t,i=NL(GL,o),l=we(o);return n.jsx(pq,{asChild:!0,...l,children:n.jsx(fe.button,{type:"button",id:i.triggerId,"aria-haspopup":"menu","aria-expanded":i.open,"aria-controls":i.open?i.contentId:void 0,"data-state":i.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...c,ref:xw(a,i.triggerRef),onPointerDown:_(t.onPointerDown,h=>{!r&&h.button===0&&h.ctrlKey===!1&&(i.onOpenToggle(),i.open||h.preventDefault())}),onKeyDown:_(t.onKeyDown,h=>{r||(["Enter"," "].includes(h.key)&&i.onOpenToggle(),h.key==="ArrowDown"&&i.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(h.key)&&h.preventDefault())})})})});ZL.displayName=GL;var Aq="DropdownMenuPortal",WL=t=>{const{__scopeDropdownMenu:a,...o}=t,r=we(a);return n.jsx(uq,{...r,...o})};WL.displayName=Aq;var XL="DropdownMenuContent",KL=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=NL(XL,o),i=we(o),l=d.useRef(!1);return n.jsx(kq,{id:c.contentId,"aria-labelledby":c.triggerId,...i,...r,ref:a,onCloseAutoFocus:_(t.onCloseAutoFocus,h=>{var y;l.current||(y=c.triggerRef.current)==null||y.focus(),l.current=!1,h.preventDefault()}),onInteractOutside:_(t.onInteractOutside,h=>{const y=h.detail.originalEvent,p=y.button===0&&y.ctrlKey===!0,M=y.button===2||p;(!c.modal||M)&&(l.current=!0)}),style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});KL.displayName=XL;var jq="DropdownMenuGroup",Pq=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(Mq,{...c,...r,ref:a})});Pq.displayName=jq;var zq="DropdownMenuLabel",$L=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(mq,{...c,...r,ref:a})});$L.displayName=zq;var Hq="DropdownMenuItem",QL=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(vq,{...c,...r,ref:a})});QL.displayName=Hq;var Vq="DropdownMenuCheckboxItem",JL=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(fq,{...c,...r,ref:a})});JL.displayName=Vq;var Rq="DropdownMenuRadioGroup",Dq=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(gq,{...c,...r,ref:a})});Dq.displayName=Rq;var Tq="DropdownMenuRadioItem",YL=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(xq,{...c,...r,ref:a})});YL.displayName=Tq;var Fq="DropdownMenuItemIndicator",eC=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(wq,{...c,...r,ref:a})});eC.displayName=Fq;var Bq="DropdownMenuSeparator",tC=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(Lq,{...c,...r,ref:a})});tC.displayName=Bq;var Eq="DropdownMenuArrow",Oq=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(Cq,{...c,...r,ref:a})});Oq.displayName=Eq;var Uq="DropdownMenuSubTrigger",aC=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(bq,{...c,...r,ref:a})});aC.displayName=Uq;var Nq="DropdownMenuSubContent",oC=d.forwardRef((t,a)=>{const{__scopeDropdownMenu:o,...r}=t,c=we(o);return n.jsx(Iq,{...c,...r,ref:a,style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});oC.displayName=Nq;var _q=_L,Gq=ZL,Zq=WL,rC=KL,nC=$L,cC=QL,iC=JL,dC=YL,sC=eC,hC=tC,lC=aC,yC=oC;const Wq=_q,Xq=Gq,Kq=d.forwardRef(({className:t,inset:a,children:o,...r},c)=>n.jsxs(lC,{ref:c,className:ee("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",a&&"pl-8",t),...r,children:[o,n.jsx(Uo,{className:"ml-auto h-4 w-4"})]}));Kq.displayName=lC.displayName;const $q=d.forwardRef(({className:t,...a},o)=>n.jsx(yC,{ref:o,className:ee("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...a}));$q.displayName=yC.displayName;const pC=d.forwardRef(({className:t,sideOffset:a=4,...o},r)=>n.jsx(Zq,{children:n.jsx(rC,{ref:r,sideOffset:a,className:ee("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...o})}));pC.displayName=rC.displayName;const Fg=d.forwardRef(({className:t,inset:a,...o},r)=>n.jsx(cC,{ref:r,className:ee("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a&&"pl-8",t),...o}));Fg.displayName=cC.displayName;const Qq=d.forwardRef(({className:t,children:a,checked:o,...r},c)=>n.jsxs(iC,{ref:c,className:ee("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),checked:o,...r,children:[n.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:n.jsx(sC,{children:n.jsx(so,{className:"h-4 w-4"})})}),a]}));Qq.displayName=iC.displayName;const Jq=d.forwardRef(({className:t,children:a,...o},r)=>n.jsxs(dC,{ref:r,className:ee("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...o,children:[n.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:n.jsx(sC,{children:n.jsx(ho,{className:"h-2 w-2 fill-current"})})}),a]}));Jq.displayName=dC.displayName;const Yq=d.forwardRef(({className:t,inset:a,...o},r)=>n.jsx(nC,{ref:r,className:ee("px-2 py-1.5 text-sm font-semibold",a&&"pl-8",t),...o}));Yq.displayName=nC.displayName;const eA=d.forwardRef(({className:t,...a},o)=>n.jsx(hC,{ref:o,className:ee("-mx-1 my-1 h-px bg-muted",t),...a}));eA.displayName=hC.displayName;function tA(){const{setTheme:t}=gS();return n.jsxs(Wq,{children:[n.jsx(Xq,{asChild:!0,children:n.jsxs(Ce,{variant:"outline",size:"icon",children:[n.jsx(qr,{className:"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),n.jsx(hr,{className:"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}),n.jsx("span",{className:"sr-only",children:"Toggle theme"})]})}),n.jsxs(pC,{align:"end",children:[n.jsx(Fg,{onClick:()=>t("light"),children:"Light"}),n.jsx(Fg,{onClick:()=>t("dark"),children:"Dark"}),n.jsx(Fg,{onClick:()=>t("system"),children:"System"})]})]})}var $g="Checkbox",[aA]=Ug($g),[oA,Ax]=aA($g);function rA(t){const{__scopeCheckbox:a,checked:o,children:r,defaultChecked:c,disabled:i,form:l,name:h,onCheckedChange:y,required:p,value:M="on",internal_do_not_use_render:k}=t,[u,s]=px({prop:o,defaultProp:c??!1,onChange:y,caller:$g}),[w,m]=d.useState(null),[v,C]=d.useState(null),b=d.useRef(!1),A=w?!!l||!!w.closest("form"):!0,z={checked:u,disabled:i,setChecked:s,control:w,setControl:m,name:h,form:l,value:M,hasConsumerStoppedPropagationRef:b,required:p,defaultChecked:p1(c)?!1:c,isFormControl:A,bubbleInput:v,setBubbleInput:C};return n.jsx(oA,{scope:a,...z,children:nA(k)?k(z):r})}var uC="CheckboxTrigger",kC=d.forwardRef(({__scopeCheckbox:t,onKeyDown:a,onClick:o,...r},c)=>{const{control:i,value:l,disabled:h,checked:y,required:p,setControl:M,setChecked:k,hasConsumerStoppedPropagationRef:u,isFormControl:s,bubbleInput:w}=Ax(uC,t),m=$e(c,M),v=d.useRef(y);return d.useEffect(()=>{const C=i==null?void 0:i.form;if(C){const b=()=>k(v.current);return C.addEventListener("reset",b),()=>C.removeEventListener("reset",b)}},[i,k]),n.jsx(fe.button,{type:"button",role:"checkbox","aria-checked":p1(y)?"mixed":y,"aria-required":p,"data-state":gC(y),"data-disabled":h?"":void 0,disabled:h,value:l,...r,ref:m,onKeyDown:_(a,C=>{C.key==="Enter"&&C.preventDefault()}),onClick:_(o,C=>{k(b=>p1(b)?!0:!b),w&&s&&(u.current=C.isPropagationStopped(),u.current||C.stopPropagation())})})});kC.displayName=uC;var jx=d.forwardRef((t,a)=>{const{__scopeCheckbox:o,name:r,checked:c,defaultChecked:i,required:l,disabled:h,value:y,onCheckedChange:p,form:M,...k}=t;return n.jsx(rA,{__scopeCheckbox:o,checked:c,defaultChecked:i,disabled:h,required:l,onCheckedChange:p,name:r,form:M,value:y,internal_do_not_use_render:({isFormControl:u})=>n.jsxs(n.Fragment,{children:[n.jsx(kC,{...k,ref:a,__scopeCheckbox:o}),u&&n.jsx(fC,{__scopeCheckbox:o})]})})});jx.displayName=$g;var MC="CheckboxIndicator",mC=d.forwardRef((t,a)=>{const{__scopeCheckbox:o,forceMount:r,...c}=t,i=Ax(MC,o);return n.jsx(qo,{present:r||p1(i.checked)||i.checked===!0,children:n.jsx(fe.span,{"data-state":gC(i.checked),"data-disabled":i.disabled?"":void 0,...c,ref:a,style:{pointerEvents:"none",...t.style}})})});mC.displayName=MC;var vC="CheckboxBubbleInput",fC=d.forwardRef(({__scopeCheckbox:t,...a},o)=>{const{control:r,hasConsumerStoppedPropagationRef:c,checked:i,defaultChecked:l,required:h,disabled:y,name:p,value:M,form:k,bubbleInput:u,setBubbleInput:s}=Ax(vC,t),w=$e(o,s),m=eb(i),v=tb(r);d.useEffect(()=>{const b=u;if(!b)return;const A=window.HTMLInputElement.prototype,T=Object.getOwnPropertyDescriptor(A,"checked").set,V=!c.current;if(m!==i&&T){const G=new Event("click",{bubbles:V});b.indeterminate=p1(i),T.call(b,p1(i)?!1:i),b.dispatchEvent(G)}},[u,m,i,c]);const C=d.useRef(p1(i)?!1:i);return n.jsx(fe.input,{type:"checkbox","aria-hidden":!0,defaultChecked:l??C.current,required:h,disabled:y,name:p,value:M,form:k,...a,tabIndex:-1,ref:w,style:{...a.style,...v,position:"absolute",pointerEvents:"none",opacity:0,margin:0,transform:"translateX(-100%)"}})});fC.displayName=vC;function nA(t){return typeof t=="function"}function p1(t){return t==="indeterminate"}function gC(t){return p1(t)?"indeterminate":t?"checked":"unchecked"}const xC=d.forwardRef(({className:t,...a},o)=>n.jsx(jx,{ref:o,className:ee("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",t),...a,children:n.jsx(mC,{className:ee("flex items-center justify-center text-current"),children:n.jsx(so,{className:"h-4 w-4"})})}));xC.displayName=jx.displayName;const cA=()=>{const[t,a]=d.useState(!0),[o,r]=d.useState(""),[c,i]=d.useState(""),[l,h]=d.useState(""),[y,p]=d.useState(""),[M,k]=d.useState(!1),[u,s]=d.useState(!1),[w,m]=d.useState(!1),[v,C]=d.useState(!1),{user:b,signIn:A,signUp:z,signInWithGoogle:T}=Zr(),{toast:V}=Mx();if(b)return n.jsx(Cw,{to:"/dashboard",replace:!0});const G=I=>{const D=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;return I.length>=8&&D.test(I)},R=async I=>{if(I.preventDefault(),C(!0),t)await A(o,c,w);else{if(c!==y){V({title:"Senhas não coincidem",description:"Verifique os campos de senha.",variant:"destructive"}),C(!1);return}if(!G(c)){V({title:"Senha fraca",description:"Use ao menos 8 caracteres com maiúscula, minúscula, número e símbolo.",variant:"destructive"}),C(!1);return}await z(o,c,l)}C(!1)};return n.jsxs("div",{className:"min-h-screen flex items-center justify-center bg-background px-4 py-8",children:[n.jsx("div",{className:"absolute top-4 right-4",children:n.jsx(tA,{})}),n.jsxs(u1,{className:"w-full max-w-md",children:[n.jsxs(k1,{className:"text-center",children:[n.jsx(Er,{className:"text-2xl font-bold text-primary",children:"PLANIX"}),n.jsx(xx,{children:t?"Faça login para acessar sua conta":"Crie sua conta e comece a gerenciar suas finanças"})]}),n.jsxs(M1,{className:"space-y-4",children:[n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-0 flex items-center",children:n.jsx("span",{className:"w-full border-t"})}),n.jsx("div",{className:"relative flex justify-center text-xs uppercase",children:n.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"Continue com email"})})]}),n.jsxs("form",{onSubmit:R,className:"space-y-4",children:[!t&&n.jsxs("div",{className:"space-y-2",children:[n.jsx(ro,{htmlFor:"fullName",children:"Nome completo"}),n.jsx(Ho,{id:"fullName",type:"text",placeholder:"Seu nome completo",value:l,onChange:I=>h(I.target.value),required:!t})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx(ro,{htmlFor:"email",children:"Email"}),n.jsx(Ho,{id:"email",type:"email",placeholder:"seu@email.com",value:o,onChange:I=>r(I.target.value),required:!0})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx(ro,{htmlFor:"password",children:"Senha"}),n.jsxs("div",{className:"relative",children:[n.jsx(Ho,{id:"password",type:M?"text":"password",placeholder:t?"Sua senha":"Mínimo 8 caracteres com maiúscula, número e símbolo",value:c,onChange:I=>i(I.target.value),required:!0,className:"pr-10"}),n.jsx(Ce,{type:"button",variant:"ghost",size:"sm",className:"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",onClick:()=>k(!M),children:M?n.jsx(K2,{className:"h-4 w-4"}):n.jsx($2,{className:"h-4 w-4"})})]}),!t&&c&&!G(c)&&n.jsx("p",{className:"text-sm text-destructive",children:"A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo especial"})]}),!t&&n.jsxs("div",{className:"space-y-2",children:[n.jsx(ro,{htmlFor:"confirmPassword",children:"Confirmar senha"}),n.jsxs("div",{className:"relative",children:[n.jsx(Ho,{id:"confirmPassword",type:u?"text":"password",placeholder:"Confirme sua senha",value:y,onChange:I=>p(I.target.value),required:!0,className:"pr-10"}),n.jsx(Ce,{type:"button",variant:"ghost",size:"sm",className:"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",onClick:()=>s(!u),children:u?n.jsx(K2,{className:"h-4 w-4"}):n.jsx($2,{className:"h-4 w-4"})})]}),y&&c!==y&&n.jsx("p",{className:"text-sm text-destructive",children:"As senhas não coincidem"})]}),t&&n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(xC,{id:"remember",checked:w,onCheckedChange:I=>m(I)}),n.jsx(ro,{htmlFor:"remember",className:"text-sm",children:"Manter-me conectado"})]}),n.jsxs(Ce,{type:"submit",className:"w-full",disabled:v,children:[v?n.jsx(Ze,{className:"mr-2 h-4 w-4 animate-spin"}):null,t?"Entrar":"Criar conta"]})]}),n.jsxs("div",{className:"text-center text-sm",children:[n.jsx("span",{className:"text-muted-foreground",children:t?"Não tem uma conta? ":"Já tem uma conta? "}),n.jsx(Ce,{variant:"link",className:"p-0 h-auto font-normal",onClick:()=>a(!t),children:t?"Criar conta":"Fazer login"})]})]})]})]})},iA=d.lazy(()=>le(()=>import("./Landing-CkGgUc4l.js"),__vite__mapDeps([0,1,2,3,4]))),dA=d.lazy(()=>le(()=>import("./Plans-BJl40nSX.js"),__vite__mapDeps([5,1,2,3,4]))),sA=d.lazy(()=>le(()=>import("./Install-omgnLm1Y.js"),__vite__mapDeps([6,1,2,3,4]))),hA=d.lazy(()=>le(()=>import("./Dashboard-BkCGfFNx.js").then(t=>t.D),__vite__mapDeps([7,1,2,8,9,4,10,3,11]))),lA=d.lazy(()=>le(()=>import("./TransacoesImproved-C9E-DDt6.js"),__vite__mapDeps([12,1,2,13,14,15,16,8,17,10,9,18,3,4]))),yA=d.lazy(()=>le(()=>import("./ContasImproved-CfYghLfH.js"),__vite__mapDeps([19,1,2,15,20,21,22,14,23,8,24,25,26,27,28,13,9,17,11,3,4]))),pA=d.lazy(()=>le(()=>import("./Investimentos-CPAbHZR0.js"),__vite__mapDeps([29,1,2,8,15,14,23,22,9,20,4,3]))),uA=d.lazy(()=>le(()=>import("./GoalsImproved-ShAT5svr.js"),__vite__mapDeps([30,1,2,15,13,14,23,31,8,17,20,24,25,3,4]))),kA=d.lazy(()=>le(()=>import("./RelatoriosImproved-CD8wxkCj.js"),__vite__mapDeps([32,1,2,14,16,8,18,3,9,4,26,24]))),MA=d.lazy(()=>le(()=>import("./SettingsImproved-whKH00N8.js"),__vite__mapDeps([33,1,2,8,15,16,14,34,35,36,37,3,4]))),mA=d.lazy(()=>le(()=>import("./NotFound-BM1QIDtm.js"),__vite__mapDeps([38,1,2,3,4]))),vA=d.lazy(()=>le(()=>import("./WhatsAppConnection-BKEqWWSc.js"),__vite__mapDeps([39,1,2,8,3,4]))),fA=d.lazy(()=>le(()=>import("./Categorias-kMHvFSiU.js"),__vite__mapDeps([40,1,2,8,36,14,15,3,4]))),gA=d.lazy(()=>le(()=>import("./Contacts-D9EQKUC6.js"),__vite__mapDeps([41,1,2,8,16,34,35,3,4]))),xA=d.lazy(()=>le(()=>import("./Social-CFDvrBH2.js"),__vite__mapDeps([42,1,2,8,15,14,20,34,9,17,27,24,26,3,4]))),wA=d.lazy(()=>le(()=>import("./Boletos-CrDbY-4O.js"),__vite__mapDeps([43,1,2,21,31,37,15,8,3,4]))),LA=d.lazy(()=>le(()=>import("./AboutUs-fFcxLBhJ.js"),__vite__mapDeps([44,1,2,3,4]))),CA=d.lazy(()=>le(()=>import("./TermsOfService-uhmddr9W.js"),__vite__mapDeps([45,1,2,3,4]))),bA=d.lazy(()=>le(()=>import("./PrivacyPolicy-CBtyY5PX.js"),__vite__mapDeps([46,1,2,3,4]))),IA=d.lazy(()=>le(()=>import("./Contact-BtASj60v.js"),__vite__mapDeps([47,1,2,13,14,3,4]))),SA=d.lazy(()=>le(()=>import("./Orcamento-WChQqxcH.js"),__vite__mapDeps([48,1,2,8,14,13,34,35,9,31,17,28,24,26,4,3]))),qA=new qb({defaultOptions:{queries:{staleTime:5*60*1e3,retry:1,refetchOnWindowFocus:!1}}});function he({children:t}){return n.jsx(d.Suspense,{fallback:n.jsx(mL,{}),children:t})}const AA=()=>n.jsx(HS,{children:n.jsx(Ab,{client:qA,children:n.jsx(fS,{defaultTheme:"system",storageKey:"finance-tracker-theme",children:n.jsx(LS,{children:n.jsx(SS,{children:n.jsx(AS,{children:n.jsx(qS,{children:n.jsx(IS,{children:n.jsxs(MS,{children:[n.jsx(TI,{}),n.jsx(kS,{}),n.jsx(zS,{}),n.jsx(ob,{children:n.jsx(d.Suspense,{fallback:n.jsx(mL,{}),children:n.jsxs(rb,{children:[n.jsx(ie,{path:"/",element:n.jsx(RS,{})}),n.jsx(ie,{path:"/landing",element:n.jsx(he,{children:n.jsx(iA,{})})}),n.jsx(ie,{path:"/auth",element:n.jsx(cA,{})}),n.jsx(ie,{path:"/plans",element:n.jsx(he,{children:n.jsx(dA,{})})}),n.jsx(ie,{path:"/install",element:n.jsx(he,{children:n.jsx(sA,{})})}),n.jsx(ie,{path:"/dashboard",element:n.jsx(Ie,{children:n.jsx(he,{children:n.jsx(hA,{})})})}),n.jsx(ie,{path:"/transacoes",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(lA,{})})})}),n.jsx(ie,{path:"/contas",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(yA,{})})})}),n.jsx(ie,{path:"/investimentos",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(pA,{})})})}),n.jsx(ie,{path:"/metas",element:n.jsx(Ie,{children:n.jsx(he,{children:n.jsx(uA,{})})})}),n.jsx(ie,{path:"/orcamento",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(SA,{})})})}),n.jsx(ie,{path:"/relatorios",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(kA,{})})})}),n.jsx(ie,{path:"/settings",element:n.jsx(Ie,{children:n.jsx(he,{children:n.jsx(MA,{})})})}),n.jsx(ie,{path:"/conexao",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(vA,{})})})}),n.jsx(ie,{path:"/categorias",element:n.jsx(Ie,{children:n.jsx(he,{children:n.jsx(fA,{})})})}),n.jsx(ie,{path:"/contatos",element:n.jsx(Ie,{children:n.jsx(he,{children:n.jsx(gA,{})})})}),n.jsx(ie,{path:"/social",element:n.jsx(Ie,{children:n.jsx(he,{children:n.jsx(xA,{})})})}),n.jsx(ie,{path:"/boletos",element:n.jsx(Ie,{requireSubscription:!0,children:n.jsx(he,{children:n.jsx(wA,{})})})}),n.jsx(ie,{path:"/sobre",element:n.jsx(he,{children:n.jsx(LA,{})})}),n.jsx(ie,{path:"/termos",element:n.jsx(he,{children:n.jsx(CA,{})})}),n.jsx(ie,{path:"/privacidade",element:n.jsx(he,{children:n.jsx(bA,{})})}),n.jsx(ie,{path:"/contato",element:n.jsx(he,{children:n.jsx(IA,{})})}),n.jsx(ie,{path:"*",element:n.jsx(he,{children:n.jsx(mA,{})})})]})})})]})})})})})})})})});Iw(document.getElementById("root")).render(n.jsx(S.StrictMode,{children:n.jsx(AA,{})}));export{em as $,A0 as A,Ce as B,U1 as C,Xo as D,K2 as E,zy as F,cs as G,Uo as H,sk as I,ft as J,pt as K,Jk as L,i3 as M,S0 as N,Wo as O,kr as P,ol as Q,vr as R,Sr as S,mo as T,Pr as U,Km as V,dg as W,Q2 as X,Eo as Y,Tr as Z,MM as _,Mx as a,FA as a$,Ho as a0,af as a1,xC as a2,Se as a3,ro as a4,z0 as a5,ee as a6,jS as a7,MS as a8,BA as a9,zr as aA,nv as aB,Ct as aC,lo as aD,sy as aE,ko as aF,I5 as aG,Oo as aH,V3 as aI,rt as aJ,UA as aK,Ze as aL,Hr as aM,ur as aN,ik as aO,dr as aP,D0 as aQ,Go as aR,po as aS,G0 as aT,VM as aU,kl as aV,Fh as aW,cr as aX,P4 as aY,om as aZ,Zg as a_,EA as aa,qa as ab,mS as ac,v5 as ad,is as ae,os as af,b0 as ag,Qi as ah,gi as ai,fr as aj,V0 as ak,f0 as al,mr as am,io as an,Ne as ao,tr as ap,yf as aq,l1 as ar,op as as,tv as at,fp as au,or as av,K1 as aw,W1 as ax,TA as ay,Ff as az,yv as b,Ng as b0,RA as b1,Fr as b2,bb as b3,xe as b4,Re as b5,DA as b6,Mb as b7,sb as b8,nx as b9,_g as ba,ib as bb,db as bc,Aw as bd,xb as be,lb as bf,ua as bg,ue as bh,Tk as bi,ym as bj,Ri as c,u1 as d,k1 as e,Er as f,M1 as g,xx as h,rw as i,so as j,Lr as k,xr as l,tA as m,Mo as n,nt as o,CS as p,OA as q,NA as r,O as s,We as t,Zr as u,sf as v,Ap as w,mm as x,_A as y,$2 as z};
