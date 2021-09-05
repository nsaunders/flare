import Document, { Html, Head, Main, NextScript } from "next/document";

export default class FlareDocument extends Document {
  render(): JSX.Element {
    const mode: "dark" | "light" =
      this.props?.__NEXT_DATA__?.props?.pageProps?.mode || "dark";
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
