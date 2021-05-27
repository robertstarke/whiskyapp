import { ApolloProvider } from "@apollo/react-hooks";
import client from "utils/apollo-client";
import "~/assets/styles/index.css";
import Header from "~/components/layout/Header";

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen p-20 pt-10 antialiased">
        <section className="container h-full mx-auto flex flex-col rounded-sm shadow">
          <Header />
          <article className="flex-1 bg-gray-100 p-3">
            <Component {...pageProps} />
          </article>
          <footer className="flex-none rounded-b-sm border-t border-gray-300 py-2 bg-white text-center">
            <span className="text-sm text-gray-600">by Robert Starke</span>
          </footer>
        </section>
      </div>
      <style jsx global>{`
        body {
          background-image: url("/img/background.jpg");
        }
      `}</style>
    </ApolloProvider>
  );
}

export default MyApp;
