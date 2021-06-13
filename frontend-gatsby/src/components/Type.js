import * as React from "react";

const Type = ({ type }) => {
  return (
    <span className="inline-block mr-1 mb-1 px-2 py-1 rounded bg-green-200 text-green-800 font-bold text-xs">
      {type}
    </span>
  );
};

export default Type;
