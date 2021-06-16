import Link from "next/link";
import CountryFlag from "~/components/CountryFlag";

const DistilleryCard = ({ distillery }) => {
  return (
    <div id={distillery.id} className="mb-3 bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center border-b-2 border-gray-200">
          <div className="ml-3">
            <CountryFlag countryCode={distillery.country} />
          </div>
          <div className="px-3 pt-1 pb-2 text-2xl text-green-800 font-thin tracking-wider">{distillery.name}</div>
        </div>
        <div className="flex-auto flex items-center justify-between px-3 pt-3 pb-4 text-green-800 text-lg">
          {distillery.region && <span>{distillery.region}</span>}
          {distillery.owner?.name && <span>{distillery.owner.name}</span>}
        </div>
        <div className="flex-none px-3 pt-1 pb-3">
          <Link href="/distillery/[id]" as={`/distillery/${distillery.id}`}>
            <span className="block w-full wa-btn wa-btn-green">Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DistilleryCard;
