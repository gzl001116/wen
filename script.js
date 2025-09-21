// 视频文件列表（实际项目中应该从服务器获取）
const videoFiles = [
    { name: "示例视频 1", url: "videos/sample1.mp4" },
    { name: "示例视频 2", url: "videos/sample2.mp4" },
    { name: "示例视频 3", url: "videos/sample3.mp4" },
    { name: "示例视频 4", url: "videos/sample4.mp4" }
];

// DOM元素
const videoPlayer = document.getElementById('videoPlayer');
const videoList = document.getElementById('videoList');
const vastUrlInput = document.getElementById('vastUrl');
const loadVastButton = document.getElementById('loadVast');

// VAST Client
const VASTClient = window.VAST.VASTClient;
const VASTParser = window.VAST.VASTParser;
const VASTTracker = window.VAST.VASTTracker;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadVideoList();
    // 如果有视频文件，自动加载第一个
    if (videoFiles.length > 0) {
        playVideo(videoFiles[0].url);
        setActiveVideo(0);
    }
    
    // 添加VAST广告加载事件
    loadVastButton.addEventListener('click', loadVastAd);
});

// 加载视频列表
function loadVideoList() {
    videoList.innerHTML = '';
    
    videoFiles.forEach((video, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = video.name;
        listItem.addEventListener('click', () => {
            playVideo(video.url);
            setActiveVideo(index);
        });
        videoList.appendChild(listItem);
    });
}

// 播放视频
function playVideo(url) {
    videoPlayer.src = url;
    videoPlayer.load();
    videoPlayer.play()
        .then(() => {
            console.log('视频开始播放');
        })
        .catch(error => {
            console.error('视频播放出错:', error);
            alert('无法播放视频，请检查文件路径或格式');
        });
}

// 设置当前活动视频的样式
function setActiveVideo(index) {
    const items = videoList.querySelectorAll('li');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 加载并播放VAST广告
function loadVastAd() {
    const vastUrl = vastUrlInput.value.trim();
    
    if (!vastUrl) {
        alert('请输入有效的VAST URL');
        return;
    }
    
    // 创建VAST客户端
    const client = new VASTClient();
    
    // 获取并解析VAST广告
    client.get(vastUrl)
        .then(res => {
            // 检查是否有广告
            if (res.ads.length === 0) {
                alert('未找到广告');
                return;
            }
            
            // 获取第一个广告
            const ad = res.ads[0];
            
            // 检查是否有线性广告
            if (!ad || !ad.creatives || ad.creatives.length === 0) {
                alert('广告格式不正确');
                return;
            }
            
            // 查找线性创意
            const linearCreative = ad.creatives.find(creative => creative.type === 'linear');
            
            if (!linearCreative || !linearCreative.mediaFiles || linearCreative.mediaFiles.length === 0) {
                alert('未找到支持的媒体文件');
                return;
            }
            
            // 选择第一个媒体文件（通常选择MP4格式）
            const mediaFile = linearCreative.mediaFiles.find(file => 
                file.mimeType === 'video/mp4') || linearCreative.mediaFiles[0];
            
            if (!mediaFile || !mediaFile.fileURL) {
                alert('媒体文件URL无效');
                return;
            }
            
            // 播放广告
            playAd(mediaFile.fileURL, ad, linearCreative);
        })
        .catch(err => {
            console.error('VAST解析错误:', err);
            alert('VAST广告加载失败: ' + err.message);
        });
}

// 播放广告
function playAd(adUrl, ad, creative) {
    // 暂停当前视频
    videoPlayer.pause();
    
    // 设置广告URL
    videoPlayer.src = adUrl;
    videoPlayer.load();
    
    // 创建追踪器
    const tracker = new VASTTracker(null, ad, creative);
    
    // 发送开始播放事件
    tracker.trackImpression();
    
    // 监听播放事件
    videoPlayer.onplay = () => {
        tracker.track('start');
    };
    
    // 监听播放进度事件
    videoPlayer.ontimeupdate = () => {
        const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        
        if (percent >= 25 && percent < 50) {
            tracker.track('firstQuartile');
        } else if (percent >= 50 && percent < 75) {
            tracker.track('midpoint');
        } else if (percent >= 75) {
            tracker.track('thirdQuartile');
        }
    };
    
    // 监听播放完成事件
    videoPlayer.onended = () => {
        tracker.track('complete');
        console.log('广告播放完成');
    };
    
    // 开始播放广告
    videoPlayer.play()
        .then(() => {
            console.log('广告开始播放');
        })
        .catch(error => {
            console.error('广告播放出错:', error);
            alert('广告播放失败: ' + error.message);
        });
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(event) {
    // 空格键控制播放/暂停
    if (event.code === 'Space') {
        event.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    
    // 左右箭头键控制快进快退
    if (event.code === 'ArrowRight') {
        videoPlayer.currentTime += 5;
    }
    
    if (event.code === 'ArrowLeft') {
        videoPlayer.currentTime -= 5;
    }
});