import * as Three from "three";
import { ScreenSize } from "../../interface/screen_size";
import { gsap } from "gsap";
import { useEffect } from 'react';
//import { isMobile } from "react-device-detect";
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
        const scene = new Three.Scene();
        scene.background = new Three.Color("white");
        const c_white = 0xffffff;
        //create three meshes 

        //othgraphic view in three js.
        const left = -screen.width / 2;
        const right = screen.width / 2;
        const top = screen.height / 2;
        const bottom = -screen.height / 2;
        const near = 0.1;
        const far = 100;

        const mainCamera = new Three.OrthographicCamera(left, right, top, bottom, near, far);
        mainCamera.position.z = 35;
        mainCamera.zoom = 20;
        scene.add(mainCamera);


        const directionalLight = new Three.DirectionalLight(c_white, 20);
        directionalLight.rotateX(20 * (Math.PI / 180));
        scene.add(directionalLight);

        //Setting up the lights
        const light = new Three.AmbientLight(c_white, 1);
        light.position.set(0, 0, 25);
        light.intensity = 3;
        scene.add(light);
        //timeline
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        //mobile
        if (isMobile && window.innerWidth <= 511) {
            tl.fromTo(".title", { opacity: 0, top: 0 }, { opacity: 1, top: "10%" });
            tl.fromTo('.content-list', { opacity: 0 }, { opacity: "100%" });

        } else if (isMobile && window.innerWidth >= 511) {
            tl.fromTo(".title", { opacity: 0, top: 0 }, { opacity: 1, top: "30%" });
            tl.fromTo('.content-list', { opacity: 0 }, { opacity: "100%" });

        }
        if (!isMobile) {
            tl.fromTo(".title", { opacity: 0, top: 0 }, { opacity: 1, top: "30%" });
            tl.fromTo('.content-list', { opacity: 0 }, { opacity: "100%" });
        }
        //desktop no need to change to be hoenst.

        const canvas = document.querySelector(".webgl");
        if (canvas == null) {
            return;
        }
        const renderer: Three.WebGLRenderer = new Three.WebGLRenderer({ canvas });
        //document.body.appendChild(renderer.domElement);
        let computerObject = new Three.Object3D();
        let floppyObject = new Three.Object3D();
        let phoneObject = new Three.Object3D();
        const fbxLoader = new FBXLoader();
        fbxLoader.load("tablet/tablet.fbx", (object: any) => {
            //apply the material to the object
            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.2, y: 0.2, z: 0.2 });
            object.position.set(0, -1, 10);

            //object.scale.set(0.3, 0.3, 0.3);
            // computer.rotateX(0 * (Math.PI / 180));
            object.rotateX(90 * (Math.PI / 180));
            scene.add(object);

        });
        //computer
        fbxLoader.load("models/blankComputer.fbx", (object: any) => {
            //apply the material to the object
            computerObject = object;
            if (isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                object.position.set(0, 1.5, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, -1, 20);
            }
            if (!isMobile) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(0, -1, 20);
            }
            //object.scale.set(0.3, 0.3, 0.3);
            // computer.rotateX(0 * (Math.PI / 180));
            object.rotateY(-65 * (Math.PI / 180));
            scene.add(object);
            function animate() {
                requestAnimationFrame(animate);
                object.rotateY(0.003);
                renderer.render(scene, mainCamera);
            }
            animate();
        });
        //folder
        fbxLoader.load("models/floppyDisk.fbx", (object: any) => {
            //apply the material to the object
            floppyObject = object;
            if (isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                object.position.set(0, 9, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(-8, 1, 20);
            }
            if (!isMobile) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(-8, 1, 20);
            }


            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(90 * (Math.PI / 180));

            scene.add(object);
            function animate() {
                requestAnimationFrame(animate);
                object.rotateY(0.002);
                renderer.render(scene, mainCamera);
            }
            animate();
        });
        fbxLoader.load("models/phone.fbx", (object: any) => {
            //apply the material to the object
            phoneObject = object;
            if (isMobile && window.innerWidth <= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                object.position.set(0, -4, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(8, -1, 20);
            }
            if (!isMobile) {

                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
                object.position.set(8, -1, 20);
            }

            //object.scale.set(0.3, 0.3, 0.3);
            // computer.rotateX(0 * (Math.PI / 180));
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);
            function animate() {
                requestAnimationFrame(animate);
                object.rotateY(0.005);
                renderer.render(scene, mainCamera);
            }
            animate();
        });

        mainCamera.updateProjectionMatrix();
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        mainCamera.left = -screen.width / 2;
        mainCamera.right = screen.width / 2;
        mainCamera.top = screen.height / 2;
        mainCamera.bottom = -screen.height / 2;
        renderer.setSize(screen.width, screen.height);
        renderer.render(scene, mainCamera);
        renderer.setPixelRatio(4);
        //listening to the event listener resize.
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            screen.width = window.innerWidth;
            screen.height = window.innerHeight;
            mainCamera.left = -screen.width / 2;
            mainCamera.right = screen.width / 2;
            mainCamera.top = screen.height / 2;
            mainCamera.bottom = -screen.height / 2;
            if (isMobile && window.innerWidth <= 511) {

                computerObject.scale.set(0.01, 0.01, 0.01);
                computerObject.position.set(0, 1.5, 20);

                floppyObject.scale.set(0.01, 0.01, 0.01);
                floppyObject.position.set(0, 9, 20);

                phoneObject.scale.set(0.01, 0.01, 0.01);
                phoneObject.position.set(0, -4, 20);
            } else if (isMobile && window.innerWidth >= 511) {
                computerObject.scale.set(0.02, 0.02, 0.02);
                computerObject.position.set(0, -1, 20);

                floppyObject.scale.set(0.02, 0.02, 0.02);
                floppyObject.position.set(-8, 1, 20);

                phoneObject.scale.set(0.02, 0.02, 0.02);
                phoneObject.position.set(8, -1, 20);
            }
            mainCamera.updateProjectionMatrix();
            if (renderer != null) {
                renderer.setSize(screen.width, screen.height);
                renderer.render(scene, mainCamera);
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
        <h1 className="title">"Hello There, I'm <b>Sky</b>"</h1></>);
}

export default Home;