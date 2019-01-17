import React from 'react'
import App, { Container } from 'next/app'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <style jsx global>{`
        body {
          color: #111;
          background: #f0f0f0;
          margin: 80px 0;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        `}</style>
        <Component {...pageProps} />
      </Container>
    )
  }
}
