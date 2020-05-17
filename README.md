<!-- markdownlint-disable MD041 -->

![denopkg](./public/denopkg.png)

# [denopkg.com](https://denopkg.com)

You wanna use a third-party library which is stored on GitHub in [Deno](https://deno.land)?

Instead of writing:

```typescript
import { opn } from 'https://raw.githubusercontent.com/hashrock/deno-opn/master/opn.ts'

opn('https://example.com')
```

You can write:

```typescript
import { opn } from 'https://denopkg.com/hashrock/deno-opn/opn.ts'

opn('https://example.com')
```

Much shorter right? LOL.

Branches and tags are supported, just add `@{BRANCH_OR_TAG}` to the end of repository name, like this:

```typescript
import { opn } from 'https://denopkg.com/hashrock/deno-opn@master/opn.ts'

opn('https://example.com')
```

## Entry file

URLs omitting file path like `https://denopkg.com/hashrock/deno-opn` will be redirected to `mod.ts` on master branch.
