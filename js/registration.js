import * as THREE from 'three'
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { getCenterPoint } from 'face-api.js/build/commonjs/utils';

// Scene
const scene = new THREE.Scene()

// Geometry (Heart)
// const shape = new THREE.Shape();
// const x = -2.5;
// const y = 0;
// shape.moveTo(x + 2.5, y + 2.5);
// shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
// shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
// shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
// shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
// shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
// shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

// const extrudeSettings = {
//   steps: 2,  // ui: steps
//   depth: 2,  // ui: depth
//   bevelEnabled: true,  // ui: bevelEnabled
//   bevelThickness: 1,  // ui: bevelThickness
//   bevelSize: 1,  // ui: bevelSize
//   bevelSegments: 2,  // ui: bevelSegments
// };

// const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
// geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1))
// const material = new THREE.MeshPhongMaterial({
//     color: 'red'
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Point Sphere
const radius = 7;
const widthSegments = 12;
const heightSegments = 8;
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
const material = new THREE.PointsMaterial({
    color: 'red',
    size: 1,     // in world units
});
const points = new THREE.Points(geometry, material);
points.translateY(-4.5)
scene.add(points);


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Lights

  // Light 1
  const light1 = new THREE.PointLight(0xffffff, 1, 100)
  light1.position.set(10, 10, 10)
  scene.add(light1)

  // Light 1
  const light2 = new THREE.PointLight(0xffffff, 1, 100)
  light2.position.set(-10, 10, 10)
  scene.add(light2)

  // Light 1
  const light3 = new THREE.PointLight(0xffffff, 1, 100)
  light1.position.set(10, 10, -10)
  scene.add(light3)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 30
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enabled = false
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 1

// Resize 
window.addEventListener('resize', () => {
  // Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

// Make sure canvas isn't getting messed up
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Timeline
const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(points.scale, {z:0, x:0, y:0}, {z: 1, x: 1, y: 1})

// Mouse Animation [Color]
let mouseDown = true
let rgb = []
// window.addEventListener('mousedown', () => (mouseDown = true))
// window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      50,
    ]
    // Animation
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    // gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
  }
})

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

console.log(modal)

function toggleModal() {
  console.log("hey")
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);  