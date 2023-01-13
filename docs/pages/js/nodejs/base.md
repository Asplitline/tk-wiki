---
title: NodeJs
order: 1
---











# 系统模块

## fs

f：file 文件 ，s：system 系统，文件操作系统。

```js
fs.reaFile('文件路径/文件名称'[,'文件编码'], callback); // 读取文件
fs.writeFile('文件路径/文件名称', '数据', callback); // 写入文件
```

## path

路径操作

路径拼接原因：不同操作系统的路径分隔符不统一

Windows 上是 `\ /` ， Linux 上是 `/`

```js
path.join('路径', '路径', ...)
```

- 大多情况使用绝对路径，相对路径相对命令行工具当前工作目录

- 读取文件或者设置文件路径时都会选择绝对路径

- 使用`__dirname`获取当前文件所在绝对路径

## http

### http协议

**超文本传输协议**（英文：HyperText Transfer Protocol，缩写：**HTTP**）规定了如何从网站服务器传输超文本到本地浏览器，它基于客户端服务器架构工作，是客户端（用户）和服务器端（网站）请求和应答的标准。

![image-20210107230144428](../../../../../notes/01_JavaScript/nodejs_image/image-20210107230144428.png)

### 报文

在HTTP请求和响应的过程中传递的数据块就叫报文，包括要传送的数据和一些附加信息，并且要遵守规定好的格式。

#### 请求报文

请求方式 （Request Method）

- GET   请求数据
- POST  发送数据

请求地址 （Request URL）

```js
 app.on('request', (req, res) => {
     req.headers  // 获取请求报文
     req.url      // 获取请求地址
     req.method   // 获取请求方法
 });
```

#### 响应报文

HTTP状态码

- 200 请求成功

- 404 请求的资源没有被找到

- 500 服务器端错误

- 400 客户端请求有语法错误

内容类型

- text/html
- text/css
- application/javascript
- image/jpeg
- application/json

```js
 app.on('request', (req, res) => {
     // 设置响应报文
     res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
 });
```

### 创建web服务器

```js
  // 引用系统模块
 const http = require('http');
  // 创建web服务器
 const app = http.createServer();
  // 当客户端发送请求的时候
 app.on('request', (req, res) => {
        //  响应
       res.end('<h1>hi, user</h1>');
 });
  // 监听3000端口
 app.listen(3000);
 console.log('服务器已启动，监听3000端口，请访问 localhost:3000')
```

