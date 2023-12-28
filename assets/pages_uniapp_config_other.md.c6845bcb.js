import{_ as s,o as a,c as e,S as n}from"./chunks/framework.5a1651ed.js";const g=JSON.parse('{"title":"其他配置","description":"","frontmatter":{"title":"其他配置","order":3},"headers":[],"relativePath":"pages/uniapp/config/other.md","filePath":"pages/uniapp/config/other.md","lastUpdated":1683982947000}'),o={name:"pages/uniapp/config/other.md"},l=n(`<h1 id="其他配置" tabindex="-1">其他配置 <a class="header-anchor" href="#其他配置" aria-label="Permalink to &quot;其他配置&quot;">​</a></h1><h2 id="vue-config-js" tabindex="-1">vue.config.js <a class="header-anchor" href="#vue-config-js" aria-label="Permalink to &quot;vue.config.js&quot;">​</a></h2><p><code>vue.config.js</code> 是一个可选的配置文件，<strong>项目根目录</strong>中存在这个文件，会被自动加载</p><blockquote><p><strong>仅 vue 页面生效</strong></p></blockquote><h2 id="uni-scss" tabindex="-1">uni.scss <a class="header-anchor" href="#uni-scss" aria-label="Permalink to &quot;uni.scss&quot;">​</a></h2><p><code>uni.scss</code>是一个特殊文件，<strong>无需 <code>import</code> 即可在<code>scss</code>代码中使用</strong></p><blockquote><p><code>pages.json</code>不支持<code>scss</code>，原生导航栏和 tabbar 的动态修改只能使用 js api</p></blockquote><h2 id="app-vue" tabindex="-1">App.vue <a class="header-anchor" href="#app-vue" aria-label="Permalink to &quot;App.vue&quot;">​</a></h2><p><code>App.vue</code>是 uni-app 的主组件，所有页面都是在<code>App.vue</code>下进行切换</p><blockquote><p><code>App.vue</code>本身不是页面，不能编写视图元素</p></blockquote><p><strong>文件作用</strong></p><ul><li>调用<em>应用生命周期函数</em></li><li>配置<em>全局样式</em></li><li>配置<em>全局存储<code>globalData</code></em></li></ul><p>应用生命周期仅可在<code>App.vue</code>中监听，在<strong>页面监听无效</strong></p><p><strong>globalData</strong></p><p>全局变量机制，全端通用。</p><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">globalData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong><code>js</code>方式</strong>： <code>getApp().globalData.text = &#39;test&#39;</code></p><p>在应用 onLaunch 时，<code>getApp</code>对象还未获取，暂时可以使用<code>this.$scope.globalData</code>获取<code>globalData</code>。</p><p><code>globalData</code>数据绑定到页面上，可在页面<code>onShow</code>进行变量重赋值</p><p>由于<strong>weex 生命周期不支持 onShow</strong></p><ul><li>可利用监听 webview 的<code>addEventListener</code> <code>show</code>事件实现<code>onShow</code>效果</li><li>或直接使用 weex 生命周期中<code>beforeCreate</code></li></ul><p><code>globalData</code>是简单的全局变量</p><p><strong>全局样式</strong></p><p>同时有<code>vue</code>和<code>nvue</code>文件，全局样式的所有 css 会应用于所有文件，而 nvue 支持的 css 有限，编译器会在控制台报警，提示某些 css 无法在 nvue 中支持</p><p>需把 nvue 不支持的 css<strong>写在单独的条件编译</strong></p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* #ifndef APP-PLUS-NVUE */</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">@import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./common/uni.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* #endif*/</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/</span><span style="color:#FFCB6B;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h1>`,27),p=[l];function t(c,r,i,d,u,D){return a(),e("div",null,p)}const y=s(o,[["render",t]]);export{g as __pageData,y as default};