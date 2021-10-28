import * as THREE from '/build/three.module.js';
// import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'
// import { GUI } from './jsm/libs/dat.gui.module.js';
// import Stats from './jsm/libs/stats.module.js';

let scene;
let camera;
let renderer;
let face;
let model_container = document.querySelector('.webgl');
const canvasSize = document.querySelector('.canvas-element');

// const stats = new Stats()
// document.body.appendChild(stats.domElement);

const init = () => {
    // scene setup
    scene = new THREE.Scene();

    //camera setup
    const fov = 40;
    const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 25);
    camera.lookAt(scene.position);
    scene.add(camera);

    //renderer setup
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: model_container
    });
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    // orbitcontrol setup
    // const controls = new OrbitControls(camera, renderer.domElement);

    // ambient light setup
    const amibientLight = new THREE.AmbientLight(0x2E4053, 1);
    scene.add(amibientLight);

    // direction lights setup
    const spotLight1 = new THREE.SpotLight(0x76D7C4, 1.5);
    spotLight1.position.set(6, 11, 6);
    spotLight1.castShadow = true;
    const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 1, 0x00ff00);
    scene.add(spotLight1);

    // orenge light setup
    const spotLight2 = new THREE.SpotLight(0xB03A2E, 1);
    spotLight2.position.set(-10, 0, 12);
    spotLight2.castShadow = true;
    const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 2, 0x00ff00);
    scene.add(spotLight2);

    // back light setup
    const spotLight3 = new THREE.SpotLight(0xD6EAF8, 2);
    spotLight3.position.set(-14, 40, -37);
    spotLight3.castShadow = true;
    const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3, 2, 0xff0000);
    scene.add(spotLight3);


    // // helper code for setting light position
    // const gui = new GUI();

    // // blue light controls
    // const blueLight = gui.addFolder('BlueLight');
    // blueLight.add(spotLight1.position, "x", -30, 30, 1);
    // blueLight.add(spotLight1.position, "y", -30, 30, 1);
    // blueLight.add(spotLight1.position, "z", -30, 30, 1);

    // // orenge light controls
    // const orengeLight = gui.addFolder('OrengeLight');
    // orengeLight.add(spotLight2.position, "x", -40, 40, 1);
    // orengeLight.add(spotLight2.position, "y", -40, 40, 1);
    // orengeLight.add(spotLight2.position, "z", -40, 40, 1);

    // // back light controls
    // const backLight = gui.addFolder('BackLight');
    // backLight.add(spotLight3.position, "x", -40, 40, 1);
    // backLight.add(spotLight3.position, "y", -40, 40, 1);
    // backLight.add(spotLight3.position, "z", -40, 40, 1);

    // loding gltf 3d model
    const loader = new GLTFLoader();
    loader.load('./model/my_face.glb', (gltf) => {
        face = gltf.scene.children[0];
        face.scale.set(0.017, 0.017, 0.017)
        face.position.set(-2.5, -1.5, 0)
        scene.add(gltf.scene);
    });

    animate();
}

// redering scene and camera
const render = () => {
    renderer.render(scene, camera);
}

// animation 
document.addEventListener("mousemove", onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX) - 50
    mouseY = (event.clientY - windowY)
}

const animate = () => {
    requestAnimationFrame(animate);



    const tick = () => {
        targetX = mouseX * 0.001
        targetY = mouseY * 0.001



        // Update objects
        face.rotation.y += .5 * (targetX - face.rotation.y)
        face.rotation.x += .05 * (targetY - face.rotation.x)
        face.position.z += -1 * (targetY - face.rotation.x)

        // Render
        renderer.render(scene, camera)
    }

    tick()
    render();
}


// making responsive
const windowResize = () => {
    camera.aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    render();
}

window.addEventListener('resize', windowResize, false);
window.onload = init;