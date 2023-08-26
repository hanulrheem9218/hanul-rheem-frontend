import * as Three from "three";
import { ScreenSize } from "../../interface/screen_size";
import { useEffect } from "react";
import { gsap } from "gsap";
import image from "../../assets/bridge.png";
import pillarLeft from "../../assets/pillar-left.png";
import pillarRight from "../../assets/pillar-right.png";
import './home.css';
function Home() {
    useEffect(() => {
        //setting up the home screen.
        document.title = "hanul-rheem";
        const screen: ScreenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        // meta.
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
        //   const geometry = new Three.geometry // setting up as persepective
        //let ratio: number = (screen.width / screen.height);
        // const mainCamera = new Three.PerspectiveCamera(45, ratio, 0.1, 100);
        const mainCamera = new Three.OrthographicCamera(left, right, top, bottom, near, far);
        mainCamera.position.z = 35;
        mainCamera.zoom = 20;
        mainScene.add(mainCamera);


        const boxGeometry = new Three.BoxGeometry(3, 3);
        const cylinderGeometry = new Three.CylinderGeometry(1.5, 1.5, 3);
        const triangleGeometry = new Three.ConeGeometry(2, 3);
        const material = new Three.MeshStandardMaterial({ color: c_white, roughness: 0.9 });

        //adding background
        const textureLoader = new Three.TextureLoader();
        const texture = textureLoader.load(image);
        const bridge = new Three.Mesh(new Three.PlaneGeometry(20, 20), new Three.MeshBasicMaterial({ map: texture, side: Three.DoubleSide }));
        //pillar - right
        bridge.scale.set(0, 0, 0);
        const pillarRightTexture = textureLoader.load(pillarRight);
        const pillarRightMesh = new Three.Mesh(new Three.PlaneGeometry(7, 12), new Three.MeshBasicMaterial({ map: pillarRightTexture, side: Three.DoubleSide }));
        pillarRightMesh.scale.set(0, 0, 0);
        //pillar -left
        const pillarLeftTexture = textureLoader.load(pillarLeft);
        const pillarLeftMesh = new Three.Mesh(new Three.PlaneGeometry(7, 12), new Three.MeshBasicMaterial({ map: pillarLeftTexture, side: Three.DoubleSide }));
        pillarLeftMesh.scale.set(0, 0, 0);
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
        mainScene.add(bridge);

        mainScene.add(pillarRightMesh);
        mainScene.add(pillarLeftMesh);
        //background seetings 
        bridge.position.z = 10;
        bridge.position.y = -13;

        //pillar positions
        pillarRightMesh.position.x = 14;
        pillarRightMesh.position.y = -13;
        // left
        pillarLeftMesh.position.x = -14;
        pillarLeftMesh.position.y = -13;
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
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;
        const renderer: Three.WebGLRenderer = new Three.WebGLRenderer({ canvas });
        // renderer = new Three.WebGLRenderer({ canvas });
        mainCamera.updateProjectionMatrix();
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        mainCamera.left = -screen.width / 2;
        mainCamera.right = screen.width / 2;
        mainCamera.top = screen.height / 2;
        mainCamera.bottom = -screen.height / 2;
        renderer.setSize(screen.width, screen.height);
        renderer.render(mainScene, mainCamera);
        // title. html elements.
        tl.fromTo(".title", { opacity: 0, top: 0 }, { opacity: 1, top: "30%" });
        tl.fromTo('.content-list', { opacity: 0 }, { opacity: "100%" });

        tl.fromTo(cylinder.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
        tl.fromTo(box.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
        tl.fromTo(cone.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
        if (canvas != null) {
            //  mainCamera.aspect = ratio;
            mainCamera.updateProjectionMatrix();
            renderer.render(mainScene, mainCamera);
        }
        //listening to the event listener resize.
        window.addEventListener('resize', () => {

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
        });
        //Looping method.
        const interval = setInterval(() => {
            //update camera.
            screen.width = window.innerWidth;
            screen.height = window.innerHeight;
            //mainCamera.aspect = ratio;

            //console.log(pillarLeftMesh.position.z);

            mainCamera.updateProjectionMatrix();
            if (renderer != null) {
                renderer.setSize(screen.width, screen.height);
                renderer.render(mainScene, mainCamera);
            }
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return (<><canvas className="webgl"></canvas>
        <div className="content-list">
            <nav>
                <ul>
                    <li className="content-item" onMouseEnter={() => { console.log("hello1") }} onMouseOut={() => { console.log("out1") }}><a href="/">PROJECTS</a></li>
                    <li className="content-item" onMouseEnter={() => { console.log("hello2") }} onMouseOut={() => { console.log("out2") }}><a href="/">ABOUT ME</a></li>
                    <li className="content-item" onMouseEnter={() => { console.log("hello3") }} onMouseOut={() => { console.log("out3") }}><a href="/">CONTACT ME</a></li>
                </ul>
            </nav>
        </div>
        <h1 className="title">"Hi my name is <b>Sky</b>"</h1></>);
}

export default Home;