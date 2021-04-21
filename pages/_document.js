import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);

      const userAgent = ctx.req
        ? ctx.req.headers["user-agent"]
        : navigator.userAgent;

      return {
        ...initialProps,
        userAgent,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta property="og:type" content="website" />
          <meta name="subject" content="인스타 부동산" />
          <meta name="title" content="인스타 부동산" />
          <meta name="author" content="인스타 부동산" />
          <meta
            name="keywords"
            content="홍대부동산 홍대사무실 홍대상가 홍대역사무실 홍대역상가 합정역사무실 합정역상가 상수역사무실 상수역상가 연남동상가 연남동사무실 홍대사무실임대 홍대상가임대 망리단길상가 연트롤파크상가 망원동상가 망원동사무실 당인동상가 상수동이리카페상가"
          />
          <meta
            name="description"
            content="홍대 상가, 사무실 Pick 할때 인스타 WWW.realinstar.com
          매물검색 최상급 오피스!! 태마별 상가!! 중개사 1:1상담 인스타에서 찾다.
          글로벌 네트워킹, 프리미엄서비스, 면적 및 조건별 Search!!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="인스타 부동산" />
          <meta property="og:site_name" content="인스타 부동산" />
          <meta property="og:url" content="https://realinstar.com" />
          <meta
            property="og:description"
            content="홍대 상가, 사무실 Pick 할때 인스타 WWW.realinstar.com
          매물검색 최상급 오피스!! 태마별 상가!! 중개사 1:1상담 인스타에서 찾다.
          글로벌 네트워킹, 프리미엄서비스, 면적 및 조건별 Search!!"
          />
          <meta
            property="og:keywords"
            content="홍대부동산 홍대사무실 홍대상가 홍대역사무실 홍대역상가 합정역사무실 합정역상가 상수역사무실 상수역상가 연남동상가 연남동사무실 홍대사무실임대 홍대상가임대 망리단길상가 연트롤파크상가 망원동상가 망원동사무실 당인동상가 상수동이리카페상가"
          />
          <meta property="og:image" content="/public/og_img.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />

          <link
            rel="icon"
            type="image/x-icon"
            href="/public/favicon.ico"
          ></link>

          {this.props.userAgent.match(`iphone`) ? (
            <link rel="apple-touch-icon" href="/public/app-icon-114x114.png" />
          ) : this.props.userAgent.match(`ipad`) ? (
            <link
              rel="apple-touch-icon"
              sizes="72*72"
              href="/public/app-icon-72x72.png"
            />
          ) : this.props.userAgent.match(`ipod`) ? (
            <link rel="apple-touch-icon" href="/public/app-icon-114x114.png" />
          ) : this.props.userAgent.match(`android`) ? (
            <link rel="shortcut icon" href="/public/favicon.ico" />
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
