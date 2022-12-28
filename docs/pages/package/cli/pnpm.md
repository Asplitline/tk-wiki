---
title: pnpm
order: 4
---

# pnpm

## pnpm patch

1. 生成临时包

```bash
$ pnpm patch vue
You can now edit the following folder: C:\Users\Ambit\AppData\Local\Temp\0c9a6d6f4d949994fcbba0b6adc4087b
```

2. 在生成的目录下进行代码修改

3. 修改完成后，提交修改。提交后会生成 diff 文件，存放在 patches 文件夹下。 

```bash
pnpm patch-commit -m C:\\Users\\Ambit\\AppData\\Local\\Temp\\0c9a6d6f4d949994fcbba0b6adc4087b
```

> 注意：window 路径无法识别 `\` ，使用 `\\` 或者 `/`
