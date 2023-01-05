# 知识库

## 踩坑

```shell
Uncaught (in promise) DOMException: Failed to execute 'setAttribute' on 'Element': 'number,' is not a valid attribute name.
```

原因：{size: number, label: string}

解决：用代码块包裹，`{size: number, label: string}`

## 其他

将 ## => # ，二级标题转一级标题

```
^##([^#])
#$1
```
