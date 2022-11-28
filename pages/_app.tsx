// Import bootstrap first to override some of it later
import "bootstrap/dist/css/bootstrap.css";
// Import custom global stylesheet to override aspects of bootstrap
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import type { AppProps } from "next/app";
import { SSRProvider } from "react-aria";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
