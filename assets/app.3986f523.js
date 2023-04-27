import{d as G,s as ve,a3 as Ae,f as oe,e as X,h as re,c as g,b as ne,F as S,x as u,t as x,M as N,o as h,_ as ie,Y as Ce,r as Se,C as le,z as ue,N as Oe,O as He,a as ce,w as Ie,i as Te,K as ae,a4 as $e,u as Ne,l as Pe,a5 as Re,a6 as Be,a7 as Me,a8 as We,a9 as Ue,aa as Ve,ab as De,ac as Fe,ad as qe,ae as Ye,af as Xe,ag as Ze,ah as Ge,H as Ke}from"./chunks/framework.8adc4ca2.js";import{t as Qe}from"./chunks/theme.e258cfe6.js";/*! medium-zoom 1.0.8 | MIT License | https://github.com/francoischalifour/medium-zoom */var O=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n[r]=o[r])}return n},Y=function(t){return t.tagName==="IMG"},Je=function(t){return NodeList.prototype.isPrototypeOf(t)},Z=function(t){return t&&t.nodeType===1},me=function(t){var o=t.currentSrc||t.src;return o.substr(-4).toLowerCase()===".svg"},pe=function(t){try{return Array.isArray(t)?t.filter(Y):Je(t)?[].slice.call(t).filter(Y):Z(t)?[t].filter(Y):typeof t=="string"?[].slice.call(document.querySelectorAll(t)).filter(Y):[]}catch{throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`)}},et=function(t){var o=document.createElement("div");return o.classList.add("medium-zoom-overlay"),o.style.background=t,o},tt=function(t){var o=t.getBoundingClientRect(),r=o.top,d=o.left,L=o.width,A=o.height,z=t.cloneNode(),R=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,H=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return z.removeAttribute("id"),z.style.position="absolute",z.style.top=r+R+"px",z.style.left=d+H+"px",z.style.width=L+"px",z.style.height=A+"px",z.style.transform="",z},$=function(t,o){var r=O({bubbles:!1,cancelable:!1,detail:void 0},o);if(typeof window.CustomEvent=="function")return new CustomEvent(t,r);var d=document.createEvent("CustomEvent");return d.initCustomEvent(t,r.bubbles,r.cancelable,r.detail),d},nt=function n(t){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=window.Promise||function(a){function i(){}a(i,i)},d=function(a){var i=a.target;if(i===F){p();return}_.indexOf(i)!==-1&&j({target:i})},L=function(){if(!(I||!e.original)){var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(se-a)>l.scrollOffset&&setTimeout(p,150)}},A=function(a){var i=a.key||a.keyCode;(i==="Escape"||i==="Esc"||i===27)&&p()},z=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=a;if(a.background&&(F.style.background=a.background),a.container&&a.container instanceof Object&&(i.container=O({},l.container,a.container)),a.template){var c=Z(a.template)?a.template:document.querySelector(a.template);i.template=c}return l=O({},l,i),_.forEach(function(m){m.dispatchEvent($("medium-zoom:update",{detail:{zoom:f}}))}),f},R=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return n(O({},l,a))},H=function(){for(var a=arguments.length,i=Array(a),c=0;c<a;c++)i[c]=arguments[c];var m=i.reduce(function(s,b){return[].concat(s,pe(b))},[]);return m.filter(function(s){return _.indexOf(s)===-1}).forEach(function(s){_.push(s),s.classList.add("medium-zoom-image")}),D.forEach(function(s){var b=s.type,E=s.listener,T=s.options;m.forEach(function(C){C.addEventListener(b,E,T)})}),f},U=function(){for(var a=arguments.length,i=Array(a),c=0;c<a;c++)i[c]=arguments[c];e.zoomed&&p();var m=i.length>0?i.reduce(function(s,b){return[].concat(s,pe(b))},[]):_;return m.forEach(function(s){s.classList.remove("medium-zoom-image"),s.dispatchEvent($("medium-zoom:detach",{detail:{zoom:f}}))}),_=_.filter(function(s){return m.indexOf(s)===-1}),f},w=function(a,i){var c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return _.forEach(function(m){m.addEventListener("medium-zoom:"+a,i,c)}),D.push({type:"medium-zoom:"+a,listener:i,options:c}),f},k=function(a,i){var c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return _.forEach(function(m){m.removeEventListener("medium-zoom:"+a,i,c)}),D=D.filter(function(m){return!(m.type==="medium-zoom:"+a&&m.listener.toString()===i.toString())}),f},v=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=a.target,c=function(){var s={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},b=void 0,E=void 0;if(l.container)if(l.container instanceof Object)s=O({},s,l.container),b=s.width-s.left-s.right-l.margin*2,E=s.height-s.top-s.bottom-l.margin*2;else{var T=Z(l.container)?l.container:document.querySelector(l.container),C=T.getBoundingClientRect(),Q=C.width,he=C.height,ye=C.left,be=C.top;s=O({},s,{width:Q,height:he,left:ye,top:be})}b=b||s.width-l.margin*2,E=E||s.height-l.margin*2;var M=e.zoomedHd||e.original,ze=me(M)?b:M.naturalWidth||b,ke=me(M)?E:M.naturalHeight||E,q=M.getBoundingClientRect(),_e=q.top,we=q.left,J=q.width,ee=q.height,Ee=Math.min(Math.max(J,ze),b)/J,xe=Math.min(Math.max(ee,ke),E)/ee,te=Math.min(Ee,xe),Le=(-we+(b-J)/2+l.margin+s.left)/te,je=(-_e+(E-ee)/2+l.margin+s.top)/te,de="scale("+te+") translate3d("+Le+"px, "+je+"px, 0)";e.zoomed.style.transform=de,e.zoomedHd&&(e.zoomedHd.style.transform=de)};return new r(function(m){if(i&&_.indexOf(i)===-1){m(f);return}var s=function Q(){I=!1,e.zoomed.removeEventListener("transitionend",Q),e.original.dispatchEvent($("medium-zoom:opened",{detail:{zoom:f}})),m(f)};if(e.zoomed){m(f);return}if(i)e.original=i;else if(_.length>0){var b=_;e.original=b[0]}else{m(f);return}if(e.original.dispatchEvent($("medium-zoom:open",{detail:{zoom:f}})),se=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,I=!0,e.zoomed=tt(e.original),document.body.appendChild(F),l.template){var E=Z(l.template)?l.template:document.querySelector(l.template);e.template=document.createElement("div"),e.template.appendChild(E.content.cloneNode(!0)),document.body.appendChild(e.template)}if(e.original.parentElement&&e.original.parentElement.tagName==="PICTURE"&&e.original.currentSrc&&(e.zoomed.src=e.original.currentSrc),document.body.appendChild(e.zoomed),window.requestAnimationFrame(function(){document.body.classList.add("medium-zoom--opened")}),e.original.classList.add("medium-zoom-image--hidden"),e.zoomed.classList.add("medium-zoom-image--opened"),e.zoomed.addEventListener("click",p),e.zoomed.addEventListener("transitionend",s),e.original.getAttribute("data-zoom-src")){e.zoomedHd=e.zoomed.cloneNode(),e.zoomedHd.removeAttribute("srcset"),e.zoomedHd.removeAttribute("sizes"),e.zoomedHd.removeAttribute("loading"),e.zoomedHd.src=e.zoomed.getAttribute("data-zoom-src"),e.zoomedHd.onerror=function(){clearInterval(T),console.warn("Unable to reach the zoom image target "+e.zoomedHd.src),e.zoomedHd=null,c()};var T=setInterval(function(){e.zoomedHd.complete&&(clearInterval(T),e.zoomedHd.classList.add("medium-zoom-image--opened"),e.zoomedHd.addEventListener("click",p),document.body.appendChild(e.zoomedHd),c())},10)}else if(e.original.hasAttribute("srcset")){e.zoomedHd=e.zoomed.cloneNode(),e.zoomedHd.removeAttribute("sizes"),e.zoomedHd.removeAttribute("loading");var C=e.zoomedHd.addEventListener("load",function(){e.zoomedHd.removeEventListener("load",C),e.zoomedHd.classList.add("medium-zoom-image--opened"),e.zoomedHd.addEventListener("click",p),document.body.appendChild(e.zoomedHd),c()})}else c()})},p=function(){return new r(function(a){if(I||!e.original){a(f);return}var i=function c(){e.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(e.zoomed),e.zoomedHd&&document.body.removeChild(e.zoomedHd),document.body.removeChild(F),e.zoomed.classList.remove("medium-zoom-image--opened"),e.template&&document.body.removeChild(e.template),I=!1,e.zoomed.removeEventListener("transitionend",c),e.original.dispatchEvent($("medium-zoom:closed",{detail:{zoom:f}})),e.original=null,e.zoomed=null,e.zoomedHd=null,e.template=null,a(f)};I=!0,document.body.classList.remove("medium-zoom--opened"),e.zoomed.style.transform="",e.zoomedHd&&(e.zoomedHd.style.transform=""),e.template&&(e.template.style.transition="opacity 150ms",e.template.style.opacity=0),e.original.dispatchEvent($("medium-zoom:close",{detail:{zoom:f}})),e.zoomed.addEventListener("transitionend",i)})},j=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=a.target;return e.original?p():v({target:i})},V=function(){return l},B=function(){return _},K=function(){return e.original},_=[],D=[],I=!1,se=0,l=o,e={original:null,zoomed:null,zoomedHd:null,template:null};Object.prototype.toString.call(t)==="[object Object]"?l=t:(t||typeof t=="string")&&H(t),l=O({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},l);var F=et(l.background);document.addEventListener("click",d),document.addEventListener("keyup",A),document.addEventListener("scroll",L),window.addEventListener("resize",p);var f={open:v,close:p,toggle:j,update:z,clone:R,attach:H,detach:U,on:w,off:k,getOptions:V,getImages:B,getZoomedImage:K};return f};function ot(n,t){t===void 0&&(t={});var o=t.insertAt;if(!(!n||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],d=document.createElement("style");d.type="text/css",o==="top"&&r.firstChild?r.insertBefore(d,r.firstChild):r.appendChild(d),d.styleSheet?d.styleSheet.cssText=n:d.appendChild(document.createTextNode(n))}}var at=".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";ot(at);const rt=nt;function it(n,t="key",o="value"){return Object.entries(n).map(([r,d])=>({[t]:r,[o]:d}))}const W="",st="/pages",dt={class:"base-layout"},lt={class:"base-section-title"},ut={class:"base-group"},ct=["onClick"],mt={class:"base-title"},pt={class:"base-groups"},ft=["onClick"],vt=G({__name:"BaseIndex",props:["title"],setup(n){const t=ve(),o=Ae(),r=oe([]),d=oe({}),L=X(()=>t.path===`${W}${st}/`),A=X(()=>it(r.value).map(k=>({...k,...d.value[k.key]})).sort(({order:k=999},{order:v=999})=>k-v)),z=X(()=>{const w=Object.keys(r.value),k=t.path,v=w.findIndex(p=>k.startsWith(W+p));return v!==-1?r.value[w[v]]:[]}),R=async()=>{const w=await fetch(`${W}/sidebar.json`).then(v=>v.json()),k={};Object.entries(w).forEach(([v,p])=>{p.length>0&&(k[v]=p)}),r.value=k},H=async()=>{const w=await fetch(`${W}/pageInfo.json`).then(k=>k.json());d.value=w},U=w=>{o.go(W+w)};return re(async()=>{await H(),R()}),(w,k)=>(h(),g("div",dt,[ne(L)?(h(),g(S,{key:0},[u("h1",null,x(n.title),1),(h(!0),g(S,null,N(ne(A),(v,p)=>(h(),g("div",{class:"base-section",key:p},[u("h2",lt,x(v.text),1),u("div",null,[(h(!0),g(S,null,N(v.value,(j,V)=>(h(),g("div",{key:V,class:"base-groups"},[u("h3",null,x(j.text),1),u("ul",ut,[(h(!0),g(S,null,N(j.items,(B,K)=>(h(),g("li",{key:B.link},[u("a",{href:"javascript:;",onClick:_=>U(B.link)},x(K+1)+". "+x(B.text),9,ct)]))),128))])]))),128))])]))),128))],64)):(h(),g(S,{key:1},[u("h1",mt,x(n.title),1),u("div",pt,[(h(!0),g(S,null,N(ne(z),(v,p)=>(h(),g("div",{key:p,class:"base-group"},[u("h3",null,x(v.text),1),u("ul",null,[(h(!0),g(S,null,N(v.items,j=>(h(),g("li",{key:j.link},[u("a",{href:"javascript:;",onClick:V=>U(j.link)},x(j.text),9,ft)]))),128))])]))),128))])],64))]))}});const gt=ie(vt,[["__scopeId","data-v-0fbae068"]]),ht={class:"word-audio"},yt=G({__name:"WordAudio",props:{src:{default:"https://dict.youdao.com/dictvoice"},type:{default:0},word:null,size:{default:16}},setup(n){const t=n,o=X(()=>`${t.src}?audio=${t.word}&type=${t.type}`),r=oe(),d=()=>{r.value||(r.value=new Audio(o.value)),r.value.play()};return(L,A)=>(h(),g("div",ht,[u("button",{href:"javascript:;",class:"word-audio__text",style:Ce(`font-size: ${t.size}px;`),onClick:d},"🔊",4),Se(L.$slots,"default",{},void 0,!0)]))}});const fe=ie(yt,[["__scopeId","data-v-d45659d7"]]),bt=n=>(Oe("data-v-533b0ba9"),n=n(),He(),n),zt={key:0},kt=bt(()=>u("thead",null,[u("tr",null,[u("th",null,"单词"),u("th",null,"正确发音（英音）"),u("th",null,"正确发音（美音）"),u("th")])],-1)),_t=["href"],wt={key:1},Et=G({__name:"WordList",setup(n){const t=[["access","/'ækses/","/ˈækses/"],["Adobe","/ə'dəʊbi/","/ə'dəʊbi/"],["admin","/'ædmɪn/","/ˈædmɪn/"],["amazon","/'æməzən/","/ˈæməzɑːn/"],["analogy","/əˈnælədʒi/","/əˈnælədʒi/"],["Angular","/'æŋgjʊlə/","/ˈæŋɡjələr/"],["AJAX","/'eidʒæks/","/'eidʒæks/"],["alias","/ˈeɪliəs/","/ˈeɪliəs/"],["align","/əˈlaɪn/","/əˈlaɪn/"],["Apache","/ə'pætʃɪ/","/əˈpætʃi/"],["app","/æp/","/æp/"],["archive","/'ɑːkaɪv/","/'ɑːkaɪv/"],["array","/ə'rei/","/əˈreɪ/"],["ASCII","/'æski/","/ˈæski/"],["aspect","/'æspekt/","/ˈæspekt/"],["async","/əˈsɪŋk/","/æˈsɪŋk/"],["avatar","/'ævətɑː/","/ˈævətɑːr/"],["Azure","/'æʒə/","/ˈæʒər/"],["bind","/baɪnd/","/baɪnd/"],["BIOS","/ˈbaɪɒs/","/'baɪɑs/"],["cache","/kæʃ/","/kæʃ/"],["chrome","/krəʊm/","/kroʊm/"],["context","/ˈkɒntekst/","/ ˈkɑːntekst/"],["deny","/dɪ'naɪ/","/dɪˈnaɪ/"],["deprecate","/ˈdeprəkeɪt/","/ˈdeprəkeɪt/"],["deque","/'dek/","/dɛk/"],["digest","n. /'dɑɪdʒɛst/ v. /dɑɪ'dʒɛst/","/daɪˈdʒest,dɪˈdʒest/"],["doc","/dɒk/","/dɒk/"],["dotnet","/dɒtnet/","/dɑːtnet/"],["edition","/ɪˈdɪʃ(ə)n/","/ɪˈdɪʃn/"],["execute","/ˈeksɪkjuːt/","/ˈeksɪkjuːt/"],["executor","/ɪɡˈzekjətə(r)/","/ɪɡˈzekjətər/"],["event","/ɪ'vent/","/ɪˈvent/"],["exit","/ˈeksɪt/","/ˈeksɪt; ˈeɡzɪt/"],["format","/'fɔːmæt/","/ˈfɔːrmæt/"],["gauge","/ɡeɪdʒ/","/ɡeɪdʒ/"],["Git","/ɡɪt/","/ɡɪt/"],["GraphQL","/græf kju ɛl/","/græf kju ɛl/"],["GUI","/ˈɡu:i/","/ˈɡu:i/"],["height","/haɪt/","/haɪt/"],["hidden","/'hɪdn/","/ˈhɪdn/"],["image","/'ɪmɪdʒ/","/ˈɪmɪdʒ/"],["implement","/'ɪmplɪm(ə)nt/","/ˈɪmplɪmənt/ /ˈɪmpləˌment/"],["integer","/'ɪntɪdʒə/","/ˈɪntɪdʒər/"],["issue","/'ɪʃuː/","/ˈɪʃuː/"],["Java","/'dʒɑːvə/","/ˈdʒɑːvə/"],["jpg","/'dʒeɪpeɡ/","/'dʒeɪpeɡ/"],["key","/kiː/","/kiː/"],["legacy","/'leɡəsi/","/'leɡəsi/"],["linear","/'lɪnɪə/","/ˈlɪniər/"],["Linux","/'lɪnəks/","/ˈlaɪnəks/ /ˈlɪnəks/"],["locale","/ləʊ'kɑːl/","/loʊˈkæl/"],["macro","/ˈmækrəʊ/","/ˈmækroʊ/"],["main","/meɪn/","/meɪn/"],["margin","/'mɑːdʒɪn/","/ˈmɑːrdʒɪn/"],["matrix","/ˈmeɪtrɪks/","/ˈmeɪtrɪks/"],["max","/mæks/","/mæks/"],["Microsoft","/'maikrəusɔft/","/ˈmaɪkrəsɔːft/"],["module","/'mɒdjuːl/","/ˈmɑːdʒuːl/"],["native","/ˈneɪtɪv/","/ˈneɪtɪv/"],["nginx","Engine X","Engine X"],["null","/nʌl/","/nʌl/"],["obsolete","/ˈɒbsəliːt/","/ˌɑːbsəˈliːt/"],["parameter","/pə'ræmɪtə/","/pəˈræmɪtər/"],["privilege","/'prɪvəlɪdʒ/","/ˈprɪvəlɪdʒ/"],["probe","/prəʊb/","/proʊb/"],["Qt","/kjuːt/","/kjuːt/"],["query","/'kwɪəri/","/ˈkwɪri/"],["reconcile","/ˈrekənsaɪl/","/ˈrekənsaɪl/"],["Redux","/ri'dʌks/","/ri'dʌks/"],["resume","/rɪ'zju:m/","/rɪˈzuːm/"],["resolved","/rɪ'zɒlvd/","/rɪˈzɑːlvd/"],["resort","/rɪˈzɔ:t/","/rɪˈzɔːrt/"],["route","/ruːt/","/ruːt,raʊt/"],["safari","/sə'fɑːrɪ/","/səˈfɑːri/"],["scheme","/skiːm/","/skiːm/"],["scala","/ˈskɑːlɑ/","/ˈskɑːlɑ/"],["SQL","/ˈsiːkwəl/ /ˈesˈkjuːˈel/","/ˈsiːkwəl/ /ˈesˈkjuːˈel/"],["sudo","/'suːduː/","/'suːduː/"],["suite","/swiːt/","/swiːt/"],["tuple","/tjʊpəl/","/tuːpəl/"],["typical","/'tɪpɪkl/","/ˈtɪpɪkl/"],["Ubuntu","/ʊ'bʊntʊ/","/ʊ'bʊntʊ/"],["variable","/'veəriəbl/","/ˈveriəbl,ˈværiəbl/"],["verbose","/vɜːˈbəʊs/","/vɜːrˈboʊs/"],["vue","/v'ju:/","/v'ju:/"],["width","/wɪdθ/","/wɪdθ,wɪtθ/"],["YouTube","/'juː'tjuːb/","/'juː'tjuːb/"],["Vite","/vit/","/vit/"],["ref"],["attrs"],["listeners"],["provide"],["inject"],["vuex"],["emits"],["Unmount"],["Maximum"]];return(o,r)=>t.length?(h(),g("table",zt,[kt,u("tbody",null,[(h(),g(S,null,N(t,([d,L,A],z)=>u("tr",{key:z},[u("td",null,x(d),1),u("td",null,[le(fe,{word:d,type:1},{default:ue(()=>[ce(x(L),1)]),_:2},1032,["word"])]),u("td",null,[le(fe,{word:d},{default:ue(()=>[ce(x(A),1)]),_:2},1032,["word"])]),u("td",null,[u("a",{href:`https://dict.youdao.com/result?word=${d}&lang=en`,target:"_blank",class:"link-clear"},"🔗",8,_t)])])),64))])])):(h(),g("span",wt,"❌暂无单词"))}});const xt=ie(Et,[["__scopeId","data-v-533b0ba9"]]);const Lt={...Qe,enhanceApp({app:n,router:t,siteData:o}){n.component("base-index",gt),n.component("word-list",xt)},setup(){const n=ve(),t=()=>{rt(".main img",{background:"var(--vp-c-bg)",margin:10})};re(()=>{t()}),Ie(()=>n.path,()=>{Te(()=>{t()})})}};function ge(n){if(n.extends){const t=ge(n.extends);return{...t,...n,async enhanceApp(o){t.enhanceApp&&await t.enhanceApp(o),n.enhanceApp&&await n.enhanceApp(o)}}}return n}const P=ge(Lt),jt=G({name:"VitePressApp",setup(){const{site:n}=Ne();return re(()=>{Pe(()=>{document.documentElement.lang=n.value.lang,document.documentElement.dir=n.value.dir})}),Re(),Be(),Me(),P.setup&&P.setup(),()=>We(P.Layout)}});async function At(){const n=St(),t=Ct();t.provide(Ue,n);const o=Ve(n.route);return t.provide(De,o),t.component("Content",Fe),t.component("ClientOnly",qe),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return o.frontmatter.value}},$params:{get(){return o.page.value.params}}}),P.enhanceApp&&await P.enhanceApp({app:t,router:n,siteData:Ye}),{app:t,router:n,data:o}}function Ct(){return Xe(jt)}function St(){let n=ae,t;return Ze(o=>{let r=Ge(o);return n&&(t=r),(n||t===r)&&(r=r.replace(/\.js$/,".lean.js")),ae&&(n=!1),Ke(()=>import(r),[])},P.NotFound)}ae&&At().then(({app:n,router:t,data:o})=>{t.go().then(()=>{$e(t.route,o.site),n.mount("#app")})});export{At as createApp};
