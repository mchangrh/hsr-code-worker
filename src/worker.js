const codeRegex = new RegExp(/\n\t-->\|(.+)\|(?:A|G|NA)<!--/)
const detailsRegex = new RegExp(/\n\t-->\|(.+?)<!--/)
const dateRegex = new RegExp(/\n\t-->\|([\d-]+)(?:\|([\d-]+))?(?:\|indef)?<!--/)
const codeURL = "https://genshin-impact.fandom.com/wiki/Promotional_Code?action=raw"

const getCodes = async () => {
  const body = await fetch(codeURL, {
    cf: {
      cacheTtl: 86400,
      cacheEverything: true
    }
  }).then(response => response.text())
  const comboRegex = new RegExp(codeRegex.source + detailsRegex.source + dateRegex.source, "g")
  // match all codes
  const allCodes = []
  let codeArray = []
  for (const match of body.matchAll(comboRegex)) {
    const multiCodeSplit = match[1].split(";")
    multiCodeSplit.forEach((splitCode) => {
      // if there are multiple codes, reply with multiple
      allCodes.push({
        code: splitCode,
        description: match[2],
        discovery: match[3],
        expiry: match[4],
        link: `https://genshin.hoyoverse.com/en/gift?code=${splitCode}`
      })
    })
    // remove codes that have expired
    codeArray = allCodes.filter(code => (!code.expiry) || (new Date(code.expiry) > new Date()))
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