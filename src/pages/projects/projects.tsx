import NavigationBar from "../../components/NavigationBar";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import ProjectContainer from "../../components/Project";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
// import { isMobile } from "react-device-detect";
import { gsap } from 'gsap';
import * as THREE from "three";
import { useEffect } from "react";
import "./projects.css"
import React from "react";
function Projects() {
    const isMobile = false
        ;
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
        //checkSizeInit();
        scene.add(pointLabel);
        scene.add(mobileLabel);
        const fbxLoader = new FBXLoader();
        let computerObject = new THREE.Object3D();
        let lampObject = new THREE.Object3D();

        const smallMobileWH: string = "16.5rem";
        const bigMobileWH: string = "35rem";
        const smallWH: string = "30rem";
        const bigWH: string = "40rem";
        fbxLoader.load("models/aio.fbx", (object: any) => {
            checkSizeInit();
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
                mobileLabel.position.set(0, -1.4, 14);
                pointLabel.visible = false;
            }
            if (window.innerWidth <= 600 && pointLabel.visible) {
                object.position.set(0, -1.0, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.007, y: 0.007, z: 0.007 });
                tl.fromTo(projectUl, { delay: 2, width: "0rem", opacity: 0 }, { width: smallWH, opacity: 1 });

            }
            else if (window.innerWidth >= 600 && pointLabel.visible) {
                object.position.set(0, -1.1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                tl.fromTo(projectUl, { delay: 2, width: "0rem", opacity: 0 }, { width: bigWH, opacity: 1 });
            }

            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);

        });



        fbxLoader.load("lamp/lightBulb.fbx", (object: any) => {
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
            if (window.innerWidth <= 600 && pointLabel.visible) {
                object.position.set(0, 1.5, 15.5);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.004, y: 0.004, z: 0.004 });
            }
            else if (window.innerWidth >= 600 && pointLabel.visible) {
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
            "description": "Hello there i was the one of the team member in the govhack team.\nHelloWorld",
            "imgSrc": require('../../../public/assets/backend.png'),
            "techStacks": "JavaScript ‧ ExpressJS ‧ Node JS ‧ Scrum",
            "link": "https://github.com/hanulrheem9218/govhack2023-backend",
        },
        {
            "title": "Multiplayer Shooter \"Orange Koch\"",
            "description": "???",
            "imgSrc": require('../../../public/assets/multiplayerShooter.png'),
            "techStacks": "Unity ‧ C# ‧ Photon Network ‧ Blender ‧ Scrum",
            "link": "https://github.com/dgw7626/COMP602_1_OrangeKoch",
        },
        {
            "title": "OpenGL Helicopter Simulator",
            "description": "???",
            "imgSrc": require('../../../public/assets/helicopterSimulator.png'),
            "techStacks": "OpenGL ‧ C ‧ FreeGLUT",
            "link": "https://github.com/dgw7626/COMP612_Project_Assignment2",
        },
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