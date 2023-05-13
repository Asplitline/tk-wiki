---
title: pnpm
order: 4
---

# pnpm

## install

```
pnpm install
```

```bash
Usage: pnpm install [options]

Alias: i

Installs all dependencies of the project in the current working directory. When executed inside a workspace, installs all dependencies of all projects.

Options:
  -D, --dev                             Only `devDependencies` are installed regardless of the `NODE_ENV`
  -P, --prod                            Packages in `devDependencies` won't be installed
      --public-hoist-pattern <pattern>  Hoist all dependencies matching the pattern to the root of the modules directory
  -w, --workspace-root                  Run the command on the root workspace project
```



## patch

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