[express创建web服务器](#express创建web服务器)

### 获取参数

#### GET请求

参数被放置在浏览器地址栏中，例如：http://localhost:3000/**?name=zhangsan&age=20**

参数获取需要借助系统模块url，url模块用来处理url地址

请求途径：浏览器地址栏、link标签的href属性、script标签的src属性、img标签的src属性、Form表单提交

```js
 const http = require('http');
 // 导入url系统模块 用于处理url地址
 const url = require('url');
 const app = http.createServer();
 app.on('request', (req, res) => {
     // 将url路径的各个部分解析出来并返回对象
         // true 代表将参数解析为对象格式
     let {query} = url.parse(req.url, true);
     console.log(query);
 });
 app.listen(3000);
```

#### POST请求

参数被放置在请求体中进行传输

获取POST参数需要使用data事件和end事件

使用querystring系统模块将参数转换为对象格式

请求途径：Form表单提交

```js
 // 导入系统模块querystring 用于将HTTP参数转换为对象格式
 const querystring = require('querystring');
 app.on('request', (req, res) => {
     let postData = '';
     // 监听参数传输事件
     req.on('data', (chunk) => postData += chunk;);
     // 监听参数传输完毕事件
     req.on('end', () => { 
         console.log(querystring.parse(postData)); 
         // parse默认为false，返回Object
     }); 
 });
```

> 如果要解析数据，要在end事件中解析

[express获取参数](#express获取参数)

### 路由

[express路由](#express路由)

路由是指客户端请求地址与服务器端程序代码的对应关系。简单的说，就是请求什么响应什么。

```js
 // 当客户端发来请求的时候
 app.on('request', (req, res) => {
     // 获取客户端的请求路径
     let { pathname } = url.parse(req.url);
     if (pathname == '/' || pathname == '/index') {
         res.end('欢迎来到首页');
     } else if (pathname == '/list') {
         res.end('欢迎来到列表页页');
     } else {
        res.end('抱歉, 您访问的页面出游了');
     }
 });
```

### 静态资源

服务器端不需要处理，可以直接响应给客户端的资源就是静态资源，例如CSS、JavaScript、image文件。

### 动态资源

相同的请求地址不同的响应资源，这种资源就是动态资源。

# 第三方模块

别人写好的、具有特定功能的、我们能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中，所以又名包

两种存在形式

- js文件的形式存在，提供实现项目具体功能的API接口。

- 命令行工具形式存在，辅助项目开发

## npm

npm (node package manager) ： node的第三方模块管理工具

官网：https://www.npmjs.com/

- `npm install package`

- `npm unintall package`

全局安装与本地安装

- 命令行工具：全局安装

- 库文件：本地安装

## nodemon

动态加载js，用nodemon命令替代node命令执行文件

`npm install nodemon –g`

## nrm

nrm ( npm registry manager )：npm下载地址切换工具，npm默认的下载地址在国外，国内下载速度慢

```shell
# 安装
npm install nrm -g
# 查看 带*为当前
nrm ls
# 使用 
nrm use name

国外：npmjs.com
国内：npm.taobao.org
```

## Gulp

将机械化操作编写成任务, 想要执行机械化操作时执行一个命令行命令任务就能自动执行

- 前端构建工具
- 项目上线，HTML、CSS、JS文件压缩合并
- 语法转换（es6、less ...）
- 公共文件抽离
- 修改文件浏览器自动刷新

```shell
npm install gulp
# 在项目根目录下建立gulpfile.js文件
# 重构项目的文件夹结构 src目录放置源代码文件 dist目录放置构建后文件
# 在gulpfile.js文件中编写任务.
# 在命令行工具中执行gulp任务
```

### 作用

- 项目上线，HTML、CSS、JS文件压缩合并

- 语法转换（es6、less ...）

- 公共文件抽离

- 修改文件浏览器自动刷新

### Gulp中提供的方法

gulp.src()：获取任务要处理的文件

gulp.dest()：输出文件

gulp.task()：建立gulp任务

gulp.watch()：监控文件的变化

```js
 const gulp = require('gulp');
  // 使用gulp.task()方法建立任务
 gulp.task('first', () => {
    // 获取要处理的文件
    gulp.src('./src/css/base.css') 
    // 将处理后的文件输出到dist目录
    .pipe(gulp.dest('./dist/css'));
 });
```

### Gulp插件

```
gulp-htmlmin ：html文件压缩
gulp-csso ：压缩css
gulp-babel ：JavaScript语法转化
gulp-less: less语法转化
gulp-uglify ：压缩混淆JavaScript
gulp-file-include 公共文件包含
browsersync 浏览器实时同步
```

##  mongoose

### mongoDB

数据库即存储数据的仓库，可以将数据进行有序的分门别类的存储。它是独立于语言之外的软件，可以通过API去操作它。

常见的数据库软件有：mysql、mongoDB、oracle。

下载地址：https://www.mongodb.com/download-center/community

<img src="../../../../../notes/01_JavaScript/nodejs_image/image-20210107235324725.png" alt="image-20210107235324725"  /><img src="../../../../../notes/01_JavaScript/nodejs_image/image-20210107235328345.png" alt="image-20210107235328345"  />

在一个数据库软件中可以包含多个数据仓库，在每个数据仓库中可以包含多个数据集合，每个数据集合中可以包含多条文档（具体的数据）。

|  **术语**  |                         **说明**                         |
| :--------: | :------------------------------------------------------: |
|  database  |      数据库，mongoDB数据库软件中可以建立多个数据库       |
| collection |    集合，一组数据的集合，可以理解为JavaScript中的数组    |
|  document  |    文档，一条具体的数据，可以理解为JavaScript中的对象    |
|   field    | 字段，文档中的属性名称，可以理解为JavaScript中的对象属性 |

**mongoDB数据库添加账号**

命令行 help 查看命令列表

```shell
#1. 以系统管理员的方式运行powershell
#2. 连接数据库
mongo
#3. 查看数据库
show dbs
#4. 切换到admin数据库
use admin
#5. 创建超级管理员账户 user-账号，pwd-密码，roles-权限 （root-超级管理员）
#db.createUser({user:'root',pwd:'root',roles:['root']})
db.createUser()
#6. 切换到blog
use blog
#7. 创建普通账号 (readWrite-读写权限)
#  db.createUser({user:'blog',pwd:'123456',roles:['readWrite']})
db.createUser()
# exit 退出mongodb
#8. 卸载mongodb服务
   #1.停止服务 
   net stop mongodb
   #2.移除服务
   mongodb --remove
#9. 创建mongodb服务  logpath-日志路径 dbpath-数据库路径 install-安装 auth-开启验证
mongod --logpath='C:\Program Files\MongoDB\Server\4.4\log\mongod.log' --dbpath='C:\Program Files\MongoDB\Server\4.4\data' --install --auth
#10. 启动mongodb服务
net start mongodb
#11. 连接数据库 mongodb://username:password@localhost:port/database
mongoose.connect('mongodb://blog:123456@localhost:27017/blog')
#12 以后先登录超级管理员
db.auth('root','root')
```

> #11 database 需要和 #6中 database 对应

### mongoose

使用Node.js操作MongoDB数据库需要依赖Node.js第三方包mongoose

```shell
# 安装
npm install mongoose
# 启动mongoDB
net start mongoDB
# 停止mongodb
net stop mongoDB`
```

#### 导入数据

```shell
# 未开启验证
mongoimport –d 数据库名称 –c 集合名称 –file 要导入的数据文件
# 开启验证 - 并且为json数据
mongoimport -u root -p root --authenticationDatabase admin -d mongooseExp  -c userlists /jsonArray user.json
```

#### 数据库连接

```js
 mongoose.connect('mongodb://localhost/playground')
     .then(() => console.log('数据库连接成功'))
     .catch(err => console.log('数据库连接失败', err));
```

#### 创建数据库

在MongoDB中**不需要显式创建数据库**，如果正在使用的数据库不存在，**MongoDB**会自动创建。

#### 集合操作

##### 创建集合

对集合设定规则 + 创建集合

```js
  // 设定集合规则
 const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     isPublished: Boolean
 });
  // 创建集合并应用规则
 const Course = mongoose.model('Course', courseSchema); // courses
```

##### mongoose验证

在创建集合规则时，可以设置当前字段的验证规则，验证失败就则输入插入失败。

|  关键字   |      说明      |         值          |
| :-------: | :------------: | :-----------------: |
| required  |    必传字段    |        true         |
| minlength | 字符串最小长度 |          3          |
| maxlength | 字符串最大长度 |         20          |
|    min    |    最小数值    |          2          |
|    max    |    最大数值    |         100         |
|   enum    |      枚举      | ['html'**,** 'css'] |
|   trim    |  去掉两边空格  |        true         |
| validate  |  自定义验证器  |                     |
|  default  |     默认值     |                     |

验证失败获取错误：`error.errors['字段名称'].message`

##### 集合关联

通常**不同集合的数据之间是有关系的**，例如文章信息和用户信息存储在不同集合中，但文章是某个用户发表的，要查询文章的所有信息包括发表用户，就需要用到集合关联。

- 使用id对集合进行关联
- 使用populate方法进行关联集合查询

```js
// 用户集合
const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } })); 
// 文章集合
const Post = mongoose.model('Post', new mongoose.Schema({
    title: { type: String },
    // 使用ID将文章集合和作者集合进行关联
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}));
//联合查询
Post.find().populate('author').then((err, result) => console.log(result));
```



#### 文档操作

##### 创建文档

创建文档实际上就是**向集合中插入数据**

```js
  // 创建集合实例
 const course = new Course({name: 'Node.js course'});
  // 将数据保存到数据库中
 course.save();
