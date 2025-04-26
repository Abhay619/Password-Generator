import {useState } from "react";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LC, NC, SC, UC } from "./PassChar";


function App() {
  let [passlen, setPassLen] = useState(10);

  let changePassLen = (event) => {
    setPassLen(event.target.value);
  }

  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [number, setNumber] = useState(false);
  let [fPassword, setFpassword] = useState('');

  let createPassword =() => {
    let charSet = "";
    let finalPass = ""; //An empty sting to store the password
    if(uppercase || lowercase || symbol || number)
    {
      if(uppercase) charSet+=UC;
      if(lowercase) charSet+=LC;
      if(number) charSet+=NC;
      if(symbol) charSet+=SC;
      for(let i=0; i<passlen; i++){
        finalPass+=charSet.charAt(Math.floor(Math.random()*charSet.length)); //charAt() function gives the element at the index which we pass as argument,
        //  math.floor() round offs the the number to base value
        // math.random will give any number between 0 to 1, so we will multiply it with the charSet like if it gives 0.4 and we will use only uppercase then 0.5*26 = 13 character, and we will repeat this, for password length times
      }

      setFpassword(finalPass);
      toast.success("Generated",{
        theme: "colored",
      })
    }
    else{
      toast.error("Please select any one checkbox");
    }
  }

  let copyPassword = () =>
  {
    navigator.clipboard.writeText(fPassword); //navigator is provided by browser
    toast.info("Copied",{
      theme: "colored",
    })
  }

  return (
    <>
    <ToastContainer />
      <div className="passwordBox">
        <h1>PASSWORD GENERATOR</h1>

        <div className="passwordBoxin">
          <input type="text" value={fPassword}/>
          <button onClick={copyPassword}>Copy</button>
        </div>

        <button type="btn" className="generateBtn" onClick={createPassword}><h3>GENERATE PASSWORD</h3></button>

        <div className="passLength">
          <label>Length:</label>
          <input type="range" max={20} min={10} defaultValue={10} onChange={changePassLen}/>
          <p>{passlen}</p>
        </div>

        <div className="passUpper passCheck">
          <input type="checkbox" checked={uppercase} onClick={() => setUppercase(!uppercase)}/>
          <label onClick={() => setUppercase(!uppercase)}>Uppercase Letters</label>
        </div>

        <div className="passLower passCheck">
          <input type="checkbox" checked={lowercase} onClick={() => setLowercase(!lowercase)}/>
          <label onClick={() => setLowercase(!lowercase)}>Lowercase Letters</label>
          
        </div>

        <div className="passNum passCheck">
        <input type="checkbox" checked={number} onClick={() => setNumber(!number)}/>
          <label onClick={() => setNumber(!number)}>Numbers</label>
        </div>

        <div className="passSym passCheck">
        <input type="checkbox" checked={symbol} onClick={() => setSymbol(!symbol)}/>
          <label onClick={() => setSymbol(!symbol)}>Symbols</label>
        </div>

      </div>
    </>
  );
}

export default App;
