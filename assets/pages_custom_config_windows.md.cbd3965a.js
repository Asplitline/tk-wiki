import{_ as e,c as t,o as a,R as o}from"./chunks/framework.ec287406.js";const s="/assets/1657589891141-c6977d47-147e-42f8-8ab4-9bb609e0ed8b.9f1d6d1b.png",f=JSON.parse('{"title":"windows","description":"","frontmatter":{"title":"windows","order":2},"headers":[],"relativePath":"pages/custom/config/windows.md","filePath":"pages/custom/config/windows.md","lastUpdated":1683982947000}'),n={name:"pages/custom/config/windows.md"},d=o('<h1 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h1><h2 id="微软输入法卡顿" tabindex="-1">微软输入法卡顿 <a class="header-anchor" href="#微软输入法卡顿" aria-label="Permalink to &quot;微软输入法卡顿&quot;">​</a></h2><p>删除 <code>C:\\Users\\用户名\\AppData\\Roaming\\Microsoft\\InputMethod\\Chs</code> 中 Chs</p><h2 id="window-cmd-修改默认字符集" tabindex="-1">window cmd 修改默认字符集 <a class="header-anchor" href="#window-cmd-修改默认字符集" aria-label="Permalink to &quot;window cmd 修改默认字符集&quot;">​</a></h2><p>1、win+r 打开运行窗口</p><p>2、输入 regedit 打开注册表编辑器</p><p>3、定位到 HKEY_CURRENT_USER\\Console%SystemRoot%_system32_cmd.exe</p><p>4、修改其中 Codepage 选项，勾选十进制，windows 默认是 936</p><p>437（英语）</p><p>65001（utf-8）</p><p>936（GBK）</p><p><img src="'+s+'" alt="img"></p><p>参考 ： <a href="https://blog.csdn.net/yangzhong0808/article/details/79012628" target="_blank" rel="noreferrer">https://blog.csdn.net/yangzhong0808/article/details/79012628</a></p>',13),i=[d];function r(c,p,_,l,h,m){return a(),t("div",null,i)}const g=e(n,[["render",r]]);export{f as __pageData,g as default};
