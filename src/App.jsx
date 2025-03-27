import { useCallback, useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [specialCharacters, setSpecialCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let characters = "";

    if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (upperCase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) characters += "0123456789";
    if (specialCharacters) characters += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    // if none checkboxes is selected show warning
    if(!characters){
      setPassword("Please select atleast one checkbox !");
      return;
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * (characters.length ));
      pass += characters.charAt(char);
    }
    setPassword(pass);

  }, [length, numbers, lowercase, upperCase,specialCharacters, setPassword]);
  const copyPasswordToClipboard = useCallback(() => {
    if (!password) return; // If password is empty, do nothing
  
    passwordRef.current?.select();  // Select the input text
    passwordRef.current?.setSelectionRange(0, password.length); // Ensure all text is selected
  
    window.navigator.clipboard.writeText(password)
      .then(() => alert("Password copied to clipboard!")) // Show success message
      .catch((err) => console.error("Copy failed!", err)); // Handle errors
  }, [password]);
  
  useEffect(()=>{
    if (lowercase || upperCase || numbers || specialCharacters){
      passwordGenerator();
    }else{
      setPassword("");
    }

  },[length, numbers, lowercase, upperCase,specialCharacters, setPassword])
  return (
    <>
      <div className='w-full h-screen bg-black px-4 py-8'>
        <div className='w-full max-w-lg mx-auto bg-gray-800 px-4 py-3 text-white text-lg font-semibold shadow-md rounded-lg '>
          <h1 className='text-center'>Password generator</h1>
          <div className='px-4 py-2 w-full rounded-lg'>
            <input className='text-blue-600 px-4 py-2 outline-none w-5/6 ' value={password} type="text" readOnly placeholder='password' ref={passwordRef} />
            <button className='bg-blue-500 text-white h-full w-1/6 px-4 py-2 ' onClick={copyPasswordToClipboard}>Copy</button>
            <div>
              <div className='my-4 flex justify-start items-center gap-4'>
                <input type="range" id="slider" min="0" max="30" value={length} onChange={(e)=>{setLength(e.target.value)}} />
                <p>Value: <span id="sliderValue">{length}</span></p>
              </div>
              <div className='flex flex-col justify-around items-start'>
                <div>
                  <input type="checkbox" id="myCheckbox" checked={lowercase} onChange={() => setLowercase(prev => !prev)} />
                  <label htmlFor="myCheckbox">LowerCase</label>
                </div>
                <div>
                  <input type="checkbox" id="myCheckbox" checked = {upperCase} onChange={()=>setUpperCase(prev=>!prev)}/>
                  <label htmlFor="myCheckbox">UpperCase</label>
                </div>
                <div>
                  <input type="checkbox" id="myCheckbox" checked = {numbers} onChange={()=>setNumbers(prev=>!prev)}/>
                  <label htmlFor="myCheckbox">Number</label>
                </div>
                <div>
                  <input type="checkbox" id="myCheckbox" checked = {specialCharacters} onChange={()=>setSpecialCharacters(prev=>!prev)}/>
                  <label htmlFor="myCheckbox">Special Characters</label>
                </div>
              </div>
              <div className='w-full ' >
                <button className='px-4 py-2 bg-blue-600 rounded-lg mx-auto my-8' onClick={passwordGenerator}>Generate Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
