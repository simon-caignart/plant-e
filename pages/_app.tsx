import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import PushNotificationLayout from "../components/PushNotificationLayout";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <PushNotificationLayout>
        <Component {...pageProps} />
      </PushNotificationLayout>
    </SessionProvider>
  );
};

export default App;
