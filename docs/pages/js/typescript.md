---
title: typescript
order: 1
---

<!-- # TypeScript -->

## 介绍

TypeScript 是 JavaScript 的超集，因为它扩展了 JavaScript

### 特点

- 最新的 JavaScript 新特特性
- 代码**静态检查**
- 支持诸如 C,C++,Java,Go 等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)

### 安装

1. 安装 typescript

```shell
npm i -g typescript
```

2. 安装 ts-node - ts 在 nodejs 上面执行

```shell
npm i -g ts-node
```

3. 创建一个 tsconfig.json 文件

```shell
tsc --init
```

## 类型

### 基础类型

```ts
let str: string = 'jimmy'
let num: number = 24
let bool: boolean = false
let u: undefined = undefined
let n: null = null
let obj: object = { x: 1 }
let big: bigint = 100n
let sym: symbol = Symbol('me')
```

`null`和`undefined`是任何类型的子类型，也可以赋值给任何类型

注意：当`tsconfig.json`指定了`"strictNullChecks":true`，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型

> number 和 bigint 互不兼容

### 其他类型

#### Array

数组：两种声明方式

```ts
let arr:string[] = ["1","2"];
let arr2:Array<string> = ["1","2"]；
```

联合类型数组：兼容多个类型

```ts
let arr: (number | string)[]
arr3 = [1, 'b', 2, 'c']
```

对象数组：数组元素为对象

```ts
interface Arrobj {
  name: string
  age: number
}
let arr3: Arrobj[] = [{ name: 'jimmy', age: 22 }]
```

## 函数

### 函数定义

#### 函数声明

```ts
function sum(x: number, y: number): number {}
```

#### 函数表达式

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}
```

#### 接口定义函数类型

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}
```

### 参数

#### 可选参数

```ts
// ?: type
function buildName(firstName: string, lastName?: string) {}
```

#### 参数默认值

```ts
// type = 'default'
function buildName(firstName: string, lastName: string = 'Cat') {}
```

#### 剩余参数

```ts
// ...variables = type[]
function push(array: any[], ...items: any[]) {}
```

### 函数重载

场景：不同类型的参数来调用同一个函数，返回不同的类型的结果

```ts
function add(x, y) {
  return x + y
}
add(1, 2) // 3
add('1', '2') //"12"
```

开启 `noImplicitAny` 的配置项时，会报错，x，y 会隐式推断为 any

解决方案：定义联合类型

```ts
type Combinable = string | number
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}
```

```js
const result = add('Semlinker', ' Kakuqo') // ok
result.split(' ') // Property 'split' does not exist on type 'number'
```

新问题：返回值类型可能为 number，不能直接调用 split

解决方案：为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

```ts
type Types = number | string
// 多个函数声明
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
// 函数实现
function add(a: Types,  b: Types):  {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

## 元组 - Tuple

### 定义

在单个变量中**存储不同类型**的值

特性：限制数组元素的个数和类型

> 都不确定使用 any[]

```ts
let x: [string, number]
// 类型必须匹配且个数必须为2

x = ['hello', 10] // OK
x = ['hello', 10, 10] // Error
x = [10, 'hello'] // Error
```

### 解构赋值

```ts
let employee: [number, string] = [1, 'Semlinker']
let [id, username] = employee
```

> 解构元素小于等于元组元素个数

### 元素

#### 可选元素

可选元素：通过 `?` 号来声明可选元素

```ts
// [variable?]
let optionalTuple: [string, boolean?]
optionalTuple = ['Semlinker', true]
optionalTuple = ['Kakuqo']
```

#### 剩余元素

剩余元素：代表元组类型是开放的，有零个或多个额外的元素。

```ts
type RestTupleType = [number, ...string[]]
let restTuple: RestTupleType = [666, 'Semlinker', 'Kakuqo', 'Lolo']
```

#### 只读元素 ^3.4+^

可以为任何元组类型加上 `readonly` 关键字前缀，以使其成为只读元组。

```ts
const point: readonly [number, number] = [10, 20]
```

> 使用 readonly 后，任何企图修改元组中元素的操作都会抛出异常

### void

`void`：没有任何类型。

```ts
let a: void
let b: number = a // Error
```

不能直接赋值，只能为它赋予`null`和`undefined`（在`strictNullChecks`未指定为 true 时）

方法没有返回值，定义为 void 类型，不能为 undefined

```ts
function fun(): undefined {
  console.log('this is TypeScript')
}
fun() // Error
```

### never

`never`：永不存在的值的类型

以下两种情况无法返回值

1. 函数执行时抛出了**异常**
2. 函数中执行无限循环的代码

```ts
// 异常
function err(msg: string): never {
  // OK
  throw new Error(msg)
}

