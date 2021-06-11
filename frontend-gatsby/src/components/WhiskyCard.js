import * as React from "react";
import { Link } from "gatsby";
import StaticRating from "./rating/StaticRating";

const WhiskyCard = ({ whisky }) => {
  const age = whisky.age === "NAS" ? "NAS" : whisky.age + " years";

  return (
    <div
      id={whisky._id}
      className="mb-3 bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm"
    >
      <div className="flex items-center px-3 pt-1 pb-2 border-b-2 border-gray-200">
        <div className="w-4/5 text-2xl text-green-800 font-thin tracking-wider">
          {whisky.name}
        </div>
        <div className="w-1/5 text-right">
          {whisky.distillery?.country && (
            <img
              src={`/img/countries/${whisky.distillery.country
                .toLowerCase()
                .replace(" ", "-")}.png`}
              alt="whisky.country"
              className="w-6 h-auto rounded-sm inline-block border border-green-800"
            />
          )}
        </div>
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
