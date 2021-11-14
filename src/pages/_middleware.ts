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

  if (!versionSpecified) {
    return NextResponse.redirect(`/${owner}/${repo}@master${rest}`)
  }

  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${
    versionSpecified ? '' : 'master'
  }${rest || '/mod.ts'}`

  console.log(`fetching`, url)
  const res = await fetch(url)

  if (!res.ok) {
    return new Response(res.statusText, {
      status: res.status,
    })
  }

  const response = new Response(new Uint8Array(await res.arrayBuffer()), {
    headers: {
      'content-type': res.headers.get('content-type') || 'text/plain',
    },
  })

  return response
}