// 死循环
function loopForever(): never {
  // OK
  while (true) {}
}
```

`never`类型同`null`和`undefined`一样，也是任何类型的子类型，也**可以赋值给任何类型。**

除了 never 本身，没有类型可以赋值给 never，包括 any

```ts
let ne: never
let nev: never
let an: any

ne = 123 // Error
ne = nev // OK
ne = an // Error
ne = (() => {
  throw new Error('异常')
})() // OK
ne = (() => {
  while (true) {}
})() // OK
```

never 作用：避免出现新增类型确没有具体实现

```ts
type Foo = string | number

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === 'string') {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === 'number') {
    // 这里 foo 被收窄为 number 类型
  } else {
    // 利用never只能赋值为never这一特性
    const check: never = foo
  }
}
```

新增 boolean 后，没有具体的实现，会将 foo 赋值为 never，会报错

```ts
type Foo = string | number | boolean
```

### any

任何类型都可以被归为 any 类型。

- any 相当于 js
- 声明时，未指定其类型，默认为 any

一个普通类型，在**赋值过程中改变类型**是不被允许的，但是 any 可以

```ts
let a: string = 'seven'
a = 7
// TS2322: Type 'number' is not assignable to type 'string'.
```

any 访问任何属性和方法

```ts
let anyThing: any = 'hello'
console.log(anyThing.myName)
console.log(anyThing.myName.firstName)
let anyThing: any = 'Tom'
anyThing.setName('Jerry')
anyThing.setName('Jerry').sayHello()
anyThing.myName.setFirstName('Cat')
```

### unknown ^3.0+^

与`any`一样，所有类型都可以分配给`unknown`:

unkonwn 与 any 区别

- any：任何类型都能赋值给 any，any 也能赋值给任何类型
- unkown：任何类型都能赋值给 unkown，但它只能赋值给 unknown 和 any

总结：unknown 只能赋值给 any、unknown 。any 无限制。

**不缩小类型**，就无法对`unknown`类型执行任何操作。可以使用`typeof`、`类型断言`等方式来缩小未知范围

```ts
function getDogName() {
  let x: unknown
  return x
}
const dogName = getDogName()
// 直接使用
const upName = dogName.toLowerCase() // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase() // OK
}
// 类型断言
const upName = (dogName as string).toLowerCase() // OK
```

通常先声明 unknown，然后通过类型缩小来锁定具体类型

### Number、String、Boolean、Symbol

Number、String、Boolean、Symbol 是相应原始类型的**包装对象**

原始类型兼容对应的对象类型，**对象类型不兼容对应的原始类型**

```ts
let num: number
let Num: Number
Num = num // ok
num = Num // ts(2322)报错
```

> 不要使用对象类型来注解值的类型，因为这没有任何意义。

### object、Object 和 {}

`object`：所有非原始类型

非原始类型能赋值给 object

```ts
let lowerCaseObject: object
lowerCaseObject = 1 // ts(2322)
lowerCaseObject = 'a' // ts(2322)
lowerCaseObject = true // ts(2322)
lowerCaseObject = null // ts(2322)
lowerCaseObject = undefined // ts(2322)
lowerCaseObject = {} // ok
```

> 原始类型：`string`、`boolean`、`number`、`bigint`、`symbol`、`null` 和 `undefined`

`Object`：所有拥有 toString、hasOwnProperty 方法的类型

所有原始类型、非原始类型都可以赋给 Object

```ts
let upperCaseObject: Object
upperCaseObject = 1 // ok
upperCaseObject = 'a' // ok
upperCaseObject = true // ok
upperCaseObject = null // ts(2322)
upperCaseObject = undefined // ts(2322)
upperCaseObject = {} // ok
```

`{}`：原始类型和非原始类型的集合，等同 `Object`

> 严格模式下：undefined 和 null 不能赋值给 object、Object、{}

总结：Object 和 {} 可以互换，object 只表示非原始类型

## 类型推断

TypeScript 会根据上下文环境自动推断出变量的类型

```ts
{
  let str: string = 'this is string'
  let num: number = 1
  let bool: boolean = true
}
{
  let str = 'this is string' // 等价
  let num = 1 // 等价
  let bool = true // 等价
}
{
  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b
  }
  const x1 = add1(1, 1) // 推断出 x1 的类型也是 number

  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b
  }
  const x2 = add2(1)
  const x3 = add2(1, '1') // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
}
{
  // 默认推断为  any
  let myFavoriteNumber
}
```

## 类型断言

类型断言：让 TypeScript 按照我们的方式做类型检查

```ts
const arrayNumber: number[] = [1, 2, 3, 4]
const greaterThan2: number = arrayNumber.find((num) => num > 2) // ts(2322) 不能把类型 undefined 分配给类型 number
```

错误原因：在 TypeScript 看来，greaterThan2 可能是 number，也可能是 undefined。

解决：通过类型断言

```ts
const greaterThan2: number = arrayNumber.find((num) => num > 2) as number
```

### 语法

```ts
// 尖括号 语法
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length

