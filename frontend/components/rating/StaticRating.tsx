import { NextPage } from "next";
import React from "react";

const StaticRating: NextPage<any> = ({ rating }: { rating: number }) => {
  return (<div className="flex items-center h-5">
    {!!rating && <svg className="w-3 h-3 fill-current text-yellow-400" viewBox="0 0 32 32"><use href="/img/icons/star.svg#star"/></svg>}
    {rating ?
      <div className="ml-1 text-xl text-green-800 leading-4 h-full">{rating.toFixed(1)}</div> :
      <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 32 32"><use href="/img/icons/noStar.svg#noStar"/></svg>}
  </div>);
};

export default StaticRating;
