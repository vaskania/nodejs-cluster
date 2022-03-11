const cluster = require("cluster");
const os = require("os");
const pid = process.pid;

if (cluster.isMaster) {
  const cpusCount = os.cpus().length;
  console.log(`CPU ${cpusCount}`);
  console.log(`Master ${pid}`);
  for (let i = 0; i < cpusCount - 1; i++) {
    const worker = cluster.fork();
    worker.on("exit", () => {
      console.log(`worker died ${worker.process.pid}`);
      cluster.fork();
      worker.send("Hello from worker");
      worker.on("message", (msg) => {
        console.log(`message from`);
      });
    });
  }
}

if (cluster.isWorker) {
  require("./server");
  process.on("message", (msg) => {
    console.log(`message from master: ${msg}`);
  });
  process.send({ text: "hello", pid });
}
