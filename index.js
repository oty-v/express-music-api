const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const HttpsProxyAgent = require('https-proxy-agent');
const app = express();
const port = process.env.PORT || 5000;
const proxy = 'http://37.57.15.43:33761';
const agent = HttpsProxyAgent(proxy);
////////cors()

app.use(cors());

////////port open
app.listen(port, () => {
  console.log(`Server Works !!! At port ${port}`);
});

/////get request handel here get url for one video

app.get("/youtube", (req, res) => {
  const URL = req.query.URL;
  ytdl
    .getInfo(URL,[agent])
    .then((info) => {
      const format = ytdl.filterFormats(info.formats, "audioonly");

      res.json(format[1].url);
    })
    .catch((err) => console.log(err));
});
