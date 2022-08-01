// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts"

interface State {
  data: string
}

const MATCHER = /^\/([^\/]+)\/([^\/@]+)(?:@([^\/]+))?(.*)/

const redirect = (base: URL, pathname: string) => {
  const newUrl = new URL(pathname, base)
  return new Response(null, {
    headers: {
      location: newUrl.href,
    },
    status: 302,
  })
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const parsedUrl = new URL(req.url)
  const slug = parsedUrl.pathname
  const dts = parsedUrl.searchParams.get("dts")

  // skip fresh internal path
  if (slug.startsWith("/_frsh/")) {
    return ctx.next()
  }

  const m = MATCHER.exec(slug)

  if (!m) {
    return ctx.next()
  }

  const [, owner, repo, version, rest] = m
  if (!owner || !repo) {
    return ctx.next()
  }

  if (!version) {
    return redirect(parsedUrl, `/${owner}/${repo}@master${rest}`)
  }

  if (version === "latest") {
    const { tag, error } = await getLatestTag(owner, repo)
    if (error) {
      return new Response(error, {
        status: 500,
      })
    }
    return redirect(parsedUrl, `/${owner}/${repo}@${tag}${rest}`)
  }

  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${version}${
    rest || "/mod.ts"
  }`

  console.log(`fetching`, url)
  const res = await fetch(url)

  if (!res.ok) {
    return new Response(res.statusText, {
      status: res.status,
    })
  }

  const headers: Record<string, string> = {
    "content-type": res.headers.get("content-type") || "text/plain",
  }

  if (typeof dts === "string") {
    headers["x-typescript-types"] = new URL(res.url).pathname.replace(
      /\.(cjs|mjs|js)$/,
      ".d.ts"
    )
  }

  const response = new Response(new Uint8Array(await res.arrayBuffer()), {
    headers,
  })

  return response
}

async function getLatestTag(owner: string, name: string) {
  const res = await fetch(`https://api.github.com/graphql`, {
    headers: {
      authorization: `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
    },
    method: "POST",
    body: JSON.stringify({
      query: `query($name: String!,$owner: String!) { 
          repository(name:$name,owner:$owner) {
            latestRelease {
              tag {
                name
              }
            }
          }
        }`,
      variables: {
        name,
        owner,
      },
    }),
  })

  const { data, errors } = await res.json()

  return {
    tag: data && data.repository.latestRelease.tag.name,
    error: errors && errors[0].message,
  }
}
