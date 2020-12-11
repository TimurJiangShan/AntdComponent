import React from 'react';
import Hello from './components/Hello';
import MouseTracker from "./components/MouseTracker";
import useURLLoader from "./hooks/useURLLoader";
import LikeButton from "./components/LikeButton";
// import useMousePosition from "./hooks/useMousePosition";
import logo from './logo.svg';
import './App.css';


/*
* Hook 规则：
* 1. 只在最顶层使用hook（这样可以确保hook的顺序能够顺序被调用）
* 2. 只在React函数中调用hook
* useCallback: 性能调优，每次组件渲染后，里面的变量相当于新建了一份，大家毫不相关。
* 使用useCallback使得在多次渲染中记住某个函数，再次渲染不需要新建对象
* https://usehooks.com/  一些好用的hooks
* */

interface IShowResult {
  message: string;
  status: string;
}

interface IThemeProps {
  [key: string] : {
    color: string;
    background: string;
  }
}

const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222',
  },
}

export const ThemeContext = React.createContext(themes.light);

function App() {

  // const position = useMousePosition();
  // const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random');

  // 把 data的any类型转化成IShowResult类型。
  // const resultData = data as IShowResult;
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
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
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
