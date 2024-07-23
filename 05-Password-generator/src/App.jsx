import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPassWord = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator = useCallback(() => 
    {
      let pass = " "
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllowed) str += "0123456789"
      if(charAllowed) str += "!@#$%^&*(){}[]"

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)
    }, [length, numAllowed, charAllowed, setPassword])

    useEffect(() => {
      passwordGenerator()
    }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-2xl mx-auto shadow-md px-4 py-3 my-8 bg-gray-800 rounded-md text-orange-500 '>
        <h1 className='font-bold text-4xl text-center text-white my-8'>PassWord Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
           className='outline-none w-full py-3 px-3'
           type="text"
           placeholder='password'
           value={password}
           readOnly
           ref={passwordRef}
           />
          <button
            onClick={copyPassWord}
            className='bg-blue-600 font-bold px-3 outline-none text-white hover:bg-blue-500  active:bg-blue-900'>Copy</button>
        </div>
        <div className='flex text-lg gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              value={length}
              min={8}
              max={50}
              className='cursor-pointer'

              onChange={(e) => setLength(e.target.value)}
            />
            <label className='font-bold'>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked = {numAllowed}
              id = 'numberInput'
              onClick={() =>  {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label 
              htmlFor='numberInput'
              className='font-bold'>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked = {charAllowed}
              id = 'characterInput'
              onChange={() =>  {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label 
              htmlFor='characterInput'
              className='font-bold'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
