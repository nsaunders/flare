import Document, { Html, Head, Main, NextScript } from "next/document";
import cx from "clsx";

export default class FlareDocument extends Document {
  render() {
    const mode: "dark" | "light" = this.props?.__NEXT_DATA__?.props?.pageProps?.mode || "dark";
    return (
      <Html>
        <Head />
        <body className={mode}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
