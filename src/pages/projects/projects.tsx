import NavigationBar from "../../components/NavigationBar";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import ProjectContainer from "../../components/Project";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { isMobile } from "react-device-detect";
import { gsap } from 'gsap';
import * as THREE from "three";
import { useEffect } from "react";
import "./projects.css"
import React from "react";
function Projects() {
    useEffect(() => {
        document.title = "Projects";
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

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const light = new THREE.PointLight(0xfff8eb, 1, 1000);
        light.position.set(0, 5, 5);
        light.intensity = 20;
        scene.add(light);

        const upperLight = new THREE.PointLight(0xffffff, 1, 100);
        upperLight.position.set(0, -0.7, 14.5);
        upperLight.intensity = 10;
        scene.add(upperLight);

        const lampLight = new THREE.PointLight(0xfff8eb, 1, 100);
        lampLight.position.set(0, 1.5, 15.5);
        lampLight.intensity = 3;
        scene.add(lampLight);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;
        scene.add(camera);

        const tl = gsap.timeline({ defaults: { duration: 0.5 }, });
        const tlRepeat = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.3 });

        tl.to(scene.background, { duration: 1, r: 0.05098, g: 0.05098, b: 0.05098 });
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;

        const labelRenderer = new CSS3DRenderer();
        const mobileRenderer = new CSS2DRenderer();
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
        //init
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = "absolute";
        labelRenderer.domElement.style.top = "0px";
        document.body.appendChild(labelRenderer.domElement);
        //mobile view version
        mobileRenderer.setSize(window.innerWidth, window.innerHeight);
        mobileRenderer.domElement.style.position = "absolute";
        mobileRenderer.domElement.style.top = "0px";
        document.body.appendChild(mobileRenderer.domElement);
        const projectUl = document.querySelector(".project-ul") as HTMLElement;
        const projectMobilelUl = document.querySelector(".mobile-ul") as HTMLElement;
        const pointLabel = new CSS3DObject(projectUl);
        pointLabel.rotateX(-10 * (Math.PI / 180));
        pointLabel.scale.set(0.004, 0.004, 0.004);
        //mobile size.
        const mobileLabel = new CSS2DObject(projectMobilelUl);
        mobileLabel.scale.set(0, 0, 0);
        scene.add(pointLabel);
        scene.add(mobileLabel);
        const fbxLoader = new FBXLoader();
        let computerObject = new THREE.Object3D();
        let lampObject = new THREE.Object3D();

        const smallMobileWH: string = "16.5rem";
        const bigMobileWH: string = "35rem";
        const smallWH: string = "30rem";
        const bigWH: string = "40rem";
        checkSizeInit();
        fbxLoader.load("models/aio.fbx", (object: any) => {
            computerObject = object;
            if (window.innerWidth <= 600 && isMobile) {
                object.position.set(0, -1.0, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.008, y: 0.008, z: 0.008 });
                tl.fromTo(projectMobilelUl, { delay: 2, width: "0rem", opacity: 0 }, { width: smallMobileWH, opacity: 1 });
                projectMobilelUl.style.height = smallMobileWH;
                mobileLabel.position.set(0, -0.2, 14);
                pointLabel.visible = false;
            } else if (isMobile && window.innerWidth >= 600) {
                object.position.set(0, -1.1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                tl.fromTo(projectMobilelUl, { delay: 2, width: "0rem", opacity: 0 }, { width: bigMobileWH, opacity: 1 });
                projectMobilelUl.style.height = bigMobileWH;
                mobileLabel.position.set(0, 0.05, 14);
                pointLabel.visible = false;
            }
            if (window.innerWidth <= 600 && !isMobile) {
                object.position.set(0, -1.0, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.007, y: 0.007, z: 0.007 });
                tl.fromTo(projectUl, { delay: 2, width: "0rem", opacity: 0 }, { width: smallWH, opacity: 1 });

            }
            else if (window.innerWidth >= 600 && !isMobile) {
                object.position.set(0, -1.1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                tl.fromTo(projectUl, { delay: 2, width: "0rem", opacity: 0 }, { width: bigWH, opacity: 1 });
            }

            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);

        });



        fbxLoader.load("models/lightBulb.fbx", (object: any) => {
            //apply the material to the object
            lampObject = object;
            if (window.innerWidth <= 600 && isMobile) {
                object.position.set(0, 1, 17);
                lampLight.position.set(0, 1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.002, y: 0.002, z: 0.002 });

            } else if (isMobile && window.innerWidth >= 600) {
                object.position.set(0, 1, 17);
                lampLight.position.set(0, 1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.002, y: 0.002, z: 0.002 });

            }
            if (window.innerWidth <= 600 && !isMobile) {
                object.position.set(0, 1.5, 15.5);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.004, y: 0.004, z: 0.004 });
            }
            else if (window.innerWidth >= 600 && !isMobile) {
                object.position.set(0, 1.5, 15.5);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.004, y: 0.004, z: 0.004 });

            }

            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(180 * (Math.PI / 180));
            //  tlRepeat.to(object.position, { duration: 2, y: 5., ease: "back.inout" });
            tlRepeat.fromTo(lampLight, { duration: 0.5, intensity: 2 }, { intensity: 1 });
            scene.add(object);

        });

        //window conditions.
        window.addEventListener("resize", onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            checkSize();
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (!isMobile) {
                labelRenderer.setSize(window.innerWidth, window.innerHeight);
            } else {
                mobileRenderer.setSize(window.innerWidth, window.innerHeight);
            }
        }
        function checkSizeInit() {
            if (projectUl == null || projectMobilelUl == null) {
                return;
            }
            if (isMobile && window.innerWidth <= 600) {
                labelRenderer.domElement.style.width = "0px";
                mobileLabel.position.set(0, -0.2, 14);
                projectMobilelUl.style.width = "16.5rem";
                projectMobilelUl.style.height = "16.5rem";
                pointLabel.visible = false;
            } else if (isMobile && window.innerWidth >= 600) {
                labelRenderer.domElement.style.width = "0px";
                mobileLabel.position.set(0, -1.4, 14);
                projectMobilelUl.style.width = "35rem";
                projectMobilelUl.style.height = "35rem";
                pointLabel.visible = false;
            }

            if (window.innerWidth <= 600 && pointLabel.visible) {
                mobileRenderer.domElement.style.width = "0px";
                projectMobilelUl.style.visibility = "hidden";
                projectUl.style.width = "30rem";
                projectUl.style.height = "30rem";
                pointLabel.position.set(0, -0.4, 14);
            }
            else if (window.innerWidth >= 600 && pointLabel.visible) {
                mobileRenderer.domElement.style.width = "0px";
                projectMobilelUl.style.visibility = "hidden";
                projectUl.style.width = "40rem";
                projectUl.style.height = "40rem";
                pointLabel.position.set(0, 0.05, 14);
            }
        }

        function checkSize() {
            if (computerObject == null || projectUl == null || projectMobilelUl == null) {
                return;
            }
            if (window.innerWidth <= 600 && isMobile) {
                computerObject.position.set(0, -1.0, 17);
                computerObject.scale.set(0.008, 0.008, 0.008);
                mobileLabel.position.set(0, -0.2, 14);
                projectMobilelUl.style.width = "16.5rem";
                projectMobilelUl.style.height = "16.5rem";
                pointLabel.visible = false;
                lampObject.position.set(0, 1, 17);
                lampLight.position.set(0, 1, 17);
            } else if (isMobile && window.innerWidth >= 600) {
                mobileLabel.position.set(0, -0.1, 0);
                projectMobilelUl.style.width = "30rem";
                projectMobilelUl.style.height = "30rem";
                computerObject.position.set(0, -1.1, 17);
                computerObject.scale.set(0.01, 0.01, 0.01);
                lampObject.position.set(0, 1, 17);
                lampLight.position.set(0, 1, 17);
            }

            if (window.innerWidth <= 600 && pointLabel.visible) {
                computerObject.position.set(0, -1.0, 17);
                computerObject.scale.set(0.007, 0.007, 0.007);
                projectUl.style.width = "30rem";
                projectUl.style.height = "30rem";
                pointLabel.position.set(0, -0.4, 14);
                lampObject.position.set(0, 1.5, 15.5);
            } else if (window.innerWidth >= 600 && pointLabel.visible) {
                computerObject.position.set(0, -1.1, 17);
                computerObject.scale.set(0.01, 0.01, 0.01);
                projectUl.style.width = "40rem";
                projectUl.style.height = "40rem";
                pointLabel.position.set(0, 0.05, 14);
                lampObject.position.set(0, 1.5, 15.5);
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
            mobileRenderer.render(scene, camera);
        }

        animate();
    });

    const projectInfo = [
        {
            "title": "Government Hackathon 2023 \"Backend Server\"",
            "description": "This project serves as the backend server for Green Kiwi and is written in Express.js, And I was assigned as the backend developer. I was given just two days to develop the backend server during the competition, and although I was new to Express.js, with the team, I was able to successfully complete the backend server. This experience taught me that achieving fast production results requires both knowledge and the ability to work effectively as part of a team."
                + "\n\nFeatures "
                + "\n-Getting post/user informations"
                + "\n-Updating post/user informations"
                + "\n-Posting post/user informations"
                + "\n-Deleting post"
                + "\n-Firebase login authentication/authroisation",
            "imgSrc": "./assets/backend.png",
            "techStacks": "JavaScript ‧ ExpressJS ‧ Node JS ‧ Scrum",
            "link": "https://github.com/hanulrheem9218/govhack2023-backend",
        },
        {
            "title": "Multiplayer Shooter \"Orange Koch\"",
            "description": "This is a multiplayer First Person Shooter (FPS) game that allows up to 16 players to engage in intense battles with other players online. The game features various mechanics, including push to talk for voice communication, movement with WASD keys, jumping with the spacebar, sprinting with the shift key, showing scores with the Tab key, muting voice chat with the M key, and firing weapons by clicking the mouse button."
                + "\n\nFeatures "
                + "\n-Team-based gameplay: Join a team and collaborate with your teammates to defeat the opposing team."
                + "\n-Weapon selection: Choose from a variety of weapons with different characteristics and abilities."
                + "\n-Maps and environments: Explore the map in high definition."
                + "\n-Adaptive resolution: Resizable window mode"
                + "\n-Customizable Settings: Customize Mouse Sensitivity and Y-Axis Inversion",
            "imgSrc": "./assets/multiplayerShooter.png",
            "techStacks": "Unity ‧ C# ‧ Photon Network ‧ Blender ‧ Scrum",
            "link": "https://github.com/dgw7626/COMP602_1_OrangeKoch",
        },
        {
            "title": "OpenGL \"Helicopter Simulator\"",
            "description": "This is my final project for Assignment 2 in COMP612. I used FreeGLUT and OpenGL to implement a rescue scene involving a helicopter. The project is written in C, and most of the methods are implemented from scratch to utilize 3D math. The main features include a particle system and features like transform, vector3f, etc. I learned how to use OpenGL graphics and started to understand the architecture of the fixed rendering pipeline and other architectures."
                + "\n\nFeatures "
                + "\n-Controller for the Helicopter (WASD) for movements, (Arrow keys) for rotations."
                + "\n-Visual Effect feature that implements particle system for the rain and fire."
                + "\n-Animated tiled based sea ground plane."
                + "\n-OBJ Exporter for the OpenGL"
                + "\n-Animated Helicopter, Windmill, Light House"
                + "\n-Smooth movement controller"
                + "\n-Realtime ambient lights and directional light.",
            "imgSrc": "./assets/helicopterSimulator.png",
            "techStacks": "OpenGL ‧ C ‧ FreeGLUT",
            "link": "https://github.com/dgw7626/COMP612_Project_Assignment2",
        },
        {
            "title": "Hanul Rheem Portfolio Website",
            "description": "Created a simple Three.js-based website that showcases my projects and introduces myself. I used HTML, CSS, React, Vite, Three.js, GSAP, and TypeScript to implement this 3D website. The website is hosted on Vercel."
                + "\n\nFeatures "
                + "\n-Animated 3D objects from homepage."
                + "\n-Compatible Desktop & Mobile web application"
                + "\n-Screen effect on the about me page."
                + "\n-Moveable 3d Objects and allows user to input and submit."
                + "\n-Email system feature for the contact page."
                + "\n-Animated point lights."
                + "\n-Low poly based 3d assets.",
            "imgSrc": "./assets/portfolioWeb.png",
            "techStacks": "ThreeJS ‧ TypeScript ‧ ViteJS ‧ React",
            "link": "https://github.com/hanulrheem9218/hanul-rheem-frontend"
        }
    ]

    return (<>
        <canvas className="webgl" />
        {NavigationBar(false)}
        <div className="project-ul">
            {projectInfo.map((value, index) => { return <React.Fragment key={index}>{ProjectContainer(value.title, value.description, value.imgSrc, value.techStacks, value.link, index)};</React.Fragment> })}
        </div>
        <div className="mobile-ul">
            {projectInfo.map((value, index) => { return <React.Fragment key={index}>{ProjectContainer(value.title, value.description, value.imgSrc, value.techStacks, value.link, index)};</React.Fragment> })}
        </div>
    </>)

}
export default Projects;