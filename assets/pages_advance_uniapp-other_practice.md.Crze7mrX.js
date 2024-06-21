import{_ as e,c as s,o as a,a5 as i}from"./chunks/framework.XlwyxPMj.js";const b=JSON.parse('{"title":"实践总结","description":"","frontmatter":{"title":"实践总结","order":2},"headers":[],"relativePath":"pages/advance/uniapp-other/practice.md","filePath":"pages/advance/uniapp-other/practice.md","lastUpdated":1711813192000}'),p={name:"pages/advance/uniapp-other/practice.md"},n=i(`<h1 id="实践总结" tabindex="-1">实践总结 <a class="header-anchor" href="#实践总结" aria-label="Permalink to &quot;实践总结&quot;">​</a></h1><h2 id="遮罩层滚动穿透" tabindex="-1">遮罩层滚动穿透 <a class="header-anchor" href="#遮罩层滚动穿透" aria-label="Permalink to &quot;遮罩层滚动穿透&quot;">​</a></h2><p><code>@touchmove.native.prevent</code> 设置在 遮罩层上</p><h2 id="app-ios-端软键盘上方横条去除方案" tabindex="-1">App - IOS 端软键盘上方横条去除方案 <a class="header-anchor" href="#app-ios-端软键盘上方横条去除方案" aria-label="Permalink to &quot;App - IOS 端软键盘上方横条去除方案&quot;">​</a></h2><p><code>pages.json</code></p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;app-plus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;softinputNavBar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;none&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>js</code>：动态设置<code>softinputNavBar</code></p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$scope.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$getAppWebview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  softinputNavBar: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;none&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//this.$scope.$getAppWebview()相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="app-关于软键盘弹出的逻辑说明" tabindex="-1">App - 关于软键盘弹出的逻辑说明 <a class="header-anchor" href="#app-关于软键盘弹出的逻辑说明" aria-label="Permalink to &quot;App - 关于软键盘弹出的逻辑说明&quot;">​</a></h2><p>App 平台软键盘弹出有 <code>adjustResize|adjustPan</code> 两种模式，默认为 ad~justPan 模式，小程序平台只支持 <code>adjustPan</code> 模式，H5 平台因不同浏览器而异</p><ul><li><code>adjustResize</code>：软键盘弹出时，webview 窗体<strong>高度挤压</strong>。<em>屏幕高度= <code>webview</code>窗体高度+软键盘高度</em></li><li><code>adjustPan</code>：软键盘弹出时，webview 窗体高度不变，<strong>窗体上推</strong></li></ul><p><code>pages.json</code></p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;app-plus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;softinputMode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;adjustResize&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><em>Tips</em></p><ul><li><code>adjustResize</code>模式在<code>Android App</code>上，因为要重设 webview 窗体高度，可能会在个别安卓机型闪现灰屏或漏出下层页面内容。</li><li>小程序端在 input 聚焦期间，<em>避免使用 <code>css</code> 动画</em>。</li><li><em>禁止点击其他位置收起键盘</em>，可以监听<code>touch</code>事件并使用<code>prevent</code>修饰符（仅支持 App-v3、H5，其他平台可以通过设置<code>focus</code>来使输入框重新获取焦点），例如在确认按钮上使用：<code>@touchend.prevent=&quot;onTap&quot;</code></li></ul><h2 id="app-关于软键盘收起的逻辑说明" tabindex="-1">App - 关于软键盘收起的逻辑说明 <a class="header-anchor" href="#app-关于软键盘收起的逻辑说明" aria-label="Permalink to &quot;App - 关于软键盘收起的逻辑说明&quot;">​</a></h2><ul><li><code>Android</code>：软键盘弹出，<em>点击 back 或点击非置焦区域</em>可收起软键盘</li><li><code>iOS</code>：软键盘上方有<em>带有“完成”的横条</em>，则需要<em>点完成</em>才能收起键盘；如果<em>无横条</em>，则点击非*<code>input/textarea</code>区域*可收起软键盘</li></ul><blockquote><p>隐藏软键盘 api：<code>uni.hideKeyboard()</code></p></blockquote><h2 id="wx-体验版接口失败" tabindex="-1">Wx - 体验版接口失败 <a class="header-anchor" href="#wx-体验版接口失败" aria-label="Permalink to &quot;Wx - 体验版接口失败&quot;">​</a></h2><p>场景：微信小程序体验版，不打开开发调试，接口调用失败</p><p>原因 1：体验版、正式版小程序需要校验域名是否存在后台白名单。</p><p>微信开发平台（软件） -&gt; 详情 -&gt; 本地设置 -&gt; 不进行校验域名...</p><p>将 <code>不进行校验域名... </code>勾选上</p><p>原因 2：需要配置合法域名</p><p>微信小程序平台() -&gt; 开发 -&gt; 开发设置 -&gt; 服务器域名</p><p>在服务器域名进行配置</p><blockquote><p><a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/</a></p></blockquote>`,27),t=[n];function l(o,d,r,c,h,u){return a(),s("div",null,t)}const m=e(p,[["render",l]]);export{b as __pageData,m as default};