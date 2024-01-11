import { useState } from "react";
import Minter from './Minter'
import Modal from "./components/Modal";
import "./Button.css";


function App() {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  return (
    <div>
      {/* <Minter></Minter> */}
      <button className="clickme" onClick={() => Toggle()}>
        Modal
      </button>
      <Modal show={modal} title="My Modal" close={Toggle} />
    </div>
  );
}

export default App;
