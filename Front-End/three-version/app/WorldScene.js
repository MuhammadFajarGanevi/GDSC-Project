import * as THREE from "three";

export class WorldScene extends THREE.Scene {
  constructor() {
    super();
    this.fog = new THREE.Fog(0xf5f5fa, 0, 500);

    // Opstions material in the world
    this.materialA = new THREE.MeshStandardMaterial({ color: 0xf5f5fa });

    // Runing setter method
    this.setLight();
  }

  setLight() {
    const ambientLight = new THREE.AmbientLight(0xf5f5fa, 1);
    this.add(ambientLight);
  }
}
