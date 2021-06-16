import Link from "next/link";
import { useRouter } from "next/router";
import client from "~/utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { DELETE_DISTILLERY, DISTILLERY, DISTILLERY_IDS } from "~/utils/queries/distilleries.query";
import DeleteOverlay from "~/components/overlays/DeleteOverlay";
import WhiskyBadge from "~/components/WhiskyBadge";
import CountryFlag from "~/components/CountryFlag";
import countries from "~/utils/countries.map";

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const { data } = await client.query({
    query: DISTILLERY,
    variables: {
      id: id
    }
  });

  return {
    props: {
      distillery: data.distillery
    },
    revalidate: 10
  };
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: DISTILLERY_IDS
  });

  const paths = data.distilleries.map((distillery) => ({
    params: { id: distillery.id }
  }));

  return { paths, fallback: "blocking" };
};

const Distillery = ({ distillery }): JSX.Element => {
  const router = useRouter();

  const onDelete = async () => {
    await client.mutate({
      mutation: DELETE_DISTILLERY,
      variables: {
        id: distillery.id
      }
    });

    await router.replace("/distilleries");
  };

  return (
    <ApolloProvider client={client}>
      <div
        id={distillery.id}
        className="relative max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm"
      >
        <div className="flex items-center border-b-2 border-gray-200">
          <div className="ml-3">
            <CountryFlag countryCode={distillery.country} />
          </div>
          <div className="px-3 pt-1 pb-2 text-2xl text-green-800 font-thin tracking-wider">{distillery.name}</div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between text-green-800 text-lg">
            <span>
              {countries.find(country => (country.countryCode === distillery.country))?.name} {distillery.region && `(${distillery.region})`}
            </span>
            {distillery.owner?.name && <span>{distillery.owner.name}</span>}
          </div>
          {distillery.description && (
            <div className="mt-3">
              <h3 className="mt-4 text-lg font-thin uppercase text-green-800 text-center">Description</h3>
              <span className="text-green-800">{distillery.description}</span>
            </div>
          )}
          <h3 className="mt-4 text-lg font-thin uppercase text-green-800 text-center">Whiskies</h3>
          <div className="flex items-center justify-center mt-2">
            {distillery.whiskies.length === 0 && <span className="text-green-800">No whiskies were added yet</span>}
            {distillery.whiskies.map((whisky) => {
              return <WhiskyBadge key={whisky.id} whisky={whisky} />;
            })}
          </div>
          <div className="mt-4 flex items-stretch">
            <Link href="/distilleries">
              <span className="wa-btn wa-btn-green flex-auto h-9">Back</span>
            </Link>
            <Link href="/distillery/[id]/edit" as={`/distillery/${distillery.id}/edit`}>
              <button className="wa-btn wa-btn-green flex-grow-0 flex-shrink-0 w-9 h-9 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-6 h-6">
                  <use href="/img/icons/edit.svg#edit" />
                </svg>
              </button>
            </Link>
            <DeleteOverlay onDelete={onDelete} />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Distillery;
