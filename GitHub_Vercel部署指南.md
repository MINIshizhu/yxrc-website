# GitHub + Vercel 部署完整指南

## 📋 部署前准备

已完成：
- ✅ 网站代码完成
- ✅ Vercel 账号注册
- ✅ 部署配置文件创建

---

## 🚀 第一步：上传到 GitHub

### 1.1 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `yxrc-website`
   - **Description**: `北京悦享融创科技有限公司官方网站`
   - **Public** （选择Public，Vercel免费版需要公开仓库）
   - **不要勾选** "Add a README file"（我们已经有了）
3. 点击 **Create repository**

### 1.2 上传代码到 GitHub

**方法A：使用 Git 命令行（推荐）**

在终端执行：

```bash
# 进入项目目录
cd "/Users/baiyao/Desktop/BOE/MINI SHIZHU-project/yxrc-website"

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "初始提交：悦享融创官网完整版

- 完成所有5个页面
- 更新真实公司信息
- 集成高德地图
- 优化专业图标
- 响应式设计

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 添加远程仓库（替换您的用户名）
git remote add origin https://github.com/您的用户名/yxrc-website.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

**方法B：使用 GitHub Desktop（图形界面）**

1. 下载安装 GitHub Desktop
2. 打开软件，登录GitHub账号
3. File → Add Local Repository
4. 选择项目文件夹
5. 点击 "Create a new repository for this project"
6. 填写名称：yxrc-website
7. 点击 "Publish repository"

**方法C：直接上传（最简单）**

1. 在GitHub仓库页面，点击 "uploading an existing file"
2. 拖拽所有项目文件
3. 填写提交信息
4. 点击 "Commit changes"

---

## 🔗 第二步：连接 Vercel

### 2.1 导入 GitHub 项目

1. 登录 Vercel: https://vercel.com
2. 点击 **Add New...** → **Project**
3. 在 "Import Git Repository" 部分：
   - 选择 **GitHub**
   - 找到 `yxrc-website` 仓库
   - 点击 **Import**

### 2.2 配置项目

在配置页面：

**Framework Preset:**
- 选择 **Other** （因为是纯静态网站）

**Root Directory:**
- 保持 `./` （默认）

**Build Command:**
- 留空（不需要构建）

**Output Directory:**
- 保持 `./` （默认）

**Install Command:**
- 留空（没有依赖）

### 2.3 环境变量（可选）

暂时不需要，点击 **Deploy**

### 2.4 等待部署

- Vercel会自动部署
- 通常1-2分钟完成
- 看到 🎉 庆祝画面表示成功

---

## 🌐 第三步：获取访问地址

部署成功后，Vercel会提供免费域名：

```
https://yxrc-website-您的ID.vercel.app
```

### 自定义域名（可选）

如果想使用自己的域名：

1. 在 Vercel 项目页面，点击 **Settings**
2. 点击 **Domains**
3. 输入域名：`www.yxrc-tech.com` 或 `www.bjyxrc.cn`
4. 按照提示配置DNS解析

---

## ✅ 部署完成检查清单

访问您的网站，检查：

- [ ] 首页正常显示
- [ ] 产品中心页面
- [ ] 解决方案页面
- [ ] 工程案例页面
- [ ] 联系我们页面（含地图）
- [ ] 手机端适配
- [ ] 表单提交功能
- [ ] 所有链接正常

---

## 🔄 后续更新流程

### 更新网站内容

```bash
# 1. 修改本地文件
# 2. 提交到Git
git add .
git commit -m "更新内容描述"
git push

# 3. Vercel会自动部署（约1分钟）
```

### 添加后台管理

后续添加CMS的步骤：

1. 选择CMS系统（推荐Strapi）
2. 在Vercel添加数据库（MongoDB Atlas）
3. 配置API路由
4. 更新前端调用API
5. 重新部署

---

## 🆘 常见问题

### Q1: Git push失败？

```bash
# 检查远程地址
git remote -v

# 重新设置（如果需要）
git remote set-url origin https://github.com/您的用户名/yxrc-website.git

# 再次推送
git push -u origin main
```

### Q2: Vercel部署失败？

- 检查GitHub仓库是否为Public
- 检查vercel.json文件是否存在
- 查看Vercel部署日志

### Q3: 地图无法显示？

- 高德地图API Key需要配置域名白名单
- 在高德开放平台添加 `*.vercel.app` 域名

### Q4: 如何查看部署日志？

1. 进入Vercel项目页面
2. 点击 **Deployments**
3. 点击最新部署
4. 查看 **Building** 和 **Logs**

---

## 📊 部署流程图

```
本地代码
   ↓
Git 提交
   ↓
GitHub 仓库
   ↓
Vercel 自动部署
   ↓
在线访问 ✓
```

---

## 🎯 现在开始部署！

**推荐顺序：**

1. ✅ 创建GitHub仓库
2. ✅ 上传代码
3. ✅ 连接Vercel
4. ✅ 获得在线地址
5. ✅ 测试所有功能
6. ✅ 分享给团队成员

---

## 📞 需要帮助？

如果遇到问题，我可以帮您：
- 解决Git命令错误
- 诊断Vercel部署问题
- 指导后续功能添加

**准备好开始了吗？我随时协助您！** 🚀
