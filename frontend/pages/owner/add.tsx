import { useState } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "~/utils/apollo-client";
import { ADD_OWNER } from "~/utils/queries/owners.query";
import CountrySelect from "~/components/CountrySelect";

const Distillery = (): JSX.Element => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<string>();

  const addOwner = async (e) => {
    e.preventDefault();

    await client.mutate({
      mutation: ADD_OWNER,
      variables: {
        name,
        country
      }
    });

    setName("");
    setCountry("");

    await router.replace("/owners");
  };

  return (
    <ApolloProvider client={client}>
      <div className="max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
        <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
          <div className="text-2xl text-green-800 font-thin tracking-wider">Add Owner</div>
        </div>
        <form className="p-3 space-y-3" onSubmit={addOwner}>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <CountrySelect defaultValue={country} setCountry={setCountry} />
          <button type="submit" className="w-full wa-btn wa-btn-green">
            Add
          </button>
        </form>
      </div>
    </ApolloProvider>
  );
};

export default Distillery;
