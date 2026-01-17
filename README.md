# 天赋测评系统

儿童天赋测评问卷，用于体验课引流。

## 功能特点

- ✨ 精美的启动页面
- 📝 23道专业测评题目
- 📊 可视化能力雷达图
- 🎯 个性化天赋报告
- 💻 编程适配度分析
- 🎁 流畅的领课体验

## 快速开始

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com/new) 导入项目
3. 自动部署完成

### 其他静态服务器

构建后，将 `dist` 目录部署到任何静态服务器即可。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia
- SVG 雷达图

## 注意事项

部署前请修改 `src/views/Course.vue` 中的表单提交接口。
