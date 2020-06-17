import * as React from 'react'
import Head from 'next/head'

const values = {
  title: 'Deno PKG',
  description: 'An easier way to use code from GitHub in your Deno project.',
  creator: 'denopkg',

};

export default () => {
  return (
    <Head>
      <title>{values.title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="title" content={values.title} key="title" />
      <meta name="description" content={values.description} key="description" />
      <meta property="og:url" content="https://denopkg.com/" key="og-url" />
      <meta property="og:title" content={values.title} key="og-title" />
      <meta property="og:description" content={values.description} key="og-description" />
      <meta property="og:type" content="website" key="og-type" />
      <meta name="twitter:title" content={values.title} key="twitter-title" />
      <meta name="twitter:card" content="summary" key="twitter-card" />
      <meta name="twitter:creator" content={values.creator} key="twitter-creator" />
      <meta name="twitter:description" content={values.description} key="twitter-description" />
    </Head>
  );
}
