import * as THREE from "three";
import * as CANNON from "cannon-es";
import { PointerLockControlsCannon } from "../PointerLockControlsCannon.js";
import { UserCamera } from "../UserCamera.js";
import { WorldScene } from "../WorldScene.js";
import { WorldPhysics } from "../WorldPhysics.js";

class TestStart extends THREE.WebGLRenderer {
  constructor(listBox = [], listSphere = [], nextLevel) {
    // Set renderer (This class)
    super({ antialias: true });
    this.nextLevel = nextLevel;

    // Initial perspective camera
    this.camera = new UserCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Initial scene world
    this.scene = new WorldScene();
    this.world = new WorldPhysics(20);

    this.setSize(window.innerWidth, window.innerHeight);
    this.setClearColor(this.scene.fog.color);
    this.shadowMap.enabled = true;
    this.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.domElement);

    this.timeStep = 1 / 60;
    this.lastCallTime = performance.now();
    this.boxes = [];
    this.boxMeshes = [];
    this.instructions = document.getElementById("instructions");

    // Runing setter method
    this.setControls();
    this.setListener();
    this.setObjectBlender();
    this.animate(nextLevel);
  }

  setControls() {
    this.controls = new PointerLockControlsCannon(
      this.camera,
      this.world.sphereBody
    );
    this.scene.add(this.controls.getObject());
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.setSize(window.innerWidth, window.innerHeight);
  }

  onClick() {
    this.controls.lock();
  }

  onLock() {
    this.controls.enabled = true;
    this.instructions.style.display = "none";
  }

  onUnlock() {
    this.controls.enabled = false;
    this.instructions.style.display = null;
  }

  setListener() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  setObjectBlender() {
    var geometry = new THREE.BoxGeometry();

    var material = new THREE.MeshPhongMaterial({
      color: 0xeea327,
      specular: 0xffffff,
      shininess: 50,
    });

    this.cube = [];

    this.cube[0] = new THREE.Mesh(geometry, material);

    this.cube[0].scale.set(2, 2, 2);
    this.cube[0].position.set(0, 19, -6);
    this.scene.add(this.cube[0]);

    this.cube[1] = new THREE.Mesh(geometry, material);

    this.cube[1].scale.set(2, 2, 2);
    this.cube[1].position.set(5, 19, -6);
    this.scene.add(this.cube[1]);

    this.cube[2] = new THREE.Mesh(geometry, material);

    this.cube[2].scale.set(2, 2, 2);
    this.cube[2].position.set(-5, 19, -6);
    this.scene.add(this.cube[2]);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = performance.now() / 1000;
    const dt = time - this.lastCallTime;
    this.lastCallTime = time;

    // if (this.controls.enabled) {
    this.world.step(this.timeStep, dt);

    this.controls.update(dt);
    this.render(this.scene, this.camera);
  }
}

const listMaterial = [
  new THREE.MeshStandardMaterial({ color: 0x00ffff }),
  new THREE.MeshStandardMaterial({ color: 0xe42e22 }),
  new THREE.MeshStandardMaterial({ color: 0x67f15b }),
  new THREE.MeshStandardMaterial({ color: 0xe4ba22 }),
  new THREE.MeshStandardMaterial({ color: 0x1868a1 }),
  new THREE.MeshStandardMaterial({ color: 0x92c8ef }),
];
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const listBox = [];
const listSphere = [];
for (let i = 0; i < 1; i++) {
  listBox.push({
    positionX: getRandomNumber(-10, 10),
    positionY: getRandomNumber(20, 1000),
    positionZ: getRandomNumber(-50, -10),
    scaleX: getRandomNumber(1, 10),
    scaleY: getRandomNumber(1, 10),
    scaleZ: getRandomNumber(1, 10),
    mass: 10,
    damping: getRandomNumber(0.1, 0.9),
    material: listMaterial[Math.floor(getRandomNumber(0, listMaterial.length))],
  });
  listSphere.push({
    positionX: getRandomNumber(-10, 10),
    positionY: getRandomNumber(20, 1000),
    positionZ: getRandomNumber(-50, -10),
    scale: getRandomNumber(1, 10),
    mass: 10,
    damping: getRandomNumber(0.1, 0.9),
    material: listMaterial[Math.floor(getRandomNumber(0, listMaterial.length))],
  });
}
const nextLevel = "Level_5.html";

const play = new TestStart(listBox, listSphere, nextLevel);
