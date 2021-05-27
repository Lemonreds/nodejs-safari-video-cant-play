# ios 中 safari 浏览器无法播放视频

## 原因

浏览器在请求视频的时候，会首先发送一个请求，包含请求头 range: bytes=0-1,获取 1 字节的视频流，期望服务端返回视频文件的总字节数，即响应头 Content-Range: bytes 0-1/6990051。

在 chrome 中，不返回也能正确播放视频，兼容效果比较好，但是在 safari 内核的浏览器中，不返回就会导致视频就会无法播放。所以需要服务端支持解析 range 请求头，并且
增加响应头 Content-Range，增加视频的总字节数。

同时返回的 body 需要是当前片段的视频，并设置返回响应码 206 - Partial Content ，返回部分内容。

## 运行

1. npm install

2. npm run start

3. safari打开localhost:3000/test.mp4

