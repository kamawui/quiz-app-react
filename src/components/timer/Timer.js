import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = ({time, ifExpired}) => {
    const [minutes, setMinutes] = useState(time);
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate();

    const setTime = () => {
        if (minutes === 0 && seconds === 0) {
            ifExpired();
            navigate("/result");
        } else {
            if (seconds === 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds - 1);
            }
        }
    }

    useEffect(() => {
        const timer = setInterval(() => setTime(), 1000);

        return () => clearInterval(timer);

    }, [seconds, minutes]);

    console.log(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

    return (
        <div className="timer">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    );
};

export default Timer;