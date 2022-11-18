import "../styles/globals.css";
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
