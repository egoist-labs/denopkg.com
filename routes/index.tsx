/** @jsx h */
import { h, FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { tw } from "@twind"
import { Head } from "$fresh/runtime.ts"

const Span: FunctionComponent<{ bg: string; leading?: boolean }> = ({
  children,
  bg,
  leading,
}) => {
  return (
    <span
      class={tw(
        `rounded px-2 h-6 inline-flex items-center text-white text-sm`,
        bg ? ` ${bg}` : "",
        leading ? ` mr-2` : ` mx-2`
      )}
    >
      {children}
    </span>
  )
}

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script")
    script.defer = true
    script.async = true
    script.src = "https://u.egoist.dev/script.js"
    script.setAttribute("data-website-id", "cb314996-0280-4b3a-ba51-cfb0814eb4d3")
    document.body.append(script)
  }, [])
  
  return (
    <div>
      <Head>
        <title>DenoPKG</title>
      </Head>
      <header class={tw`border-b border-gray-200 py-3`}>
        <div
          class={tw`max-w-2xl px-2 mx-auto flex items-center justify-between`}
        >
          <h1 class={tw`text-2xl flex items-center font-bold`}>
            <img class={tw`w-12 h-12 -ml-2`} src="/denopkg.png" /> DenoPKG
          </h1>
          <div>
            <a
              href="https://github.com/denopkg/denopkg.com"
              target="_blank"
              rel="noopener nofollow"
            >
              <svg
                id="i-github"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="32"
                height="32"
              >
                <path
                  strokeWidth="0"
                  fill="currentColor"
                  d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>
      <div class={tw`px-2 max-w-2xl mx-auto`}>
        <div class={tw`my-5 text-xl`}>
          To use GitHub as a package registry for Deno, you only need to replace{" "}
          <code>github.com</code> with <code>denopkg.com</code> like this:
        </div>
        <div class={tw`my-5 text-gray-400`}>
          <Span leading bg="bg-green-500">
            https://denopkg.com
          </Span>
          /<Span bg="bg-black">user</Span>/
          <Span bg="bg-black">repo or repo@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div class={tw`my-5 text-xl`}>Example:</div>
        <div class={tw`my-5`}>
          <pre class={tw`bg-black rounded-lg text-gray-200 overflow-auto`}>
            <code>{`
  import { opn } from 'https://denopkg.com/hashrock/deno-opn/opn.ts'
  opn('https://denopkg.com')
  `}</code>
          </pre>
        </div>
        <div class={tw`my-5`}>
          When a git tag is not specified, it will use the <code>master</code>{" "}
          branch, to use the latest release of your repo, try{" "}
          <code>@latest</code> intead. However, it's always better to specify a
          git tag explicitly.
        </div>
        <div class={tw`my-5`}>
          <h3 class={tw`text-xl font-bold mb-3`}>Importing JavaScript</h3>
          <p class={tw`my-5`}>
            If you're importing <code>mod.js</code> and you want to use{" "}
            <code>mod.d.ts</code> as the types, you can use the{" "}
            <code>?dts</code> parameter to set the{" "}
            <a
              href="https://deno.land/manual@v1.16.1/typescript/types#using-x-typescript-types-header"
              target="_blank"
              rel="noopener noreferrer"
              class={tw`link`}
            >
              x-typescript-types
            </a>{" "}
            header.
          </p>
        </div>
        <a
          target="_blank"
          rel="noopener nofollow"
          href="https://chatwise.app?ref=denopkg"
          class={tw`border-2 border-pink-400 text-pink-500 font-bold flex items-center justify-center p-5 rounded-lg text-xl space-x-2 hover:bg-pink-50`}
        >
          <img src="https://chatwise.app/favicon.png" class={tw`w-10 h-10`} />
          <span>ChatWise: the fastest AI chatbot for any LLM</span>
        </a>
      </div>
      <footer class={tw`border-t border-gray-200 my-10 py-5 text-gray-500`}>
        <div class={tw`px-2 max-w-2xl mx-auto flex justify-between`}>
          <span>&copy; 2020-2022 Deno PKG.</span>
          <span>
            By{" "}
            <a
              class={tw`text-blue-500 hover:underline`}
              target="_blank"
              rel="noopener nofollow"
              href="https://github.com/sponsors/egoist"
            >
              @EGOIST
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
