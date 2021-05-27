import Link from "next/link";
import { DELETE_WHISKY, WHISKY } from "~/utils/queries/whiskies.query";
import StaticRating from "~/components/rating/StaticRating";
import DeleteOverlay from "~/components/overlays/DeleteOverlay";
import client from "~/utils/apollo-client";
import TasteNote from "~/components/TasteNote";
import Type from "~/components/Type";
import React from "react";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
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
    }
  };
}

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

    await router.replace('/');
  };

  return (
    <div id={whisky.id} className="relative max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
      <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
        <div className="text-2xl text-green-800 font-thin tracking-wider">{whisky.name}</div>
        <div>
          {whisky.distillery?.country && (
            <img
              src={`/img/countries/${whisky.distillery.country.toLowerCase().replace(" ", "-")}.png`}
              alt="whisky.country"
              className="w-6 h-auto rounded-sm inline-block border border-green-800"
            />
          )}
        </div>
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
              {whisky.distillery?.country} {whisky.distillery?.region && `(${whisky.distillery.region})`}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-thin uppercase text-green-800 text-center">Types</h3>
          <div className="flex items-center justify-center mt-2">
            {whisky.characteristics.map((characteristic) => {
              return <Type key={characteristic.id} type={characteristic.name} />;
            })}
          </div>
          <h3 className="mt-4 text-lg font-thin uppercase text-green-800 text-center">Taste Notes</h3>
          <div className="flex items-center justify-center mt-2">
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
                <use href="/img/icons/edit.svg#edit"/>
              </svg>
            </button>
          </Link>
          <DeleteOverlay onDelete={onDelete}/>
        </div>
      </div>
    </div>
  );
};

export default Whisky;
