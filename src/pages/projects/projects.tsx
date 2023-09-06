import NavigationBar from "../../components/NavigationBar";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import ProjectContainer from "../../components/Project";
import { gsap } from 'gsap';
import * as THREE from "three";
import { useEffect } from "react";
import imgB from "../../assets/paperText.jpg";
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

        const light = new THREE.PointLight(0xfff8eb, 1, 100);
        light.position.set(0, 2, 5);
        light.intensity = 20;
        scene.add(light);

        const lampLight = new THREE.PointLight(0xfff8eb, 1, 100);
        lampLight.position.set(0, 5, 0);
        lampLight.intensity = 10;
        scene.add(lampLight);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;
        scene.add(camera);

        const tl = gsap.timeline({ defaults: { duration: 0.5 }, });
        const tlRepeat = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.3 });

        gsap.to(".project-ul", { duration: 1, opacity: 1, width: "45vw" });
        gsap.to(scene.background, { duration: 1, r: 0, g: 0, b: 0 });
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
        //init
        renderer.setSize(window.innerWidth, window.innerHeight);

        //loading the fbxs
        //load textures
        const textureLoader = new THREE.TextureLoader();
        const metalic = textureLoader.load("workspace/workspace_Metallic.png");
        const baseColor = textureLoader.load("workspace/workspace_BaseColor.png");
        const normal = textureLoader.load("workspace/workspace_Normal.png");
        const roughness = textureLoader.load("workspace/workspace_Roughness.png");
        const height = textureLoader.load("workspace/workspace_Height.png");
        const fbxMaterials = new THREE.MeshStandardMaterial({
            normalMap: normal,
            displacementMap: height,
            displacementScale: 0.01,
            roughnessMap: roughness,
            metalnessMap: metalic,
            metalness: 0.1,
            map: baseColor,
        })

        const fbxLoader = new FBXLoader();
        fbxLoader.load("workspace/workspace.fbx", (object: any) => {
            //apply the material to the object
            object.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    child.material = fbxMaterials;
                }
            });


            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.05, y: 0.05, z: 0.05 });
            object.position.set(0, -2, 0);
            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(70 * (Math.PI / 180));
            object.rotateY(180 * (Math.PI / 180));
            scene.add(object);

        },
            (xhr: any) => {
                console.log((xhr.loaded / xhr.total) * 100)
            },
            (error: any) => {
                console.log(error)
            });
        //loading the fbxs
        const lamp_metalic = textureLoader.load("lamp/Lamp_Metallic.png");
        const lamp_baseColor = textureLoader.load("lamp/Lamp_BaseColor.png");
        const lamp_normal = textureLoader.load("lamp/Lamp_Normal.png");
        const lamp_roughness = textureLoader.load("lamp/Lamp_Roughness.png");
        const lamp_height = textureLoader.load("lamp/Lamp_Height.png");
        const lampMaterials = new THREE.MeshStandardMaterial({
            normalMap: lamp_normal,
            displacementMap: lamp_height,
            displacementScale: 0.1,
            roughnessMap: lamp_roughness,
            metalnessMap: lamp_metalic,
            map: lamp_baseColor,
        })


        fbxLoader.load("lamp/Lamp.fbx", (object: any) => {
            //apply the material to the object
            object.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    child.material = lampMaterials;
                }
            });


            tl.fromTo(object.scale, { x: 0, y: 0, z: 0 }, { x: 0.03, y: 0.03, z: 0.03 });
            object.position.set(0, 5, 0);
            //object.scale.set(0.3, 0.3, 0.3);
            object.rotateX(0 * (Math.PI / 180));
            object.rotateY(180 * (Math.PI / 180));
            tlRepeat.to(object.position, { duration: 2, y: 5., ease: "back.inout" });
            tlRepeat.fromTo(lampLight, { duration: 0.5, intensity: 10 }, { intensity: 5 });
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