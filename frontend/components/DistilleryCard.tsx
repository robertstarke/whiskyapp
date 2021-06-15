import Link from "next/link";

const DistilleryCard = ({ distillery }) => {
  return (
    <div id={distillery.id} className="mb-3 bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
          <div className="text-2xl text-green-800 font-thin tracking-wider">{distillery.name}</div>
          <div className="text-right">
            <img
              src={`/img/countries/${distillery.country.toLowerCase().replace(" ", "-")}.png`}
              alt={distillery.country}
              className="w-6 h-auto rounded-sm inline-block border border-green-800"
            />
          </div>
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
