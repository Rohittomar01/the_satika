import React from "react";

export const Thumb = (props) => {
  const { selected, index, onClick } = props;

  return (
    <div
      className={"carousel-thumbs__slide".concat(
        selected ? " carousel-thumbs__slide--selected" : ""
      )}
    >
      {/* <button
        onClick={onClick}
        type="button"
        className="carousel-thumbs__slide__number"
      >
        {index + 1}
      </button> */}
      <img
        className="carousel-thumbs__slide__number"
        onClick={onClick}
        src={index.image}
      ></img>
    </div>
  );
};
