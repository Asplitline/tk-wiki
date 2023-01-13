---
title: 三方模块
order: 2
---



# 第三方模块

别人写好的、具有特定功能的、我们能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中，所以又名包

两种存在形式

- js文件的形式存在，提供实现项目具体功能的API接口。

- 命令行工具形式存在，辅助项目开发

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

##  mongoose

### mongoDB

数据库即存储数据的仓库，可以将数据进行有序的分门别类的存储。它是独立于语言之外的软件，可以通过API去操作它。

常见的数据库软件有：mysql、mongoDB、oracle。

下载地址：https://www.mongodb.com/download-center/community

![image-20210107235324725](thrid-party-module.assets/image-20210107235324725-16736257399791.png)

![image-20210107235328345](thrid-party-module.assets/image-20210107235328345-16736257484223.png)

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

![image-20210108120522268](thrid-party-module.assets/image-20210108120522268-16736257879875.png)



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

![image-20210108141750682](thrid-party-module.assets/image-20210108141750682-16736258298177.png)

**session**：实际上就是一个对象，存储在服务器端的内存中，在session对象中也可以存储多条数据，每一条数据都有一个sessionid做为唯一标识。

![image-20210108141600640](thrid-party-module.assets/image-20210108141455847-16736258360529.png)

在node.js中需要借助express-session实现session功能

`npm install express-session`

```js
const session = require('express-session');
app.use(session({ secret: 'secret key' }));
```

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

# 