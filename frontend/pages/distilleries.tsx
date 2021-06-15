import Link from "next/link";
import Head from "next/head";
import client from "utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { DISTILLERIES } from "~/utils/queries/distilleries.query";
import DistilleryCard from "~/components/DistilleryCard";

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: DISTILLERIES
  });

  return {
    props: {
      distilleries: data.distilleries
    },
    revalidate: 10
  };
};

const Home = ({ distilleries }): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Head>
          <title>Whisky List</title>
        </Head>

        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {distilleries.map((distillery) => {
            return <DistilleryCard key={distillery.id} distillery={distillery} />;
          })}
          <Link href="/distillery/add">
            <div className="flex flex-col items-center justify-center mb-3 p-10 bg-green-500 shadow hover:shadow-md transition-shadow duration-300 rounded-sm text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                <use href="/img/icons/add.svg#add" />
              </svg>
              <span className="text-2xl">Add Distillery</span>
            </div>
          </Link>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default Home;
