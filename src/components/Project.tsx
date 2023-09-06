import "./Project.css";
import logo from "../assets/bridge.png";
import { AiFillGithub } from "react-icons/ai";
function ProjectContainer() {
    function sendme() {
        alert("hello");
    }

    return (<><li className="project-container-li">
        <h4>Hello World!</h4>
        <img className="project-container-img" src={logo} />
        <p className="project-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corrupti dolore? Sed nisi porro esse eum exercitationem aliquam. Perferendis ut odio hic aliquam vel iusto harum, exercitationem dolore temporibus odit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corrupti dolore? Sed nisi porro esse eum exercitationem aliquam. Perferendis ut odio hic aliquam vel iusto harum, exercitationem dolore temporibus odit?</p>
        <h4 style={{ textAlign: "center" }}>node.js ‧ express ‧ react.js ‧ firebase ‧ tinymce ‧ agile methodologies</h4>
        <div ><AiFillGithub onClick={sendme} style={{ width: "35px", height: "35px" }} /></div>
        <a href="./" style={{ display: "block" }}>GitHub Source Code</a></li></>);
}

export default ProjectContainer;