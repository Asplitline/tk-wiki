import{_ as a,c as s,o as e,R as n}from"./chunks/framework.ec287406.js";const _=JSON.parse('{"title":"IOS","description":"","frontmatter":{"title":"IOS","order":3},"headers":[],"relativePath":"pages/expand/skill/ios.md","filePath":"pages/expand/skill/ios.md","lastUpdated":1683982947000}'),l={name:"pages/expand/skill/ios.md"},o=n(`<h1 id="ios-奇淫技巧" tabindex="-1">IOS 奇淫技巧 <a class="header-anchor" href="#ios-奇淫技巧" aria-label="Permalink to &quot;IOS 奇淫技巧&quot;">​</a></h1><h2 id="自定义-ios-脚本" tabindex="-1">自定义 IOS 脚本 <a class="header-anchor" href="#自定义-ios-脚本" aria-label="Permalink to &quot;自定义 IOS 脚本&quot;">​</a></h2><ol><li><p>新建 command 文件</p></li><li><p>给 command 文件设置权限</p></li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">START.command</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>编写 command 命令</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">open -a QQMusic.app</span></span>
<span class="line"><span style="color:#A6ACCD;">open -a WeChat.app</span></span>
<span class="line"><span style="color:#A6ACCD;">exit</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>原理：通过 <code>open -a</code> 打开 app，appName 为应用详情的名称</p><blockquote><p>修改文件在 xcode 里面操作，通过文本编译器操作会乱码</p></blockquote><ol start="4"><li>双击 command 文件</li></ol>`,9),p=[o];function t(i,c,r,d,m,h){return e(),s("div",null,p)}const b=a(l,[["render",t]]);export{_ as __pageData,b as default};
