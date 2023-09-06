/* eslint-disable @typescript-eslint/no-explicit-any */
import "./contact.css";
import { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import NavigationBar from '../../components/NavigationBar';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { gsap } from 'gsap';

function Contact() {
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
        gsap.to(scene.background, { duration: 1, r: 0.953, g: 0.933, b: 0.902 });
        gsap.fromTo(".email-ul", { duration: 1, opacity: 0 }, { duration: 1, opacity: 1 });
        //loading the fbxs
        const fbxLoader = new FBXLoader();
        fbxLoader.load("models/book.fbx", (object: any) => {
            //change adustments here.
            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.3, y: 0.3, z: 0.3 });
            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(1.4);
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
    const form: string | HTMLFormElement | any = useRef();
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_1dnqwfb', 'template_jjpb20c', form.current, '0qWVv8o9g1RAbo5fG')
            .then((result: any) => {
                console.log(result.text);
                console.log("Message Sent");
                alert("Message Sent");
            }, (error: any) => {
                console.log(error.text);
            });
    };
    return (<>
        {NavigationBar(true)}
        <canvas className="webgl" />
        <div className="controlPanel">

            <form className="email-section" ref={form} onSubmit={sendEmail}>
                <ul className="email-ul">
                    <li className="email-li">+64211472096 , Auckland CBD</li>
                    <li className="email-li"> <label><b>Name:</b></label></li>
                    <li className="email-li"><input style={{ backgroundColor: "#eee7d7", border: "1px #5d4d2c solid", fontFamily: "'Crimson Text', serif" }} type="text" name="from_name" /></li>
                    <li className="email-li"> <label><b>Email:</b></label></li>
                    <li className="email-li"> <input style={{ backgroundColor: "#eee7d7", border: "1px #5d4d2c solid", fontFamily: "'Crimson Text', serif" }} type="email" name="from_email" /></li>
                    <li className="email-li"> <label><b>Message:</b></label></li>
                    <li className="email-li"><textarea style={{ resize: "none", width: "100%", height: "50vh", backgroundColor: "#eee7d7", border: "1px #5d4d2c solid", fontFamily: "'Crimson Text', serif" }} name="message" /> </li>
                    <li className="email-li"> <input style={{ display: "flex", width: "100%", border: "1px #5d4d2c solid", height: "30px", backgroundColor: "#ae9156", fontWeight: 800 }} type="submit" value="Send" /></li>
                </ul>


            </form></div></>)
}

export default Contact;