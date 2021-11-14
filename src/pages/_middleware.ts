import { NextRequest, NextResponse } from 'next/server'

const MATCHER = /^\/([^\/]+)\/([^\/@]+)(@)?(.*)/

export default async (req: NextRequest) => {
  const slug = req.nextUrl.pathname

  const m = MATCHER.exec(slug)

  if (!m) {
    return NextResponse.next()
  }

  const [, owner, repo, versionSpecified, rest] = m
  if (!owner || !repo) {
    return NextResponse.next()
  }

  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${
    versionSpecified ? '' : 'master'
  }${rest || '/mod.ts'}`

  const res = await fetch(url)
  return res
}
