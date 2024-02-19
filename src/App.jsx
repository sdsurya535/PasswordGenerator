import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (setNumAllow) str += "0123456789";
    if (setCharacter) str += "!#$%&'()*+-/:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, character, setPassword]);

  const clickToCopy = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 20);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, character, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md rounded-lg px-5 py-3 shadow-md mx-auto my-8 text-orange-500 bg-gray-600">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow  px-2 py-3 overflow-hidden  ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 rounded-l-md "
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={clickToCopy}
            className="bg-blue-500 text-white px-3 py-0.5 outline-none shrink-0 transition hover:bg-blue-800"
          >
            copy
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="CharacterInput">Character</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="CharacterInput">Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
