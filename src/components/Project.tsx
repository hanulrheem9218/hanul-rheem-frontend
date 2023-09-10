import "./Project.css";
import { AiFillGithub } from "react-icons/ai";
function ProjectContainer(title: string, description: string, imgSrc: string, techStacks: string, link: string, id: number) {
    //node.js ‧ express ‧ react.js ‧ firebasetinymce ‧ agile methodologies
    return (<><div key={id} className="project-container-li">
        <h4>{title}</h4>
        <img className="project-container-img" src={imgSrc} />
        <p className="project-p">{description}</p>
        <h4 style={{ textAlign: "center" }}>{techStacks}</h4>
        <div ><AiFillGithub style={{ width: "35px", height: "35px" }} /></div>
        <a className="project-link" target="_blank" href={link} style={{ display: "block" }}>GitHub Source Code</a></div></>);
}

export default ProjectContainer;