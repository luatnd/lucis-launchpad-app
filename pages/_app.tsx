import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "../styles/globals.css";
// @ts-ignore
import smoothscroll from 'smoothscroll-polyfill';

import type { AppProps } from "next/app";
import Layout from "components/layout";


const isClient = typeof window !== 'undefined';

if (isClient) {
  // kick off the polyfill!
  smoothscroll.polyfill();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
