/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import * as THREE from 'three';
import NavigationBar from '../../components/NavigationBar';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { gsap } from 'gsap';
import "./AboutMe.css"
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

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;
        scene.add(camera);

        const tl = gsap.timeline({ defaults: { duration: 0.5 }, });
        const tlRepeat = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

        //tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
        tlRepeat.to(mesh.position, { duration: 5, y: 0.3, ease: "back.inout" });
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
        //init
        renderer.setSize(window.innerWidth, window.innerHeight);
        const controlPanel = document.querySelector(".controlPanel") as HTMLElement;
        const orbitControls = new OrbitControls(camera, controlPanel);

        orbitControls.enableDamping = true;
        orbitControls.enablePan = false;
        orbitControls.enableZoom = false;

        gsap.to(scene.background, { duration: 1, r: 0, g: 0, b: 0 });
        gsap.to(".about-container", { duration: 1, opacity: 1 });
        //loading the fbxs
        const fbxLoader = new FBXLoader();
        fbxLoader.load("models/blankComputer.fbx", (object: any) => {
            //change adustments here.
            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.05, y: 0.05, z: 0.05 });
            object.position.set(0, -10, 0);
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);

        },
            (xhr: any) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error: any) => {
                console.log(error)
            });

        //window conditions.
        window.addEventListener("resize", onWindowResize, false);


        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            orbitControls.update();
            //camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }

        animate();
    });
    return (<>
        {NavigationBar(false)}
        <canvas className="webgl" />
        <div className="controlPanel">

            <ul className="about-container">

                <li><b>About Me</b></li>
                <li>Gamer</li>
                <li>Passionate Developer</li>
                <li>Digital Artist</li>
                <li>Iam a undergraudate computer sciene who is looking for the job.</li>
                <li>Passinate about art and 3d modelling.</li>
            </ul>
        </div></>)

}

export default About;