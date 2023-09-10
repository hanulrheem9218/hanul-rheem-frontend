import { ScreenSize } from "../../interface/screen_size";
import { gsap } from "gsap";
import { useEffect } from 'react';
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import './home.css';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
function Home() {
    useEffect(() => {
        const isMobile = true;
        document.title = "hanul-rheem";
        const screen: ScreenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("white");
        const c_white = 0xffffff;
        //create three meshes 

        //othgraphic view in three js.
        const left = -screen.width / 2;
        const right = screen.width / 2;
        const top = screen.height / 2;
        const bottom = -screen.height / 2;
        const near = 0.1;
        const far = 100;

        const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        camera.position.z = 35;
        camera.zoom = 20;
        scene.add(camera);


        const directionalLight = new THREE.DirectionalLight(c_white, 20);
        directionalLight.rotateX(20 * (Math.PI / 180));
        scene.add(directionalLight);

        //Setting up the lights
        const light = new THREE.AmbientLight(c_white, 1);
        light.position.set(0, 0, 25);
        light.intensity = 3;
        scene.add(light);
        //timeline
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        //mobile

        if (!isMobile) {
            tl.fromTo(".title", { opacity: 0, top: 0 }, { opacity: 1, top: "30%" });
            tl.fromTo('.content-list', { opacity: 0 }, { opacity: "100%" });
        }

        const canvas = document.querySelector(".webgl") as HTMLElement;

        const labelRenderer = new CSS2DRenderer();
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(4);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.top = "0px";
        labelRenderer.domElement.style.position = "absolute";
        document.body.appendChild(labelRenderer.domElement);
        const title = document.querySelector(".title") as HTMLElement;
        const contentList = document.querySelector(".content-list") as HTMLElement;

        let computerObject = new THREE.Object3D();
        let floppyObject = new THREE.Object3D();
        let phoneObject = new THREE.Object3D();

        //css objects
        const project = document.querySelector(".project") as HTMLElement;
        const contact = document.querySelector(".contact") as HTMLElement;
        const about = document.querySelector(".about") as HTMLElement;
        const mobileTitle = document.querySelector(".mobile-title") as HTMLElement;
        const projectLabel = new CSS2DObject(project);
        const contactLabel = new CSS2DObject(contact);
        const aboutLabel = new CSS2DObject(about);
        const titleLabel = new CSS2DObject(mobileTitle);
        projectLabel.position.set(0, 0, 0);
        contactLabel.position.set(0, 0, 0);
        aboutLabel.position.set(0, 0, 0);
        scene.add(projectLabel);
        scene.add(contactLabel);
        scene.add(aboutLabel);
        scene.add(titleLabel);
        tl.fromTo(mobileTitle, { opacity: 0 }, { opacity: 1 });
        tl.fromTo([project, contact, about], { opacity: 0 }, { opacity: 1 });
        const fbxLoader = new FBXLoader();
        fbxLoader.load("models/tablet.fbx", (object: any) => {
            if (isMobile && window.innerWidth <= 511) {
                title.style.visibility = "hidden";
                contentList.style.visibility = "hidden";
                titleLabel.position.set(0, 13, 0);
                projectLabel.position.set(0, 5, 0);
                contactLabel.position.set(0, -12, 0);
                aboutLabel.position.set(0, -4, 0);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { delay: 1, x: 0.2, y: 0.2, z: 0.2 });
                object.position.set(0, -1, 10);
            } else if (isMobile && window.innerWidth >= 511) {
                title.style.visibility = "hidden";
                contentList.style.visibility = "hidden";
                titleLabel.position.set(0, 8, 0);
                projectLabel.position.set(-8, -2.5, 0);
                contactLabel.position.set(8, -2.5, 0);
                aboutLabel.position.set(0, -2.5, 0);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { delay: 1, x: 0.2, y: 0.2, z: 0.2 });
                object.position.set(0, -1, 10);
            }

            if (!isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { delay: 1, x: 0.2, y: 0.2, z: 0.2 });
                object.position.set(0, -1, 10);
            } else if (!isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { delay: 1, x: 0.2, y: 0.2, z: 0.2 });
                object.position.set(0, -1, 10);
            }

            object.rotateX(90 * (Math.PI / 180));
            scene.add(object);

        });
        //computer
        fbxLoader.load("models/blankComputer.fbx", (object: any) => {
            //apply the material to the object
            computerObject = object;
            if (isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0.02, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, -2, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0.02, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, -1, 20);
            }
            if (!isMobile) {
                tl.fromTo(object.scale, { x: 0, y: 0.02, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, -1, 20);
            }
            //object.scale.set(0.3, 0.3, 0.3);
            // computer.rotateX(0 * (Math.PI / 180));
            object.rotateY(-65 * (Math.PI / 180));
            scene.add(object);
            function animate() {
                requestAnimationFrame(animate);
                object.rotateY(0.003);
                renderer.render(scene, camera);
            }
            animate();
        });
        //folder
        fbxLoader.load("models/floppyDisk.fbx", (object: any) => {
            //apply the material to the object
            floppyObject = object;
            if (isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0.01, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, 9, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0.01, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(-8, 1, 20);
            }
            if (!isMobile) {
                tl.fromTo(object.scale, { x: 0, y: 0.01, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(-8, 1, 20);
            }


            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(90 * (Math.PI / 180));

            scene.add(object);
            function animate() {
                requestAnimationFrame(animate);
                object.rotateY(0.002);
                renderer.render(scene, camera);
            }
            animate();
        });
        fbxLoader.load("models/modernSmartPhone.fbx", (object: any) => {
            //apply the material to the object
            phoneObject = object;
            if (isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0.015, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, -8, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0.01, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(8, 1, 20);
            }
            if (!isMobile) {

                tl.fromTo(object.scale, { x: 0, y: 0.01, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(8, 3, 20);
            }

            //object.scale.set(0.3, 0.3, 0.3);
            // computer.rotateX(0 * (Math.PI / 180));
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);
            function animate() {
                requestAnimationFrame(animate);
                object.rotateY(0.005);
                renderer.render(scene, camera);

            }
            animate();
        });

        function animate() {
            requestAnimationFrame(animate);
            camera.updateProjectionMatrix();
            labelRenderer.render(scene, camera);
        }
        animate();
        //listening to the event listener resize.
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            screen.width = window.innerWidth;
            screen.height = window.innerHeight;
            camera.left = -screen.width / 2;
            camera.right = screen.width / 2;
            camera.top = screen.height / 2;
            camera.bottom = -screen.height / 2;
            checkSize();
            camera.updateProjectionMatrix();

            renderer.setSize(screen.width, screen.height);
            labelRenderer.setSize(screen.width, screen.height);
        }
        function checkSize() {
            if (isMobile && window.innerWidth <= 511) {
                titleLabel.position.set(0, 13, 0);
                projectLabel.position.set(0, 5, 0);
                contactLabel.position.set(0, -12, 0);
                aboutLabel.position.set(0, -4, 0);

                computerObject.scale.set(0.02, 0.02, 0.02);
                computerObject.position.set(0, -2, 20);

                floppyObject.scale.set(0.02, 0.02, 0.02);
                floppyObject.position.set(0, 9, 20);

                phoneObject.scale.set(0.02, 0.02, 0.02);
                phoneObject.position.set(0, -8, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                titleLabel.position.set(0, 8, 0);
                projectLabel.position.set(-8, -2.5, 0);
                contactLabel.position.set(8, -2.5, 0);
                aboutLabel.position.set(0, -2.5, 0);


                computerObject.scale.set(0.02, 0.02, 0.02);
                computerObject.position.set(0, -1, 20);

                floppyObject.scale.set(0.02, 0.02, 0.02);
                floppyObject.position.set(-8, 1, 20);

                phoneObject.scale.set(0.02, 0.02, 0.02);
                phoneObject.position.set(8, 1, 20);
            }
        }

    });
    return (<>
        <canvas className="webgl" />
        <div className="content-list">
            <nav>
                <ul>
                    <li className="content-item" onMouseEnter={undefined} onMouseOut={undefined}><a href="/projects">PROJECTS</a></li>
                    <li className="content-item" onMouseEnter={undefined} onMouseOut={undefined}><a href="/about">ABOUT ME</a></li>
                    <li className="content-item" onMouseEnter={undefined} onMouseOut={undefined}><a href="/contact">CONTACT ME</a></li>
                </ul>
            </nav>
        </div>
        <h1 className="title">"Hello There, I'm <b>Sky</b>"</h1>
        <h1 className="mobile-title">"Hello There, I'm <b>Sky</b>"</h1>
        <a href="/projects" className="project">PROJECTS</a>
        <a href="/about" className="about">ABOUT ME</a>
        <a href="/contact" className="contact">CONTACT ME</a></>);
}

export default Home;