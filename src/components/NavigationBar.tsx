import "./NavigationBar.css";
import { gsap } from "gsap";
import { useEffect } from "react";
import { BsCircle, BsSquare, BsTriangle } from 'react-icons/bs';
function NavigationBar(navColor: boolean = true) {
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.1 } });
        const projectText = document.querySelector(".project") as HTMLElement;
        const aboutText = document.querySelector(".about") as HTMLElement;
        const contactText = document.querySelector(".contact") as HTMLElement;
        projectText.addEventListener("mouseenter", () => { tl.to(".project", { fontWeight: 800 }) }, false);
        projectText.addEventListener("mouseleave", () => { tl.to(".project", { fontWeight: 100 }) }, false);
        aboutText.addEventListener("mouseenter", () => { tl.to(".about", { fontWeight: 800 }) }, false);
        aboutText.addEventListener("mouseleave", () => { tl.to(".about", { fontWeight: 100 }) }, false);
        contactText.addEventListener("mouseenter", () => { tl.to(".contact", { fontWeight: 800 }) }, false);
        contactText.addEventListener("mouseleave", () => { tl.to(".contact", { fontWeight: 100 }) }, false);

    });
    return (<><ul className="navigation">
        <li className="navgation-list"><BsSquare color={navColor ? "black" : "white"} /><a className="project" href="/project">Projects</a></li>
        <li className="navgation-list"><BsTriangle color={navColor ? "black" : "white"} /><a className="about" href="/about">About Me</a></li>
        <li className="navgation-list"><BsCircle color={navColor ? "black" : "white"} /><a className="contact" href="/contact">Contacts</a></li></ul ></>);
}

export default NavigationBar;