// as 语法
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

> 括号格式会与 react 中 JSX 产生语法冲突，推荐 as

### 非空断言

`!` ：用于断言操作对象是 非 null 和非 undefined 类型。

`x!`：变量 x 排除 undefined 和 null 类型

```ts
let mayNullOrUndefinedOrString: null | undefined | string
mayNullOrUndefinedOrString!.toString() // ok
mayNullOrUndefinedOrString.toString() // ts(2531)
```

### 确定赋值断言

`!` ：在实例属性或属性声明后

`let x!`：变量 x 一定会被赋值

```ts
let x: number
// let x!: number;
initialize()

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x) // Error
function initialize() {
  x = 10
}
```

## 字面量类型

**字符串**字面量类型、**数字**字面量类型、**布尔**字面量类型

```ts
{
  let specifiedStr: 'this is string' = 'this is string'
  let specifiedNum: 1 = 1
  let specifiedBoolean: true = true
}
```

字面量联合类型描述了一个明确，可 'up' 可 'down' 的集合

```ts
type Direction = 'up' | 'down'

function move(dir: Direction) {
  // ...
}
move('up') // ok
move('right') // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
```

let 和 const 分析

const ：类型为**字面量类型**

```ts
{
  const str = 'this is string' // str: 'this is string'
  const num = 1 // num: 1
  const bool = true // bool: true
}
```

let：类型为**字面量类型的父类型**

```ts
{
  let str = 'this is string' // str: string
  let num = 1 // num: number
  let bool = true // bool: boolean
}
```

## 类型拓宽

### 类型拓宽

类型拓宽：初始值字面量推断出来的类型

1. 通过 let，var 定义的非只读属性
2. 指定了初始值
3. 未显式添加类型注解

#### 字面量类型拓宽

```ts
let str = 'this is string' // 类型是 string
let strFun = (str = 'this is string') => str // 类型是 (str?: string) => string;
const specifiedStr = 'this is string' // 类型是 'this is string'
let str2 = specifiedStr // 类型是 'string'
let strFun2 = (str = specifiedStr) => str // 类型是 (str?: string) => string;
```

#### 特定类型拓宽

```js
{
  let x = null // 类型拓宽成 any
  let y = undefined // 类型拓宽成 any

  /** -----分界线------- */
  const z = null // 类型是 null

  /** -----分界线------- */
  let anyFun = (param = null) => param // 形参类型是 null
  let z2 = z // 类型是 null
  let x2 = x // 类型是 null
  let y2 = y // 类型是 undefined
}
```

案例：

```ts
interface Vector3 {
  x: number
  y: number
  z: number
}

function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis]
}
```

问题：`x` 会被自动扩宽为 string

```ts
let x = 'x'
let vec = { x: 10, y: 20, z: 30 }
// 类型“string”的参数不能赋给类型“"x" | "y" | "z"”的参数。
getComponent(vec, x) // Error
```

解决：使用 const 声明 x

```js
const x = 'x' // type is "x"
let vec = { x: 10, y: 20, z: 30 }
getComponent(vec, x) // OK
```

对于任何给定的值都有许多可能的类型

```js
const arr = ['x', 1]

/*
('x' | 1)[]
['x', 1]
[string, number]
readonly [string, number]
(string | number)[]
readonly (string|number)[]
[any, any]
any[]
*/
```

下面的例子中，变量 x 的类型被推断为字符串

```js
let x = 'semlinker'
x = 'kakuqo'
x = 'lolo'
```

以下代码也合法，一般规则是，变量的类型在声明之后不应该改变。

```js
let x = 'x'
x = /x|y|z/
x = ['x', 'y', 'z']
```

### 控制类型拓宽

#### 非原始值类型拓宽

const：使用 const 会将值限制为 字面量

#### 数组和对象类型拓宽

```js
const obj = {
  x: 1
}

obj.x = 6 // ok
obj.x = '6' // Type 'string' is not assignable to type 'number'
obj.y = 8 // Property 'y' does not exist on type '{ x: number; }'
```

