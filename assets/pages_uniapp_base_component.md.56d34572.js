import{_ as n,c as a,o as s,a as l,d as t,e}from"./app.132376fd.js";const D=JSON.parse('{"title":"组件","description":"","frontmatter":{"title":"组件","order":2},"headers":[{"level":2,"title":"组件属性类型","slug":"组件属性类型","link":"#组件属性类型","children":[]},{"level":2,"title":"公共属性列表","slug":"公共属性列表","link":"#公共属性列表","children":[]}],"relativePath":"pages/uniapp/base/component.md","lastUpdated":1676994314000}'),d={name:"pages/uniapp/base/component.md"},o=l(`<h1 id="组件概述" tabindex="-1">组件概述 <a class="header-anchor" href="#组件概述" aria-hidden="true">#</a></h1><p>所有组件与属性名都是小写，单词之间以连字符<code>-</code>连接。</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">component-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">property1</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">property2</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    content</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">component-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>每个<code>vue</code>文件的根节点必须为 <code>&lt;template&gt;</code>，且这个 <code>&lt;template&gt;</code> 下只能且必须有一个根 <code>&lt;view&gt;</code> 组件</p></blockquote><h2 id="组件属性类型" tabindex="-1">组件属性类型 <a class="header-anchor" href="#组件属性类型" aria-hidden="true">#</a></h2>`,5),r=t("table",null,[t("thead",null,[t("tr",null,[t("th",{style:{"text-align":"left"}},"类型"),t("th",{style:{"text-align":"left"}},"注解")])]),t("tbody",null,[t("tr",null,[t("td",{style:{"text-align":"left"}},[t("code",null,"Boolean")]),t("td",{style:{"text-align":"left"}},[e("组件写该属性，其值都为 "),t("code",null,"true"),e("，只有组件上没有写该属性时，属性值才为 "),t("code",null,"false"),e("。如果属性值为变量，变量的值会被转换为 "),t("code",null,"Boolean"),e(" 类型。")])]),t("tr",null,[t("td",{style:{"text-align":"left"}},[t("code",null,"Number")]),t("td",{style:{"text-align":"left"}},"1, 2.5")]),t("tr",null,[t("td",{style:{"text-align":"left"}},[t("code",null,"String")]),t("td",{style:{"text-align":"left"}},'"string"')]),t("tr",null,[t("td",{style:{"text-align":"left"}},[t("code",null,"Array")]),t("td",{style:{"text-align":"left"}},'[ 1, "string" ]')]),t("tr",{"key:":"",value:""},[t("td",{style:{"text-align":"left"}},[t("code",null,"Object")]),t("td",{style:{"text-align":"left"}})]),t("tr",null,[t("td",{style:{"text-align":"left"}},[t("code",null,"EventHandler")]),t("td",{style:{"text-align":"left"}},[t("code",null,"handlerName"),e(" 是 methods 中定义的事件处理函数名")])]),t("tr",null,[t("td",{style:{"text-align":"left"}},[t("code",null,"Any")]),t("td",{style:{"text-align":"left"}})])])],-1),i=l('<h2 id="公共属性列表" tabindex="-1">公共属性列表 <a class="header-anchor" href="#公共属性列表" aria-hidden="true">#</a></h2><table><thead><tr><th style="text-align:left;">属性名</th><th style="text-align:left;">类型</th><th style="text-align:left;">描述</th><th style="text-align:left;">注解</th></tr></thead><tbody><tr><td style="text-align:left;">id</td><td style="text-align:left;">String</td><td style="text-align:left;">组件的唯一标示</td><td style="text-align:left;">一般用于获取组件上下文对象</td></tr><tr><td style="text-align:left;"><code>ref</code></td><td style="text-align:left;">String</td><td style="text-align:left;">vue 组件唯一标示</td><td style="text-align:left;">用来给子组件注册引用信息</td></tr><tr><td style="text-align:left;">class</td><td style="text-align:left;">String</td><td style="text-align:left;">组件的样式类</td><td style="text-align:left;">在对应的 css 中定义的样式类</td></tr><tr><td style="text-align:left;">style</td><td style="text-align:left;">String</td><td style="text-align:left;">组件的内联样式</td><td style="text-align:left;">可以动态设置的内联样式</td></tr><tr><td style="text-align:left;"><code>hidden</code></td><td style="text-align:left;">Boolean</td><td style="text-align:left;">组件是否隐藏</td><td style="text-align:left;">所有组件默认是显示的</td></tr><tr><td style="text-align:left;"><code>data-*</code></td><td style="text-align:left;">Any</td><td style="text-align:left;">自定义属性</td><td style="text-align:left;">组件触发事件，会发送给事件处理函数</td></tr><tr><td style="text-align:left;"><code>@*</code></td><td style="text-align:left;">EventHandler</td><td style="text-align:left;">组件的事件</td><td style="text-align:left;">详见各组件详细文档，事件绑定参考</td></tr></tbody></table>',2),c=[o,r,i];function p(y,g,f,x,u,h){return s(),a("div",null,c)}const F=n(d,[["render",p]]);export{D as __pageData,F as default};