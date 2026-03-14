const { createServer } = require("http");
const next = require("next");

const app = next({
  dev: false,
  hostname: "0.0.0.0",
  port: 3000,
});

const handle = app.getRequestHandler();

setInterval(() => {
  const used = process.memoryUsage();

  console.log("MEMORY USAGE:");
  console.log("rss:", Math.round(used.rss / 1024 / 1024), "MB");
  console.log("heapTotal:", Math.round(used.heapTotal / 1024 / 1024), "MB");
  console.log("heapUsed:", Math.round(used.heapUsed / 1024 / 1024), "MB");
  console.log("external:", Math.round(used.external / 1024 / 1024), "MB");
}, 10000);

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(3000, "0.0.0.0", () => {
    console.log("Next server started on port 3000");
  });
});