import React, { useState } from 'react';

const LikeButton:React.FC = () => {
    const [obj, setObj] = useState({like: 0, on: true});
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);

    return (
        <>
        <button onClick={() => setLike(like + 1)}>{like} 👍</button>
        <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
        </>
    )
}

export default LikeButton;