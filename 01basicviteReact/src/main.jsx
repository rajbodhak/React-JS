import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Practice from './Practice.jsx';

function MyApp() {
  return (
    <h1> Hello this is from myApp function</h1>
  )
};

const anotherELement = (
  <a href='https://google.com'>Click me to visit Google</a>
);

const user = 'John Cina';

const reactElement = React.createElement(
  'a',
  {href: 'https://google.com', target: '_blank'},
  'click to google --- ',
  user
)
 
ReactDOM.createRoot(document.getElementById('root')).render(
  // MyApp()
  // <>
  //   <MyApp/>
  //   <App />
  //   <Practice />
  // </>
  // anotherELement  
  reactElement
);

