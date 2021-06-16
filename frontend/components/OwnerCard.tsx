import DeleteOverlay from "~/components/overlays/DeleteOverlay";
import { useRouter } from "next/router";
import client from "~/utils/apollo-client";
import { DELETE_OWNER } from "~/utils/queries/owners.query";
import CountryFlag from "~/components/CountryFlag";

const OwnerCard = ({ owner }) => {
  const router = useRouter();

  const onDelete = async () => {
    await client.mutate({
      mutation: DELETE_OWNER,
      variables: {
        id: owner.id
      }
    });

    await router.replace("/owners");
  };

  return (
    <div id={owner.id} className="relative mb-3 bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-row items-center justify-start w-full h-full px-4 py-2">
          <div className="mr-3">
            <CountryFlag countryCode={owner.country} />
          </div>
          <div className="flex-auto text-2xl text-green-800 font-thin tracking-wider">{owner.name}</div>
          <DeleteOverlay onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default OwnerCard;
