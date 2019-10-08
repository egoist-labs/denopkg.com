const fetch = require('node-fetch')
const marked = require('marked')

let text

module.exports = async (req, res) => {
  text =
    text ||
    (await fetch(
      `http://denopkg.com/denopkg/denopkg.com/README.md`
    ).then(res => res.text()))
  res.setHeader('content-type', 'text/html')
  res.end(`
  <head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DenoPkg</title>
    <link rel="stylesheet" href="https://unpkg.com/hack@0.8.1/dist/hack.css">
    <style>
      .main {
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
      }
    </style>
  </head>

  <body class="hack">
    <div class="main">
    ${marked(text)}
    <hr>
    This project is open-sourced on <a href="https://github.com/denopkg/denopkg.com">GitHub</a> and hosted by <a href="https://zeit.co">Now</a>.
    </div>
  </body>
  `)
}
