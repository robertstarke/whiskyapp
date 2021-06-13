import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import StaticRating from "../components/rating/StaticRating";
import Type from "../components/Type";
import TasteNote from "../components/TasteNote";

const Whisky = ({ pageContext }) => {
  const whisky = pageContext.whisky;

  return (
    <Layout>
      <div
        id={whisky.id}
        className="relative max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm"
      >
        <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
          <div className="text-2xl text-green-800 font-thin tracking-wider">
            {whisky.name}
          </div>
          <div>
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
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-green-800 text-lg">
                {whisky.age === "NAS" ? "NAS" : whisky.age + " years"}
              </span>
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
                {whisky.distillery?.country}{" "}
                {whisky.distillery?.region && `(${whisky.distillery.region})`}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-thin uppercase text-green-800 text-center">
              Types
            </h3>
            <div className="flex items-center justify-center mt-2">
              {whisky.characteristics.map((characteristic) => {
                return (
                  <Type key={characteristic.id} type={characteristic.name} />
                );
              })}
            </div>
            <h3 className="mt-4 text-lg font-thin uppercase text-green-800 text-center">
              Taste Notes
            </h3>
            <div className="flex items-center justify-center mt-2">
              {whisky.taste_notes.map((tasteNote) => {
                return (
                  <TasteNote key={tasteNote.id} tasteNote={tasteNote.name} />
                );
              })}
            </div>
          </div>
          <div className="mt-4">
            <Link to="/">
              <div className="wa-btn wa-btn-green h-9">Back</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Whisky;
