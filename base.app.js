const { createServer } = require('http');
const fs = require('fs');

createServer((req, res) => {
  if (req.url.includes('/test.mp4')) {
    fs.stat('./test.mp4', (err, stats) => {
      res.setHeader('Content-Type', 'video/mp4'); // 响应头 - 文件类型
      res.writeHead(200);
      fs.createReadStream('./test.mp4').pipe(res); // 写入body
    });
  } else {
    res.end();
  }
}).listen(8003, () => {
  console.log(`server listen on localhost:8003`);
});
