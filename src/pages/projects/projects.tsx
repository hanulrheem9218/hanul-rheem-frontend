import NavigationBar from "../../components/NavigationBar";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import ProjectContainer from "../../components/Project";
import { gsap } from 'gsap';
import * as THREE from "three";
import { useEffect } from "react";
import "./projects.css"
function Projects() {
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

        const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const light = new THREE.PointLight(0xfff8eb, 1, 1000);
        light.position.set(0, 5, 5);
        light.intensity = 20;
        scene.add(light);

        const upperLight = new THREE.PointLight(0xffffff, 1, 100);
        upperLight.position.set(0, -0.7, 14.5);
        upperLight.intensity = 300;
        scene.add(upperLight);

        const lampLight = new THREE.PointLight(0xfff8eb, 1, 100);
        lampLight.position.set(0, 5, 0);
        lampLight.intensity = 20;
        scene.add(lampLight);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;
        scene.add(camera);

        const tl = gsap.timeline({ defaults: { duration: 0.5 }, });
        const tlRepeat = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.3 });

        gsap.to(".project-ul", { duration: 1, opacity: 1, width: "42%" });
        gsap.to(scene.background, { duration: 1, r: 0.05098, g: 0.05098, b: 0.05098 });
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
        //init
        renderer.setSize(window.innerWidth, window.innerHeight);

        //loading the fbxs
        //load textures

        const fbxLoader = new FBXLoader();
        fbxLoader.load("tablet/tablet.fbx", (object: any) => {
            //apply the material to the object



            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.02, z: 0.02 });
            object.position.set(0, -0.7, 14.5);
            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(90 * (Math.PI / 180));
            object.rotateY(180 * (Math.PI / 180));
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
            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.03, y: 0.03, z: 0.03 });
            object.position.set(0, 5, 0);
            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(180 * (Math.PI / 180));
            tlRepeat.to(object.position, { duration: 2, y: 5., ease: "back.inout" });
            tlRepeat.fromTo(lampLight, { duration: 0.5, intensity: 70 }, { intensity: 120 });
            scene.add(object);

        },
            (xhr: any) => {
                console.log((xhr.loaded / xhr.total) * 100)
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
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }

        animate();
    });

    return (<>
        <canvas className="webgl" />
        {NavigationBar(false)}


        <ul className="project-ul" style={{ backgroundRepeat: "repeat" }}>
            <ProjectContainer />
            <ProjectContainer />
            <ProjectContainer />
        </ul>
    </>)

}

export default Projects;