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
function About() {
    useEffect(() => {
        document.title = "About";
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("white");
        //testing geomoetry
        const geometry = new THREE.SphereGeometry(3, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: "#00ff83",
            roughness: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0, 0, 0);
        scene.add(mesh);

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
        const tlRepeat = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

        //tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
        tlRepeat.to(mesh.position, { duration: 5, y: 0.3, ease: "back.inout" });
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;
        const labelRenderer = new CSS3DRenderer();
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
        //init
        renderer.setSize(window.innerWidth, window.innerHeight);

        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = "absolute";
        labelRenderer.domElement.style.top = "0px";
        document.body.appendChild(labelRenderer.domElement);

        const aboutContainer = document.querySelector(".about-container") as HTMLElement;
        const aboutLabel = new CSS3DObject(aboutContainer);
        aboutLabel.position.set(0, 0, 5);
        aboutLabel.scale.set(0.01, 0.01, 0.01);
        scene.add(aboutLabel);

        const orbitControls = new OrbitControls(camera, labelRenderer.domElement);

        orbitControls.enableDamping = true;
        orbitControls.enablePan = false;
        orbitControls.enableZoom = false;

        gsap.to(scene.background, { duration: 1, r: 0, g: 0, b: 0 });
        gsap.to(".about-container", { duration: 1, opacity: 1 });
        //loading the fbxs

        let computerObject = new THREE.Object3D();
        const fbxLoader = new FBXLoader();
        fbxLoader.load("models/highComputer.fbx", (object: any) => {
            //change adustments here.
            computerObject = object;
            if (window.innerWidth <= 600 && isMobile) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.008, 0.008, 0.008);
                tl.fromTo(object.scale, { x: 0, y: 0.05, z: 0 }, { x: 0.03, y: 0.03, z: 0.03 });
                object.position.set(0, -2, 0);
            } else if (isMobile && window.innerWidth >= 600) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.01, 0.01, 0.01);
                tl.fromTo(object.scale, { x: 0, y: 0.05, z: 0 }, { x: 0.05, y: 0.05, z: 0.05 });
                object.position.set(0, -4, 0);
            }
            if (window.innerWidth <= 860 && !isMobile) {
                aboutLabel.position.set(0, 1, 3);
                aboutLabel.scale.set(0.008, 0.008, 0.008);
                tl.fromTo(object.scale, { x: 0, y: 0.05, z: 0 }, { x: 0.03, y: 0.03, z: 0.03 });
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

        function onWindowResize() {
            checkSize();
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setSize(window.innerWidth, window.innerHeight);

        }
        function checkSize() {

            if (window.innerWidth <= 600 && isMobile) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.008, 0.008, 0.008);
                computerObject.scale.set(0.03, 0.03, 0.03);
                computerObject.position.set(0, -2, 0);
            } else if (isMobile && window.innerWidth >= 600) {
                aboutLabel.position.set(0, 1, 5);
                aboutLabel.scale.set(0.01, 0.01, 0.01);
                computerObject.scale.set(0.05, 0.05, 0.05);
                computerObject.position.set(0, -4, 0);
            }
            if (window.innerWidth <= 860 && !isMobile) {
                aboutLabel.position.set(0, 1, 3);
                aboutLabel.scale.set(0.008, 0.008, 0.008);
                computerObject.scale.set(0.03, 0.03, 0.03);
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
            <li><b>About Me</b></li>
            <li>Gamer</li>
            <li>Passionate Developer</li>
            <li>Digital Artist</li>
            <li>Iam a undergraudate computer sciene who is looking for the job.</li>
            <li>Passinate about art and 3d modelling.</li>
        </ul>
    </>)

}

export default About;