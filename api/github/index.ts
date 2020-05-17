import { NowRequest, NowResponse } from '@vercel/node'

const MATCHER = /^\/([^\/]+)\/([^\/@]+)(@)?(.*)/

export default async (req: NowRequest, res: NowResponse) => {
  if (!MATCHER.test(req.url!)) {
    return invalidRequest(res)
  }

  const [, owner, repo, versionSpecified, rest] = MATCHER.exec(req.url!)!

  if (!owner || !repo) {
    return invalidRequest(res)
  }

  // TODO: should we use `cdn.jsdelivr.net/gh` instead?
  const baseUrl = 'https://raw.githubusercontent.com'
  const Location = `${baseUrl}/${owner}/${repo}/${versionSpecified ? '' : 'master'}${rest || '/mod.ts'}`
  res.writeHead(301, { Location }).end()
}

function invalidRequest(res: NowResponse) {
  res.status(500).end('invalid url')
}
