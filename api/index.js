const fetch = require('node-fetch')

let text

module.exports = async (req, res) => {
  text =
    text ||
    (await fetch(
      `https://cdn.jsdelivr.net/gh/denopkg/denopkg.com/README.md`
    ).then(res => res.text()))
  res.end(text)
}
