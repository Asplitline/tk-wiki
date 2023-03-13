import{_ as e,c as a,o as s,a as t}from"./app.972d4c24.js";const m=JSON.parse('{"title":"Vue","description":"","frontmatter":{"title":"Vue","order":1},"headers":[{"level":2,"title":"Q: hash 路由和 history 路由有什么区别","slug":"q-hash-路由和-history-路由有什么区别","link":"#q-hash-路由和-history-路由有什么区别","children":[]}],"relativePath":"pages/qa/tech/vue.md","lastUpdated":1673366132000}'),r={name:"pages/qa/tech/vue.md"},n=t(`<h1 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-hidden="true">#</a></h1><h2 id="q-hash-路由和-history-路由有什么区别" tabindex="-1">Q: hash 路由和 history 路由有什么区别 <a class="header-anchor" href="#q-hash-路由和-history-路由有什么区别" aria-hidden="true">#</a></h2><p>hash 路由: <a href="https://example.com/#/user/id" target="_blank" rel="noreferrer">https://example.com/#/user/id</a></p><p>机制：使用哈希字符（#）进行路由切换，实际 URL 并未发送到服务器，不需要在服务器层做处理</p><p>history 路由: <a href="https://example.com/user/id" target="_blank" rel="noreferrer">https://example.com/user/id</a></p><p>问题：应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 <a href="https://example.com/user/id%EF%BC%8C%E5%B0%B1%E4%BC%9A%E5%BE%97%E5%88%B0%E4%B8%80%E4%B8%AA" target="_blank" rel="noreferrer">https://example.com/user/id，就会得到一个</a> 404 错误。</p><p>解决：如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">  try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,8),l=[n];function p(o,h,i,c,d,_){return s(),a("div",null,l)}const f=e(r,[["render",p]]);export{m as __pageData,f as default};