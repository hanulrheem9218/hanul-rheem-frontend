import NavigationBar from "../../components/NavigationBar";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import ProjectContainer from "../../components/Project";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
//import { isMobile } from "react-device-detect";
import { gsap } from 'gsap';
import * as THREE from "three";
import { useEffect } from "react";
import "./projects.css"
function Projects() {
    useEffect(() => {
        const isMobile = true;
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
        const projectUl: HTMLElement | null = document.querySelector(".project-ul");
        const projectMobilelUl: HTMLElement | null = document.querySelector(".mobile-ul");
        if (projectUl == null || projectMobilelUl == null) {
            return;
        }
        const pointLabel = new CSS3DObject(projectUl);
        pointLabel.rotateX(-10 * (Math.PI / 180));
        pointLabel.scale.set(0.004, 0.004, 0.004);
        //mobile size.
        const mobileLabel = new CSS2DObject(projectMobilelUl);
        mobileLabel.scale.set(0, 0, 0);

        if (isMobile && window.innerWidth <= 600) {
            mobileLabel.position.set(0, -1.4, 0);
            projectMobilelUl.style.width = "18rem";
            projectMobilelUl.style.height = "18rem";
            pointLabel.visible = false;
        } else {
            projectMobilelUl.style.width = "35rem";
            projectMobilelUl.style.height = "35rem";
        }

        if (window.innerWidth <= 600 && pointLabel.visible) {
            projectUl.style.width = "30rem";
            projectUl.style.height = "30rem";
            pointLabel.position.set(0, -0.4, 14);
        }
        else if (window.innerWidth >= 600 && pointLabel.visible) {
            projectUl.style.width = "40rem";
            projectUl.style.height = "40rem";
            pointLabel.position.set(0, 0.05, 14);
        }


        scene.add(pointLabel);
        //mobile version
        scene.add(mobileLabel);
        //loading the fbxs
        //load textures
        const fbxLoader = new FBXLoader();
        let loadedObject = new THREE.Object3D();
        fbxLoader.load("models/aio.fbx", (object: any) => {
            //apply the material to the object

            loadedObject = object;
            if (window.innerWidth <= 600 && isMobile) {
                object.position.set(0, -1.0, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.007, y: 0.007, z: 0.007 });
                tl.fromTo(projectMobilelUl, { delay: 2, width: "0rem", opacity: 0 }, { width: "18rem", opacity: 1 });
                pointLabel.visible = false;
            } else {
                object.position.set(0, -1.1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                tl.fromTo(projectMobilelUl, { delay: 2, width: "0rem", opacity: 0 }, { width: "35rem", opacity: 1 });
                pointLabel.visible = false;
            }
            if (window.innerWidth <= 600 && pointLabel.visible) {
                object.position.set(0, -1.0, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.007, y: 0.007, z: 0.007 });
                tl.fromTo(projectUl, { delay: 2, width: "0rem", opacity: 0 }, { width: "30rem", opacity: 1 });
            }
            else if (window.innerWidth >= 600 && pointLabel.visible) {
                object.position.set(0, -1.1, 17);
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 });
                tl.fromTo(projectUl, { delay: 2, width: "0rem", opacity: 0 }, { width: "40rem", opacity: 1 });
            }

            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(90 * (Math.PI / 180));
            scene.add(object);

        },
            (xhr: any) => {
                console.log((xhr.loaded / xhr.total) * 100)
            },
            (error: any) => {
                console.log(error)
            });



        fbxLoader.load("lamp/lightBulb.fbx", (object: any) => {
            //apply the material to the object
            if (isMobile) {

                pointLabel.visible = false;
                return;
            }

            if (window.innerWidth <= 600 && pointLabel.visible) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.007, y: 0.007, z: 0.007 });
            } else if (window.innerWidth >= 600 && pointLabel.visible) {
                tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.005, y: 0.005, z: 0.005 });
                object.position.set(0, 1.5, 15.5);
            }
            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(180 * (Math.PI / 180));
            //  tlRepeat.to(object.position, { duration: 2, y: 5., ease: "back.inout" });
            tlRepeat.fromTo(lampLight, { duration: 0.5, intensity: 2 }, { intensity: 1 });
            scene.add(object);

        },
            (xhr: any) => {
                console.log((xhr.loaded / xhr.total) * 100)
            },
            (error: any) => {
                console.log(error)
            });

        //window conditions.
        checkSize();
        window.addEventListener("resize", onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            checkSize();
            renderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            mobileRenderer.setSize(window.innerWidth, window.innerHeight);
        }
        function checkSize() {
            if (loadedObject == null || projectUl == null) {
                return;
            }
            if (window.innerWidth <= 600 && isMobile) {
                loadedObject.position.set(0, -1.0, 17);
                loadedObject.scale.set(0.007, 0.007, 0.007);
                mobileLabel.position.set(0, -1.4, 0);
                projectMobilelUl.style.width = "18rem";
                projectMobilelUl.style.height = "18rem";
                pointLabel.visible = false;
            } else {
                mobileLabel.position.set(0, -0.1, 0);
                projectMobilelUl.style.width = "35rem";
                projectMobilelUl.style.height = "35rem";
                loadedObject.position.set(0, -1.1, 17);
                loadedObject.scale.set(0.01, 0.01, 0.01);
            }

            if (window.innerWidth <= 600 && pointLabel.visible) {
                loadedObject.position.set(0, -1.0, 17);
                loadedObject.scale.set(0.007, 0.007, 0.007);
                projectUl.style.width = "30rem";
                projectUl.style.height = "30rem";
                pointLabel.position.set(0, -0.4, 14);
            } else if (window.innerWidth >= 600 && pointLabel.visible) {
                loadedObject.position.set(0, -1.1, 17);
                loadedObject.scale.set(0.01, 0.01, 0.01);
                projectUl.style.width = "40rem";
                projectUl.style.height = "40rem";
                pointLabel.position.set(0, 0.05, 14);
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

    return (<>
        <canvas className="webgl" />
        {NavigationBar(false)}
        <ul className="project-ul">
            <ProjectContainer />
            <ProjectContainer />
            <ProjectContainer />
        </ul>
        <ul className="mobile-ul">
            <ProjectContainer />
            <ProjectContainer />
            <ProjectContainer />
        </ul>
    </>)

}

export default Projects;