##### 覆盖默认行为

通过提供显式注解，覆盖默认行为

```js
// Type is { x: 1 | 3 | 5; }
const obj: { x: 1 | 3 | 5 } = {
  x: 1
}
```

> 默认行为：通过属性的初始化值来推断属性的类型

##### const 断言

const 断言，ts 将它推断出最窄的类型，没有拓宽。

区别：不同于 let 和 const 中的 const，这里 const 是类型级构造，在值空间中引入符号。

```js
// Type is { x: number; y: number; }
const obj1 = {
  x: 1,
  y: 2
};

// Type is { x: 1; y: number; }
const obj2 = {
  x: 1 as const,
  y: 2,
};

// Type is { readonly x: 1; readonly y: 2; }
const obj3 = {
  x: 1,
  y: 2
} as const;
```

## 类型缩小

类型缩小：一个较为宽泛的集合缩小到相对较小、较明确的集合

### 类型守卫

通过类型守卫缩小子类型

```js
{
  let func = (anything: any) => {
    if (typeof anything === 'string') {
      return anything // 类型是 string
    } else if (typeof anything === 'number') {
      return anything // 类型是 number
    }
    return null
  }
}
```

### 等值判断或流程控制语句

通过字面量类型等值判断（===）或其他控制流语句（包括但不限于 if、三目运算符、switch 分支）将联合类型收敛为更具体的类型

```tsx
{
  type Goods = 'pen' | 'pencil' | 'ruler'
  const getPenCost = (item: 'pen') => 2
  const getPencilCost = (item: 'pencil') => 4
  const getRulerCost = (item: 'ruler') => 6
  const getCost = (item: Goods) => {
    if (item === 'pen') {
      return getPenCost(item) // item => 'pen'
    } else if (item === 'pencil') {
      return getPencilCost(item) // item => 'pencil'
    } else {
      return getRulerCost(item) // item => 'ruler'
    }
  }
}
```

特殊值问题：通过 object 无法排除 null

```tsx
const el = document.getElementById('foo') // Type is HTMLElement | null
if (typeof el === 'object') {
  el // Type is HTMLElement | null
}
```

空字符串和 0：无法通过 !x 排除 number，string

```tsx
function foo(x?: number | string | null) {
  if (!x) {
    x // Type is string | number | null | undefined
  }
}
```

### 标签联合

放置一个明确标签，帮助 ts 确认类型

```tsx
interface UploadEvent {
  type: 'upload'
  filename: string
  contents: string
}

interface DownloadEvent {
  type: 'download'
  filename: string
}

type AppEvent = UploadEvent | DownloadEvent

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case 'download':
      e // Type is DownloadEvent
      break
    case 'upload':
      e // Type is UploadEvent
      break
  }
}
```

## 自定义类型

### 联合类型

联合类型：取值为多个值的一种，使用 `|` 分隔

```tsx
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven' // OK
myFavoriteNumber = 7 // OK
```

### 类型别名

类型别名用来给一个类型起个新名字

```tsx
type Message = string | string[]
let greet = (message: Message) => {
  // ...
}
```

### 交叉类型

交叉类型：多个类型合并为一个类型。使用 `&` 定义交叉类型

```tsx
type IntersectionType = { id: number; name: string } & { age: number }
const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age: 18
}
```

### 交叉类型同名问题

#### 基础类型交叉

string 和 name 交叉后为 never

```tsx
type IntersectionTypeConfict = { id: number; name: string } & { age: number; name: number }
const mixedConflict: IntersectionTypeConfict = {
  id: 1,
  name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
  age: 2
}
```

number 和 数字字面量 交叉后为 数字字面量

```tsx
type IntersectionTypeConfict = { id: number; name: 2 } & { age: number; name: number }

let mixedConflict: IntersectionTypeConfict = {
  id: 1,
  name: 2, // ok
  age: 2
}
mixedConflict = {
  id: 1,
  name: 22, // '22' 类型不能赋给 '2' 类型
  age: 2
}
```

#### 非基本数据类型交叉

属性直接合并，如果同名。判断是基础类型还是非基础类型，按照规则进行。

```tsx
interface A {
  x: { d: true }
}
interface B {
  x: { e: string }
}
interface C {
  x: { f: number }
}
type ABC = A & B & C
let abc: ABC = {
  x: {
    d: true,
    e: '',
    f: 666
  }
}
```

## 接口

接口（Interfaces）来定义对象的类型。

- 一般首字母大写
- 赋值时，变量须和接口保持一致

接口可以定义多次，并自动合并

