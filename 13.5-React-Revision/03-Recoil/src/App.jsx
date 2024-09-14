import React from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { countAtom } from "./components/atoms/count";

function App() {
  return (
    <RecoilRoot>
      <Count />
    </RecoilRoot>
  );
}

function Count() {
  console.log("Re-render")
  return <div>
   <CountRenderer />
   <Button />
   <IsEven />
  </div>
  
}

function CountRenderer() {
  const count = useRecoilValue(countAtom)
  return (
    <b>
      {count}
    </b>
  )
}

function Button() {
  const setCount = useSetRecoilState(countAtom);
  console.log("Re-render")
  return (
    <div>
      <button onClick={() => setCount(count => count + 1)}>Increase</button>
      <button onClick={() => setCount(count => count - 1)}>Decrease</button>
    </div>
  );
}

function IsEven() {
  const count = useRecoilValue(countAtom)
  if(count != 0 && count % 2 == 0) {
    return (
      <b>
        It is Even number
      </b>
    )
  }
  else {
    return (
      " "
    )
  }
}

export default App