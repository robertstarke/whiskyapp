const TasteNote = ({ tasteNote }) => {
  return (
    <span className="inline-block mr-1 mb-1 px-2 py-1 rounded bg-green-200 text-green-800 font-bold text-xs">
      {tasteNote}
    </span>
  );
};

export default TasteNote;