```tsx
interface Point {
  x: number
}
interface Point {
  y: number
}
const point: Point = { x: 1, y: 2 }
```

### 可选 | 只读属性

可选属性：属性选填

只读属性：只能在创建时修改值

```tsx
interface Person {
  readonly name: string
  age?: number
}
```

ts 提供的`ReadonlyArray<T>` 类型，它将可变方法去掉，保证数组创建后不能再修改

```tsx
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```

### 任意属性

索引签名表示任意属性

- 一个接口只能定义一个任意属性

```tsx
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
}
```

定义了任意属性，**确定属性**和**可选属性**的类型都**必须是它的类型的子集**

```tsx
interface Person {
  name: string
  age?: number // 这里真实的类型应该为：number | undefined
  [propName: string]: string | number | undefined // 这样声明才不报错
}
```

### 绕开属性检测

#### 鸭式辨别法

所谓的**鸭式辨型法**就是像鸭子一样走路并且嘎嘎叫的就叫鸭子，即具有鸭子特征的认为它就是鸭子。**通过制定规则来判定对象是否实现这个接口。**

```tsx
interface LabeledValue {
  label: string
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}
printLabel({ size: 10, label: 'Size 10 Object' }) // Error
```

报错原因：**参数接收对象**，相当于直接赋值，有严格定义，不能多参或少参。

解决方法：通过外部变量 obj 接收，myObj 会被推断为 `{size: number, label: string}`

但是**外面接收对象**：用 另一变量 myObj 接收对象，==@DIF - 此对象不会进行额外检查==。

```tsx
interface LabeledValue {
  label: string
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}
let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj) // OK
```

#### 类型断言

类型断言：手动指定类型，ts 不会进行额外检测

```tsx
// * as Props
interface Props {
  name: string
  age: number
  money?: number
}

let p: Props = {
  name: '兔神',
  age: 25,
  money: -100000,
  girl: false
} as Props // OK
```

#### 索引签名

通过索引签名定义任意属性接收值

```tsx
// [key: string]: any;
interface Props {
  name: string
  age: number
  money?: number
  [key: string]: any
}

let p: Props = {
  name: '兔神',
  age: 25,
  money: -100000,
  girl: false
} // OK
```

## 接口与类型别名区别

接口：定义数据模型

别名：给类型取个新名字

> 大多数情况下等效

### Objects / Functions

```tsx
interface Point {
  x: number
  y: number
}

interface SetPoint {
  (x: number, y: number): void
}
```

```tsx
type Point = {
  x: number
  y: number
}

type SetPoint = (x: number, y: number) => void
```

### Other types

==@DIF - 与接口不同，类型别名还能作用于其他类型==

```tsx
// primitive
type Name = string

// object
type PartialPointX = { x: number }
type PartialPointY = { y: number }

// union
type PartialPoint = PartialPointX | PartialPointY

// tuple
type Data = [number, string]

// dom
let div = document.createElement('div')
type B = typeof div
```

接口可以定义多次，自动合并为单个接口。类型别名不行

```js
interface Point {
  x: number;
}
interface Point {
  y: number;
}
const point: Point = { x: 1, y: 2 }
```

### 扩展

interface：继承方式扩展（extends）

type：交叉类型方式扩展（&）

```tsx
interface PointX {
  x: number
}

interface Point extends PointX {
  y: number
}
```

```tsx
type PointX = {
  x: number
}

type Point = PointX & {
  y: number
}
```

interface 和 type 之间也可以互相扩展

```tsx
type PointX = {
  x: number
}
interface Point extends PointX {
  y: number
}
```

```tsx
interface PointX {
  x: number
}
type Point = PointX & {
  y: number
}
```

## 泛型

### 泛型介绍

场景：参数可以是任意值，返回值将参数原样返回

- 输出类型和输入类型关联
- 两个关联的输入类型

```tsx
const identity = (arg) => arg;

type idBoolean = (arg: boolean) => boolean;
type idNumber = (arg: number) => number;
type idString = (arg: string) => string;
...
```

使用泛型重构代码，新建泛型变量 T，分别在参数和返回值中占位

```tsx
function identity<T>(arg: T): T {
  return arg
}
```

```tsx
function identity<T, U>(value: T, message: U): T {
  console.log(message)
  return value
}
// 显示设定类型
console.log(identity<Number, string>(68, 'Semlinker'))
// 自动推导类型
console.log(identity(68, 'Semlinker'))
```

### 泛型约束

```tsx
function trace<T>(arg: T): T {
  console.log(arg.size) // Error: Property 'size doesn't exist on type 'T'
  return arg
}
```

