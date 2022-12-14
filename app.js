
// import {
//     AmbientLight,
//     AxesHelper,
//     DirectionalLight,
//     GridHelper,
//     PerspectiveCamera,
//     Scene,
//     WebGLRenderer,
// } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { IFCLoader } from "web-ifc-three/IFCLoader";

// //Creates the Three.js scene
// const scene = new Scene();

// //Object to store the size of the viewport
// const size = {
// width: window.innerWidth,
// height: window.innerHeight,
// };

// console.log(size);
// console.log(size.width);

// //Creates the camera (point of view of the user)
// const camera = new PerspectiveCamera(45);
// camera.position.z = 15;
// camera.position.y = 13;
// camera.position.x = 8;
// console.log(camera);

// //Creates the lights of the scene
// const lightColor = 0xffffff;

// const ambientLight = new AmbientLight(lightColor, 3);
// scene.add(ambientLight);

// const directionalLight = new DirectionalLight(lightColor, 1);
// directionalLight.position.set(0, 10, 0);
// directionalLight.target.position.set(5, 0, 0);
// scene.add(directionalLight);
// scene.add(directionalLight.target);

// //Sets up the renderer, fetching the canvas of the HTML
// const threeCanvas = document.getElementById("three-canvas");
// const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
// renderer.setSize(size.width, size.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// //Creates grids and axes in the scene
// const grid = new GridHelper(10, 10);
// scene.add(grid);

// const axes = new AxesHelper();
// axes.material.depthTest = false;
// axes.renderOrder = 1;
// scene.add(axes);
  
// //Creates the orbit controls (to navigate the scene)
// const controls = new OrbitControls(camera, threeCanvas);
// controls.enableDamping = true;
// controls.target.set(2, 0, 0);

// //Animation loop
// const animate = () => {
//     controls.update();
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// };
  
// animate();
  
// //Adjust the viewport to the size of the browser
// window.addEventListener("resize", () => {
//     (size.width = window.innerWidth), (size.height = window.innerHeight);
//     camera.aspect = size.width / size.height;
//     camera.updateProjectionMatrix();
//     renderer.setSize(size.width, size.height);
// });

// //Sets up the IFC loading
// const ifcLoader = new IFCLoader();
// // console.log(viewer);
// // viewer.context.getIfcCamera().cameraControls.dollyToCursor = false;
// ifcLoader.load("../IFC/01.ifc", (ifcModel) => scene.add(ifcModel));
  
// const input = document.getElementById("file-input");
// input.addEventListener(
//     "change",
//     (changed) => {
//         const ifcURL = URL.createObjectURL(changed.target.files[0]);
//         ifcLoader.load(ifcURL, (ifcModel) => scene.add(ifcModel));
//     },
//     false
// );
import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
// viewer.IFC.loader.ifcManager.applyWebIfcConfig({
//     COORDINATE_TO_ORIGIN: true,
//     USE_FAST_BOOLS: true,
// });

// Create grid and axes
viewer.axes.setAxes();
viewer.grid.setGrid();

const input = document.getElementById("file-input");

input.addEventListener("change",
    async (changed) => {
        await viewer.IFC.loader.ifcManager.applyWebIfcConfig({
            COORDINATE_TO_ORIGIN: true,
            USE_FAST_BOOLS: false,
        });
        const file = changed.target.files[0];
        const ifcURL = URL.createObjectURL(file);
        viewer.IFC.loadIfcUrl(ifcURL);
    },
    false
);

async function loadIfc() {
    await viewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: true,
    });

    // Load the model
    const model = await viewer.IFC.loadIfcUrl('../IFC/04.ifc');
    // Add dropped shadow and post-processing efect
    // await viewer.shadowDropper.renderShadow(model.modelID);
    // viewer.context.renderer.postProduction.active = true;
    // console.log(model);
}

loadIfc();

window.ondblclick = async () => await viewer.IFC.selector.pickIfcItem(true);
window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();

window.ondblclick = () => viewer.IFC.selector.pickIfcItem();
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
viewer.clipper.active = true;

window.onkeydown = (event) => {
    if (event.code === "KeyP") {
        viewer.clipper.createPlane();
    } else if (event.code === "KeyO") {
        viewer.clipper.deletePlane();
    }
};
