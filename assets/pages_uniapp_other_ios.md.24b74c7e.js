import{_ as o,c as e,o as a,Q as t}from"./chunks/framework.7addaa9c.js";const s="/assets/image-20230109232639125.d48e3986.png",p="/assets/image-20230109232655279.87daec3f.png",g=JSON.parse('{"title":"IOS 打包","description":"","frontmatter":{"title":"IOS 打包","order":5},"headers":[],"relativePath":"pages/uniapp/other/ios.md","lastUpdated":1680364911000}'),n={name:"pages/uniapp/other/ios.md"},l=t('<h1 id="uniapp-ios-离线打包" tabindex="-1">uniapp IOS 离线打包 <a class="header-anchor" href="#uniapp-ios-离线打包" aria-label="Permalink to &quot;uniapp IOS 离线打包&quot;">​</a></h1><h2 id="ios-开发和生产证书申请" tabindex="-1">IOS 开发和生产证书申请 <a class="header-anchor" href="#ios-开发和生产证书申请" aria-label="Permalink to &quot;IOS 开发和生产证书申请&quot;">​</a></h2><h3 id="申请-app-id" tabindex="-1">申请 App ID <a class="header-anchor" href="#申请-app-id" aria-label="Permalink to &quot;申请 App ID&quot;">​</a></h3><p>选择页面中 <strong>&#39;identifiers&#39;</strong></p><p><code>App IDS -&gt; iOS,tvOS,watchOS -&gt; Explict(bundle ID)</code></p><blockquote><p>bundle ID - com.datachain.kw</p></blockquote><h3 id="生成证书请求文件" tabindex="-1">生成证书请求文件 <a class="header-anchor" href="#生成证书请求文件" aria-label="Permalink to &quot;生成证书请求文件&quot;">​</a></h3><p>macOS 下，打开<strong>钥匙串访问</strong></p><p><code>钥匙串访问 -&gt; 证书助理 -&gt; 从证书颁发机构请求证书...</code></p><blockquote><p>请求文件：<code>.certSigningRequest</code></p></blockquote><h3 id="开发流程" tabindex="-1">开发流程 <a class="header-anchor" href="#开发流程" aria-label="Permalink to &quot;开发流程&quot;">​</a></h3><h4 id="申请-development-证书" tabindex="-1">申请 development 证书 <a class="header-anchor" href="#申请-development-证书" aria-label="Permalink to &quot;申请 development 证书&quot;">​</a></h4><p>选择页面中 <strong>&#39;Certificates&#39;</strong></p><p><code>ios App Development -&gt; choose file -&gt; download (ios_development.cer)</code></p><p>双击 ios_development.cer , 找到证书 , 导出.p12 文件 , 输入密码</p><blockquote><p>选择文件为 证书请求文件</p><p>开发证书：<code>.p12</code></p></blockquote><h4 id="添加调试设备" tabindex="-1">添加调试设备 <a class="header-anchor" href="#添加调试设备" aria-label="Permalink to &quot;添加调试设备&quot;">​</a></h4><p>选择页面中 <strong>&#39;Devices&#39;</strong></p><p><code>填写设备 UDID（设备标识）</code></p><ul><li>获取设备 UDID：设备连接到电脑，启动 iTunes，点击此区域可切换显示设备的 UDID</li></ul><blockquote><p>开发描述文件必须绑定调试设备，只有授权的设备才可以直接安装 App</p></blockquote><h4 id="申请-development-描述文件" tabindex="-1">申请 development 描述文件 <a class="header-anchor" href="#申请-development-描述文件" aria-label="Permalink to &quot;申请 development 描述文件&quot;">​</a></h4><p>选择页面中 <strong>&#39;Profiles&#39;</strong></p><p><code>&quot;iOS App Development&quot; -&gt; 选择App ID -&gt; 绑定证书 -&gt; 输入描述文件名称 -&gt; 下载描述文件 </code></p><blockquote><p>描述文件： <code>.mobileprovision</code></p></blockquote><h3 id="发布流程" tabindex="-1">发布流程 <a class="header-anchor" href="#发布流程" aria-label="Permalink to &quot;发布流程&quot;">​</a></h3><p>与开发流程大致相同，主要区别如下</p><ul><li>申请证书：<code>&quot;iOS App Development&quot;</code>和 <code>&quot;App Store and Ad Hoc&quot;</code></li><li>发布流程无需添加调试设备</li><li>申请描述文件：<code>&quot;iOS App Development&quot;</code>和<code>&quot;App Store&quot;</code></li></ul><h4 id="申请-production-证书" tabindex="-1">申请 production 证书 <a class="header-anchor" href="#申请-production-证书" aria-label="Permalink to &quot;申请 production 证书&quot;">​</a></h4><p>选择页面中 <strong>&#39;Certificates&#39;</strong></p><p><code>&quot;App Store and Ad Hoc&quot; -&gt; choose file -&gt; download (ios_production.cer)</code></p><ul><li>双击 ios_production.cer , 找到证书 , 导出.p12 文件 , 输入密码</li></ul><h4 id="申请-distribution-描述文件" tabindex="-1">申请 Distribution 描述文件 <a class="header-anchor" href="#申请-distribution-描述文件" aria-label="Permalink to &quot;申请 Distribution 描述文件&quot;">​</a></h4><p>选择页面中 <strong>&#39;Profiles&#39;</strong></p><p><code>&quot;App Store&quot; -&gt; 选择App ID -&gt; 绑定证书 -&gt; 输入描述文件名称 -&gt; 下载描述文件 </code></p><blockquote><p>描述文件： <code>.mobileprovision</code></p></blockquote><h2 id="ios-开发生产模式配置" tabindex="-1">IOS 开发生产模式配置 <a class="header-anchor" href="#ios-开发生产模式配置" aria-label="Permalink to &quot;IOS 开发生产模式配置&quot;">​</a></h2><img src="'+s+'" alt="image-20230109232639125" style="zoom:80%;"><img src="'+p+`" alt="image-20230109232655279" style="zoom:80%;"><h2 id="ios-相机相册权限配置" tabindex="-1">IOS 相机相册权限配置 <a class="header-anchor" href="#ios-相机相册权限配置" aria-label="Permalink to &quot;IOS 相机相册权限配置&quot;">​</a></h2><p>官方 demo：<a href="https://nativesupport.dcloud.net.cn/UniMPDocs/UseModule/ios/ios?id=%E4%B8%8B%E9%9D%A2%E4%BB%A5-gallery-%E6%A8%A1%E5%9D%97%E4%B8%BA%E4%BE%8B" target="_blank" rel="noreferrer">IOS 集成相册</a></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">## 用户相册权限</span></span>
<span class="line"><span style="color:#FFCB6B;">Privacy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Photo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Library</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Usage</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Description</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">## 保存图片至相册</span></span>
<span class="line"><span style="color:#FFCB6B;">Privacy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Photo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Library</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Additions</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Usage</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Description</span></span>
<span class="line"></span></code></pre></div>`,42),i=[l];function r(c,d,u,h,b,q){return a(),e("div",null,i)}const D=o(n,[["render",r]]);export{g as __pageData,D as default};
