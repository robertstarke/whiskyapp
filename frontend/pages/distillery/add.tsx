import { useState } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "~/utils/apollo-client";
import { OWNERS_FOR_DISTILLERIES } from "~/utils/queries/owners.query";
import { ADD_DISTILLERY } from "~/utils/queries/distilleries.query";

export const getStaticProps = async () => {
  const { data: ownerData } = await client.query({
    query: OWNERS_FOR_DISTILLERIES
  });

  return {
    props: {
      owners: ownerData.owners
    },
    revalidate: 10
  };
};

const Distillery = ({ owners }): JSX.Element => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [selectedOwner, setOwner] = useState<string>();

  const addDistillery = async (e) => {
    e.preventDefault();

    await client.mutate({
      mutation: ADD_DISTILLERY,
      variables: {
        name,
        country,
        region,
        description,
        owner: selectedOwner
      }
    });

    setName("");
    setCountry("");
    setRegion("");
    setDescription("");
    setOwner(null);

    await router.replace("/distilleries");
  };

  return (
    <ApolloProvider client={client}>
      <div className="max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
        <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
          <div className="text-2xl text-green-800 font-thin tracking-wider">Add Distillery</div>
        </div>
        <form className="p-3 space-y-3" onSubmit={addDistillery}>
          <input
            type="text"
            id="whiskyName"
            name="whiskyName"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="country"
            name="country"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            id="region"
            name="region"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Region"
            onChange={(e) => setRegion(e.target.value)}
          />
          <textarea
            id="description"
            name="description"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            id="owner"
            name="owner"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            onChange={(e) => setOwner(e.target.value)}
          >
            <option value={null}>None</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
          <button type="submit" className="w-full wa-btn wa-btn-green">
            Add
          </button>
        </form>
      </div>
    </ApolloProvider>
  );
};

export default Distillery;
