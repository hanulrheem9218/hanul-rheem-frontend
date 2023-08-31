import * as Three from "three";
import { ScreenSize } from "../../interface/screen_size";
import { gsap } from "gsap";
import { useEffect } from 'react';
import './home.css';
function Home() {
    useEffect(() => {
        document.title = "hanul-rheem";
        const screen: ScreenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const mainScene = new Three.Scene();
        mainScene.background = new Three.Color("white");
        const c_white = 0xffffff;
        //create three meshes 

        //othgraphic view in three js.
        const left = -screen.width / 2;
        const right = screen.width / 2;
        const top = screen.height / 2;
        const bottom = -screen.height / 2;
        const near = 0.1;
        const far = 100;

        const object_top = 0;
        const mainCamera = new Three.OrthographicCamera(left, right, top, bottom, near, far);
        mainCamera.position.z = 35;
        mainCamera.zoom = 20;
        mainScene.add(mainCamera);


        const boxGeometry = new Three.BoxGeometry(3, 3);
        const cylinderGeometry = new Three.CylinderGeometry(1.5, 1.5, 3);
        const triangleGeometry = new Three.ConeGeometry(2, 3);
        const material = new Three.MeshStandardMaterial({ color: c_white, roughness: 0.9, transparent: true });


        const box = new Three.Mesh(boxGeometry, material);
        box.scale.set(0, 0, 0);
        const cone = new Three.Mesh(triangleGeometry, material);
        cone.scale.set(0, 0, 0);
        const cylinder = new Three.Mesh(cylinderGeometry, material);
        cylinder.scale.set(0, 0, 0);
        //init
        mainScene.add(cone);
        mainScene.add(box);
        mainScene.add(cylinder);

        cone.position.y = object_top;
        cone.position.z = 20;
        cone.position.x = 0;

        cylinder.position.y = object_top;
        cylinder.rotateX(1.5708);
        cylinder.position.z = 20;
        cylinder.position.x = 8;

        box.position.y = object_top;
        box.position.z = 20;
        box.position.x = -8;
        //Setting up the lights
        const light = new Three.PointLight(c_white, 1, 100);
        light.position.set(0, 3, 30);
        light.intensity = 10;
        mainScene.add(light);
        //timeline
        const tl = gsap.timeline({ defaults: { duration: 1 } });

        tl.fromTo(".title", { opacity: 0, top: 0 }, { opacity: 1, top: "30%" });
        tl.fromTo('.content-list', { opacity: 0 }, { opacity: "100%" });


        tl.fromTo(cylinder.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
        tl.fromTo(box.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
        tl.fromTo(cone.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });

        const canvas = document.querySelector(".webgl");
        if (canvas == null) {
            return;
        }
        const renderer: Three.WebGLRenderer = new Three.WebGLRenderer({ canvas });
        //document.body.appendChild(renderer.domElement);

        mainCamera.updateProjectionMatrix();
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        mainCamera.left = -screen.width / 2;
        mainCamera.right = screen.width / 2;
        mainCamera.top = screen.height / 2;
        mainCamera.bottom = -screen.height / 2;
        renderer.setSize(screen.width, screen.height);
        renderer.render(mainScene, mainCamera);

        //listening to the event listener resize.
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            screen.width = window.innerWidth;
            screen.height = window.innerHeight;
            mainCamera.left = -screen.width / 2;
            mainCamera.right = screen.width / 2;
            mainCamera.top = screen.height / 2;
            mainCamera.bottom = -screen.height / 2;
            mainCamera.updateProjectionMatrix();
            if (renderer != null) {
                renderer.setSize(screen.width, screen.height);
                renderer.render(mainScene, mainCamera);
            }
        }
        //Updating the renderer.
        function animate() {
            requestAnimationFrame(animate);
            //rotating box position.
            box.rotateY(0.008);
            //rotating cone position.
            //cone.rotateX(0.01);
            //cone.rotateY(0.01);
            cone.rotateY(0.008);

            renderer.render(mainScene, mainCamera);

        }

        animate();
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
        <h1 className="title">"Hello, I'am <b>Sky</b>"</h1></>);
}

export default Home;