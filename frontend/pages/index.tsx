import Head from "next/head";
import WhiskyCard from "~/components/WhiskyCard";
import client from "utils/apollo-client";
import { WHISKIES } from "~/utils/queries/whiskies.query";
import Link from "next/link";

export async function getStaticProps() {
  const { data } = await client.query({
    query: WHISKIES
  });

  return {
    props: {
      whiskies: data.whiskies
    }
  };
}

const Home = ({ whiskies }): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Whisky List</title>
      </Head>

      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {whiskies.map((whisky) => {
          return <WhiskyCard key={whisky.id} whisky={whisky} />;
        })}
        <Link href="/whisky/add">
          <div className="flex flex-col items-center justify-center mb-3 p-10 bg-green-500 shadow hover:shadow-md transition-shadow duration-300 rounded-sm text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 fill-current">
              <use href="/img/icons/add.svg#add"/>
            </svg>
            <span className="text-xl">Add Whisky</span>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Home;
