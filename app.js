const { createServer } = require('http');
const fs = require('fs');

// bytes=n-m => [n,m]
function getRange(range, stats) {
  const r = range.match(/=(\d+)-(\d+)?/);
  const start = r[1];
  const end = r[2] || stats.size - 1;
  return [parseInt(start), parseInt(end)];
}

createServer((req, res) => {
  const { headers } = req;

  let { range } = headers; // 获取请求头 range, bytes=n-m，获取n到m个字节的数据

  if (typeof range === 'undefined') {
    range = 'bytes=0-1'; // 未发送请求头，设置一个默认值
  }

  if (req.url.includes('/test.mp4')) {
    fs.stat('./test.mp4', (err, stats) => {
      const [start, end] = getRange(range, stats); // 获取当前片段的范围

      res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`); //  响应头 - Content-Range: bytes 0-1/6990051
      res.setHeader('Content-Type', 'video/mp4'); // 响应头 - 文件类型
      res.setHeader('Content-Length', end == start ? 0 : end - start + 1); // 响应头 - 返回的字节长度
      res.writeHead(206); // 206 - Partial Content 部分内容
      fs.createReadStream('./test.mp4', { start, end }).pipe(res); // 写入body
    });
  } else {
    res.end();
  }
}).listen(3000, () => {
  console.log(`server listen on localhost:3000`);
});