问题：T 可以是任何类型，不管使用什么属性都会报错（除非这个属性和方法是所有集合共有）

思路：参数类型包含 size 属性即可，可通过 extends

```tsx
interface Sizeable {
  size: number
}
function trace<T extends Sizeable>(arg: T): T {
  console.log(arg.size)
  return arg
}
```

### 泛型工具类型

#### typeof

typeof：获取变量或属性的类型

```tsx
interface Person {
  name: string
  age: number
}
const sem: Person = { name: 'semlinker', age: 30 }
type Sem = typeof sem // type Sem = Person
```

也可获取函数对象类型

```tsx
function toArray(x: number): Array<number> {
  return [x]
}
type Func = typeof toArray // -> (x: number) => number[]
```

#### keyof

keyof：获取某种类型的所有键名，返回类型是联合类型

```tsx
interface Person {
  name: string
  age: number
}

type K1 = keyof Person // "name" | "age"
type K2 = keyof Person[] // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person } // string | number
```

typescript 支持 两种索引签名，数字索引、字符串索引

==@DIF - 要同时支持 两种索引类型，数字索引返回值，必须是字符串索引返回值子类。==

因为 JS 会把**数字索引转成字符串索引**然后进行索引操作。

```tsx
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string
}
```

##### keyof 作用

场景：限制属性名的范围

```tsx
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
```

`T extends object`：T 约束为 object 子类型

`K extends keyof T`：K 约束为 T 键名子类型

访问已存在的属性

```js
type Todo = {
  id: number;
  text: string;
  done: boolean;
}

const todo: Todo = {
  id: 1,
  text: "Learn TypeScript keyof",
  done: false
}

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const id = prop(todo, "id"); // const id: number
const text = prop(todo, "text"); // const text: string
const done = prop(todo, "done"); // const done: boolean
```

会阻止访问不存在的属性

```js
const date = prop(todo, "date");
Argument of type '"date"' is not assignable to parameter of type '"id" | "text" | "done"'.
```

#### in

in：遍历枚举类型

```js
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

#### infer

infer：条件判断中，类型推导。

**要看 infer 放置的位置，在哪就推断哪个值**

格式：使用 infer 声明一个变量类型，条件类型判断为 true 时生效

```js
type ExtractSelf<T> = T extends (infer U) ? U : T;

type T1 = ExtractSelf<string>;        // string
type T2 = ExtractSelf<() => void>;    // () => void
type T3 = ExtractSelf<Date[]>;        // Date[]
type T4 = ExtractSelf<{ a: string }>; // { a: string }
```

ExtractArrayItemType：推断元素类型。普通元素直接返回类型，数组元素返回数组中元素类型

```js
type ExtractArrayItemType<T> = T extends (infer U)[] ? U : T;

// 条件判断都为 false，返回 T
type T1 = ExtractArrayItemType<string>;         // string
type T2 = ExtractArrayItemType<() => number>;   // () => number
type T4 = ExtractArrayItemType<{ a: string }>;  // { a: string }

// 条件判断为 true，返回 U
type T3 = ExtractArrayItemType<Date[]>;     // Date
```

`(infer U)[]` 可被分配为 `Date[]`，U 所在的位置是 Date，返回 Date

> 根据优先级，此处 infer U 需加上 ()

ExtractReturnType：推断函数返回值

```js
type ExtractReturnType<T> = T extends () => (infer U) ? U : T;

// 条件判断为 true，返回 U
type T1 = ExtractReturnType<() => number>;   // number。
```

ExtractAllType：推断出联合类型

```js
type ExtractAllType<T> = T extends { x: infer U, y: infer U } ? U : T;

type T1 = ExtractAllType<{ x: string, y: number }>; // string | number

// 任意类型 推断
type ExtractAllType<T> = T extends { [k: string]: infer U } ? U : T;

type T1 = ExtractAllType<{ x: string, y: number, z: boolean }>; // string | number | boolean
```

ExtractArrayItemType：元组类型转为联合类型

```js
type ExtractArrayItemType<T> = T extends (infer U)[] ? U : T;

type ItemTypes = ExtractArrayItemType<[string, number]>; // string | number
```

#### extends

extends 添加泛型约束

```js
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

泛型函数被定义了约束。此时传入的值，必须要包含 length 属性

```js
loggingIdentity(3) // Error, number doesn't have a .length property
loggingIdentity({ length: 10, value: 3 }) // ok
```

场景：获取 T 对应 key 的类型

```tsx
type MessageOf<T> = T['message']
// Type '"message"' cannot be used to index type 'T'.
```

T 没有 message 属性，需要通过 extends 进行约束

