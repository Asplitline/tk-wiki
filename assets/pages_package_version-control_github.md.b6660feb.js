import{_ as s,c as a,o as l,a as n}from"./app.df2a9689.js";const D=JSON.parse('{"title":"Github","description":"","frontmatter":{"title":"Github","order":2},"headers":[{"level":2,"title":"推送仓库","slug":"推送仓库","link":"#推送仓库","children":[{"level":3,"title":"推送一个新仓库","slug":"推送一个新仓库","link":"#推送一个新仓库","children":[]},{"level":3,"title":"推送一个本地仓库","slug":"推送一个本地仓库","link":"#推送一个本地仓库","children":[]}]},{"level":2,"title":"拉取仓库","slug":"拉取仓库","link":"#拉取仓库","children":[{"level":3,"title":"git clone","slug":"git-clone","link":"#git-clone","children":[]},{"level":3,"title":"下载 zip","slug":"下载-zip","link":"#下载-zip","children":[]}]},{"level":2,"title":"冲突解决","slug":"冲突解决","link":"#冲突解决","children":[]},{"level":2,"title":"跨团队合作","slug":"跨团队合作","link":"#跨团队合作","children":[]},{"level":2,"title":"shell 免登录","slug":"shell-免登录","link":"#shell-免登录","children":[]},{"level":2,"title":"*.crt not found","slug":"crt-not-found","link":"#crt-not-found","children":[]},{"level":2,"title":"? git 自动化部署","slug":"git-自动化部署","link":"#git-自动化部署","children":[]}],"relativePath":"pages/package/version-control/github.md","lastUpdated":1669563030000}'),e={name:"pages/package/version-control/github.md"},o=n(`<h1 id="github" tabindex="-1">Github <a class="header-anchor" href="#github" aria-hidden="true">#</a></h1><h2 id="推送仓库" tabindex="-1">推送仓库 <a class="header-anchor" href="#推送仓库" aria-hidden="true">#</a></h2><h3 id="推送一个新仓库" tabindex="-1">推送一个新仓库 <a class="header-anchor" href="#推送一个新仓库" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 创建readme</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"># book-system</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">README.md</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 初始化仓库</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">README.md</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">commit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">first commit</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-M</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/Asplitline/book-system.git</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">push</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"></span></code></pre></div><h3 id="推送一个本地仓库" tabindex="-1">推送一个本地仓库 <a class="header-anchor" href="#推送一个本地仓库" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/Asplitline/book-system.git</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-M</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">push</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"></span></code></pre></div><h2 id="拉取仓库" tabindex="-1">拉取仓库 <a class="header-anchor" href="#拉取仓库" aria-hidden="true">#</a></h2><h3 id="git-clone" tabindex="-1">git clone <a class="header-anchor" href="#git-clone" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 克隆远端数据仓库到本地</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">仓库地址</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 远端代码</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-b</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">分支</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">仓库地址</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">本地路径</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 拉取单分支</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-b</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">master</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--single-branch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/ant-design/ant-design.git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ant-design</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 拉取最新版本</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">远程仓库地址</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">分支名称</span></span>
<span class="line"></span></code></pre></div><h3 id="下载-zip" tabindex="-1">下载 zip <a class="header-anchor" href="#下载-zip" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 下载 zip</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 解压 zip</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 初始化仓库</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 添加远程仓库</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://....</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 拉取远程</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span></span>
<span class="line"></span></code></pre></div><h2 id="冲突解决" tabindex="-1">冲突解决 <a class="header-anchor" href="#冲突解决" aria-hidden="true">#</a></h2><p>两个人修改了同一个文件的同一个地方，就会发生冲突。冲突需要人为解决</p><ul><li>推送到远程仓库产生冲突，冲突文件会显示具体信息</li><li>将冲突任务解决后，再进行推送</li></ul><h2 id="跨团队合作" tabindex="-1">跨团队合作 <a class="header-anchor" href="#跨团队合作" aria-hidden="true">#</a></h2><ol><li>程序员 C fork 仓库</li><li>程序员 C 将仓库克隆在本地进行修改</li><li>程序员 C 将仓库推送到远程</li><li>程序员 C 发起 pull reqest</li><li>原仓库作者审核</li><li>原仓库作者合并代码</li></ol><h2 id="shell-免登录" tabindex="-1">shell 免登录 <a class="header-anchor" href="#shell-免登录" aria-hidden="true">#</a></h2><ol><li><p>生成秘钥：<code>ssh-keygen</code></p></li><li><p>密钥存储目录：<code>C:\\Users\\用户\\\\.ssh</code></p><ul><li><p>公钥名称：<code>id_rsa.pub</code></p></li><li><p>私钥名称：<code>id_rsa</code></p></li></ul></li><li><p>将公钥添加至 ssh key</p></li><li><p>通过 ssh 地址 克隆仓库</p></li></ol><blockquote><p>通过添加 ssh key，可以让设备直接下载 项目</p></blockquote><h2 id="crt-not-found" tabindex="-1">*.crt not found <a class="header-anchor" href="#crt-not-found" aria-hidden="true">#</a></h2><p>fatal: Custom certificate bundle not found at path: D:/*.crt</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--global</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http.sslCAinfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">D:</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">Git</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">mingw64</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">ssl</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">certs</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">ca-bundle.crt</span></span>
<span class="line"></span></code></pre></div><h2 id="git-自动化部署" tabindex="-1">? git 自动化部署 <a class="header-anchor" href="#git-自动化部署" aria-hidden="true">#</a></h2><p><a href="https://docs.github.com/en/developers/webhooks-and-events/webhooks" target="_blank" rel="noreferrer">https://docs.github.com/en/developers/webhooks-and-events/webhooks</a></p>`,24),p=[o];function t(c,r,i,C,y,h){return l(),a("div",null,p)}const A=s(e,[["render",t]]);export{D as __pageData,A as default};