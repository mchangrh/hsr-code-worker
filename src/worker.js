const codeURL = "https://honkai-star-rail.fandom.com/wiki/Redemption_Code?action=raw"

const getCodes = async () => {
  const body = await fetch(codeURL, {
    cf: {
      cacheTtl: 86400,
      cacheEverything: true
    }
  }).then(response => response.text())
  const comboRegex = new RegExp(/{{Redemption Code Row\|(.+?)\|(?:ref=.+\|)?(A|G|NA)\|{{Item List\|(.*)\|.+?\|([\d-]+)\|([\d-]+|unknown)}}/, "g")
  // match all codes
  let codeArray = []
  for (const match of body.matchAll(comboRegex)) {
    codeArray.push({
      code: match[1],
      server: match[2],
      description: match[3],
      discovery: match[4],
      expiry: match[5],
      link: `https://hsr.hoyoverse.com/gift?code=${match[1]}`
    })
    // remove codes that have expired and remove unknown expiry dates
    codeArray = codeArray
      .map(code => {
        if (code.expiry === "unknown") delete code.expiry
        return code
      })
      .filter(code => (!code.expiry) || (new Date(code.expiry) > new Date()))
  }
  return JSON.stringify(codeArray, null, 2)
}

export default {
  async fetch(request, env, ctx) {
    const codes = await getCodes()
    return new Response(codes, {
      headers: { 'content-type': 'application/json' }
    });
  },
};