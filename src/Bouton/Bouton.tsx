import "./Bouton.css";
import { MdLightMode } from "react-icons/md";
import { GiPowerButton } from "react-icons/gi";
import { useState } from "react";

function Bouton() {
  const [etatBouton, setEtatBouton] = useState(false);
  let changeEtatBuouton = () => {
    setEtatBouton(!etatBouton);
  };
  return (
    <>
      <div className="bouton-container">
        <MdLightMode className="light-icon" />
        <div className="command-container">
          <h1>Chamre1</h1>
          <button onClick={changeEtatBuouton} style={{ all: "unset" }}>
            {etatBouton ? (
              <GiPowerButton className="button-icon button-icon-red " />
            ) : (
              <GiPowerButton className="button-icon button-icon-green" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Bouton;
