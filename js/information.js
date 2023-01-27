import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

  function makeScene(elem) {
    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 2);
    camera.lookAt(0, 0, 0);

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    return {scene, camera, elem};
  }

  function setupScene1() {
    const sceneInfo = makeScene(document.querySelector('#box'));
    const geometry = new THREE.DodecahedronGeometry(0.7, 1)
    const material = new THREE.MeshPhongMaterial({color: 'purple'});
    const mesh = new THREE.Mesh(geometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    return sceneInfo;
  }

  function setupScene3() {
    const sceneInfo = makeScene(document.querySelector('#ga3'));
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({color: 'red'});
    const mesh = new THREE.Mesh(geometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    return sceneInfo;
  }

  function setupScene2() {
    const sceneInfo = makeScene(document.querySelector('#pyramid'));
    const radius = .8;
    const widthSegments = 4;
    const heightSegments = 2;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshPhongMaterial({
      color: 'gold',
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    return sceneInfo;
  }

  function setupScene4() {
    const sceneInfo = makeScene(document.querySelector('#starwars'));
    const radius = .8;
    const widthSegments = 4;
    const heightSegments = 2;
    const geometry = new THREE.TorusGeometry(0.4, 0.3, 8, 24)
    const material = new THREE.MeshPhongMaterial({
      color: 'pink',
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    return sceneInfo;
  }

  function setupScene5() {
    const sceneInfo = makeScene(document.querySelector('#contactdesign'));
    const radiusTop = 0.6;  // ui: radiusTop
    const radiusBottom = 0.6;  // ui: radiusBottom
    const height = 0.7;  // ui: height
    const radialSegments = 12;  // ui: radialSegments
    const geometry = new THREE.CylinderGeometry(
        radiusTop, radiusBottom, height, radialSegments);
        const material = new THREE.MeshPhongMaterial({
          color: 'green',
          flatShading: true,
        });
    const mesh = new THREE.Mesh(geometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    return sceneInfo;
  }

  function setupScene6() {
    const sceneInfo = makeScene(document.querySelector('#rules'));
    const radius = 0.4;  // ui: radius
    const tubeRadius = 0.2;  // ui: tubeRadius
    const radialSegments = 18;  // ui: radialSegments
    const tubularSegments = 64;  // ui: tubularSegments
    const p = 2;  // ui: p
    const q = 3;  // ui: q
    const geometry = new THREE.TorusKnotGeometry(
    radius, tubeRadius, tubularSegments, radialSegments, p, q);
    const material = new THREE.MeshPhongMaterial({color: 'blue'});
    const mesh = new THREE.Mesh(geometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    return sceneInfo;
  }

  const sceneInfo1 = setupScene1();
  const sceneInfo2 = setupScene2();
  const sceneInfo3 = setupScene3();
  const sceneInfo4 = setupScene4();
  const sceneInfo5 = setupScene5();
  const sceneInfo6 = setupScene6();

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function renderSceneInfo(sceneInfo) {
    const {scene, camera, elem} = sceneInfo;

    // get the viewport relative position of this element
    const {left, right, top, bottom, width, height} =
        elem.getBoundingClientRect();

    const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;

    if (isOffscreen) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    renderer.render(scene, camera);
  }

  function render(time) {
    time *= 0.001;

    resizeRendererToDisplaySize(renderer);

    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    sceneInfo1.mesh.rotation.y = time * .3;
    sceneInfo2.mesh.rotation.y = time * .3;
    sceneInfo3.mesh.rotation.y = time * .3;
    sceneInfo4.mesh.rotation.y = time * .3;
    sceneInfo5.mesh.rotation.y = time * .3;
    sceneInfo6.mesh.rotation.y = time * .3;

    renderSceneInfo(sceneInfo1);
    renderSceneInfo(sceneInfo2);
    renderSceneInfo(sceneInfo3);
    renderSceneInfo(sceneInfo4);
    renderSceneInfo(sceneInfo5);
    renderSceneInfo(sceneInfo6);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
