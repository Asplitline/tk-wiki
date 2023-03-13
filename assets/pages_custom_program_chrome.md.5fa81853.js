import{_ as e,c as s,o,a}from"./app.972d4c24.js";const l="/assets/640.873b6cfc.webp",t="/assets/640-16739704028353.032b016e.webp",n="/assets/640-16739704048436.bc698794.webp",r="/assets/640-16739704065569.b3c55a02.webp",c="/assets/640-167397040843412.b4add0b3.webp",p="/assets/640-167397041015615.90068d05.webp",i="/assets/640-167397041285818.92705348.webp",d="/assets/640-167397041438921.174baa82.gif",h="/assets/640-167397041742824.284f6e9a.gif",m="/assets/640-167397041890226.1335d793.gif",u="/assets/640-167397042076230.b3b669a0.webp",g="/assets/640-167397042357333.fc9be636.png",b="/assets/640-167397042969436.d4c45ba8.webp",y="/assets/640-167397043202139.28039e9f.webp",M=JSON.parse('{"title":"chrome devtool","description":"","frontmatter":{"title":"chrome devtool","order":2},"headers":[{"level":2,"title":"element","slug":"element","link":"#element","children":[{"level":3,"title":"DOM 树","slug":"dom-树","link":"#dom-树","children":[]},{"level":3,"title":"styles","slug":"styles","link":"#styles","children":[]}]},{"level":2,"title":"Console","slug":"console","link":"#console","children":[]},{"level":2,"title":"Sources","slug":"sources","link":"#sources","children":[{"level":3,"title":"Debug","slug":"debug","link":"#debug","children":[]},{"level":3,"title":"BlackBox","slug":"blackbox","link":"#blackbox","children":[]},{"level":3,"title":"Devtools Nodejs debug","slug":"devtools-nodejs-debug","link":"#devtools-nodejs-debug","children":[]},{"level":3,"title":"Source Map","slug":"source-map","link":"#source-map","children":[]},{"level":3,"title":"Local Overrides","slug":"local-overrides","link":"#local-overrides","children":[]},{"level":3,"title":"Content scripts","slug":"content-scripts","link":"#content-scripts","children":[]},{"level":3,"title":"Snippets","slug":"snippets","link":"#snippets","children":[]}]},{"level":2,"title":"network","slug":"network","link":"#network","children":[{"level":3,"title":"filter","slug":"filter","link":"#filter","children":[]},{"level":3,"title":"瀑布图","slug":"瀑布图","link":"#瀑布图","children":[]},{"level":3,"title":"网络请求列表","slug":"网络请求列表","link":"#网络请求列表","children":[]},{"level":3,"title":"websocket","slug":"websocket","link":"#websocket","children":[]}]},{"level":2,"title":"Performance","slug":"performance","link":"#performance","children":[]},{"level":2,"title":"Memory 内存","slug":"memory-内存","link":"#memory-内存","children":[]},{"level":2,"title":"快速查看页面结构","slug":"快速查看页面结构","link":"#快速查看页面结构","children":[]},{"level":2,"title":"相关链接","slug":"相关链接","link":"#相关链接","children":[]}],"relativePath":"pages/custom/program/chrome.md","lastUpdated":1678203225000}'),f={name:"pages/custom/program/chrome.md"},F=a('<h1 id="chrome-devtool" tabindex="-1">Chrome devtool <a class="header-anchor" href="#chrome-devtool" aria-hidden="true">#</a></h1><p><strong>Chromium</strong>：是谷歌的开源项目，由开源社区维护。</p><p><strong>Chrome</strong>：基于 Chromium，但是它是闭源的。</p><p>实验性功能 ：chrome://flags/</p><blockquote><p><code>esc</code>：显示 第二面板</p></blockquote><h2 id="element" tabindex="-1">element <a class="header-anchor" href="#element" aria-hidden="true">#</a></h2><h3 id="dom-树" tabindex="-1">DOM 树 <a class="header-anchor" href="#dom-树" aria-hidden="true">#</a></h3><p>使用 Chrome DevTools 的 Elements 面板检查和实时编辑页面的 HTML 与 CSS</p><ul><li><strong><code>h</code>键</strong>：快速隐藏/显示元素当前元素及其后代元素(原理<code>visibility:hidden</code>)</li><li><strong>按 <code>alt</code> 键</strong> 点击 dom 元素前箭头，折叠/展开 后代元素</li></ul><h3 id="styles" tabindex="-1">styles <a class="header-anchor" href="#styles" aria-hidden="true">#</a></h3><p><img src="'+l+'" alt=""></p><p>按住 shift 点击色块，快速切换颜色格式 rgb/hsl/hex</p><p>color pickers</p><p><img src="'+t+'" alt=""></p><ul><li>page colors：color picker 中会列出页面所有的颜色</li><li>material colors：color picker 中会列出 google 设计推荐色系</li></ul><h2 id="console" tabindex="-1">Console <a class="header-anchor" href="#console" aria-hidden="true">#</a></h2><p>Console 面板是浏览器的控制台</p><p>message</p><p><strong>设置-&gt;Show Console drawer</strong>或者<strong>Esc 快捷键</strong>让 Console 在每个面板都能显示</p><ul><li>ctrl+shift+p 输入 time 命令或者设置中找到<strong>timestamps</strong>命令，给消息加上时间戳</li><li><code>LogXMLHttpRequest</code>：输出 XMLHttp 请求(可以监控页面所有 ajax 请求 定位其代码调用栈)</li></ul><p><img src="'+n+'" alt=""></p><p><code>$</code>符号</p><ul><li><code>$0</code>：获取在 Elements 面板<strong>所选中的元素节点</strong></li><li><code>$</code> ：替代 <code>document.querySlector</code> 方法使用</li><li><code>$$</code>：<code>document.querySelectorAll</code>替代，<strong>并能直接返回数组</strong>(Array)。</li></ul><blockquote><p><code>document.querySelectorAll</code> 返回的是 nodeList(NodeList)</p></blockquote><ul><li><code>$_</code>：引用上一次执行的结果</li><li><code>$i</code>：使用 npm 的包，可以安装 Console Importer 插件</li></ul><h2 id="sources" tabindex="-1">Sources <a class="header-anchor" href="#sources" aria-hidden="true">#</a></h2><h3 id="debug" tabindex="-1">Debug <a class="header-anchor" href="#debug" aria-hidden="true">#</a></h3><p>在源代码面板中可以设置<strong>断点</strong>来调试 JavaScript</p><p><img src="'+r+'" alt=""></p><h4 id="异常断点" tabindex="-1">异常断点 <a class="header-anchor" href="#异常断点" aria-hidden="true">#</a></h4><p><img src="'+c+'" alt=""></p><h4 id="函数断点" tabindex="-1">函数断点 <a class="header-anchor" href="#函数断点" aria-hidden="true">#</a></h4><p><code>debug()</code>：调试的函数名作为参数，调用可以在每次执行该函数前暂停执行代码</p><h4 id="单步调试" tabindex="-1">单步调试 <a class="header-anchor" href="#单步调试" aria-hidden="true">#</a></h4><ul><li>step over next function</li><li>step into next function</li><li>step out current function</li><li>step</li></ul><p>step 和 step over/into 区别</p><ul><li>step 会优先尝试 step into，当没有可步入的代码时，就会执行 step over</li></ul><p><img src="'+p+'" alt=""></p><blockquote><p><strong>Continue to here</strong>：继续执行至此行</p></blockquote><h4 id="行内断点" tabindex="-1">行内断点 <a class="header-anchor" href="#行内断点" aria-hidden="true">#</a></h4><p>行断点内多个箭头</p><p><img src="'+i+`" alt=""></p><h3 id="blackbox" tabindex="-1">BlackBox <a class="header-anchor" href="#blackbox" aria-hidden="true">#</a></h3><p>在调试中忽略某些脚本，在 Call Stack 堆栈中会将该脚本隐藏，单步调试时也不会步入脚本中的任何函数</p><div class="language-JS"><button title="Copy Code" class="copy"></button><span class="lang">JS</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">animate</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">prepare</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">lib</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">doFancyStuff</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// A</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>A 行，调用的是第三方库的 doFancyStuff 函数。</p><p>如果确 三方库没有 bug，<code>BlackBox</code> 整个第三方库的 js 脚本，在调试中跳过这些代码的执行</p><h4 id="三种方式" tabindex="-1">三种方式 <a class="header-anchor" href="#三种方式" aria-hidden="true">#</a></h4><p>方式 1：在源代码窗格右键，选择&quot;BlackBox Script&quot;</p><p><img src="`+d+'" alt=""></p><p>方式 2： Call Stack 中右键某一帧，选择&quot;BlackBox Script&quot;</p><p><img src="'+h+'" alt=""></p><p>方式 3： Blackboxing 面板添加<strong>正则表达式</strong>匹配<strong>文件名</strong></p><p><img src="'+m+'" alt=""></p><h3 id="devtools-nodejs-debug" tabindex="-1">Devtools Nodejs debug <a class="header-anchor" href="#devtools-nodejs-debug" aria-hidden="true">#</a></h3><p>node 执行 js 文件，文件名前加--inspect 标志，启用浏览器 nodejs 调试</p><p><img src="'+u+'" alt=""></p><h3 id="source-map" tabindex="-1">Source Map <a class="header-anchor" href="#source-map" aria-hidden="true">#</a></h3><p>组合/压缩 css,js 文件是常见的性能优化方案</p><p>开启<code>source map</code>：settings -&gt; preference -&gt; sources</p><ul><li><code>Enable Javascript source maps</code>和<code>Enable CSS source maps</code></li></ul><p>source map 映射信息存在 json 对象中，保存在 .map 文件中</p><ul><li>可由编译程序添加注释<code>//# sourceMappingURL=/path/to/script.js.map</code>至生产文件末尾，</li><li>可由服务端在响应头中添加<code>X-SourceMap: /path/to/script.js.map</code>，将 map 文件与生产文件对应</li></ul><h3 id="local-overrides" tabindex="-1">Local Overrides <a class="header-anchor" href="#local-overrides" aria-hidden="true">#</a></h3><p>用于覆盖网络请求</p><h3 id="content-scripts" tabindex="-1">Content scripts <a class="header-anchor" href="#content-scripts" aria-hidden="true">#</a></h3><p>浏览器插件的脚本，在特定网页的上下文中运行</p><h3 id="snippets" tabindex="-1">Snippets <a class="header-anchor" href="#snippets" aria-hidden="true">#</a></h3><p>snippets 中，选中代码并<code>ctrl enter</code>，或点击右下角的执行按钮，即可执行代码片段</p><h2 id="network" tabindex="-1">network <a class="header-anchor" href="#network" aria-hidden="true">#</a></h2><p><img src="'+g+'" alt=""></p><ul><li>Preserve Log：保存显示跨页面的加载请求</li><li>Disable Cache：禁用浏览器缓存，模拟新用户打开页面的体验</li><li>Offline 是模拟断网离线的状态，其后的下拉框可以选择模拟其他网络状况，比如 2G,3G</li></ul><h3 id="filter" tabindex="-1">filter <a class="header-anchor" href="#filter" aria-hidden="true">#</a></h3><p>filter 文本框中可输入请求的属性 对 请求进行过滤，多个属性<strong>用空格</strong>分隔</p><p>支持过滤的属性：</p><p><code>domain</code>：<strong>指定域</strong>的资源。 <code>has-response-header</code>：指定 HTTP <strong>响应标头</strong>的资源 <code>is</code>： is:running 可以查找 WebSocket 资源。 <code>larger-than</code>：<strong>大于指定大小的资源</strong>（以字节为单位）。1000 为 1k。 <code>method</code>：指定 <strong>HTTP 方法</strong>资源 <code>mime-type</code>：指定 <strong>MIME 类型</strong>的资源 <code>mixed-content</code>：显示所有混合内容资源 (mixed-content:all) <code>scheme</code>：通过未保护 HTTP (scheme:http) 或受保护 HTTPS (scheme:https) 检索的资源。 <code>set-cookie-domain</code>：具有 Set-Cookie 标头并且 Domain 属性与指定值匹配的资源 <code>set-cookie-name</code>：具有 Set-Cookie 标头并且名称与指定值匹配的资源 <code>set-cookie-value</code>：显示具有 Set-Cookie 标头并且值与指定值匹配的资源 <code>status-code</code>： <strong>HTTP 状态代码</strong>与指定代码匹配的资源。</p><blockquote><p>例如：mime-type:image/gif larger-than:1K 显示大于一千字节的所有 GIF</p></blockquote><ul><li><code>Hide Data URLs</code>：隐藏 <strong>data 类型的 url</strong>[1]</li></ul><p><code>Data URLs</code> ：前缀为 data: 协议的的 URL。允许内容创建者向文档中嵌入小文件，例如浏览器 API canvas 支持的 base64 编码格式图片</p><h3 id="瀑布图" tabindex="-1">瀑布图 <a class="header-anchor" href="#瀑布图" aria-hidden="true">#</a></h3><p>瀑布图按时间线展示所有请求</p><p><code>DOMContentLoaded</code>： 浏览器已经加载了 HTML，DOM 树已经构建完毕，<strong>资源还未下载</strong></p><p><code>load</code>：浏览器已经加载了所有的资源（图像，样式表等）。</p><p><code>beforeunload/unload</code>：当用户离开页面的时候触发。</p><h3 id="网络请求列表" tabindex="-1">网络请求列表 <a class="header-anchor" href="#网络请求列表" aria-hidden="true">#</a></h3><p><code>Replay XHR</code>：重播请求</p><p><code>Copy As Fetch</code>：请求<strong>复制为 Fetch 代码</strong></p><p><code>Clear Browser Cache</code>：手动清除浏览器缓存</p><p><code>Clear Browser Cookies</code>：手动清除浏览器 Cookie</p><p><img src="'+b+'" alt=""></p><p><code>Initiator</code>：请求的来源/发起者。</p><p><code>parser</code>：一般来自解析器解析到的 html 页面内的请求</p><p><code>script</code>：来自脚本文件的请求。鼠标悬浮到 Initiator 列中的文件名上，可以看到发起当前请求的堆栈轨迹，点击文件名，可以定位到直接发起请求的代码</p><p><code>size</code>：在 size 列中，有两个数值，上面的较小值代表下载到的资源的大小，下面的较大值是资源解压后的大小。</p><p><strong>按住<code>shift</code>鼠标悬浮在请求行上</strong></p><ul><li>绿色：当前行的发起者</li><li>红色：当前行的依赖项</li></ul><h3 id="websocket" tabindex="-1">websocket <a class="header-anchor" href="#websocket" aria-hidden="true">#</a></h3><p><img src="'+y+`" alt=""></p><h2 id="performance" tabindex="-1">Performance <a class="header-anchor" href="#performance" aria-hidden="true">#</a></h2><p>performance 面板可以用于<strong>分析运行时性能</strong>。与页面加载性能相区分</p><p><a href="https://mp.weixin.qq.com/s?__biz=MzA5NjM5MjM1Nw==&amp;mid=2650284189&amp;idx=1&amp;sn=6bf640e28cf02097b73e5885d750cde8&amp;chksm=88bc4557bfcbcc41e792cf7b11b7c19b610cd3eb5f35808066489889286319161f6466776a68&amp;cur_album_id=1349545506497855489&amp;scene=189#wechat_redirect" target="_blank" rel="noreferrer">参考</a></p><h2 id="memory-内存" tabindex="-1">Memory 内存 <a class="header-anchor" href="#memory-内存" aria-hidden="true">#</a></h2><p><a href="https://mp.weixin.qq.com/s?__biz=MzA5NjM5MjM1Nw==&amp;mid=2650284228&amp;idx=1&amp;sn=d0ca8b3476ad8ba891dba9c5468ee1fb&amp;chksm=88bc450ebfcbcc18339aa4272997ec85dca736553c40c6af67e47a2faa5e954047b13f8558cb&amp;cur_album_id=1349545506497855489&amp;scene=189#wechat_redirect" target="_blank" rel="noreferrer">参考</a></p><h2 id="快速查看页面结构" tabindex="-1">快速查看页面结构 <a class="header-anchor" href="#快速查看页面结构" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">$$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">i</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">outline</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1px solid #</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">~~</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">random</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> (</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">24</span><span style="color:#F07178;">)))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">16</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="相关链接" tabindex="-1">相关链接 <a class="header-anchor" href="#相关链接" aria-hidden="true">#</a></h2><p><a href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzA5NjM5MjM1Nw==&amp;action=getalbum&amp;album_id=1349545506497855489&amp;scene=173&amp;from_msgid=2650283949&amp;from_itemidx=1&amp;count=3&amp;nolastread=1#wechat_redirect" target="_blank" rel="noreferrer">Devtools 老师傅养成系列</a></p>`,107),D=[F];function k(_,C,A,v,x,w){return o(),s("div",null,D)}const j=e(f,[["render",k]]);export{M as __pageData,j as default};