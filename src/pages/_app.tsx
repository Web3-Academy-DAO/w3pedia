import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { defaultStore, storeWrapper } from "../components/services/Store";
import NetworkClient from "../components/services/NetworkClient";
import { PageWithLayoutType } from "../components/layouts";

NetworkClient.setup(defaultStore);

type AppLayoutPros = AppProps & {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutPros) {
  const Layout =
    Component.layout || ((children: JSX.Element) => <>{children}</>);

  return (
    <Provider store={defaultStore}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default storeWrapper.withRedux(MyApp);
