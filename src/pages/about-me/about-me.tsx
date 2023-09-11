/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import NavigationBar from '../../components/NavigationBar';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { gsap } from 'gsap';
import "./AboutMe.css"
import { isMobile } from 'react-device-detect';
import { PiLinkedinLogoDuotone } from "react-icons/pi";
function About() {
    useEffect(() => {
        document.title = "About";
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("white");


        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 10, 10);
        light.intensity = 200;
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;
        scene.add(camera);

        const tl = gsap.timeline({ defaults: { duration: 0.5 }, });
        const tlRepeat = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0 });
        const canvas = document.querySelector(".webgl") as HTMLElement;
        const labelRenderer = new CSS3DRenderer();
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        //init
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = "absolute";
        labelRenderer.domElement.style.top = "0px";
        document.body.appendChild(labelRenderer.domElement);
        const resume = document.querySelector(".resume-link") as HTMLElement;
        const connect = document.querySelector(".connect-link") as HTMLElement;
        const aboutContainer = document.querySelector(".about-container") as HTMLElement;
        const aboutLabel = new CSS3DObject(aboutContainer);
        aboutLabel.position.set(0, 0, 5);
        aboutLabel.rotateX(0 * (Math.PI / 180));
        aboutLabel.scale.set(0.01, 0.01, 0.01);
        scene.add(aboutLabel);

        const orbitControls = new OrbitControls(camera, labelRenderer.domElement);

        orbitControls.enableDamping = true;
        orbitControls.enablePan = false;
        orbitControls.enableZoom = false;

        gsap.to(scene.background, { duration: 1, r: 0, g: 0, b: 0 });
        gsap.to(".about-container", { duration: 1.2, width: "34rem" });
        gsap.to(".about-container", { delay: 1.2, duration: 0.2, height: "22rem", opacity: 1 });
        tlRepeat.fromTo(".about-container", { opacity: 0.6 }, { duration: 2, opacity: 1 });
        //loading the fbxs

        let computerObject = new THREE.Object3D();
        const fbxLoader = new FBXLoader();
        fbxLoader.load("models/highComputer.fbx", (object: any) => {
            //change adustments here.
            computerObject = object;
            if (window.innerWidth <= 600 && isMobile) {
                aboutLabel.position.set(0, 2, 4);
                aboutLabel.scale.set(0.011, 0.011, 0.011);
                tl.fromTo(object.scale, { x: 0, y: 0.03, z: 0 }, { x: 0.04, y: 0.04, z: 0.04 });
                object.position.set(0, -2, 0);
            } else if (isMobile && window.innerWidth >= 600) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.01, 0.01, 0.01);
                tl.fromTo(object.scale, { x: 0, y: 0.05, z: 0 }, { x: 0.05, y: 0.05, z: 0.05 });
                object.position.set(0, -4, 0);
            }
            if (window.innerWidth <= 860 && !isMobile) {
                aboutLabel.position.set(0, 2, 4);
                aboutLabel.scale.set(0.011, 0.011, 0.011);
                tl.fromTo(object.scale, { x: 0, y: 0.03, z: 0 }, { x: 0.04, y: 0.04, z: 0.04 });
                object.position.set(0, -2, 0);
            } else if (window.innerWidth >= 860 && !isMobile) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.01, 0.01, 0.01);
                tl.fromTo(object.scale, { x: 0, y: 0.05, z: 0 }, { x: 0.05, y: 0.05, z: 0.05 });
                object.position.set(0, -4, 0);
            }
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);

        });

        //window conditions.
        window.addEventListener("resize", onWindowResize, false);
        connect.addEventListener("click", () => { window.open(import.meta.env.VITE_LINKEDIN, "_blank") }, false);
        resume.addEventListener("click", () => { window.open(import.meta.env.VITE_RESUME, "_blank") }, false);
        function onWindowResize() {
            checkSize();
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setSize(window.innerWidth, window.innerHeight);

        }
        function checkSize() {

            if (window.innerWidth <= 600 && isMobile) {
                aboutLabel.position.set(0, 2, 4);
                aboutLabel.scale.set(0.011, 0.011, 0.011);
                computerObject.scale.set(0.04, 0.04, 0.04);
                computerObject.position.set(0, -2, 0);
            } else if (isMobile && window.innerWidth >= 600) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.01, 0.01, 0.01);
                computerObject.scale.set(0.05, 0.05, 0.05);
                computerObject.position.set(0, -4, 0);
            }
            if (window.innerWidth <= 860 && !isMobile) {
                aboutLabel.position.set(0, 2, 4);
                aboutLabel.scale.set(0.011, 0.011, 0.011);
                computerObject.scale.set(0.04, 0.04, 0.04);
                computerObject.position.set(0, -2, 0);

            } else if (window.innerWidth >= 860 && !isMobile) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.01, 0.01, 0.01);
                computerObject.scale.set(0.05, 0.05, 0.05);
                computerObject.position.set(0, -4, 0);
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            orbitControls.update();
            //camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            labelRenderer.render(scene, camera);
            renderer.render(scene, camera);
        }

        animate();

    });
    return (<>
        {NavigationBar(false)}
        <canvas className="webgl" />

        <ul className="about-container">
            <li><b>-About Me-</b></li>
            <li>Hardcore Gamer</li>
            <li>Passionate Developer</li>
            <li>3D Lover</li>
            <li>Bachelor of Computer and Information Science Undergraduate Final Year Student</li>
            <li><PiLinkedinLogoDuotone style={{ width: "50px", height: "50px" }} /><div className="connect-link">CONNECT ME!</div><div className="resume-link">RESUME</div></li>
        </ul>
    </>)

}

export default About;