```tsx
type MessageOf<T extends { message: unknown }> = T['message']
```

设置一个默认类型 never

```tsx
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never

interface Email {
  message: string
}

interface Dog {
  bark(): void
}

type EmailMessageContents = MessageOf<Email> // string

type DogMessageContents = MessageOf<Dog> // never
```

场景：如果是数组，获取值类型，反之原样返回

```tsx
type Flatten<T> = T extends any[] ? T[number] : T // T[number]获取数组值

// Extracts out the element type.
type Str = Flatten<string[]> // string

// Leaves the type alone.
type Num = Flatten<number> // number
```

==@DIF - T[number] ？ T[string]==

## 索引类型

```tsx
let person = {
  name: 'musion',
  age: 35
}

function getValues(person: any, keys: string[]) {
  return keys.map((key) => person[key])
}

console.log(getValues(person, ['name', 'age'])) // ['musion', 35]
console.log(getValues(person, ['gender'])) // [undefined]
```

问题：访问 gender 时，gender 不存在时未报错

解决：索引类型查询，索引访问 操作符。

```tsx
function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
  return keys.map((key) => person[key])
}

interface Person {
  name: string
  age: number
}

const person: Person = {
  name: 'musion',
  age: 35
}

getValues(person, ['name']) // ['musion']
getValues(person, ['gender']) // 报错：
// Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
// Type "gender" is not assignable to type "name" | "age".
```

K[]：用于约束 传入键名

T\[K][]：取 属性 为 K 的数组

## 映射类型

映射类型：根据旧的类型，创建新的类型

```tsx
interface TestInterface {
  name: string
  age: number
}
```

接口属性全部变为 可选

```tsx
// 我们可以通过+/-来指定添加还是删除

type OptionalTestInterface<T> = {
  [p in keyof T]+?: T[p]
}

type newTestInterface = OptionalTestInterface<TestInterface>

// type newTestInterface = {
//    name?: string,
//    age?: number
// }
```

添加只读

```tsx
type OptionalTestInterface<T> = {
  +readonly [p in keyof T]+?: T[p]
}

type newTestInterface = OptionalTestInterface<TestInterface>
// type newTestInterface = {
//   readonly name?: string,
//   readonly age?: number
// }
```

## 内置工具类型

### Partial

`Partial<T>` 将类型的属性变成可选，**只处理第一层数据**

```js
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

```js
interface UserInfo {
  id: string;
  name: string;
}
type NewUserInfo = Partial<UserInfo>
/*
interface NewUserInfo {
    id?: string;
    name?: string;
}
*/
```

### DeepPartial

`DeepPartial<T>` 将类型的属性变成可选，**会递归处理**

```js
type DeepPartial<T> = {
     // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
      ? DeepPartial<T[U]>
      : T[U]
};
```

### Required

Required：类型属性变成必选

```js
type Required<T> = {
    [P in keyof T]-?: T[P]
};
```

`-?`：代表移除 ？（可选）

### Readonly

Readonly：属性添加只读，**引用类型仍然可以改**

```js
type Readonly<T> = {
 readonly [P in keyof T]: T[P];
};
```

### Pick

Pick：从某个类型中挑出一些属性出来

```js
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

/*
interface TodoPreview {
  title: string;
  completed: boolean;
}
*/
```

### Record

`Record<K extends keyof any, T>` ：将 `K` 中所有的属性的值转化为 `T` 类型。

K extends keyof any：表示 K 为索引类型

> keyof any ：string | number | symbol

```js
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

```js
interface PageInfo {
  title: string;
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' }
}
/*
interface Page {
   home: PageInfo;
   about: PageInfo;
   contact: PageInfo;
}
*/
```

### ReturnType

ReturnType：获取函数返回值类型

```js
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```

infer R：推断返回值类型。T 是函数，返回函数返回值类型，否则返回 any

### Exclude

`Exclude<T, U>` ：将 T 类型中属于 U 类型的移除掉

```js
type Exclude<T, U> = T extends U ? never : T;
```

```js
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
type T2 = Exclude<string | number | (() => void), Function> // string | number
```

### Extract

`Extract<T, U>`：将 T 类型 从 U 类型中取出

```js
type Extract<T, U> = T extends U ? T : never;
```

```js
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // "a"
type T1 = Extract<string | number | (() => void), Function> // () =>void
```

### Omit

`Omit<T, K extends keyof any>` ：使用 `T` 类型中除了 `K` 类型的所有属性，来构造一个新的类型。

```js
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, 'description'>

interface TodoPreview {
  title: string;
  completed: boolean;
}
```

### NonNullable

