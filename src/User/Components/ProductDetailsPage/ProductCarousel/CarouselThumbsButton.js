import React from "react";
import { ServerURL } from "../../../../Services/ServerServices";

export const Thumb = (props) => {
  const { selected, index, onClick } = props;
  console.log("index thumb button", index);

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
        src={`${ServerURL}/images/${index.images[0].image_name}`}
        style={{ objectFit: "contain" }}
      ></img>
    </div>
  );
};
