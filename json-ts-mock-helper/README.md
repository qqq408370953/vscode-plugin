# JSON TS Mock Helper

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=your-name.json-ts-mock-helper">
    <img src="https://img.shields.io/VSCode Marketplace/v/json-ts-mock-helper?color=blue&label=VSCode%20Marketplace" alt="VSCode Marketplace">
  </a>
  <a href="https://github.com/qqq408370953/vscode-plugin/releases">
    <img src="https://img.shields.io/github/downloads/qqq408370953/vscode-plugin/total" alt="GitHub Downloads">
  </a>
  <a href="https://github.com/qqq408370953/vscode-plugin/stargazers">
    <img src="https://img.shields.io/github/stars/qqq408370953/vscode-plugin" alt="GitHub Stars">
  </a>
  <a href="https://github.com/qqq408370953/vscode-plugin/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/qqq408370953/vscode-plugin" alt="License">
  </a>
</p>

> VSCode 插件：JSON 一键生成 TypeScript 接口，TypeScript 接口一键生成 Mock 数据

## 插件功能

### 1. JSON → TypeScript 接口

选中 JSON 文本，一键生成 TypeScript 类型定义。

```
输入 JSON:
{"name": "张三", "age": 25, "email": "test@example.com"}

生成 TypeScript:
interface RootObject {
  name: string;
  age: number;
  email: string;
}
```

### 2. TypeScript 接口 → Mock 数据

选中 TypeScript 接口定义，一键生成中文 Mock 数据。

```
输入接口:
interface User {
  name: string;
  age: number;
  email?: string;
}

生成 Mock:
const mockUser = {
  name: "李四",
  age: 28,
};
```

## 功能特性

- ✅ JSON 一键转换为 TypeScript 接口
- ✅ TypeScript 接口一键生成 Mock 数据
- ✅ 支持嵌套对象和数组类型
- ✅ 生成真实的中文 Mock 数据（姓名、城市、地址等）
- ✅ 支持可选字段（`?`）处理
- ✅ 快捷键支持，提升开发效率

## 快捷键

| 功能 | Mac | Windows/Linux |
|------|-----|---------------|
| JSON → TS | `Cmd + Shift + J` | `Ctrl + Shift + J` |
| TS → Mock | `Cmd + Shift + M` | `Ctrl + Shift + M` |

或者使用命令面板（`Cmd + Shift + P` / `Ctrl + Shift + P`）搜索：

- `JSON to TS: Convert JSON to TypeScript Interface`
- `JSON to TS: Generate Mock from TypeScript Interface`

## 安装

### 方式一：VSCode 插件市场

1. 打开 VSCode
2. 搜索 `JSON TS Mock Helper`
3. 点击安装

### 方式二：VSIX 文件安装

1. 下载最新的 `.vsix` 文件
2. 打开 VSCode
3. 选择 `Extensions` → `Install from VSIX`

## 本地开发

```bash
# 克隆项目
git clone https://github.com/qqq408370953/vscode-plugin.git

# 进入目录
cd json-ts-mock-helper

# 安装依赖
npm install

# 编译 TypeScript
npm run compile

# 按 F5 启动调试
```

## 项目结构

```
json-ts-mock-helper/
├── src/
│   ├── extension.ts       # 插件入口，注册命令
│   ├── jsonToTs.ts       # JSON 转 TypeScript 接口
│   ├── tsToMock.ts       # TypeScript 接口转 Mock 数据
│   └── utils.ts          # 工具函数
├── package.json          # 插件配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 项目说明
```

## 技术栈

- **TypeScript** - 开发语言
- **VSCode API** - 插件核心能力
- **quicktype-core** - JSON 转 TypeScript 核心库

## 相关链接

- [VSCode 官方文档](https://code.visualstudio.com/api)
- [quicktype-core](https://github.com/glideapps/quicktype)
- [掘金文章：VSCode 插件开发实战](https://juejin.cn/post/xxxxx)

## License

[MIT](LICENSE) © [qqq408370953](https://github.com/qqq408370953)
