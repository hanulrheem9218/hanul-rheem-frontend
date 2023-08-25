import * as Three from "three";
import { ScreenSize } from "../../interface/screen_size";
import { useEffect } from "react";
import './home.css';
function Home() {
    //setting up the home screen.
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

    const box = new Three.Mesh(boxGeometry, material);
    const cone = new Three.Mesh(triangleGeometry, material);
    const cylinder = new Three.Mesh(cylinderGeometry, material);

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


    useEffect(() => {
        const canvas: HTMLElement | undefined = document.querySelector(".webgl") as HTMLElement;
        console.log(canvas);
        const renderer: Three.WebGLRenderer = new Three.WebGLRenderer({ canvas });

        console.log("rendering")
        // renderer = new Three.WebGLRenderer({ canvas });
        mainCamera.updateProjectionMatrix();
        renderer.render(mainScene, mainCamera);


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
            //console.log("changing values", mainCamera.left);
            //ratio = (screen.width / screen.height) as number;
            if (renderer != null) {
                renderer.setSize(screen.width, screen.height);
                renderer.render(mainScene, mainCamera);
            }
        });
        //looping.
        //need to update the page.

        const interval = setInterval(() => {
            //update camera.
            screen.width = window.innerWidth;
            screen.height = window.innerHeight;
            //mainCamera.aspect = ratio;
            mainCamera.updateProjectionMatrix();
            if (renderer != null) {
                renderer.setSize(screen.width, screen.height);
                renderer.render(mainScene, mainCamera);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [mainCamera]);

    return (<><canvas className="webgl"></canvas>
        <div className="content-list">
            <nav>
                <ul>
                    <li className="content-item"><a href="/">PROJECTS</a></li>
                    <li className="content-item"><a href="/">ABOUT ME</a></li>
                    <li className="content-item"><a href="/">CONTACT ME</a></li>
                </ul>
            </nav>
        </div>
        <h1 className="title">hi my name is sky.</h1></>);
}

export default Home;