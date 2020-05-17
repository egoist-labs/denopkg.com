import { NextApiHandler, NextApiResponse } from 'next'

const MATCHER = /^([^\/]+)\/([^\/@]+)(@)?(.*)/

const invalidURL = (res: NextApiResponse) => {
  res.status(500)
  res.end(`Invalid URL`)
}

const handler: NextApiHandler = async (req, res) => {
  const slug = Array.isArray(req.query.slug) ? req.query.slug : [req.query.slug]

  console.log('slug', slug)

  const m = MATCHER.exec(slug.join('/'))

  if (!m) {
    return invalidURL(res)
  }
  const [, owner, repo, versionSpecified, rest] = m
  if (!owner || !repo) {
    return invalidURL(res)
  }
  res.status(301)
  res.setHeader(
    'Location',
    `https://raw.githubusercontent.com/${owner}/${repo}/${
      versionSpecified ? '' : 'master'
    }${rest || '/mod.ts'}`
  )
  res.end()
}

export default handler
