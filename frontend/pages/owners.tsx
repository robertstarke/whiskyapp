import Link from "next/link";
import Head from "next/head";
import client from "utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { OWNERS } from "~/utils/queries/owners.query";
import OwnerCard from "~/components/OwnerCard";

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: OWNERS
  });

  return {
    props: {
      owners: data.owners
    },
    revalidate: 10
  };
};

const Home = ({ owners }): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Head>
          <title>Whisky List</title>
        </Head>

        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {owners.map((owner) => {
            return <OwnerCard key={owner.id} owner={owner} />;
          })}
          <Link href="/owner/add">
            <div className="flex items-center justify-center mb-3 p-3 bg-green-500 shadow hover:shadow-md transition-shadow duration-300 rounded-sm text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                <use href="/img/icons/add.svg#add" />
              </svg>
              <span className="ml-3 text-2xl">Add Owner</span>
            </div>
          </Link>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default Home;
