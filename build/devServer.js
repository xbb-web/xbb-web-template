/**
 * node script 中间件
 * 将run dev 设置未子进程 同时将代理参数传递给dev
 * 示例 npm run open 192.168.1.45:8080
 */
const cprocess = require("child_process")
let target = process.argv[2]
let cmd = "npm run dev -- --env.target=" + (target || "")

let dev = cprocess.exec(
  cmd,
  {
    detached: true,
    maxBuffer:5*1024*1024 //5m
  },
  function(error, stdout, stderr) {
    if (error) console.log(error)
  }
)
dev.stdout.pipe(process.stdout)
dev.stderr.pipe(process.stderr)
