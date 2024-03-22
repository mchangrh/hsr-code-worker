Serverless app that parses new Honkai Star Rail codes from the [Honkai Star Rail](https://honkai-star-rail.fandom.com/wiki/Redemption_Code).

Codes licenced under CC-BY-SA 3.0 as per the wiki.

Regardless of path, it wil return a JSON payload similar to the following:

```json
[
  {
    "code": "0206STARRAIL",
    "server": "A",
    "description": "Startaro Bubble*2;Credit*5000",
    "discovery": "2024-02-05",
    "link": "https://hsr.hoyoverse.com/gift?code=0206STARRAIL"
  }
]
```

It can be called at `https://hsr-code.mchang.workers.dev/` with path `/code.json`, `/code` or whatever other format necessary. Currently this only parses NA/ Global and All but CN server codes

Codes are not updated manually, but parsed from the wiki. If you would like another format, feel free to fork the code under the MIT Licence.