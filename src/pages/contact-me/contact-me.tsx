/* eslint-disable @typescript-eslint/no-explicit-any */
import "./contact.css";
import { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import NavigationBar from '../../components/NavigationBar';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { gsap } from 'gsap';
import { isMobile } from "react-device-detect";

function Contact() {
    const form: string | HTMLFormElement | any = useRef(null);
    const sendEmail = (e: any) => {
        let errLog: string = "";
        if (form.current[0].value.trim() === "") {
            errLog += ("Name: Please insert name\n");
        }
        if (form.current[1].value.trim() === "") {
            errLog += ("Email: Please insert email\n");
        }
        if (form.current[2].value.trim() === "") {
            errLog += ("Message: Please insert message\n");
        }
        if (errLog !== "") {
            alert(errLog);
            return;
        }

        e.preventDefault();
        emailjs.sendForm(import.meta.env.VITE_SERVICE_API, import.meta.env.VITE_TEMPLATE_API, form.current, import.meta.env.VITE_EMAIL_API)
            .then((result: any) => {
                alert("Message Sent");
                console.log("Message Status: " + result.text);
            }, (error: any) => {
                console.log(error.text);
            }).catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {

        document.title = "Contact";
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 10);
        ambientLight.position.set(0, 10, 10);
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
        labelRenderer.domElement.style.top = "0px";
        labelRenderer.domElement.style.position = "absolute";
        document.body.appendChild(labelRenderer.domElement);
        const orbitControls = new OrbitControls(camera, labelRenderer.domElement);

        orbitControls.enableDamping = true;
        orbitControls.enablePan = false;
        orbitControls.enableZoom = false;
        gsap.to(scene.background, { duration: 1, r: 0.953, g: 0.933, b: 0.902 });
        gsap.fromTo(".email-ul", { opacity: 0, width: "0rem" }, { duration: 1, opacity: 1, width: "40rem" });

        const contact = document.querySelector(".email-section") as HTMLElement;
        const contactLabel = new CSS3DObject(contact);
        contactLabel.position.set(0, 0, 1);
        contactLabel.scale.set(0.01, 0.01, 0.01);
        scene.add(contactLabel);
        if (isMobile) {
            document.addEventListener("click", (event: any) => {
                if (event.target === null) {
                    return;
                }
                if (event.target.className === "email-submit") {
                    sendEmail(event);
                }
            });
        } else {
            document.addEventListener("mousedown", (event: any) => {
                if (event.target === null) {
                    return;
                }
                if (event.target.className === "email-submit") {
                    sendEmail(event);
                }
            });
        }
        let smartPhone = new THREE.Object3D();

        const emailInput = document.querySelector(".email-input") as HTMLElement;
        const textInput = document.querySelector(".text-input") as HTMLElement;
        const nameInput = document.querySelector(".name-input") as HTMLElement;
        const emailButton = document.querySelector(".email-submit") as HTMLElement;

        const fbxLoader = new FBXLoader();
        fbxLoader.load("models/modernSmartPhone.fbx", (object: any) => {
            smartPhone = object;
            if (window.innerWidth <= 540 && isMobile) {

                tl.fromTo(object.scale, { x: 0, y: 0.06, z: 0 }, { x: 0.06, y: 0.06, z: 0.06 });
                contactLabel.position.set(0, -0.5, 1);
                object.position.set(0, -1, 0);

                contact.style.fontSize = "2rem";
                nameInput.style.fontSize = "2rem";
                textInput.style.fontSize = "2rem";
                emailInput.style.fontSize = "2rem";
                emailButton.style.height = "3rem";
            } else if (isMobile && window.innerWidth >= 540) {
                tl.fromTo(object.scale, { x: 0, y: 0.06, z: 0 }, { x: 0.06, y: 0.06, z: 0.06 });
                contactLabel.position.set(0, 0, 1);
                object.position.set(0, -0.5, 0);
                contact.style.fontSize = "2rem";
                nameInput.style.fontSize = "2rem";
                textInput.style.fontSize = "2rem";
                emailInput.style.fontSize = "2rem";
                emailButton.style.height = "3rem";
            }
            if (window.innerWidth <= 540 && !isMobile) {
                tl.fromTo(object.scale, { x: 0, y: 0.06, z: 0 }, { x: 0.06, y: 0.06, z: 0.06 });
                contactLabel.position.set(0, -0.5, 1);
                object.position.set(0, -1, 0);
                contact.style.fontSize = "1.5rem";
                nameInput.style.fontSize = "1.5rem";
                textInput.style.fontSize = "1.5rem";
                emailInput.style.fontSize = "1.5rem";
                emailButton.style.height = "2rem";
            }
            else if (window.innerWidth >= 540 && !isMobile) {
                tl.fromTo(object.scale, { x: 0, y: 0.06, z: 0 }, { x: 0.06, y: 0.06, z: 0.06 });
                contactLabel.position.set(0, 0, 1);
                object.position.set(0, -0.5, 0);

                contact.style.fontSize = "1.5rem";
                nameInput.style.fontSize = "1.5rem";
                textInput.style.fontSize = "1.5rem";
                emailInput.style.fontSize = "1.5rem";
                emailButton.style.height = "2rem";
            }

            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);

        });

        //window conditions.
        window.addEventListener("resize", onWindowResize, false);


        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            checkSize();
        }
        function checkSize() {
            if (window.innerWidth <= 540 && isMobile) {
                contactLabel.position.set(0, -0.5, 1);
                smartPhone.scale.set(0.06, 0.06, 0.06);
                smartPhone.position.set(0, -1, 0);
                contact.style.fontSize = "2rem";
                nameInput.style.fontSize = "2rem";
                textInput.style.fontSize = "2rem";
                emailInput.style.fontSize = "2rem";
                emailButton.style.height = "3rem";
            } else if (isMobile && window.innerWidth >= 540) {
                smartPhone.scale.set(0.06, 0.06, 0.06);
                contactLabel.position.set(0, 0, 1);
                smartPhone.position.set(0, -0.5, 0);
                contact.style.fontSize = "2rem";
                nameInput.style.fontSize = "2rem";
                textInput.style.fontSize = "2rem";
                emailInput.style.fontSize = "2rem";
                emailButton.style.height = "3rem";
            }
            if (window.innerWidth <= 540 && !isMobile) {
                contactLabel.position.set(0, -0.5, 1);
                smartPhone.scale.set(0.06, 0.06, 0.06);
                smartPhone.position.set(0, -1, 0);
            }
            else if (window.innerWidth >= 540 && !isMobile) {
                smartPhone.scale.set(0.06, 0.06, 0.06);
                contactLabel.position.set(0, 0, 1);
                smartPhone.position.set(0, -0.5, 0);
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            orbitControls.update();
            //camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        }

        animate();
    });

    return (<>
        {NavigationBar(true)}
        <canvas className="webgl" />
        <form className="email-section" ref={form} >
            <ul className="email-ul">
                <li className="email-li">+64211472096 , Auckland CBD</li>
                <li className="email-li"> <label><b>Name:</b></label></li>
                <li className="email-li"><input className="name-input" type="text" name="from_name" /></li>
                <li className="email-li"> <label><b>Email:</b></label></li>
                <li className="email-li"> <input className="email-input" /></li>
                <li className="email-li"> <label><b>Message:</b></label></li>
                <li className="email-li"><textarea className="text-input" name="message" /> </li>
                <li className="email-li"> <div className="email-submit">Send</div></li>
            </ul>


        </form></>)
}

export default Contact;