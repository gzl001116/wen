# 视频播放器

这是一个简单的网页视频播放器，可以播放文件夹中的视频文件。

## 功能特点

- 播放本地视频文件
- 视频列表展示
- 响应式设计，支持移动端
- 键盘快捷键支持（空格键播放/暂停，左右箭头快进/快退）
- VAST广告支持（支持VAST 2.0、3.0和4.0，广告URL写死在代码中）
- 支持通过URL添加在线视频

## 使用方法

1. 将视频文件放在 `videos` 文件夹中
2. 修改 `script.js` 中的 [videoFiles](file:///d:/ruanjian/github/wen/script.js#L2-L8) 数组，添加你的视频文件路径
3. （可选）在 `script.js` 中设置 [VAST_AD_URL](file:///d:/ruanjian/github/wen/script.js#L11-L11) 变量以启用VAST广告
4. 在浏览器中打开 `index.html` 即可使用

## 重要说明：在线视频播放

由于浏览器安全策略限制，直接打开HTML文件可能无法播放在线视频。如果您需要播放在线视频（如示例中的Sintel或Big Buck Bunny），请使用本地服务器运行此应用：

- 使用 VS Code 的 Live Server 插件
- 使用 Python: `python -m http.server 8000`
- 使用 Node.js 的 `http-server` 包

## 支持的视频格式

- MP4
- WebM
- Ogg

## VAST广告支持

本播放器支持VAST（Video Ad Serving Template）广告协议，可以加载和播放符合VAST标准的视频广告。

### 使用方法

VAST广告URL已写死在代码中，无需在UI上设置：
1. 修改 `script.js` 中的 [VAST_AD_URL](file:///d:/ruanjian/github/wen/script.js#L11-L11) 变量，设置为有效的VAST广告URL
2. 当播放视频时，会自动先播放广告，然后播放原视频
3. 如果VAST URL为空或解析失败，则直接播放原视频

### 支持的VAST版本

- VAST 2.0
- VAST 3.0
- VAST 4.0

### 支持的广告类型

- 线性广告（Linear Ads）- 在视频内容之前播放的广告

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