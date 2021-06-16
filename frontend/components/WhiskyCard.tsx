import Link from "next/link";
import StaticRating from "~/components/rating/StaticRating";
import CountryFlag from "~/components/CountryFlag";

const WhiskyCard = ({ whisky }) => {
  const age = whisky.age === "NAS" ? "NAS" : whisky.age + " years";

  return (
    <div id={whisky._id} className="mb-3 bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
      <div className="flex items-center border-b-2 border-gray-200">
        <div className="ml-3">
          {whisky.distillery?.country && (
            <CountryFlag countryCode={whisky.distillery.country} />
          )}
        </div>
        <div className="px-3 pt-1 pb-2 text-2xl text-green-800 font-thin tracking-wider">{whisky.name}</div>
      </div>
      <div className="flex items-center justify-between px-3 pt-3 pb-4">
        <div>
          <span className="text-green-800 text-lg">{age}</span>
        </div>
        <div>
          <StaticRating rating={whisky.rating} />
        </div>
      </div>
      <div className="px-3 pt-1 pb-3">
        <Link href="/whisky/[id]" as={`/whisky/${whisky.id}`}>
          <span className="block w-full wa-btn wa-btn-green">Details</span>
        </Link>
      </div>
    </div>
  );
};

export default WhiskyCard;
