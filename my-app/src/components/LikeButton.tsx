import React, { useState, useEffect, useRef } from 'react';
import useMousePosition from "../hooks/useMousePosition";


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

    const position = useMousePosition();
    useEffect(() => {
        document.title = `Click ${like}`;
        console.log(like);
        setTimeout(() => {
           alert(likeRef.current);
        }, 3000);
    },[like]);

    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on ' + likeRef.current);
        }, 3000);
    }

    return (
        <div>
            <button onClick={() => { setLike(like + 1); likeRef.current++; }}>{like} 👍</button>
            <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
            <button onClick={handleAlertClick}>Alert!</button>
            <p>X: {position.x}, Y: {position.y}</p>
        </div>
    )
}

export default LikeButton;