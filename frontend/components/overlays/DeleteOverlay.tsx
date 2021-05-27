import { useState } from "react";

const DeleteOverlay = ({ onDelete }) => {
  const [overlayVisible, setShowOverlay] = useState<Boolean>(false);
  const showOverlay = () => {
    setShowOverlay(true);
  }
  const hideOverlay = () => {
    setShowOverlay(false);
  }

  return (
    <>
      <button type="button" className="wa-btn wa-btn-red" onClick={showOverlay}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-6 h-6"><use href="/img/icons/delete.svg#delete"/></svg>
      </button>
      <div id="deleteOverlay" className={`absolute inset-0 flex items-center justify-center w-full h-full bg-red-600 ${!overlayVisible && 'hidden'}`}>
        <button type="button" className="wa-btn wa-btn-white mr-2" onClick={() => {onDelete(); hideOverlay()}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-8 h-8">
            <use href="/img/icons/yes.svg#yes"/>
          </svg>
        </button>
        <button type="button" className="wa-btn wa-btn-white" onClick={hideOverlay}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-8 h-8">
            <use href="/img/icons/no.svg#no"/>
          </svg>
        </button>
      </div>
    </>
  );
}

export default DeleteOverlay;
