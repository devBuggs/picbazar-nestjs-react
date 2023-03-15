import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
// import { Config } from '@/config';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    // const { locale } = this.props.__NEXT_DATA__;
    // const dir = Config.getDirection(locale);
    return (
      <Html>
        <Head />
        {/* <body dir={dir}> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
