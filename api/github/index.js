const MATCHER = /^\/([^\/]+)\/([^\/@]+)(@)?(.*)/

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').OutgoingMessage} res
 */
module.exports = (req, res) => {
  if (!MATCHER.test(req.url)) {
    return invalidRequest(res)
  }

  const [, owner, repo, versionSpecified, rest] = MATCHER.exec(req.url)

  if (!owner || !repo) {
    return invalidRequest(res)
  }

  // TODO: should we use `cdn.jsdelivr.net/gh` instead?
  res.statusCode = 301
  res.setHeader('Location', `https://raw.githubusercontent.com/${owner}/${repo}/${versionSpecified ? '' : 'master'}${rest || '/main.ts'}`)
  res.end()
}

function invalidRequest(res) {
  res.statusCode = 500
  res.end(`Invalid url`)
}
