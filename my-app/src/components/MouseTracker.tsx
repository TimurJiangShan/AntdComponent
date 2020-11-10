import React, { useState, useEffect } from 'react';

const MouseTracker:React.FC = () => {
    const [position, setPosition] = useState({ x : 0, y: 0 });
    useEffect(() => {

    }, [])
    return (
        <p>X : {position.x}, Y: {position.y}</p>
    )
}

export default MouseTracker;