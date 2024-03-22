Serverless app that parses new Genshin Impact codes from the [Genshin Impact Wiki](https://genshin-impact.fandom.com/wiki/Promotional_Code).

Codes licenced under CC-BY-SA 3.0 as per the wiki.

Can be used as a drop-in alternative to `genshin-redeem-code.vercel.app`. Regardless of path, it wil return 
a JSON payload similar to the following:

```json
[
  {
    "code": "8SJSDSX68UF9",
    "description": "Mora*8,888;Clearwater Jade*5;Encompassing Gladness*2;Bountiful Year*2",
    "discovery": "2024-02-09",
    "expiry": "2024-02-24",
    "link": "https://genshin.hoyoverse.com/en/gift?code=8SJSDSX68UF9"
  }
]
```

It can be called at `https://genshin-code.mchang.workers.dev/` with path `/code.json`, `/code` or whatever other format necessary. Currently this only parses NA/ Global and All but CN server codes

Codes are not updated manually, but parsed from the wiki. If you would like another format, feel free to fork the code under the MIT Licence.