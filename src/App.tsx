import { Toaster } from "react-hot-toast";
import "./App.css";
import Bouton from "./Bouton/Bouton";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Bouton />
    </>
  );
}

export default App;
