# 视频播放器

这是一个简单的网页视频播放器，可以播放文件夹中的视频文件，并支持VAST广告协议。

## 功能特点

- 播放本地视频文件
- 视频列表展示
- 响应式设计，支持移动端
- 键盘快捷键支持（空格键播放/暂停，左右箭头快进/快退）
- VAST广告支持（支持VAST 2.0、3.0和4.0）

## 使用方法

1. 将视频文件放在 `videos` 文件夹中
2. 修改 `script.js` 中的 [videoFiles](file:///d:/ruanjian/github/wen/script.js#L2-L7) 数组，添加你的视频文件路径
3. 在浏览器中打开 `index.html` 即可使用

## 支持的视频格式

- MP4
- WebM
- Ogg

## VAST广告支持

本播放器支持VAST（Video Ad Serving Template）广告协议，可以加载和播放符合VAST标准的视频广告。

### 使用方法

1. 在"VAST 广告设置"输入框中输入VAST广告的URL
2. 点击"加载广告"按钮
3. 广告将自动播放，播放完成后继续播放原视频

### 支持的VAST版本

- VAST 2.0
- VAST 3.0
- VAST 4.0

### 支持的广告类型

- 线性广告（Linear Ads）- 在视频内容之前、之中或之后播放

## 自定义

你可以根据需要修改以下文件：

- `index.html` - 页面结构
- `style.css` - 样式和布局
- `script.js` - 播放器功能和视频列表

## 注意事项

1. 由于浏览器安全限制，直接打开HTML文件可能无法加载本地视频文件
2. 建议使用本地服务器运行此应用，例如：
   - 使用 VS Code 的 Live Server 插件
   - 使用 Python: `python -m http.server 8000`
   - 使用 Node.js 的 `http-server` 包

## 快捷键

- **空格键**: 播放/暂停
- **左箭头键**: 后退5秒
- **右箭头键**: 前进5秒