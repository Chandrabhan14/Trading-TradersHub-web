import React, { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

function AosProvider({children}) {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default AosProvider