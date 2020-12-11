import React from 'react';
import Hello from './components/Hello';
import MouseTracker from "./components/MouseTracker";
import useURLLoader from "./hooks/useURLLoader";
import LikeButton from "./components/LikeButton";
// import useMousePosition from "./hooks/useMousePosition";
import logo from './logo.svg';
import './App.css';

interface IShowResult {
  message: string;
  status: string;
}
function App() {

  // const position = useMousePosition();
  // const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random');

  // 把 data的any类型转化成IShowResult类型。
  // const resultData = data as IShowResult;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Hello message={"Hello"} />
          <LikeButton />
          {/*<MouseTracker />*/}
          {/*<p>X: {position.x}, Y: {position.y}</p>*/}
          {/*{loading ? <p>🐶 读取中</p>*/}
          {/*    : <div>*/}
          {/*        <img src={resultData && resultData.message} />*/}
          {/*      </div>*/}
          {/*}*/}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
