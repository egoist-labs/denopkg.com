export default () => (
  <header className="header">
    <div className="container">
      <h1 className="logo">
        <img src="/static/deno_logo.png" alt="deno logo" height="70" />
        <span>DenoPkg</span>
      </h1>
    </div>
    <style jsx>{`
    .logo {
        display: flex;
        align-items: center;
    }
    .logo img {
      margin-right: 10px;
    }
    `}</style>
  </header>
)
