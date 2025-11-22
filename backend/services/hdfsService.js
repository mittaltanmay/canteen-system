const WebHDFS = require("webhdfs");

const hdfs = WebHDFS.createClient({
  user: "dell",
  host: "localhost",
  port: 9870,         // Hadoop WebHDFS port
  path: "/webhdfs/v1"
});

module.exports = hdfs;
