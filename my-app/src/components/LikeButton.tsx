import React, { useState, useEffect } from 'react';
import useMousePosition from "../hooks/useMousePosition";

const LikeButton:React.FC = () => {
    const [obj, setObj] = useState({like: 0, on: true});
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    const position = useMousePosition();
    useEffect(() => {
        document.title = `Click ${like}`;
        console.log(like);
    },[like]);
    return (
        <>
            <button onClick={() => setLike(like + 1)}>{like} 👍</button>
            <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
            <p>X: {position.x}, Y: {position.y}</p>
        </>
    )
}

export default LikeButton;