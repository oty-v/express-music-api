const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const { getData, getPreview, getTracks } = require("spotify-url-info");
const app = express();
const port = process.env.PORT || 8080;
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
    .getInfo(URL)
    .then((info) => {
      const format = ytdl.filterFormats(info.formats, "audioonly");
      res.set('Access-Control-Allow-Origin', '*');
      if(format.length==0){
        res.send(false).end();
      }else{
        res.json(format[0].url).end();
      }
    })
    .catch((err) => console.log(err));
});

app.get("/spotify/track", (req, res) => {
  getPreview(req.query.URL)
    .then((info) => {
      const data = {title: info.title, artist: info.artist};
      res.set('Access-Control-Allow-Origin', '*');
      res.json(data).end();
    })
    .catch((err) => console.log(err));
});

app.get("/spotify/playlist", (req, res) => {
  getTracks(req.query.URL)
    .then((info) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(info).end();
    })
    .catch((err) => console.log(err));
});