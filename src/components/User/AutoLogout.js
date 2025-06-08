import React, {useEffect, useRef} from "react";

const AutoLogout=(props)=>{
    const timeout=15*60*1000;
    const timerId=useRef();

    const logout=()=>{
        console.log("User inactive for 15 minutes. Logging out...");
        localStorage.clear();
        window.location='/login';
    };

    const resetTimer=()=>{
        if(timerId.current)
        {
            clearTimeout(timerId.current);
        }
        timerId.current=setTimeout(logout,timeout);
    }

    useEffect(()=>{
        const events=['mousemove', 'keydown', 'click'];

        events.forEach((event)=>{
            window.addEventListener(event, resetTimer);
        });
        resetTimer();
        return ()=>{
            events.forEach((event)=>{
                window.removeEventListener(event, resetTimer);
            });
            if(timerId.current)
            {
                clearTimeout(timerId.current)
            }
        };
    },[]);
    return <>{props.children}</>
}

export default AutoLogout;