`NonNullable<T>` ：用来过滤类型中的 `null` 及 `undefined` 类型。

```js
type NonNullable<T> = T extends null | undefined ? never : T;
```

```js
type T0 = NonNullable<string | number | undefined> // string | number
type T1 = NonNullable<string[] | null | undefined> // string[]
```

### Parameters

`Parameters<T>` ：获得函数的参数类型组成的元组类型。

```js
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
? P : never;
```

```js
type A = Parameters<() => void> // []
type B = Parameters<typeof Array.isArray> // [any]
type C = Parameters<typeof parseInt> // [string, (number | undefined)?]
type D = Parameters<typeof Math.max> // number[]
```

## tsconfig.json

### 简介

tsconfig.json 是 TypeScript 项目的配置文件。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。

### 重要字段

- files - 要编译的文件的名称；
- include - 需要进行编译的文件，支持路径模式匹配；
- exclude - 无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 编译流程相关的选项

> https://www.typescriptlang.org/tsconfig#compilerOptions

## 风格指南

### 减少重复代码

```js
interface Person {
  firstName: string;
  lastName: string;
}

interface PersonWithBirthDate {
  firstName: string;
  lastName: string;
  birth: Date;
}
```

方案

1. extends
2. 交叉运算符 &

```js
interface Person {
  firstName: string;
  lastName: string;
}

interface PersonWithBirthDate extends Person {
  birth: Date;
}

type PersonWithBirthDate = Person & { birth: Date }
```

### 定义类型匹配初始化对象

```js
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: '#00FF00',
  label: 'VGA'
}

interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

// opt
type Options = typeof INIT_OPTIONS
```

### 更精确的类型

```js
interface Album {
  artist: string; // 艺术家
  title: string; // 专辑标题
  releaseDate: string; // 发行日期：YYYY-MM-DD
  recordingType: string; // 录制类型："live" 或 "studio"
}

 recordingType: string;  =>  recordingType: "live" | "studio";
```

### 类型总是有效状态

```js
interface State {
  pageContent: string;
  isLoading: boolean;
  errorMsg?: string;
}
```

```js
function renderPage(state: State) {
  if (state.errorMsg) {
    return `呜呜呜，加载页面出现异常了...${state.errorMsg}`
  } else if (state.isLoading) {
    return `页面加载中~~~`
  }
  return `<div>${state.pageContent}</div>`
}

// 输出结果：页面加载中~~~
console.log(renderPage({ isLoading: true, pageContent: '' }))
// 输出结果：<div>大家好</div>
console.log(renderPage({ isLoading: false, pageContent: '大家好呀' }))
```

```js
async function changePage(state: State, newPage: string) {
  state.isLoading = true
  try {
    const response = await fetch(getUrlForPage(newPage))
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`)
    }
    const text = await response.text()
    state.isLoading = false
    state.pageContent = text
  } catch (e) {
    state.errorMsg = '' + e
  }
}
```

存在问题

- 在 catch 语句中，未把 loading 设为 false
- 未清理 errorMsg

原因：允许同时设置 errorMsg 和 loading

```js
interface RequestPending {
  state: 'pending';
}

interface RequestError {
  state: 'error';
  errorMsg: string;
}

interface RequestSuccess {
  state: 'ok';
  pageContent: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess
```

```js
function renderPage(state: State) {
  const { currentPage } = state
  const requestState = state.requests[currentPage]
  switch (requestState.state) {
    case 'pending':
      return `页面加载中~~~`
    case 'error':
      return `呜呜呜，加载第${currentPage}页出现异常了...${requestState.errorMsg}`
    case 'ok':
      ;`<div>第${currentPage}页的内容：${requestState.pageContent}</div>`
  }
}
```

```js
async function changePage(state: State, newPage: string) {
  state.requests[newPage] = { state: 'pending' }
  state.currentPage = newPage
  try {
    const response = await fetch(getUrlForPage(newPage))
    if (!response.ok) {
      throw new Error(`无法正常加载页面 ${newPage}: ${response.statusText}`)
    }
    const pageContent = await response.text()
    state.requests[newPage] = { state: 'ok', pageContent }
  } catch (e) {
    state.requests[newPage] = { state: 'error', errorMsg: '' + e }
  }
}
```

# 相关链接

## 官方

条件类型：https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

## 其他

ts 通讲：https://juejin.cn/post/7018805943710253086

泛型讲解：https://juliangaramendy.dev/blog/when-ts-generics

infer 易懂：https://juejin.cn/post/6844904067420913678

extends 易懂：https://juejin.cn/post/6844904066485583885
