---
title: 配置相关
order: 1
---

# 配置相关

## IOS 上下拉白屏

```json
"globalStyle": {
	 // ...
	"app-plus": {
		"bounce": "none"
	}
},
```

## 遮罩层滚动穿透

`@touchmove.native.prevent` 设置在 遮罩层上

## sdk 警告

```json
"app-plus" : {
    "compatible" : {
        ignoreVersion" : true //忽略版本检查提示框，HBuilderX1.9.0及以上版本支持
    }
}
```



## HbuilderX 无法检测模拟器

| 模拟器名称    | 端口  |
| ------------- | ----- |
| 夜神模拟器    | 62001 |
| 模拟          | 26944 |
| mumu模拟器    | 7555  |
| 天天模拟器    | 6555  |
| AndroidStudio | 5554  |

解决

1. 进入 `HBuilderX\plugins\launcher\tools\adbs` 的目录运行cmd
2. 执行 `adb connect 127.0.0.1:7555 `（ mumu模拟器 ）
3. 通过 `adb devices` 查看是否已经连接

