import{_ as a,c as s,o as e,V as i}from"./chunks/framework.lom7OjVe.js";const b=JSON.parse('{"title":"IOS","description":"","frontmatter":{"title":"IOS","order":3},"headers":[],"relativePath":"pages/expand/skill/ios.md","filePath":"pages/expand/skill/ios.md","lastUpdated":1683982947000}'),n={name:"pages/expand/skill/ios.md"},p=i(`<h1 id="ios-奇淫技巧" tabindex="-1">IOS 奇淫技巧 <a class="header-anchor" href="#ios-奇淫技巧" aria-label="Permalink to &quot;IOS 奇淫技巧&quot;">​</a></h1><h2 id="自定义-ios-脚本" tabindex="-1">自定义 IOS 脚本 <a class="header-anchor" href="#自定义-ios-脚本" aria-label="Permalink to &quot;自定义 IOS 脚本&quot;">​</a></h2><ol><li><p>新建 command 文件</p></li><li><p>给 command 文件设置权限</p></li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> START.command</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>编写 command 命令</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>open -a QQMusic.app</span></span>
<span class="line"><span>open -a WeChat.app</span></span>
<span class="line"><span>exit</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>原理：通过 <code>open -a</code> 打开 app，appName 为应用详情的名称</p><blockquote><p>修改文件在 xcode 里面操作，通过文本编译器操作会乱码</p></blockquote><ol start="4"><li>双击 command 文件</li></ol>`,9),l=[p];function t(o,d,r,c,h,m){return e(),s("div",null,l)}const _=a(n,[["render",t]]);export{b as __pageData,_ as default};
