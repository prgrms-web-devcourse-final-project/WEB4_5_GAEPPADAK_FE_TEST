import { createServer } from "https";
import { parse } from "url";
import next from "next";
import * as fs from "fs";

const dev = process.env.NODE_ENV !== "production";
const hostname = "web.api.deploy.kkokkio.site";
const port = 3000;

// Next.js 앱 초기화
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./certificates/key.pem"),
  cert: fs.readFileSync("./certificates/cert.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
