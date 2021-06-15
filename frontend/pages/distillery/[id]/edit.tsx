import { useState } from "react";
import { useRouter } from "next/router";
import client from "~/utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { EDIT_DISTILLERY, DISTILLERY_FOR_EDIT, DISTILLERY_IDS } from "~/utils/queries/distilleries.query";
import { OWNERS_FOR_DISTILLERIES } from "~/utils/queries/owners.query";

export const getStaticProps = async ({ params }) => {
  const { data: distilleryData } = await client.query({
    query: DISTILLERY_FOR_EDIT,
    variables: {
      id: params.id
    }
  });

  const { data: ownerData } = await client.query({
    query: OWNERS_FOR_DISTILLERIES
  });

  return {
    props: {
      distillery: distilleryData.distillery,
      owners: ownerData.owners
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

const Distillery = ({ distillery, owners }): JSX.Element => {
  const router = useRouter();
  const [name, setName] = useState<string>(distillery.name);
  const [country, setCountry] = useState<string>(distillery.country);
  const [region, setRegion] = useState<string>(distillery.region);
  const [description, setDescription] = useState<string>(distillery.description);
  const [selectedOwner, setOwner] = useState<string>(distillery.owner?.id);

  const addDistillery = async (e) => {
    e.preventDefault();

    const { data } = await client.mutate({
      mutation: EDIT_DISTILLERY,
      variables: {
        id: distillery.id,
        name,
        country,
        region,
        description,
        distillery,
        owner: selectedOwner
      }
    });

    await router.replace(`/distillery/${data.updateDistillery.distillery.id}`);
  };

  return (
    <ApolloProvider client={client}>
      <div className="max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
        <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
          <div className="text-2xl text-green-800 font-thin tracking-wider">Edit distillery</div>
        </div>
        <form className="p-3 space-y-3" onSubmit={addDistillery}>
          <input
            type="text"
            id="distilleryName"
            name="distilleryName"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="country"
            name="country"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            id="region"
            name="region"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <textarea
            id="description"
            name="description"
            value={description}
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            id="owner"
            name="owner"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            defaultValue={distillery.owner?.id}
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
            Change
          </button>
        </form>
      </div>
    </ApolloProvider>
  );
};

export default Distillery;
