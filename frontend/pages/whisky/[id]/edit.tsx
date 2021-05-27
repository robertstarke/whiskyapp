import client from "~/utils/apollo-client";
import React, { useState } from "react";
import { DISTILLERIES_FOR_WHISKIES } from "~/utils/queries/distilleries.query";
import { EDIT_WHISKY, WHISKY_FOR_EDIT } from "~/utils/queries/whiskies.query";
import { useRouter } from "next/router";
import { CHARACTERISTICS_FOR_WHISKIES } from "~/utils/queries/characteristics.query";
import { TASTE_NOTES_FOR_WHISKIES } from "~/utils/queries/tasteNotes.query";

export async function getServerSideProps({ query }) {
  const { data: whiskyData } = await client.query({
    query: WHISKY_FOR_EDIT,
    variables: {
      id: query.id
    }
  });

  const { data: distilleryData } = await client.query({
    query: DISTILLERIES_FOR_WHISKIES,
  });
  const { data: charateristicsData } = await client.query({
    query: CHARACTERISTICS_FOR_WHISKIES,
  });
  const { data: tasteNotesData } = await client.query({
    query: TASTE_NOTES_FOR_WHISKIES,
  });

  return {
    props: {
      whisky: whiskyData.whisky,
      distilleries: distilleryData.distilleries,
      characteristics: charateristicsData.characteristics,
      tasteNotes: tasteNotesData.tasteNotes
    }
  };
}

const Whisky = ({ whisky, distilleries, characteristics, tasteNotes }): JSX.Element => {
  const router = useRouter();
  const [name, setName] = useState<string>(whisky.name);
  const [age, setAge] = useState<string>(whisky.age);
  const [abv, setABV] = useState<number>(whisky.abv);
  const [rating, setRating] = useState<number>(whisky.rating);
  const [distillery, setDistillery] = useState<string>(whisky.distillery?.id);
  const [selectedCharacteristics, setCharacteristics] = useState<string[]>(whisky.characteristics?.map((characteristic) => (characteristic.id)));
  const [selectedTasteNotes, setTasteNotes] = useState<string[]>(whisky.taste_notes?.map((tasteNote) => (tasteNote.id)));

  const addWhisky = async (e) => {
    e.preventDefault();

    const { data } = await client.mutate({
      mutation: EDIT_WHISKY,
      variables: {
        id: whisky.id,
        name,
        age,
        abv,
        rating,
        distillery,
        tasteNotes: selectedTasteNotes,
        characteristics: selectedCharacteristics,
      }
    });

    await router.replace(`/whisky/${data.updateWhisky.whisky.id}`);
  }

  return (
    <div
      className="max-w-md mx-auto bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-sm"
    >
      <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b-2 border-gray-200">
        <div className="text-2xl text-green-800 font-thin tracking-wider">Edit Whisky</div>
      </div>
      <form className="p-3 space-y-3" onSubmit={addWhisky}>
        <input type="text" id="whiskyName" name="whiskyName" className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" placeholder="name" value={name} onChange={(e) => (setName(e.target.value))}/>
        <input type="text" id="age" name="age" className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" placeholder="age" value={age} onChange={(e) => (setAge(e.target.value))}/>
        <input type="number" id="abv" name="abv" className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" placeholder="abv" value={abv} onChange={(e) => (setABV(parseFloat(e.target.value)))}/>
        <input type="number" id="rating" name="rating" min="0" max="10" step=".1" value={rating} className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" placeholder="rating (0 or 1.0 - 10.0)" onChange={(e) => (setRating(parseFloat(e.target.value)))}/>
        <select id="distillery" name="distillery" className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" onChange={(e) => (setDistillery(e.target.value))}>
          {distilleries.map((distillery) => (<option key={distillery.id} value={distillery.id} selected={whisky.distillery?.id === distillery.id}>{distillery.name}</option>))}
        </select>
        <select id="characteristics" name="characteristics" multiple={true} className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" onChange={(e) => (setCharacteristics(Array.from(e.target.selectedOptions, option => option.value)))}>
          {characteristics.map((characteristic) => (<option key={characteristic.id} value={characteristic.id} selected={selectedCharacteristics.indexOf(characteristic.id) > -1}>{characteristic.name}</option>))}
        </select>
        <select id="tasteNotes" name="tasteNotes" multiple={true} className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none" onChange={(e) => (setTasteNotes(Array.from(e.target.selectedOptions, option => option.value)))}>
          {tasteNotes.map((tasteNote) => (<option key={tasteNote.id} value={tasteNote.id} selected={selectedTasteNotes.indexOf(tasteNote.id) > -1}>{tasteNote.name}</option>))}
        </select>
        <button type="submit" className="w-full wa-btn wa-btn-green">Change</button>
      </form>
    </div>
  );
};

export default Whisky;
