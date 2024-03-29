import Link from "next/link";
import { useRouter } from "next/router";
import client from "~/utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { DELETE_WHISKY, WHISKY, WHISKY_IDS } from "~/utils/queries/whiskies.query";
import StaticRating from "~/components/rating/StaticRating";
import DeleteOverlay from "~/components/overlays/DeleteOverlay";
import TasteNote from "~/components/TasteNote";
import Type from "~/components/Type";
import CountryFlag from "~/components/CountryFlag";
import countries from "~/utils/countries.map";

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const { data } = await client.query({
    query: WHISKY,
    variables: {
      id: id
    }
  });

  return {
    props: {
      whisky: data.whisky
    },
    revalidate: 10
  };
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: WHISKY_IDS
  });

  const paths = data.whiskies.map((whisky) => ({
    params: { id: whisky.id }
  }));

  return { paths, fallback: "blocking" };
};

const Whisky = ({ whisky }): JSX.Element => {
  const router = useRouter();
  const age = whisky.age === "NAS" ? "NAS" : whisky.age + " years";

  const onDelete = async () => {
    await client.mutate({
      mutation: DELETE_WHISKY,
      variables: {
        id: whisky.id
      }
    });

    await router.replace("/");
  };

  return (
    <ApolloProvider client={client}>
      <div
        id={whisky.id}
        className="relative max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm"
      >
        <div className="flex items-center border-b-2 border-gray-200">
          <div className="ml-3">
            {whisky.distillery?.country && (
              <CountryFlag countryCode={whisky.distillery.country} />
            )}
          </div>
          <div className="px-3 pt-1 pb-2 text-2xl text-green-800 font-thin tracking-wider">{whisky.name}</div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-green-800 text-lg">{age}</span>
            </div>
            <div>
              <StaticRating rating={whisky.rating} />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="text-green-800 text-lg">
              <span>{whisky.abv}% alc./vol.</span>
            </div>
            <div className="text-green-800 text-lg flex items-center">
              <span>
                {countries.find(country => (country.countryCode === whisky.distillery?.country))?.name} {whisky.distillery?.region && `(${whisky.distillery.region})`}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-thin uppercase text-green-800 text-center">Characteristics</h3>
            <div className="flex items-center justify-center mt-2">
              {whisky.characteristics.length === 0 && <span className="text-green-800">No characteristics were added yet</span>}
              {whisky.characteristics.map((characteristic) => {
                return <Type key={characteristic.id} type={characteristic.name} />;
              })}
            </div>
            <h3 className="mt-4 text-lg font-thin uppercase text-green-800 text-center">Taste Notes</h3>
            <div className="flex items-center justify-center mt-2">
              {whisky.taste_notes.length === 0 && <span className="text-green-800">No taste notes were added yet</span>}
              {whisky.taste_notes.map((tasteNote) => {
                return <TasteNote key={tasteNote.id} tasteNote={tasteNote.name} />;
              })}
            </div>
          </div>
          <div className="mt-4 flex items-stretch">
            <Link href="/">
              <span className="wa-btn wa-btn-green flex-auto h-9">Back</span>
            </Link>
            <Link href="/whisky/[id]/edit" as={`/whisky/${whisky.id}/edit`}>
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

export default Whisky;
