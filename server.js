const http = require("http");
const pid = process.pid;

http
  .createServer((req, res) => {
    for (let i = 0; i < 100; i++) {}
    res.end("hi");
  })
  .listen(8810, () => {
    console.log(`server started ${pid}`);
  });
