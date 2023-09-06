import "./NavigationBar.css";

import { useEffect } from "react";
import { BsCircle, BsSquare, BsTriangle, BsHouse } from 'react-icons/bs';
function NavigationBar(isBlack: boolean = true) {
    useEffect(() => {

    });
    return (<><ul className="navigation">
        <li className="navgation-list" ><BsHouse color={isBlack ? "black" : "white"} /><a style={{ color: isBlack ? "black" : "white" }} className="item" href="/home">Home</a></li>
        <li className="navgation-list" ><BsTriangle color={isBlack ? "black" : "white"} /><a style={{ color: isBlack ? "black" : "white" }} className="item" href="/projects">Projects</a></li>
        <li className="navgation-list" ><BsCircle color={isBlack ? "black" : "white"} /><a style={{ color: isBlack ? "black" : "white" }} className="item" href="/about">About</a></li>
        <li className="navgation-list" ><BsSquare color={isBlack ? "black" : "white"} /><a style={{ color: isBlack ? "black" : "white" }} className="item" href="/contact">Contact</a></li>
    </ul ></>);
}

export default NavigationBar;