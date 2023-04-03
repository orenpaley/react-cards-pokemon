import React from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css";
import useFlip from "./hooks.js";
/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [isFlipped, toggle] = useFlip();
  return (
    <img
      src={isFlipped ? front : back}
      alt="playing card"
      onClick={toggle}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
