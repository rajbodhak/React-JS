import { useState } from 'react'

function App() {
  const [color, setColor] = useState("black")

  return (
    <>
      <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
        <div className='text-yellow-100 fixed flex flex-wrap justify-center top-14 text-4xl inset-x-0 font-bold'><h1 className='shadow-xl'>BackGround Color Changer</h1></div>
        <div className='fixed flex flex-wrap justify-center inset-x-0 bottom-20'>
          <div className='flex flex-wrap p-3 rounded-xl bg-white gap-3 shadow-lg '>
            <button
             onClick = {() => setColor('red')} 
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white'
             style={{backgroundColor: 'red'}}
             >Red
            </button>

            <button
             onClick = {() => setColor('yellow')} 
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-balck'
             style={{backgroundColor: 'yellow'}}>
              Yellow
            </button>

            <button
             onClick = {() => setColor('purple')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white'
             style={{backgroundColor: 'purple'}}>
              Purple
            </button>

            <button 
             onClick = {() => setColor('green')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white'
             style={{backgroundColor: 'green'}}>
              Green
            </button>

            <button
             onClick = {() => setColor('orange')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white'
             style={{backgroundColor: 'orange'}}>
              Orange
            </button>

            <button
             onClick = {() => setColor('blue')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white' 
             style={{backgroundColor: 'blue'}}>
              Blue
            </button>

            <button
             onClick = {() => setColor('grey')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white'
             style={{backgroundColor: 'grey'}}>
              Grey
            </button>

            <button
             onClick = {() => setColor('pink')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-black' 
             style={{backgroundColor: 'pink'}}>
              Pink
            </button>

            <button
             onClick = {() => setColor('cyan')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-black' 
             style={{backgroundColor: 'cyan'}}>
              Cyan
             </button>

            <button
             onClick = {() => setColor('indigo')}
             className='outline-none px-4 py-2 rounded-lg shadow-lg text-white' 
             style={{backgroundColor: 'indigo'}}>
              Indigo
             </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
