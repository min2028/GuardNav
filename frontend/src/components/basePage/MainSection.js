import React, { useState, useEffect } from 'react';


export default function MainSection() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <section>
            <div>
                Current Time: {currentTime.toLocaleTimeString()}
            </div>
        </section>
    )
}