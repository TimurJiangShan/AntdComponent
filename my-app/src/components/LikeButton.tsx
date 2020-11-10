import React, { useState, useEffect } from 'react';

const LikeButton:React.FC = () => {
    const [obj, setObj] = useState({like: 0, on: true});
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    useEffect(() => {
        document.title = `Click ${like}`;
        console.log(like);
    },[like]);
    return (
        <>
            <button onClick={() => setLike(like + 1)}>{like} 👍</button>
            <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
        </>
    )
}

export default LikeButton;