import React, {useState, useEffect, useRef, useContext} from 'react';
// import useMousePosition from "../hooks/useMousePosition";
import { ThemeContext } from '../App';

/*
* ref的值，全局只有一个引用
* 修改ref的值，不会引发重新render
*
* */



const LikeButton:React.FC = () => {
    const [obj, setObj] = useState({like: 0, on: true});
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    const likeRef = useRef(0);
    const didUpdate = useRef(false);

    // 使用context，用useContext
    const theme = useContext(ThemeContext);
    const style = {
        color: theme.color,
        background: theme.background,
    }

    // const position = useMousePosition();
    useEffect(() => {
        document.title = `Click ${like}`;
    },[like]);

    useEffect(() => {
        if (didUpdate.current) {
            console.log("Did update");
        } else {
            didUpdate.current = true;
        }
    } );

    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on ' + likeRef.current);
        }, 3000);
    }

    return (
        <div>
            <button style={style} onClick={() => { setLike(like + 1); likeRef.current++; }}>{like} 👍</button>
            <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
            <button onClick={handleAlertClick}>Alert!</button>
            {/*<p>X: {position.x}, Y: {position.y}</p>*/}
        </div>
    )
}

export default LikeButton;