/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.8 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

var requirejs,require,define;!function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var i;for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}}function eachReverse(e,t){if(e){var i;for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(e,t,i,r){return t&&eachProp(t,function(t,o){(i||!hasProp(e,o))&&(r&&"string"!=typeof t?(e[o]||(e[o]={}),mixin(e[o],t,i,r)):e[o]=t)}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var o=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return o.requireType=e,o.requireModules=r,i&&(o.originalError=i),o}function newContext(e){function t(e){var t,i;for(t=0;e[t];t+=1)if(i=e[t],"."===i)e.splice(t,1),t-=1;else if(".."===i){if(1===t&&(".."===e[2]||".."===e[0]))break;t>0&&(e.splice(t-1,2),t-=2)}}function i(e,i,r){var o,n,a,s,l,c,h,u,d,p,f,m=i&&i.split("/"),g=m,v=R.map,E=v&&v["*"];if(e&&"."===e.charAt(0)&&(i?(g=getOwn(R.pkgs,i)?m=[i]:m.slice(0,m.length-1),e=g.concat(e.split("/")),t(e),n=getOwn(R.pkgs,o=e[0]),e=e.join("/"),n&&e===o+"/"+n.main&&(e=o)):0===e.indexOf("./")&&(e=e.substring(2))),r&&v&&(m||E)){for(s=e.split("/"),l=s.length;l>0;l-=1){if(h=s.slice(0,l).join("/"),m)for(c=m.length;c>0;c-=1)if(a=getOwn(v,m.slice(0,c).join("/")),a&&(a=getOwn(a,h))){u=a,d=l;break}if(u)break;!p&&E&&getOwn(E,h)&&(p=getOwn(E,h),f=l)}!u&&p&&(u=p,d=f),u&&(s.splice(0,d,u),e=s.join("/"))}return e}function r(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===T.contextName?(t.parentNode.removeChild(t),!0):void 0})}function o(e){var t=getOwn(R.paths,e);return t&&isArray(t)&&t.length>1?(r(e),t.shift(),T.require.undef(e),T.require([e]),!0):void 0}function n(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function a(e,t,r,o){var a,s,l,c,h=null,u=t?t.name:null,d=e,p=!0,f="";return e||(p=!1,e="_@r"+(A+=1)),c=n(e),h=c[0],e=c[1],h&&(h=i(h,u,o),s=getOwn(M,h)),e&&(h?f=s&&s.normalize?s.normalize(e,function(e){return i(e,u,o)}):i(e,u,o):(f=i(e,u,o),c=n(f),h=c[0],f=c[1],r=!0,a=T.nameToUrl(f))),l=!h||s||r?"":"_unnormalized"+(D+=1),{prefix:h,name:f,parentMap:t,unnormalized:!!l,url:a,originalName:d,isDefine:p,id:(h?h+"!"+f:f)+l}}function s(e){var t=e.id,i=getOwn(b,t);return i||(i=b[t]=new T.Module(e)),i}function l(e,t,i){var r=e.id,o=getOwn(b,r);!hasProp(M,r)||o&&!o.defineEmitComplete?(o=s(e),o.error&&"error"===t?i(o.error):o.on(t,i)):"defined"===t&&i(M[r])}function c(e,t){var i=e.requireModules,r=!1;t?t(e):(each(i,function(t){var i=getOwn(b,t);i&&(i.error=e,i.events.error&&(r=!0,i.emit("error",e)))}),r||req.onError(e))}function h(){globalDefQueue.length&&(apsp.apply(S,[S.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function u(e){delete b[e],delete w[e]}function d(e,t,i){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,o){var n=r.id,a=getOwn(b,n);!a||e.depMatched[o]||i[n]||(getOwn(t,n)?(e.defineDep(o,M[n]),e.check()):d(a,t,i))}),i[r]=!0)}function p(){var e,t,i,n,a=1e3*R.waitSeconds,s=a&&T.startTime+a<(new Date).getTime(),l=[],h=[],u=!1,f=!0;if(!E){if(E=!0,eachProp(w,function(i){if(e=i.map,t=e.id,i.enabled&&(e.isDefine||h.push(i),!i.error))if(!i.inited&&s)o(t)?(n=!0,u=!0):(l.push(t),r(t));else if(!i.inited&&i.fetched&&e.isDefine&&(u=!0,!e.prefix))return f=!1}),s&&l.length)return i=makeError("timeout","Load timeout for modules: "+l,null,l),i.contextName=T.contextName,c(i);f&&each(h,function(e){d(e,{},{})}),s&&!n||!u||!isBrowser&&!isWebWorker||_||(_=setTimeout(function(){_=0,p()},50)),E=!1}}function f(e){hasProp(M,e[0])||s(a(e[0],null,!0)).init(e[1],e[2])}function m(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,T.onScriptLoad,"load","onreadystatechange"),m(t,T.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;for(h();S.length;){if(e=S.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));f(e)}}var E,y,T,x,_,R={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},b={},w={},H={},S=[],M={},C={},A=1,D=1;return x={require:function(e){return e.require?e.require:e.require=T.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?e.exports:e.exports=M[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){var t,i=getOwn(R.pkgs,e.map.id);return t=i?getOwn(R.config,e.map.id+"/"+i.main):getOwn(R.config,e.map.id),t||{}},exports:M[e.map.id]}}},y=function(e){this.events=getOwn(H,e.id)||{},this.map=e,this.shim=getOwn(R.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},y.prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,T.startTime=(new Date).getTime();var e=this.map;return this.shim?(T.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})),void 0):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;C[e]||(C[e]=!0,T.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,i=this.map.id,r=this.depExports,o=this.exports,n=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(n)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{o=T.execCb(i,n,r,o)}catch(a){e=a}else o=T.execCb(i,n,r,o);if(this.map.isDefine&&(t=this.module,t&&void 0!==t.exports&&t.exports!==this.exports?o=t.exports:void 0===o&&this.usingExports&&(o=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else o=n;this.exports=o,this.map.isDefine&&!this.ignore&&(M[i]=o,req.onResourceLoad&&req.onResourceLoad(T,this.map,this.depMaps)),u(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,r=a(e.prefix);this.depMaps.push(r),l(r,"defined",bind(this,function(r){var o,n,h,d=this.map.name,p=this.map.parentMap?this.map.parentMap.name:null,f=T.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(d=r.normalize(d,function(e){return i(e,p,!0)})||""),n=a(e.prefix+"!"+d,this.map.parentMap),l(n,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),h=getOwn(b,n.id),h&&(this.depMaps.push(n),this.events.error&&h.on("error",bind(this,function(e){this.emit("error",e)})),h.enable()),void 0):(o=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),o.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(b,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&u(e.map.id)}),c(e)}),o.fromText=bind(this,function(i,r){var n=e.name,l=a(n),h=useInteractive;r&&(i=r),h&&(useInteractive=!1),s(l),hasProp(R.config,t)&&(R.config[n]=R.config[t]);try{req.exec(i)}catch(u){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+u,u,[t]))}h&&(useInteractive=!0),this.depMaps.push(l),T.completeLoad(n),f([n],o)}),r.load(e.name,f,o,R),void 0)})),T.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){w[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,r,o;if("string"==typeof e){if(e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,o=getOwn(x,e.id))return this.depExports[t]=o(this),void 0;this.depCount+=1,l(e,"defined",bind(this,function(e){this.defineDep(t,e),this.check()})),this.errback&&l(e,"error",bind(this,this.errback))}i=e.id,r=b[i],hasProp(x,i)||!r||r.enabled||T.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(b,e.id);t&&!t.enabled&&T.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},T={config:R,contextName:e,registry:b,defined:M,urlFetched:C,defQueue:S,Module:y,makeModuleMap:a,nextTick:req.nextTick,onError:c,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=R.pkgs,i=R.shim,r={paths:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?"map"===t?(R.map||(R.map={}),mixin(R[t],e,!0,!0)):mixin(R[t],e,!0):R[t]=e}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=T.makeShimExports(e)),i[t]=e}),R.shim=i),e.packages&&(each(e.packages,function(e){var i;e="string"==typeof e?{name:e}:e,i=e.location,t[e.name]={name:e.name,location:i||e.name,main:(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),R.pkgs=t),eachProp(b,function(e,t){e.inited||e.map.unnormalized||(e.map=a(t))}),(e.deps||e.callback)&&T.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,r){function o(i,n,l){var h,u,d;return r.enableBuildCallback&&n&&isFunction(n)&&(n.__requireJsBuild=!0),"string"==typeof i?isFunction(n)?c(makeError("requireargs","Invalid require call"),l):t&&hasProp(x,i)?x[i](b[t.id]):req.get?req.get(T,i,t,o):(u=a(i,t,!1,!0),h=u.id,hasProp(M,h)?M[h]:c(makeError("notloaded",'Module name "'+h+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),T.nextTick(function(){v(),d=s(a(null,t)),d.skipMap=r.skipMap,d.init(i,n,l,{enabled:!0}),p()}),o)}return r=r||{},mixin(o,{isBrowser:isBrowser,toUrl:function(e){var r,o=e.lastIndexOf("."),n=e.split("/")[0],a="."===n||".."===n;return-1!==o&&(!a||o>1)&&(r=e.substring(o,e.length),e=e.substring(0,o)),T.nameToUrl(i(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(M,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,hasProp(M,e)||hasProp(b,e)}}),t||(o.undef=function(e){h();var i=a(e,t,!0),r=getOwn(b,e);delete M[e],delete C[i.url],delete H[e],r&&(r.events.defined&&(H[e]=r.events),u(e))}),o},enable:function(e){var t=getOwn(b,e.id);t&&s(e).enable()},completeLoad:function(e){var t,i,r,n=getOwn(R.shim,e)||{},a=n.exports;for(h();S.length;){if(i=S.shift(),null===i[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);f(i)}if(r=getOwn(b,e),!t&&!hasProp(M,e)&&r&&!r.inited){if(!(!R.enforceDefine||a&&getGlobal(a)))return o(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));f([e,n.deps||[],n.exportsFn])}p()},nameToUrl:function(e,t,i){var r,o,n,a,s,l,c,h,u;if(req.jsExtRegExp.test(e))h=e+(t||"");else{for(r=R.paths,o=R.pkgs,s=e.split("/"),l=s.length;l>0;l-=1){if(c=s.slice(0,l).join("/"),n=getOwn(o,c),u=getOwn(r,c)){isArray(u)&&(u=u[0]),s.splice(0,l,u);break}if(n){a=e===n.name?n.location+"/"+n.main:n.location,s.splice(0,l,a);break}}h=s.join("/"),h+=t||(/\?/.test(h)||i?"":".js"),h=("/"===h.charAt(0)||h.match(/^[\w\+\.\-]+:/)?"":R.baseUrl)+h}return R.urlArgs?h+((-1===h.indexOf("?")?"?":"&")+R.urlArgs):h},load:function(e,t){req.load(T,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);T.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);return o(t.id)?void 0:c(makeError("scripterror","Script error for: "+t.id,e,[t.id]))}},T.require=T.makeRequire(),T}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.8",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var o,n,a=defContextName;return isArray(e)||"string"==typeof e||(n=e,isArray(t)?(e=t,t=i,i=r):e=[]),n&&n.context&&(a=n.context),o=getOwn(contexts,a),o||(o=contexts[a]=req.s.newContext(a)),n&&o.configure(n),o.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},req.load=function(e,t,i){var r,o=e&&e.config||{};if(isBrowser)return r=req.createNode(o,t,i),r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=i,currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{importScripts(i),e.completeLoad(t)}catch(n){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+i,n,[t]))}},isBrowser&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(e,t,i){var r,o;"string"!=typeof e&&(i=t,t=e,e=null),isArray(t)||(i=t,t=null),!t&&isFunction(i)&&(t=[],i.length&&(i.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,i){t.push(i)}),t=(1===i.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),o=contexts[r.getAttribute("data-requirecontext")])),(o?o.defQueue:globalDefQueue).push([e,t,i])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this);