```

```js
 // 直接创建
Course.create({name: 'Node.js course'}).then(doc => console.log(doc)).catch(err => console.log(err))
```

##### 查询文档

```js
find() //  查找所有文档
findOne({name: 'Node.js course'})//  查找name为..数据，默认第一条
find({age: {$gt: 20, $lt: 50}} //  匹配年龄大于20小于40,双闭
find({hobbies: {$in: ['敲代码']}}) //  hobbies中包含'敲代码'
find().select('name email -_id')  //  选择name，email字段输出，去掉id字段
find().sort('age') //  按照年龄升序排序 
find().skip(2).limit(2) //  跳过前2条，显示3条数据
```

##### 删除文档

```js
findOneAndDelete({}) // 删除单个，返回删除数据
deleteMany({}) // 删除多个
```

##### 更新文档

```js
updateOne({查询条件}, {要修改的值}) // 更新单个
updateMany({查询条件}, {要更改的值})// 更新多个
```

### mongoose-sex-page

数据分页

```js
const pagination = require('mongoose-sex-page');
pagination(集合构造函数).page(1) .size(20) .display(8) .exec();
```



## art-template

让开发者以更加友好的方式拼接字符串，使项目代码更加清晰、更加易于维护

`npm install art-template`

```js
 // 导入模板引擎模块
 const template = require('art-template');
// 向模板导入函数或变量
template.defaults.imports.dateformat = dateformat;
// 函数使用 $imports.dateformat() 
// 设置模板根目录
template.defaults.root = path.join(__dirname, 'views');
// 设置模板默认后缀
template.defaults.extname = '.html'; // 有后缀找后缀，无后缀找默认
// 拼接模板和数据
const html = template('index.art',{age: 20}); //第二个参数必选，可填{}
```

### 模板语法

标准语法可以让模板更容易读写，原始语法具有强大的逻辑处理能力

默认会解析标签，无法显示html标签

标准语法： {{ 数据 }} - 

原始语法：<%=数据 %> 

原文输出

标准 @ 原始 - 可以显示html标签

`{{@ 数据 }}  <%- 数据 %>`

```html
<!-- 标准语法 -->
<p>{{ name }}</p>
<p>{{ 1 + 1 }}</p>
<p>{{ 1 + 1 == 2 ? '相等' : '不相等' }}</p>
<p>{{ content }}</p>
<p>{{@ content }}</p>  
<!-- 原始语法 -->
<p><%= name %></p>
<p><%= 1 + 2%></p>
<p><%= 1 + 1 == 2 ? '相等' : '不相等' %></p>
<p><%= content%></p>
<p><%- content%></p>
```

### 条件判断

```html
 <!-- 标准语法 --> 
 {{if 条件}} ... {{/if}}
 {{if v1}} ... {{else if v2}} ... {{/if}}
 <!-- 原始语法 -->
 <% if (value) { %> ... <% } %>
 <% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>
```

### 循环

```html
 <!-- 标准语法 -->
 {{each target}}
     {{$index}} {{$value}}
 {{/each}}
  <!-- 原始语法 -->
 <% for(var i = 0; i < target.length; i++){ %>
     <%= i %> <%= target[i] %>
 <% } %>
```

### 子模版

使用子模板可以将网站公共区块(头部、底部)抽离到单独的文件中。

```html
  <!-- 标准语法 -->
 {{include './header.art'}}
  <!-- 原始语法 -->
 <% include('./header.art') %>
```

### 模板继承

使用模板继承可以将网站HTML骨架抽离到单独的文件中，其他页面模板可以继承骨架文件。

```html
  <!--HTML骨架模板-->
<!doctype html>
 <html>
     <head>
         <meta charset="utf-8">
         <title>HTML骨架模板</title>
         {{block 'head'}}{{/block}}
     </head>
     <body>
         {{block 'content'}}{{/block}}
     </body>
 </html>
                              
  <!--index.art 首页模板-->
 {{extend './layout.art'}}
 {{block 'head'}} <link rel="stylesheet" href="custom.css"> {{/block}}
 {{block 'content'}} <p>This is just an awesome page.</p> {{/block}}               
```

## router

实现路由

```js
const getRouter = require('router'); 
const router = getRouter(); // 获取路由对象
router.get('/add', (req, res) => {
    res.end('Hello World!')
}) 
server.on('request', (req, res) => { 
    router(req, res, () => {}) // 启动路由,必须包含回调函数
})
```

## serve-static

实现静态资源访问服务

```js
const serveStatic = require('serve-static')
const serve = serveStatic('public') // 创建静态资源服务并指定静态资源服务目录
server.on('request', () => { 
    serve(req, res , () => {})// 启动静态资源服务,必须包含回调函数
})
```

## express

Express是一个基于Node平台的web应用开发框架，它提供了一系列的强大特性，帮助创建各种Web应用。

` npm install express`

### express特性

- 提供了方便简洁的路由定义方式
- 对获取HTTP请求参数进行了简化处理
- 对模板引擎支持程度高，方便渲染动态HTML页面
- 提供了中间件机制有效控制HTTP请求
- 拥有大量第三方中间件对功能进行扩展

### express创建web服务器

[原生创建web服务器](#创建web服务器)

-  send方法

   - 自动设置请求头
   - 自动设置http状态码
   - 自动设置响应内容类型及编码


```js
 // 引入Express框架
 const express = require('express');
 // 使用框架创建web服务器
 const app = express();
 // 当客户端以get方式访问/路由时
 app.get('/', (req, res) => {
    // 对客户端做出响应
    res.send('Hello Express'); // <h2>Hello Express</h2> {say: 'hello'}
 });
 // 程序监听3000端口
 app.listen(3000);
```

### express获取参数

[原生获取参数](#获取参数)

#### express获取get请求

Express中使用**req.query**即可获取GET参数，框架内部会将GET参数转换为对象并返回。

```js
// 例如: http://localhost:3000/?name=zhangsan&age=30
 app.get('/', (req, res) => {
    console.log(req.query); // {"name": "zhangsan", "age": "30"}
 });
```

#### express获取post请求

Express中接收post请求参数需要借助第三方包 body-parser

新版本可以直接使用`express.urlencoded`

- `extended: false` 使用querystring模块处理请求参数的格式，**键值，数组或string**
- `extended: true`（默认） 使用第三方模块qs处理请求参数的格式 ，**键值：任何类型** 

> This middleware is available in Express v4.16.0 onwards.

```js
 // 引入body-parser模块
 const bodyParser = require('body-parser');
 // 配置body-parser模块
 app.use(bodyParser.urlencoded({ extended: false }));
// >v4.16.0
 app.use(express.urlencoded({ extended: false }));
 // 接收请求
 app.post('/add', (req, res) => {
    // 接收请求参数
    console.log(req.body);
 }) 
```

### express路由	

[原生路由](#路由)

```js
 // 当客户端以get方式访问/时
 app.get('/', (req, res) => {
     // 对客户端做出响应
     res.send('Hello Express');
 });
 // 当客户端以post方式访问/add路由时
 app.post('/add', (req, res) => {
    res.send('使用post方式请求了/add路由');
 });
```

#### 构建模块化路由

```js
 // app.js
 const home = require('./route/home.js');
 const admin = require('./route/admin.js');
 app.use('/home', home);
 app.use('/admin', admin);
```

```js
 // home.js
 const home = express.Router(); 
 home.get('/index', () => {
     res.send('欢迎来到博客展示页面');
 });
 module.exports = home;
 // admin.js
 const admin = express.Router();
 admin.get('/index', () => {
     res.send('欢迎来到博客管理页面');
 });
 module.exports = admin;
```

#### express路由参数

```js
// localhost:3000/find/123
app.get('/find/:id', (req, res) => { 
     console.log(req.params); // {id: 123} 
});
```

### express中间件

中间件就是一堆方法，可以接收客户端发来的请求、可以对请求做出响应，也可以将请求继续交给下一个中间件继续处理。

<img src="../../../../../notes/01_JavaScript/nodejs_image/image-20210108120522268.png" alt="image-20210108120522268"  />



#### 中间件组成

中间件主要由两部分构成，**中间件方法**以及**请求处理函数**

**中间件方法**：由Express提供，负责拦截请求

**请求处理函数**：由开发人员提供，负责处理请求

```js
 app.get('请求路径', '处理函数')   // 接收并处理get请求
 app.post('请求路径', '处理函数')  // 接收并处理post请求
```

可以针对同一个请求设置多个中间件，对同一个请求进行多次处理

默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，终止匹配

可以调用next方法将请求的控制权交给下一个中间件，直到遇到结束请求的中间件

```js
 app.get('/request', (req, res, next) => {
     req.name = "张三";
     next();
 });
 app.get('/request', (req, res) => {
     res.send(req.name);
 });
```

#### app.use

app.use：匹配所有的请求方式，可以直接传入请求处理函数，代表接收所有的请求。

```js
 app.use((req, res, next) => {
     console.log(req.url);
     next();
 });
```

app.use 第一个参数也可以传入请求地址，代表不论什么请求方式，只要是这个请求地址就接收这个请求

```js
 app.use('/admin', (req, res, next) => {
     console.log(req.url);
     next();
 });
```

#### 中间件应用

- 路由保护，客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面
- 网站维护公告，在所有路由的最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中。
- 自定义404页面

#### 错误处理中间件

在程序执行的过程中，不可避免的会出现一些无法预料的错误，比如文件读取失败，数据库连接失败。

错误处理中间件：一个集中处理错误的地方

当程序出现错误时，调用next()方法，并且将错误信息通过参数的形式传递给next()方法，即可触发错误处理中间件。

```js
// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})
```

#### 捕获错误

在node.js中，异步API的错误信息都是通过回调函数获取的，支持Promise对象的异步API发生错误可以通过catch方法捕获。

try catch 可以捕获异步函数以及其他同步代码在执行过程中发生的错误，但是不能其他类型的API发生的错误。

```js
// 使用回调 
app.get("/", (req, res, next) => {
     fs.readFile("/file-does-not-exist", (err, data) => {
         if (err) {
            next(err);
         }
     });
});

// 利用await
// 调用util模块promisify方法
const promisify = require('util').promisify;
// promisify方法使现有异步api返回promise对象
const readFile = promisify(fs.readFile);
app.get('/', async (req, res, next) => {
    try {
        await fs.readFile('./sadas');
    } catch (err) {
        // 异步中throw会中断程序
        // throw new Error(error);
        next(err);
    }
})

app.get('/s', (req, res) => {
    // 同步可以直接throw
    throw new Error('error');
})
```



### express静态资源处理

express内置的**express.static**可以方便地托管静态文件，例如img、CSS、JavaScript 文件等。

```js
 app.use(express.static('public'));
 app.use('/static'express.static('public')); // 创建虚拟路径
```

public 目录下面的文件 

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/static/images/kitten.jpg
```

### express-art-template模板引擎

为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础上封装了express-art-template

`npm install art-template express-art-template`

```js
  // 当渲染后缀为art的模板时 使用express-art-template
 app.engine('art', require('express-art-template'));
  // 设置模板存放目录
 app.set('views', path.join(__dirname, 'views'));
  // 渲染模板时不写后缀 默认拼接art后缀
 app.set('view engine', 'art');
  // 变量设置到app.locals对象
 app.locals.users = [{ name: '张三',age: 20},{name: '李四',age: 20}]
// 有express对象,直接取,app.locals.users
// 无直接express对象,通过请求头 req.app.locals.users
// 模板中 users
 app.get('/', (req, res) => {
     res.render('index');// 渲染模板
 }); 
```

### cookie与session

**cookie**：浏览器在电脑硬盘中开辟的一块空间，主要供服务器端存储数据。

- 数据是以域名的形式进行区分的
- 有过期时间的，超过时间数据会被浏览器自动删除
- 随着请求被自动发送到服务器端

![image-20210108141750682](../../../../../notes/01_JavaScript/nodejs_image/image-20210108141750682.png)

**session**：实际上就是一个对象，存储在服务器端的内存中，在session对象中也可以存储多条数据，每一条数据都有一个sessionid做为唯一标识。

![image-20210108141455847](../../../../../notes/01_JavaScript/nodejs_image/image-20210108141455847.png)![image-20210108141600640](../../../../../notes/01_JavaScript/nodejs_image/image-20210108141600640.png)

在node.js中需要借助express-session实现session功能

`npm install express-session`

```js
const session = require('express-session');
app.use(session({ secret: 'secret key' }));
```

## config

允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，模块内部自动判断当前应用的运行环境，读取对应的配置信息，避免了当运行环境重复的多次切换时，手动到修改配置信息

- config是通过 NODE_ENV 判断当前环境
  - development - 开发
  - production - 生产

```shell
# 1.使用命令下载模块
 npm install config
# 2.在项目的根目录下新建config文件夹
# 3.在config文件夹下面新建default.json、development.json、production.json文件
# 4.在项目中通过require方法，将模块进行导入
# 5.使用模块内部提供的get方法获取配置信息
```

**将敏感配置信息存储在环境变量中**

```shell
# 1.在config文件夹中建立custom-environment-variables.json文件
# 2.配置项属性的值填写系统环境变量的名字
# 3.项目运行时config模块查找系统环境变量，并读取其值作为当前配置项属于的值
```

```js
const conf = require('config');
conf.get('title');
conf.get('db.host');
```

![image-20210108135634668](../../../../../notes/01_JavaScript/nodejs_image/image-20210108135634668.png)

<img src="../../../../../notes/01_JavaScript/nodejs_image/image-20201214214101534.png" alt="image-20201214214101534" style="zoom:80%;" />



## bcrypt

哈希加密是单程加密方式：1234 => abcd，在加密的密码中加入随机字符串可以增加密码被破解的难度。

`npm install bcrypt`

```js
// 导入bcrypt模块
const bcrypt = require('bcrypt');
// 生成随机字符串 gen => generate 生成 salt 盐
let salt = await bcrypt.genSalt(10); // 数值越大，复杂度越高,默认10
// 使用随机字符串对密码进行加密
let pass = await bcrypt.hash('明文密码', salt);
// 密码比对
let isEqual = await bcrypt.compare('明文密码', '加密密码');
```

bcrypt依赖的其他环境

- python 2.x
- node-gyp : `npm install -g node-gyp`
- windows-build-tools : `npm install --global --production windows-build-tools`

## formidable

解析表单，支持get请求参数，post请求参数、文件上传

`npm install formidable`

```js
 // 引入formidable模块
 const formidable = require('formidable');
 // 创建表单解析对象
 const form = formidable({ uploadDir: __dirname, keepExtensions: true });
 // uploadDir - 文件上传路径
 // keepExtensions - 保留文件扩展名
 
// 对表单进行解析
 form.parse(req, (err, fields, files) => {
     // fields 存储普通请求参数
     // files 存储上传的文件信息
 });
```

## Joi

JavaScript对象的规则描述语言和验证器

`npm install joi`

```js
const Joi = require('joi');
const schema = {
    username: Joi.string().alphanum().min(3).max(30).required().error(new Error(‘错误信息’)),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
};
Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
```

# 项目

## package.json

项目描述文件，记录了当前项目信息，例如项目名称、版本、作者、github地址、当前项目依赖了哪些第三方模块等。

```json
{
  "name": "1.test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  //命令命名
  //npm run scripts
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  //项目依赖 npm install package
  //下载项目依赖 npm install --production
  "dependencies": {
    "nodemon": "^2.0.6" 
  },
  //开发依赖 npm install package --save-dev
  "devDependencies": {
    "nrm": "^1.2.1"
  }
}
```



## 项目初始化

```shell
# 生成package.json文件 
npm init -y # -y:默认yes

# 初始化项目 找package.json
npm install 
```

## node_modules问题

- 将项目整体拷贝给别人的时候,，传输速度会很慢很慢. 
- 确保模块的版本和当前保持一致，否则会导致当前项目运行报错

## package-lock.json

锁定包的版本，确保再次下载时不会因为包版本不同而产生问题

加快下载速度，因为该文件中已经记录了项目所依赖第三方包的树状结构和包的下载地址，重新安装时只需下载即可，不需要做额外的工作

## 项目依赖

在项目的开发阶段和线上运营阶段，都需要依赖的第三方包，称为项目依赖

`npm install package`

默认被添加到 package.json 文件的 dependencies 字段中

## 开发依赖

在项目的开发阶段需要依赖，线上运营阶段不需要依赖的第三方包，称为开发依赖

`npm install 包名 --save-dev`

将包添加到package.json文件的devDependencies字段中

## 环境配置

**开发环境**：当项目处于开发阶段，项目运行在开发人员的电脑上

**生产环境**：当项目开发完成以后，要将项目放到真实的网站服务器电脑中运行

**区别**：在不同的环境中，项目的配置是不一样

```js
// 通过process.env 获取本机环境变量
if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境');
    app.use(morgan('dev'));
} else {
    console.log('当前是生产环境');
}

// morgan 打印请求信息
npm install morgan

GET /admin/login 200 62.407 ms - 1990
GET /admin/css/base.css 304 4.280 ms - -
GET /admin/lib/bootstrap/css/bootstrap.min.css 304 5.182 ms - -
GET /admin/lib/jquery/dist/jquery.min.js 304 4.754 ms - 
```

**配置**：通过电脑操作系统中的系统环境变量区分当前是开发环境还是生产环境

![image-20210108135319815](../../../../../notes/01_JavaScript/nodejs_image/image-20210108135319815.png)

# 模块

## 模块规范化

lNode.js规定一个**JavaScript**文件**就是一个模块，模块**内部定义的变量和函数**默认情况下在**外部无法得到

### 导出 - exports

```js
// 在模块内部定义变量
let version = 1.0;
// 在模块内部定义方法
const sayHi = name => `您好, ${name}`;
// 向模块外部导出数据 
exports.version = version;
module.exports.sayHi = sayHi;
```

`exports`是`module.exports`的地址引用，导出对象最终以module.exports为准

exports只是前者一个引用，容易丢失，前者指向被覆盖，后者导出3

```js
exports = 3;
module.exports = 3;
```

### 导入 - require

```js
let a = require('./b.js'); // 后缀可省
// 输出b模块中的version变量
console.log(a.version);
// 调用b模块中的sayHi方法 并输出其返回值
console.log(a.sayHi('123')); 
```



## 模块加载机制

### 模块查找规则

#### 当模块拥有路径但没有后缀时

```js
require('./find.js');
require('./find');
```

1.require方法根据模块路径查找模块，如果是完整路径，直接引入模块。

2.如果模块后缀省略，先找**同名JS文件**再找**同名JS文件夹**

3.如果找到了**同名文件夹**，找文件夹中的**index.js**

4.如果文件夹中没有index.js就会去当前文件夹中的package.json文件中查找**main选项中入口文件**

5.如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到



#### 当模块没有路径且没有后缀时

```js
require('find');
```

1.Node.js会假设它是系统模块

2.Node.js会去**node_modules文件夹中**

3.首先看是否有**同名JS文件**

4.再看是否有**同名文件夹**，找文件夹中index.js

5.如果没有index.js查看该文件夹中的**package.json中的main选项确定模块入口文件**

6.否则找不到报错

# 异步编程

## 同步API和异步API

同步API：同步API从上到下依次执行，前面代码会阻塞后面代码执行，**直接返回值中拿到同步API执行结果**

异步API：异步API不会等待API执行完成后再向下执行代码，**通过回调函数获取异步api获取结果**

```js
function getMsg (callback) {
    setTimeout(function () {
        callback ({ msg: 'Hello Node.js' })
    }, 2000);
}
getMsg (function (msg) { 
    console.log(msg);
});
```

## Promise

Promise出现的目的是解决Node.js异步编程中回调地狱的问题。

```js
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (true) {
            resolve({name: '张三'})
        }else {
            reject('失败了') 
        } 
    }, 2000);
});
promise.then(result => console.log(result); // {name: '张三'})
       .catch(error => console.log(error); // 失败了)

```

## 异步函数

异步函数是异步编程语法的终极解决方案，它可以让我们将异步代码写成同步的形式，让代码不再有回调函数嵌套，使代码变得清晰明了。

### async关键字

普通函数加async关键字变成异步函数

- 异步函数默认**返回promise对象**
- return关键字（替代了resolve方法）返回promise对象，调用异步函数再链式调用then方法获取异步函数执行结果
- throw关键字抛出程序异常，调用异步函数再链式调用catch方法获取异步函数执行的错误信息

```js
const fn = async () => {};
async function fn () {}
```

### await关键字

暂停异步函数向下执行 直到promise返回结果

- await关键字**只能出现在异步函数中**

- await promise，**await后面只能写promise对象**

# WEB API

**文件读取** 

```js
 var reader = new FileReader();
 reader.readAsDataURL('文件');
 reader.onload = function () {
     console.log(reader.result); 
 }
```

# global

在**浏览器**中全局对象是**window**，在**Node**中全局对象是**global**。

```shell
console.log()     	#在控制台中输出
setTimeout()     	#设置超时定时器
clearTimeout()  	#清除超时时定时器
setInterval()      	#设置间歇定时器
clearInterval()  	#清除间歇定时器
```
