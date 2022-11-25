import{_ as s,c as n,o as a,d as p}from"./app.b1cc391c.js";const C=JSON.parse('{"title":"\u5B9E\u6218","description":"","frontmatter":{"title":"\u5B9E\u6218","order":4},"headers":[{"level":2,"title":"node-sass","slug":"node-sass","link":"#node-sass","children":[]},{"level":2,"title":"production","slug":"production","link":"#production","children":[]},{"level":2,"title":"RequestError","slug":"requesterror","link":"#requesterror","children":[]},{"level":2,"title":"\u914D\u7F6E\u4EE3\u7406","slug":"\u914D\u7F6E\u4EE3\u7406","link":"#\u914D\u7F6E\u4EE3\u7406","children":[]}],"relativePath":"pages/package/cli/practice.md"}'),l={name:"pages/package/cli/practice.md"},e=p(`<h1 id="\u5B9E\u6218" tabindex="-1">\u5B9E\u6218 <a class="header-anchor" href="#\u5B9E\u6218" aria-hidden="true">#</a></h1><h2 id="node-sass" tabindex="-1">node-sass <a class="header-anchor" href="#node-sass" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#A6ACCD;"> yarn add sass-loader@^10.1.1</span></span>
<span class="line"></span></code></pre></div><h2 id="production" tabindex="-1">production <a class="header-anchor" href="#production" aria-hidden="true">#</a></h2><p>\u5982\u679C production \u4E3A true \u5C06\u4E0D\u4F1A\u5B89\u88C5 \u5F00\u53D1\u4F9D\u8D56</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm config get production</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> production </span><span style="color:#82AAFF;">false</span></span>
<span class="line"></span></code></pre></div><h2 id="requesterror" tabindex="-1">RequestError <a class="header-anchor" href="#requesterror" aria-hidden="true">#</a></h2><p>connect ETIMEDOUT 20.205.243.166:443</p><ol><li>cmd \u4E2D ping <a href="http://github.com" target="_blank" rel="noreferrer">github.com</a> \uFF0C\u662F\u5426\u80FD\u591F\u6B63\u5E38\u8FDE\u63A5</li><li>\u4E0D\u80FD\u6B63\u5E38\u8FDE\u63A5\uFF0C\u5728 <code>C:\\Windows\\System32\\drivers\\etc</code>\u76EE\u5F55\u4E0B host \u6587\u4EF6\u4E0B\u6DFB\u52A0</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">140.82.114.3 github.com</span></span>
<span class="line"></span></code></pre></div><blockquote><p>140.82.114.3 \u83B7\u53D6\uFF1A\u5728 <a href="https://ipaddress.com/" target="_blank" rel="noreferrer">https://ipaddress.com/</a> \u4E2D\uFF0C\u641C\u7D22 <a href="http://github.com" target="_blank" rel="noreferrer">github.com</a></p></blockquote><h2 id="\u914D\u7F6E\u4EE3\u7406" tabindex="-1">\u914D\u7F6E\u4EE3\u7406 <a class="header-anchor" href="#\u914D\u7F6E\u4EE3\u7406" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;">## cmd \u914D\u7F6E\u4E34\u65F6\u4EE3\u7406</span></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> http_proxy=http://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> https_proxy=http://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#676E95;">## \u67E5\u770B\u914D\u7F6E\u72B6\u6001</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> %http_proxy%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## powershell \u8BBE\u7F6E\u4EE3\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">netsh winhttp </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> proxy </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">127.0.0.1:1080</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">netsh winhttp reset proxy</span></span>
<span class="line"><span style="color:#676E95;">## \u67E5\u770B\u4EE3\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">netsh winhttp show proxy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## git \u914D\u7F6E\u5C40\u90E8\u4EE3\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">git config http.proxy http://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#A6ACCD;">git config https.proxy http://127.0.0.1:1080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git config http.proxy socks5://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#A6ACCD;">git config https.proxy socks5://127.0.0.1:1080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## \u53EA\u5BF9github\u751F\u6548</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --global http.https://github.com.proxy socks5://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --global --unset http.https://github.com.proxy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## \u5220\u9664\u5C40\u90E8\u4EE3\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --unset http.proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --unset https.proxy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## npm \u914D\u7F6E\u4EE3\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> proxy http://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> https-proxy http://127.0.0.1:1080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm config delete proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config delete https-proxy</span></span>
<span class="line"><span style="color:#676E95;">## \u67E5\u770B\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## yarn \u4EE3\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn config list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">yarn config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> proxy http://127.0.0.1:1080</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> https-proxy http://127.0.0.1:1080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">yarn config delete proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn config delete https-proxy</span></span>
<span class="line"></span></code></pre></div>`,13),o=[e];function t(c,r,i,h,d,y){return a(),n("div",null,o)}const g=s(l,[["render",t]]);export{C as __pageData,g as default};
