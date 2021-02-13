const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();
const COOKIE = 'VISITOR_INFO1_LIVE=62Y7pvsj83I; YSC=7e5JYlXcwdU; LOGIN_INFO=AFmmF2swRgIhAKGmkSxXbOYMQYjPYpDJ0PGlR9PH7UzhAnu6eeRtby__AiEApq0c5ZQA5vKzk5bhtZn_mbRg7YpqpQTc3MFKXU_JkVo:QUQ3MjNmenJYeUxQZFdxeGdVaDEyVnFhM3Jra0pVVlhiVEctOWhzN3NOMFBjRWNsek9td0xZSEM3WFZnRDBiVjY2ZTVqUV9VWU01aU1YY2gzNW9rY3plYXZ5Z2JybU9QeDdmQkpBcmNWVnlwMmhBaXdGQ0g4c05iYlZPSEZiSmM5MVB3Y2xOWEZtSHNMeTRJOXFwYUJVV1VaSFp4LWhCb2Z4SkptR096N19hSTlpWUFKWU43TDB3; wide=1; CONSENT=WP.28e103.28e199.28e22c; _gcl_au=1.1.1502227773.1612378725; PREF=f6=40000000&volume=100&tz=Europe.Kiev&al=ru&f5=20000; SID=6gf7lRbWv5L5lkac3m3r6Tk93lKLa6_sdqIetTe2lJqVm7LDRO8-9E99uFG1poKDgZTLpA.; __Secure-3PSID=6gf7lRbWv5L5lkac3m3r6Tk93lKLa6_sdqIetTe2lJqVm7LDtETcIy6UD0HCt8ThvgnrnQ.; HSID=A3gk_uY5GhhsQCCpv; SSID=Adrhr0xXOlPsO5poS; APISID=S8wg1DYhTHuFAtoF/AwIK3A750GGve1Hi5; SAPISID=RdOepfud5zsB-_Zu/Ax_3fYCltTEclDFDy; __Secure-3PAPISID=RdOepfud5zsB-_Zu/Ax_3fYCltTEclDFDy; SIDCC=AJi4QfEN6V8RYlmSdHnIcbs9mEepx4TeptG5a4MvTy7ZXiHKZOnuJuBkTVndin2-in1QlDFKwJ85; __Secure-3PSIDCC=AJi4QfFn_1_fiG_Bh8Ersf9ppu0PYEW82fydz8e3cOrWn9u3GnKVlKt9LHA0NEjaKaO0wWyHgveV';
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
    .getInfo(URL, {
      requestOptions: {
        headers: {
          cookie: COOKIE,
        },
      },
    })
    .then((info) => {
      const format = ytdl.filterFormats(info.formats, "audioonly");

      res.json(format[1].url);
    })
    .catch((err) => console.log(err));
});
