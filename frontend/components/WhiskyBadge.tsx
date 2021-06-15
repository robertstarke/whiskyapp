import Link from "next/link";

const WhiskyBadge = ({ whisky }) => {
  return (
    <Link href="/whisky/[id]" as={`/whisky/${whisky.id}`}>
      <span className="inline-block mr-1 mb-1 px-2 py-1 rounded bg-green-200 text-green-800 font-bold text-xs cursor-pointer hover:text-white hover:bg-green-800">
        {whisky.name}
      </span>
    </Link>
  );
};

export default WhiskyBadge;
