import{_ as s,c as n,o as a,a as l}from"./app.05b23b35.js";const o="/assets/image-20210824184345909.df1e5309.png",p="/assets/image-20210824184331906.21420b58.png",e="/assets/image-20210824184633371.5f1e0c12.png",t="/assets/image-20210824184643370.68bfdbb2.png",c="/assets/image-20210824184750514.0a4553a6.png",r="/assets/image-20210824184802965.3047eab3.png",B=JSON.parse('{"title":"Window","description":"","frontmatter":{"title":"Window","order":2},"headers":[{"level":2,"title":"右键打开","slug":"右键打开","link":"#右键打开","children":[{"level":3,"title":"打开文件","slug":"打开文件","link":"#打开文件","children":[]},{"level":3,"title":"打开文件夹","slug":"打开文件夹","link":"#打开文件夹","children":[]},{"level":3,"title":"右键空白，打开文件","slug":"右键空白-打开文件","link":"#右键空白-打开文件","children":[]}]},{"level":2,"title":"自定义 bat 开启应用","slug":"自定义-bat-开启应用","link":"#自定义-bat-开启应用","children":[]},{"level":2,"title":"查看文件树形结构","slug":"查看文件树形结构","link":"#查看文件树形结构","children":[]},{"level":2,"title":"找回windows图片查看器","slug":"找回windows图片查看器","link":"#找回windows图片查看器","children":[]},{"level":2,"title":"关机命令","slug":"关机命令","link":"#关机命令","children":[]}],"relativePath":"pages/expand/skill/window.md","lastUpdated":1676563016000}'),C={name:"pages/expand/skill/window.md"},i=l('<h2 id="右键打开" tabindex="-1">右键打开 <a class="header-anchor" href="#右键打开" aria-hidden="true">#</a></h2><h3 id="打开文件" tabindex="-1">打开文件 <a class="header-anchor" href="#打开文件" aria-hidden="true">#</a></h3><p><code>\\HKEY_CLASSES_ROOT\\*\\shell</code></p><p>1, <code>Win+R</code> 打开运行，输入<code>regedit</code>，打开<code>注册表</code>，找到<code>HKEY_CLASSES_ROOT\\*\\shell</code>分支，如果没有shell分支，则在<code>*</code>下点击右键，选择“<code>新建</code>－<code>项</code>”，建立shell分支。</p><p>2, 在shell下新建“<code>VisualCode</code>”项，在右侧窗口的“<strong>默认</strong>”双击，在数据里输入“<code>用VSCode打开</code>”。<s>这是右键上显示的文字</s></p><p>3, 在“<code>VisualCode</code>”下再新建<code>Command</code>项，在右侧窗口的“<strong>默认</strong>”键值栏内输入程序所在的安装路径，我的是：<code>&quot;D:\\anzhuang\\Microsoft VS Code\\Code.exe&quot; &quot;%1&quot;</code>。<strong>其中的%1表示要打开的文件参数</strong>。</p><p>4, 配置缩略图。在<code>VisualCode</code>项上新建<code>可扩充字符串值</code>，命名为<code>Icon</code>，双击，把<code>&quot;D:\\anzhuang\\Microsoft VS Code\\Code.exe&quot;</code>放进数据就可以了。</p><p><img src="'+o+'" alt="image-20210824184345909"></p><p><img src="'+p+'" alt="image-20210824184331906"></p><h3 id="打开文件夹" tabindex="-1">打开文件夹 <a class="header-anchor" href="#打开文件夹" aria-hidden="true">#</a></h3><p><code>HKEY_CLASSES_ROOT\\Directory\\shell</code></p><p>1, <code>Win+R</code> 打开运行，输入<code>regedit</code>，打开<code>注册表</code>，找到<code>HKEY_CLASSES_ROOT\\Directory\\shell</code>分支</p><p>2, 同上面的2一样，数据内的值为“<code>用VSCode打开文件夹</code>”</p><p>3、4、5、步骤完全一样，不再重复说明了。</p><p><img src="'+e+'" alt="image-20210824184633371"></p><p><img src="'+t+'" alt="image-20210824184643370"></p><h3 id="右键空白-打开文件" tabindex="-1">右键空白，打开文件 <a class="header-anchor" href="#右键空白-打开文件" aria-hidden="true">#</a></h3><p><code>HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\</code></p><ol><li><code>Win+R</code> 打开运行，输入<code>regedit</code>，打开<code>注册表</code>，找到<code>HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\</code>分支</li></ol><p>2、同上面的2完全一样</p><p>3、同上，把 <code>%1</code> 改为<code>%V</code>，例如：<code>&quot;D:\\anzhuang\\Microsoft VS Code\\Code.exe&quot; &quot;%V&quot;</code></p><p>4、5同上，完全一样</p><p><img src="'+c+'" alt="image-20210824184750514"></p><p><img src="'+r+`" alt="image-20210824184802965"></p><h2 id="自定义-bat-开启应用" tabindex="-1">自定义 bat 开启应用 <a class="header-anchor" href="#自定义-bat-开启应用" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\qq\\Bin\\QQScLauncher.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#FFCB6B;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\WeChat\\WeChat.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#FFCB6B;">:start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\HbuilderX\\HBuilderX\\HBuilderX.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#FFCB6B;">:start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\Microsoft VS Code\\Code.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"></span></code></pre></div><p><code>start &quot;&quot; path&amp;&amp;ping localhost -n 0</code></p><blockquote><p><code>&amp;ping localhost -n 0</code>：可选项，表示1秒延迟</p></blockquote><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\qq\\Bin\\QQScLauncher.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#FFCB6B;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\WeChat\\WeChat.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#FFCB6B;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\HbuilderX\\HBuilderX\\HBuilderX.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#82AAFF;">:</span><span style="color:#FFCB6B;">:start</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E:\\Microsoft VS Code\\Code.exe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"></span></code></pre></div><h2 id="查看文件树形结构" tabindex="-1">查看文件树形结构 <a class="header-anchor" href="#查看文件树形结构" aria-hidden="true">#</a></h2><p><code>tree/?</code>：帮助 <code>tree</code>：文件夹结构 <code>tree/f</code>：含文件名</p><p><code>tree/f file.txt</code>：导出文件树到file.txt</p><blockquote><p><code>/?</code>：可以查看命令说明</p><p>eg ： <code>tree /?</code></p></blockquote><h2 id="找回windows图片查看器" tabindex="-1">找回windows图片查看器 <a class="header-anchor" href="#找回windows图片查看器" aria-hidden="true">#</a></h2><ol><li>新建文件 .txt</li><li>将内容 写入 文件</li><li>更改文件后缀为 <code>.reg</code></li><li>双击运行</li></ol><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">Windows</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Registry</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Editor</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Version</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5.00</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Change</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s File Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> [HKEY_CURRENT_USER\\Software\\Classes\\.jpg]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> @=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> ; Change Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">File</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">HKEY_CURRENT_USER\\Software\\Classes\\.jpeg</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">@=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Change</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s File Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> [HKEY_CURRENT_USER\\Software\\Classes\\.gif]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> @=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> ; Change Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">File</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">HKEY_CURRENT_USER\\Software\\Classes\\.png</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">@=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Change</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s File Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> [HKEY_CURRENT_USER\\Software\\Classes\\.bmp]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> @=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> ; Change Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">File</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">HKEY_CURRENT_USER\\Software\\Classes\\.tiff</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">@=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Change</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Extension</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s File Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> [HKEY_CURRENT_USER\\Software\\Classes\\.ico]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;"> @=&quot;PhotoViewer.FileAssoc.Tiff&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="关机命令" tabindex="-1">关机命令 <a class="header-anchor" href="#关机命令" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;">　</span><span style="color:#676E95;font-style:italic;">#取消关机</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#关机</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;">　</span><span style="color:#676E95;font-style:italic;">#强行关闭应用程序。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#计算机名　控制远程计算机。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;">　</span><span style="color:#676E95;font-style:italic;">#显示[图形用户界面](https://baike.baidu.com/item/图形用户界面)，但必须是Shutdown的第一个参数。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-l</span><span style="color:#A6ACCD;">　</span><span style="color:#676E95;font-style:italic;">#注销当前用户。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;">　</span><span style="color:#676E95;font-style:italic;">#关机并重启。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">关闭时</span><span style="color:#A6ACCD;">间</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;提示&gt;</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">shutdown</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">时间　#</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">设置关机倒计时。</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">设置关闭前的超时为</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">秒</span></span>
<span class="line"></span></code></pre></div>`,38),y=[i];function D(d,A,F,E,h,u){return a(),n("div",null,y)}const q=s(C,[["render",D]]);export{B as __pageData,q as default};
